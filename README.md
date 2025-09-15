# Vault Shield - Confidential NFT Collateralization

A privacy-first DeFi platform that enables users to borrow against their NFTs with encrypted collateral values, preventing market manipulation while maintaining competitive lending rates.

## Features

- **Confidential Collateralization**: NFT values are encrypted using FHE (Fully Homomorphic Encryption)
- **Zero Market Impact**: Prevents price manipulation through private lending
- **Competitive Rates**: Access the best lending rates in DeFi
- **Multi-Wallet Support**: Connect with MetaMask, WalletConnect, and other Web3 wallets
- **Real-time Monitoring**: Track your vault status and loan performance

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Web3 Integration**: RainbowKit, Wagmi, Viem
- **Blockchain**: Ethereum Sepolia Testnet
- **Smart Contracts**: Solidity with FHE encryption
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- Web3 wallet (MetaMask, etc.)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/zkSnarky22/vault-shield.git
cd vault-shield
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables:
```bash
cp .env.example .env.local
```

4. Update the environment variables in `.env.local`:
```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:5173](http://localhost:5173) in your browser

## Smart Contract

The VaultShield smart contract implements FHE encryption for all sensitive financial data:

- **Encrypted Values**: NFT token IDs, collateral values, loan amounts
- **Privacy Protection**: All calculations performed on encrypted data
- **Reputation System**: Encrypted borrower and lender reputation scores
- **Liquidation Protection**: Automated liquidation with encrypted thresholds

### Contract Functions

- `createVault()`: Create a new NFT vault with encrypted collateral
- `requestLoan()`: Request a loan against your vault
- `makeRepayment()`: Make encrypted repayments
- `liquidateVault()`: Liquidate undercollateralized vaults

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on every push

### Environment Variables for Production

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID
NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_KEY
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Security

This project uses FHE (Fully Homomorphic Encryption) to protect sensitive financial data. All collateral values, loan amounts, and reputation scores are encrypted on-chain.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@vaultshield.io or join our Discord community.

## Roadmap

- [ ] Mainnet deployment
- [ ] Additional NFT collections support
- [ ] Cross-chain compatibility
- [ ] Mobile app
- [ ] Advanced analytics dashboard
