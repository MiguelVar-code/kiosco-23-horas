from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# La base de datos es un archivo SQLite que se crea solo al iniciar el servidor.
DATABASE_URL = "sqlite:///./kiosco.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()


def get_db():
    """Entrega una sesión de BD por request y la cierra al terminar."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
