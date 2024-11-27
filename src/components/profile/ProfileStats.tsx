import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ChefHat, Heart, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useRecipes } from '../../contexts/RecipeContext';
import { useLoyalty } from '../../contexts/LoyaltyContext';
import { useOrders } from '../../contexts/OrderContext';

export default function ProfileStats() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { userRecipes, favoriteRecipes } = useRecipes();
  const { points } = useLoyalty();
  const { orders } = useOrders();

  const stats = [
    {
      label: "Commandes passées",
      value: orders.length,
      icon: ShoppingBag,
      color: "orange",
      onClick: () => navigate('/profile/orders')
    },
    {
      label: "Recettes créées",
      value: userRecipes.length,
      icon: ChefHat,
      color: "blue",
      onClick: () => navigate('/profile/recipes')
    },
    {
      label: "Recettes favorites",
      value: favoriteRecipes.length,
      icon: Heart,
      color: "red",
      onClick: () => navigate('/recipes')
    },
    {
      label: "Points fidélité",
      value: points,
      icon: Award,
      color: "green",
      onClick: () => navigate('/profile/loyalty')
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      orange: 'border-orange-500 dark:border-orange-400 bg-orange-50 dark:bg-orange-900/20',
      blue: 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20',
      red: 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/20',
      green: 'border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/20'
    };
    return colorMap[color] || colorMap.orange;
  };

  const getIconColorClass = (color: string) => {
    const colorMap = {
      orange: 'text-orange-500 dark:text-orange-400',
      blue: 'text-blue-500 dark:text-blue-400',
      red: 'text-red-500 dark:text-red-400',
      green: 'text-green-500 dark:text-green-400'
    };
    return colorMap[color] || colorMap.orange;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={stat.onClick}
          className={`flex flex-col items-center p-6 rounded-xl border-l-4 cursor-pointer transition-colors duration-300 ${getColorClasses(stat.color)} bg-white dark:bg-gray-800`}
        >
          <stat.icon className={`h-8 w-8 mb-2 ${getIconColorClass(stat.color)}`} />
          <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {stat.value.toLocaleString()}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {stat.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}