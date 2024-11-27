import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Gift, ChevronRight, Calendar } from 'lucide-react';
import PopoteCard from '../components/card/PopoteCard';

export default function Loyalty() {
  const [points] = useState(1500);
  const [level] = useState('Silver');

  const rewards = [
    {
      points: 1000,
      title: "Livraison gratuite",
      description: "Sur votre prochaine commande"
    },
    {
      points: 2500,
      title: "-15% sur votre commande",
      description: "Valable une fois"
    },
    {
      points: 5000,
      title: "Box surprise",
      description: "Produits exclusifs"
    }
  ];

  const history = [
    {
      date: "15 Mars 2024",
      points: 250,
      type: "Commande #2024-001"
    },
    {
      date: "10 Mars 2024",
      points: 500,
      type: "Parrainage"
    }
  ];

  const handleRecharge = async () => {
    // Recharge logic will be handled by PopoteCard component
  };

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Programme Fidélité</h1>
          <p className="text-xl text-gray-600">
            Gagnez des points et profitez d'avantages exclusifs
          </p>
        </motion.div>

        {/* Popote Card */}
        <div className="mb-12">
          <PopoteCard showActions onRecharge={handleRecharge} />
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {rewards.map((reward, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <Gift className="h-8 w-8 text-orange-500" />
                <span className="text-sm font-medium text-orange-500">
                  {reward.points} points
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {reward.title}
              </h3>
              <p className="text-gray-600 mb-4">{reward.description}</p>
              <button
                disabled={points < reward.points}
                className={`w-full py-2 rounded-lg transition-colors ${
                  points >= reward.points
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Échanger
              </button>
            </motion.div>
          ))}
        </div>

        {/* History */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Historique</h2>
          <div className="space-y-4">
            {history.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{item.type}</p>
                    <p className="text-sm text-gray-500">{item.date}</p>
                  </div>
                </div>
                <span className="text-green-500 font-medium">+{item.points} points</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}