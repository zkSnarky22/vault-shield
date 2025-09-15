import { Shield, Lock, Eye, TrendingUp, CreditCard, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAccount } from 'wagmi';
import { WalletConnect } from "@/components/WalletConnect";
import { CollateralManager } from "@/components/CollateralManager";
import { LoanManager } from "@/components/LoanManager";
import heroVault from "@/assets/hero-vault.jpg";
import { useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const [activeSection, setActiveSection] = useState<'hero' | 'collateral' | 'loan'>('hero');
  const [createdVaultId, setCreatedVaultId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroVault})` }}
        />
        <div className="absolute inset-0 bg-background/90" />
        
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <Badge className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border-purple-500/30 hover:from-purple-500/30 hover:to-blue-500/30">
                <Lock className="w-3 h-3 mr-1" />
                Confidential Collateralization
              </Badge>
              
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Leverage NFTs, Privately
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Borrow against your NFTs with encrypted collateral values to prevent market manipulation. 
                Your vault, your privacy, your advantage.
              </p>
            </div>

            {/* Key Features */}
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <Card className="bg-card/50 backdrop-blur border-border p-6 hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-blue-500/10 transition-all duration-300">
                <Shield className="w-8 h-8 text-purple-400 mb-3 mx-auto" />
                <h3 className="font-semibold text-foreground mb-2">Encrypted Values</h3>
                <p className="text-sm text-muted-foreground">Your collateral values remain private and encrypted</p>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur border-border p-6 hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-cyan-500/10 transition-all duration-300">
                <Eye className="w-8 h-8 text-blue-400 mb-3 mx-auto" />
                <h3 className="font-semibold text-foreground mb-2">Zero Market Impact</h3>
                <p className="text-sm text-muted-foreground">Prevent price manipulation with confidential lending</p>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur border-border p-6 hover:bg-gradient-to-br hover:from-cyan-500/10 hover:to-purple-500/10 transition-all duration-300">
                <TrendingUp className="w-8 h-8 text-cyan-400 mb-3 mx-auto" />
                <h3 className="font-semibold text-foreground mb-2">Competitive Rates</h3>
                <p className="text-sm text-muted-foreground">Access the best lending rates in DeFi</p>
              </Card>
            </div>

            {isConnected ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={() => setActiveSection('collateral')}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg shadow-purple-500/25 px-8 py-6 text-lg"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Use as Collateral
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => setActiveSection('loan')}
                  className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 px-8 py-6 text-lg"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Create Loan
                </Button>
              </div>
            ) : (
              <div className="max-w-md mx-auto">
                <WalletConnect />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-foreground">How It Works</h2>
            <p className="text-muted-foreground">Simple steps to leverage your NFTs privately</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-blue-500/10 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-purple-400">1</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Import Your NFTs</h3>
              <p className="text-sm text-muted-foreground">Connect your wallet and import NFTs to your confidential vault</p>
            </Card>

            <Card className="p-6 text-center hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-cyan-500/10 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-blue-400">2</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Use as Collateral</h3>
              <p className="text-sm text-muted-foreground">Lock your NFTs as collateral with encrypted value protection</p>
            </Card>

            <Card className="p-6 text-center hover:bg-gradient-to-br hover:from-cyan-500/10 hover:to-purple-500/10 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-cyan-400">3</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Create Confidential Loan</h3>
              <p className="text-sm text-muted-foreground">Borrow against your collateral with competitive rates</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contract Interaction Section */}
      {isConnected && activeSection !== 'hero' && (
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold text-foreground">
                {activeSection === 'collateral' ? 'Use NFTs as Collateral' : 'Create Confidential Loan'}
              </h2>
              <p className="text-muted-foreground">
                {activeSection === 'collateral' 
                  ? 'Create a confidential vault with FHE-encrypted collateral values'
                  : 'Request loans or make repayments with encrypted amounts'
                }
              </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-center mb-8">
              <div className="flex space-x-1 bg-muted p-1 rounded-lg">
                <Button
                  variant={activeSection === 'collateral' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveSection('collateral')}
                  className="px-6"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Use as Collateral
                </Button>
                <Button
                  variant={activeSection === 'loan' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveSection('loan')}
                  className="px-6"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Create Loan
                </Button>
              </div>
            </div>

            {/* Component Rendering */}
            {activeSection === 'collateral' && (
              <CollateralManager 
                onVaultCreated={(vaultId) => {
                  setCreatedVaultId(vaultId);
                  setActiveSection('loan');
                }}
              />
            )}

            {activeSection === 'loan' && (
              <LoanManager 
                vaultId={createdVaultId || undefined}
                onLoanCreated={(loanId) => {
                  console.log('Loan created:', loanId);
                }}
              />
            )}

            {/* Back to Hero */}
            <div className="text-center mt-8">
              <Button
                variant="outline"
                onClick={() => setActiveSection('hero')}
                className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
              >
                Back to Overview
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 Confidential NFT Vault. Built with privacy-first technology.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;