import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../services/api";
import type { Product } from "../types";
import ProductCard from "../components/ProductCard";

const categories = ["bebidas", "snacks", "golosinas", "varios"];

const categoryImages: Record<string, string> = {
  bebidas: "/images/bebidas/coca-cola-500ml.jpg",
  snacks: "/images/snacks/papas-lays-clasicas.jpg",
  golosinas: "/images/golosinas/alfajor-jorgito.jpg",
  varios: "/images/varios/pilas-aa-x2.jpg",
};

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") ?? "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Cada vez que cambia la categoría se piden los productos a la API
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    getProducts(category || undefined)
      .then((data) => {
        if (!cancelled) setProducts(data);
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setProducts([]);
          setError(`No se pudieron cargar los productos. ${err.message}`);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [category]);

  const handleChange = (value: string) => {
    if (value) setSearchParams({ category: value });
    else setSearchParams({});
  };

  return (
    <section>
      <div className="page-head">
        <div>
          <h1>Productos</h1>
          <p className="page-sub">Elegí tus favoritos y sumalos al carrito.</p>
        </div>
      </div>

      <div className="filters" role="group" aria-label="Filtrar por categoría">
        <button
          type="button"
          className={`chip ${category === "" ? "active" : ""}`}
          onClick={() => handleChange("")}
        >
          <img className="chip-img" src="/images/kiosco-portada.jpg" alt="" aria-hidden="true" />
          Todas
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className={`chip ${category === c ? "active" : ""}`}
            onClick={() => handleChange(c)}
          >
            <img className="chip-img" src={categoryImages[c]} alt="" aria-hidden="true" />
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>

      {loading && (
        <div className="state-box">
          <span className="spinner" aria-hidden="true" />
          Cargando productos...
        </div>
      )}

      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          <p className="results-count">
            {products.length}{" "}
            {products.length === 1 ? "producto encontrado" : "productos encontrados"}
          </p>

          {products.length > 0 ? (
            <div className="grid">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <img className="empty-photo" src="/images/snacks/papas-lays-clasicas.jpg" alt="" aria-hidden="true" />
              <h3>No hay productos en esta categoría</h3>
              <p>Probá con otra categoría o mirá el catálogo completo.</p>
            </div>
          )}
        </>
      )}
    </section>
  );
}
