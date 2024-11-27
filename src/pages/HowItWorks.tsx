import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  ShoppingCart, 
  ChefHat, 
  Truck, 
  Heart, 
  UtensilsCrossed,
  Utensils,
  Salad,
  ArrowRight 
} from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: "Choisissez vos recettes",
    description: "Parcourez notre sélection de recettes authentiques et créez votre menu personnalisé",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d"
  },
  {
    icon: ShoppingCart,
    title: "Commandez les ingrédients",
    description: "Nous préparons votre panier avec des ingrédients frais et de qualité",
    image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369"
  },
  {
    icon: Truck,
    title: "Livraison à domicile",
    description: "Recevez vos ingrédients directement chez vous dans les meilleures conditions",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
  },
  {
    icon: ChefHat,
    title: "Cuisinez avec plaisir",
    description: "Suivez nos recettes étape par étape et régalez votre famille",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
  }
];

export default function HowItWorks() {
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Comment fonctionne Popote ?
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez comment nous révolutionnons votre façon de cuisiner en quelques étapes simples
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex items-center gap-12 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              <div className="flex-1">
                <div className="mb-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                    <step.icon className="h-6 w-6 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h2>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-center text-orange-500 font-medium"
                >
                  En savoir plus
                  <ArrowRight className="h-5 w-5 ml-2" />
                </motion.button>
              </div>
              <motion.div
                className="flex-1"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-96 object-cover rounded-2xl shadow-xl"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-12 text-white"
        >
          <h2 className="text-3xl font-bold mb-4">
            Prêt à commencer l'aventure ?
          </h2>
          <p className="text-lg text-orange-100 mb-8">
            Rejoignez des milliers de familles qui cuisinent déjà avec Popote
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-orange-500 px-8 py-4 rounded-full font-semibold hover:bg-orange-50 transition-colors"
          >
            Commencer maintenant
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}