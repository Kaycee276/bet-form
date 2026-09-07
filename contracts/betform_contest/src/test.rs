#![cfg(test)]

use super::*;
use soroban_sdk::{
    symbol_short,
    testutils::Address as _,
    token, Address, BytesN, Env, Vec,
};

#[test]
fn test_contest_flow() {
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let user1 = Address::generate(&env);
    let user2 = Address::generate(&env);

    // Create a mock Stellar Asset (USDC) token in test environment
    let token_admin = Address::generate(&env);
    let token_contract = env.register_stellar_asset_contract_v2(token_admin.clone());
    let token_id = token_contract.address();
    let token_client = token::Client::new(&env, &token_id);
    let token_admin_client = token::StellarAssetClient::new(&env, &token_id);

    // Mint initial USDC balance to users
    token_admin_client.mint(&user1, &1000_0000000); // 1000 USDC
    token_admin_client.mint(&user2, &1000_0000000); // 1000 USDC

    // Register BetFormContest contract
    let contract_id = env.register(BetFormContestContract, ());
    let client = BetFormContestContractClient::new(&env, &contract_id);

    // 1. Initialize Contract
    client.initialize(&admin, &token_id);

    // 2. Create Contest (Entry fee: 10 USDC = 10_0000000)
    let contest_id = symbol_short!("mw1");
    let kickoff_at = env.ledger().timestamp() + 3600; // 1 hour in future
    let entry_fee = 10_0000000;

    client.create_contest(&contest_id, &entry_fee, &kickoff_at);

    let contest_info = client.get_contest(&contest_id);
    assert_eq!(contest_info.entry_fee, entry_fee);
    assert_eq!(contest_info.total_entries, 0);

    // 3. User 1 Enters Contest
    let pred_hash1 = BytesN::from_array(&env, &[1u8; 32]);
    client.enter_contest(&user1, &contest_id, &pred_hash1);

    // 4. User 2 Enters Contest
    let pred_hash2 = BytesN::from_array(&env, &[2u8; 32]);
    client.enter_contest(&user2, &contest_id, &pred_hash2);

    let contest_info_after = client.get_contest(&contest_id);
    assert_eq!(contest_info_after.total_entries, 2);
    assert_eq!(contest_info_after.pool_balance, 20_0000000);

    // 5. Settle Contest (User 1 wins 70%, User 2 wins 30%)
    let mut winners = Vec::new(&env);
    winners.push_back(user1.clone());
    winners.push_back(user2.clone());

    let mut shares = Vec::new(&env);
    shares.push_back(7000); // 70%
    shares.push_back(3000); // 30%

    client.settle_contest(&contest_id, &winners, &shares);

    let settled_contest = client.get_contest(&contest_id);
    assert_eq!(settled_contest.status, ContestStatus::Settled);

    // User 1 balance: 1000 - 10 + 14 (70% of 20) = 1004 USDC
    assert_eq!(token_client.balance(&user1), 1004_0000000);
    // User 2 balance: 1000 - 10 + 6 (30% of 20) = 996 USDC
    assert_eq!(token_client.balance(&user2), 996_0000000);
}
