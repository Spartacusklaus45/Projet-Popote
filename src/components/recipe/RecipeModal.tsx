import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Clock, 
  Users, 
  ChefHat,
  Star,
  ShoppingBag,
  Printer,
  Heart,
  Utensils,
} from 'lucide-react';
import { Recipe } from '../../types/recipe';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useMealPlanning } from '../../contexts/MealPlanningContext';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from '../auth/AuthModal';
import RatingStars from './RatingStars';
import CookingSteps from './CookingSteps';
import RecipeReviews from './RecipeReviews';
import { generatePDF } from '../../utils/pdfGenerator';
import toast from 'react-hot-toast';

interface RecipeModalProps {
  recipe: Recipe;
  isOpen: boolean;
  onClose: () => void;
}

export default function RecipeModal({ recipe, isOpen, onClose }: RecipeModalProps) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addRecipeToSlot } = useMealPlanning();
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [servings, setServings] = useState(recipe.servings);
  const [activeTab, setActiveTab] = useState('ingredients');

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    addToCart(recipe, servings);
    toast.success('Recette ajoutée au panier');
    onClose();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    try {
      await generatePDF(recipe, servings);
      toast.success('PDF téléchargé avec succès');
    } catch (error) {
      toast.error('Erreur lors du téléchargement');
    }
  };

  if (!isOpen) return null;

  const tabs = [
    { id: 'ingredients', label: 'Ingrédients' },
    { id: 'steps', label: 'Préparation' },
    { id: 'reviews', label: 'Avis' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg max-w-5xl w-full overflow-hidden grid grid-cols-2 gap-8"
      >
        {/* Colonne gauche - Informations principales */}
        <div className="flex flex-col p-8">
          {/* Bouton de fermeture */}
          <div className="flex justify-end mb-6">
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
            >
              <X className="h-6 w-6 text-gray-600 dark:text-white" />
            </button>
          </div>

          {/* Informations sur la recette */}
          <h2 className="text-4xl font-semibold mb-4 text-gray-900 dark:text-gray-100">{recipe.title}</h2>
          <div className="flex items-center space-x-6 mb-4">
            <div className="flex items-center text-gray-700 dark:text-gray-400">
              <Clock className="h-5 w-5 mr-2" />
              <span>{recipe.duration}</span>
            </div>
            <div className="flex items-center text-gray-700 dark:text-gray-400">
              <Star className="h-5 w-5 mr-2 text-yellow-400" />
              <span>{recipe.rating}</span>
            </div>
            <div className="flex items-center text-gray-700 dark:text-gray-400">
              <ChefHat className="h-5 w-5 mr-2" />
              <span>{recipe.difficulty}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
            {recipe.description}
          </p>

          {/* Informations nutritionnelles */}
          {recipe.nutrition && (
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Infos Nutritionnelles</h3>
              <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
                <div>Calories: <strong>{recipe.nutrition.calories} kcal</strong></div>
                <div>Protéines: <strong>{recipe.nutrition.protein} g</strong></div>
                <div>Glucides: <strong>{recipe.nutrition.carbs} g</strong></div>
              </div>
            </div>
          )}

          {/* Boutons d'action */}
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="flex items-center justify-center px-5 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Ajouter au panier
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePrint}
              className="flex items-center justify-center px-5 py-3 bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            >
              <Printer className="h-5 w-5 mr-2" />
              Imprimer
            </motion.button>
          </div>
        </div>

        {/* Colonne droite - Image et contenu des onglets */}
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-r-3xl overflow-y-auto">
          {/* Image de la recette */}
          <div className="mb-6">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-64 object-cover rounded-2xl mb-6 shadow-md"
            />
          </div>

          {/* Onglets de navigation */}
          <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-4 font-medium ${
                  activeTab === tab.id
                    ? 'text-orange-500 border-b-2 border-orange-500'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 dark:text-gray-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Contenu des onglets */}
          <div className="overflow-y-auto max-h-[calc(90vh-20rem)] space-y-6">
            {activeTab === 'ingredients' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Ingrédients</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {recipe.ingredients.map((ingredient) => (
                    <div key={ingredient.name} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                      <img
                        src={ingredient.image}
                        alt={ingredient.name}
                        className="w-10 h-10 rounded-full object-cover shadow-sm"
                      />
                      <span className="text-gray-700 dark:text-gray-300">{ingredient.quantity} {ingredient.unit} {ingredient.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'steps' && (
              <CookingSteps steps={recipe.steps} />
            )}
            {activeTab === 'reviews' && (
              <RecipeReviews reviews={recipe.reviews} />
            )}
          </div>
        </div>
      </motion.div>

      {/* Modal d'authentification */}
      <AnimatePresence>
        {showAuthModal && (
          <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
