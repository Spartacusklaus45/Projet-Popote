import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Award, TrendingUp, Star, Shield } from 'lucide-react';

const partners = [
  {
    name: "Carrefour",
    logo: "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8",
    description: "Leader de la grande distribution",
    type: "Distribution"
  },
  {
    name: "Auchan",
    logo: "https://images.unsplash.com/photo-1542838132-92c53300491e",
    description: "Partenaire qualité",
    type: "Distribution"
  },
  {
    name: "Prosuma",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623",
    description: "Réseau de distribution local",
    type: "Distribution"
  },
  {
    name: "CinetPay",
    logo: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f",
    description: "Solution de paiement sécurisée",
    type: "Paiement"
  },
  {
    name: "Orange Money",
    logo: "https://images.unsplash.com/photo-1556742393-d75f468bfcb0",
    description: "Service de paiement mobile",
    type: "Paiement"
  },
  {
    name: "MTN Mobile Money",
    logo: "https://images.unsplash.com/photo-1556742208-999815fca738",
    description: "Service de paiement mobile",
    type: "Paiement"
  }
];

const benefits = [
  {
    icon: Building2,
    title: "Réseau étendu",
    description: "Plus de 100 points de vente partenaires dans toute la Côte d'Ivoire"
  },
  {
    icon: Users,
    title: "Support dédié",
    description: "Une équipe dédiée pour accompagner nos partenaires"
  },
  {
    icon: Award,
    title: "Qualité garantie",
    description: "Des standards de qualité stricts pour tous nos partenaires"
  },
  {
    icon: TrendingUp,
    title: "Croissance",
    description: "Une croissance moyenne de 25% pour nos partenaires"
  }
];

export default function Partners() {
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
            Nos Partenaires
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez l'écosystème Popote et nos partenaires de confiance qui nous aident à vous offrir le meilleur service
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-8 text-center hover:shadow-lg transition-shadow"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-24 w-auto mx-auto mb-6 grayscale hover:grayscale-0 transition-all"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {partner.name}
              </h3>
              <p className="text-gray-600 mb-4">{partner.description}</p>
              <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
                {partner.type}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Pourquoi devenir partenaire ?
            </h2>
            <p className="text-orange-100">
              Rejoignez notre réseau et développez votre activité
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white"
              >
                <benefit.icon className="h-8 w-8 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-orange-100">{benefit.description}</p>
              </motion.div>
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
            Devenez partenaire
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Rejoignez l'aventure Popote et participez à la révolution culinaire en Côte d'Ivoire
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
          >
            Nous contacter
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}