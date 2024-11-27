import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Calendar } from 'lucide-react';
import PrintButton from './PrintButton';
import DownloadButton from './DownloadButton';

interface RecipeActionsProps {
  onAddToCart: () => void;
  onAddToPlanning: () => void;
  onPrint: () => void;
  onDownload: () => void;
  price: number;
}

export default function RecipeActions({
  onAddToCart,
  onAddToPlanning,
  onPrint,
  onDownload,
  price
}: RecipeActionsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Prix total</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {price.toLocaleString()} FCFA
          </p>
        </div>
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAddToCart}
            className="flex items-center px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
          >
            <ShoppingBag className="h-5 w-5 mr-2" />
            Commander
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAddToPlanning}
            className="flex items-center px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Planifier
          </motion.button>
        </div>
      </div>

      <div className="flex space-x-4">
        <PrintButton onClick={onPrint} />
        <DownloadButton onClick={onDownload} />
      </div>
    </div>
  );
}