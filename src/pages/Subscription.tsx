import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar,
  Users,
  Clock,
  ShoppingBag,
  Check,
  Star,
  Shield,
  Truck,
  ChefHat,
  CreditCard,
  Building2,
  Repeat,
  Gift,
  Heart
} from 'lucide-react';
import SubscriptionPlanCard from '../components/subscription/SubscriptionPlanCard';
import CustomPlanBuilder from '../components/subscription/CustomPlanBuilder';
import MeatSubscription from '../components/subscription/MeatSubscription';
import PaymentModal from '../components/subscription/PaymentModal';

const plans = [
  {
    id: 'starter',
    name: 'Découverte',
    price: 25000,
    frequency: 'semaine',
    features: [
      '3 repas par semaine',
      'Pour 2 personnes',
      'Recettes simples',
      'Livraison gratuite',
      'Annulation flexible'
    ],
    popular: false
  },
  {
    id: 'family',
    name: 'Famille',
    price: 45000,
    frequency: 'semaine',
    features: [
      '5 repas par semaine',
      'Pour 4 personnes',
      'Recettes variées',
      'Livraison prioritaire',
      'Ingrédients premium',
      'Support dédié'
    ],
    popular: true
  },
  {
    id: 'gourmet',
    name: 'Gourmet',
    price: 35000,
    frequency: 'semaine',
    features: [
      '4 repas par semaine',
      'Pour 2 personnes',
      'Recettes gastronomiques',
      'Ingrédients bio',
      'Accès aux recettes exclusives',
      'Service conciergerie'
    ],
    popular: false
  }
];

const features = [
  {
    icon: Calendar,
    title: "Flexibilité totale",
    description: "Modifiez ou suspendez votre abonnement à tout moment"
  },
  {
    icon: Users,
    title: "Pour toute la famille",
    description: "Des portions adaptées à vos besoins"
  },
  {
    icon: Truck,
    title: "Livraison gratuite",
    description: "Incluse dans tous nos abonnements"
  },
  {
    icon: Shield,
    title: "Sans engagement",
    description: "Annulez quand vous voulez"
  },
  {
    icon: Gift,
    title: "Récompenses",
    description: "Cumulez des points fidélité"
  },
  {
    icon: Heart,
    title: "Satisfaction garantie",
    description: "Ou remboursé"
  }
];

export default function Subscription() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [activeTab, setActiveTab] = useState('meal-plans');

  const handleSubscribe = (plan) => {
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="relative mb-16">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d"
              alt="Abonnement Popote"
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
              Abonnements Popote
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-orange-100 max-w-2xl mx-auto"
            >
              Des repas délicieux livrés à votre porte, selon votre rythme
            </motion.p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 text-center shadow-sm"
            >
              <div className="inline-flex p-3 bg-orange-100 rounded-lg mb-4">
                <feature.icon className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-12">
          <button
            onClick={() => setActiveTab('meal-plans')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'meal-plans'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Paniers repas
          </button>
          <button
            onClick={() => setActiveTab('meat-plans')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'meat-plans'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Viandes & Volailles
          </button>
          <button
            onClick={() => setActiveTab('custom-plan')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'custom-plan'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Plan personnalisé
          </button>
        </div>

        {/* Content */}
        {activeTab === 'meal-plans' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <SubscriptionPlanCard
                key={plan.id}
                plan={plan}
                onSubscribe={() => handleSubscribe(plan)}
                delay={index * 0.1}
              />
            ))}
          </div>
        )}

        {activeTab === 'meat-plans' && (
          <MeatSubscription onSubscribe={handleSubscribe} />
        )}

        {activeTab === 'custom-plan' && (
          <CustomPlanBuilder onSubscribe={handleSubscribe} />
        )}

        {/* Trust Badges */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Shield,
              title: "Paiement sécurisé",
              description: "Transactions cryptées et sécurisées"
            },
            {
              icon: Repeat,
              title: "Flexibilité maximale",
              description: "Modifiez ou annulez à tout moment"
            },
            {
              icon: Star,
              title: "Satisfaction garantie",
              description: "Remboursement si vous n'êtes pas satisfait"
            }
          ].map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center space-x-4 p-6 bg-white rounded-xl shadow-sm"
            >
              <div className="flex-shrink-0">
                <badge.icon className="h-8 w-8 text-orange-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {badge.title}
                </h3>
                <p className="text-gray-600">
                  {badge.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        plan={selectedPlan}
      />
    </div>
  );
}