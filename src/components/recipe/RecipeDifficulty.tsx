import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Clock, AlertCircle } from 'lucide-react';

interface RecipeDifficultyProps {
  difficulty: string;
  duration: string;
  tips: string[];
}

export default function RecipeDifficulty({ difficulty, duration, tips }: RecipeDifficultyProps) {
  const getDifficultyColor = () => {
    switch (difficulty.toLowerCase()) {
      case 'facile':
        return 'bg-green-100 text-green-700';
      case 'moyen':
        return 'bg-orange-100 text-orange-700';
      case 'difficile':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {/* Niveau de difficulté */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <ChefHat className="h-6 w-6 text-orange-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">
              Niveau de difficulté
            </h3>
          </div>
          <div className={`inline-block px-4 py-2 rounded-full ${getDifficultyColor()}`}>
            {difficulty}
          </div>
        </div>

        {/* Temps de préparation */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <Clock className="h-6 w-6 text-orange-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">
              Temps de préparation
            </h3>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {duration}
          </div>
        </div>
      </div>

      {/* Conseils */}
      {tips.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-orange-50 rounded-xl p-6"
        >
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 text-orange-500 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Conseils pour réussir
              </h3>
              <ul className="space-y-3">
                {tips.map((tip, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2" />
                    <span className="text-gray-600">{tip}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}