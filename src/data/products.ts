import type { Product } from "../types";

export const products: Product[] = [
  { id: 1, name: "Coca-Cola 500ml", category: "bebidas", price: 1200, stock: 25, description: "Gaseosa clásica", image: "🥤" },
  { id: 2, name: "Agua mineral 500ml", category: "bebidas", price: 800, stock: 40, description: "Agua sin gas", image: "💧" },
  { id: 3, name: "Papas Lays Clásicas", category: "snacks", price: 1500, stock: 30, description: "Papas fritas clásicas", image: "🍟" },
  { id: 4, name: "Alfajor Jorgito", category: "golosinas", price: 900, stock: 50, description: "Alfajor de chocolate", image: "🍫" },
  { id: 5, name: "Chicles Beldent", category: "golosinas", price: 600, stock: 60, description: "Pack de chicles", image: "🍬" },
  { id: 6, name: "Cigarrillos", category: "varios", price: 2500, stock: 20, description: "Atado de cigarrillos", image: "🚬" },
  { id: 7, name: "Gatorade 500ml", category: "bebidas", price: 1800, stock: 15, description: "Bebida isotónica", image: "🧃" },
  { id: 8, name: "Maní salado", category: "snacks", price: 1100, stock: 35, description: "Maní tostado con sal", image: "🥜" },
  { id: 9, name: "Pilas AA x2", category: "varios", price: 2000, stock: 18, description: "Pack de dos pilas AA", image: "🔋" },
  { id: 10, name: "Caramelos Media Hora", category: "golosinas", price: 500, stock: 70, description: "Bolsita de caramelos", image: "🍭" },
];