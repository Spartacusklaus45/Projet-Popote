import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import PopoteCard from '../../components/card/PopoteCard';
import { useLoyalty } from '../../contexts/LoyaltyContext';
import toast from 'react-hot-toast';

export default function PaymentMethods() {
  const handleRecharge = async () => {
    try {
      // Handled by PopoteCard component
      toast.success('Carte rechargée avec succès');
    } catch (error) {
      toast.error('Erreur lors du rechargement');
    }
  };

  return (
    <div className="space-y-8">
      {/* Carte Popote */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Carte Popote
          </h3>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm">
              Active
            </span>
          </div>
        </div>

        <PopoteCard 
          showActions 
          onRecharge={handleRecharge}
          className="mb-6"
        />

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100">
                Sécurité renforcée
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                Votre carte est protégée par un système de sécurité avancé. Les transactions sont chiffrées et surveillées en temps réel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}