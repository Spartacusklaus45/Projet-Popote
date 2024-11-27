import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter, Search } from 'lucide-react';

interface RecipeHeaderProps {
  onCreateRecipe: () => void;
  onSearch: (query: string) => void;
  onFilter: () => void;
}

export default function RecipeHeader({ onCreateRecipe, onSearch, onFilter }: RecipeHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Mes recettes</h2>
        <p className="text-gray-600">
          Gérez vos créations culinaires et gagnez des récompenses
        </p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une recette..."
            onChange={(e) => onSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onFilter}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
        >
          <Filter className="h-5 w-5" />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCreateRecipe}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600 shadow-lg"
        >
          <Plus className="h-5 w-5 mr-2" />
          Créer une recette
        </motion.button>
      </div>
    </div>
  );
}