# Local Development & CI Verification Guide 🛠️

This document outlines how to set up, run, and verify BetForm locally before opening Pull Requests.

---

## 🚀 Environment Setup

### 1. Prerequisites
- **Node.js**: `≥ 20.x`
- **npm**: `≥ 9.x`
- **PostgreSQL Database** (or Supabase Instance)

### 2. Configure Environment Variables

#### Backend Configuration (`backend/.env`):
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/betform"
DIRECT_URL="postgresql://postgres:password@localhost:5432/betform"
PORT=3000
FRONTEND_URL="http://localhost:5173"
```

#### Frontend Configuration (`frontend/.env`):
```env
VITE_BACKEND_URL="http://localhost:3000"
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

---

## 🏃 Running the Application

### Frontend (Vite + React 19)
```bash
cd frontend
npm install
npm run dev
# App starts at http://localhost:5173
```

### Backend (NestJS + Prisma)
```bash
cd backend
npm install
npm run dev
# Server starts at http://localhost:3000
```

---

## 🔍 Running CI Verification Checks Locally

Before opening a PR targeting `dev`, run the following checks to ensure CI passes:

### 1. Frontend Checks
```bash
cd frontend
npm run lint      # Runs ESLint checks
npm run build     # Runs TypeScript compiler (tsc) & Vite build
```

### 2. Backend Checks
```bash
cd backend
npm run lint      # Runs ESLint checks
npm run build     # Runs NestJS build & TypeScript checks
```

---

## 📁 Repository Structure

```
bet-form/
├── .github/
│   ├── workflows/ci.yml       # Automated GitHub Actions CI workflow
│   ├── ISSUE_TEMPLATE/        # Standardized issue templates
│   └── PULL_REQUEST_TEMPLATE.md
├── frontend/                  # React 19 + Tailwind CSS + Zustand
├── backend/                   # NestJS + Prisma ORM + PostgreSQL
├── CONTRIBUTING.md            # Open source governance & contribution guidelines
├── DEVELOPMENT.md             # Development guide & environment setup
└── CODE_OF_CONDUCT.md         # Contributor Covenant Code of Conduct
```
