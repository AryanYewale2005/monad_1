# Medical Data Access Logger

**A tamper-evident, on-chain audit trail for healthcare data access — built on Monad, with zero protected health information (PHI) ever touching the blockchain.**

🔗 **Live demo:** [monad-1.vercel.app](https://monad-1.vercel.app)

---

## Overview

Medical Data Access Logger records *who* accessed a patient record and *why* as a permanent, cryptographically verifiable transaction on the Monad blockchain — while the actual medical record and any PHI stay entirely off-chain in existing hospital systems.

Traditional access logs live in a database an administrator can quietly edit, delete, or lose, leaving no independent proof of what really happened. This project replaces that trust assumption with an immutable, append-only audit log secured by a smart contract, giving patients, providers, and auditors undeniable proof of every access event.

## Key Features

- 🛡 **Zero PHI on-chain** — only immutable metadata (patient reference ID, timestamp, and access reason) is ever written to the blockchain. Medical records themselves never leave off-chain systems.
- ⚡ **Real-time EVM event streaming** — every access request is captured live and reflected instantly in the on-chain access history.
- 🚀 **Sub-second finality** — built on Monad, a high-throughput EVM-compatible chain, so audit transactions confirm in a fraction of a second.
- 🔒 **Immutable audit trail** — once logged, an access record can never be edited or deleted, only appended to.
- 🔍 **Verifiable on a public explorer** — every transaction can be independently inspected on the Monad block explorer.

## How It Works

1. **Connect Wallet** — a staff member connects their wallet to authenticate as the party requesting access.
2. **Verify Network** — the app confirms it's connected to Monad Testnet (Chain ID `10143`) before writing anything.
3. **Log to Smart Contract** — the `MedicalAccessLogger` contract records the patient reference ID and reason for access as an on-chain event.

The result is a public, queryable history of access events that can be reviewed at any time — without exposing a single byte of protected health information.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | [Next.js](https://nextjs.org) (React, TypeScript) |
| Smart Contracts | Solidity, deployed to Monad Testnet |
| Blockchain | [Monad Testnet](https://testnet.monadexplorer.com) (Chain ID `10143`) |
| Wallet Integration | EVM wallet connector (MetaMask-compatible) |
| Hosting | [Vercel](https://vercel.com) |

## Contract Details

| | |
|---|---|
| **Network** | Monad Testnet |
| **Chain ID** | `10143` |
| **Contract** | `MedicalAccessLogger` |
| **Address** | `0x0D05db2dfA16Ae2a8a438041c444E5eFF231E994` |
| **Explorer** | [View on Monad Explorer](https://testnet.monadexplorer.com/address/0x0D05db2dfA16Ae2a8a438041c444E5eFF231E994) |

## Project Structure

```
monad_1/
├── contracts/     # Solidity smart contracts (MedicalAccessLogger)
├── public/        # Static assets
├── src/           # Next.js application source
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- An EVM-compatible wallet (e.g. MetaMask) configured for Monad Testnet
- Testnet MON tokens for gas

### Installation

```bash
git clone https://github.com/AryanYewale2005/monad_1.git
cd monad_1
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

### Connecting to Monad Testnet

Add Monad Testnet to your wallet if it isn't already configured:

- **Network Name:** Monad Testnet
- **Chain ID:** `10143`
- **Explorer:** https://testnet.monadexplorer.com

## Security Notice

🔒 Medical records remain securely off-chain at all times. Only access metadata — never patient health information — is recorded on the blockchain, in line with the project's zero-PHI-on-chain design principle.

## License

This project is provided as-is for demonstration and educational purposes. Add a license of your choice before using in production.

## Acknowledgements

Built on [Monad](https://www.monad.xyz), a high-performance, EVM-compatible Layer 1 blockchain.