import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../services/api";
import type { Product } from "../types";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    setProduct(null);
    getProductById(Number(id))
      .then((data) => {
        if (!cancelled) setProduct(data);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="state-box">
        <span className="spinner" aria-hidden="true" />
        Cargando producto...
      </div>
    );
  }

  if (error || !product) {
    return (
      <section className="empty-state">
        <img
          className="empty-photo"
          src="/images/kiosco-portada.jpg"
          alt=""
          aria-hidden="true"
        />
        <h3>{error || "Producto no encontrado."}</h3>
        <Link to="/products" className="primary-link">
          ← Volver al catálogo
        </Link>
      </section>
    );
  }

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <section className="detail">
      <div className="detail-media">
        <span className={`stock-pill ${product.stock === 0 ? "out" : ""}`}>
          {product.stock > 0 ? `${product.stock} disponibles` : "Sin stock"}
        </span>
        {product.image ? (
          <img
            className="detail-img"
            src={product.image}
            alt={product.name}
          />
        ) : (
          <span className="card-fallback big" aria-hidden="true">
            {product.name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      <div className="detail-info">
        <p className="detail-cat">{product.category}</p>
        <h1>{product.name}</h1>
        <p className="detail-desc">{product.description}</p>
        <p className="price detail-price">${product.price}</p>

        <div className="detail-actions">
          <div className="qty-control">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Quitar uno"
            >
              −
            </button>
            <input
              type="number"
              min={1}
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              aria-label="Cantidad"
            />
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
              disabled={quantity >= product.stock}
              aria-label="Agregar uno"
            >
              +
            </button>
          </div>
          <button onClick={handleAdd} disabled={product.stock === 0}>
            {product.stock === 0 ? "Sin stock" : "Agregar al carrito"}
          </button>
        </div>

        {added && <p className="success">✔ Agregado al carrito</p>}

        <Link to="/products" className="back-link">
          ← Volver al catálogo
        </Link>
      </div>
    </section>
  );
}
