import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Gift, Ticket, ArrowRight, Calendar, ChevronRight } from 'lucide-react';

export default function LoyaltyCard() {
  const [balance, setBalance] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // Effet de mouvement 3D au survol
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Card Preview with 3D effect */}
      <motion.div
        className="relative h-64 cursor-pointer perspective-1000"
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          className={`absolute inset-0 w-full h-full rounded-2xl transform-style-3d transition-transform duration-500 ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front of the card */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <div className="w-full h-full bg-gradient-to-br from-orange-500 via-orange-400 to-orange-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-gradient-shift" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">Carte Popote</h3>
                    <p className="text-orange-100">**** **** **** 4242</p>
                  </div>
                  <CreditCard className="h-8 w-8" />
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm text-orange-100 mb-1">Solde disponible</p>
                    <motion.p 
                      className="text-3xl font-bold"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {balance.toLocaleString()} FCFA
                    </motion.p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-orange-100 mb-1">Expire le</p>
                    <p className="font-medium">12/24</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back of the card */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-white shadow-xl">
              <div className="h-12 bg-gray-700 -mx-8 mb-8" />
              <p className="text-sm text-gray-400 mb-2">Code de sécurité</p>
              <p className="font-mono text-lg mb-8">***</p>
              <p className="text-xs text-gray-400">
                Cette carte est la propriété de Popote. L'utilisation est soumise aux conditions générales.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Gift, label: 'Voir les récompenses', value: '3 disponibles' },
          { icon: Ticket, label: 'Coupons actifs', value: '2 coupons' },
          { icon: Calendar, label: 'Prochaine expiration', value: '15 mars 2024' }
        ].map((action, index) => (
          <motion.button
            key={index}
            className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-50 rounded-lg text-orange-500">
                <action.icon className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-600">{action.label}</p>
                <p className="font-medium text-gray-900">{action.value}</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
          </motion.button>
        ))}
      </div>

      {/* Usage Rules */}
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Conditions d'utilisation</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2" />
            <p className="text-gray-600">Montant minimum d'achat : 5 000 FCFA</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2" />
            <p className="text-gray-600">Valable uniquement sur les produits éligibles</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2" />
            <p className="text-gray-600">Les coupons sont valables pendant un mois</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2" />
            <p className="text-gray-600">Cumulable avec d'autres promotions</p>
          </div>
        </div>
      </div>
    </div>
  );
}