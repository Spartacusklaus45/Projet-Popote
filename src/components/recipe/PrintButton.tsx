import React from 'react';
import { motion } from 'framer-motion';
import { Printer } from 'lucide-react';

interface PrintButtonProps {
  onClick: () => void;
  className?: string;
}

export default function PrintButton({ onClick, className = '' }: PrintButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors ${className}`}
    >
      <Printer className="h-5 w-5 mr-2" />
      Imprimer
    </motion.button>
  );
}