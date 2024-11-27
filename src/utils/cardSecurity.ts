import { customAlphabet } from 'nanoid';

const generateSecureToken = customAlphabet('0123456789abcdef', 32);

interface SecurityCheck {
  isValid: boolean;
  error?: string;
}

export const validateCardOperation = (
  cardNumber: string,
  amount: number,
  currentBalance: number
): SecurityCheck => {
  // Vérification du format de la carte
  if (!isValidCardFormat(cardNumber)) {
    return {
      isValid: false,
      error: 'Format de carte invalide'
    };
  }

  // Vérification du solde disponible
  if (amount > currentBalance) {
    return {
      isValid: false,
      error: 'Solde insuffisant'
    };
  }

  // Vérification des limites de transaction
  if (!isWithinTransactionLimits(amount)) {
    return {
      isValid: false,
      error: 'Montant hors limites autorisées'
    };
  }

  return { isValid: true };
};

export const generateSecurityToken = (): string => {
  return generateSecureToken();
};

const isValidCardFormat = (cardNumber: string): boolean => {
  // Implémentation de l'algorithme de Luhn
  const digits = cardNumber.replace(/\D/g, '');
  
  if (digits.length !== 16) return false;
  
  let sum = 0;
  let isEven = false;
  
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

const isWithinTransactionLimits = (amount: number): boolean => {
  const MIN_TRANSACTION = 100;
  const MAX_TRANSACTION = 1000000;
  
  return amount >= MIN_TRANSACTION && amount <= MAX_TRANSACTION;
};

export const encryptCardData = (data: string): string => {
  // Simulation d'encryption - à remplacer par une vraie implémentation
  return Buffer.from(data).toString('base64');
};

export const decryptCardData = (encryptedData: string): string => {
  // Simulation de décryption - à remplacer par une vraie implémentation
  return Buffer.from(encryptedData, 'base64').toString();
};