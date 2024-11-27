import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Users, 
  ChefHat, 
  Star,
  Heart,
  Share2,
  ShoppingBag,
  Calendar,
  Printer,
  Download,
  ArrowLeft,
  Utensils,
  Activity,
  AlertCircle
} from 'lucide-react';
import { Recipe } from '../../types/recipe';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useMealPlanning } from '../../contexts/MealPlanningContext';
import { generatePDF } from '../../utils/pdfGenerator';
import ShareModal from './ShareModal';
import IngredientList from './IngredientList';
import CookingSteps from './CookingSteps';
import NutritionLabel from './NutritionLabel';
import ReviewSection from './ReviewSection';
import AlternativeVersion from './AlternativeVersion';
import toast from 'react-hot-toast';

interface RecipeDetailsProps {
  recipe: Recipe;
}

export default function RecipeDetails({ recipe }: RecipeDetailsProps) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addRecipeToSlot } = useMealPlanning();
  const [showShareModal, setShowShareModal] = useState(false);
  const [servings, setServings] = useState(recipe.servings);

  const handleAddToCart = () => {
    addToCart(recipe, servings);
    toast.success('Recette ajoutée au panier');
  };

  const handleAddToPlanning = () => {
    navigate('/meal-planning');
  };

  const handleDownloadPDF = async () => {
    try {
      await generatePDF(recipe, servings);
      toast.success('PDF téléchargé avec succès');
    } catch (error) {
      toast.error('Erreur lors du téléchargement');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Navigation */}
      <button
        onClick={() => navigate('/recipes')}
        className="flex items-center text-orange-500 hover:text-orange-600 mb-8"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Retour aux recettes
      </button>

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
          />
          <div className="absolute top-4 right-4 flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowShareModal(true)}
              className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-50"
            >
              <Share2 className="h-6 w-6 text-gray-600" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-50"
            >
              <Heart className={`h-6 w-6 ${
                recipe.isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'
              }`} />
            </motion.button>
          </div>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{recipe.description}</p>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <Clock className="h-6 w-6 text-orange-500 mx-auto mb-2" />
              <span className="block text-sm text-gray-600">Durée</span>
              <span className="block font-semibold">{recipe.duration}</span>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <Users className="h-6 w-6 text-orange-500 mx-auto mb-2" />
              <span className="block text-sm text-gray-600">Pour</span>
              <span className="block font-semibold">{servings} pers.</span>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <ChefHat className="h-6 w-6 text-orange-500 mx-auto mb-2" />
              <span className="block text-sm text-gray-600">Difficulté</span>
              <span className="block font-semibold">{recipe.difficulty}</span>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <Star className="h-6 w-6 text-orange-500 mx-auto mb-2" />
              <span className="block text-sm text-gray-600">Note</span>
              <span className="block font-semibold">{recipe.rating}/5</span>
            </div>
          </div>

          {/* Prix et commande */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-600">Prix total</p>
                <p className="text-3xl font-bold text-gray-900">
                  {(recipe.price * servings / recipe.servings).toLocaleString()} FCFA
                </p>
              </div>
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  className="flex items-center px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Commander
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToPlanning}
                  className="flex items-center px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Planifier
                </motion.button>
              </div>
            </div>

            {/* Download & Print */}
            <div className="flex space-x-4">
              <button
                onClick={handleDownloadPDF}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <Download className="h-5 w-5 mr-2" />
                Télécharger PDF
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <Printer className="h-5 w-5 mr-2" />
                Imprimer
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Ingredients */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <IngredientList
              ingredients={recipe.ingredients}
              baseServings={recipe.servings}
              currentServings={servings}
            />
          </section>

          {/* Steps */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <CookingSteps steps={recipe.steps} />
          </section>

          {/* Reviews */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <ReviewSection reviews={recipe.reviews} recipeId={recipe.id} />
          </section>

          {/* Alternative Versions */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <AlternativeVersion recipeId={recipe.id} />
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Nutrition */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <NutritionLabel nutrition={recipe.nutrition} servings={servings} />
          </section>

          {/* Tips */}
          <section className="bg-orange-50 rounded-xl p-6">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 mr-2" />
              <div>
                <h4 className="font-medium text-gray-900">Conseils du chef</h4>
                <ul className="mt-2 space-y-2 text-gray-600">
                  {recipe.tips?.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        recipe={recipe}
      />
    </div>
  );
}