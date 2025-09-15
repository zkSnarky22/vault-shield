// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract VaultShield is SepoliaConfig {
    using FHE for *;
    
    struct NFTVault {
        euint32 vaultId;
        euint32 nftTokenId;
        euint32 collateralValue;
        euint32 loanAmount;
        euint32 interestRate;
        euint32 liquidationThreshold;
        bool isActive;
        bool isLiquidated;
        address owner;
        address nftContract;
        uint256 createdAt;
        uint256 maturityDate;
    }
    
    struct LoanRequest {
        euint32 requestId;
        euint32 requestedAmount;
        euint32 nftValue;
        euint32 loanDuration;
        bool isApproved;
        bool isActive;
        address borrower;
        address nftContract;
        euint32 nftTokenId;
        uint256 createdAt;
    }
    
    struct Repayment {
        euint32 repaymentId;
        euint32 amount;
        euint32 principalAmount;
        euint32 interestAmount;
        address borrower;
        uint256 timestamp;
    }
    
    struct LiquidationEvent {
        euint32 liquidationId;
        euint32 vaultId;
        euint32 liquidationAmount;
        euint32 remainingDebt;
        address liquidator;
        uint256 timestamp;
    }
    
    mapping(uint256 => NFTVault) public vaults;
    mapping(uint256 => LoanRequest) public loanRequests;
    mapping(uint256 => Repayment) public repayments;
    mapping(uint256 => LiquidationEvent) public liquidations;
    mapping(address => euint32) public borrowerReputation;
    mapping(address => euint32) public lenderReputation;
    mapping(address => euint32) public totalBorrowed;
    mapping(address => euint32) public totalLent;
    
    uint256 public vaultCounter;
    uint256 public requestCounter;
    uint256 public repaymentCounter;
    uint256 public liquidationCounter;
    
    address public owner;
    address public verifier;
    euint32 public platformFeeRate;
    euint32 public maxLoanToValueRatio;
    
    event VaultCreated(uint256 indexed vaultId, address indexed owner, address indexed nftContract, uint32 nftTokenId);
    event LoanRequested(uint256 indexed requestId, address indexed borrower, uint32 requestedAmount);
    event LoanApproved(uint256 indexed requestId, uint256 indexed vaultId, uint32 loanAmount);
    event RepaymentMade(uint256 indexed repaymentId, uint256 indexed vaultId, address indexed borrower, uint32 amount);
    event VaultLiquidated(uint256 indexed vaultId, address indexed liquidator, uint32 liquidationAmount);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
        platformFeeRate = FHE.asEuint32(250); // 2.5% in basis points
        maxLoanToValueRatio = FHE.asEuint32(7000); // 70% in basis points
    }
    
    function createVault(
        address nftContract,
        externalEuint32 nftTokenId,
        externalEuint32 collateralValue,
        externalEuint32 requestedLoanAmount,
        externalEuint32 loanDuration,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(nftContract != address(0), "Invalid NFT contract");
        
        uint256 vaultId = vaultCounter++;
        
        // Convert external values to internal encrypted values
        euint32 internalNftTokenId = FHE.fromExternal(nftTokenId, inputProof);
        euint32 internalCollateralValue = FHE.fromExternal(collateralValue, inputProof);
        euint32 internalRequestedAmount = FHE.fromExternal(requestedLoanAmount, inputProof);
        euint32 internalLoanDuration = FHE.fromExternal(loanDuration, inputProof);
        
        // Calculate interest rate based on reputation and loan amount
        euint32 baseRate = FHE.asEuint32(1000); // 10% base rate
        euint32 reputationBonus = FHE.sub(FHE.asEuint32(10000), borrowerReputation[msg.sender]);
        euint32 interestRate = FHE.add(baseRate, FHE.div(reputationBonus, FHE.asEuint32(100)));
        
        // Calculate liquidation threshold (80% of collateral value)
        euint32 liquidationThreshold = FHE.div(FHE.mul(internalCollateralValue, FHE.asEuint32(8000)), FHE.asEuint32(10000));
        
        vaults[vaultId] = NFTVault({
            vaultId: FHE.asEuint32(0), // Will be set properly later
            nftTokenId: internalNftTokenId,
            collateralValue: internalCollateralValue,
            loanAmount: FHE.asEuint32(0), // Will be set when loan is approved
            interestRate: interestRate,
            liquidationThreshold: liquidationThreshold,
            isActive: true,
            isLiquidated: false,
            owner: msg.sender,
            nftContract: nftContract,
            createdAt: block.timestamp,
            maturityDate: block.timestamp + 30 days // Default 30 days, will be updated
        });
        
        emit VaultCreated(vaultId, msg.sender, nftContract, 0); // NFT token ID will be decrypted off-chain
        return vaultId;
    }
    
    function requestLoan(
        uint256 vaultId,
        externalEuint32 requestedAmount,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(vaults[vaultId].owner == msg.sender, "Only vault owner can request loan");
        require(vaults[vaultId].isActive, "Vault is not active");
        require(!vaults[vaultId].isLiquidated, "Vault is liquidated");
        
        uint256 requestId = requestCounter++;
        
        euint32 internalRequestedAmount = FHE.fromExternal(requestedAmount, inputProof);
        
        // Verify loan amount doesn't exceed max LTV
        euint32 maxAllowedLoan = FHE.div(FHE.mul(vaults[vaultId].collateralValue, maxLoanToValueRatio), FHE.asEuint32(10000));
        require(FHE.decrypt(FHE.lt(internalRequestedAmount, maxAllowedLoan)), "Loan amount exceeds maximum LTV");
        
        loanRequests[requestId] = LoanRequest({
            requestId: FHE.asEuint32(0), // Will be set properly later
            requestedAmount: internalRequestedAmount,
            nftValue: vaults[vaultId].collateralValue,
            loanDuration: FHE.asEuint32(30), // 30 days default
            isApproved: false,
            isActive: true,
            borrower: msg.sender,
            nftContract: vaults[vaultId].nftContract,
            nftTokenId: vaults[vaultId].nftTokenId,
            createdAt: block.timestamp
        });
        
        emit LoanRequested(requestId, msg.sender, 0); // Amount will be decrypted off-chain
        return requestId;
    }
    
    function approveLoan(
        uint256 requestId,
        uint256 vaultId,
        externalEuint32 approvedAmount,
        bytes calldata inputProof
    ) public {
        require(msg.sender == verifier, "Only verifier can approve loans");
        require(loanRequests[requestId].isActive, "Request is not active");
        require(vaults[vaultId].isActive, "Vault is not active");
        
        euint32 internalApprovedAmount = FHE.fromExternal(approvedAmount, inputProof);
        
        // Update vault with approved loan
        vaults[vaultId].loanAmount = internalApprovedAmount;
        vaults[vaultId].maturityDate = block.timestamp + 30 days;
        
        // Update loan request
        loanRequests[requestId].isApproved = true;
        loanRequests[requestId].isActive = false;
        
        // Update borrower's total borrowed amount
        totalBorrowed[loanRequests[requestId].borrower] = FHE.add(
            totalBorrowed[loanRequests[requestId].borrower], 
            internalApprovedAmount
        );
        
        emit LoanApproved(requestId, vaultId, 0); // Amount will be decrypted off-chain
    }
    
    function makeRepayment(
        uint256 vaultId,
        externalEuint32 repaymentAmount,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(vaults[vaultId].owner == msg.sender, "Only vault owner can make repayment");
        require(vaults[vaultId].isActive, "Vault is not active");
        require(!vaults[vaultId].isLiquidated, "Vault is liquidated");
        
        uint256 repaymentId = repaymentCounter++;
        
        euint32 internalRepaymentAmount = FHE.fromExternal(repaymentAmount, inputProof);
        
        // Calculate interest and principal
        euint32 timeElapsed = FHE.asEuint32(uint32(block.timestamp - vaults[vaultId].createdAt));
        euint32 interestAmount = FHE.div(
            FHE.mul(FHE.mul(vaults[vaultId].loanAmount, vaults[vaultId].interestRate), timeElapsed),
            FHE.asEuint32(365 days)
        );
        
        euint32 principalAmount = FHE.sub(internalRepaymentAmount, interestAmount);
        
        repayments[repaymentId] = Repayment({
            repaymentId: FHE.asEuint32(0), // Will be set properly later
            amount: internalRepaymentAmount,
            principalAmount: principalAmount,
            interestAmount: interestAmount,
            borrower: msg.sender,
            timestamp: block.timestamp
        });
        
        // Update vault loan amount
        vaults[vaultId].loanAmount = FHE.sub(vaults[vaultId].loanAmount, principalAmount);
        
        // Check if loan is fully repaid
        if (FHE.decrypt(FHE.eq(vaults[vaultId].loanAmount, FHE.asEuint32(0)))) {
            vaults[vaultId].isActive = false;
        }
        
        emit RepaymentMade(repaymentId, vaultId, msg.sender, 0); // Amount will be decrypted off-chain
        return repaymentId;
    }
    
    function liquidateVault(
        uint256 vaultId,
        externalEuint32 liquidationAmount,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(vaults[vaultId].isActive, "Vault is not active");
        require(!vaults[vaultId].isLiquidated, "Vault already liquidated");
        require(block.timestamp > vaults[vaultId].maturityDate, "Vault not yet mature");
        
        uint256 liquidationId = liquidationCounter++;
        
        euint32 internalLiquidationAmount = FHE.fromExternal(liquidationAmount, inputProof);
        
        // Check if liquidation is justified (collateral value below threshold)
        require(FHE.decrypt(FHE.lt(vaults[vaultId].collateralValue, vaults[vaultId].liquidationThreshold)), 
                "Collateral value above liquidation threshold");
        
        liquidations[liquidationId] = LiquidationEvent({
            liquidationId: FHE.asEuint32(0), // Will be set properly later
            vaultId: FHE.asEuint32(vaultId),
            liquidationAmount: internalLiquidationAmount,
            remainingDebt: FHE.sub(vaults[vaultId].loanAmount, internalLiquidationAmount),
            liquidator: msg.sender,
            timestamp: block.timestamp
        });
        
        // Mark vault as liquidated
        vaults[vaultId].isLiquidated = true;
        vaults[vaultId].isActive = false;
        
        emit VaultLiquidated(vaultId, msg.sender, 0); // Amount will be decrypted off-chain
        return liquidationId;
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        // Determine if user is borrower or lender based on context
        if (totalBorrowed[user] != FHE.asEuint32(0)) {
            borrowerReputation[user] = reputation;
        } else {
            lenderReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getVaultInfo(uint256 vaultId) public view returns (
        uint8 nftTokenId,
        uint8 collateralValue,
        uint8 loanAmount,
        uint8 interestRate,
        uint8 liquidationThreshold,
        bool isActive,
        bool isLiquidated,
        address owner,
        address nftContract,
        uint256 createdAt,
        uint256 maturityDate
    ) {
        NFTVault storage vault = vaults[vaultId];
        return (
            0, // FHE.decrypt(vault.nftTokenId) - will be decrypted off-chain
            0, // FHE.decrypt(vault.collateralValue) - will be decrypted off-chain
            0, // FHE.decrypt(vault.loanAmount) - will be decrypted off-chain
            0, // FHE.decrypt(vault.interestRate) - will be decrypted off-chain
            0, // FHE.decrypt(vault.liquidationThreshold) - will be decrypted off-chain
            vault.isActive,
            vault.isLiquidated,
            vault.owner,
            vault.nftContract,
            vault.createdAt,
            vault.maturityDate
        );
    }
    
    function getLoanRequestInfo(uint256 requestId) public view returns (
        uint8 requestedAmount,
        uint8 nftValue,
        uint8 loanDuration,
        bool isApproved,
        bool isActive,
        address borrower,
        address nftContract,
        uint8 nftTokenId,
        uint256 createdAt
    ) {
        LoanRequest storage request = loanRequests[requestId];
        return (
            0, // FHE.decrypt(request.requestedAmount) - will be decrypted off-chain
            0, // FHE.decrypt(request.nftValue) - will be decrypted off-chain
            0, // FHE.decrypt(request.loanDuration) - will be decrypted off-chain
            request.isApproved,
            request.isActive,
            request.borrower,
            request.nftContract,
            0, // FHE.decrypt(request.nftTokenId) - will be decrypted off-chain
            request.createdAt
        );
    }
    
    function getRepaymentInfo(uint256 repaymentId) public view returns (
        uint8 amount,
        uint8 principalAmount,
        uint8 interestAmount,
        address borrower,
        uint256 timestamp
    ) {
        Repayment storage repayment = repayments[repaymentId];
        return (
            0, // FHE.decrypt(repayment.amount) - will be decrypted off-chain
            0, // FHE.decrypt(repayment.principalAmount) - will be decrypted off-chain
            0, // FHE.decrypt(repayment.interestAmount) - will be decrypted off-chain
            repayment.borrower,
            repayment.timestamp
        );
    }
    
    function getBorrowerReputation(address borrower) public view returns (uint8) {
        return 0; // FHE.decrypt(borrowerReputation[borrower]) - will be decrypted off-chain
    }
    
    function getLenderReputation(address lender) public view returns (uint8) {
        return 0; // FHE.decrypt(lenderReputation[lender]) - will be decrypted off-chain
    }
    
    function getTotalBorrowed(address borrower) public view returns (uint8) {
        return 0; // FHE.decrypt(totalBorrowed[borrower]) - will be decrypted off-chain
    }
    
    function getTotalLent(address lender) public view returns (uint8) {
        return 0; // FHE.decrypt(totalLent[lender]) - will be decrypted off-chain
    }
    
    // Emergency functions
    function pauseContract() public {
        require(msg.sender == owner, "Only owner can pause");
        // Implementation for pausing contract
    }
    
    function unpauseContract() public {
        require(msg.sender == owner, "Only owner can unpause");
        // Implementation for unpausing contract
    }
    
    function updatePlatformFeeRate(externalEuint32 newFeeRate, bytes calldata inputProof) public {
        require(msg.sender == owner, "Only owner can update fee rate");
        platformFeeRate = FHE.fromExternal(newFeeRate, inputProof);
    }
    
    function updateMaxLTV(externalEuint32 newMaxLTV, bytes calldata inputProof) public {
        require(msg.sender == owner, "Only owner can update max LTV");
        maxLoanToValueRatio = FHE.fromExternal(newMaxLTV, inputProof);
    }
}
