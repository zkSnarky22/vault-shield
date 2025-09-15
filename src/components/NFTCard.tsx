import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface NFTCardProps {
  name: string;
  collection: string;
  image: string;
  floorPrice: string;
  estimatedValue: string;
  maxLoan: string;
  isEncrypted?: boolean;
}

export function NFTCard({
  name,
  collection,
  image,
  floorPrice,
  estimatedValue,
  maxLoan,
  isEncrypted = true,
}: NFTCardProps) {
  const [isValueVisible, setIsValueVisible] = useState(false);

  const formatValue = (value: string) => {
    if (isEncrypted && !isValueVisible) {
      return "••••••";
    }
    return value;
  };

  return (
    <Card className="bg-card hover:bg-vault-gradient border-border transition-all duration-300 hover:shadow-crypto-glow group">
      <div className="p-4 space-y-4">
        {/* NFT Image */}
        <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary/50">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {isEncrypted && (
            <div className="absolute top-2 right-2 bg-encrypted-bg backdrop-blur-sm rounded-full p-2">
              <Lock className="w-3 h-3 text-primary" />
            </div>
          )}
        </div>

        {/* NFT Details */}
        <div className="space-y-2">
          <div>
            <h3 className="font-semibold text-foreground truncate">{name}</h3>
            <p className="text-sm text-muted-foreground">{collection}</p>
          </div>

          {/* Pricing Info */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Floor Price</span>
              <Badge variant="secondary" className="text-xs">
                {formatValue(floorPrice)}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Est. Value</span>
              <div className="flex items-center gap-1">
                <Badge variant="outline" className="text-xs">
                  {formatValue(estimatedValue)}
                </Badge>
                {isEncrypted && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => setIsValueVisible(!isValueVisible)}
                  >
                    {isValueVisible ? (
                      <EyeOff className="h-3 w-3" />
                    ) : (
                      <Eye className="h-3 w-3" />
                    )}
                  </Button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Max Loan</span>
              <Badge className="text-xs bg-success hover:bg-success/80">
                {formatValue(maxLoan)}
              </Badge>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          className="w-full bg-primary hover:bg-primary/90 shadow-pulse-glow"
          onClick={() => window.location.href = '/collateral-flow'}
        >
          Use as Collateral
        </Button>
      </div>
    </Card>
  );
}