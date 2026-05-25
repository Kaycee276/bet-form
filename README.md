# BetForm ⚽

> **A World Cup 2026 tactical prediction game.** Predict starting formations and starting XIs for every match, compete on a skill-based global leaderboard, and earn points through an odds-weighted scoring system. No real money involved — just pure tactical glory.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Scoring System](#scoring-system)
- [Fixture Status Lifecycle](#fixture-status-lifecycle)
- [Business Rules](#business-rules)
- [Out of Scope](#out-of-scope)

---

## Overview

BetForm lets football fans put their tactical knowledge to the test. Before each World Cup 2026 match, users pick a team, choose a formation from 15 options, and select the exact 11 players they believe will start. After the match, predictions are automatically scored using a proximity-based, odds-weighted algorithm — meaning bold, accurate calls are rewarded more than obvious ones.

---

## Features

| Area | Details |
|---|---|
| **Authentication** | Google OAuth via Supabase Auth; username setup on first login |
| **Fixtures** | All World Cup 2026 fixtures synced daily from API-Football, grouped by date |
| **Prediction Flow** | 3-step flow: Formation → Starting XI → Review & Submit |
| **Formations** | 15 formations with individual odds (4-3-3 through 3-3-3-1) |
| **XI Selection** | Position-filtered player dropdowns; selected players removed from other slots |
| **Live Pitch Visual** | Interactive pitch updates in real-time as players are selected |
| **Leaderboard** | Global ranking table sorted by total points; current user highlighted |
| **Scoring** | Odds-based: formation odds × 2 + proximity score × slot odds per player |
| **Admin Panel** | Manual lineup input for fixtures with delayed lineup data |
| **Settings** | Profile management, scoring explanation modal, sign-out |

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| TypeScript | ~6.0 | Type safety |
| Vite | 8.x | Build tool & dev server |
| Tailwind CSS | 4.x | Utility-first styling |
| Zustand | 5.x | Lightweight global state management |
| Lucide React | 1.x | Icon library |

### Backend / Infrastructure _(planned)_

| Technology | Purpose |
|---|---|
| Supabase | Database (PostgreSQL), Auth (Google OAuth), Edge Functions |
| API-Football | Fixtures, squad data, lineups, match events |
| Supabase Cron | Daily fixture sync scheduling |

---

## Project Structure

```
bet-form/
├── frontend/                  # React + Vite frontend
│   ├── public/
│   │   ├── WC_ball.webp       # World Cup 2026 match ball image
│   │   ├── WC_banner.webp     # FIFA World Cup 2026 banner
│   │   ├── WC_image.webp      # Trophy / logo image
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── components/
│   │   │   └── SignupModal.tsx # Google sign-in modal
│   │   ├── pages/
│   │   │   └── PromotionalLanding.tsx  # Marketing landing page
│   │   ├── store/
│   │   │   └── useModalStore.ts  # Zustand store for modal state
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css          # Global styles + Tailwind theme tokens
│   ├── package.json
│   └── vite.config.ts
└── betform_requirements.md    # Full product requirements document
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/Kaycee276/bet-form.git
cd bet-form/frontend

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Scoring System

Scores are calculated after each match is settled using confirmed lineup data from API-Football.

### Formation Score

```
formation_final_score = formation_odd × 2   (if correct)
                      = 0                   (if incorrect)
```

Formation odds range from **1.4** (common 4-3-3) to **4.0** (rare 3-3-3-1).

### Player Score (per slot)

```
player_final_score = proximity_score × slot_odd
```

**Proximity Score Table (examples):**

| Predicted Slot | Actual Position | Proximity Score |
|---|---|---|
| RW | RW | 10 (exact) |
| RW | RM | 8 (adjacent) |
| CM | CDM | 5 (nearby) |
| ST | GK | 0 (non-starter tier) |
| (not in XI) | — | 0 |

**Slot odds** range from **1.2** (GK) to **2.8** (ST), rewarding harder-to-predict positions.

### Total Score

```
total_score = formation_final_score + Σ (proximity_score × slot_odd) for all 11 players
```

All scores are displayed rounded to 1 decimal place.

---

## Fixture Status Lifecycle

```
SQUAD_PENDING  →  OPEN  →  LOCKED  →  PENDING_SETTLEMENT  →  SETTLED
```

| Status | Condition |
|---|---|
| `OPEN` | Kickoff >24 hours away AND squad data confirmed |
| `SQUAD_PENDING` | Squad data not yet available from API-Football |
| `LOCKED` | Midnight WAT (UTC+1) on match day morning |
| `PENDING_SETTLEMENT` | Match ended, lineup API returned empty; retries every 10 min |
| `SETTLED` | Confirmed lineups received and all predictions scored |

---

## Business Rules

- **One prediction per user per team per fixture.** No edits after submission.
- **Submission closes at lockdown** — the fixture status changes to `LOCKED` and the UI disables the submit flow.
- **Players are de-duplicated** across XI slots — selecting a player in one slot removes them from all other dropdowns.
- **Position filtering** — GK slots only show goalkeepers; DEF slots only show defenders, etc.
- **Early substitutions** — if a player is substituted off before minute 6, the replacement counts as the confirmed starter.
- **Admin override** — the admin account (`kizuaba@gmail.com`) can manually input a confirmed formation and XI from the Settings page to force settlement when the lineup API is delayed.
- **All data lives in Supabase** — no localStorage is used at any point.
- **All API-Football calls** are made server-side via Supabase edge functions; the API key is never exposed to the client.

---

## Out of Scope

The following are explicitly **not** included in this release:

- Real money betting or financial transactions
- Other leagues beyond World Cup 2026
- Social features (comments, sharing, following)
- Push or email notifications
- Mobile native app (iOS / Android)
- Dark/light theme toggle (fixed dark theme)
- Prediction editing after submission
- Live match scores or updates
- Password-based auth (Google OAuth only)
- Custom avatar uploads (uses Google profile photo)

---

> © 2026 BetForm. Not affiliated with FIFA.
