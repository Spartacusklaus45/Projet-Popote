import React, { useState } from 'react';
import { ShoppingBag, Plus, Minus } from 'lucide-react';

interface Ingredient {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  image: string;
  price: number;
}

interface IngredientListProps {
  ingredients: Ingredient[];
  servings: number;
}

export default function IngredientList({ ingredients, servings }: IngredientListProps) {
  const [currentServings, setCurrentServings] = useState(servings);

  const updateServings = (delta: number) => {
    const newServings = Math.max(1, currentServings + delta);
    setCurrentServings(newServings);
  };

  const calculateQuantity = (baseQuantity: number) => {
    return (baseQuantity * currentServings / servings).toFixed(1);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <ShoppingBag className="h-5 w-5 mr-2 text-gray-500" />
        Ingrédients
      </h3>

      <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
        <span className="text-gray-600">Nombre de portions</span>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => updateServings(-1)}
            className="p-1 rounded-full hover:bg-gray-200"
          >
            <Minus className="h-4 w-4 text-gray-600" />
          </button>
          <span className="font-medium text-gray-900">{currentServings}</span>
          <button
            onClick={() => updateServings(1)}
            className="p-1 rounded-full hover:bg-gray-200"
          >
            <Plus className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {ingredients.map((ingredient) => (
          <div
            key={ingredient.id}
            className="flex items-center p-2 hover:bg-gray-50 rounded-lg"
          >
            <img
              src={ingredient.image}
              alt={ingredient.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="ml-4 flex-grow">
              <div className="font-medium text-gray-900">{ingredient.name}</div>
              <div className="text-sm text-gray-600">
                {calculateQuantity(ingredient.quantity)} {ingredient.unit}
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-gray-900">
                {(ingredient.price * currentServings / servings).toFixed(0)} FCFA
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}