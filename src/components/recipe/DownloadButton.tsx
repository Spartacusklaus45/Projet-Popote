import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
  onClick: () => void;
  className?: string;
}

export default function DownloadButton({ onClick, className = '' }: DownloadButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors ${className}`}
    >
      <Download className="h-5 w-5 mr-2" />
      Télécharger PDF
    </motion.button>
  );
}