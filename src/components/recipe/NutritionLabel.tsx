import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Heart, Brain, Flame, Info } from 'lucide-react';

interface NutritionInfo {
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  fiber: number;
  sugar: number;
  sodium: number;
  score: 'A' | 'B' | 'C' | 'D' | 'E';
}

interface NutritionLabelProps {
  nutrition: NutritionInfo;
  servings: number;
}

export default function NutritionLabel({ nutrition, servings }: NutritionLabelProps) {
  const calculatePerServing = (value: number) => {
    return (value / servings).toFixed(1);
  };

  const scoreColors = {
    'A': 'bg-green-100 text-green-700',
    'B': 'bg-lime-100 text-lime-700',
    'C': 'bg-yellow-100 text-yellow-700',
    'D': 'bg-orange-100 text-orange-700',
    'E': 'bg-red-100 text-red-700'
  };

  const scoreDescriptions = {
    'A': 'Excellent équilibre nutritionnel',
    'B': 'Bon équilibre nutritionnel',
    'C': 'Équilibre nutritionnel moyen',
    'D': 'Équilibre nutritionnel à améliorer',
    'E': 'Équilibre nutritionnel faible'
  };

  return (
    <div className="space-y-8">
      {/* Score nutritionnel */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Activity className="h-6 w-6 text-gray-400 mr-2" />
          <span className="font-medium text-gray-900">Score nutritionnel</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full font-medium ${scoreColors[nutrition.score]}`}>
            {nutrition.score}
          </span>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group"
          >
            <Info className="h-5 w-5 text-gray-400 cursor-help" />
            <div className="absolute right-0 w-48 p-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              {scoreDescriptions[nutrition.score]}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Macronutriments */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 bg-orange-50 rounded-lg"
        >
          <div className="flex items-center mb-2">
            <Flame className="h-5 w-5 text-orange-500 mr-2" />
            <span className="text-sm font-medium text-gray-900">Calories</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {calculatePerServing(nutrition.calories)} kcal
          </p>
          <p className="text-sm text-gray-600">par portion</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 bg-red-50 rounded-lg"
        >
          <div className="flex items-center mb-2">
            <Heart className="h-5 w-5 text-red-500 mr-2" />
            <span className="text-sm font-medium text-gray-900">Protéines</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {calculatePerServing(nutrition.proteins)}g
          </p>
          <p className="text-sm text-gray-600">par portion</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 bg-yellow-50 rounded-lg"
        >
          <div className="flex items-center mb-2">
            <Brain className="h-5 w-5 text-yellow-500 mr-2" />
            <span className="text-sm font-medium text-gray-900">Glucides</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {calculatePerServing(nutrition.carbs)}g
          </p>
          <p className="text-sm text-gray-600">par portion</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 bg-blue-50 rounded-lg"
        >
          <div className="flex items-center mb-2">
            <Activity className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-sm font-medium text-gray-900">Lipides</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {calculatePerServing(nutrition.fats)}g
          </p>
          <p className="text-sm text-gray-600">par portion</p>
        </motion.div>
      </div>

      {/* Détails supplémentaires */}
      <div className="space-y-4">
        <div className="flex justify-between items-center py-2 border-b">
          <span className="text-gray-600">Fibres</span>
          <span className="font-medium text-gray-900">{calculatePerServing(nutrition.fiber)}g</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b">
          <span className="text-gray-600">Sucres</span>
          <span className="font-medium text-gray-900">{calculatePerServing(nutrition.sugar)}g</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b">
          <span className="text-gray-600">Sodium</span>
          <span className="font-medium text-gray-900">{calculatePerServing(nutrition.sodium)}mg</span>
        </div>
      </div>

      {/* Recommandations */}
      <div className="bg-orange-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Recommandations</h4>
        <ul className="space-y-2">
          <li className="flex items-start text-sm text-gray-600">
            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2" />
            Consommez cette recette dans le cadre d'une alimentation équilibrée
          </li>
          <li className="flex items-start text-sm text-gray-600">
            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2" />
            Les valeurs nutritionnelles sont données à titre indicatif
          </li>
        </ul>
      </div>
    </div>
  );
}