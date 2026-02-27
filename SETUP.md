# Setup Instructions for Basic Todo API

This repository contains a simple todo application with a FastAPI backend and a React+Vite frontend. The following steps explain how to get the project running locally and how the test suite works.

---

## Prerequisites

- **Python 3.13+** (or compatible) installed on your machine.
- **Node.js 18+** (with npm) for frontend and Playwright tests.
- **Git** for cloning the repository.

Optionally, a virtual environment (venv) for Python is recommended.

## Backend (FastAPI)

1. Clone the repository and change into the directory:
   ```bash
   git clone https://github.com/Sahdh/basic-todo-api.git
   cd basic-todo-api
   ```

2. Create and activate a Python virtual environment:
   ```bash
   python -m venv .venv
   # Windows
   .\.venv\Scripts\Activate.ps1
   # macOS / Linux
   source .venv/bin/activate
   ```

3. Install backend dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```

4. (Optional) Create a `.env` file under `backend/` to override settings, e.g.:
   ```ini
   DATABASE_URL=sqlite:///./data.db
   ```

5. Start the development server:
   ```bash
   uvicorn backend.main:app --reload
   ```
   The API will be available at `http://127.0.0.1:8000`.

### Database

- The app uses SQLAlchemy with a default SQLite file (`test.db`).
- On startup the tables are created automatically. You can reset the database via
  a special endpoint used by automated tests:
  `POST http://127.0.0.1:8000/testing/reset` (development only).

### Running Python tests

Navigate to the backend folder and run:

```bash
cd backend
pytest
```

These tests cover services, repositories and edge cases.

---

## Frontend (React + Vite)

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Run in development mode:
   ```bash
   npm run dev
   ```
   The UI will open at `http://localhost:5173` and talk to the backend API once
the server is running.

### Playwright end-to-end tests

The project includes a Playwright test suite under `frontend/tests`. Before
automated tests can run, ensure both backend (`localhost:8000`) and frontend
(`localhost:5173`) servers are running.

To run the Playwright suite:

```bash
cd frontend
npx playwright test --reporter=list
```

A helper endpoint (`/testing/reset`) is used to wipe the database between
specs. The configuration runs the tests serially in Chromium for stability.

---

## Additional Notes

- CORS is wide open (`*`) for development; tighten this in production.
- No authentication is implemented except a mock login for the UI; the API
  endpoints are unsecured.

Feel free to extend or deploy as needed. Contributions and issues are welcome!
