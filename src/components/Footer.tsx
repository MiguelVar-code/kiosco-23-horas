import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img className="brand-logo" src="/images/logo-kiosco.jpeg" alt="Kiosco 23 Horas" />
          <div>
            <strong>Kiosco 23 Horas</strong>
            <p>Tu kiosco de barrio, ahora online. Pedí y te lo llevamos.</p>
          </div>
        </div>

        <div className="footer-links">
          <Link to="/">Inicio</Link>
          <Link to="/products">Productos</Link>
          <Link to="/cart">Carrito</Link>
        </div>
      </div>
      <p className="footer-copy">Kiosco 23 Horas – 2026 · Hecho con cariño</p>
    </footer>
  );
}
