import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ChefHat, Clock, ThumbsUp } from 'lucide-react';

interface RecipeTipsProps {
  tips: string[];
  category: string;
}

export default function RecipeTips({ tips, category }: RecipeTipsProps) {
  return (
    <div className="space-y-6">
      <div className="bg-orange-50 rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <ChefHat className="h-6 w-6 text-orange-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Conseils du chef
            </h3>
            <div className="space-y-4">
              {tips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2" />
                  <p className="text-gray-600">{tip}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Informations supplémentaires */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-blue-500" />
            <div>
              <h4 className="font-medium text-gray-900">Préparation</h4>
              <p className="text-sm text-gray-600">
                Préparez vos ingrédients à l'avance
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <ThumbsUp className="h-5 w-5 text-green-500" />
            <div>
              <h4 className="font-medium text-gray-900">Conservation</h4>
              <p className="text-sm text-gray-600">
                Se conserve 2 jours au réfrigérateur
              </p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-purple-500" />
            <div>
              <h4 className="font-medium text-gray-900">Catégorie</h4>
              <p className="text-sm text-gray-600">{category}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}