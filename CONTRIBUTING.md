<p align="center">
  <img src="frontend/public/logo.png" width="100" alt="BetForm Logo" />
</p>

# Contributing to BetForm ⚽

First off, thank you for considering contributing to BetForm! It's open-source projects like this that make the developer community an amazing place to learn, inspire, and create.

---

## 🌿 Branching & Pull Request Workflow

### Default Branch: `dev`
All active development and feature PRs must target the **`dev`** branch. The `main` branch is reserved strictly for stable, production-tested releases.

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
   npm run lint && npm run build

   # In backend/
   npm run lint && npm run build
   ```
7. **Commit using Conventional Commits**:
   - `feat: add glassmorphic player card component`
   - `fix: correct status calculation for locked fixtures`
   - `docs: update setup instructions`
   - `refactor: extract pitch layout utility`
8. **Push to your fork** and open a **Pull Request targeting `dev`**.

---

## 🛡️ Branch Protection & PR Rules

- ❌ Direct pushes to `main` and `dev` are protected.
- ✅ All changes must pass GitHub Actions CI (`frontend-ci` & `backend-ci`).
- ✅ At least one maintainer approval is required before merging.
- ✅ Code must conform to ESLint and TypeScript compilation rules without errors.

---

## 🏷️ Branch Naming Conventions

- `feature/` — New UI components or features
- `fix/` — Bug fixes
- `docs/` — Documentation updates
- `refactor/` — Code cleanups and refactoring
- `chore/` — Build system, CI, or dependency updates

---

## 💬 Community & Support

If you have questions or want to discuss a major architectural change before submitting code, please open a GitHub Issue or Discussion thread first!
