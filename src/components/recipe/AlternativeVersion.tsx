import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Star, ThumbsUp, MessageCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from '../auth/AuthModal';
import toast from 'react-hot-toast';

interface Alternative {
  id: string;
  title: string;
  description: string;
  changes: string[];
  author: {
    name: string;
    avatar?: string;
  };
}

interface AlternativeVersionProps {
  recipeId: number;
  alternatives?: Alternative[];
}

export default function AlternativeVersion({ recipeId, alternatives = [] }: AlternativeVersionProps) {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  const handleLike = (alternativeId: string) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    toast.success('Alternative ajoutée à vos favoris !');
  };

  if (!alternatives.length) {
    return (
      <div className="bg-orange-50 dark:bg-orange-900/30 rounded-lg p-4">
        <div className="flex items-start">
          <ChefHat className="h-5 w-5 text-orange-500 dark:text-orange-400 mt-0.5 mr-2" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100">
              Aucune alternative disponible
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Soyez le premier à proposer une variation de cette recette !
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {alternatives.map((alternative) => (
        <motion.div
          key={alternative.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              {alternative.author.avatar ? (
                <img
                  src={alternative.author.avatar}
                  alt={alternative.author.name}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                  <ChefHat className="h-6 w-6 text-orange-500 dark:text-orange-400" />
                </div>
              )}
              <div className="ml-4">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                  {alternative.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  par {alternative.author.name}
                </p>
              </div>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {alternative.description}
          </p>

          <div className="space-y-2">
            <h5 className="font-medium text-gray-900 dark:text-gray-100">
              Modifications :
            </h5>
            <ul className="space-y-2">
              {alternative.changes.map((change, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2" />
                  <span className="text-gray-600 dark:text-gray-300">{change}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => handleLike(alternative.id)}
              className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span>Utile</span>
            </button>
            <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
              <MessageCircle className="h-4 w-4 mr-1" />
              <span>Commenter</span>
            </button>
          </div>
        </motion.div>
      ))}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}