import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Gift, Star, ChefHat } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Inscription réussie à la newsletter !');
      setEmail('');
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-orange-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url('/images/motif-ustensiles.png')] opacity-5" />

          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Content */}
              <div className="p-8 lg:p-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    Rejoignez la communauté Popote
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                    Recevez nos meilleures recettes, conseils culinaires et offres exclusives directement dans votre boîte mail.
                  </p>

                  <div className="space-y-6 mb-8">
                    {[
                      { icon: Gift, text: "Recevez 20% de réduction sur votre première commande" },
                      { icon: Star, text: "Accédez en avant-première à nos nouvelles recettes" },
                      { icon: ChefHat, text: "Profitez de conseils exclusifs de nos chefs" }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                          <item.icon className="h-5 w-5 text-orange-500 dark:text-orange-400" />
                        </div>
                        <span className="text-gray-600 dark:text-gray-400">{item.text}</span>
                      </motion.div>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Votre adresse email"
                        className="w-full px-6 py-4 rounded-lg border-gray-300 dark:border-gray-600 focus:border-orange-500 dark:focus:border-orange-400 focus:ring-orange-500 dark:focus:ring-orange-400"
                        required
                      />
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-600 dark:to-pink-600 text-white rounded-lg hover:from-orange-600 hover:to-pink-600 dark:hover:from-orange-700 dark:hover:to-pink-700 transition-all duration-300"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      S'inscrire à la newsletter
                    </motion.button>
                  </form>
                </motion.div>
              </div>

              {/* Image */}
              <div className="hidden lg:block relative">
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d"
                  alt="Cuisine"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-pink-500/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}