import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ChefHat, 
  Clock, 
  Users, 
  ArrowRight,
  Star 
} from 'lucide-react';

interface Variation {
  id: string;
  title: string;
  description: string;
  changes: string[];
  author: {
    name: string;
    avatar?: string;
  };
}

interface RecipeVariationsProps {
  variations: Variation[];
}

export default function RecipeVariations({ variations }: RecipeVariationsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Variations de la recette
        </h3>
        <Sparkles className="h-5 w-5 text-orange-500" />
      </div>

      <div className="space-y-4">
        {variations.map((variation, index) => (
          <motion.div
            key={variation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-medium text-gray-900">
                  {variation.title}
                </h4>
                <div className="flex items-center">
                  {variation.author.avatar ? (
                    <img
                      src={variation.author.avatar}
                      alt={variation.author.name}
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                      <ChefHat className="h-4 w-4 text-orange-500" />
                    </div>
                  )}
                  <span className="text-sm text-gray-600 ml-2">
                    par {variation.author.name}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-4">
                {variation.description}
              </p>

              <div className="bg-orange-50 rounded-lg p-4">
                <h5 className="text-sm font-medium text-gray-900 mb-2">
                  Modifications apportées :
                </h5>
                <ul className="space-y-2">
                  {variation.changes.map((change, idx) => (
                    <li key={idx} className="flex items-start text-gray-600">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2" />
                      {change}
                    </li>
                  ))}
                </ul>
              </div>

              <motion.button
                whileHover={{ x: 5 }}
                className="flex items-center text-orange-500 hover:text-orange-600 mt-4"
              >
                Voir cette variation
                <ArrowRight className="h-4 w-4 ml-1" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}