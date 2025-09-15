import { Shield, Lock, TrendingUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NFTCard } from "@/components/NFTCard";
import { WalletConnect } from "@/components/WalletConnect";
import { LoanInterface } from "@/components/LoanInterface";
import { useNavigate } from "react-router-dom";
import nft1 from "@/assets/nft-1.jpg";
import nft2 from "@/assets/nft-2.jpg";
import nft3 from "@/assets/nft-3.jpg";

const sampleNFTs = [
  {
    name: "Cosmic Genesis #1847",
    collection: "Cosmic Genesis",
    image: nft1,
    floorPrice: "2.1 ETH",
    estimatedValue: "2.4 ETH", 
    maxLoan: "1.8 ETH"
  },
  {
    name: "CyberPunk Avatar #5923",
    collection: "CyberPunk Collection",
    image: nft2,
    floorPrice: "1.8 ETH",
    estimatedValue: "2.1 ETH",
    maxLoan: "1.5 ETH"
  },
  {
    name: "Space Odyssey #3401",
    collection: "Space Odyssey",
    image: nft3,
    floorPrice: "3.2 ETH",
    estimatedValue: "3.6 ETH",
    maxLoan: "2.7 ETH"
  }
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Confidential Vault</h1>
                <p className="text-xs text-muted-foreground">NFT Collateralization Platform</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge className="bg-primary/20 text-primary">
                <Lock className="w-3 h-3 mr-1" />
                Encrypted Mode
              </Badge>
              <WalletConnect />
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* NFT Vault */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Your NFT Vault</h2>
              <Badge className="bg-primary/20 text-primary">
                3 Assets • $8.1 ETH Total
              </Badge>
            </div>
            
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sampleNFTs.map((nft, index) => (
                <NFTCard key={index} {...nft} />
              ))}
            </div>

            {/* Add More NFTs */}
            <Card className="border-2 border-dashed border-muted-foreground/25 p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => navigate('/import-nfts')}>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <Plus className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Import More NFTs</h3>
                  <p className="text-sm text-muted-foreground">Connect more wallets or import NFTs to increase your borrowing power</p>
                </div>
                <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
                  Import NFTs
                </Button>
              </div>
            </Card>
          </div>

          {/* Loan Interface */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Borrow Against Collateral</h2>
            <LoanInterface />
            
            {/* Quick Stats */}
            <Card className="bg-card border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Portfolio Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Collateral Value</span>
                  <span className="font-semibold text-foreground">$12,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Available to Borrow</span>
                  <span className="font-semibold text-success">$8,500</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Active Loans</span>
                  <span className="font-semibold text-foreground">$0</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;