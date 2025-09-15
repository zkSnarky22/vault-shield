# Vercel Deployment Guide for Vault Shield

This guide provides step-by-step instructions for deploying Vault Shield to Vercel.

## Prerequisites

- GitHub account with access to the vault-shield repository
- Vercel account (free tier available)
- Environment variables ready

## Step-by-Step Deployment

### 1. Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" and choose "Continue with GitHub"
3. Authorize Vercel to access your GitHub account

### 2. Import Project

1. In your Vercel dashboard, click "New Project"
2. Find and select the `vault-shield` repository
3. Click "Import"

### 3. Configure Build Settings

Vercel should automatically detect this as a Vite project. Verify these settings:

- **Framework Preset**: Vite
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 4. Set Environment Variables

In the "Environment Variables" section, add the following:

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID
NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_KEY
```

**Important**: 
- Replace the placeholder values with your own API keys for production
- Make sure to add these to all environments (Production, Preview, Development)
- Never use the example keys in production

### 5. Deploy

1. Click "Deploy" button
2. Wait for the build process to complete (usually 2-3 minutes)
3. Your app will be available at the provided Vercel URL

### 6. Custom Domain (Optional)

1. In your project dashboard, go to "Settings" → "Domains"
2. Add your custom domain
3. Follow Vercel's DNS configuration instructions
4. Wait for SSL certificate to be issued

## Environment Variables Reference

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `NEXT_PUBLIC_CHAIN_ID` | Ethereum chain ID | `11155111` (Sepolia) |
| `NEXT_PUBLIC_RPC_URL` | RPC endpoint URL | `https://sepolia.infura.io/v3/...` |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | WalletConnect project ID | `2ec9743d0d0cd7fb94dee1a7e6d33475` |
| `NEXT_PUBLIC_INFURA_API_KEY` | Infura API key | `b18fb7e6ca7045ac83c41157ab93f990` |

## Post-Deployment Checklist

- [ ] Verify the app loads correctly
- [ ] Test wallet connection functionality
- [ ] Check that all pages are accessible
- [ ] Verify responsive design on mobile
- [ ] Test on different browsers
- [ ] Monitor build logs for any errors

## Troubleshooting

### Build Failures

1. Check the build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Verify TypeScript compilation passes locally

### Environment Variables Not Working

1. Double-check variable names (case-sensitive)
2. Ensure variables are added to all environments
3. Redeploy after adding new variables

### Wallet Connection Issues

1. Verify WalletConnect Project ID is correct
2. Check that RPC URL is accessible
3. Ensure chain ID matches your target network

## Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every push to other branches
- **Development**: Every pull request

## Performance Optimization

1. Enable Vercel Analytics (optional)
2. Configure caching headers for static assets
3. Use Vercel's Edge Functions if needed
4. Monitor Core Web Vitals

## Security Considerations

- Never commit API keys to the repository
- Use environment variables for all sensitive data
- Regularly rotate API keys
- Monitor for unauthorized access

## Support

For deployment issues:
- Check [Vercel Documentation](https://vercel.com/docs)
- Review build logs in Vercel dashboard
- Contact Vercel support if needed

## Next Steps

After successful deployment:
1. Update smart contract addresses in the frontend
2. Configure proper error monitoring
3. Set up analytics tracking
4. Plan for mainnet deployment
