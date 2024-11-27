import { useState, useEffect } from 'react';
import { Recipe } from '../types/recipe';

export function useRecommendations() {
  const [recommendations, setRecommendations] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // Simulate API call with mock data
        const mockRecommendations: Recipe[] = [
          {
            id: 1,
            title: "Poulet Kedjenou",
            image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
            duration: "45 min",
            servings: 4,
            rating: 4.8,
            difficulty: "Facile",
            category: "Plat Ivoirien",
            ingredients: ["Poulet", "Tomates", "Oignons", "Ail"],
            isFavorite: false,
            isRecommended: true,
            matchingPreferences: ["Sans gluten", "Riche en protéines"]
          },
          {
            id: 2,
            title: "Attiéké Poisson",
            image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369",
            duration: "30 min",
            servings: 2,
            rating: 4.9,
            difficulty: "Moyen",
            category: "Plat Ivoirien",
            ingredients: ["Poisson", "Attiéké", "Tomates", "Oignons"],
            isFavorite: false,
            isRecommended: true,
            matchingPreferences: ["Riche en fibres", "Sans lactose"]
          }
        ];

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setRecommendations(mockRecommendations);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return { recommendations, loading, error };
}