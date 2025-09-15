import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { useVaultShield } from '../hooks/useVaultShield';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Alert, AlertDescription } from './ui/alert';
import { Loader2, Shield, Lock, CheckCircle, AlertCircle } from 'lucide-react';

interface CollateralManagerProps {
  onVaultCreated?: (vaultId: number) => void;
}

export function CollateralManager({ onVaultCreated }: CollateralManagerProps) {
  const { address, isConnected } = useAccount();
  const { 
    createVault, 
    loading, 
    error, 
    transactionStatus, 
    isPending, 
    isConfirming, 
    isConfirmed,
    resetTransactionStatus 
  } = useVaultShield();

  const [formData, setFormData] = useState({
    nftContract: '',
    nftTokenId: '',
    collateralValue: '',
    requestedLoanAmount: '',
    loanDuration: '30', // Default 30 days
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected || !address) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      setIsSubmitting(true);
      resetTransactionStatus();

      const vaultId = await createVault(
        formData.nftContract,
        parseInt(formData.nftTokenId),
        parseFloat(formData.collateralValue),
        parseFloat(formData.requestedLoanAmount),
        parseInt(formData.loanDuration)
      );

      if (vaultId && onVaultCreated) {
        onVaultCreated(Number(vaultId));
      }

      // Reset form on success
      setFormData({
        nftContract: '',
        nftTokenId: '',
        collateralValue: '',
        requestedLoanAmount: '',
        loanDuration: '30',
      });

    } catch (err) {
      console.error('Failed to create vault:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = () => {
    switch (transactionStatus) {
      case 'pending':
        return <Loader2 className="w-4 h-4 animate-spin" />;
      case 'confirming':
        return <Loader2 className="w-4 h-4 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  const getStatusMessage = () => {
    switch (transactionStatus) {
      case 'pending':
        return 'Transaction pending...';
      case 'confirming':
        return 'Confirming transaction...';
      case 'success':
        return 'Vault created successfully!';
      case 'error':
        return error || 'Transaction failed';
      default:
        return '';
    }
  };

  if (!isConnected) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Use as Collateral
          </CardTitle>
          <CardDescription>
            Connect your wallet to create a confidential NFT vault
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please connect your wallet to use NFTs as collateral
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Use as Collateral
        </CardTitle>
        <CardDescription>
          Create a confidential vault using your NFTs as collateral with FHE encryption
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nftContract">NFT Contract Address</Label>
              <Input
                id="nftContract"
                type="text"
                placeholder="0x..."
                value={formData.nftContract}
                onChange={(e) => handleInputChange('nftContract', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nftTokenId">NFT Token ID</Label>
              <Input
                id="nftTokenId"
                type="number"
                placeholder="123"
                value={formData.nftTokenId}
                onChange={(e) => handleInputChange('nftTokenId', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="collateralValue">Collateral Value (ETH)</Label>
              <Input
                id="collateralValue"
                type="number"
                step="0.01"
                placeholder="1.5"
                value={formData.collateralValue}
                onChange={(e) => handleInputChange('collateralValue', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="requestedLoanAmount">Requested Loan Amount (ETH)</Label>
              <Input
                id="requestedLoanAmount"
                type="number"
                step="0.01"
                placeholder="1.0"
                value={formData.requestedLoanAmount}
                onChange={(e) => handleInputChange('requestedLoanAmount', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="loanDuration">Loan Duration (Days)</Label>
            <Input
              id="loanDuration"
              type="number"
              placeholder="30"
              value={formData.loanDuration}
              onChange={(e) => handleInputChange('loanDuration', e.target.value)}
              required
            />
          </div>

          {/* Transaction Status */}
          {(transactionStatus !== 'idle' || error) && (
            <Alert className={transactionStatus === 'error' ? 'border-red-500' : 'border-green-500'}>
              <div className="flex items-center gap-2">
                {getStatusIcon()}
                <AlertDescription>
                  {getStatusMessage()}
                </AlertDescription>
              </div>
            </Alert>
          )}

          <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20">
            <Lock className="w-5 h-5 text-purple-400" />
            <div className="text-sm text-muted-foreground">
              <strong>Privacy Protected:</strong> All values are encrypted using FHE before being stored on-chain. 
              Your collateral value and loan amount remain confidential.
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg shadow-purple-500/25"
            disabled={isSubmitting || isPending || isConfirming}
          >
            {isSubmitting || isPending || isConfirming ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {isPending ? 'Pending...' : isConfirming ? 'Confirming...' : 'Creating Vault...'}
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 mr-2" />
                Create Confidential Vault
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
