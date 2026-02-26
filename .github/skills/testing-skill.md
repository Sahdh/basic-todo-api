# Testing Custom Skill

1. **Framework**: Strictly use `pytest` for backend testing.
2. **Mocking**: Mock the SQLAlchemy database session or use an in-memory SQLite database. *DO NOT* hit the real SQL Server for unit tests.
3. **Coverage**: Test both the happy path and failure edge cases for the Service and Repository layers.
4. **Structure**: Keep tests separated by entity and feature. Use Pytest fixtures efficiently.
