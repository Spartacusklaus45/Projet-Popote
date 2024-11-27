import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RecipeFilters from './RecipeFilters';
import RecipeCard from './RecipeCard';
import { Recipe } from '../../types/recipe';
import { recipes as allRecipes } from '../../data/recipes';

export default function RecipeSearch() {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(allRecipes);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  useEffect(() => {
    let results = allRecipes;

    // Appliquer la recherche
    if (searchQuery) {
      results = results.filter(recipe => 
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some(ing => ing.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Appliquer les filtres
    if (selectedCategory) {
      results = results.filter(recipe => recipe.category === selectedCategory);
    }
    if (selectedDifficulty) {
      results = results.filter(recipe => recipe.difficulty === selectedDifficulty);
    }

    setFilteredRecipes(results);
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  const handleRecipeClick = (recipeId: number) => {
    navigate(`/recipes/${recipeId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header avec barre de recherche */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Nos Recettes</h1>
          <p className="text-gray-600">
            Découvrez notre sélection de recettes délicieuses
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une recette..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 bg-white rounded-lg text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filtres
          </button>
        </div>
      </div>

      {/* Filtres */}
      {showFilters && (
        <RecipeFilters
          onFilterChange={(filters) => {
            // Appliquer les filtres
          }}
          className="mb-8"
        />
      )}

      {/* Grille de recettes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredRecipes.map((recipe, index) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleRecipeClick(recipe.id)}
            className="cursor-pointer"
          >
            <RecipeCard recipe={recipe} />
          </motion.div>
        ))}
      </div>

      {/* Message si aucun résultat */}
      {filteredRecipes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            Aucune recette ne correspond à votre recherche
          </p>
        </div>
      )}
    </div>
  );
}