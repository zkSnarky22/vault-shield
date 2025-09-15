import { useState } from "react";
import { ArrowLeft, DollarSign, Percent, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const LoanFlow = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [loanAmount, setLoanAmount] = useState([5000]);
  const [loanDuration, setLoanDuration] = useState(30);
  
  const maxLoan = 8500;
  const collateralValue = 12000;
  const ltvRatio = (loanAmount[0] / collateralValue) * 100;
  const monthlyRate = 0.5; // 0.5% monthly
  const totalInterest = (loanAmount[0] * monthlyRate * (loanDuration / 30)) / 100;

  const handleCreateLoan = () => {
    toast({
      title: "Loan Created Successfully",
      description: `$${loanAmount[0].toLocaleString()} loan has been disbursed to your wallet`,
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
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Configure Your Loan</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Set your loan amount and duration based on your available collateral.
              </p>
            </div>

            {/* Available Collateral */}
            <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Available Collateral</span>
                <span className="text-lg font-bold text-primary">${collateralValue.toLocaleString()}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Maximum borrowing capacity: ${maxLoan.toLocaleString()}
              </p>
            </div>

            {/* Loan Amount Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm text-muted-foreground">Loan Amount</label>
                <span className="text-lg font-semibold text-foreground">
                  ${loanAmount[0].toLocaleString()}
                </span>
              </div>
              <Slider
                value={loanAmount}
                onValueChange={setLoanAmount}
                max={maxLoan}
                min={100}
                step={100}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$100</span>
                <span>Max: ${maxLoan.toLocaleString()}</span>
              </div>
            </div>

            {/* Loan Duration */}
            <div className="space-y-4">
              <label className="text-sm text-muted-foreground">Loan Duration (Days)</label>
              <Input
                type="number"
                value={loanDuration}
                onChange={(e) => setLoanDuration(Number(e.target.value))}
                min={1}
                max={365}
                className="bg-background border-border"
              />
              <p className="text-xs text-muted-foreground">
                Or choose no fixed term for flexible repayment
              </p>
            </div>

            {/* Loan Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Percent className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">LTV Ratio</span>
                </div>
                <span className={`text-lg font-semibold ${
                  ltvRatio > 70 ? 'text-destructive' : 
                  ltvRatio > 50 ? 'text-warning' : 'text-success'
                }`}>
                  {ltvRatio.toFixed(1)}%
                </span>
              </div>

              <div className="bg-secondary/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Total Interest</span>
                </div>
                <span className="text-lg font-semibold text-foreground">
                  ${totalInterest.toFixed(0)}
                </span>
              </div>
            </div>

            <Button 
              onClick={() => setStep(2)}
              className="w-full bg-primary hover:bg-primary/90 shadow-crypto-glow"
            >
              Review Loan Terms
            </Button>
          </Card>
        );

      case 2:
        return (
          <Card className="p-6 space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8 text-warning" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Review Loan Agreement</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Please review all terms before finalizing your confidential loan.
              </p>
            </div>

            {/* Loan Summary */}
            <div className="space-y-4">
              <div className="bg-secondary/50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Loan Amount</span>
                  <span className="font-semibold text-foreground">${loanAmount[0].toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Duration</span>
                  <span className="font-semibold text-foreground">{loanDuration} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Interest Rate</span>
                  <span className="font-semibold text-foreground">{monthlyRate}% monthly</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Interest</span>
                  <span className="font-semibold text-foreground">${totalInterest.toFixed(0)}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-3">
                  <span className="text-sm text-muted-foreground">Total Repayment</span>
                  <span className="font-semibold text-foreground">${(loanAmount[0] + totalInterest).toFixed(0)}</span>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                <h4 className="font-semibold text-warning mb-2">Loan Terms</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Collateral remains locked until full repayment</li>
                  <li>• Early repayment is allowed without penalties</li>
                  <li>• Liquidation may occur if LTV exceeds 85%</li>
                  <li>• All transactions are confidentially processed</li>
                </ul>
              </div>

              {/* Collateral Information */}
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Collateral Backing This Loan</span>
                  <span className="font-semibold text-primary">${collateralValue.toLocaleString()}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Your NFT collateral values remain encrypted and private
                </p>
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
                Accept & Create Loan
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
              <h2 className="text-2xl font-bold text-foreground">Loan Created Successfully</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Your confidential loan has been processed and funds have been transferred to your wallet.
              </p>
            </div>

            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Loan Amount</span>
                  <span className="font-semibold text-success">${loanAmount[0].toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Loan ID</span>
                  <span className="font-mono text-sm text-muted-foreground">#CF{Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Next Payment Due</span>
                  <span className="font-semibold text-foreground">{new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <h4 className="font-semibold text-primary mb-2">What's Next?</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Monitor your loan status in the dashboard</li>
                <li>• Make payments anytime to reduce interest</li>
                <li>• Your collateral remains confidentially secured</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="flex-1"
              >
                View Dashboard
              </Button>
              <Button 
                onClick={handleCreateLoan}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                Done
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
              <h1 className="text-xl font-bold text-foreground">Create Confidential Loan</h1>
              <p className="text-sm text-muted-foreground">Borrow against your encrypted collateral</p>
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

export default LoanFlow;