import { useState } from "react";
import { ArrowLeft, Wallet, Upload, Search, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const mockNFTs = [
  { id: 1, name: "Bored Ape #1234", collection: "Bored Ape Yacht Club", value: "45 ETH", selected: false },
  { id: 2, name: "CryptoPunk #5678", collection: "CryptoPunks", value: "28 ETH", selected: false },
  { id: 3, name: "Mutant Ape #9012", collection: "Mutant Ape Yacht Club", value: "12 ETH", selected: false },
  { id: 4, name: "Azuki #3456", collection: "Azuki", value: "8 ETH", selected: false },
];

const ImportNFTs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedNFTs, setSelectedNFTs] = useState<number[]>([]);
  const [walletAddress, setWalletAddress] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [foundNFTs, setFoundNFTs] = useState<typeof mockNFTs>([]);

  const handleScanWallet = async () => {
    if (!walletAddress) {
      toast({
        title: "Error",
        description: "Please enter a wallet address",
        variant: "destructive",
      });
      return;
    }

    setIsScanning(true);
    // Simulate wallet scanning
    setTimeout(() => {
      setFoundNFTs(mockNFTs);
      setIsScanning(false);
      toast({
        title: "Wallet Scanned",
        description: `Found ${mockNFTs.length} NFTs in wallet`,
      });
    }, 2000);
  };

  const toggleNFTSelection = (id: number) => {
    setSelectedNFTs(prev => 
      prev.includes(id) 
        ? prev.filter(nftId => nftId !== id)
        : [...prev, id]
    );
  };

  const handleImportSelected = () => {
    if (selectedNFTs.length === 0) {
      toast({
        title: "No NFTs Selected",
        description: "Please select at least one NFT to import",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "NFTs Imported Successfully",
      description: `${selectedNFTs.length} NFTs have been added to your vault`,
    });
    
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="hover:bg-secondary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Import NFTs</h1>
              <p className="text-sm text-muted-foreground">Add NFTs to your confidential vault</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Import Methods */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 hover:bg-vault-gradient transition-all duration-300">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Scan Wallet Address</h3>
                  <p className="text-sm text-muted-foreground">Enter any wallet address to scan for NFTs</p>
                </div>
                <div className="space-y-3">
                  <Input
                    placeholder="0x1234...abcd"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="bg-background border-border"
                  />
                  <Button 
                    onClick={handleScanWallet}
                    disabled={isScanning}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    {isScanning ? "Scanning..." : "Scan Wallet"}
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:bg-vault-gradient transition-all duration-300">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Upload className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Manual Upload</h3>
                  <p className="text-sm text-muted-foreground">Upload NFT metadata or contract addresses</p>
                </div>
                <Button variant="outline" className="w-full border-primary/30 hover:bg-primary/10">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Files
                </Button>
              </div>
            </Card>
          </div>

          {/* Scan Results */}
          {foundNFTs.length > 0 && (
            <Card className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Found NFTs</h3>
                  <Badge className="bg-primary/20 text-primary">
                    {foundNFTs.length} NFTs Found
                  </Badge>
                </div>

                <div className="grid gap-4">
                  {foundNFTs.map((nft) => (
                    <div
                      key={nft.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                        selectedNFTs.includes(nft.id)
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => toggleNFTSelection(nft.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-foreground">{nft.name}</h4>
                          <p className="text-sm text-muted-foreground">{nft.collection}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">{nft.value}</Badge>
                          {selectedNFTs.includes(nft.id) && (
                            <CheckCircle className="w-5 h-5 text-primary" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedNFTs.length > 0 && (
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-sm text-muted-foreground">
                      {selectedNFTs.length} NFTs selected
                    </span>
                    <Button 
                      onClick={handleImportSelected}
                      className="bg-primary hover:bg-primary/90 shadow-crypto-glow"
                    >
                      Import Selected NFTs
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default ImportNFTs;