import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/api";
import CartItem from "../components/CartItem";

export default function Cart() {
  const { items, totalPrice, clearCart } = useCart();
  const [confirmed, setConfirmed] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  // PARTE 2: envía el pedido al backend (POST /api/orders)
  const handleCheckout = async () => {
    setSending(true);
    setError("");
    try {
      await createOrder(
        items.map((i) => ({ product_id: i.product.id, quantity: i.quantity }))
      );
      clearCart();
      setConfirmed(true);
    } catch (err) {
      // El carrito se conserva y el error se muestra en pantalla
      setError(err instanceof Error ? err.message : "No se pudo realizar el pedido.");
    } finally {
      setSending(false);
    }
  };

  if (confirmed) {
    return (
      <section className="center">
        <img className="confirm-photo" src="/images/kiosco-portada.jpg" alt="" aria-hidden="true" />
        <h1>¡Pedido realizado con éxito!</h1>
        <p>Gracias por tu compra. Ya estamos preparando todo.</p>
        <Link to="/products" className="primary-link" onClick={() => setConfirmed(false)}>
          Seguir comprando
        </Link>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="empty-state">
        <img className="empty-photo" src="/images/kiosco-portada.jpg" alt="" aria-hidden="true" />
        <h1>Tu carrito está vacío</h1>
        <p>Agregá productos del catálogo para empezar tu pedido.</p>
        <Link to="/products" className="primary-link">
          Ir al catálogo
        </Link>
      </section>
    );
  }

  return (
    <section>
      <div className="page-head">
        <div>
          <h1>Tu carrito</h1>
          <p className="page-sub">Revisá tu pedido antes de confirmarlo.</p>
        </div>
      </div>

      <div className="cart-layout">
        <div>
          <ul className="cart-list">
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </ul>
          <Link to="/products" className="back-link">
            ← Seguir comprando
          </Link>
        </div>

        <aside className="summary-card">
          <h2>Resumen del pedido</h2>
          <div className="summary-row">
            <span>Productos</span>
            <span>{items.length}</span>
          </div>
          <div className="summary-row">
            <span>Envío</span>
            <span className="free">Gratis</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${totalPrice}</span>
          </div>

          {error && <p className="error">{error}</p>}
          {sending && <p className="page-sub">Enviando pedido...</p>}

          <button onClick={handleCheckout} disabled={sending}>
            {sending ? "Enviando..." : "Finalizar pedido"}
          </button>
          <button className="clear-btn" onClick={clearCart} disabled={sending}>
            Vaciar carrito
          </button>
        </aside>
      </div>
    </section>
  );
}
