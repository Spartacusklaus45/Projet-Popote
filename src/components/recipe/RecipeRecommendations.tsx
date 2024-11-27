import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChefHat, 
  Sparkles, 
  Clock, 
  Users, 
  Star,
  ArrowRight,
  Tag,
  Heart 
} from 'lucide-react';
import { Recipe } from '../../types/recipe';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useRecipes } from '../../contexts/RecipeContext';
import toast from 'react-hot-toast';

interface RecipeRecommendationsProps {
  currentRecipe: Recipe;
  recommendations: Recipe[];
}

export default function RecipeRecommendations({ 
  currentRecipe, 
  recommendations 
}: RecipeRecommendationsProps) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toggleFavorite } = useRecipes();

  const handleFavorite = (e: React.MouseEvent, recipeId: number) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error('Veuillez vous connecter pour ajouter aux favoris');
      return;
    }
    toggleFavorite(recipeId);
  };

  const handleShare = async (e: React.MouseEvent, recipe: Recipe) => {
    e.stopPropagation();
    try {
      await navigator.share({
        title: recipe.title,
        text: `Découvrez la recette ${recipe.title} sur Popote !`,
        url: window.location.origin + `/recipes/${recipe.id}`
      });
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        toast.error('Impossible de partager la recette');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Vous aimerez aussi
        </h3>
        <Sparkles className="h-5 w-5 text-orange-500 dark:text-orange-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations
          .filter(recipe => recipe.id !== currentRecipe.id)
          .slice(0, 3)
          .map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(`/recipes/${recipe.id}`)}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="relative">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handleShare(e, recipe)}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                  >
                    <ArrowRight className="h-5 w-5 text-gray-600 dark:text-gray-800" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handleFavorite(e, recipe.id)}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                  >
                    <Heart className={`h-5 w-5 ${
                      recipe.isFavorite ? 'text-red-500 fill-current' : 'text-gray-600 dark:text-gray-800'
                    }`} />
                  </motion.button>
                </div>
                <div className="absolute bottom-4 left-4">
                  {recipe.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="inline-flex items-center px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-orange-500 mr-2"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {recipe.title}
                </h4>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {recipe.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {recipe.servings} pers.
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-400" />
                    {recipe.rating}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-orange-500 dark:text-orange-400">
                    {recipe.price.toLocaleString()} FCFA
                  </span>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex items-center text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300"
                  >
                    Voir la recette
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/recipes')}
        className="w-full flex items-center justify-center px-6 py-3 bg-orange-100 dark:bg-orange-900/30 text-orange-500 dark:text-orange-400 rounded-xl hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors"
      >
        <Sparkles className="h-5 w-5 mr-2" />
        Découvrir plus de recettes
      </motion.button>
    </div>
  );
}