import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Plus } from 'lucide-react';

interface RecipeEmptyStateProps {
  onCreateRecipe: () => void;
}

export default function RecipeEmptyState({ onCreateRecipe }: RecipeEmptyStateProps) {
  return (
    <div className="text-center py-12">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="inline-flex p-4 bg-orange-100 rounded-full mb-4"
      >
        <ChefHat className="h-8 w-8 text-orange-500" />
      </motion.div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Créez votre première recette
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Partagez vos meilleures recettes avec la communauté et gagnez des récompenses !
        Chaque commande d'ingrédients vous rapporte 0.05% du montant.
      </p>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onCreateRecipe}
        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600 shadow-lg"
      >
        <Plus className="h-5 w-5 mr-2" />
        Créer une recette
      </motion.button>
    </div>
  );
}