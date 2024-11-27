import React, { useState } from 'react';
import { Star, MessageSquare, ThumbsUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from '../auth/AuthModal';

interface Review {
  id: number;
  user: {
    name: string;
    avatar?: string;
  };
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

interface ReviewSectionProps {
  reviews: Review[];
  recipeId: number;
}

export default function ReviewSection({ reviews, recipeId }: ReviewSectionProps) {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    // Handle review submission
    console.log('Submit review:', newReview);
  };

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">
        Avis et commentaires
      </h3>

      {/* Review Form */}
      <form onSubmit={handleSubmitReview} className="mb-8">
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Votre note
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  className={`p-1 rounded-full ${
                    star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  <Star className="h-6 w-6 fill-current" />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Votre commentaire
            </label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              rows={4}
              className="w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
              placeholder="Partagez votre expérience..."
            />
          </div>

          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Publier
          </button>
        </div>
      </form>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                {review.user.avatar ? (
                  <img
                    src={review.user.avatar}
                    alt={review.user.name}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-500 font-medium">
                      {review.user.name[0]}
                    </span>
                  </div>
                )}
                <div className="ml-4">
                  <div className="font-medium text-gray-900">
                    {review.user.name}
                  </div>
                  <div className="text-sm text-gray-500">{review.date}</div>
                </div>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < review.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="mt-4 text-gray-700">{review.comment}</p>

            <div className="mt-4 flex items-center justify-between">
              <button className="flex items-center text-gray-500 hover:text-gray-700">
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span className="text-sm">Utile ({review.helpful})</span>
              </button>
              <button className="flex items-center text-gray-500 hover:text-gray-700">
                <MessageSquare className="h-4 w-4 mr-1" />
                <span className="text-sm">Répondre</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}