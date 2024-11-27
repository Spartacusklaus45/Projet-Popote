import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function EmptyCart() {
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block p-4 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-6"
          >
            <ShoppingBag className="h-16 w-16 text-orange-500 dark:text-orange-400" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Votre panier est vide
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Découvrez nos délicieuses recettes et commencez à cuisiner !
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/recipes"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-600 dark:to-pink-600 text-white rounded-lg hover:from-orange-600 hover:to-pink-600 dark:hover:from-orange-700 dark:hover:to-pink-700 transition-all duration-300 shadow-lg"
            >
              <span>Voir les recettes</span>
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}