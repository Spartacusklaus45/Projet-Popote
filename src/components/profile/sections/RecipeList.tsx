import React from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, 
  Edit, 
  Trash2, 
  Globe, 
  Lock,
  Star,
  Users,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { Recipe } from '../../../types/recipe';

interface RecipeListProps {
  recipes: Recipe[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onToggleVisibility: (id: number, isPublic: boolean) => void;
  onView: (id: number) => void;
}

export default function RecipeList({
  recipes,
  onEdit,
  onDelete,
  onToggleVisibility,
  onView
}: RecipeListProps) {
  return (
    <div className="space-y-6">
      {recipes.map((recipe) => (
        <motion.div
          key={recipe.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all"
        >
          <div className="flex">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-48 h-48 object-cover"
            />
            <div className="flex-grow p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {recipe.title}
                  </h3>
                  <div className="flex items-center mt-1 space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      {recipe.rating} (24 avis)
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-400 mr-1" />
                      156 commandes
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      15,000 FCFA générés
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onToggleVisibility(recipe.id, recipe.isPublic)}
                    className={`p-2 rounded-lg ${
                      recipe.isPublic
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {recipe.isPublic ? (
                      <Globe className="h-5 w-5" />
                    ) : (
                      <Lock className="h-5 w-5" />
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onView(recipe.id)}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg"
                  >
                    <Eye className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onEdit(recipe.id)}
                    className="p-2 bg-orange-100 text-orange-600 rounded-lg"
                  >
                    <Edit className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onDelete(recipe.id)}
                    className="p-2 bg-red-100 text-red-600 rounded-lg"
                  >
                    <Trash2 className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>

              {recipe.isPublic ? (
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-green-800">
                        Recette publique
                      </h4>
                      <p className="text-sm text-green-600">
                        Vous gagnez 0.05% sur chaque commande d'ingrédients
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-800">
                        Gains du mois
                      </p>
                      <p className="text-lg font-bold text-green-600">
                        750 FCFA
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-4 p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 mr-2" />
                    <div>
                      <h4 className="font-medium text-orange-800">
                        Recette privée
                      </h4>
                      <p className="text-sm text-orange-600">
                        Rendez votre recette publique pour gagner des récompenses !
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}