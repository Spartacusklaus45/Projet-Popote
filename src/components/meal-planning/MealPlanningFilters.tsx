import React from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  DollarSign, 
  Utensils, 
  Heart,
  Leaf,
  Filter
} from 'lucide-react';

interface MealPlanningFiltersProps {
  className?: string;
}

export default function MealPlanningFilters({ className = '' }: MealPlanningFiltersProps) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className={`bg-white rounded-xl shadow-lg p-6 ${className}`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filtres</h3>
        <Filter className="h-5 w-5 text-gray-500 hover:text-orange-500 transition-colors" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Temps de préparation */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500 transition-colors hover:text-orange-500" />
              <span>Temps de préparation</span>
            </div>
          </label>
          <motion.select
            className="w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500 transition-colors"
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <option value="">Tous</option>
            <option value="15">15 minutes max</option>
            <option value="30">30 minutes max</option>
            <option value="45">45 minutes max</option>
            <option value="60">1 heure max</option>
          </motion.select>
        </motion.div>

        {/* Budget */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-gray-500 transition-colors hover:text-orange-500" />
              <span>Budget par repas</span>
            </div>
          </label>
          <motion.select
            className="w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500 transition-colors"
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <option value="">Tous</option>
            <option value="5000">Moins de 5 000 FCFA</option>
            <option value="10000">Moins de 10 000 FCFA</option>
            <option value="15000">Moins de 15 000 FCFA</option>
          </motion.select>
        </motion.div>

        {/* Type de cuisine */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center space-x-2">
              <Utensils className="h-4 w-4 text-gray-500 transition-colors hover:text-orange-500" />
              <span>Type de cuisine</span>
            </div>
          </label>
          <motion.select
            className="w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500 transition-colors"
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <option value="">Tous</option>
            <option value="ivoirienne">Cuisine ivoirienne</option>
            <option value="africaine">Cuisine africaine</option>
            <option value="internationale">Cuisine internationale</option>
          </motion.select>
        </motion.div>

        {/* Préférences */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4 text-gray-500 transition-colors hover:text-orange-500" />
              <span>Préférences</span>
            </div>
          </label>
          <motion.select
            className="w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500 transition-colors"
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <option value="">Tous</option>
            <option value="vegetarian">Végétarien</option>
            <option value="vegan">Végétalien</option>
            <option value="gluten-free">Sans gluten</option>
          </motion.select>
        </motion.div>

        {/* Score nutritionnel */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center space-x-2">
              <Leaf className="h-4 w-4 text-gray-500 transition-colors hover:text-orange-500" />
              <span>Score nutritionnel minimum</span>
            </div>
          </label>
          <motion.select
            className="w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500 transition-colors"
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <option value="">Tous</option>
            <option value="A">A</option>
            <option value="B">B ou mieux</option>
            <option value="C">C ou mieux</option>
          </motion.select>
        </motion.div>
      </div>

      <div className="flex justify-end mt-6">
        <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
          Appliquer les filtres
        </button>
      </div>
    </motion.div>
  );
}
