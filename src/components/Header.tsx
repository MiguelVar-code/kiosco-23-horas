import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="header">
      <div className="header-inner">
        <NavLink to="/" className="brand">
          <img className="brand-logo" src="/images/logo-kiosco.jpeg" alt="Kiosco 23 Horas" />
          <span className="brand-text">
            Kiosco 23 Horas
            <span className="brand-sub">Tu kiosco, a un clic</span>
          </span>
        </NavLink>

        <nav className="nav">
          <NavLink to="/" end className="nav-link">
            Inicio
          </NavLink>
          <NavLink to="/products" className="nav-link">
            Productos
          </NavLink>
          <NavLink to="/cart" className="cart-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="cart-text">Carrito</span>
            <span className="cart-badge">{totalItems}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
