import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, MessageCircle, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from '../auth/AuthModal';

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  isHelpful?: boolean;
}

interface ReviewSectionProps {
  recipeId: number;
}

export default function ReviewSection({ recipeId }: ReviewSectionProps) {
  const { isAuthenticated, user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      userId: '1',
      userName: 'Marie K.',
      rating: 5,
      comment: 'Excellente recette, facile à suivre et délicieuse !',
      date: '2024-03-15',
      helpful: 12
    }
  ]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    if (rating === 0) {
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      userId: user!.id,
      userName: user!.name,
      userAvatar: user!.avatar,
      rating,
      comment,
      date: new Date().toISOString(),
      helpful: 0
    };

    setReviews([newReview, ...reviews]);
    setRating(0);
    setComment('');
  };

  const handleHelpful = (reviewId: string) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    setReviews(prev =>
      prev.map(review =>
        review.id === reviewId
          ? { 
              ...review, 
              helpful: review.isHelpful ? review.helpful - 1 : review.helpful + 1,
              isHelpful: !review.isHelpful
            }
          : review
      )
    );
  };

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="space-y-8">
      {/* Résumé des avis */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Avis</h2>
          <p className="text-gray-600">{reviews.length} avis</p>
        </div>
        <div className="flex items-center">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-6 w-6 ${
                  star <= averageRating
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 font-medium text-gray-900">
            {averageRating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Formulaire d'avis */}
      <form onSubmit={handleSubmitReview} className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Donnez votre avis
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Note
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setRating(star)}
                  className="p-1"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </motion.button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Commentaire
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
              placeholder="Partagez votre expérience..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Publier
          </button>
        </div>
      </form>

      {/* Liste des avis */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {review.userAvatar ? (
                  <img
                    src={review.userAvatar}
                    alt={review.userName}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-gray-400" />
                  </div>
                )}
                <div className="ml-4">
                  <h4 className="font-medium text-gray-900">{review.userName}</h4>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= review.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600 mb-4">{review.comment}</p>
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleHelpful(review.id)}
                className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-colors ${
                  review.isHelpful
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{review.helpful}</span>
              </button>
              <button className="flex items-center text-gray-500 hover:text-gray-700">
                <MessageCircle className="h-4 w-4 mr-1" />
                <span>Répondre</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}