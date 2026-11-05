# Kiosco 23 Horas — Parte 1 (Frontend)

Frontend de la app del kiosco desarrollado con **React + TypeScript + Vite + React Router**.

## Requisitos

- Node.js 20 o superior
- npm

## Instalación y ejecución

Desde la raíz del proyecto:

```bash
npm install
npm run dev
```

Abrir **http://localhost:5173**.

## Build de producción

```bash
npm run build
npm run preview
```

## Estructura

```
.
├── src/
│   ├── components/       # Header, Footer, Layout, ProductCard, CartItem
│   ├── context/          # CartContext (carrito global)
│   ├── data/             # products.ts (datos locales de la Parte 1)
│   ├── pages/            # Home, Products, ProductDetail, Cart, NotFound
│   ├── services/         # (la Parte 2 agrega api.ts)
│   ├── types/            # tipos Product y CartItemType
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
├── package.json
└── vite.config.ts
```

## Funcionalidades

- Página de inicio con acceso al catálogo.
- Catálogo de productos con filtro por categoría.
- Detalle de producto con selector de cantidad.
- Carrito con alta, baja y modificación de cantidades.
- Total del pedido y confirmación de compra.

## Datos

En esta primera parte los productos se cargan desde `src/data/products.ts` (datos locales).
La Parte 2 incorpora el backend con FastAPI y el frontend pasa a consumir la API.
