import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const recipes = [
  {
    id: 1,
    title: "Poulet Kedjenou",
    description: "Découvrez cette recette traditionnelle ivoirienne pleine de saveurs",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
    duration: "45 min",
    servings: 4
  },
  {
    id: 2,
    title: "Attiéké Poisson",
    description: "Un délicieux plat de poisson grillé accompagné d'attiéké",
    image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369",
    duration: "30 min",
    servings: 2
  },
  {
    id: 3,
    title: "Sauce Graine",
    description: "Une sauce traditionnelle à base de noix de palme",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    duration: "60 min",
    servings: 6
  }
];

export default function RecipeBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % recipes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentRecipe = recipes[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl mb-8 shadow-lg group bg-gradient-to-r from-green-200 via-yellow-100 to-orange-100"
    >
      <motion.img
        key={currentRecipe.image}
        src={currentRecipe.image}
        alt={currentRecipe.title}
        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-4 mb-4"
          >
            <span className="px-3 py-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full text-sm font-medium shadow-lg">
              Recette du jour
            </span>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-green-400" />
                {currentRecipe.duration}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1 text-green-400" />
                {currentRecipe.servings} pers.
              </div>
            </div>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold mb-2"
          >
            {currentRecipe.title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-200 mb-4"
          >
            {currentRecipe.description}
          </motion.p>

          <Link
            to={`/recipes/${currentRecipe.id}`}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg hover:from-green-500 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <ChefHat className="h-5 w-5 mr-2" />
            Voir la recette
          </Link>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        {recipes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-green-500 w-4' 
                : 'bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}