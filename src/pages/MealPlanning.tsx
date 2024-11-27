import React, { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Save, 
  Share2,
  ShoppingBag,
  Filter
} from 'lucide-react';
import { motion } from 'framer-motion';
import { format, addWeeks, subWeeks, startOfWeek } from 'date-fns';
import { fr } from 'date-fns/locale';
import RecipeSelector from '../components/meal-planning/RecipeSelector';
import WeeklyPlan from '../components/meal-planning/WeeklyPlan';
import ShoppingList from '../components/meal-planning/ShoppingList';
import SavedPlans from '../components/meal-planning/SavedPlans';
import MealPlanningStats from '../components/meal-planning/MealPlanningStats';
import PlanningConfig from '../components/meal-planning/PlanningConfig';
import { useMealPlanning } from '../contexts/MealPlanningContext';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';

export default function MealPlanning() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [showRecipeSelector, setShowRecipeSelector] = useState(false);
  const [selectedMealSlot, setSelectedMealSlot] = useState<{
    date: Date;
    mealType: 'breakfast' | 'lunch' | 'dinner';
  } | null>(null);

  const { 
    weeklyPlan,
    config,
    updateConfig,
    addRecipeToSlot,
    removeRecipeFromSlot,
    calculateNutritionalStats,
    getRecommendedRecipes
  } = useMealPlanning();
  
  const { addToCart } = useCart();

  const handlePreviousWeek = () => setCurrentWeek(subWeeks(currentWeek, 1));
  const handleNextWeek = () => setCurrentWeek(addWeeks(currentWeek, 1));

  const handleConfigUpdate = (newConfig: any) => {
    updateConfig(newConfig);
    toast.success('Configuration mise à jour !');
  };

  const handleSharePlan = async () => {
    try {
      await navigator.share({
        title: 'Mon plan de repas Popote',
        text: `Plan de repas pour la semaine du ${format(startOfWeek(currentWeek), 'dd MMMM yyyy', { locale: fr })}`,
        url: window.location.href
      });
    } catch (error) {
      console.error('Erreur lors du partage:', error);
    }
  };

  const handleAddAllToCart = () => {
    Object.values(weeklyPlan).forEach(dayPlan => {
      Object.values(dayPlan).forEach(recipe => {
        if (recipe) {
          addToCart(recipe);
        }
      });
    });
    toast.success('Toutes les recettes ont été ajoutées au panier');
  };

  const nutritionalStats = calculateNutritionalStats(currentWeek);
  const recommendations = getRecommendedRecipes(config);

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Configuration du planning */}
        <PlanningConfig onConfigChange={handleConfigUpdate} />

        {/* Navigation de la semaine */}
        <div className="flex items-center justify-between mb-8 bg-white rounded-xl shadow-sm p-4">
          <button
            onClick={handlePreviousWeek}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-medium">
            Semaine du {format(startOfWeek(currentWeek), 'dd MMMM yyyy', { locale: fr })}
          </h2>
          <button
            onClick={handleNextWeek}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Planning hebdomadaire */}
        <WeeklyPlan
          currentWeek={currentWeek}
          onAddRecipe={(date, mealType) => {
            setSelectedMealSlot({ date, mealType });
            setShowRecipeSelector(true);
          }}
          onRemoveRecipe={removeRecipeFromSlot}
        />

        {/* Sélecteur de recettes */}
        <RecipeSelector
          isOpen={showRecipeSelector}
          onClose={() => setShowRecipeSelector(false)}
          onSelectRecipe={(recipe) => {
            if (selectedMealSlot) {
              addRecipeToSlot(selectedMealSlot.date, selectedMealSlot.mealType, recipe);
              setShowRecipeSelector(false);
              setSelectedMealSlot(null);
            }
          }}
          recommendations={recommendations}
        />

        {/* Statistiques nutritionnelles */}
        <div className="mt-8">
          <MealPlanningStats stats={nutritionalStats} />
        </div>

        {/* Liste de courses */}
        <div className="mt-8">
          <ShoppingList />
        </div>

        {/* Plans sauvegardés */}
        <div className="mt-8">
          <SavedPlans />
        </div>
      </div>
    </div>
  );
}