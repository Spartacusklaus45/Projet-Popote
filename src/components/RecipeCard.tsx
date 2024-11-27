import React from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Users, 
  Star, 
  Heart, 
  Share2, 
  ShoppingBag,
  Calendar,
  ChefHat,
  Plus,
  Minus
} from 'lucide-react';
import { Recipe } from '../types/recipe';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useMealPlanning } from '../contexts/MealPlanningContext';
import toast from 'react-hot-toast';

interface RecipeCardProps {
  recipe: Recipe;
  showActions?: boolean;
}

export default function RecipeCard({ recipe, showActions = true }: RecipeCardProps) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { addRecipeToSlot } = useMealPlanning();
  const [servings, setServings] = React.useState(recipe.servings);

  const handleClick = () => {
    navigate(`/recipes/${recipe.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error('Veuillez vous connecter pour ajouter au panier');
      return;
    }
    addToCart(recipe, servings);
    toast.success('Recette ajoutée au panier');
  };

  const handleAddToPlanning = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error('Veuillez vous connecter pour planifier');
      return;
    }
    navigate('/meal-planning');
  };

  const handleShare = async (e: React.MouseEvent) => {
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
    <motion.div
      whileHover={{ y: -5 }}
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <Share2 className="h-5 w-5 text-gray-600" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <Heart className={`h-5 w-5 ${
              recipe.isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'
            }`} />
          </motion.button>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-orange-500">
            {recipe.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {recipe.title}
        </h3>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {recipe.duration}
          </div>
          <div className="flex items-center">
            <ChefHat className="h-4 w-4 mr-1" />
            {recipe.difficulty}
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1 text-yellow-400" />
            {recipe.rating}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-gray-400" />
            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setServings(Math.max(1, servings - 1));
                }}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span>{servings} pers.</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setServings(servings + 1);
                }}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
          <span className="text-lg font-bold text-orange-500 dark:text-orange-400">
            {(recipe.price * servings / recipe.servings).toLocaleString()} FCFA
          </span>
        </div>

        {showActions && (
          <div className="grid grid-cols-2 gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="flex items-center justify-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Commander
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToPlanning}
              className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Planifier
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}