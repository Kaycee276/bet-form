<p align="center">
  <img src="frontend/public/logo.png" width="100" alt="BetForm Logo" />
</p>

# Contributing to BetForm ⚽

First off, thank you for considering contributing to BetForm! It's open-source projects like this that make the developer and Web3 communities amazing places to learn, inspire, and create.

---

## 🌿 Branching & Pull Request Workflow

### Default Branch: `dev`
All active development, feature branches, and fix PRs must target the **`dev`** branch. The `main` branch is reserved strictly for stable, production-tested releases.

### How to Contribute

1. **Fork the repository** to your personal GitHub account.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/bet-form.git
   cd bet-form
   ```
3. **Checkout the `dev` branch** and pull latest changes:
   ```bash
   git checkout dev
   git pull origin dev
   ```
4. **Create a new feature or fix branch**:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```
5. **Make your changes** following the project coding style.
6. **Verify build and lints locally**:
   ```bash
   # In frontend/
   cd frontend && pnpm run lint && pnpm test && pnpm run build

   # In backend/
   cd backend && npx prisma generate && pnpm run lint && pnpm test && pnpm run build

   # In contracts/betform_contest/
   cd contracts/betform_contest && cargo fmt --check && cargo clippy -- -D warnings && cargo test
   ```
7. **Commit using Conventional Commits**:
   - `feat(frontend): add glassmorphic player card component`
   - `feat(contracts): implement emergency pause circuit breaker`
   - `fix(backend): correct score verification oracle calculation`
   - `docs: update setup and deployment instructions`
   - `test(contracts): add end-to-end Soroban settlement tests`
8. **Push to your fork** and open a **Pull Request targeting `dev`**.

---

## 🛡️ Branch Protection & PR Rules

- ❌ Direct pushes to `main` and `dev` are protected.
- ✅ All changes must pass GitHub Actions CI matrix:
  - `frontend-ci` (Typecheck, Vitest, Lint, Build)
  - `backend-ci` (Prisma Generate, Jest, Lint, Build)
  - `contracts-ci` (Rustfmt, Clippy, Cargo Test, WASM compilation `wasm32v1-none`)
- ✅ At least one maintainer review approval is required before merging.
- ✅ PR titles and commits must adhere to Conventional Commits standard.

---

## 🏷️ Branch & Issue Naming Conventions

- `feature/` — New features (UI components, API endpoints, contract methods)
- `fix/` — Bug fixes
- `contracts/` — Soroban smart contract updates or security improvements
- `docs/` — Documentation updates
- `refactor/` — Code cleanups and refactoring
- `chore/` — Build system, CI, or dependency updates

---

## 💬 Community & Open-Source Bounties

BetForm participates in open-source contributor reward platforms on Stellar (rewarding contributors in USDC/XLM).

- Check our open [GitHub Issues](https://github.com/Kaycee276/bet-form/issues) tagged with `good first issue` or `help wanted`.
- Leave a comment on any open, unassigned issue to express interest or ask clarification questions before starting work.
