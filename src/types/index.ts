export type Category = "bebidas" | "snacks" | "golosinas" | "varios";

export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  stock: number;
  description: string;
  image?: string; // URL de la foto real (ej: /images/bebidas/coca-cola-500ml.jpg)
}

export interface CartItemType {
  product: Product;
  quantity: number;
}