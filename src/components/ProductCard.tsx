import { Link } from "react-router-dom";
import type { Product } from "../types";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="card">
      <div className="card-emoji">{product.image ?? "📦"}</div>
      <h3>
        <Link to={`/products/${product.id}`}>{product.name}</Link>
      </h3>
      <p className="muted">{product.category}</p>
      <p className="price">${product.price}</p>
      <button onClick={() => addToCart(product, 1)} disabled={product.stock === 0}>
        {product.stock === 0 ? "Sin stock" : "Agregar al carrito"}
      </button>
    </div>
  );
}