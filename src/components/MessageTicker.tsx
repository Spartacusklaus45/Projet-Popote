import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Gift, Truck, Star } from 'lucide-react';

const messages = [
  {
    id: 1,
    text: "Livraison gratuite dès 20 000 FCFA d'achat !",
    icon: Truck,
    color: "text-green-600"
  },
  {
    id: 2,
    text: "-20% sur votre première commande avec le code POPOTE20",
    icon: Gift,
    color: "text-orange-500"
  },
  {
    id: 3,
    text: "Nouveau : Découvrez nos recettes exclusives",
    icon: Star,
    color: "text-yellow-500"
  },
  {
    id: 4,
    text: "Parrainez vos amis et gagnez 1 000 FCFA !",
    icon: Bell,
    color: "text-blue-500"
  }
];

export default function MessageTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const currentMessage = messages[currentIndex];
  const Icon = currentMessage.icon;

  return (
    <div className="bg-gradient-to-r from-green-200 via-yellow-100 to-orange-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex items-center justify-center space-x-3 text-base py-2"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Icon className={`h-5 w-5 ${currentMessage.color} dark:text-gray-400`} />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              className="font-medium text-green-900 dark:text-gray-100"
            >
              {currentMessage.text}
            </motion.span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}