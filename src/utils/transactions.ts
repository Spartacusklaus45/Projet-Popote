import { customAlphabet } from 'nanoid';

const generateTransactionId = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 12);

export interface Transaction {
  id: string;
  type: 'RECHARGE' | 'PAYMENT' | 'REWARD' | 'REFUND';
  amount: number;
  points?: number;
  date: Date;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  paymentMethod?: string;
  description: string;
}

export const createTransaction = (
  type: Transaction['type'],
  amount: number,
  paymentMethod?: string
): Transaction => {
  return {
    id: generateTransactionId(),
    type,
    amount,
    date: new Date(),
    status: 'PENDING',
    paymentMethod,
    description: getTransactionDescription(type, amount),
    points: calculatePoints(type, amount)
  };
};

const getTransactionDescription = (type: Transaction['type'], amount: number): string => {
  switch (type) {
    case 'RECHARGE':
      return `Rechargement de ${amount.toLocaleString()} FCFA`;
    case 'PAYMENT':
      return `Paiement de ${amount.toLocaleString()} FCFA`;
    case 'REWARD':
      return `Récompense de ${amount.toLocaleString()} FCFA`;
    case 'REFUND':
      return `Remboursement de ${amount.toLocaleString()} FCFA`;
    default:
      return `Transaction de ${amount.toLocaleString()} FCFA`;
  }
};

const calculatePoints = (type: Transaction['type'], amount: number): number => {
  switch (type) {
    case 'PAYMENT':
      return Math.floor(amount / 100); // 1 point pour 100 FCFA
    case 'RECHARGE':
      return Math.floor(amount / 200); // 1 point pour 200 FCFA de recharge
    default:
      return 0;
  }
};