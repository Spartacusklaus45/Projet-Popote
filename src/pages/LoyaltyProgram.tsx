import React from 'react';
import { motion } from 'framer-motion';
import { 
  Gift, 
  Star, 
  Award, 
  TrendingUp, 
  ChevronRight,
  ShoppingBag,
  Calendar,
  CreditCard
} from 'lucide-react';
import PopoteCard from '../components/card/PopoteCard';

const levels = [
  {
    name: "Bronze",
    points: "0 - 5,000",
    benefits: [
      "5% de réduction sur les commandes",
      "Livraison standard gratuite",
      "Accès aux offres spéciales"
    ],
    color: "from-amber-500 to-amber-700"
  },
  {
    name: "Argent",
    points: "5,000 - 15,000",
    benefits: [
      "10% de réduction sur les commandes",
      "Livraison express gratuite",
      "Accès prioritaire aux nouvelles recettes",
      "Support client prioritaire"
    ],
    color: "from-gray-300 to-gray-500"
  },
  {
    name: "Or",
    points: "15,000+",
    benefits: [
      "15% de réduction sur les commandes",
      "Livraison express gratuite",
      "Accès VIP aux événements",
      "Cadeaux d'anniversaire exclusifs",
      "Concierge personnel"
    ],
    color: "from-yellow-400 to-yellow-600"
  }
];

const rewards = [
  {
    points: 1000,
    title: "Livraison gratuite",
    description: "Sur votre prochaine commande"
  },
  {
    points: 2500,
    title: "-15% sur votre commande",
    description: "Valable une fois"
  },
  {
    points: 5000,
    title: "Box surprise",
    description: "Produits exclusifs"
  }
];

export default function LoyaltyProgram() {
  const handleRecharge = async () => {
    // Handled by PopoteCard component
  };

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
            Programme Fidélité Popote
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gagnez des points et profitez d'avantages exclusifs à chaque commande
          </p>
        </motion.div>

        {/* Popote Card */}
        <div className="mb-16">
          <PopoteCard showActions onRecharge={handleRecharge} />
        </div>

        {/* Levels */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Niveaux et avantages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {levels.map((level, index) => (
              <motion.div
                key={level.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className={`bg-gradient-to-r ${level.color} p-6 text-white`}>
                  <h3 className="text-xl font-bold mb-2">{level.name}</h3>
                  <p className="text-white/80">{level.points} points</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {level.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <Star className="h-5 w-5 text-yellow-400 mr-2" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How to Earn Points */}
        <div className="bg-orange-50 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Comment gagner des points ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: ShoppingBag,
                title: "Commandez",
                description: "1 point par tranche de 100 FCFA"
              },
              {
                icon: Calendar,
                title: "Abonnez-vous",
                description: "Points doublés sur les abonnements"
              },
              {
                icon: Gift,
                title: "Parrainez",
                description: "1000 points par filleul actif"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <item.icon className="h-6 w-6 text-orange-500" />
                  </div>
                  <h3 className="ml-3 text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Available Rewards */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Récompenses disponibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rewards.map((reward, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Gift className="h-6 w-6 text-orange-500" />
                  </div>
                  <span className="text-sm font-medium text-orange-500">
                    {reward.points} points
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {reward.title}
                </h3>
                <p className="text-gray-600 mb-4">{reward.description}</p>
                <button className="w-full py-2 bg-orange-100 text-orange-500 rounded-lg hover:bg-orange-200 transition-colors">
                  Échanger
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-12 text-white"
        >
          <h2 className="text-3xl font-bold mb-4">
            Commencez à gagner des points dès maintenant
          </h2>
          <p className="text-lg text-orange-100 mb-8">
            Inscrivez-vous et recevez 500 points de bienvenue !
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-white text-orange-500 rounded-full font-semibold hover:bg-orange-50 transition-colors"
          >
            Créer un compte
            <ChevronRight className="ml-2 h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}