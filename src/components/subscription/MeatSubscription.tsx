import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Beef, 
  Bird, 
  Fish, 
  Carrot,
  Plus,
  Minus,
  Calendar,
  Check
} from 'lucide-react';

const meatOptions = [
  {
    id: 'beef',
    name: 'Bœuf',
    icon: Beef,
    price: 5000,
    unit: 'kg',
    description: 'Bœuf frais de qualité supérieure'
  },
  {
    id: 'chicken',
    name: 'Poulet',
    icon: Bird,
    price: 3500,
    unit: 'kg',
    description: 'Poulet fermier élevé en plein air'
  },
  {
    id: 'fish',
    name: 'Poisson',
    icon: Fish,
    price: 4000,
    unit: 'kg',
    description: 'Poisson frais du jour'
  },
  {
    id: 'rabbit',
    name: 'Lapin',
    icon: Carrot,
    price: 4500,
    unit: 'kg',
    description: 'Lapin fermier'
  }
];

const frequencies = [
  { id: 'weekly', label: 'Hebdomadaire', value: 1 },
  { id: 'biweekly', label: 'Bi-mensuel', value: 2 },
  { id: 'monthly', label: 'Mensuel', value: 4 }
];

export default function MeatSubscription({ onSubscribe }) {
  const [selections, setSelections] = useState({});
  const [frequency, setFrequency] = useState('weekly');

  const updateQuantity = (id, delta) => {
    setSelections(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta)
    }));
  };

  const calculateTotal = () => {
    return Object.entries(selections).reduce((total, [id, quantity]) => {
      const option = meatOptions.find(opt => opt.id === id);
      return total + (option.price * quantity);
    }, 0);
  };

  const handleSubscribe = () => {
    const plan = {
      type: 'meat',
      selections,
      frequency,
      total: calculateTotal()
    };
    onSubscribe(plan);
  };

  return (
    <div className="space-y-8">
      {/* Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {meatOptions.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <option.icon className="h-6 w-6 text-orange-500 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {option.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {option.price.toLocaleString()} FCFA/{option.unit}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => updateQuantity(option.id, -1)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  disabled={!selections[option.id]}
                >
                  <Minus className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
                <span className="w-8 text-center font-medium text-gray-900 dark:text-gray-100">
                  {selections[option.id] || 0}
                </span>
                <button
                  onClick={() => updateQuantity(option.id, 1)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Plus className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Frequency Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Fréquence de livraison
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {frequencies.map((freq) => (
            <button
              key={freq.id}
              onClick={() => setFrequency(freq.id)}
              className={`p-4 rounded-lg border-2 transition-colors ${
                frequency === freq.id
                  ? 'border-orange-500 bg-orange-50 dark:border-orange-400 dark:bg-orange-900/30'
                  : 'border-gray-200 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {freq.label}
                  </span>
                </div>
                {frequency === freq.id && (
                  <Check className="h-5 w-5 text-orange-500 dark:text-orange-400" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Summary and Subscribe */}
      {calculateTotal() > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Total estimé
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Par livraison
              </p>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {calculateTotal().toLocaleString()} FCFA
            </div>
          </div>
          <motion.button
            onClick={handleSubscribe}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-6 bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-600 dark:to-pink-600 text-white rounded-lg font-medium hover:from-orange-600 hover:to-pink-600 dark:hover:from-orange-700 dark:hover:to-pink-700 transition-colors"
          >
            S'abonner maintenant
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}