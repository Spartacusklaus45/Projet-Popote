import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Link, Facebook, Twitter, WhatsApp, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: {
    id: number;
    title: string;
    image: string;
  };
}

export default function ShareModal({ isOpen, onClose, recipe }: ShareModalProps) {
  const recipeUrl = `${window.location.origin}/recipes/${recipe.id}`;

  const shareOptions = [
    {
      name: 'Copier le lien',
      icon: Link,
      action: async () => {
        await navigator.clipboard.writeText(recipeUrl);
        toast.success('Lien copié !');
      },
      color: 'bg-gray-100 text-gray-900 hover:bg-gray-200'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      action: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(recipeUrl)}`);
      },
      color: 'bg-blue-600 text-white hover:bg-blue-700'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      action: () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(recipeUrl)}&text=${encodeURIComponent(recipe.title)}`);
      },
      color: 'bg-sky-500 text-white hover:bg-sky-600'
    },
    {
      name: 'WhatsApp',
      icon: WhatsApp,
      action: () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(`${recipe.title} - ${recipeUrl}`)}`);
      },
      color: 'bg-green-500 text-white hover:bg-green-600'
    },
    {
      name: 'Email',
      icon: Mail,
      action: () => {
        window.location.href = `mailto:?subject=${encodeURIComponent(recipe.title)}&body=${encodeURIComponent(recipeUrl)}`;
      },
      color: 'bg-orange-500 text-white hover:bg-orange-600'
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl max-w-md w-full overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Partager la recette
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-medium text-gray-900">{recipe.title}</h3>
              <p className="text-sm text-gray-500">{recipeUrl}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {shareOptions.map((option) => (
              <motion.button
                key={option.name}
                onClick={option.action}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center justify-center space-x-2 p-3 rounded-lg transition-colors ${option.color}`}
              >
                <option.icon className="h-5 w-5" />
                <span>{option.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}