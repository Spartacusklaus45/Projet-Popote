import React from 'react';
import { 
  Activity, 
  TrendingUp, 
  TrendingDown,
  Leaf,
  Flame,
  Apple,
  Beef,
  Fish
} from 'lucide-react';

interface NutritionalStats {
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  nutritionScore: string;
  totalPrepTime: number;
  totalRecipes: number;
  trends: {
    calories: 'up' | 'down' | 'stable';
    proteins: 'up' | 'down' | 'stable';
    carbs: 'up' | 'down' | 'stable';
    fats: 'up' | 'down' | 'stable';
  };
}

interface MealPlanningStatsProps {
  stats: NutritionalStats;
}

export default function MealPlanningStats({ stats }: MealPlanningStatsProps) {
  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500 dark:text-green-400" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500 dark:text-red-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Statistiques nutritionnelles
        </h3>
        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
          <Activity className="h-5 w-5 text-green-500 dark:text-green-400" />
        </div>
      </div>

      <div className="space-y-6">
        {/* Macronutriments */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Flame className="h-5 w-5 text-orange-500 dark:text-orange-400 mr-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Calories</span>
              </div>
              {getTrendIcon(stats.trends.calories)}
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {stats.calories} kcal
            </p>
          </div>

          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Beef className="h-5 w-5 text-red-500 dark:text-red-400 mr-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Protéines</span>
              </div>
              {getTrendIcon(stats.trends.proteins)}
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {stats.proteins}g
            </p>
          </div>

          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Apple className="h-5 w-5 text-yellow-500 dark:text-yellow-400 mr-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Glucides</span>
              </div>
              {getTrendIcon(stats.trends.carbs)}
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {stats.carbs}g
            </p>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Fish className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Lipides</span>
              </div>
              {getTrendIcon(stats.trends.fats)}
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {stats.fats}g
            </p>
          </div>
        </div>

        {/* Score nutritionnel */}
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Leaf className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Score nutritionnel</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {stats.nutritionScore}
            </p>
            <div className="text-sm text-green-600 dark:text-green-400">
              Excellent équilibre
            </div>
          </div>
        </div>

        {/* Recommandations */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            Recommandations
          </h4>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-center">
              <div className="w-1.5 h-1.5 bg-green-500 dark:bg-green-400 rounded-full mr-2" />
              Augmentez légèrement l'apport en protéines
            </li>
            <li className="flex items-center">
              <div className="w-1.5 h-1.5 bg-green-500 dark:bg-green-400 rounded-full mr-2" />
              Maintenez ce niveau de glucides
            </li>
            <li className="flex items-center">
              <div className="w-1.5 h-1.5 bg-green-500 dark:bg-green-400 rounded-full mr-2" />
              Réduisez légèrement les lipides
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}