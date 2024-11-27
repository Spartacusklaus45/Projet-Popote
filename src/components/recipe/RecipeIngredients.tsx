import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Plus, Minus } from 'lucide-react';

interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  image: string;
  price: number;
}

interface RecipeIngredientsProps {
  ingredients: Ingredient[];
  baseServings: number;
  currentServings: number;
  onServingsChange: (servings: number) => void;
}

export default function RecipeIngredients({
  ingredients,
  baseServings,
  currentServings,
  onServingsChange
}: RecipeIngredientsProps) {
  const calculateQuantity = (quantity: number) => {
    return (quantity * currentServings / baseServings).toFixed(1);
  };

  const calculateTotalPrice = () => {
    return ingredients.reduce((total, ing) => {
      return total + (ing.price * currentServings / baseServings);
    }, 0);
  };

  return (
    <div className="space-y-6">
      {/* Servings Control */}
      <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
        <span className="text-gray-900 font-medium">Nombre de portions</span>
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onServingsChange(Math.max(1, currentServings - 1))}
            className="p-1 rounded-full hover:bg-orange-100"
          >
            <Minus className="h-5 w-5 text-orange-500" />
          </motion.button>
          <span className="text-xl font-medium text-gray-900">{currentServings}</span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onServingsChange(currentServings + 1)}
            className="p-1 rounded-full hover:bg-orange-100"
          >
            <Plus className="h-5 w-5 text-orange-500" />
          </motion.button>
        </div>
      </div>

      {/* Ingredients List */}
      <div className="space-y-4">
        {ingredients.map((ingredient) => (
          <motion.div
            key={ingredient.id}
            whileHover={{ scale: 1.02 }}
            className="flex items-center p-4 bg-white rounded-lg shadow-sm"
          >
            <img
              src={ingredient.image}
              alt={ingredient.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="ml-4 flex-grow">
              <h3 className="font-medium text-gray-900">{ingredient.name}</h3>
              <div className="flex items-center justify-between mt-1">
                <span className="text-gray-600">
                  {calculateQuantity(ingredient.quantity)} {ingredient.unit}
                </span>
                <span className="text-orange-500 font-medium">
                  {Math.round(ingredient.price * currentServings / baseServings)} FCFA
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Total */}
      <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
        <div className="flex items-center">
          <ShoppingBag className="h-5 w-5 text-orange-500 mr-2" />
          <span className="font-medium text-gray-900">Total estimé</span>
        </div>
        <span className="text-xl font-bold text-orange-500">
          {calculateTotalPrice().toLocaleString()} FCFA
        </span>
      </div>
    </div>
  );
}