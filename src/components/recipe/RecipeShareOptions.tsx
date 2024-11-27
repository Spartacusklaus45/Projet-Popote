import React from 'react';
import { motion } from 'framer-motion';
import { 
  Share2, 
  Facebook, 
  Twitter, 
  Mail, 
  Link, 
  WhatsApp,
  Download,
  Printer
} from 'lucide-react';
import toast from 'react-hot-toast';

interface RecipeShareOptionsProps {
  recipe: {
    id: number;
    title: string;
    image: string;
  };
  onDownloadPDF: () => void;
  onPrint: () => void;
}

export default function RecipeShareOptions({ recipe, onDownloadPDF, onPrint }: RecipeShareOptionsProps) {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
          <Share2 className="h-5 w-5 text-orange-500 dark:text-orange-400 mr-2" />
          Partager la recette
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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

      <div className="flex space-x-4 mt-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onDownloadPDF}
          className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <Download className="h-5 w-5 mr-2" />
          Télécharger PDF
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onPrint}
          className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <Printer className="h-5 w-5 mr-2" />
          Imprimer
        </motion.button>
      </div>
    </div>
  );
}