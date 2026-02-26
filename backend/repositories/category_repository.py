from sqlalchemy.orm import Session
from ..models import Category
from ..schemas import CategoryCreate

class CategoryRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(Category).all()

    def get_by_id(self, category_id: int):
        return self.db.query(Category).filter(Category.id == category_id).first()
    
    def get_by_name(self, name: str):
        return self.db.query(Category).filter(Category.name == name).first()

    def create(self, category: CategoryCreate):
        db_category = Category(name=category.name)
        self.db.add(db_category)
        self.db.commit()
        self.db.refresh(db_category)
        return db_category
