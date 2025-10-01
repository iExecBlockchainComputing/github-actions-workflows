import * as core from '@actions/core';
import SafeApiKit from "@safe-global/api-kit";
import Safe from "@safe-global/protocol-kit";
import { OperationType, MetaTransactionData } from "@safe-global/types-kit";
import { Wallet } from "ethers";

async function run() {
  try {
    // Get inputs from environment variables
    const proposerPrivateKey = process.env.INPUT_PROPOSER_PRIVATE_KEY;
    const rpcUrl = process.env.INPUT_RPC_URL;
    const chainId = process.env.INPUT_CHAIN_ID || "42161"; // Default to Arbitrum
    const safeAddress = process.env.INPUT_SAFE_ADDRESS;
    const transactionTo = process.env.INPUT_TRANSACTION_TO;
    const safeApiKey = process.env.INPUT_SAFE_API_KEY;
    const transactionValue = process.env.INPUT_TRANSACTION_VALUE || "0";
    const transactionData = process.env.INPUT_TRANSACTION_DATA || "0x";

    // Validate required inputs
    if (
      !proposerPrivateKey ||
      !rpcUrl ||
      !safeAddress ||
      !transactionTo ||
      !safeApiKey
    ) {
      throw new Error("Missing required environment variables");
    }

    core.info(`🚀 Starting Safe transaction proposal...`);
    core.info(`🌐 Chain ID: ${chainId}`);
    core.info(`📍 Safe Address: ${safeAddress}`);
    core.info(`🎯 Target Address: ${transactionTo}`);

    // Initialize wallet
    const wallet = new Wallet(proposerPrivateKey);
    core.info(`🔑 Proposer Address: ${wallet.address}`);

    // Initialize API Kit
    const apiKit = new SafeApiKit({
      chainId: BigInt(chainId),
      apiKey: safeApiKey,
    });

    // Initialize Protocol Kit
    const protocolKit = await Safe.init({
      provider: rpcUrl,
      signer: proposerPrivateKey,
      safeAddress: safeAddress,
    });

    core.info(`👤 Safe initialized for: ${safeAddress}`);

    // Create transaction
    const safeTransactionData: MetaTransactionData = {
      to: transactionTo,
      value: transactionValue,
      data: transactionData,
      operation: OperationType.Call,
    };

    core.info("📝 Creating Safe transaction...");

    // Create the transaction
    const safeTransaction = await protocolKit.createTransaction({
      transactions: [safeTransactionData],
    });

    const safeTxHash = await protocolKit.getTransactionHash(safeTransaction);
    const signature = await protocolKit.signHash(safeTxHash);

    core.info(`🔐 Transaction signed with hash: ${safeTxHash}`);

    // Propose transaction to the service
    await apiKit.proposeTransaction({
      safeAddress: safeAddress,
      safeTransactionData: safeTransaction.data,
      safeTxHash: safeTxHash,
      senderAddress: wallet.address,
      senderSignature: signature.data,
      origin: "GitHub Action - Safe Transaction",
    });

    core.info("📤 Transaction proposed to Safe service");

    // Get transaction details
    const transaction = await apiKit.getTransaction(safeTxHash);

    // Set outputs
    core.setOutput("safe-tx-hash", safeTxHash);
    core.setOutput("transaction", JSON.stringify(transaction));

    core.info(`✅ Transaction proposed successfully!`);
    core.info(`🔗 Transaction Hash: ${safeTxHash}`);
    core.info(`⏳ Waiting for other owners to sign and execute...`);
    core.info(
      `📋 Transaction Details: ${JSON.stringify(transaction, null, 2)}`
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : undefined;
    core.setFailed(`❌ Error proposing Safe transaction: ${errorMessage}`);
    if (errorStack) {
      core.error(errorStack);
    }
  }
}

run();
