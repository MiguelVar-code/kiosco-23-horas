from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, field_validator

Category = Literal["bebidas", "snacks", "golosinas", "varios"]


class ProductBase(BaseModel):
    name: str
    category: Category
    price: float = Field(gt=0, description="Debe ser mayor a 0")
    stock: int = Field(ge=0, description="No puede ser negativo")
    description: str | None = None
    image: str | None = None

    @field_validator("name")
    @classmethod
    def name_no_vacio(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("El nombre del producto no puede estar vacío")
        return v


class ProductOut(ProductBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


class OrderItemIn(BaseModel):
    product_id: int
    quantity: int = Field(gt=0, description="La cantidad debe ser mayor a 0")


class OrderCreate(BaseModel):
    items: list[OrderItemIn] = Field(min_length=1)


class OrderItemOut(BaseModel):
    product_id: int
    name: str
    quantity: int
    unit_price: float
    subtotal: float


class OrderOut(BaseModel):
    id: int
    created_at: datetime
    total: float
    items: list[OrderItemOut]
    message: str | None = None
