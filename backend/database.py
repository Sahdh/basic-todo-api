import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

load_dotenv()

# We need to construct the URL for pyodbc. 
# Windows Auth usually looks like: mssql+pyodbc:///?odbc_connect=Driver={...};Server=...;Database=...;Trusted_Connection=yes;
# If the environment variable isn't set, fallback to a local sqlite string for basic compilation (or unit tests).
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")

# Only use check_same_thread=False for sqlite.
connect_args = {"check_same_thread": False} if "sqlite" in SQLALCHEMY_DATABASE_URL else {}

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
