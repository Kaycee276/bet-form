#![cfg(test)]

use super::*;
use soroban_sdk::{symbol_short, testutils::Address as _, token, Address, BytesN, Env, Vec};

fn setup_env() -> (Env, Address, Address, BetFormContestContractClient<'static>) {
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let token_admin = Address::generate(&env);
    let token_contract = env.register_stellar_asset_contract_v2(token_admin);
    let token_id = token_contract.address();

    let contract_id = env.register(BetFormContestContract, ());
    let client = BetFormContestContractClient::new(&env, &contract_id);
    client.initialize(&admin, &token_id);

    (env, admin, token_id, client)
}

#[test]
fn test_contest_flow() {
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let user1 = Address::generate(&env);
    let user2 = Address::generate(&env);

    let token_admin = Address::generate(&env);
    let token_contract = env.register_stellar_asset_contract_v2(token_admin);
    let token_id = token_contract.address();
    let token_client = token::Client::new(&env, &token_id);
    let token_admin_client = token::StellarAssetClient::new(&env, &token_id);

    token_admin_client.mint(&user1, &1000_0000000);
    token_admin_client.mint(&user2, &1000_0000000);

    let contract_id = env.register(BetFormContestContract, ());
    let client = BetFormContestContractClient::new(&env, &contract_id);

    client.initialize(&admin, &token_id);

    let contest_id = symbol_short!("mw1");
    let kickoff_at = env.ledger().timestamp() + 3600;
    let entry_fee = 10_0000000;

    client.create_contest(&contest_id, &entry_fee, &kickoff_at);

    let contest_info = client.get_contest(&contest_id);
    assert_eq!(contest_info.entry_fee, entry_fee);
    assert_eq!(contest_info.total_entries, 0);

    let pred_hash1 = BytesN::from_array(&env, &[1u8; 32]);
    client.enter_contest(&user1, &contest_id, &pred_hash1);

    let pred_hash2 = BytesN::from_array(&env, &[2u8; 32]);
    client.enter_contest(&user2, &contest_id, &pred_hash2);

    let contest_info_after = client.get_contest(&contest_id);
    assert_eq!(contest_info_after.total_entries, 2);
    assert_eq!(contest_info_after.pool_balance, 20_0000000);

    let mut winners = Vec::new(&env);
    winners.push_back(user1.clone());
    winners.push_back(user2.clone());

    let mut shares = Vec::new(&env);
    shares.push_back(7000); // 70%
    shares.push_back(3000); // 30%

    client.settle_contest(&contest_id, &winners, &shares);

    let settled_contest = client.get_contest(&contest_id);
    assert_eq!(settled_contest.status, ContestStatus::Settled);

    assert_eq!(token_client.balance(&user1), 1004_0000000);
    assert_eq!(token_client.balance(&user2), 996_0000000);
}

#[test]
#[should_panic(expected = "already initialized")]
fn test_double_initialization_panics() {
    let (_env, admin, token_id, client) = setup_env();
    client.initialize(&admin, &token_id);
}

#[test]
#[should_panic(expected = "entry fee cannot be negative")]
fn test_negative_entry_fee_panics() {
    let (env, _admin, _token_id, client) = setup_env();
    let contest_id = symbol_short!("neg1");
    let kickoff_at = env.ledger().timestamp() + 3600;
    client.create_contest(&contest_id, &-10, &kickoff_at);
}

#[test]
#[should_panic(expected = "contest already exists")]
fn test_duplicate_contest_panics() {
    let (env, _admin, _token_id, client) = setup_env();
    let contest_id = symbol_short!("dup1");
    let kickoff_at = env.ledger().timestamp() + 3600;
    client.create_contest(&contest_id, &100, &kickoff_at);
    client.create_contest(&contest_id, &100, &kickoff_at);
}

#[test]
#[should_panic(expected = "user already entered contest")]
fn test_duplicate_user_entry_panics() {
    let (env, _admin, _token_id, client) = setup_env();
    let user = Address::generate(&env);
    let contest_id = symbol_short!("dupusr");
    let kickoff_at = env.ledger().timestamp() + 3600;
    client.create_contest(&contest_id, &0, &kickoff_at);

    let hash = BytesN::from_array(&env, &[9u8; 32]);
    client.enter_contest(&user, &contest_id, &hash);
    client.enter_contest(&user, &contest_id, &hash);
}

#[test]
#[should_panic(expected = "contest already settled")]
fn test_settle_contest_twice_panics() {
    let (env, _admin, _token_id, client) = setup_env();
    let user = Address::generate(&env);
    let contest_id = symbol_short!("stl2");
    let kickoff_at = env.ledger().timestamp() + 3600;
    client.create_contest(&contest_id, &0, &kickoff_at);

    let hash = BytesN::from_array(&env, &[3u8; 32]);
    client.enter_contest(&user, &contest_id, &hash);

    let mut winners = Vec::new(&env);
    winners.push_back(user);
    let mut shares = Vec::new(&env);
    shares.push_back(10000);

    client.settle_contest(&contest_id, &winners, &shares);
    client.settle_contest(&contest_id, &winners, &shares);
}
