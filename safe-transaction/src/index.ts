import * as core from '@actions/core';
import { createSafeClient } from '@safe-global/sdk-starter-kit';

async function run() {
  try {
    // Get inputs from environment variables
    const proposerPrivateKey = process.env.INPUT_PROPOSER_PRIVATE_KEY;
    const rpcUrl = process.env.INPUT_RPC_URL;
    const safeAddress = process.env.INPUT_SAFE_ADDRESS;
    const transactionTargetAddress = process.env.INPUT_TARGET_ADDRESS;
    const safeApiKey = process.env.INPUT_SAFE_API_KEY;
    const transactionValue = process.env.INPUT_TRANSACTION_VALUE || "0";
    const transactionData = process.env.INPUT_TRANSACTION_DATA || "0x";

    // Validate required inputs
    if (!proposerPrivateKey || !rpcUrl || !safeAddress || !transactionTargetAddress || !safeApiKey) {
      throw new Error('Missing required environment variables');
    }

    core.info(`🚀 Starting Safe transaction creation...`);
    core.info(`📍 Safe Address: ${safeAddress}`);
    core.info(`🎯 Target Address: ${transactionTargetAddress}`);

    // Initialize Safe Client
    const safeClient = await createSafeClient({
      provider: rpcUrl,
      signer: proposerPrivateKey,
      safeAddress: safeAddress,
    });

    core.info(`👤 Safe Client initialized for Safe: ${safeAddress}`);

    // Create transaction
    const transactions = [{
      to: transactionTargetAddress,
      value: transactionValue,
      data: transactionData,
    }];

    core.info("📝 Creating Safe transaction...");

    // Send the Safe transaction
    const txResult = await safeClient.send({ transactions });
    const safeTxHash = txResult.transactions?.safeTxHash;

    core.info(`🔐 Transaction sent with hash: ${safeTxHash}`);

    // Get transaction details from txResult
    const transaction = txResult;

    // Set outputs
    core.setOutput("safe-tx-hash", safeTxHash);
    core.setOutput("transaction", JSON.stringify(transaction));

    core.info(`✅ Transaction created successfully!`);
    core.info(`🔗 Transaction Hash: ${safeTxHash}`);
    core.info(
      `📋 Transaction Details: ${JSON.stringify(transaction, null, 2)}`
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    core.setFailed(`❌ Error creating Safe transaction: ${errorMessage}`);
    if (errorStack) {
      core.error(errorStack);
    }
  }
}

run();
