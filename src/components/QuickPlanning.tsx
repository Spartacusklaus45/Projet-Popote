import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function QuickPlanning() {
  const { user } = useAuth();

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            {user && (
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Bonjour {user.name} 👋
              </h2>
            )}
            <h3 className="text-2xl text-gray-700 dark:text-gray-300 mb-4">
              Planifiez vos repas ici
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              Organisez votre semaine et gagnez du temps avec notre planificateur de repas
            </p>
            <Link
              to="/meal-planning"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-600 dark:to-pink-600 text-white rounded-full hover:from-orange-600 hover:to-pink-600 dark:hover:from-orange-700 dark:hover:to-pink-700 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl"
            >
              <Calendar className="h-6 w-6 mr-3" />
              Planifier mes repas
              <ArrowRight className="h-6 w-6 ml-3" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}