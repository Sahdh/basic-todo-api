from sqlalchemy.orm import Session
from ..models import Todo
from ..schemas import TodoCreate, TodoUpdate

class TodoRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(Todo).all()

    def get_by_id(self, todo_id: int):
        return self.db.query(Todo).filter(Todo.id == todo_id).first()

    def create(self, todo: TodoCreate):
        db_todo = Todo(**todo.model_dump())
        self.db.add(db_todo)
        self.db.commit()
        self.db.refresh(db_todo)
        return db_todo

    def update(self, db_todo: Todo, todo_update: TodoUpdate):
        update_data = todo_update.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_todo, key, value)
        self.db.commit()
        self.db.refresh(db_todo)
        return db_todo

    def delete(self, db_todo: Todo):
        self.db.delete(db_todo)
        self.db.commit()
