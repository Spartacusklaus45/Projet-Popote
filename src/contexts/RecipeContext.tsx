import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Recipe } from '../types/recipe';

interface RecipeContextType {
  recipes: Recipe[];
  userRecipes: Recipe[];
  favoriteRecipes: Recipe[];
  searchRecipes: (query: string) => Recipe[];
  addRecipe: (recipe: Omit<Recipe, 'id'>) => Promise<void>;
  updateRecipe: (id: number, recipe: Partial<Recipe>) => Promise<void>;
  deleteRecipe: (id: number) => Promise<void>;
  toggleFavorite: (id: number) => void;
  toggleRecipeVisibility: (id: number) => Promise<void>;
  loading: boolean;
  error: Error | null;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

const mockRecipes: Recipe[] = [
  {
    id: 1,
    title: "Poulet Kedjenou",
    description: "Un délicieux plat traditionnel ivoirien",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
    duration: "45 min",
    price: 5000,
    servings: 4,
    rating: 4.8,
    difficulty: "easy",
    category: "Plat Ivoirien",
    ingredients: [
      {
        id: "1",
        name: "Poulet",
        quantity: 1,
        unit: "kg",
        price: 2500
      }
    ],
    steps: [
      {
        id: "1",
        description: "Couper le poulet en morceaux",
        duration: 10
      }
    ],
    tags: ["Poulet", "Traditionnel"],
    isFavorite: false,
    isPublic: false
  }
];

export function RecipeProvider({ children }: { children: React.ReactNode }) {
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes);
  const [userRecipes, setUserRecipes] = useState<Recipe[]>(mockRecipes);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const searchRecipes = (query: string): Recipe[] => {
    if (!query.trim()) return [];
    
    const searchTerm = query.toLowerCase();
    return recipes.filter(recipe => 
      recipe.title.toLowerCase().includes(searchTerm) ||
      recipe.description?.toLowerCase().includes(searchTerm) ||
      recipe.ingredients.some(ing => ing.name.toLowerCase().includes(searchTerm))
    );
  };

  const addRecipe = async (recipe: Omit<Recipe, 'id'>) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newRecipe = {
        ...recipe,
        id: Date.now(),
        rating: 0,
        isFavorite: false,
        isPublic: false
      };

      setRecipes(prev => [...prev, newRecipe]);
      setUserRecipes(prev => [...prev, newRecipe]);
      toast.success('Recette créée avec succès !');
    } catch (error) {
      const err = error as Error;
      setError(err);
      toast.error('Erreur lors de la création de la recette');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateRecipe = async (id: number, recipeUpdate: Partial<Recipe>) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRecipes(prev =>
        prev.map(recipe =>
          recipe.id === id ? { ...recipe, ...recipeUpdate } : recipe
        )
      );

      setUserRecipes(prev =>
        prev.map(recipe =>
          recipe.id === id ? { ...recipe, ...recipeUpdate } : recipe
        )
      );

      toast.success('Recette mise à jour !');
    } catch (error) {
      const err = error as Error;
      setError(err);
      toast.error('Erreur lors de la mise à jour de la recette');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteRecipe = async (id: number) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRecipes(prev => prev.filter(recipe => recipe.id !== id));
      setUserRecipes(prev => prev.filter(recipe => recipe.id !== id));
      setFavoriteRecipes(prev => prev.filter(recipe => recipe.id !== id));
      
      toast.success('Recette supprimée !');
    } catch (error) {
      const err = error as Error;
      setError(err);
      toast.error('Erreur lors de la suppression de la recette');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (id: number) => {
    setRecipes(prev =>
      prev.map(recipe => {
        if (recipe.id === id) {
          const isFavorite = !recipe.isFavorite;
          if (isFavorite) {
            setFavoriteRecipes(curr => [...curr, { ...recipe, isFavorite }]);
          } else {
            setFavoriteRecipes(curr => curr.filter(r => r.id !== id));
          }
          return { ...recipe, isFavorite };
        }
        return recipe;
      })
    );
  };

  const toggleRecipeVisibility = async (id: number) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      setRecipes(prev =>
        prev.map(recipe =>
          recipe.id === id ? { ...recipe, isPublic: !recipe.isPublic } : recipe
        )
      );

      setUserRecipes(prev =>
        prev.map(recipe =>
          recipe.id === id ? { ...recipe, isPublic: !recipe.isPublic } : recipe
        )
      );

      toast.success('Visibilité de la recette mise à jour !');
    } catch (error) {
      const err = error as Error;
      setError(err);
      toast.error('Erreur lors de la mise à jour de la visibilité');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <RecipeContext.Provider value={{
      recipes,
      userRecipes,
      favoriteRecipes,
      searchRecipes,
      addRecipe,
      updateRecipe,
      deleteRecipe,
      toggleFavorite,
      toggleRecipeVisibility,
      loading,
      error
    }}>
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipes() {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
}