import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface ReviewStatsProps {
  ratings: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  totalReviews: number;
  averageRating: number;
}

export default function ReviewStats({ ratings, totalReviews, averageRating }: ReviewStatsProps) {
  const calculatePercentage = (count: number) => {
    return totalReviews > 0 ? (count / totalReviews) * 100 : 0;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center mb-2">
            <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              {averageRating.toFixed(1)}
            </span>
            <div className="flex ml-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= averageRating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">{totalReviews} avis</p>
        </div>
      </div>

      <div className="space-y-3">
        {[5, 4, 3, 2, 1].map((stars) => (
          <div key={stars} className="flex items-center">
            <div className="flex items-center w-20">
              <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">{stars}</span>
              <Star className="h-4 w-4 text-yellow-400" />
            </div>
            <div className="flex-grow">
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${calculatePercentage(ratings[stars])}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-yellow-400"
                />
              </div>
            </div>
            <span className="w-16 text-right text-sm text-gray-600 dark:text-gray-400">
              {calculatePercentage(ratings[stars]).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}