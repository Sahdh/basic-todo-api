from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import category_router, todo_router
# import testing router directly to avoid package attribute issues
from backend.routers.testing_router import router as testing_router

# Create DB tables. In production, Alembic handles this, but for quick local tests this ensures tables exist.
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Todo API", description="Enterprise architecture Todo Application")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(category_router.router)
app.include_router(todo_router.router)
app.include_router(testing_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Todo API"}
