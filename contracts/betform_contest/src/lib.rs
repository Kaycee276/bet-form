#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, token, Address, BytesN, Env, Symbol, Vec};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum ContestStatus {
    Open = 0,
    Locked = 1,
    Settled = 2,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Contest {
    pub id: Symbol,
    pub entry_fee: i128,
    pub kickoff_at: u64,
    pub status: ContestStatus,
    pub pool_balance: i128,
    pub total_entries: u32,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct PredictionEntry {
    pub user: Address,
    pub prediction_hash: BytesN<32>,
    pub staked_amount: i128,
    pub timestamp: u64,
}

#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Admin,
    Token,
    Contest(Symbol),
    Entry(Symbol, Address),
}

#[contract]
pub struct BetFormContestContract;

#[contractimpl]
impl BetFormContestContract {
    /// Initialize contract with admin address and USDC token address
    pub fn initialize(env: Env, admin: Address, token: Address) {
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("already initialized");
        }
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::Token, &token);
    }

    /// Create a new matchday prediction contest (Admin only)
    pub fn create_contest(env: Env, contest_id: Symbol, entry_fee: i128, kickoff_at: u64) {
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();

        if entry_fee < 0 {
            panic!("entry fee cannot be negative");
        }

        let contest_key = DataKey::Contest(contest_id.clone());
        if env.storage().persistent().has(&contest_key) {
            panic!("contest already exists");
        }

        let contest = Contest {
            id: contest_id.clone(),
            entry_fee,
            kickoff_at,
            status: ContestStatus::Open,
            pool_balance: 0,
            total_entries: 0,
        };

        env.storage().persistent().set(&contest_key, &contest);
    }

    /// Enter a contest by staking USDC entry fee and locking a prediction hash
    pub fn enter_contest(env: Env, user: Address, contest_id: Symbol, prediction_hash: BytesN<32>) {
        user.require_auth();

        let contest_key = DataKey::Contest(contest_id.clone());
        let mut contest: Contest = env
            .storage()
            .persistent()
            .get(&contest_key)
            .expect("contest not found");

        if contest.status != ContestStatus::Open {
            panic!("contest is not open");
        }

        if env.ledger().timestamp() >= contest.kickoff_at {
            panic!("contest is locked due to kickoff time");
        }

        let entry_key = DataKey::Entry(contest_id.clone(), user.clone());
        if env.storage().persistent().has(&entry_key) {
            panic!("user already entered contest");
        }

        // Transfer USDC entry fee from user to contract escrow if fee > 0
        if contest.entry_fee > 0 {
            let token_addr: Address = env.storage().instance().get(&DataKey::Token).unwrap();
            let token_client = token::Client::new(&env, &token_addr);
            let contract_addr = env.current_contract_address();
            token_client.transfer(&user, &contract_addr, &contest.entry_fee);
        }

        let entry = PredictionEntry {
            user: user.clone(),
            prediction_hash,
            staked_amount: contest.entry_fee,
            timestamp: env.ledger().timestamp(),
        };

        contest.pool_balance += contest.entry_fee;
        contest.total_entries += 1;

        env.storage().persistent().set(&contest_key, &contest);
        env.storage().persistent().set(&entry_key, &entry);
    }

    /// Settle a contest and distribute prize pool to winning addresses (Admin/Oracle only)
    pub fn settle_contest(
        env: Env,
        contest_id: Symbol,
        winners: Vec<Address>,
        payout_shares_bps: Vec<u32>, // Basis points, e.g. 5000 = 50%
    ) {
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();

        let contest_key = DataKey::Contest(contest_id.clone());
        let mut contest: Contest = env
            .storage()
            .persistent()
            .get(&contest_key)
            .expect("contest not found");

        if contest.status == ContestStatus::Settled {
            panic!("contest already settled");
        }

        if winners.len() != payout_shares_bps.len() {
            panic!("winners and payout shares length mismatch");
        }

        let total_pool = contest.pool_balance;
        if total_pool > 0 && !winners.is_empty() {
            let token_addr: Address = env.storage().instance().get(&DataKey::Token).unwrap();
            let token_client = token::Client::new(&env, &token_addr);
            let contract_addr = env.current_contract_address();

            for i in 0..winners.len() {
                let winner = winners.get(i).unwrap();
                let share_bps = payout_shares_bps.get(i).unwrap();
                let payout_amount = (total_pool * (share_bps as i128)) / 10000;

                if payout_amount > 0 {
                    token_client.transfer(&contract_addr, &winner, &payout_amount);
                }
            }
        }

        contest.status = ContestStatus::Settled;
        env.storage().persistent().set(&contest_key, &contest);
    }

    /// Get contest metadata
    pub fn get_contest(env: Env, contest_id: Symbol) -> Contest {
        let contest_key = DataKey::Contest(contest_id);
        env.storage()
            .persistent()
            .get(&contest_key)
            .expect("contest not found")
    }

    /// Get user entry
    pub fn get_entry(env: Env, contest_id: Symbol, user: Address) -> PredictionEntry {
        let entry_key = DataKey::Entry(contest_id, user);
        env.storage()
            .persistent()
            .get(&entry_key)
            .expect("entry not found")
    }
}

mod test;
