import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  image: string;
  price: number;
}

interface IngredientListProps {
  ingredients: Ingredient[];
  baseServings: number;
  currentServings: number;
}

export default function IngredientList({ 
  ingredients, 
  baseServings, 
  currentServings 
}: IngredientListProps) {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ingredients.map((ingredient) => (
          <motion.div
            key={ingredient.id}
            whileHover={{ scale: 1.02 }}
            className="flex items-center p-4 bg-gray-50 rounded-lg"
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

      <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
        <div className="flex items-center">
          <ShoppingBag className="h-5 w-5 text-orange-500 mr-2" />
          <span className="font-medium text-gray-900">Total estimé</span>
        </div>
        <span className="text-lg font-bold text-orange-500">
          {calculateTotalPrice().toLocaleString()} FCFA
        </span>
      </div>
    </div>
  );
}