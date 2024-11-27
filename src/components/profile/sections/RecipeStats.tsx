import React from 'react';
import { motion } from 'framer-motion';
import { Star, TrendingUp, Award, DollarSign } from 'lucide-react';
import { useRecipeStats } from '../../../contexts/RecipeStatsContext';

export default function RecipeStats() {
  const { stats } = useRecipeStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-2">
          <Award className="h-8 w-8 text-orange-500" />
          <span className="text-sm text-orange-600">Total</span>
        </div>
        <p className="text-3xl font-bold text-gray-900">{stats.totalRecipes}</p>
        <p className="text-gray-600">Recettes créées</p>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-2">
          <DollarSign className="h-8 w-8 text-purple-500" />
          <span className="text-sm text-purple-600">Commandes</span>
        </div>
        <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
        <p className="text-gray-600">Commandes reçues</p>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-2">
          <DollarSign className="h-8 w-8 text-green-500" />
          <span className="text-sm text-green-600">Gains</span>
        </div>
        <p className="text-3xl font-bold text-gray-900">
          {stats.totalEarnings.toLocaleString()} FCFA
        </p>
        <p className="text-gray-600">Gains totaux</p>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-br from-yellow-100 to-amber-100 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-2">
          <Star className="h-8 w-8 text-yellow-500" />
          <span className="text-sm text-yellow-600">Note</span>
        </div>
        <p className="text-3xl font-bold text-gray-900">{stats.averageRating.toFixed(1)}</p>
        <p className="text-gray-600">Note moyenne</p>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-2">
          <TrendingUp className="h-8 w-8 text-blue-500" />
          <span className="text-sm text-blue-600">Croissance</span>
        </div>
        <p className="text-3xl font-bold text-gray-900">+{stats.monthlyGrowth.toFixed(0)}%</p>
        <p className="text-gray-600">Ce mois-ci</p>
      </motion.div>
    </div>
  );
}