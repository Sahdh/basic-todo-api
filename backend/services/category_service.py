from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException
from ..repositories.category_repository import CategoryRepository
from ..schemas import CategoryCreate

class CategoryService:
    def __init__(self, db: Session):
        self.repository = CategoryRepository(db)

    def get_categories(self):
        return self.repository.get_all()

    def get_category(self, category_id: int):
        category = self.repository.get_by_id(category_id)
        if not category:
            raise HTTPException(status_code=404, detail="Category not found")
        return category

    def create_category(self, category_data: CategoryCreate):
        existing = self.repository.get_by_name(category_data.name)
        if existing:
            raise HTTPException(status_code=400, detail="Category name already exists")
        try:
            return self.repository.create(category_data)
        except IntegrityError:
            raise HTTPException(status_code=400, detail="Data constraint violation")
