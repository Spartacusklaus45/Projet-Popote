import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, Users, Star, ChefHat, Utensils } from 'lucide-react';
import { useRecipes } from '../../contexts/RecipeContext';
import { Recipe } from '../../types/recipe';

interface RecipeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRecipe: (recipe: Recipe) => void;
}

export default function RecipeSelector({ isOpen, onClose, onSelectRecipe }: RecipeSelectorProps) {
  const { recipes } = useRecipes();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Sélectionner une recette
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher une recette..."
              className="pl-10 w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRecipes.map((recipe) => (
              <button
                key={recipe.id}
                onClick={() => onSelectRecipe(recipe)}
                className="flex items-start p-4 rounded-lg border hover:border-orange-500 hover:bg-orange-50 transition-colors text-left"
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">{recipe.title}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
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
                  <div className="flex items-center mt-2">
                    <ChefHat className="h-4 w-4 mr-1 text-gray-400" />
                    <span className="text-sm text-gray-500">{recipe.difficulty}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}