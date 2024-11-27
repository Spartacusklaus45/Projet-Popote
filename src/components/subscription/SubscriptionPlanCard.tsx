import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface SubscriptionPlanCardProps {
  plan: {
    id: string;
    name: string;
    price: number;
    frequency: string;
    features: string[];
    popular: boolean;
  };
  onSubscribe: () => void;
  delay?: number;
}

export default function SubscriptionPlanCard({ plan, onSubscribe, delay = 0 }: SubscriptionPlanCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm ${
        plan.popular ? 'ring-2 ring-orange-500 dark:ring-orange-400' : ''
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            Le plus populaire
          </span>
        </div>
      )}

      <div className="p-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {plan.name}
        </h3>
        <div className="flex items-baseline mb-6">
          <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            {plan.price.toLocaleString()}
          </span>
          <span className="text-gray-500 dark:text-gray-400 ml-2">
            FCFA/{plan.frequency}
          </span>
        </div>

        <ul className="space-y-4 mb-8">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-gray-600 dark:text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>

        <motion.button
          onClick={onSubscribe}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
            plan.popular
              ? 'bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-600 dark:to-pink-600 text-white hover:from-orange-600 hover:to-pink-600 dark:hover:from-orange-700 dark:hover:to-pink-700'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          S'abonner
        </motion.button>
      </div>
    </motion.div>
  );
}