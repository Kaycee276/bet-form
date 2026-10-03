<p align="center">
  <img src="frontend/public/logo.png" width="140" alt="BetForm Logo" />
</p>

# BetForm ⚽

> **A decentralized football tactical prediction game.** Predict starting formations and starting XIs for top football fixtures, compete on a skill-based global leaderboard, and stake USDC in non-custodial contest pools powered by **Stellar Soroban smart contracts**.

<p align="center">
  <a href="https://github.com/Kaycee276/bet-form/actions/workflows/ci.yml"><img src="https://github.com/Kaycee276/bet-form/actions/workflows/ci.yml/badge.svg?branch=dev" alt="CI Status" /></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT" /></a>
  <a href="https://stellar.org"><img src="https://img.shields.io/badge/Network-Stellar-black.svg?logo=stellar" alt="Stellar Network" /></a>
  <a href="https://soroban.stellar.org"><img src="https://img.shields.io/badge/Smart%20Contracts-Soroban%20Rust-purple.svg" alt="Soroban Smart Contracts" /></a>
</p>

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Stellar & Soroban Architecture](#stellar--soroban-architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Scoring System](#scoring-system)
- [Fixture Status Lifecycle](#fixture-status-lifecycle)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

BetForm allows football enthusiasts to put their tactical knowledge to the test. Before kickoff, users pick a match, select a formation from 15 tactical layouts, and choose the exact 11 players they predict will start. Predictions are scored using a proximity-based, odds-weighted algorithm — rewarding bold, accurate calls over obvious selections.

Players can participate in free social competitions or enter **USDC-staked decentralized contest pools** escrowed by Soroban smart contracts on the Stellar blockchain.

---

## Key Features

| Feature | Details |
|---|---|
| **Stellar Soroban Escrow** | Non-custodial contest pools; USDC stakes escrowed and distributed via smart contract |
| **Tactical Prediction Flow** | 3-step submission: Formation Selection → XI Builder → Review & On-Chain Staking |
| **15 Tactical Formations** | Comprehensive odds engine from standard 4-3-3 to niche 3-3-3-1 formations |
| **Interactive Pitch Visual** | Real-time SVG pitch visualization updating instantly upon player selection |
| **Proximity Scoring Engine** | Multi-tier scoring evaluating position proximity (exact, adjacent, nearby) |
| **Automated Verification** | Backend oracle settles fixtures using verified match lineup feeds |
| **Global Leaderboard** | Real-time global ranking table tracking historical prediction performance |

---

## Stellar & Soroban Architecture

The on-chain layer (`contracts/betform_contest/`) handles decentralized contest pool creation, entry staking, and prize settlement on Stellar:

```
[ Contributor / User ]
         │  Freighter Wallet / Stellar SDK
         ▼
[ Frontend (React 19) ]
         │  USDC Stake + SHA-256 Prediction Hash
         ▼
[ Soroban Smart Contract (Rust) ] ◄── [ Backend Oracle (NestJS) ]
         │                                       │
         ├─ enter_contest(user, contest_id)      └─ settle_contest(contest_id, winners)
         └─ Automated USDC Payout to Leaderboard Winners
```

- **`initialize(admin, usdc_token)`**: Configures the platform administrator and the Stellar USDC token contract address.
- **`create_contest(contest_id, entry_fee, lock_time)`**: Initializes a new contest pool tied to a football fixture.
- **`enter_contest(user, contest_id, prediction_hash)`**: Escrows the user's USDC entry fee and records their immutable prediction hash on-chain.
- **`settle_contest(contest_id, winners)`**: Disburses the escrowed USDC prize pool directly to winning addresses based on verified match scores.

---

## Tech Stack

### Smart Contracts (Stellar / Soroban)
| Component | Technology | Purpose |
|---|---|---|
| Language | Rust (`no_std`) | Memory-safe smart contract implementation |
| SDK | `soroban-sdk` 22.x | Stellar smart contract framework |
| Compilation Target | `wasm32v1-none` | Production WebAssembly contract target |
| Tooling | Stellar CLI / Cargo | Local sandbox, contract building, and testnet deployment |

### Frontend
| Component | Technology | Purpose |
|---|---|---|
| Framework | React 19 + TypeScript | High-performance user interface |
| Build Tool | Vite 8 | Fast ESM bundler & dev server |
| Styling | Tailwind CSS 4 | Glassmorphic tactical pitch UI |
| State Management | Zustand 5 | Client prediction state & modal control |
| Web3 Integration | `@stellar/stellar-sdk` & Freighter API | Stellar wallet connection and transaction signing |

### Backend & Infrastructure
| Component | Technology | Purpose |
|---|---|---|
| Server Framework | NestJS 11 + TypeScript | Modular API and oracle settlement service |
| ORM | Prisma ORM 7 | Database modeling and migrations |
| Database | PostgreSQL (Supabase) | Fixtures, squad cache, and user profile storage |
| Data Provider | API-Football | Real-time match schedules, squads, and confirmed lineups |

---

## Project Structure

```
bet-form/
├── .github/
│   ├── workflows/ci.yml       # 3-tier matrix CI (frontend, backend, contracts)
│   ├── ISSUE_TEMPLATE/        # GitHub issue templates
│   └── PULL_REQUEST_TEMPLATE.md
├── frontend/                  # React 19 + Vite + Tailwind + Stellar SDK
│   ├── src/
│   │   ├── components/        # Pitch visual, modal dialogs, player pickers
│   │   ├── pages/             # Tactical pitch & landing views
│   │   └── store/             # Zustand prediction state
├── backend/                   # NestJS 11 API & Oracle Service
│   ├── src/                   # Fixture sync, settlement, scoring modules
│   └── prisma/                # Prisma schema & database migrations
├── contracts/
│   └── betform_contest/       # Soroban Rust Smart Contract
│       ├── src/
│       │   ├── lib.rs         # Contest escrow & payout logic
│       │   └── test.rs        # Automated Soroban unit test suite
│       ├── Cargo.toml         # Rust dependencies
│       └── deploy.sh          # Testnet deployment automation script
├── CONTRIBUTING.md            # Contribution guidelines & bounty workflows
├── DEVELOPMENT.md             # Local setup & CI verification commands
├── CODE_OF_CONDUCT.md         # Contributor Covenant Code of Conduct
└── LICENSE                    # MIT Open-Source License
```

---

## Getting Started

### Prerequisites
- **Node.js**: `≥ 20.x` & **pnpm**: `≥ 9.x`
- **Rust**: `stable` with `wasm32v1-none` target (`rustup target add wasm32v1-none`)
- **Stellar CLI**: `cargo install --locked stellar-cli`

### 1. Smart Contracts Setup
```bash
cd contracts/betform_contest

# Run contract tests
cargo test

# Build WASM bytecode
cargo build --target wasm32v1-none --release
```

### 2. Frontend Setup
```bash
cd frontend
pnpm install
pnpm run dev
# Running at http://localhost:5173
```

### 3. Backend Setup
```bash
cd backend
pnpm install
npx prisma generate
pnpm run dev
# Running at http://localhost:3000
```

---

## Scoring System

Scores are calculated after each fixture is settled using confirmed lineup data:

```
Total Score = Formation Score + Σ (Player Proximity Score × Slot Odds)
```

- **Formation Odds**: Range from `1.4` (popular 4-3-3) up to `4.0` (3-3-3-1). Multiplied by 2 on exact match.
- **Proximity Score**: Exact position starter (10 pts), adjacent position (8 pts), nearby tier (5 pts), non-starter (0 pts).
- **Slot Odds**: Range from `1.2` (GK) to `2.8` (ST) to reward high-variance tactical positions.

---

## Contributing

We welcome contributions from the open-source and Stellar communities! 

- Read our **[CONTRIBUTING.md](CONTRIBUTING.md)** for branch rules and PR workflows.
- Review **[DEVELOPMENT.md](DEVELOPMENT.md)** for local testing commands.
- All Pull Requests must target the **`dev`** branch and pass all CI checks.
- Browse open, funded issues on our [Issue Tracker](https://github.com/Kaycee276/bet-form/issues).

---

## License

This project is licensed under the [MIT License](LICENSE).
