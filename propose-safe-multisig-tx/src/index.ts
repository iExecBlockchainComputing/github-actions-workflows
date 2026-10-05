import * as core from "@actions/core";
import SafeApiKit from "@safe-global/api-kit";
import Safe from "@safe-global/protocol-kit";
import { OperationType, MetaTransactionData } from "@safe-global/types-kit";
import { createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { env } from "./env.js";

async function run() {
  const {
    RPC_URL: rpcUrl,
    SAFE_ADDRESS: safeAddress,
    TRANSACTION_TO: transactionTo,
    TRANSACTION_VALUE: transactionValue,
    TRANSACTION_DATA: transactionData,
    SAFE_PROPOSER_PRIVATE_KEY: safeProposerPrivateKey,
    SAFE_API_KEY: safeApiKey,
    DRY_RUN: dryRun,
  } = env;

  core.info(
    `🚀 Starting Safe transaction ${dryRun ? "validation (DRY RUN)" : "proposal"}...`,
  );
  core.info(`📍 Safe Address: ${safeAddress}`);
  core.info(`🎯 Target Address: ${transactionTo}`);

  const account = privateKeyToAccount(safeProposerPrivateKey as `0x${string}`);
  core.info(`🔑 Proposer Address: ${account.address}`);

  const publicClient = createPublicClient({
    transport: http(rpcUrl),
  });
  const chainId = await publicClient.getChainId();

  const apiKit = new SafeApiKit({
    chainId: BigInt(chainId),
    apiKey: safeApiKey,
  });

  const protocolKit = await Safe.init({
    provider: rpcUrl,
    signer: safeProposerPrivateKey,
    safeAddress: safeAddress,
  });

  core.info(`👤 Safe initialized for: ${safeAddress}`);

  const safeTransactionData: MetaTransactionData = {
    to: transactionTo,
    value: transactionValue,
    data: transactionData,
    operation: OperationType.Call,
  };

  core.info("📝 Creating Safe transaction...");

  const safeTransaction = await protocolKit.createTransaction({
    transactions: [safeTransactionData],
  });

  const safeTxHash = await protocolKit.getTransactionHash(safeTransaction);
  const signature = await protocolKit.signHash(safeTxHash);

  core.info(`🔐 Transaction signed - hash: ${safeTxHash}`);

  if (dryRun) {
    core.info(`🧪 DRY RUN MODE - Transaction validated but not proposed`);
    core.info(`📋 Transaction Preview:`);
    core.info(`   To: ${safeTransactionData.to}`);
    core.info(`   Value: ${safeTransactionData.value}`);
    core.info(`   Data: ${safeTransactionData.data}`);
    core.info(`   Operation: ${safeTransactionData.operation}`);

    core.setOutput("tx-hash", safeTxHash);
    core.setOutput(
      "tx-details",
      JSON.stringify({
        to: safeTransactionData.to,
        value: safeTransactionData.value,
        data: safeTransactionData.data,
        operation: safeTransactionData.operation,
        safeTxHash: safeTxHash,
        senderAddress: account.address,
        dryRun: true,
      }),
    );

    core.info(`✅ Transaction validated successfully (not proposed)`);
    core.info(`🔗 Transaction Hash (would be): ${safeTxHash}`);
  } else {
    await apiKit.proposeTransaction({
      safeAddress: safeAddress,
      safeTransactionData: safeTransaction.data,
      safeTxHash: safeTxHash,
      senderAddress: account.address,
      senderSignature: signature.data,
      origin: "GitHub Action - Propose Safe Multisig Transaction",
    });

    const transaction = await apiKit.getTransaction(safeTxHash);

    core.setOutput("tx-hash", safeTxHash);
    core.setOutput("tx-details", JSON.stringify(transaction));

    core.info(`✅ Transaction proposed successfully!`);
    core.info(`🔗 Transaction Hash: ${safeTxHash}`);
    core.info(`⏳ Waiting for other owners to sign and execute...`);
    core.info(
      `📋 Transaction Details: ${JSON.stringify(transaction, null, 2)}`,
    );
  }
}

run().catch((error) => {
  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  const errorStack = error instanceof Error ? error.stack : undefined;
  core.setFailed(`❌ Error proposing Safe transaction: ${errorMessage}`);
  if (errorStack) {
    core.error(errorStack);
  }
});
