# Global Copilot Instructions

## Architecture Rules
1. **Backend**: Strictly adhere to the Route -> Service -> Repository layer pattern in Python (FastAPI).
2. **Frontend**: Use Tailwind CSS utility classes and React functional components (with hooks).
3. **Database**: Forbid raw SQL queries; mandate SQLAlchemy ORM usage strictly.
4. **Configuration**: All secrets, URLs, and database connection strings MUST be read from `.env` files.
5. **Quality**: Ensure consistent, secure error handling without leaking stack traces. Use Pydantic models for request/response validation.
