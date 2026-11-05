import { Link } from "react-router-dom";
import type { Product } from "../types";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const lowStock = product.stock > 0 && product.stock <= 5;

  return (
    <article className="card">
      <div className="card-media">
        {product.image ? (
          <img
            className="card-img"
            src={product.image}
            alt={product.name}
            loading="lazy"
          />
        ) : (
          <span className="card-fallback" aria-hidden="true">
            {product.name.charAt(0).toUpperCase()}
          </span>
        )}
        {product.stock === 0 && <span className="card-badge">Sin stock</span>}
        {lowStock && <span className="card-badge low">¡Últimos!</span>}
      </div>

      <div className="card-body">
        <p className="card-cat">{product.category}</p>
        <h3>
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>

        <div className="card-footer">
          <p className="price">${product.price}</p>
          <button
            className="add-btn"
            onClick={() => addToCart(product, 1)}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? "Sin stock" : "+ Agregar"}
          </button>
        </div>
      </div>
    </article>
  );
}
