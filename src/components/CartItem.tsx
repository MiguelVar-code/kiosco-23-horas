import type { CartItemType } from "../types";
import { useCart } from "../context/CartContext";

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <li className="cart-item">
      <span className="cart-name">
        {product.image} {product.name}
      </span>
      <span>${product.price}</span>
      <input
        type="number"
        min={1}
        max={product.stock}
        value={quantity}
        onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
      />
      <span>${product.price * quantity}</span>
      <button className="danger" onClick={() => removeFromCart(product.id)}>
        Eliminar
      </button>
    </li>
  );
}