import json

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Order, Product
from schemas import OrderCreate, OrderOut

router = APIRouter(prefix="/api/orders", tags=["orders"])


def _to_out(order: Order, message: str | None = None) -> OrderOut:
    return OrderOut(
        id=order.id,
        created_at=order.created_at,
        total=order.total,
        items=json.loads(order.items_json),
        message=message,
    )


@router.post("", response_model=OrderOut, status_code=201)
def create_order(data: OrderCreate, db: Session = Depends(get_db)):
    # Si un mismo producto viene repetido, se suman sus cantidades
    quantities: dict[int, int] = {}
    for item in data.items:
        quantities[item.product_id] = quantities.get(item.product_id, 0) + item.quantity

    try:
        total = 0.0
        lines = []

        # 1) Validar todo ANTES de tocar el stock
        for product_id, qty in quantities.items():
            product = db.get(Product, product_id)
            if product is None:
                raise HTTPException(404, f"El producto con id {product_id} no existe")
            if product.stock < qty:
                raise HTTPException(
                    409,
                    f"Stock insuficiente para '{product.name}': "
                    f"pediste {qty} y hay {product.stock} disponibles",
                )
            subtotal = product.price * qty
            total += subtotal
            lines.append((product, qty, subtotal))

        # 2) Descontar stock y guardar el pedido (una sola transacción)
        items_for_json = []
        for product, qty, subtotal in lines:
            product.stock -= qty
            items_for_json.append(
                {
                    "product_id": product.id,
                    "name": product.name,
                    "quantity": qty,
                    "unit_price": product.price,
                    "subtotal": subtotal,
                }
            )

        order = Order(total=total, items_json=json.dumps(items_for_json))
        db.add(order)
        db.commit()  # stock y pedido se guardan juntos
        db.refresh(order)
    except HTTPException:
        db.rollback()  # no se descuenta nada si el pedido falla
        raise
    except Exception:
        db.rollback()
        raise HTTPException(500, "Error interno al procesar el pedido")

    return _to_out(order, "Pedido realizado correctamente")


@router.get("", response_model=list[OrderOut])
def list_orders(db: Session = Depends(get_db)):
    orders = db.query(Order).order_by(Order.id.desc()).all()
    return [_to_out(o) for o in orders]
