const core = require('@actions/core');
const SafeApiKit = require('@safe-global/api-kit').default;
const Safe = require('@safe-global/protocol-kit').default;
const { OperationType } = require('@safe-global/types-kit');
const { Wallet } = require('ethers');

async function run() {
  try {
    // Get inputs from environment variables
    const proposerPrivateKey = process.env.INPUT_PROPOSER_PRIVATE_KEY;
    const rpcUrl = process.env.INPUT_RPC_URL;
    const safeAddress = process.env.INPUT_SAFE_ADDRESS;
    const targetAddress = process.env.INPUT_TARGET_ADDRESS;
    const safeApiKey = process.env.INPUT_SAFE_API_KEY;
    const chainId = BigInt(process.env.INPUT_CHAIN_ID || '42161');
    const transactionValue = process.env.INPUT_TRANSACTION_VALUE || '0';
    const transactionData = process.env.INPUT_TRANSACTION_DATA || '0x';
    const operation = process.env.INPUT_OPERATION || '0';

    core.info(`🚀 Starting Safe transaction creation...`);
    core.info(`📍 Safe Address: ${safeAddress}`);
    core.info(`🎯 Target Address: ${targetAddress}`);

    // Initialize wallet
    const wallet = new Wallet(proposerPrivateKey);
    core.info(`👤 Proposer Address: ${wallet.address}`);

    // Initialize API Kit
    const apiKit = new SafeApiKit({
      chainId: chainId,
      apiKey: safeApiKey
    });

    // Initialize Protocol Kit
    const protocolKit = await Safe.init({
      provider: rpcUrl,
      signer: proposerPrivateKey,
      safeAddress: safeAddress
    });

    // Create transaction
    const safeTransactionData = {
      to: targetAddress,
      value: transactionValue,
      data: transactionData,
      operation: parseInt(operation)
    };

    core.info('📝 Creating Safe transaction...');
    const safeTransaction = await protocolKit.createTransaction({
      transactions: [safeTransactionData]
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
      senderSignature: signature.data
    });

    core.info('📤 Transaction proposed to Safe service');

    // Get transaction details
    const transaction = await apiKit.getTransaction(safeTxHash);
    
    // Set outputs
    core.setOutput('safe-tx-hash', safeTxHash);
    core.setOutput('transaction', JSON.stringify(transaction));

    core.info(`✅ Transaction created successfully!`);
    core.info(`🔗 Transaction Hash: ${safeTxHash}`);
    core.info(`📋 Transaction Details: ${JSON.stringify(transaction, null, 2)}`);

  } catch (error) {
    core.setFailed(`❌ Error creating Safe transaction: ${error.message}`);
    core.error(error.stack);
  }
}

run();
