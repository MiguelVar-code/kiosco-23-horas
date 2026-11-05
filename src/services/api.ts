import type { Product } from "../types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export interface OrderItemInput {
  product_id: number;
  quantity: number;
}

export interface OrderResponse {
  id: number;
  total: number;
  message?: string;
}

// Convierte cualquier respuesta no exitosa en un Error con mensaje legible
async function handleResponse<T>(res: Response): Promise<T> {
  if (res.ok) return res.json() as Promise<T>;

  let message = `Error del servidor (${res.status})`;
  try {
    const body = await res.json();
    if (typeof body.detail === "string") {
      message = body.detail;
    } else if (Array.isArray(body.detail) && body.detail[0]?.msg) {
      message = body.detail[0].msg; // error de validación de Pydantic
    }
  } catch {
    // la respuesta no era JSON: queda el mensaje genérico
  }
  throw new Error(message);
}

// fetch solo rechaza ante fallas de red: lo traducimos a un mensaje claro
async function request<T>(url: string, options?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, options);
  } catch {
    throw new Error("No se pudo conectar con el servidor. Verificá que el backend esté encendido.");
  }
  return handleResponse<T>(res);
}

export function getProducts(category?: string): Promise<Product[]> {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return request<Product[]>(`${API_URL}/api/products${query}`);
}

export function getProductById(id: number): Promise<Product> {
  return request<Product>(`${API_URL}/api/products/${id}`);
}

export function createOrder(items: OrderItemInput[]): Promise<OrderResponse> {
  return request<OrderResponse>(`${API_URL}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
}
