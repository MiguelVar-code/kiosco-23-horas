import type { CartItemType } from "../types";
import { useCart } from "../context/CartContext";

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <li className="cart-item">
      <div className="cart-thumb">
        {product.image ? (
          <img className="cart-img" src={product.image} alt={product.name} />
        ) : (
          <span className="card-fallback" aria-hidden="true">
            {product.name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      <div className="cart-info">
        <p className="cart-name">{product.name}</p>
        <p className="cart-cat">
          {product.category} · ${product.price} c/u
        </p>
      </div>

      <div className="qty-control">
        <button
          type="button"
          onClick={() => updateQuantity(product.id, quantity - 1)}
          aria-label="Quitar uno"
        >
          −
        </button>
        <input
          type="number"
          min={1}
          max={product.stock}
          value={quantity}
          onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
          aria-label={`Cantidad de ${product.name}`}
        />
        <button
          type="button"
          onClick={() => updateQuantity(product.id, quantity + 1)}
          disabled={quantity >= product.stock}
          aria-label="Agregar uno"
        >
          +
        </button>
      </div>

      <span className="cart-subtotal">${product.price * quantity}</span>

      <button
        className="remove-btn"
        onClick={() => removeFromCart(product.id)}
        aria-label={`Eliminar ${product.name}`}
        title="Eliminar"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 6h18" />
          <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
        </svg>
      </button>
    </li>
  );
}
