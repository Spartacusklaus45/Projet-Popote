import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Search, Filter, Tag } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    question: "Comment fonctionne Popote ?",
    answer: "Popote vous permet de choisir des recettes, de personnaliser vos portions et de recevoir tous les ingrédients nécessaires directement chez vous. Vous pouvez commander à l'unité ou vous abonner pour des livraisons régulières.",
    category: "Général"
  },
  {
    question: "Quels sont les délais de livraison ?",
    answer: "Nous proposons une livraison express en 24h pour les commandes passées avant 18h. Pour les autres commandes, la livraison est effectuée sous 48-72h selon votre zone géographique.",
    category: "Livraison"
  },
  {
    question: "Comment fonctionne la Carte Popote ?",
    answer: "La Carte Popote est notre programme de fidélité qui vous permet d'accumuler des points sur vos achats. Ces points peuvent être convertis en réductions sur vos prochaines commandes.",
    category: "Paiement"
  },
  {
    question: "Puis-je modifier ou annuler ma commande ?",
    answer: "Vous pouvez modifier ou annuler votre commande jusqu'à 24h avant la livraison prévue. Passé ce délai, contactez notre service client pour toute demande spécifique.",
    category: "Commandes"
  },
  {
    question: "Les ingrédients sont-ils frais ?",
    answer: "Oui, tous nos ingrédients sont sélectionnés chaque matin auprès de nos partenaires locaux pour garantir une fraîcheur optimale.",
    category: "Qualité"
  },
  {
    question: "Comment sont calculés les points de fidélité ?",
    answer: "Vous gagnez 1 point pour chaque tranche de 1000 FCFA d'achat. Les points sont automatiquement crédités sur votre compte après chaque commande.",
    category: "Fidélité"
  },
  {
    question: "Que faire si je ne suis pas satisfait ?",
    answer: "Nous avons une politique de satisfaction garantie. Si vous n'êtes pas satisfait, contactez-nous dans les 24h suivant la livraison et nous vous rembourserons ou remplacerons les produits concernés.",
    category: "Service Client"
  },
  {
    question: "Comment devenir partenaire ?",
    answer: "Pour devenir partenaire, remplissez le formulaire dans la section Partenaires de notre site. Notre équipe vous contactera sous 48h pour discuter des opportunités de collaboration.",
    category: "Partenariat"
  }
];

const categories = ["Tous", "Général", "Livraison", "Paiement", "Commandes", "Qualité", "Fidélité", "Service Client", "Partenariat"];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Questions fréquentes
          </h1>
          <p className="text-xl text-gray-600">
            Trouvez rapidement des réponses à vos questions
          </p>
        </motion.div>

        {/* Search & Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                  <div className="mt-4 flex items-center">
                    <Tag className="h-4 w-4 text-orange-500 mr-2" />
                    <span className="text-sm text-orange-500">{faq.category}</span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-orange-50 rounded-xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Vous n'avez pas trouvé votre réponse ?
          </h2>
          <p className="text-gray-600 mb-6">
            Notre équipe de support est là pour vous aider
          </p>
          <button className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
            Contacter le support
          </button>
        </motion.div>
      </div>
    </div>
  );
}