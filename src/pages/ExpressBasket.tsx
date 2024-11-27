import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Clock, ShoppingBag, ChefHat, ArrowRight, Shield, Star } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: "Livraison express",
    description: "Livraison en 2h sur Abidjan"
  },
  {
    icon: ShoppingBag,
    title: "Ingrédients frais",
    description: "Sélectionnés chaque matin"
  },
  {
    icon: Shield,
    title: "Qualité garantie",
    description: "Satisfaction ou remboursé"
  },
  {
    icon: Star,
    title: "Service premium",
    description: "Support client prioritaire"
  }
];

export default function ExpressBasket() {
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="relative mb-16">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1580476262798-bddd9f4b7369"
              alt="Livraison express"
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/90 to-pink-500/90 rounded-2xl" />
          </div>
          
          <div className="relative py-24 px-8 text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold mb-4"
            >
              Panier Express
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-orange-100 max-w-2xl mx-auto"
            >
              Recevez vos ingrédients en moins de 2 heures ! Service disponible sur Abidjan.
            </motion.p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-all"
            >
              <div className="inline-flex p-3 bg-orange-100 rounded-lg mb-4">
                <feature.icon className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* How it Works */}
        <div className="bg-orange-50 rounded-2xl p-12 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Comment ça marche ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Commandez",
                description: "Sélectionnez vos ingrédients et passez commande"
              },
              {
                step: 2,
                title: "Préparation",
                description: "Nos équipes préparent votre commande avec soin"
              },
              {
                step: 3,
                title: "Livraison",
                description: "Un livreur vous apporte votre commande en 2h max"
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Prêt à commander ?
          </h2>
          <p className="text-gray-600 mb-8">
            Commandez maintenant et recevez vos ingrédients en un temps record !
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
          >
            Commander maintenant
            <ArrowRight className="ml-2 h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}