import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Heart, Star, Globe } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="relative mb-16">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d"
              alt="Cuisine africaine"
              className="w-full h-96 object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/90 to-pink-500/90 rounded-2xl" />
          </div>
          
          <div className="relative py-24 px-8 text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold mb-4"
            >
              À propos de Popote
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-orange-100 max-w-2xl mx-auto"
            >
              Découvrez comment Popote révolutionne la façon de cuisiner en Côte d'Ivoire
            </motion.p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Target,
              title: "Notre Mission",
              description: "Rendre la cuisine accessible et agréable pour tous en proposant des solutions innovantes"
            },
            {
              icon: Heart,
              title: "Notre Vision",
              description: "Devenir la référence de la cuisine moderne en Afrique de l'Ouest"
            },
            {
              icon: Star,
              title: "Nos Valeurs",
              description: "Excellence, innovation et satisfaction client sont au cœur de nos préoccupations"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-sm text-center"
            >
              <div className="inline-flex p-3 bg-orange-100 rounded-lg mb-4">
                <item.icon className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Notre Histoire */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Notre Histoire</h2>
            <div className="space-y-8">
              {[
                {
                  year: "2020",
                  title: "La naissance d'une idée",
                  description: "Popote est né de la volonté de moderniser la cuisine africaine tout en préservant son authenticité."
                },
                {
                  year: "2021",
                  title: "Premiers pas",
                  description: "Lancement de la plateforme à Abidjan avec une sélection de recettes traditionnelles."
                },
                {
                  year: "2022",
                  title: "Expansion",
                  description: "Développement du réseau de partenaires et introduction du service de livraison express."
                },
                {
                  year: "2023",
                  title: "Innovation",
                  description: "Lancement de nouvelles fonctionnalités et expansion dans d'autres villes."
                }
              ].map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 w-24">
                    <span className="text-2xl font-bold text-orange-500">{milestone.year}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-12 mb-16 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "50K+", label: "Utilisateurs actifs" },
              { value: "100K+", label: "Commandes livrées" },
              { value: "500+", label: "Recettes disponibles" },
              { value: "98%", label: "Clients satisfaits" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-orange-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Équipe</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Une équipe passionnée qui travaille chaque jour pour vous offrir la meilleure expérience culinaire
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Marie Koné",
                role: "Chef Exécutif",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
              },
              {
                name: "Jean Diallo",
                role: "Directeur Technique",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
              },
              {
                name: "Sophie M'Baye",
                role: "Responsable Qualité",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Rejoignez l'aventure
          </h2>
          <p className="text-gray-600 mb-8">
            Découvrez une nouvelle façon de cuisiner avec Popote
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
          >
            Commencer maintenant
            <Globe className="ml-2 h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}