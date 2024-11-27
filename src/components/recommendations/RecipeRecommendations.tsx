import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Sparkles, Clock, Users, Star } from 'lucide-react';
import RecommendationCard from './RecommendationCard';
import PreferencesModal from './PreferencesModal';
import { Recipe } from '../../types/recipe';
import { useRecommendations } from '../../hooks/useRecommendations';

export default function RecipeRecommendations() {
  const [showPreferences, setShowPreferences] = useState(false);
  const { recommendations, loading, error } = useRecommendations();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Toutes les recommandations' },
    { id: 'personalized', name: 'Pour vous' },
    { id: 'trending', name: 'Tendances' },
    { id: 'new', name: 'Nouveautés' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Recommandations personnalisées
          </h2>
          <p className="text-gray-600">
            Des recettes sélectionnées selon vos préférences
          </p>
        </div>
        <button
          onClick={() => setShowPreferences(true)}
          className="flex items-center px-4 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors"
        >
          <ChefHat className="h-5 w-5 mr-2" />
          Préférences
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeCategory === category.id
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Recommendations Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4" />
          <p className="text-gray-600">Chargement des recommandations...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500">Une erreur est survenue lors du chargement des recommandations.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <RecommendationCard recipe={recipe} />
            </motion.div>
          ))}
        </div>
      )}

      {/* Preferences Modal */}
      <PreferencesModal
        isOpen={showPreferences}
        onClose={() => setShowPreferences(false)}
      />
    </div>
  );
}