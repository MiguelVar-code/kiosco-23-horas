from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, SessionLocal, engine
from models import Product
from routers import orders, products

# Productos iniciales (los mismos que tenía src/data/products.ts en la Parte 1)
# Imágenes reales guardadas en public/images/<categoria>/
INITIAL_PRODUCTS = [
    {"id": 1, "name": "Coca-Cola 500ml", "category": "bebidas", "price": 1200, "stock": 25, "description": "Gaseosa clásica", "image": "/images/bebidas/coca-cola-500ml.jpg"},
    {"id": 2, "name": "Agua mineral 500ml", "category": "bebidas", "price": 800, "stock": 40, "description": "Agua sin gas", "image": "/images/bebidas/agua-mineral-500ml.jpg"},
    {"id": 3, "name": "Papas Lays Clásicas", "category": "snacks", "price": 1500, "stock": 30, "description": "Papas fritas clásicas", "image": "/images/snacks/papas-lays-clasicas.jpg"},
    {"id": 4, "name": "Alfajor Jorgito", "category": "golosinas", "price": 900, "stock": 50, "description": "Alfajor de chocolate", "image": "/images/golosinas/alfajor-jorgito.jpg"},
    {"id": 5, "name": "Chicles Beldent", "category": "golosinas", "price": 600, "stock": 60, "description": "Pack de chicles", "image": "/images/golosinas/chicles-beldent.jpg"},
    {"id": 6, "name": "Cigarrillos", "category": "varios", "price": 2500, "stock": 20, "description": "Atado de cigarrillos", "image": "/images/varios/cigarrillos.jpg"},
    {"id": 7, "name": "Gatorade 500ml", "category": "bebidas", "price": 1800, "stock": 15, "description": "Bebida isotónica", "image": "/images/bebidas/gatorade-500ml.jpg"},
    {"id": 8, "name": "Maní salado", "category": "snacks", "price": 1100, "stock": 35, "description": "Maní tostado con sal", "image": "/images/snacks/mani-salado.jpg"},
    {"id": 9, "name": "Pilas AA x2", "category": "varios", "price": 2000, "stock": 18, "description": "Pack de dos pilas AA", "image": "/images/varios/pilas-aa-x2.jpg"},
    {"id": 10, "name": "Caramelos Media Hora", "category": "golosinas", "price": 500, "stock": 70, "description": "Bolsita de caramelos", "image": "/images/golosinas/caramelos-media-hora.jpg"},
]


def init_db():
    """Crea las tablas, carga los productos iniciales si está vacía y actualiza sus imágenes."""
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        if db.query(Product).count() == 0:
            db.add_all([Product(**p) for p in INITIAL_PRODUCTS])
            db.commit()
        else:
            # Actualiza las imágenes para migrar de emojis a fotos reales
            for p in INITIAL_PRODUCTS:
                prod = db.query(Product).filter(Product.id == p["id"]).first()
                if prod and prod.image != p["image"]:
                    prod.image = p["image"]
            db.commit()
    finally:
        db.close()


init_db()

app = FastAPI(title="Kiosco 23 Horas API")

# CORS: permite que el frontend de Vite (puerto 5173) llame a la API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router)
app.include_router(orders.router)
