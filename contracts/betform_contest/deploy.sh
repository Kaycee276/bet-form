#!/usr/bin/env bash
set -e

echo "=== BetForm Soroban Smart Contract Deployment ==="

# Build WASM binary
echo "1. Building release WASM contract..."
cargo build --target wasm32v1-none --release

WASM_PATH="../../target/wasm32v1-none/release/betform_contest.wasm"
if [ ! -f "$WASM_PATH" ]; then
    WASM_PATH="target/wasm32v1-none/release/betform_contest.wasm"
fi

echo "WASM target located at: $WASM_PATH"

# Stellar CLI deployment command overview
echo ""
echo "2. Deploying WASM contract to Stellar Testnet..."
echo "Execute the following command with your funded identity:"
echo "  stellar contract deploy --wasm $WASM_PATH --source-account <IDENTITY> --network testnet"
echo ""
echo "3. Initialize Contract:"
echo "  stellar contract invoke --id <CONTRACT_ID> --source-account <IDENTITY> --network testnet -- initialize --admin <ADMIN_ADDRESS> --token <USDC_TOKEN_ADDRESS>"
echo "==============================================="
