# Safe Multisig Transaction Proposer - Reusable Workflow

## Overview 🌟

This reusable GitHub Actions workflow automates the process of proposing transactions to a Safe multi-signature wallet (Gnosis Safe). It handles the proposal submission, making it easy to integrate Safe transactions into your CI/CD pipeline.

## Workflow Inputs 🛠️

| **Input**                | **Description**                                               | **Required** | **Default**                         |
| ------------------------ | ------------------------------------------------------------- | ------------ | ----------------------------------- |
| **safe-address**         | Address of the Safe contract                                  | Yes          | -                                   |
| **transaction-to**       | Target address for the transaction                            | Yes          | -                                   |
| **transaction-value**    | Value to send in the transaction (in wei)                     | No           | `0`                                 |
| **transaction-data**     | Transaction data/calldata                                     | Yes          | -                                   |
| **dry-run**              | Validate and prepare the transaction without proposing it     | No           | `false`                             |
| **environment**          | Caller GitHub Environment to run in (see below)               | No           | `''`                                |
| **rpc-url**              | RPC URL for the blockchain network                            | No (Secret)  | -                                   |
| **safe-proposer-private-key** | Private key of the proposer wallet                       | No (Secret)  | -                                   |
| **safe-api-key**         | Safe API key for transaction service                          | No (Secret)  | -                                   |

> The three secrets are optional inputs because they can be provided in **two ways**: passed explicitly via the `secrets:` block, or read from a GitHub Environment via the `environment` input (see "Using a GitHub Environment" below). Exactly one of the two approaches must supply each secret.

## Workflow Outputs 📤

| **Output**        | **Description**                           |
| ----------------- | ----------------------------------------- |
| **tx-hash**       | Hash of the Safe transaction created      |
| **tx-details**    | Complete transaction details (JSON)       |

## How to Use This Reusable Workflow 🔄

1. **Call the Reusable Workflow**  
   In another workflow file, invoke this reusable workflow like so:

   ```yaml
    name: Upgrade contract

    on:
      workflow_dispatch:

    jobs:
      upgrade:
        uses: ./.github/workflows/propose-safe-multisig-tx.yml
        secrets:
          rpc-url: ${{ secrets.RPC_URL }}
          safe-proposer-private-key: ${{ secrets.SAFE_PROPOSER_PRIVATE_KEY }}
          safe-api-key: ${{ secrets.SAFE_API_KEY }}
        with:
          safe-address: '0xab...'
          transaction-to: '0xcd...'
          transaction-value: '0'
          transaction-data: '0xef' # Upgrade transaction calldata
   ```

2. **Configure Secrets**  
   Ensure that the required secrets are added to your repository's settings:
   - `RPC_URL`: The RPC URL for the blockchain network
   - `SAFE_PROPOSER_PRIVATE_KEY`: The private key of the wallet that will propose the transaction
   - `SAFE_API_KEY`: Your Safe API key for the transaction service

## Using a GitHub Environment 🌐

A job that calls a reusable workflow **cannot declare `environment:`**, so secrets scoped to a
GitHub Environment in the caller repository are not visible when passed through the `secrets:`
block. To use environment-scoped secrets (e.g. to keep mainnet credentials behind environment
protection rules), set the `environment` input — the job inside this reusable workflow then runs
in that environment and reads the secrets directly from it:

```yaml
jobs:
  propose:
    uses: iExecBlockchainComputing/github-actions-workflows/.github/workflows/propose-safe-multisig-tx.yml@propose-safe-multisig-tx-v1.2.0
    with:
      environment: ethereum
      safe-address: '0xab...'
      transaction-to: '0xcd...'
      transaction-data: '0xef...'
    # No `secrets:` block: RPC_URL / SAFE_PROPOSER_PRIVATE_KEY / SAFE_API_KEY are read
    # from the `ethereum` environment of the caller repository.
```

The secrets must be defined in that environment under the exact names `RPC_URL`,
`SAFE_PROPOSER_PRIVATE_KEY` and `SAFE_API_KEY` (these are declared as workflow_call secrets so the
environment can source them — an undeclared name stays empty even if the environment has it). Do
**not** use `secrets: inherit` for this path: inherit forwards only the caller job's secrets, which
excludes environment-scoped ones, and shadows the environment values.

## Security Considerations 🛡️

⚠️ **Important**: Never expose private keys in logs or code files. Always use GitHub Secrets to store sensitive information securely.
