import { Link } from "react-router-dom";

const categories = [
  { name: "Bebidas", image: "/images/bebidas/coca-cola-500ml.jpg", value: "bebidas" },
  { name: "Snacks", image: "/images/snacks/papas-lays-clasicas.jpg", value: "snacks" },
  { name: "Golosinas", image: "/images/golosinas/alfajor-jorgito.jpg", value: "golosinas" },
  { name: "Varios", image: "/images/varios/pilas-aa-x2.jpg", value: "varios" },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">
            <span className="hero-dot" aria-hidden="true" />
            Abierto ahora · Envío en 15–25 min
          </span>
          <h1>
            Lo que necesitás,
            <br />
            <span>al toque de un clic.</span>
          </h1>
          <p className="hero-sub">
            Bebidas, snacks, golosinas y más. Hacé tu pedido y te lo llevamos
            hasta la puerta de tu casa.
          </p>

          <div className="hero-actions">
            <Link to="/products" className="big-link">
              Ver catálogo →
            </Link>
            <Link to="/products?category=bebidas" className="ghost-link">
              Explorar bebidas
            </Link>
          </div>

          <ul className="hero-points">
            <li>→ Entrega rápida</li>
            <li>→ Pedido simple</li>
            <li>→ Stock actualizado</li>
          </ul>
        </div>

        <div className="hero-art" aria-hidden="true">
          <img className="hero-photo e1" src="/images/bebidas/coca-cola-500ml.jpg" alt="" />
          <img className="hero-photo e2" src="/images/snacks/papas-lays-clasicas.jpg" alt="" />
          <img className="hero-photo e3" src="/images/golosinas/alfajor-jorgito.jpg" alt="" />
          <img className="hero-photo e4" src="/images/varios/pilas-aa-x2.jpg" alt="" />
        </div>
      </section>

      <section className="home-section">
        <div className="section-head">
          <h2>Categorías</h2>
          <Link to="/products" className="see-all">
            Ver todo →
          </Link>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <Link
              key={category.value}
              to={`/products?category=${category.value}`}
              className="category-card"
            >
              <img className="category-img" src={category.image} alt={category.name} loading="lazy" />
              <strong>{category.name}</strong>
              <span>Ver productos</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="benefits">
        <article className="benefit">
          <img className="benefit-img" src="/images/beneficios/entrega.jpg" alt="" aria-hidden="true" />
          <div>
            <h3>Entrega rápida</h3>
            <p>Preparamos tu pedido y lo llevamos en minutos.</p>
          </div>
        </article>
        <article className="benefit">
          <img className="benefit-img" src="/images/beneficios/precios.jpg" alt="" aria-hidden="true" />
          <div>
            <h3>Sin sorpresas</h3>
            <p>Precios claros y total actualizado al instante.</p>
          </div>
        </article>
        <article className="benefit">
          <img className="benefit-img" src="/images/beneficios/atencion.jpg" alt="" aria-hidden="true" />
          <div>
            <h3>Atención cercana</h3>
            <p>Como en el kiosco de la esquina, pero desde tu casa.</p>
          </div>
        </article>
      </section>
    </>
  );
}
