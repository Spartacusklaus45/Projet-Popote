import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChefHat, 
  UtensilsCrossed, 
  Coffee,
  Salad,
  Apple,
  Beef,
  Fish,
  Soup,
  Cookie,
  Sandwich,
  Pizza,
  ArrowRight,
  ShoppingBag,
  Calendar,
  Star,
  Heart,
  Users,
  Clock,
  Sparkles,
  Gift,
  Leaf,
  Award,
  TrendingUp
} from 'lucide-react';
import AuthModal from '../components/auth/AuthModal';

const floatingIcons = [
  { icon: ChefHat, color: "text-orange-500", size: "h-12 w-12" },
  { icon: UtensilsCrossed, color: "text-green-500", size: "h-10 w-10" },
  { icon: Coffee, color: "text-yellow-600", size: "h-8 w-8" },
  { icon: Salad, color: "text-green-600", size: "h-14 w-14" },
  { icon: Apple, color: "text-red-500", size: "h-9 w-9" },
  { icon: Beef, color: "text-red-600", size: "h-11 w-11" },
  { icon: Fish, color: "text-blue-500", size: "h-10 w-10" },
  { icon: Soup, color: "text-yellow-500", size: "h-12 w-12" },
  { icon: Cookie, color: "text-amber-600", size: "h-8 w-8" },
  { icon: Sandwich, color: "text-yellow-700", size: "h-10 w-10" },
  { icon: Pizza, color: "text-red-500", size: "h-11 w-11" }
];

const features = [
  {
    icon: ShoppingBag,
    title: "Livraison d'ingrédients",
    description: "Recevez tous les ingrédients frais et pré-dosés directement chez vous"
  },
  {
    icon: Calendar,
    title: "Planning de repas",
    description: "Planifiez vos repas pour la semaine et gagnez du temps"
  },
  {
    icon: Star,
    title: "Recettes exclusives",
    description: "Découvrez des recettes uniques créées par nos chefs"
  },
  {
    icon: Heart,
    title: "Personnalisation",
    description: "Des recommandations adaptées à vos préférences"
  }
];

const stats = [
  { value: "10K+", label: "Utilisateurs actifs" },
  { value: "500+", label: "Recettes disponibles" },
  { value: "98%", label: "Clients satisfaits" },
  { value: "24/7", label: "Support client" }
];

export default function PublicHome() {
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-green-200 via-yellow-100 to-orange-100 pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/motif-ustensiles.png')] opacity-5" />
        
        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {floatingIcons.map((Icon, index) => (
            <motion.div
              key={index}
              className={`absolute ${Icon.color} ${Icon.size}`}
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                rotate: 0,
                opacity: 0
              }}
              animate={{
                x: [
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth
                ],
                y: [
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight
                ],
                rotate: [0, 180, 360],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Icon.icon />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.h1
                className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Cuisinez comme un chef avec Popote
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl mb-8 text-green-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Des recettes délicieuses, des ingrédients frais, livrés chez vous. 
                Découvrez une nouvelle façon de cuisiner.
              </motion.p>
              <motion.button
                onClick={() => setShowAuthModal(true)}
                className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center">
                  Commencer l'aventure
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </motion.button>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-pink-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"
                animate={{
                  scale: [1, 1.02, 1],
                  rotate: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=2000&q=80"
                alt="Cuisine background"
                className="relative rounded-2xl shadow-2xl w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Pourquoi choisir Popote ?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600"
            >
              Une expérience culinaire unique et simplifiée
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-orange-500 to-pink-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-orange-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Comment ça marche ?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600"
            >
              En quelques étapes simples, commencez à cuisiner comme un chef
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "1. Choisissez vos recettes",
                description: "Parcourez notre catalogue et sélectionnez les recettes qui vous plaisent"
              },
              {
                icon: ShoppingBag,
                title: "2. Recevez vos ingrédients",
                description: "Nous livrons tous les ingrédients frais et pré-dosés chez vous"
              },
              {
                icon: ChefHat,
                title: "3. Cuisinez avec plaisir",
                description: "Suivez nos instructions étape par étape et régalez-vous"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-6">
                  <step.icon className="h-10 w-10 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-gray-900 mb-6"
              >
                Les avantages Popote
              </motion.h2>
              <div className="space-y-6">
                {[
                  {
                    icon: Clock,
                    title: "Gagnez du temps",
                    description: "Plus besoin de faire les courses ou de planifier vos repas"
                  },
                  {
                    icon: Leaf,
                    title: "Mangez équilibré",
                    description: "Des recettes nutritives et équilibrées pour toute la famille"
                  },
                  {
                    icon: Gift,
                    title: "Programme fidélité",
                    description: "Cumulez des points et profitez de réductions exclusives"
                  },
                  {
                    icon: Award,
                    title: "Qualité garantie",
                    description: "Ingrédients frais et de saison sélectionnés avec soin"
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <benefit.icon className="h-6 w-6 text-orange-500" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1516824711718-9c1e683412ac?auto=format&fit=crop&w=1000&q=80"
                alt="Cooking benefits"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-orange-500 to-pink-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white mb-6"
          >
            Prêt à commencer l'aventure culinaire ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-orange-100 mb-8"
          >
            Rejoignez des milliers de cuisiniers amateurs et découvrez une nouvelle façon de cuisiner
          </motion.p>
          <motion.button
            onClick={() => setShowAuthModal(true)}
            className="bg-white text-orange-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Commencer maintenant
          </motion.button>
        </div>
      </section>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}