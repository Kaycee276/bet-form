<p align="center">
  <img src="frontend/public/logo.png" width="100" alt="BetForm Logo" />
</p>

# Local Development & CI Verification Guide 🛠️

This document outlines how to set up, run, and verify BetForm locally before opening Pull Requests.

---

## 🚀 Environment Setup

### 1. Prerequisites
- **Node.js**: `≥ 20.x`
- **pnpm**: `≥ 9.x` (or `npm ≥ 9.x`)
- **Rust Toolchain**: `stable` (with `rustfmt` and `clippy`)
  - Target: `wasm32v1-none` (`rustup target add wasm32v1-none`)
- **Stellar / Soroban CLI**: `cargo install --locked stellar-cli`
- **PostgreSQL Database** (or Supabase Instance)

### 2. Configure Environment Variables

#### Backend Configuration (`backend/.env`):
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/betform"
DIRECT_URL="postgresql://postgres:password@localhost:5432/betform"
PORT=3000
FRONTEND_URL="http://localhost:5173"
STELLAR_NETWORK="testnet"
SOROBAN_RPC_URL="https://soroban-testnet.stellar.org"
CONTEST_CONTRACT_ID="C..."
```

#### Frontend Configuration (`frontend/.env`):
```env
VITE_BACKEND_URL="http://localhost:3000"
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"
VITE_STELLAR_NETWORK="testnet"
VITE_SOROBAN_RPC_URL="https://soroban-testnet.stellar.org"
VITE_CONTEST_CONTRACT_ID="C..."
```

---

## 🏃 Running the Application

### 1. Frontend (Vite + React 19)
```bash
cd frontend
pnpm install
pnpm run dev
# App starts at http://localhost:5173
```

### 2. Backend (NestJS + Prisma)
```bash
cd backend
pnpm install
npx prisma generate
pnpm run dev
# Server starts at http://localhost:3000
```

### 3. Soroban Smart Contracts (Rust)
```bash
cd contracts/betform_contest

# Build the WASM contract for Soroban
cargo build --target wasm32v1-none --release

# Run unit tests
cargo test
```

#### Optional: Deploy to Stellar Testnet
```bash
cd contracts/betform_contest
chmod +x deploy.sh
./deploy.sh
```

---

## 🔍 Running CI Verification Checks Locally

Before opening a PR targeting `dev`, run the following checks to ensure the automated GitHub Actions CI workflow passes:

### 1. Frontend Checks (`frontend-ci`)
```bash
cd frontend
pnpm run lint      # Runs ESLint checks
pnpm test          # Runs Vitest unit & component tests
pnpm run build     # Runs TypeScript compiler (tsc) & Vite build
```

### 2. Backend Checks (`backend-ci`)
```bash
cd backend
pnpm run lint          # Runs ESLint checks
npx prisma generate    # Generates Prisma client
pnpm test              # Runs Jest unit tests
pnpm run build         # Runs NestJS build & TypeScript checks
```

### 3. Soroban Contracts Checks (`contracts-ci`)
```bash
cd contracts/betform_contest
cargo fmt --check                   # Formatter compliance
cargo clippy -- -D warnings         # Strict linting without warnings
cargo test                          # Rust unit and integration tests
cargo build --target wasm32v1-none --release # WASM target compilation
```

---

## 📁 Repository Structure

```
bet-form/
├── .github/
│   ├── workflows/ci.yml       # Automated 3-tier GitHub Actions CI workflow
│   ├── ISSUE_TEMPLATE/        # Standardized issue templates
│   └── PULL_REQUEST_TEMPLATE.md
├── frontend/                  # React 19 + Tailwind CSS + Zustand + Stellar SDK
├── backend/                   # NestJS + Prisma ORM + PostgreSQL + Oracle Service
├── contracts/
│   └── betform_contest/       # Soroban Rust Smart Contract (WASM target wasm32v1-none)
│       ├── src/
│       │   ├── lib.rs         # Contract state, contest logic & USDC staking
│       │   └── test.rs        # Comprehensive Soroban test suite
│       ├── Cargo.toml         # Rust dependencies (soroban-sdk)
│       └── deploy.sh          # Testnet contract deployment script
├── CONTRIBUTING.md            # Open source governance & contribution guidelines
├── DEVELOPMENT.md             # Development guide & environment setup
├── CODE_OF_CONDUCT.md         # Contributor Covenant Code of Conduct
└── LICENSE                    # MIT Open-Source License
```
