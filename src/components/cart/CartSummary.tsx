import React from 'react';
import { ArrowRight, Tag, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

interface CartSummaryProps {
  items: any[];
  total: number;
  deliveryFee: number;
  promoCode: string;
  onCheckout: () => void;
}

export default function CartSummary({ 
  items, 
  total, 
  deliveryFee, 
  promoCode, 
  onCheckout 
}: CartSummaryProps) {
  const discount = promoCode === 'POPOTE20' ? total * 0.2 : 0;
  const finalTotal = total + deliveryFee - discount;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 h-fit transition-colors duration-300">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-6">
        Résumé de la commande
      </h3>

      <div className="space-y-4">
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Sous-total</span>
          <span>{total.toLocaleString()} FCFA</span>
        </div>

        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <Truck className="h-5 w-5 mr-2" />
            <span>Livraison</span>
          </div>
          <span>{deliveryFee.toLocaleString()} FCFA</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600 dark:text-green-400">
            <div className="flex items-center">
              <Tag className="h-5 w-5 mr-2" />
              <span>Réduction (20%)</span>
            </div>
            <span>-{discount.toLocaleString()} FCFA</span>
          </div>
        )}

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex justify-between font-semibold text-gray-900 dark:text-gray-100">
            <span>Total</span>
            <span>{finalTotal.toLocaleString()} FCFA</span>
          </div>
        </div>
      </div>

      <motion.button
        onClick={onCheckout}
        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-600 dark:to-pink-600 text-white mt-6 py-3 px-6 rounded-lg hover:from-orange-600 hover:to-pink-600 dark:hover:from-orange-700 dark:hover:to-pink-700 transition-all duration-300 shadow-lg"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>Passer la commande</span>
        <ArrowRight className="h-5 w-5" />
      </motion.button>

      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
        Paiement sécurisé via CinetPay
      </p>
    </div>
  );
}