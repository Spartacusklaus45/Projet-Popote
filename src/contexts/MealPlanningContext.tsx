import React, { createContext, useContext, useState } from 'react';
import { Recipe } from '../types/recipe';
import toast from 'react-hot-toast';

interface MealPlan {
  [date: string]: {
    breakfast?: Recipe;
    lunch?: Recipe;
    dinner?: Recipe;
  };
}

interface NutritionalStats {
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  nutritionScore: string;
  totalPrepTime: number;
  totalRecipes: number;
  trends: {
    calories: 'up' | 'down' | 'stable';
    proteins: 'up' | 'down' | 'stable';
    carbs: 'up' | 'down' | 'stable';
    fats: 'up' | 'down' | 'stable';
  };
}

interface MealPlanningContextType {
  weeklyPlan: MealPlan;
  config: any;
  updateConfig: (config: any) => void;
  addRecipeToSlot: (date: Date, mealType: string, recipe: Recipe) => void;
  removeRecipeFromSlot: (date: Date, mealType: string) => void;
  calculateNutritionalStats: (week: Date) => NutritionalStats;
  getRecommendedRecipes: (config: any) => Recipe[];
}

const MealPlanningContext = createContext<MealPlanningContextType | undefined>(undefined);

export function MealPlanningProvider({ children }: { children: React.ReactNode }) {
  const [weeklyPlan, setWeeklyPlan] = useState<MealPlan>({});
  const [config, setConfig] = useState({
    household: { adults: 2, children: 0 },
    diet: [],
    equipment: []
  });

  const addRecipeToSlot = (date: Date, mealType: string, recipe: Recipe) => {
    const dateKey = date.toISOString().split('T')[0];
    setWeeklyPlan(prev => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        [mealType]: recipe
      }
    }));
    toast.success('Recette ajoutée au planning');
  };

  const removeRecipeFromSlot = (date: Date, mealType: string) => {
    const dateKey = date.toISOString().split('T')[0];
    setWeeklyPlan(prev => {
      const newPlan = { ...prev };
      if (newPlan[dateKey]) {
        delete newPlan[dateKey][mealType as keyof typeof newPlan[typeof dateKey]];
      }
      return newPlan;
    });
    toast.success('Recette retirée du planning');
  };

  const calculateNutritionalStats = (week: Date): NutritionalStats => {
    const stats = {
      calories: 0,
      proteins: 0,
      carbs: 0,
      fats: 0,
      totalPrepTime: 0,
      totalRecipes: 0
    };

    // Calculate totals from weekly plan
    Object.values(weeklyPlan).forEach(dayPlan => {
      Object.values(dayPlan).forEach(recipe => {
        if (recipe?.nutrition) {
          stats.calories += recipe.nutrition.calories || 0;
          stats.proteins += recipe.nutrition.proteins || 0;
          stats.carbs += recipe.nutrition.carbs || 0;
          stats.fats += recipe.nutrition.fats || 0;
          stats.totalPrepTime += parseInt(recipe.duration) || 0;
          stats.totalRecipes++;
        }
      });
    });

    // Calculate trends (simplified example)
    const trends = {
      calories: stats.calories > 14000 ? 'up' : stats.calories < 10000 ? 'down' : 'stable',
      proteins: stats.proteins > 350 ? 'up' : stats.proteins < 250 ? 'down' : 'stable',
      carbs: stats.carbs > 1750 ? 'up' : stats.carbs < 1250 ? 'down' : 'stable',
      fats: stats.fats > 490 ? 'up' : stats.fats < 350 ? 'down' : 'stable'
    } as const;

    // Calculate nutrition score based on macronutrient balance
    const nutritionScore = calculateNutritionScore(stats);

    return {
      ...stats,
      nutritionScore,
      trends
    };
  };

  const calculateNutritionScore = (stats: typeof initialStats): string => {
    const totalCalories = stats.calories;
    if (!totalCalories) return 'N/A';

    const proteinPercentage = (stats.proteins * 4) / totalCalories;
    const carbsPercentage = (stats.carbs * 4) / totalCalories;
    const fatsPercentage = (stats.fats * 9) / totalCalories;

    if (
      proteinPercentage >= 0.1 && proteinPercentage <= 0.35 &&
      carbsPercentage >= 0.45 && carbsPercentage <= 0.65 &&
      fatsPercentage >= 0.2 && fatsPercentage <= 0.35
    ) {
      return 'A';
    } else if (
      proteinPercentage >= 0.08 && proteinPercentage <= 0.4 &&
      carbsPercentage >= 0.4 && carbsPercentage <= 0.7 &&
      fatsPercentage >= 0.15 && fatsPercentage <= 0.4
    ) {
      return 'B';
    }
    return 'C';
  };

  const getRecommendedRecipes = (config: any): Recipe[] => {
    // Implement recipe recommendations based on user preferences
    // This is a placeholder that should be replaced with actual recommendation logic
    return [];
  };

  const updateConfig = (newConfig: any) => {
    setConfig(newConfig);
  };

  return (
    <MealPlanningContext.Provider value={{
      weeklyPlan,
      config,
      updateConfig,
      addRecipeToSlot,
      removeRecipeFromSlot,
      calculateNutritionalStats,
      getRecommendedRecipes
    }}>
      {children}
    </MealPlanningContext.Provider>
  );
}

export function useMealPlanning() {
  const context = useContext(MealPlanningContext);
  if (context === undefined) {
    throw new Error('useMealPlanning must be used within a MealPlanningProvider');
  }
  return context;
}