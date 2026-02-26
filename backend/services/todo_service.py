from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException
from ..repositories.todo_repository import TodoRepository
from ..repositories.category_repository import CategoryRepository
from ..schemas import TodoCreate, TodoUpdate

class TodoService:
    def __init__(self, db: Session):
        self.repository = TodoRepository(db)
        self.category_repository = CategoryRepository(db)

    def get_todos(self):
        return self.repository.get_all()

    def get_todo(self, todo_id: int):
        todo = self.repository.get_by_id(todo_id)
        if not todo:
            raise HTTPException(status_code=404, detail="Todo not found")
        return todo

    def create_todo(self, todo_data: TodoCreate):
        if todo_data.category_id is not None:
            category = self.category_repository.get_by_id(todo_data.category_id)
            if not category:
                raise HTTPException(status_code=400, detail="Invalid category_id")
        try:
            return self.repository.create(todo_data)
        except IntegrityError:
            raise HTTPException(status_code=400, detail="Data constraint violation")

    def update_todo(self, todo_id: int, todo_data: TodoUpdate):
        todo = self.get_todo(todo_id)
        
        if todo_data.category_id is not None:
            category = self.category_repository.get_by_id(todo_data.category_id)
            if not category:
                raise HTTPException(status_code=400, detail="Invalid category_id")
                
        try:
            return self.repository.update(todo, todo_data)
        except IntegrityError:
            raise HTTPException(status_code=400, detail="Data constraint violation")

    def delete_todo(self, todo_id: int):
        todo = self.get_todo(todo_id)
        self.repository.delete(todo)
        return {"detail": "Todo deleted"}
