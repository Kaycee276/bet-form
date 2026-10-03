# BetForm Contest Smart Contract (Soroban) ⚽

This directory contains the Stellar Soroban smart contract powering BetForm's decentralized football prediction contest pools and USDC escrow.

---

## Architecture Overview

The contract (`BetFormContestContract`) operates as a decentralized escrow and settlement engine:

1. **Initialization**: Configured with the admin address and the Stellar USDC token address.
2. **Contest Lifecycle**:
   - `create_contest`: Admin sets up a contest with an ID, entry fee (in USDC base units), and kickoff timestamp.
   - `enter_contest`: Contributor or user submits an entry. The contract verifies authorization, transfers the USDC entry fee to contract escrow, and stores their 32-byte prediction hash.
   - `lock_contest`: Locks entries prior to fixture kickoff.
   - `settle_contest`: Admin/Oracle verifies final match results and distributes the escrowed prize pool directly to winning addresses.

---

## Contract Interface

### State Types
```rust
pub enum ContestStatus {
    Open = 0,
    Locked = 1,
    Settled = 2,
}

pub struct Contest {
    pub id: Symbol,
    pub entry_fee: i128,
    pub kickoff_at: u64,
    pub status: ContestStatus,
    pub pool_balance: i128,
    pub total_entries: u32,
}

pub struct PredictionEntry {
    pub user: Address,
    pub prediction_hash: BytesN<32>,
    pub staked_amount: i128,
    pub timestamp: u64,
}
```

### Public Methods

| Method | Parameters | Access | Description |
|---|---|---|---|
| `initialize` | `env: Env, admin: Address, token: Address` | Public (once) | Initializes admin key and USDC token contract |
| `create_contest` | `env: Env, contest_id: Symbol, entry_fee: i128, kickoff_at: u64` | Admin | Creates a new contest pool |
| `enter_contest` | `env: Env, user: Address, contest_id: Symbol, prediction_hash: BytesN<32>` | User (`require_auth`) | Stakes USDC entry fee and locks prediction hash |
| `lock_contest` | `env: Env, contest_id: Symbol` | Admin | Halts contest entries before kickoff |
| `settle_contest` | `env: Env, contest_id: Symbol, winners: Vec<Address>, amounts: Vec<i128>` | Admin | Distributes prize pool to winners |
| `get_contest` | `env: Env, contest_id: Symbol -> Contest` | View | Returns contest state and pool balance |
| `get_entry` | `env: Env, contest_id: Symbol, user: Address -> PredictionEntry` | View | Returns user prediction entry |

---

## Local Development & Testing

### Prerequisites
- Rust `stable`
- Target `wasm32v1-none`: `rustup target add wasm32v1-none`
- Stellar CLI: `cargo install --locked stellar-cli`

### Run Tests
```bash
cargo test
```

### Check Formatting & Lints
```bash
cargo fmt --check
cargo clippy -- -D warnings
```

### Build Production WASM
```bash
cargo build --target wasm32v1-none --release
```
The compiled contract will be at:
`target/wasm32v1-none/release/betform_contest.wasm`

---

## Deployment to Stellar Testnet

Run the automated deployment script:
```bash
chmod +x deploy.sh
./deploy.sh
```
