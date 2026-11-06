# Kiosco 23 Horas
______________________________________________________________________________________________________________________________________________________________________________________________________________________________
Mini-app de un kiosco de barrio.
EQUIPO DE TRABAJO: Varela Miguel Marcelo - Romano Jesus Valentin - Salomón Riveras José Alejandro
______________________________________________________________________________________________________________________________________________________________________________________________________________________________


- **Parte 1 (tag `parte-1`):** frontend con React + TypeScript + Vite + React Router, usando datos locales.
- **Parte 2 (tag `parte-2`):** backend con FastAPI + SQLite + SQLAlchemy + Pydantic y frontend conectado a la API.

## Estructura

```
.
├── backend/              # API (FastAPI + SQLite)
│   ├── main.py           # app, CORS y carga de productos iniciales
│   ├── database.py       # conexión SQLite
│   ├── models.py         # tablas products y orders (SQLAlchemy)
│   ├── schemas.py        # validaciones (Pydantic)
│   ├── routers/
│   │   ├── products.py
│   │   └── orders.py
│   └── requirements.txt
└── src/                  # frontend
    ├── components/       # Header, Footer, Layout, ProductCard, CartItem
    ├── context/          # CartContext (carrito global)
    ├── pages/            # Home, Products, ProductDetail, Cart, NotFound
    ├── services/api.ts   # fetch a la API: getProducts, getProductById, createOrder
    └── types/            # tipos Product y CartItemType
```

## Requisitos

- Node.js 20 o superior + npm
- Python 3.10 o superior

---

## 1. Instalar y correr el backend

```bash
cd backend
python -m venv .venv

# Windows:
.venv\Scripts\activate
# Linux/Mac:
source .venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload
```

- API: <http://localhost:8000>
- Documentación interactiva (Swagger): <http://localhost:8000/docs>
- Al iniciar por primera vez se crea `backend/kiosco.db` y se cargan los 10 productos iniciales.
  Para volver al stock original, detené el servidor y borrá `kiosco.db`.

### Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/products` | Lista productos. Filtro opcional `?category=bebidas` |
| GET | `/api/products/{id}` | Detalle de un producto (404 si no existe) |
| POST | `/api/orders` | Crea un pedido: valida, calcula el total y descuenta stock |
| GET | `/api/orders` | Lista los pedidos realizados |

Body de `POST /api/orders`:

```json
{ "items": [ { "product_id": 1, "quantity": 2 }, { "product_id": 5, "quantity": 1 } ] }
```

Errores: `404` producto inexistente, `409` stock insuficiente, `422` datos inválidos
(cantidad <= 0, lista vacía, etc.). Si el pedido falla, no se descuenta stock.

---

## 2. Instalar y correr el frontend apuntando a la API

En **otra terminal**, desde la raíz del proyecto (con el backend ya corriendo):

```bash
npm install
npm run dev
```

Abrir <http://localhost:5173>.

### Apuntar el frontend a la API

La URL base de la API está en `src/services/api.ts` y se toma de `VITE_API_URL`.
Si no se define, usa por defecto `http://localhost:8000`:

```ts
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";
```

Para cambiarla, creá un archivo `.env` en la raíz:

```bash
VITE_API_URL=http://localhost:8000
```

Reiniciá `npm run dev` después de modificar el `.env`.

> El backend ya tiene CORS habilitado para `http://localhost:5173`, el puerto de Vite.

## 3. Build de producción

```bash
npm run build
npm run preview
```

---

## Cómo se conectan frontend y backend

- `Products` y `ProductDetail` piden los datos con `fetch` (`useEffect` + `useState`) y muestran
  "Cargando..." y mensajes de error en pantalla.
- `Cart` envía el pedido a `POST /api/orders` al presionar "Finalizar pedido": si sale bien vacía el
  carrito y muestra la confirmación; si falla (stock, red, validación) conserva el carrito y muestra el error.
- Los datos mock (`src/data/products.ts`) se eliminaron: ahora los productos viven en SQLite.

## Tags de la entrega

| Tag | Contenido |
|-----|-----------|
| `parte-1` | Solo frontend con datos locales (`npm install` + `npm run dev`). |
| `parte-2` | Backend `backend/` con FastAPI + frontend conectado a la API. |

Para ver una parte en particular:

```bash
git checkout parte-1
# o
git checkout parte-2
```
