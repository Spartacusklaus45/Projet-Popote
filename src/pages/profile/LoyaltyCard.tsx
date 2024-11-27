import React from 'react';
import { motion } from 'framer-motion';
import PopoteCard from '../../components/card/PopoteCard';
import CardTransactionHistory from '../../components/card/CardTransactionHistory';
import { useLoyalty } from '../../contexts/LoyaltyContext';

export default function LoyaltyCard() {
  const { transactions } = useLoyalty();

  const handleRecharge = async () => {
    // Handled by PopoteCard component
  };

  return (
    <div className="space-y-8">
      {/* Carte Popote */}
      <PopoteCard showActions onRecharge={handleRecharge} />

      {/* Historique des transactions */}
      <CardTransactionHistory transactions={transactions} />
    </div>
  );
}