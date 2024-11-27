import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Heart, 
  Clock, 
  Users, 
  Leaf, 
  Globe,
  Star,
  Gift
} from 'lucide-react';

const features = [
  {
    icon: ShoppingBag,
    title: "Panier Express 24H",
    description: "Recevez vos ingrédients en moins de 24h pour des repas improvisés"
  },
  {
    icon: Heart,
    title: "Préférences Personnalisées",
    description: "Adaptez les recettes selon vos goûts et restrictions alimentaires"
  },
  {
    icon: Users,
    title: "Pour Toute la Famille",
    description: "Ajustez facilement les portions selon le nombre de convives"
  },
  {
    icon: Globe,
    title: "Cuisine du Monde",
    description: "Découvrez des recettes ivoiriennes et internationales"
  },
  {
    icon: Leaf,
    title: "Score Écologique",
    description: "Suivez l'impact environnemental de vos choix alimentaires"
  },
  {
    icon: Star,
    title: "Programme Fidélité",
    description: "Cumulez des points et profitez d'avantages exclusifs"
  },
  {
    icon: Clock,
    title: "Planning Hebdomadaire",
    description: "Organisez vos repas pour toute la semaine"
  },
  {
    icon: Gift,
    title: "Parrainage Récompensé",
    description: "Invitez vos amis et gagnez des récompenses"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Tout ce dont vous avez besoin pour bien manger
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Des fonctionnalités pensées pour vous simplifier la vie
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg w-fit mb-4">
                <feature.icon className="h-6 w-6 text-orange-500 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}