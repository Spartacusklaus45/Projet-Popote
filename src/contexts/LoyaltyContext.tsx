import React, { createContext, useContext, useState, useEffect } from 'react';
import { CardTier, CARD_TIERS, generateCardDetails } from '../utils/cardGenerator';
import { Transaction, createTransaction } from '../utils/transactions';
import { validateCardOperation, generateSecurityToken } from '../utils/cardSecurity';
import toast from 'react-hot-toast';

interface LoyaltyContextType {
  balance: number;
  points: number;
  tier: CardTier;
  transactions: Transaction[];
  cardDetails: {
    number: string;
    expiryMonth: string;
    expiryYear: string;
  };
  rechargeCard: (amount: number, paymentMethod: string) => Promise<void>;
  makePayment: (amount: number) => Promise<boolean>;
  getTransactionHistory: () => Transaction[];
  getRewards: () => any[];
}

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined);

export function LoyaltyProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState(0);
  const [points, setPoints] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [cardDetails] = useState(generateCardDetails());
  const [securityToken, setSecurityToken] = useState(generateSecurityToken());

  useEffect(() => {
    // Renouvellement périodique du token de sécurité
    const tokenInterval = setInterval(() => {
      setSecurityToken(generateSecurityToken());
    }, 1000 * 60 * 30); // 30 minutes

    return () => clearInterval(tokenInterval);
  }, []);

  const rechargeCard = async (amount: number, paymentMethod: string) => {
    const transaction = createTransaction('RECHARGE', amount, paymentMethod);
    
    try {
      // Simulation du processus de paiement
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setBalance(prev => prev + amount);
      setPoints(prev => prev + transaction.points!);
      
      setTransactions(prev => [
        { ...transaction, status: 'COMPLETED' },
        ...prev
      ]);
      
      toast.success(`Carte rechargée de ${amount.toLocaleString()} FCFA`);
    } catch (error) {
      setTransactions(prev => [
        { ...transaction, status: 'FAILED' },
        ...prev
      ]);
      throw error;
    }
  };

  const makePayment = async (amount: number): Promise<boolean> => {
    const securityCheck = validateCardOperation(
      cardDetails.number,
      amount,
      balance
    );

    if (!securityCheck.isValid) {
      toast.error(securityCheck.error);
      return false;
    }

    const transaction = createTransaction('PAYMENT', amount);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setBalance(prev => prev - amount);
      setPoints(prev => prev + transaction.points!);
      
      setTransactions(prev => [
        { ...transaction, status: 'COMPLETED' },
        ...prev
      ]);
      
      return true;
    } catch (error) {
      setTransactions(prev => [
        { ...transaction, status: 'FAILED' },
        ...prev
      ]);
      return false;
    }
  };

  const getTransactionHistory = () => {
    return transactions;
  };

  const getRewards = () => {
    const currentTier = Object.entries(CARD_TIERS).find(
      ([_, details]) => points >= details.minimumPoints
    )?.[0] as CardTier;

    return CARD_TIERS[currentTier].benefits;
  };

  return (
    <LoyaltyContext.Provider
      value={{
        balance,
        points,
        tier: cardDetails.tier,
        transactions,
        cardDetails: {
          number: cardDetails.number,
          expiryMonth: cardDetails.expiryMonth,
          expiryYear: cardDetails.expiryYear
        },
        rechargeCard,
        makePayment,
        getTransactionHistory,
        getRewards
      }}
    >
      {children}
    </LoyaltyContext.Provider>
  );
}

export function useLoyalty() {
  const context = useContext(LoyaltyContext);
  if (context === undefined) {
    throw new Error('useLoyalty must be used within a LoyaltyProvider');
  }
  return context;
}