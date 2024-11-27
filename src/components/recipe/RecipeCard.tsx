import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Star, Heart, Share2 } from 'lucide-react';
import { Recipe } from '../../types/recipe';
import toast from 'react-hot-toast';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const shareData = {
      title: recipe.title,
      text: `Découvrez la recette ${recipe.title} sur Popote !`,
      url: window.location.origin + `/recipes/${recipe.id}`
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback : copier le lien dans le presse-papier
        await navigator.clipboard.writeText(shareData.url);
        toast.success('Lien copié dans le presse-papier !');
      }
    } catch (error) {
      console.error('Erreur lors du partage:', error);
      // Ne pas afficher d'erreur à l'utilisateur si c'est juste que le partage a été annulé
      if (error instanceof Error && error.name !== 'AbortError') {
        toast.error('Impossible de partager la recette');
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow h-full">
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 flex space-x-2">
          <motion.button
            onClick={handleShare}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
          >
            <Share2 className="h-5 w-5 text-gray-600" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
          >
            <Heart className={`h-5 w-5 ${
              recipe.isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'
            }`} />
          </motion.button>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-orange-500">
            {recipe.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {recipe.title}
        </h3>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {recipe.duration}
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {recipe.servings}
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1 text-yellow-400" />
            {recipe.rating}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-orange-500">
            {recipe.price.toLocaleString()} FCFA
          </span>
          <button className="px-3 py-1.5 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
            Commander
          </button>
        </div>
      </div>
    </div>
  );
}