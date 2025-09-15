# Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Chain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID

# Infura Configuration (Optional)
NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_KEY
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia
```

## Getting Your Own Keys

### Infura API Key
1. Go to [Infura](https://infura.io/)
2. Create an account and project
3. Copy your project ID

### WalletConnect Project ID
1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Create a new project
3. Copy your project ID

### Alchemy (Alternative)
1. Go to [Alchemy](https://www.alchemy.com/)
2. Create a new app
3. Copy your API key

Replace the placeholder values with your actual keys for production use.

## Security Notes

- Never commit API keys to version control
- Use environment variables for all sensitive data
- Regularly rotate your API keys
- Monitor usage and set up alerts
