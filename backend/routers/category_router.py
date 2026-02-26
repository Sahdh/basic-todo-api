from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..schemas import CategoryCreate, CategoryRead
from ..services.category_service import CategoryService

router = APIRouter(prefix="/categories", tags=["categories"])

def get_category_service(db: Session = Depends(get_db)):
    return CategoryService(db)

@router.get("/", response_model=List[CategoryRead])
def read_categories(service: CategoryService = Depends(get_category_service)):
    return service.get_categories()

@router.post("/", response_model=CategoryRead)
def create_category(category: CategoryCreate, service: CategoryService = Depends(get_category_service)):
    return service.create_category(category)

@router.get("/{category_id}", response_model=CategoryRead)
def read_category(category_id: int, service: CategoryService = Depends(get_category_service)):
    return service.get_category(category_id)
