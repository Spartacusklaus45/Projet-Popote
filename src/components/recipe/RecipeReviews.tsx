import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  ThumbsUp, 
  MessageCircle, 
  User,
  Camera,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from '../auth/AuthModal';
import RatingStars from './RatingStars';
import ReviewFilters from './ReviewFilters';
import toast from 'react-hot-toast';

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
  images?: string[];
}

interface RecipeReviewsProps {
  recipeId: number;
  reviews: Review[];
}

export default function RecipeReviews({ recipeId, reviews }: RecipeReviewsProps) {
  const { isAuthenticated, user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    rating: null as number | null,
    hasImages: false,
    sortBy: 'recent' as 'recent' | 'helpful'
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    if (rating === 0) {
      toast.error('Veuillez donner une note');
      return;
    }

    try {
      // Simuler l'envoi de l'avis
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Avis publié avec succès !');
      setRating(0);
      setComment('');
      setImages([]);
    } catch (error) {
      toast.error("Erreur lors de la publication de l'avis");
    }
  };

  const handleLike = (reviewId: string) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    toast.success('Merci pour votre retour !');
  };

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="space-y-8">
      {/* Stats et filtres */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center mb-2">
            <RatingStars rating={averageRating} size="lg" />
            <span className="ml-2 text-2xl font-bold text-gray-900">
              {averageRating.toFixed(1)}
            </span>
          </div>
          <p className="text-gray-600">{reviews.length} avis</p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="text-orange-500 hover:text-orange-600"
        >
          {showFilters ? 'Masquer les filtres' : 'Filtrer les avis'}
        </button>
      </div>

      {showFilters && (
        <ReviewFilters
          onFilterChange={setFilters}
        />
      )}

      {/* Formulaire d'avis */}
      <form onSubmit={handleSubmitReview} className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Donnez votre avis
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Note
            </label>
            <RatingStars
              rating={rating}
              size="lg"
              interactive
              onChange={setRating}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
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

          {/* Upload d'images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ajouter des photos
            </label>
            <div className="flex flex-wrap gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Upload ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setImages(prev => prev.filter((_, i) => i !== index))}
                    className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-md"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              ))}
              <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 cursor-pointer">
                <Camera className="h-8 w-8 text-gray-400" />
                <span className="text-sm text-gray-500">Ajouter</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors"
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
            <div className="flex items-center justify-between">
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
              <RatingStars rating={review.rating} size="sm" />
            </div>

            <p className="text-gray-600 mt-4">{review.comment}</p>

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
              <button
                onClick={() => handleLike(review.id)}
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