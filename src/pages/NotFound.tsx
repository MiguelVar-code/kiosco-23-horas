import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="empty-state">
      <img className="empty-photo" src="/images/kiosco-portada.jpg" alt="" aria-hidden="true" />
      <h1>404</h1>
      <p>La página que buscás no existe.</p>
      <Link to="/" className="primary-link">
        Volver al inicio
      </Link>
    </section>
  );
}
