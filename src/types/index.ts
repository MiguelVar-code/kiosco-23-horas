export type Category = "bebidas" | "snacks" | "golosinas" | "varios";

export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  stock: number;
  description: string;
  image?: string; // emoji o URL
}

export interface CartItemType {
  product: Product;
  quantity: number;
}