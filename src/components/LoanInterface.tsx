import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, Clock, Percent, DollarSign } from "lucide-react";
import { useState } from "react";

export function LoanInterface() {
  const [loanAmount, setLoanAmount] = useState([5000]);
  const maxLoan = 8500;
  const collateralValue = 12000;

  const ltvRatio = (loanAmount[0] / collateralValue) * 100;
  const monthlyRate = 0.5; // 0.5% monthly
  const annualRate = monthlyRate * 12;

  return (
    <Card className="bg-card border-border p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Loan Configuration</h3>
        <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
          Confidential Mode
        </Badge>
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
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">APR</span>
          </div>
          <span className="text-lg font-semibold text-foreground">
            {annualRate.toFixed(1)}%
          </span>
        </div>

        <div className="bg-secondary/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Monthly Interest</span>
          </div>
          <span className="text-lg font-semibold text-foreground">
            ${((loanAmount[0] * monthlyRate) / 100).toFixed(0)}
          </span>
        </div>

        <div className="bg-secondary/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Duration</span>
          </div>
          <span className="text-lg font-semibold text-foreground">
            No Fixed Term
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button 
          className="w-full bg-primary hover:bg-primary/90 shadow-crypto-glow"
          onClick={() => window.location.href = '/loan-flow'}
        >
          Create Confidential Loan
        </Button>
        <p className="text-xs text-center text-muted-foreground">
          Your collateral values remain encrypted throughout the process
        </p>
      </div>
    </Card>
  );
}