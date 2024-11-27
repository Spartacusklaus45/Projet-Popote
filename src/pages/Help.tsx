import React from 'react';
import { motion } from 'framer-motion';
import { 
  HelpCircle, 
  Book, 
  MessageCircle, 
  Phone, 
  Mail,
  Clock,
  Search,
  ChevronRight,
  ShoppingBag,
  CreditCard,
  User,
  Settings
} from 'lucide-react';

const helpCategories = [
  {
    icon: ShoppingBag,
    title: "Commandes",
    topics: [
      "Suivre ma commande",
      "Modifier ma commande",
      "Annuler ma commande",
      "Politique de remboursement"
    ]
  },
  {
    icon: CreditCard,
    title: "Paiement",
    topics: [
      "Modes de paiement",
      "Carte Popote",
      "Problèmes de paiement",
      "Factures"
    ]
  },
  {
    icon: User,
    title: "Compte",
    topics: [
      "Créer un compte",
      "Modifier mon profil",
      "Programme fidélité",
      "Parrainage"
    ]
  },
  {
    icon: Settings,
    title: "Technique",
    topics: [
      "Problèmes d'application",
      "Connexion",
      "Notifications",
      "Mises à jour"
    ]
  }
];

export default function Help() {
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex p-4 bg-orange-100 rounded-full mb-6">
            <HelpCircle className="h-8 w-8 text-orange-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Centre d'aide
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comment pouvons-nous vous aider aujourd'hui ?
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une réponse..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Help Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {helpCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center mb-6">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <category.icon className="h-6 w-6 text-orange-500" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 ml-4">
                  {category.title}
                </h2>
              </div>
              <ul className="space-y-4">
                {category.topics.map((topic, topicIndex) => (
                  <li key={topicIndex}>
                    <button className="flex items-center justify-between w-full text-left text-gray-600 hover:text-gray-900">
                      <span>{topic}</span>
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Book,
              title: "Guide d'utilisation",
              description: "Apprenez à utiliser toutes nos fonctionnalités"
            },
            {
              icon: MessageCircle,
              title: "Chat en direct",
              description: "Discutez avec notre équipe support"
            },
            {
              icon: Clock,
              title: "Historique",
              description: "Consultez vos demandes précédentes"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm text-center"
            >
              <div className="inline-flex p-3 bg-orange-100 rounded-lg mb-4">
                <item.icon className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-orange-50 rounded-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Besoin d'aide supplémentaire ?
            </h2>
            <p className="text-gray-600">
              Notre équipe est disponible 24/7 pour vous aider
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center justify-center p-6 bg-white rounded-xl">
              <Phone className="h-6 w-6 text-orange-500 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Par téléphone</p>
                <p className="text-gray-600">+225 XX XX XX XX</p>
              </div>
            </div>
            <div className="flex items-center justify-center p-6 bg-white rounded-xl">
              <Mail className="h-6 w-6 text-orange-500 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Par email</p>
                <p className="text-gray-600">support@popote.ci</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}