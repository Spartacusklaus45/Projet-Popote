import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export default function RatingStars({
  rating,
  size = 'md',
  interactive = false,
  onChange
}: RatingStarsProps) {
  const [hoveredRating, setHoveredRating] = React.useState(0);

  const starSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((value) => (
        <motion.button
          key={value}
          whileHover={{ scale: interactive ? 1.1 : 1 }}
          whileTap={{ scale: interactive ? 0.9 : 1 }}
          className={`${interactive ? 'cursor-pointer' : 'cursor-default'}`}
          onMouseEnter={() => interactive && setHoveredRating(value)}
          onMouseLeave={() => interactive && setHoveredRating(0)}
          onClick={() => interactive && onChange?.(value)}
        >
          <Star
            className={`${starSizes[size]} ${
              value <= (hoveredRating || rating)
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        </motion.button>
      ))}
    </div>
  );
}