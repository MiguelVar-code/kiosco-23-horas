import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="center">
      <h1>¡Bienvenido a Kiosco 23 Horas!</h1>
      <p>Bebidas, snacks, golosinas y todo lo que necesitás, sin salir de casa.</p>
      <Link to="/products" className="big-link">Ver catálogo</Link>
    </section>
  );
}