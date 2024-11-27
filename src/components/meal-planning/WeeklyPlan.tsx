import React from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Plus, X, ShoppingCart } from 'lucide-react';
import { useMealPlanning } from '../../contexts/MealPlanningContext';
import { useCart } from '../../contexts/CartContext';
import toast from 'react-hot-toast';

interface WeeklyPlanProps {
  currentWeek: Date;
  onAddRecipe: (date: Date, mealType: 'breakfast' | 'lunch' | 'dinner') => void;
  onRemoveRecipe: (date: Date, mealType: 'breakfast' | 'lunch' | 'dinner', recipeId: string) => void;
}

export default function WeeklyPlan({ currentWeek, onAddRecipe, onRemoveRecipe }: WeeklyPlanProps) {
  const { weeklyPlan } = useMealPlanning();
  const { addToCart } = useCart();
  const startDate = startOfWeek(currentWeek);

  const mealTypes = [
    { id: 'breakfast', label: 'Petit-déjeuner' },
    { id: 'lunch', label: 'Déjeuner' },
    { id: 'dinner', label: 'Dîner' }
  ];

  // Calculate total cost from all recipes in the weekly plan
  const totalCost = Object.values(weeklyPlan).reduce((total, dayPlan) => {
    return total + Object.values(dayPlan).reduce((dayTotal, recipe) => {
      return dayTotal + (recipe?.price || 0);
    }, 0);
  }, 0);

  const handleAddAllToCart = () => {
    Object.values(weeklyPlan).forEach(dayPlan => {
      Object.values(dayPlan).forEach(recipe => {
        if (recipe) {
          addToCart(recipe);
        }
      });
    });
    toast.success('Toutes les recettes ont été ajoutées au panier');
  };

  return (
    <div className="space-y-6">
      {/* Total et actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Total estimé</h3>
            <p className="text-3xl font-bold text-orange-500">
              {totalCost.toLocaleString()} FCFA
            </p>
          </div>
          <button
            onClick={handleAddAllToCart}
            className="flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Tout ajouter au panier
          </button>
        </div>
      </div>

      {/* Planning */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-8 divide-x divide-gray-200">
          {/* Time slots */}
          <div className="col-span-1">
            <div className="h-12 border-b border-gray-200" />
            {mealTypes.map((meal) => (
              <div
                key={meal.id}
                className="h-32 p-2 border-b border-gray-200 flex items-center justify-center"
              >
                <span className="text-sm font-medium text-gray-500 rotate-270">
                  {meal.label}
                </span>
              </div>
            ))}
          </div>

          {/* Days */}
          {Array.from({ length: 7 }).map((_, index) => {
            const date = addDays(startDate, index);
            const dateKey = date.toISOString().split('T')[0];

            return (
              <div key={index} className="col-span-1">
                {/* Day header */}
                <div className="h-12 flex items-center justify-center border-b border-gray-200 bg-gray-50">
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900">
                      {format(date, 'EEEE', { locale: fr })}
                    </div>
                    <div className="text-sm text-gray-500">
                      {format(date, 'd MMM', { locale: fr })}
                    </div>
                  </div>
                </div>

                {/* Meal slots */}
                {mealTypes.map((meal) => (
                  <div
                    key={meal.id}
                    className="h-32 p-2 border-b border-gray-200 relative group"
                  >
                    {weeklyPlan[dateKey]?.[meal.id as keyof typeof weeklyPlan[string]] ? (
                      <div className="h-full bg-orange-50 rounded-lg p-2 relative">
                        <button
                          onClick={() => onRemoveRecipe(
                            date,
                            meal.id as 'breakfast' | 'lunch' | 'dinner',
                            weeklyPlan[dateKey][meal.id as keyof typeof weeklyPlan[string]]?.id || ''
                          )}
                          className="absolute top-1 right-1 p-1 text-gray-400 hover:text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <div className="text-sm font-medium text-gray-900 mb-1">
                          {weeklyPlan[dateKey][meal.id as keyof typeof weeklyPlan[string]]?.title}
                        </div>
                        <div className="text-sm text-orange-500">
                          {weeklyPlan[dateKey][meal.id as keyof typeof weeklyPlan[string]]?.price.toLocaleString()} FCFA
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => onAddRecipe(date, meal.id as 'breakfast' | 'lunch' | 'dinner')}
                        className="w-full h-full border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:text-orange-500 hover:border-orange-500 transition-colors"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}