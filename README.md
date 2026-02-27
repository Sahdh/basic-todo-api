# Basic Todo API

This repository contains a simple full‑stack todo application built with:

- **Backend:** FastAPI, SQLAlchemy, SQLite (or any DB via `DATABASE_URL`), Python.
- **Frontend:** React (TypeScript) with Vite and Tailwind CSS.
- **Testing:** Pytest for backend and Playwright e2e tests for the UI.

The goal is to demonstrate clean architecture with separate router/service/repository layers and a lightweight React interface. It's intended as a starter/learning project or as a template for building small APIs.

## Features

- CRUD operations for todos and categories
- Simple login mock (UI-only)
- Dark mode toggle
- Responsive layout
- End‑to‑end tests with database reset endpoint

## Getting Started

See [SETUP.md](./SETUP.md) for detailed setup instructions. In short:

1. Install Python & Node.js.
2. Create a Python virtual environment and install backend requirements.
3. Run `uvicorn backend.main:app --reload` to start the API on `localhost:8000`.
4. In `frontend/`, run `npm install` and then `npm run dev` for the UI on `localhost:5173`.
5. Optionally run tests:
   - `cd backend && pytest`
   - `cd frontend && npx playwright test --reporter=list` (requires both servers running)

## Contributing

Feel free to fork or clone the repository, add features, or improve tests. Pull requests are welcome.

## License

MIT License (see `LICENSE` if provided).
