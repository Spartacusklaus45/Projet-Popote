import React from 'react';
import { motion } from 'framer-motion';
import { Star, Image as ImageIcon } from 'lucide-react';

interface ReviewFiltersProps {
  onFilterChange: (filters: {
    rating: number | null;
    hasImages: boolean;
    sortBy: 'recent' | 'helpful';
  }) => void;
}

export default function ReviewFilters({ onFilterChange }: ReviewFiltersProps) {
  const [activeRating, setActiveRating] = React.useState<number | null>(null);
  const [showImages, setShowImages] = React.useState(false);
  const [sortBy, setSortBy] = React.useState<'recent' | 'helpful'>('recent');

  const handleFilterChange = (
    rating: number | null = activeRating,
    hasImages: boolean = showImages,
    sort: 'recent' | 'helpful' = sortBy
  ) => {
    setActiveRating(rating);
    setShowImages(hasImages);
    setSortBy(sort);
    onFilterChange({ rating, hasImages, sortBy: sort });
  };

  return (
    <div className="bg-white rounded-xl p-4 mb-6">
      {/* Note minimale */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Note minimale
        </h4>
        <div className="flex space-x-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <motion.button
              key={rating}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleFilterChange(
                activeRating === rating ? null : rating,
                showImages,
                sortBy
              )}
              className={`flex items-center px-3 py-1 rounded-full ${
                activeRating === rating
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Star className="h-4 w-4 mr-1" />
              {rating}+
            </motion.button>
          ))}
        </div>
      </div>

      {/* Filtres supplémentaires */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => handleFilterChange(activeRating, !showImages, sortBy)}
          className={`flex items-center px-3 py-1 rounded-full ${
            showImages
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <ImageIcon className="h-4 w-4 mr-1" />
          <span>Avec photos</span>
        </button>

        <select
          value={sortBy}
          onChange={(e) => handleFilterChange(
            activeRating,
            showImages,
            e.target.value as 'recent' | 'helpful'
          )}
          className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 border-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="recent">Plus récents</option>
          <option value="helpful">Plus utiles</option>
        </select>
      </div>
    </div>
  );
}