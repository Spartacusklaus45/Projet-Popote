import { customAlphabet } from 'nanoid';

// Génération sécurisée de numéros de carte
const generateSecureNumber = customAlphabet('0123456789', 16);
const generateCVC = customAlphabet('0123456789', 3);

export type CardTier = 'STANDARD' | 'PREMIUM' | 'GOLD' | 'PLATINUM';

interface CardColors {
  from: string;
  via?: string;
  to: string;
  text: string;
}

export const CARD_TIERS: Record<CardTier, {
  name: string;
  colors: CardColors;
  minimumPoints: number;
  benefits: string[];
  multiplier: number;
}> = {
  STANDARD: {
    name: 'Standard',
    colors: {
      from: 'from-gray-400',
      to: 'to-gray-600',
      text: 'text-white'
    },
    minimumPoints: 0,
    benefits: [
      'Cumul de points basique (1 point = 100 FCFA)',
      'Accès aux offres standards',
      'Support client standard'
    ],
    multiplier: 1
  },
  PREMIUM: {
    name: 'Premium',
    colors: {
      from: 'from-orange-400',
      via: 'via-orange-500',
      to: 'to-orange-600',
      text: 'text-white'
    },
    minimumPoints: 5000,
    benefits: [
      'Points x1.5',
      'Livraison prioritaire',
      'Support client prioritaire',
      'Accès aux ventes privées'
    ],
    multiplier: 1.5
  },
  GOLD: {
    name: 'Gold',
    colors: {
      from: 'from-yellow-400',
      via: 'via-amber-500',
      to: 'to-yellow-600',
      text: 'text-black'
    },
    minimumPoints: 15000,
    benefits: [
      'Points x2',
      'Livraison gratuite',
      'Support client VIP',
      'Accès aux événements exclusifs',
      'Cadeaux d\'anniversaire'
    ],
    multiplier: 2
  },
  PLATINUM: {
    name: 'Platinum',
    colors: {
      from: 'from-slate-700',
      via: 'via-slate-800',
      to: 'to-slate-900',
      text: 'text-white'
    },
    minimumPoints: 50000,
    benefits: [
      'Points x3',
      'Conciergerie dédiée',
      'Accès prioritaire aux nouvelles fonctionnalités',
      'Événements sur mesure',
      'Cadeaux exclusifs',
      'Service de chef à domicile'
    ],
    multiplier: 3
  }
};

export interface CardDetails {
  number: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
  tier: CardTier;
}

export const generateCardDetails = (): CardDetails => {
  const now = new Date();
  const expiryDate = new Date(now.setFullYear(now.getFullYear() + 3));

  return {
    number: generateSecureNumber(),
    cvc: generateCVC(),
    expiryMonth: String(expiryDate.getMonth() + 1).padStart(2, '0'),
    expiryYear: String(expiryDate.getFullYear()).slice(-2),
    tier: 'STANDARD'
  };
};

export const formatCardNumber = (number: string): string => {
  return number.replace(/(\d{4})/g, '$1 ').trim();
};

export const maskCardNumber = (number: string): string => {
  const last4 = number.slice(-4);
  return `•••• •••• •••• ${last4}`;
};

export const calculateNextTier = (points: number): {
  nextTier: CardTier | null;
  pointsNeeded: number;
} => {
  const tiers = Object.entries(CARD_TIERS).sort(
    (a, b) => a[1].minimumPoints - b[1].minimumPoints
  );

  for (let i = 0; i < tiers.length; i++) {
    const [tier, details] = tiers[i];
    if (points < details.minimumPoints) {
      return {
        nextTier: tier as CardTier,
        pointsNeeded: details.minimumPoints - points
      };
    }
  }

  return { nextTier: null, pointsNeeded: 0 };
};

export const getCurrentTier = (points: number): CardTier => {
  const tiers = Object.entries(CARD_TIERS).sort(
    (a, b) => b[1].minimumPoints - a[1].minimumPoints
  );

  for (const [tier, details] of tiers) {
    if (points >= details.minimumPoints) {
      return tier as CardTier;
    }
  }

  return 'STANDARD';
};