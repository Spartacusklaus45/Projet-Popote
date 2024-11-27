import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Users, Star } from 'lucide-react';
import { useRecipes } from '../../contexts/RecipeContext';

interface SearchResultsProps {
  query: string;
  onSelect: () => void;
}

export default function SearchResults({ query, onSelect }: SearchResultsProps) {
  const { searchRecipes } = useRecipes();
  const results = searchRecipes(query);

  if (!query) return null;

  if (results.length === 0) {
    return (
      <div className="py-4 text-center text-gray-500">
        Aucun résultat trouvé pour "{query}"
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-2 max-h-96 overflow-y-auto">
      {results.map((recipe, index) => (
        <motion.div
          key={recipe.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Link
            to={`/recipes/${recipe.id}`}
            className="flex items-start p-2 hover:bg-orange-50 rounded-lg transition-colors"
            onClick={onSelect}
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="ml-3 flex-grow">
              <h4 className="font-medium text-gray-900">{recipe.title}</h4>
              <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
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
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}