# Technical Requirements Document (TRD)

## Stack Details
- **Frontend**: React + Vite + Tailwind CSS (`/frontend`)
- **Backend**: FastAPI + SQLAlchemy + Alembic (`/backend`)
- **DB Driver**: `pyodbc` connecting to SQL Server (`Trusted_Connection=yes;DRIVER={ODBC Driver 17 for SQL Server}`)

## Backend Architecture Layout
- **Routers** (`routers/`): Define the HTTP endpoints. Inject `Service`.
- **Services** (`services/`): Pure business logic. Inject `Repository`.
- **Repositories** (`repositories/`): Data access layer. Handles SQLAlchemy models.
- **Schemas** (`schemas.py`): Pydantic validation models.
- **Models** (`models.py`): SQLAlchemy database entities.

## Database Schema
1. **Todo**: ID (PK), Title (str), IsCompleted (bool), CategoryID (FK).
2. **Category**: ID (PK), Name (str).
