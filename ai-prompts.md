# AI Prompts for Todo API

## Phase 1: Context

### Step 1.1: PRD
Role: You are an Expert Technical Product Manager.
Task: Generate a comprehensive Product Requirements Document (PRD) for a Single User Todo Application.
Audience: Senior Software Architects and Developers.
Context: 
- Single repository for both frontend and backend.
- Starts as a basic Todo list, expands to Categories.
- No authentication.
- Frontend: React with Tailwind CSS.
- Backend: Python FastAPI.
- Database: Local SQL Server Express Edition using Windows Authentication (Trusted_Connection=yes).
- Config: .env file.
Constraints: Markdown format. Milestones: Basic Todo, Unit Testing, Category Integration, Edge Case Handling.

### Step 1.2: TRD
Role: You are a Principal Software Architect.
Task: Create a Technical Requirements Document (TRD) based on the PRD.
Audience: Senior Backend and Frontend Developers.
Context: 
- Single repo structure.
- Frontend: React, Tailwind CSS, Vite.
- Backend: Python FastAPI, SQLAlchemy ORM, Alembic.
- Database: SQL Server Express with Windows Authentication via pyodbc.
- Architecture: Strict Route -> Controller -> Service -> Repository.
Constraints: Markdown format. Folder structure, API contracts, schema evolution.

### Step 1.3: Global AI Instructions
Role: You are an AI Integration Specialist.
Task: Create a `.github/copilot-instructions.md` file.
Constraints: Route -> Service -> Repository architecture. Tailwind functional components. SQLAlchemy ORM. .env configuration.

### Step 1.4: AI Skills
Role: You are an Enterprise Automation Architect.
Task: Create Custom Skill instruction files.
Constraints:
- `.github/skills/testing-skill.md`: Pytest, mock database sessions.
- `.github/skills/security-review-skill.md`: SQL Injection, XSS, CORS, Pydantic validation.

## Phase 2: Foundation & Phase 3: Testing

### Step 2.1 & 2.2: Scaffolding Setup
Task: Scaffold FastAPI backend and React frontend.

## Phase 4 & Phase 5: Categories & TDD
Task: Add Category model to backend and frontend. Write Edge case tests and resolve them.
