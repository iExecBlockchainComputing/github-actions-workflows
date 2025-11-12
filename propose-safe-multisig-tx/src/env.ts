import 'dotenv/config';
import { z } from 'zod';

const addressRegex = /(^|\b)(0x)?[0-9a-fA-F]{40}(\b|$)/;
const privateKeyRegex = /(^|\b)(0x)?[0-9a-fA-F]{64}(\b|$)/;
const hexDataRegex = /^0x[0-9a-fA-F]*$/;

const envSchema = z.object({
  // RPC URL for blockchain network connection
  RPC_URL: z
    .string()
    .url("RPC_URL must be a valid URL")
    .min(1, "RPC URL is required"),

  // Safe multisig contract address
  SAFE_ADDRESS: z
    .string()
    .regex(addressRegex, "Invalid Safe address format")
    .min(1, "Safe address is required"),

  // Target address for the transaction
  TRANSACTION_TO: z
    .string()
    .regex(addressRegex, "Invalid transaction target address format")
    .min(1, "Transaction target address is required"),

  // Value to send in the transaction (in wei)
  TRANSACTION_VALUE: z
    .string()
    .default("0")
    .pipe(
      z.coerce
        .bigint()
        .nonnegative("Transaction value must be a positive amount")
    )
    .transform(String),

  // Transaction data/calldata
  TRANSACTION_DATA: z
    .string()
    .regex(hexDataRegex, "Transaction data must be valid hex data")
    .default("0x"),

  // Private key of the proposer wallet
  SAFE_PROPOSER_PRIVATE_KEY: z
    .string()
    .regex(privateKeyRegex, "Invalid private key format")
    .min(1, "Safe proposer private key is required")
    .transform((val) => (val.startsWith("0x") ? val : `0x${val}`)),

  // Safe API key for transaction service
  SAFE_API_KEY: z.string().min(1, "Safe API key is required"),

  // Dry run mode - validate without proposing
  DRY_RUN: z
    .string()
    .optional()
    .default("false")
    .transform((val) => val === "true" || val === "1"),
});

export const env = envSchema.parse(process.env);
