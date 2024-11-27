import { Recipe } from './recipe';

export interface MealPlan {
  [day: string]: {
    breakfast?: Recipe;
    lunch?: Recipe;
    dinner?: Recipe;
    snacks?: Recipe[];
  };
}

export interface MealPlanningContextType {
  weeklyPlan: MealPlan;
  addMealToPlan: (day: string, mealType: string, recipe: Recipe) => void;
  removeMealFromPlan: (day: string, mealType: string) => void;
  clearPlan: () => void;
  savedPlans: MealPlan[];
  savePlan: (name: string) => void;
  loadPlan: (index: number) => void;
}