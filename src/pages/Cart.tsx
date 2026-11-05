import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";

export default function Cart() {
  const { items, totalPrice, clearCart } = useCart();
  const [confirmed, setConfirmed] = useState(false);

  // PARTE 1: solo simula el éxito, sin llamar a ninguna API
  const handleCheckout = () => {
    clearCart();
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <section className="center">
        <h1>✅ ¡Pedido realizado con éxito!</h1>
        <Link to="/products" onClick={() => setConfirmed(false)}>Seguir comprando</Link>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section>
        <h1>Carrito</h1>
        <p>Tu carrito está vacío.</p>
        <Link to="/products">Ir al catálogo</Link>
      </section>
    );
  }

  return (
    <section>
      <h1>Carrito</h1>
      <ul className="cart-list">
        {items.map((item) => (
          <CartItem key={item.product.id} item={item} />
        ))}
      </ul>
      <h2>Total: ${totalPrice}</h2>
      <div className="row">
        <button className="danger" onClick={clearCart}>Vaciar carrito</button>
        <button onClick={handleCheckout}>Finalizar pedido</button>
      </div>
    </section>
  );
}