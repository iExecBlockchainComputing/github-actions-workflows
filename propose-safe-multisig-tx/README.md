# Safe Multisig Transaction Proposer - Reusable Workflow

## Overview 🌟

This reusable GitHub Actions workflow automates the process of proposing transactions to a Safe multi-signature wallet (Gnosis Safe). It handles the proposal submission, making it easy to integrate Safe transactions into your CI/CD pipeline.

**🤖 Smart Chain Detection**: The workflow automatically detects the blockchain network's Chain ID from the provided RPC URL, eliminating the need to manually specify it.

## Workflow Inputs 🛠️

| **Input**                | **Description**                                               | **Required** | **Default**                         |
| ------------------------ | ------------------------------------------------------------- | ------------ | ----------------------------------- |
| **proposer-private-key** | Private key of the proposer wallet                           | Yes          | -                                   |
| **rpc-url**              | RPC URL for the blockchain network                            | Yes          | -                                   |
| **safe-address**         | Address of the Safe contract                                  | Yes          | -                                   |
| **transaction-to**       | Target address for the transaction                            | Yes          | -                                   |
| **safe-api-key**         | Safe API key for transaction service                          | Yes          | -                                   |
| **transaction-value**    | Value to send in the transaction (in wei)                     | No           | `0`                                 |
| **transaction-data**     | Transaction data/calldata                                     | No           | `0x`                                |

## Workflow Outputs 📤

| **Output**        | **Description**                           |
| ----------------- | ----------------------------------------- |
| **tx-hash**       | Hash of the Safe transaction created      |
| **tx-details**    | Complete transaction details (JSON)       |

## Secrets 🔐

| **Secret**                    | **Description**                                    | **Required** |
| ----------------------------- | -------------------------------------------------- | ------------ |
| **SAFE_PROPOSER_PRIVATE_KEY** | Private key of the proposer wallet                 | Yes          |
| **SAFE_API_KEY**              | Safe API key for transaction service               | Yes          |

## How to Use This Reusable Workflow 🔄

1. **Call the Reusable Workflow**  
   In another workflow file, invoke this reusable workflow like so:

   ```yaml
   name: Propose Safe Transaction
   on:
     workflow_dispatch:
       inputs:
         safe-address:
           description: 'Safe contract address'
           required: true
         transaction-to:
           description: 'Target contract address'
           required: true
         transaction-data:
           description: 'Transaction data (0x prefixed)'
           required: false
           default: '0x'

   jobs:
     safe-transaction:
       uses: ./.github/workflows/propose-safe-multisig-tx.yml
       secrets:
         safe-proposer-private-key: ${{ secrets.SAFE_PROPOSER_PRIVATE_KEY }}
         safe-api-key: ${{ secrets.SAFE_API_KEY }}
       with:
         rpc-url: ${{ vars.RPC_URL }}
       with:
         safe-address: ${{ inputs.safe-address }}
         transaction-to: ${{ inputs.transaction-to }}
         transaction-data: ${{ inputs.transaction-data }}
   ```

2. **Configure Secrets**  
   Ensure that the required secrets are added to your repository's settings:
   - `SAFE_PROPOSER_PRIVATE_KEY`: The private key of the wallet that will propose the transaction
   - `SAFE_API_KEY`: Your Safe API key for the transaction service

## Security Considerations 🛡️

⚠️ **Important**: Never expose private keys in logs or code files. Always use GitHub Secrets to store sensitive information securely.
