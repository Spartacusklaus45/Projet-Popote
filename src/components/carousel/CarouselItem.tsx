import React from 'react';
import { motion } from 'framer-motion';

interface CarouselItemProps {
  children: React.ReactNode;
  isActive?: boolean;
}

export default function CarouselItem({ children, isActive = false }: CarouselItemProps) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{
        scale: isActive ? 1 : 0.9,
        opacity: isActive ? 1 : 0.7
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}