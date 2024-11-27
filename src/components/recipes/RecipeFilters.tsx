import React from 'react';
import { motion } from 'framer-motion';

interface RecipeFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (difficulty: string) => void;
  className?: string;
}

export default function RecipeFilters({
  selectedCategory,
  setSelectedCategory,
  selectedDifficulty,
  setSelectedDifficulty,
  className = ''
}: RecipeFiltersProps) {
  const categories = [
    'Plat Ivoirien',
    'Sauce',
    'Accompagnement',
    'Plat Traditionnel'
  ];

  const difficulties = ['Facile', 'Moyen', 'Difficile'];

  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
      <div className="space-y-6">
        {/* Catégories */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Catégories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(
                  selectedCategory === category ? '' : category
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Niveau de difficulté */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Difficulté</h3>
          <div className="flex flex-wrap gap-2">
            {difficulties.map((difficulty) => (
              <motion.button
                key={difficulty}
                onClick={() => setSelectedDifficulty(
                  selectedDifficulty === difficulty ? '' : difficulty
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg ${
                  selectedDifficulty === difficulty
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {difficulty}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}