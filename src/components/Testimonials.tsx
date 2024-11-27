import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Marie K.",
    role: "Cliente satisfaite",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    content: "Popote a changé ma façon de cuisiner. Les recettes sont faciles à suivre et les ingrédients sont toujours frais !",
    rating: 5
  },
  {
    id: 2,
    name: "Jean D.",
    role: "Chef amateur",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    content: "Je découvre de nouvelles recettes chaque semaine. C'est un vrai plaisir de cuisiner avec Popote.",
    rating: 5
  },
  {
    id: 3,
    name: "Sophie M.",
    role: "Mère de famille",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    content: "La livraison est rapide et le service client est excellent. Je recommande vivement !",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Découvrez les expériences de notre communauté
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm relative"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-orange-100 dark:text-gray-800" />
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 dark:text-yellow-500" fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300">{testimonial.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}