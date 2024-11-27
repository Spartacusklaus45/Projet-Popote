import React from 'react';
import { motion } from 'framer-motion';
import { Cookie, Shield, Lock, Settings, AlertCircle } from 'lucide-react';

export default function Cookies() {
  return (
    <div className="pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Politique des Cookies
          </h1>
          <p className="text-xl text-gray-600">
            Comment nous utilisons les cookies pour améliorer votre expérience
          </p>
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Cookie className="h-6 w-6 text-orange-500" />
              <h2 className="text-xl font-sem ibold text-gray-900">
                Qu'est-ce qu'un cookie ?
              </h2>
            </div>
            <p className="text-gray-600">
              Un cookie est un petit fichier texte stocké sur votre ordinateur ou appareil mobile lorsque vous visitez un site web. Les cookies nous aident à faire fonctionner notre site, à le rendre plus sûr, et à vous offrir une meilleure expérience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Settings className="h-6 w-6 text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Types de cookies utilisés
              </h2>
            </div>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2" />
                <span><strong>Cookies essentiels :</strong> Nécessaires au fonctionnement du site</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2" />
                <span><strong>Cookies de performance :</strong> Pour améliorer les performances du site</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2" />
                <span><strong>Cookies de fonctionnalité :</strong> Pour mémoriser vos préférences</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Protection de vos données
              </h2>
            </div>
            <p className="text-gray-600">
              Nous nous engageons à protéger vos données personnelles et à utiliser les cookies de manière responsable. Vous pouvez à tout moment modifier vos préférences en matière de cookies dans les paramètres de votre navigateur.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Lock className="h-6 w-6 text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Gestion des cookies
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              Vous pouvez gérer vos préférences en matière de cookies à tout moment. Voici comment :
            </p>
            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
              Gérer mes préférences
            </button>
          </motion.div>

          {/* Informations complémentaires */}
          <div className="bg-orange-50 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">
                  Informations importantes
                </h3>
                <ul className="mt-2 space-y-2 text-gray-600">
                  <li>• Les cookies sont automatiquement supprimés après 12 mois</li>
                  <li>• Vous pouvez supprimer les cookies à tout moment</li>
                  <li>• Le refus des cookies peut limiter certaines fonctionnalités</li>
                  <li>• Nous ne vendons pas vos données personnelles</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}