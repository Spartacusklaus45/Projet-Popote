import React from 'react';
import { Star, TrendingUp, Award } from 'lucide-react';

interface RecipeRewardProps {
  engagement: number;
  earnings: number;
  totalOrders: number;
}

export default function RecipeReward({ engagement, earnings, totalOrders }: RecipeRewardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance de la recette</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Star className="h-6 w-6 text-orange-500" />
            <span className="text-sm text-orange-600">Engagement</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{engagement}%</p>
          <p className="text-sm text-gray-600">Taux d'engagement</p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-6 w-6 text-green-500" />
            <span className="text-sm text-green-600">Gains</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{earnings} FCFA</p>
          <p className="text-sm text-gray-600">Gains du mois</p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Award className="h-6 w-6 text-blue-500" />
            <span className="text-sm text-blue-600">Commandes</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
          <p className="text-sm text-gray-600">Commandes totales</p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Comment sont calculés les gains ?</h3>
        <p className="text-sm text-gray-600">
          Vous gagnez 0.05% sur chaque commande d'ingrédients de votre recette. Les gains sont calculés mensuellement et ajoutés à votre carte Popote.
        </p>
      </div>
    </div>
  );
}