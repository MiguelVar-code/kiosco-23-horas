import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <section>
        <p>Producto no encontrado.</p>
        <Link to="/products">Volver al catálogo</Link>
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
      <div className="card-emoji big">{product.image ?? "📦"}</div>
      <h1>{product.name}</h1>
      <p><strong>Categoría:</strong> {product.category}</p>
      <p><strong>Precio:</strong> ${product.price}</p>
      <p><strong>Stock:</strong> {product.stock}</p>
      <p>{product.description}</p>

      <div className="row">
        <input
          type="number"
          min={1}
          max={product.stock}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
        />
        <button onClick={handleAdd} disabled={product.stock === 0}>
          Agregar al carrito
        </button>
      </div>
      {added && <p className="success">✔ Agregado al carrito</p>}

      <Link to="/products">← Volver al catálogo</Link>
    </section>
  );
}