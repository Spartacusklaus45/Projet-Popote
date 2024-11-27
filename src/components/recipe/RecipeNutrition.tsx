import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Heart, Brain, Flame } from 'lucide-react';

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

interface RecipeNutritionProps {
  nutrition: NutritionInfo;
  servings: number;
}

export default function RecipeNutrition({ nutrition, servings }: RecipeNutritionProps) {
  const calculatePerServing = (value: number) => {
    return Math.round((value / servings) * 10) / 10;
  };

  const scoreColors = {
    'A': 'bg-green-100 text-green-700',
    'B': 'bg-lime-100 text-lime-700',
    'C': 'bg-yellow-100 text-yellow-700',
    'D': 'bg-orange-100 text-orange-700',
    'E': 'bg-red-100 text-red-700'
  };

  return (
    <div className="space-y-6">
      {/* Score global */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Activity className="h-6 w-6 text-gray-400 mr-2" />
          <span className="font-medium text-gray-900">Score nutritionnel</span>
        </div>
        <span className={`px-3 py-1 rounded-full font-medium ${scoreColors[nutrition.score]}`}>
          {nutrition.score}
        </span>
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

      {/* Note d'information */}
      <p className="text-sm text-gray-500 italic">
        * Les valeurs sont calculées par portion et peuvent varier selon la préparation
      </p>
    </div>
  );
}