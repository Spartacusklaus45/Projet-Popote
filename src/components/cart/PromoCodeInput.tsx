import React from 'react';
import { Tag } from 'lucide-react';
import { motion } from 'framer-motion';

interface PromoCodeInputProps {
  promoCode: string;
  setPromoCode: (code: string) => void;
}

export default function PromoCodeInput({ promoCode, setPromoCode }: PromoCodeInputProps) {
  const [isValid, setIsValid] = React.useState<boolean | null>(null);

  const handleApplyCode = () => {
    const isValidCode = promoCode === 'POPOTE20';
    setIsValid(isValidCode);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6 transition-colors duration-300">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
        Code promo
      </h3>
      <div className="flex space-x-4">
        <div className="relative flex-grow">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            placeholder="Entrez votre code promo"
            className="pl-10 w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-orange-500 dark:focus:border-orange-400 focus:ring-orange-500 dark:focus:ring-orange-400 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
        <motion.button
          onClick={handleApplyCode}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-600 dark:to-pink-600 text-white rounded-lg hover:from-orange-600 hover:to-pink-600 dark:hover:from-orange-700 dark:hover:to-pink-700 transition-all duration-300 shadow-lg"
        >
          Appliquer
        </motion.button>
      </div>
      {isValid !== null && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-2 text-sm ${
            isValid 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-red-600 dark:text-red-400'
          }`}
        >
          {isValid ? 'Code promo appliqué avec succès !' : 'Code promo invalide'}
        </motion.p>
      )}
    </div>
  );
}