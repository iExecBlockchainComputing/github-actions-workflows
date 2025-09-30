const core = require('@actions/core');
const SafeApiKit = require('@safe-global/api-kit').default;
const Safe = require('@safe-global/protocol-kit').default;
const { EthersAdapter } = require("@safe-global/protocol-kit");
const { OperationType } = require('@safe-global/types-kit');
const { Wallet, JsonRpcProvider, ethers } = require("ethers");

async function run() {
  try {
    // Get inputs from environment variables
    const proposerPrivateKey = process.env.INPUT_PROPOSER_PRIVATE_KEY;
    const rpcUrl = process.env.INPUT_RPC_URL;
    const safeAddress = process.env.INPUT_SAFE_ADDRESS;
    const transactionTargetAddress = process.env.INPUT_TARGET_ADDRESS;
    const safeApiKey = process.env.INPUT_SAFE_API_KEY;
    const chainId = BigInt(process.env.INPUT_CHAIN_ID || "42161");
    const transactionValue = process.env.INPUT_TRANSACTION_VALUE || "0";
    const transactionData = process.env.INPUT_TRANSACTION_DATA || "0x";

    core.info(`🚀 Starting Safe transaction creation...`);
    core.info(`📍 Safe Address: ${safeAddress}`);
    core.info(`🎯 Target Address: ${transactionTargetAddress}`);

    // Initialize wallet and provider
    const provider = new JsonRpcProvider(rpcUrl);
    const wallet = new Wallet(proposerPrivateKey, provider);
    core.info(`👤 Proposer Address: ${wallet.address}`);

    // Initialize EthAdapter
    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: wallet,
    });

    // Initialize API Kit
    const apiKit = new SafeApiKit({
      chainId: chainId,
      apiKey: safeApiKey,
    });

    // Debug: Test API Kit initialization
    core.info(`🔧 API Kit initialized with chainId: ${chainId}`);

    // Initialize Protocol Kit
    const protocolKit = await Safe.create({
      ethAdapter,
      safeAddress: safeAddress,
    });

    // Create transaction
    const safeTransactionData = {
      to: transactionTargetAddress,
      value: transactionValue,
      data: transactionData,
      operation: OperationType.Call, // Hardcoded Call operation - DelegateCall is not supported for security reasons
    };

    core.info("📝 Creating Safe transaction...");
    const safeTransaction = await protocolKit.createTransaction({
      transactions: [safeTransactionData],
    });

    const safeTxHash = await protocolKit.getTransactionHash(safeTransaction);
    const signature = await protocolKit.signHash(safeTxHash);

    core.info(`🔐 Transaction signed with hash: ${safeTxHash}`);

    // Debug: Log transaction data structure
    core.info(`📋 Safe Transaction Data: ${JSON.stringify(safeTransaction.data, null, 2)}`);

    // Propose transaction to the service
    await apiKit.proposeTransaction({
      safeAddress: safeAddress,
      safeTransactionData: safeTransaction.data,
      safeTxHash: safeTxHash,
      senderAddress: wallet.address,
      senderSignature: signature.data,
      origin: 'GitHub Actions Safe Transaction Workflow',
    });

    core.info("📤 Transaction proposed to Safe service");

    // Get transaction details
    const transaction = await apiKit.getTransaction(safeTxHash);

    // Set outputs
    core.setOutput("safe-tx-hash", safeTxHash);
    core.setOutput("transaction", JSON.stringify(transaction));

    core.info(`✅ Transaction created successfully!`);
    core.info(`🔗 Transaction Hash: ${safeTxHash}`);
    core.info(
      `📋 Transaction Details: ${JSON.stringify(transaction, null, 2)}`
    );
  } catch (error) {
    core.setFailed(`❌ Error creating Safe transaction: ${error.message}`);
    core.error(error.stack);
  }
}

run();
