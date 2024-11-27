import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Star, Heart, Sparkles } from 'lucide-react';
import { Recipe } from '../../types/recipe';

interface RecommendationCardProps {
  recipe: Recipe;
}

export default function RecommendationCard({ recipe }: RecommendationCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
        {recipe.isRecommended && (
          <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <Sparkles className="h-4 w-4 mr-1" />
            Recommandé pour vous
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {recipe.title}
        </h3>

        <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {recipe.duration}
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {recipe.servings} pers.
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1 text-yellow-400" />
            {recipe.rating}
          </div>
        </div>

        {recipe.matchingPreferences && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Correspond à vos préférences :
            </h4>
            <div className="flex flex-wrap gap-2">
              {recipe.matchingPreferences.map((pref, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                >
                  {pref}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <button className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors">
            Voir la recette
          </button>
          <button className="p-2 text-gray-400 hover:text-red-500 rounded-lg border border-gray-200">
            <Heart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}