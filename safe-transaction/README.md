# Safe Transaction Proposer - Reusable Workflow

## Overview 🌟

This reusable GitHub Actions workflow automates the process of creating and proposing transactions to a Safe multi-signature wallet (Gnosis Safe). It handles the complete transaction lifecycle from creation to proposal submission, making it easy to integrate Safe transactions into your CI/CD pipeline.

## Workflow Inputs 🛠️

| **Input**                | **Description**                                               | **Required** | **Default**                         |
| ------------------------ | ------------------------------------------------------------- | ------------ | ----------------------------------- |
| **proposer-private-key** | Private key of the proposer wallet                           | Yes          | -                                   |
| **rpc-url**              | RPC URL for the blockchain network                            | Yes          | -                                   |
| **safe-address**         | Address of the Safe contract                                  | Yes          | -                                   |
| **target-address**       | Target address for the transaction                            | Yes          | -                                   |
| **safe-api-key**         | Safe API key for transaction service                          | Yes          | -                                   |
| **chain-id**             | Chain ID of the blockchain network                            | No           | `42161` (Arbitrum)                  |
| **transaction-value**    | Value to send in the transaction (in wei)                     | No           | `0`                                 |
| **transaction-data**     | Transaction data/calldata                                     | No           | `0x`                                |
| **operation**            | Operation type (0 for Call, 1 for DelegateCall)              | No           | `0`                                 |

## Workflow Outputs 📤

| **Output**        | **Description**                           |
| ----------------- | ----------------------------------------- |
| **safe-tx-hash**  | Hash of the Safe transaction created      |
| **transaction**   | Complete transaction details (JSON)       |

## Secrets 🔐

| **Secret**                | **Description**                                    | **Required** |
| ------------------------- | -------------------------------------------------- | ------------ |
| **PROPOSER_PRIVATE_KEY**  | Private key of the proposer wallet                 | Yes          |
| **SAFE_API_KEY**          | Safe API key for transaction service               | Yes          |

## How to Use This Reusable Workflow 🔄

1. **Save the Workflow File**  
   Place the `safe-transaction.yml` file in the `.github/workflows/` directory of your repository. 💾

2. **Call the Reusable Workflow**  
   In another workflow file, invoke this reusable workflow like so:

   ```yaml
   name: Propose Safe Transaction
   on:
     workflow_dispatch:
       inputs:
         safe-address:
           description: 'Safe contract address'
           required: true
         target-address:
           description: 'Target contract address'
           required: true
         transaction-data:
           description: 'Transaction data (0x prefixed)'
           required: false
           default: '0x'

   jobs:
     safe-transaction:
       uses: ./.github/workflows/safe-transaction.yml
       secrets:
         proposer-private-key: ${{ secrets.PROPOSER_PRIVATE_KEY }}
         rpc-url: ${{ vars.RPC_URL }}
         safe-api-key: ${{ secrets.SAFE_API_KEY }}
       with:
         safe-address: ${{ inputs.safe-address }}
         target-address: ${{ inputs.target-address }}
         transaction-data: ${{ inputs.transaction-data }}
   ```

3. **Configure Secrets**  
   Ensure that the required secrets are added to your repository's settings:
   - `PROPOSER_PRIVATE_KEY`: The private key of the wallet that will propose the transaction
   - `SAFE_API_KEY`: Your Safe API key for the transaction service

## Operation Types 🔧

- **`0`**: **Call** - Normal transaction execution
- **`1`**: **DelegateCall** - Execution in the context of the Safe contract

## Security Considerations 🛡️

⚠️ **Important**: Never expose private keys in logs or code files. Always use GitHub Secrets to store sensitive information securely.
