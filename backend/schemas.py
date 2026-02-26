from pydantic import BaseModel, Field
from typing import Optional, List

# Category Schemas
class CategoryBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)

class CategoryCreate(CategoryBase):
    pass

class CategoryRead(CategoryBase):
    id: int

    class Config:
        from_attributes = True

# Todo Schemas
class TodoBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    is_completed: bool = False
    category_id: Optional[int] = None

class TodoCreate(TodoBase):
    pass

class TodoUpdate(TodoBase):
    title: Optional[str] = Field(None, min_length=1, max_length=200)

class TodoRead(TodoBase):
    id: int
    category: Optional[CategoryRead] = None

    class Config:
        from_attributes = True
