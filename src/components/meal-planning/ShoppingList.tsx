import React, { useState } from 'react';
import { useMealPlanning } from '../../contexts/MealPlanningContext';
import { generateShoppingList, calculateTotalCost } from '../../utils/mealPlanningUtils';
import { ShoppingBag, Plus, Minus } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

export default function ShoppingList() {
  const { weeklyPlan } = useMealPlanning();
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const shoppingList = generateShoppingList(weeklyPlan);
  const totalCost = calculateTotalCost(shoppingList);

  const groupedItems = shoppingList.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as { [key: string]: typeof shoppingList });

  const handleQuantityChange = (itemKey: string, delta: number) => {
    setQuantities(prev => {
      const currentQty = prev[itemKey] || 1;
      const newQty = Math.max(1, currentQty + delta);
      return { ...prev, [itemKey]: newQty };
    });
  };

  const handleAddToCart = () => {
    shoppingList.forEach(item => {
      const quantity = quantities[`${item.name}-${item.unit}`] || 1;
      addToCart({
        id: `${item.name}-${item.unit}`,
        name: item.name,
        quantity: quantity,
        price: 1000, // Default price, should be fetched from a price service
        unit: item.unit
      });
    });
  };

  if (!shoppingList.length) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600">Votre liste de courses est vide</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <ShoppingBag className="h-6 w-6" />
          Liste de courses
        </h2>
        <span className="text-xl font-semibold text-primary">
          Total: {totalCost.toLocaleString()} FCFA
        </span>
      </div>

      {Object.entries(groupedItems).map(([category, items]) => (
        <div key={category} className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">{category}</h3>
          <div className="space-y-3">
            {items.map((item) => {
              const itemKey = `${item.name}-${item.unit}`;
              const quantity = quantities[itemKey] || 1;
              
              return (
                <div
                  key={itemKey}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button 
                        className="p-1 hover:bg-gray-200 rounded"
                        onClick={() => handleQuantityChange(itemKey, -1)}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 text-center">{quantity}</span>
                      <button 
                        className="p-1 hover:bg-gray-200 rounded"
                        onClick={() => handleQuantityChange(itemKey, 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <span>{item.name}</span>
                  </div>
                  <span className="text-sm text-gray-600">{item.unit}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="mt-6 flex justify-end">
        <button 
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          onClick={handleAddToCart}
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}