import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, ArrowLeft, Star, Clock, Users, ChefHat } from 'lucide-react';
import { useRecipes } from '../../contexts/RecipeContext';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from '../auth/AuthModal';
import NutritionLabel from '../common/NutritionLabel';
import IngredientList from '../common/IngredientList';
import CookingSteps from '../common/CookingSteps';
import ReviewSection from '../common/ReviewSection';

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, toggleFavorite } = useRecipes();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const recipe = recipes.find(r => r.id === id);

  if (!recipe) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Recette non trouvée</h2>
        <button
          onClick={() => navigate('/recipes')}
          className="flex items-center text-orange-500 hover:text-orange-600"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour aux recettes
        </button>
      </div>
    );
  }

  const handleOrderClick = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    addToCart(recipe);
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/recipes')}
        className="flex items-center text-orange-500 hover:text-orange-600 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Retour aux recettes
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
          <button
            onClick={() => isAuthenticated && toggleFavorite(recipe.id)}
            className={`absolute top-4 right-4 p-2 rounded-full ${
              recipe.isFavorite ? 'bg-red-500' : 'bg-white'
            }`}
          >
            <Heart
              className={`h-6 w-6 ${
                recipe.isFavorite ? 'text-white' : 'text-red-500'
              }`}
            />
          </button>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">{recipe.title}</h1>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 mr-1" />
              <span>{recipe.rating}</span>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-600">{recipe.description}</p>
            <div className="mt-4 flex items-center space-x-6">
              <div className="flex items-center text-gray-500">
                <Clock className="h-5 w-5 mr-2" />
                <span>{recipe.duration}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <ChefHat className="h-5 w-5 mr-2" />
                <span>{recipe.difficulty}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <Users className="h-5 w-5 mr-2" />
                <span>{recipe.servings} personnes</span>
              </div>
            </div>
          </div>

          <NutritionLabel nutritionInfo={recipe.nutritionInfo} />
          <IngredientList ingredients={recipe.ingredients} servings={recipe.servings} />
          <CookingSteps steps={recipe.steps} />

          <div className="mt-8">
            <button
              onClick={handleOrderClick}
              className="w-full flex items-center justify-center space-x-2 bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Commander les ingrédients</span>
            </button>
          </div>
        </div>
      </div>

      <ReviewSection reviews={recipe.reviews} recipeId={recipe.id} />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}