import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useRecipes } from './RecipeContext';
import { useOrders } from './OrderContext';

interface RecipeStats {
  totalRecipes: number;
  totalOrders: number;
  totalEarnings: number;
  averageRating: number;
  monthlyGrowth: number;
}

interface RecipeStatsContextType {
  stats: RecipeStats;
  updateStats: () => void;
}

const RecipeStatsContext = createContext<RecipeStatsContextType | undefined>(undefined);

export function RecipeStatsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { userRecipes } = useRecipes();
  const { orders } = useOrders();
  const [stats, setStats] = useState<RecipeStats>({
    totalRecipes: 0,
    totalOrders: 0,
    totalEarnings: 0,
    averageRating: 0,
    monthlyGrowth: 0
  });

  const calculateStats = () => {
    if (!user || !userRecipes || !orders) {
      return;
    }

    // Calculate orders and earnings for user's recipes
    const recipeOrders = orders.filter(order => 
      order.items.some(item => 
        userRecipes.some(recipe => recipe.id === item.recipeId)
      )
    );

    const earnings = recipeOrders.reduce((total, order) => {
      const recipeItems = order.items.filter(item =>
        userRecipes.some(recipe => recipe.id === item.recipeId)
      );
      return total + recipeItems.reduce((sum, item) => sum + (item.price * 0.0005), 0);
    }, 0);

    // Calculate average rating
    const ratings = userRecipes.flatMap(recipe => 
      recipe.reviews ? recipe.reviews.map(review => review.rating) : []
    );
    const averageRating = ratings.length > 0 
      ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
      : 0;

    // Calculate monthly growth
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    
    const currentMonthEarnings = recipeOrders
      .filter(order => new Date(order.date) > lastMonth)
      .reduce((total, order) => {
        const recipeItems = order.items.filter(item =>
          userRecipes.some(recipe => recipe.id === item.recipeId)
        );
        return total + recipeItems.reduce((sum, item) => sum + (item.price * 0.0005), 0);
      }, 0);

    const previousMonthEarnings = recipeOrders
      .filter(order => {
        const orderDate = new Date(order.date);
        return orderDate <= lastMonth && orderDate > new Date(lastMonth.setMonth(lastMonth.getMonth() - 1));
      })
      .reduce((total, order) => {
        const recipeItems = order.items.filter(item =>
          userRecipes.some(recipe => recipe.id === item.recipeId)
        );
        return total + recipeItems.reduce((sum, item) => sum + (item.price * 0.0005), 0);
      }, 0);

    const monthlyGrowth = previousMonthEarnings === 0 
      ? 100 
      : ((currentMonthEarnings - previousMonthEarnings) / previousMonthEarnings) * 100;

    setStats({
      totalRecipes: userRecipes.length,
      totalOrders: recipeOrders.length,
      totalEarnings: earnings,
      averageRating,
      monthlyGrowth
    });
  };

  useEffect(() => {
    calculateStats();
  }, [user, userRecipes, orders]);

  return (
    <RecipeStatsContext.Provider value={{ stats, updateStats: calculateStats }}>
      {children}
    </RecipeStatsContext.Provider>
  );
}

export function useRecipeStats() {
  const context = useContext(RecipeStatsContext);
  if (context === undefined) {
    throw new Error('useRecipeStats must be used within a RecipeStatsProvider');
  }
  return context;
}