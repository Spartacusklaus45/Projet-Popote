import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  ShoppingCart, 
  ChefHat, 
  Truck, 
  ArrowRight,
  Star,
  Clock,
  Users
} from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: "Choisissez vos recettes",
    description: "Parcourez notre sélection de recettes et créez votre menu personnalisé",
    color: "bg-orange-100 text-orange-500"
  },
  {
    icon: ShoppingCart,
    title: "Commandez les ingrédients",
    description: "Nous préparons votre panier avec tous les ingrédients nécessaires",
    color: "bg-green-100 text-green-500"
  },
  {
    icon: Truck,
    title: "Livraison à domicile",
    description: "Recevez vos ingrédients frais directement chez vous",
    color: "bg-blue-100 text-blue-500"
  },
  {
    icon: ChefHat,
    title: "Cuisinez avec plaisir",
    description: "Suivez nos recettes étape par étape et régalez-vous",
    color: "bg-purple-100 text-purple-500"
  }
];

const features = [
  { icon: Clock, label: "Livraison en 24h" },
  { icon: Star, label: "Ingrédients premium" },
  { icon: Users, label: "Pour toute la famille" },
  { icon: ChefHat, label: "Recettes détaillées" }
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-xl text-gray-600">
            En quelques étapes simples, commencez à cuisiner comme un chef
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center relative"
            >
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gray-200">
                  <motion.div
                    className="h-full bg-orange-500 origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.3 }}
                  />
                </div>
              )}

              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`w-24 h-24 mx-auto ${step.color} rounded-full flex items-center justify-center mb-6 shadow-lg`}>
                  <step.icon className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-center space-x-3"
            >
              <feature.icon className="h-5 w-5 text-orange-500" />
              <span className="text-gray-600">{feature.label}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full font-semibold hover:from-orange-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
          >
            Commencer maintenant
            <ArrowRight className="ml-2 h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}