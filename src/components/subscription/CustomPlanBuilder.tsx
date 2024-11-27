import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  Clock, 
  ChefHat,
  Utensils,
  Heart,
  Check
} from 'lucide-react';

const mealTypes = [
  { id: 'all', name: 'Tous types', icon: Utensils },
  { id: 'local', name: 'Cuisine locale', icon: Heart },
  { id: 'international', name: 'Cuisine internationale', icon: ChefHat }
];

const frequencies = [
  { id: 'weekly', label: 'Hebdomadaire', days: 7 },
  { id: 'biweekly', label: 'Bi-mensuel', days: 14 },
  { id: 'monthly', label: 'Mensuel', days: 30 }
];

export default function CustomPlanBuilder({ onSubscribe }) {
  const [config, setConfig] = useState({
    people: 2,
    mealsPerWeek: 3,
    mealType: 'all',
    frequency: 'weekly'
  });

  const calculatePrice = () => {
    const basePrice = 3500; // Prix par repas par personne
    const total = basePrice * config.people * config.mealsPerWeek;
    
    // Réductions basées sur la fréquence
    const discounts = {
      weekly: 1,
      biweekly: 0.95,
      monthly: 0.9
    };

    return Math.round(total * discounts[config.frequency]);
  };

  const handleSubscribe = () => {
    const plan = {
      type: 'custom',
      ...config,
      price: calculatePrice()
    };
    onSubscribe(plan);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Nombre de personnes */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
          <Users className="h-5 w-5 mr-2 text-orange-500 dark:text-orange-400" />
          Nombre de personnes
        </h3>
        <div className="flex space-x-4">
          {[1, 2, 4, 6].map((num) => (
            <button
              key={num}
              onClick={() => setConfig({ ...config, people: num })}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                config.people === num
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {num} {num === 1 ? 'personne' : 'personnes'}
            </button>
          ))}
        </div>
      </div>

      {/* Nombre de repas par semaine */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
          <Clock className="h-5 w-5 mr-2 text-orange-500 dark:text-orange-400" />
          Repas par semaine
        </h3>
        <div className="flex space-x-4">
          {[3, 4, 5, 7].map((num) => (
            <button
              key={num}
              onClick={() => setConfig({ ...config, mealsPerWeek: num })}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                config.mealsPerWeek === num
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {num} repas
            </button>
          ))}
        </div>
      </div>

      {/* Type de cuisine */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
          <ChefHat className="h-5 w-5 mr-2 text-orange-500 dark:text-orange-400" />
          Type de cuisine
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {mealTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setConfig({ ...config, mealType: type.id })}
              className={`p-4 rounded-lg border-2 transition-colors ${
                config.mealType === type.id
                  ? 'border-orange-500 bg-orange-50 dark:border-orange-400 dark:bg-orange-900/30'
                  : 'border-gray-200 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-800'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <type.icon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {type.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Fréquence */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-orange-500 dark:text-orange-400" />
          Fréquence de livraison
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {frequencies.map((freq) => (
            <button
              key={freq.id}
              onClick={() => setConfig({ ...config, frequency: freq.id })}
              className={`p-4 rounded-lg border-2 transition-colors ${
                config.frequency === freq.id
                  ? 'border-orange-500 bg-orange-50 dark:border-orange-400 dark:bg-orange-900/30'
                  : 'border-gray-200 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {freq.label}
                </span>
                {config.frequency === freq.id && (
                  <Check className="h-5 w-5 text-orange-500 dark:text-orange-400" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Summary and Subscribe */}
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
            {calculatePrice().toLocaleString()} FCFA
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
    </div>
  );
}