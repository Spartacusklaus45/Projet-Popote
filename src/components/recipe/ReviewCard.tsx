import React from 'react';
import { motion } from 'framer-motion';
import { User, ThumbsUp, MessageCircle } from 'lucide-react';
import RatingStars from './RatingStars';

interface ReviewCardProps {
  review: {
    id: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    comment: string;
    date: string;
    helpful: number;
    isHelpful?: boolean;
    images?: string[];
  };
  onHelpful: (reviewId: string) => void;
  onReply: (reviewId: string) => void;
}

export default function ReviewCard({ review, onHelpful, onReply }: ReviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {review.userAvatar ? (
            <img
              src={review.userAvatar}
              alt={review.userName}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-gray-400 dark:text-gray-500" />
            </div>
          )}
          <div className="ml-4">
            <h4 className="font-medium text-gray-900 dark:text-gray-100">{review.userName}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{review.date}</p>
          </div>
        </div>
        <RatingStars rating={review.rating} size="sm" />
      </div>

      <p className="mt-4 text-gray-600 dark:text-gray-300">{review.comment}</p>

      {/* Images de l'avis */}
      {review.images && review.images.length > 0 && (
        <div className="mt-4 flex gap-4">
          {review.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Review ${index + 1}`}
              className="w-24 h-24 object-cover rounded-lg"
            />
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onHelpful(review.id)}
          className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-colors ${
            review.isHelpful
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <ThumbsUp className="h-4 w-4" />
          <span>{review.helpful}</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onReply(review.id)}
          className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          <MessageCircle className="h-4 w-4 mr-1" />
          <span>Répondre</span>
        </motion.button>
      </div>
    </motion.div>
  );
}