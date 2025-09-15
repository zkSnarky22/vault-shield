import { useState } from "react";
import { ArrowLeft, Shield, Lock, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import nft1 from "@/assets/nft-1.jpg";

const CollateralFlow = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [collateralAmount, setCollateralAmount] = useState([75]);
  
  const nft = {
    name: "Cosmic Genesis #1847",
    collection: "Cosmic Genesis",
    image: nft1,
    floorPrice: "2.1 ETH",
    estimatedValue: "2.4 ETH",
    maxCollateral: "1.8 ETH"
  };

  const collateralValue = (parseFloat(nft.estimatedValue) * collateralAmount[0]) / 100;

  const handleConfirmCollateral = () => {
    toast({
      title: "Collateral Locked",
      description: `${collateralValue.toFixed(2)} ETH worth of ${nft.name} is now available as collateral`,
    });
    navigate('/dashboard');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card className="p-6 space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Select Collateral Amount</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Choose how much of your NFT's value you want to use as collateral. Higher amounts allow for larger loans.
              </p>
            </div>

            {/* NFT Display */}
            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="flex items-center gap-4">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{nft.name}</h3>
                  <p className="text-sm text-muted-foreground">{nft.collection}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      Est. Value: {nft.estimatedValue}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Collateral Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm text-muted-foreground">Collateral Percentage</label>
                <span className="text-lg font-semibold text-foreground">
                  {collateralAmount[0]}%
                </span>
              </div>
              <Slider
                value={collateralAmount}
                onValueChange={setCollateralAmount}
                max={100}
                min={25}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>25% (Conservative)</span>
                <span>100% (Maximum)</span>
              </div>
            </div>

            {/* Collateral Value */}
            <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Collateral Value</span>
                <span className="text-xl font-bold text-primary">
                  {collateralValue.toFixed(2)} ETH
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                This amount will be locked as collateral
              </p>
            </div>

            <Button 
              onClick={() => setStep(2)}
              className="w-full bg-primary hover:bg-primary/90 shadow-crypto-glow"
            >
              Continue to Review
            </Button>
          </Card>
        );

      case 2:
        return (
          <Card className="p-6 space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mx-auto">
                <AlertTriangle className="w-8 h-8 text-warning" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Review Collateral Terms</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Please review the terms before locking your NFT as collateral.
              </p>
            </div>

            {/* Terms Summary */}
            <div className="space-y-4">
              <div className="bg-secondary/50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">NFT Asset</span>
                  <span className="font-semibold text-foreground">{nft.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Collateral Amount</span>
                  <span className="font-semibold text-foreground">{collateralValue.toFixed(2)} ETH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Collateral Ratio</span>
                  <span className="font-semibold text-foreground">{collateralAmount[0]}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Maximum Loan</span>
                  <span className="font-semibold text-success">~{(collateralValue * 0.75).toFixed(2)} ETH</span>
                </div>
              </div>

              {/* Risk Warning */}
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-warning mb-1">Risk Warning</h4>
                    <p className="text-sm text-muted-foreground">
                      Your NFT will be locked as collateral. If you fail to repay loans, 
                      the collateral may be liquidated to cover the debt.
                    </p>
                  </div>
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Privacy Protected</h4>
                    <p className="text-sm text-muted-foreground">
                      Your collateral values are encrypted and remain confidential throughout the process.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1"
              >
                Back to Edit
              </Button>
              <Button 
                onClick={() => setStep(3)}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                Lock as Collateral
              </Button>
            </div>
          </Card>
        );

      case 3:
        return (
          <Card className="p-6 space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Collateral Locked Successfully</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Your NFT is now available as collateral for loans. You can start borrowing immediately.
              </p>
            </div>

            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Collateral Locked</span>
                  <span className="font-semibold text-success">{collateralValue.toFixed(2)} ETH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Available to Borrow</span>
                  <span className="font-semibold text-success">~{(collateralValue * 0.75).toFixed(2)} ETH</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="flex-1"
              >
                Return to Dashboard
              </Button>
              <Button 
                onClick={handleConfirmCollateral}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                Start Borrowing
              </Button>
            </div>
          </Card>
        );

      default:
        return null;
    }
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
              <h1 className="text-xl font-bold text-foreground">Use as Collateral</h1>
              <p className="text-sm text-muted-foreground">Lock your NFT to enable borrowing</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step >= stepNumber ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step > stepNumber ? 'bg-primary' : 'bg-secondary'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {renderStep()}
      </main>
    </div>
  );
};

export default CollateralFlow;