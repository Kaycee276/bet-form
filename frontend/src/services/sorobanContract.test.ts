import { describe, it, expect } from "vitest";
import { generatePredictionHash, getContestDetails, enterContestOnChain } from "./sorobanContract";
import { Keypair } from "@stellar/stellar-sdk";

describe("sorobanContract service", () => {
  it("should generate deterministic 32-byte SHA-256 prediction hash", async () => {
    const hash1 = await generatePredictionHash("fix-100", 2, 1, ["1", "5", "9"]);
    const hash2 = await generatePredictionHash("fix-100", 2, 1, ["9", "1", "5"]);

    expect(hash1).toBeInstanceOf(Uint8Array);
    expect(hash1.length).toBe(32);
    expect(Array.from(hash1)).toEqual(Array.from(hash2));
  });

  it("should fetch contest metadata", async () => {
    const details = await getContestDetails("MW1");
    expect(details).toBeDefined();
    expect(details.id).toBe("MW1");
    expect(details.entryFee).toBe(10);
    expect(details.status).toBe("Open");
  });

  it("should simulate contest entry on-chain", async () => {
    const hash = new Uint8Array(32).fill(7);
    const validKey = Keypair.random().publicKey();
    const res = await enterContestOnChain(validKey, "MW1", hash, 10);

    expect(res.success).toBe(true);
    expect(res.txHash).toBeDefined();
    expect(res.txHash.startsWith("0x")).toBe(true);
  });
});
