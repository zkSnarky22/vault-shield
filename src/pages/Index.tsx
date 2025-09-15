import { Shield, Lock, Eye, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAccount } from 'wagmi';
import { WalletConnect } from "@/components/WalletConnect";
import heroVault from "@/assets/hero-vault.jpg";

const Index = () => {
  const navigate = useNavigate();
  const { isConnected } = useAccount();

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
              <Button 
                size="lg" 
                onClick={() => navigate('/dashboard')}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg shadow-purple-500/25 px-8 py-6 text-lg"
              >
                Enter Vault
              </Button>
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