import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import { recipes } from '../data/recipes';

export default function RecipeShowcase() {
  // Afficher seulement les 3 premières recettes sur la page d'accueil
  const showcaseRecipes = recipes.slice(0, 3);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Découvrez nos meilleures recettes
          </h2>
          <p className="text-xl text-gray-600">
            Des recettes authentiques et délicieuses, préparées avec amour
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {showcaseRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/recipes"
            className="inline-flex items-center text-orange-500 font-medium hover:text-orange-600"
          >
            Voir toutes nos recettes
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}