import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChefHat, 
  Utensils, 
  CookingPot, 
  Flame, 
  ShoppingBag,
  AlertCircle 
} from 'lucide-react';

interface Equipment {
  name: string;
  icon: 'chef' | 'utensils' | 'pot' | 'flame';
  required: boolean;
  alternative?: string;
}

interface RecipeEquipmentProps {
  equipment: Equipment[];
  onAddToCart?: (item: string) => void;
}

const icons = {
  chef: ChefHat,
  utensils: Utensils,
  pot: CookingPot,
  flame: Flame
};

export default function RecipeEquipment({ equipment, onAddToCart }: RecipeEquipmentProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
        <Utensils className="h-5 w-5 text-orange-500 mr-2" />
        Équipement nécessaire
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {equipment.map((item, index) => {
          const Icon = icons[item.icon];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Icon className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="ml-3">
                    <span className="font-medium text-gray-900">{item.name}</span>
                    {item.required && (
                      <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                        Requis
                      </span>
                    )}
                  </div>
                </div>
                {onAddToCart && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onAddToCart(item.name)}
                    className="p-2 text-orange-500 hover:bg-orange-100 rounded-lg transition-colors"
                  >
                    <ShoppingBag className="h-5 w-5" />
                  </motion.button>
                )}
              </div>
              {item.alternative && (
                <div className="mt-2 flex items-start text-sm">
                  <AlertCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">
                    Alternative : {item.alternative}
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Note */}
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-600">
          * Les équipements marqués comme "Requis" sont essentiels pour réaliser cette recette.
          Les autres peuvent être remplacés par des alternatives.
        </p>
      </div>
    </div>
  );
}