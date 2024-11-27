import React from 'react';
import { Activity, Heart, Leaf } from 'lucide-react';

interface NutritionInfo {
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  score: 'A' | 'B' | 'C' | 'D' | 'E';
}

interface NutritionLabelProps {
  nutritionInfo: NutritionInfo;
}

export default function NutritionLabel({ nutritionInfo }: NutritionLabelProps) {
  const scoreColors = {
    'A': 'bg-green-100 text-green-700',
    'B': 'bg-lime-100 text-lime-700',
    'C': 'bg-yellow-100 text-yellow-700',
    'D': 'bg-orange-100 text-orange-700',
    'E': 'bg-red-100 text-red-700'
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Activity className="h-5 w-5 mr-2 text-gray-500" />
        Valeurs nutritionnelles
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {nutritionInfo.calories}
          </div>
          <div className="text-sm text-gray-600">Calories</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {nutritionInfo.proteins}g
          </div>
          <div className="text-sm text-gray-600">Protéines</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {nutritionInfo.carbs}g
          </div>
          <div className="text-sm text-gray-600">Glucides</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {nutritionInfo.fats}g
          </div>
          <div className="text-sm text-gray-600">Lipides</div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <Heart className="h-5 w-5 text-red-500 mr-2" />
          <span className="text-sm text-gray-600">Score nutritionnel</span>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${scoreColors[nutritionInfo.score]}`}>
          {nutritionInfo.score}
        </div>
      </div>
    </div>
  );
}