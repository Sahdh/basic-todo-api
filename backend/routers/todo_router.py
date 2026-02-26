from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..schemas import TodoCreate, TodoUpdate, TodoRead
from ..services.todo_service import TodoService

router = APIRouter(prefix="/todos", tags=["todos"])

def get_todo_service(db: Session = Depends(get_db)):
    return TodoService(db)

@router.get("/", response_model=List[TodoRead])
def read_todos(service: TodoService = Depends(get_todo_service)):
    return service.get_todos()

@router.post("/", response_model=TodoRead)
def create_todo(todo: TodoCreate, service: TodoService = Depends(get_todo_service)):
    return service.create_todo(todo)

@router.get("/{todo_id}", response_model=TodoRead)
def read_todo(todo_id: int, service: TodoService = Depends(get_todo_service)):
    return service.get_todo(todo_id)

@router.put("/{todo_id}", response_model=TodoRead)
def update_todo(todo_id: int, todo: TodoUpdate, service: TodoService = Depends(get_todo_service)):
    return service.update_todo(todo_id, todo)

@router.delete("/{todo_id}")
def delete_todo(todo_id: int, service: TodoService = Depends(get_todo_service)):
    return service.delete_todo(todo_id)
