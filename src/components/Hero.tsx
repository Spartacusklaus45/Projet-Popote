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
  ArrowRight
} from 'lucide-react';

const floatingIcons = [
  { icon: ChefHat, color: "text-orange-500 dark:text-orange-400", size: "h-12 w-12" },
  { icon: UtensilsCrossed, color: "text-green-500 dark:text-green-400", size: "h-10 w-10" },
  { icon: Coffee, color: "text-yellow-600 dark:text-yellow-500", size: "h-8 w-8" },
  { icon: Salad, color: "text-green-600 dark:text-green-500", size: "h-14 w-14" },
  { icon: Apple, color: "text-red-500 dark:text-red-400", size: "h-9 w-9" },
  { icon: Beef, color: "text-red-600 dark:text-red-500", size: "h-11 w-11" },
  { icon: Fish, color: "text-blue-500 dark:text-blue-400", size: "h-10 w-10" },
  { icon: Soup, color: "text-yellow-500 dark:text-yellow-400", size: "h-12 w-12" },
  { icon: Cookie, color: "text-amber-600 dark:text-amber-500", size: "h-8 w-8" },
  { icon: Sandwich, color: "text-yellow-700 dark:text-yellow-600", size: "h-10 w-10" },
  { icon: Pizza, color: "text-red-500 dark:text-red-400", size: "h-11 w-11" }
];

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-b from-green-200 via-yellow-100 to-orange-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 pt-20 overflow-hidden">
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div 
            className="space-y-8 text-green-900 dark:text-gray-100 relative z-10"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1
              className="text-5xl font-extrabold mb-6 gradient-text"
              animate={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Découvrez une nouvelle dimension de la cuisine
            </motion.h1>

            <motion.p
              className="text-xl mb-8 text-green-800 dark:text-gray-300"
              animate={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            >
              Explorez des ingrédients frais, préparez des plats aux saveurs authentiques,
              et faites vivre une expérience culinaire unique avec Popote.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                className="btn-primary group"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Commencer</span>
                <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
              </motion.button>
              <motion.button
                className="btn-secondary"
                whileHover={{ scale: 1.05, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Voir les menus</span>
              </motion.button>
            </div>
          </motion.div>
          
          {/* Image Section */}
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-green-400 to-orange-400 dark:from-purple-600 dark:to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"
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
            <motion.img
              src="https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Cuisine avec Popote"
              className="relative rounded-2xl shadow-2xl transition-all transform group-hover:scale-[1.02] group-hover:rotate-1"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}