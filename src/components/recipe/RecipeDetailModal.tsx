import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Clock, 
  Users, 
  ChefHat,
  Star,
  ShoppingBag,
  Calendar,
  ArrowRight,
  Heart,
  Share2,
  Utensils,
  AlertCircle
} from 'lucide-react';
import { Recipe } from '../../types/recipe';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useMealPlanning } from '../../contexts/MealPlanningContext';
import toast from 'react-hot-toast';

interface RecipeDetailModalProps {
  recipe: Recipe;
  isOpen: boolean;
  onClose: () => void;
}

export default function RecipeDetailModal({ recipe, isOpen, onClose }: RecipeDetailModalProps) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addRecipeToSlot } = useMealPlanning();
  const [servings, setServings] = useState(recipe.servings);

  const handleAddToCart = () => {
    addToCart(recipe, servings);
    toast.success('Recette ajoutée au panier');
  };

  const handleAddToPlanning = () => {
    navigate('/meal-planning');
  };

  const handleViewDetails = () => {
    navigate(`/recipes/${recipe.id}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-xl"
      >
        {/* Header Image */}
        <div className="relative h-64">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          {/* Action Buttons */}
          <div className="absolute top-4 right-16 flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20"
            >
              <Heart className={`h-6 w-6 ${
                recipe.isFavorite ? 'text-red-500 fill-current' : 'text-white'
              }`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20"
            >
              <Share2 className="h-6 w-6 text-white" />
            </motion.button>
          </div>

          {/* Title & Quick Info */}
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-2xl font-bold mb-2">{recipe.title}</h2>
            <div className="flex items-center space-x-4">
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
              <div className="flex items-center">
                <ChefHat className="h-4 w-4 mr-1" />
                {recipe.difficulty}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-16rem)]">
          {/* Description */}
          <p className="text-gray-600 mb-6">{recipe.description}</p>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="flex items-center justify-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Commander ({recipe.price.toLocaleString()} FCFA)
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToPlanning}
              className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Planifier
            </motion.button>
          </div>

          {/* Ingredients Preview */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Utensils className="h-5 w-5 mr-2 text-gray-500" />
              Ingrédients principaux
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {recipe.ingredients.slice(0, 4).map((ingredient) => (
                <div key={ingredient.id} className="flex items-center p-2 bg-gray-50 rounded-lg">
                  <img
                    src={ingredient.image}
                    alt={ingredient.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">{ingredient.name}</p>
                    <p className="text-sm text-gray-500">
                      {ingredient.quantity} {ingredient.unit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-orange-50 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 mr-2" />
              <div>
                <h4 className="font-medium text-gray-900">Conseils du chef</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {recipe.tips?.[0]}
                </p>
              </div>
            </div>
          </div>

          {/* View Full Recipe Button */}
          <motion.button
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleViewDetails}
            className="w-full flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Voir la recette complète
            <ArrowRight className="ml-2 h-5 w-5" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}