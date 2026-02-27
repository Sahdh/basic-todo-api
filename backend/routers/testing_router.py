from fastapi import APIRouter
from ..database import engine, Base

# A simple testing-only router to reset the database. Not exposed in prod.
router = APIRouter(prefix="/testing", tags=["testing"])

@router.post("/reset")
def reset_db():
    # drop all tables and recreate
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    return {"status": "ok"}
