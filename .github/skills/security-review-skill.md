# Security Review Custom Skill

1. **SQL Injection**: Check that all database queries use SQLAlchemy parameterized queries via the ORM safely.
2. **XSS**: Check that React UI properly sanitizes any injected values.
3. **CORS**: Verify FastAPI backend restricts or explicitly defines CORS appropriately.
4. **Validation**: Ensure Pydantic schemas enforce length limits and field constraints.
5. **Errors**: Verify proper HTTP status codes (400, 422, 404) are returned without dumping internal Python stack traces.
