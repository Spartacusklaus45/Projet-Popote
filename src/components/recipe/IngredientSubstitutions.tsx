import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, AlertCircle } from 'lucide-react';

interface Substitution {
  original: {
    name: string;
    quantity: number;
    unit: string;
    image: string;
  };
  alternatives: {
    name: string;
    quantity: number;
    unit: string;
    image: string;
    reason: string;
  }[];
}

interface IngredientSubstitutionsProps {
  substitutions: Substitution[];
  onSubstitute: (originalName: string, alternativeName: string) => void;
}

export default function IngredientSubstitutions({ 
  substitutions,
  onSubstitute
}: IngredientSubstitutionsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-3 bg-orange-50 rounded-lg p-4">
        <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
        <div>
          <h4 className="font-medium text-gray-900">Alternatives possibles</h4>
          <p className="text-sm text-gray-600">
            Ces ingrédients peuvent être remplacés tout en préservant le goût de la recette
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {substitutions.map((sub, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg p-6 shadow-sm"
          >
            {/* Original Ingredient */}
            <div className="flex items-center mb-4">
              <img
                src={sub.original.image}
                alt={sub.original.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="ml-4">
                <h3 className="font-medium text-gray-900">{sub.original.name}</h3>
                <p className="text-sm text-gray-600">
                  {sub.original.quantity} {sub.original.unit}
                </p>
              </div>
            </div>

            {/* Alternatives */}
            <div className="pl-8 space-y-4">
              {sub.alternatives.map((alt, altIndex) => (
                <div key={altIndex} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={alt.image}
                      alt={alt.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900">{alt.name}</h4>
                      <p className="text-sm text-gray-600">
                        {alt.quantity} {alt.unit}
                      </p>
                      <p className="text-xs text-orange-500">{alt.reason}</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSubstitute(sub.original.name, alt.name)}
                    className="flex items-center px-4 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Remplacer
                  </motion.button>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}