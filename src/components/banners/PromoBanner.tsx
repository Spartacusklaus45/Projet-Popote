import React from 'react';
import { motion } from 'framer-motion';
import { Gift, ArrowRight } from 'lucide-react';

export default function PromoBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-r from-green-300 to-orange-200 rounded-2xl p-6 text-green-900 mb-8 shadow-md hover:shadow-lg transform transition duration-300 hover:-translate-y-1"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <motion.div
            className="p-3 bg-green-100 rounded-full shadow"
            whileHover={{ scale: 1.1 }}
          >
            <Gift className="h-6 w-6 text-green-700" />
          </motion.div>
          <div>
            <h3 className="text-xl font-bold mb-1 text-green-800">-20% sur votre première commande !</h3>
            <p className="text-green-700 text-sm">Utilisez le code POPOTE20</p>
          </div>
        </div>
        <motion.button
          className="hidden md:flex items-center px-4 py-2 bg-green-700 text-white rounded-lg font-semibold shadow hover:bg-green-600 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <span>En profiter</span>
          <ArrowRight className="h-4 w-4 ml-2" />
        </motion.button>
      </div>
    </motion.div>
  );
}