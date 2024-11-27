import { Recipe } from '../types/recipe';
import { MealPlan } from '../types/mealPlanning';

export interface ShoppingListItem {
  name: string;
  quantity: number;
  unit: string;
  category: string;
}

export const generateShoppingList = (mealPlan: MealPlan): ShoppingListItem[] => {
  if (!mealPlan) return [];
  
  const shoppingList: { [key: string]: ShoppingListItem } = {};

  Object.values(mealPlan).forEach(dayPlan => {
    if (!dayPlan) return;
    
    Object.values(dayPlan).forEach(meal => {
      if (!meal?.ingredients) return;
      
      meal.ingredients.forEach(ingredient => {
        const key = `${ingredient.name}-${ingredient.unit}`;
        const quantity = Number(ingredient.quantity) || 0;
        
        if (shoppingList[key]) {
          shoppingList[key].quantity += quantity;
        } else {
          shoppingList[key] = {
            name: ingredient.name,
            quantity: quantity,
            unit: ingredient.unit,
            category: ingredient.category || 'Autres'
          };
        }
      });
    });
  });

  return Object.values(shoppingList)
    .filter(item => item.quantity > 0)
    .sort((a, b) => a.category.localeCompare(b.category));
};

export const calculateTotalCost = (shoppingList: ShoppingListItem[]): number => {
  if (!shoppingList?.length) return 0;
  
  return shoppingList.reduce((total, item) => {
    const quantity = Number(item.quantity) || 0;
    // Using a default price of 1000 FCFA per item
    return total + (1000 * quantity);
  }, 0);
};