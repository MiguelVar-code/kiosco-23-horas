import { useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

const categories = ["bebidas", "snacks", "golosinas", "varios"];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") ?? "";

  const filtered = category
    ? products.filter((p) => p.category === category)
    : products;

  const handleChange = (value: string) => {
    if (value) setSearchParams({ category: value });
    else setSearchParams({});
  };

  return (
    <section>
      <h1>Productos</h1>
      <label>
        Categoría:{" "}
        <select value={category} onChange={(e) => handleChange(e.target.value)}>
          <option value="">Todas</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>

      <div className="grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {filtered.length === 0 && <p>No hay productos en esta categoría.</p>}
    </section>
  );
}