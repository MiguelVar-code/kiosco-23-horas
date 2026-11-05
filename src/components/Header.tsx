import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="header">
      <NavLink to="/" className="logo">🛒 Kiosco 23 Horas</NavLink>
      <nav>
        <NavLink to="/" end>Inicio</NavLink>
        <NavLink to="/products">Productos</NavLink>
        <NavLink to="/cart">Carrito ({totalItems})</NavLink>
      </nav>
    </header>
  );
}