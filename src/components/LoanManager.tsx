import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { useVaultShield } from '../hooks/useVaultShield';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Loader2, CreditCard, Lock, CheckCircle, AlertCircle, DollarSign } from 'lucide-react';

interface LoanManagerProps {
  vaultId?: number;
  onLoanCreated?: (loanId: number) => void;
}

export function LoanManager({ vaultId, onLoanCreated }: LoanManagerProps) {
  const { address, isConnected } = useAccount();
  const { 
    requestLoan, 
    makeRepayment,
    loading, 
    error, 
    transactionStatus, 
    isPending, 
    isConfirming, 
    isConfirmed,
    resetTransactionStatus 
  } = useVaultShield();

  const [formData, setFormData] = useState({
    requestedAmount: '',
    repaymentAmount: '',
  });

  const [activeTab, setActiveTab] = useState<'request' | 'repay'>('request');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRequestLoan = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected || !address) {
      alert('Please connect your wallet first');
      return;
    }

    if (!vaultId) {
      alert('Please select a vault first');
      return;
    }

    try {
      setIsSubmitting(true);
      resetTransactionStatus();

      const loanId = await requestLoan(
        vaultId,
        parseFloat(formData.requestedAmount)
      );

      if (loanId && onLoanCreated) {
        onLoanCreated(Number(loanId));
      }

      // Reset form on success
      setFormData(prev => ({
        ...prev,
        requestedAmount: '',
      }));

    } catch (err) {
      console.error('Failed to request loan:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMakeRepayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected || !address) {
      alert('Please connect your wallet first');
      return;
    }

    if (!vaultId) {
      alert('Please select a vault first');
      return;
    }

    try {
      setIsSubmitting(true);
      resetTransactionStatus();

      const repaymentId = await makeRepayment(
        vaultId,
        parseFloat(formData.repaymentAmount)
      );

      // Reset form on success
      setFormData(prev => ({
        ...prev,
        repaymentAmount: '',
      }));

    } catch (err) {
      console.error('Failed to make repayment:', err);
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
        return <CreditCard className="w-4 h-4" />;
    }
  };

  const getStatusMessage = () => {
    switch (transactionStatus) {
      case 'pending':
        return 'Transaction pending...';
      case 'confirming':
        return 'Confirming transaction...';
      case 'success':
        return activeTab === 'request' ? 'Loan requested successfully!' : 'Repayment made successfully!';
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
            <CreditCard className="w-5 h-5" />
            Create Loan
          </CardTitle>
          <CardDescription>
            Connect your wallet to create confidential loans
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please connect your wallet to create loans
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
          <CreditCard className="w-5 h-5" />
          Create Loan
        </CardTitle>
        <CardDescription>
          Request loans against your collateral or make repayments with FHE encryption
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg">
          <Button
            variant={activeTab === 'request' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('request')}
            className="flex-1"
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Request Loan
          </Button>
          <Button
            variant={activeTab === 'repay' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('repay')}
            className="flex-1"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Make Repayment
          </Button>
        </div>

        {/* Request Loan Form */}
        {activeTab === 'request' && (
          <form onSubmit={handleRequestLoan} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="vaultId">Vault ID</Label>
              <Input
                id="vaultId"
                type="number"
                placeholder="Enter vault ID"
                value={vaultId || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, vaultId: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requestedAmount">Requested Loan Amount (ETH)</Label>
              <Input
                id="requestedAmount"
                type="number"
                step="0.01"
                placeholder="1.0"
                value={formData.requestedAmount}
                onChange={(e) => handleInputChange('requestedAmount', e.target.value)}
                required
              />
            </div>

            <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20">
              <Lock className="w-5 h-5 text-blue-400" />
              <div className="text-sm text-muted-foreground">
                <strong>Confidential Request:</strong> Your loan amount is encrypted using FHE. 
                Only you and the verifier can see the actual amount.
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg shadow-blue-500/25"
              disabled={isSubmitting || isPending || isConfirming}
            >
              {isSubmitting || isPending || isConfirming ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isPending ? 'Pending...' : isConfirming ? 'Confirming...' : 'Requesting Loan...'}
                </>
              ) : (
                <>
                  <DollarSign className="w-4 h-4 mr-2" />
                  Request Confidential Loan
                </>
              )}
            </Button>
          </form>
        )}

        {/* Make Repayment Form */}
        {activeTab === 'repay' && (
          <form onSubmit={handleMakeRepayment} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="repayVaultId">Vault ID</Label>
              <Input
                id="repayVaultId"
                type="number"
                placeholder="Enter vault ID"
                value={vaultId || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, vaultId: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="repaymentAmount">Repayment Amount (ETH)</Label>
              <Input
                id="repaymentAmount"
                type="number"
                step="0.01"
                placeholder="1.0"
                value={formData.repaymentAmount}
                onChange={(e) => handleInputChange('repaymentAmount', e.target.value)}
                required
              />
            </div>

            <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg border border-cyan-500/20">
              <Lock className="w-5 h-5 text-cyan-400" />
              <div className="text-sm text-muted-foreground">
                <strong>Private Repayment:</strong> Your repayment amount is encrypted using FHE. 
                The transaction details remain confidential.
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 shadow-lg shadow-cyan-500/25"
              disabled={isSubmitting || isPending || isConfirming}
            >
              {isSubmitting || isPending || isConfirming ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isPending ? 'Pending...' : isConfirming ? 'Confirming...' : 'Processing Repayment...'}
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Make Confidential Repayment
                </>
              )}
            </Button>
          </form>
        )}

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
      </CardContent>
    </Card>
  );
}
