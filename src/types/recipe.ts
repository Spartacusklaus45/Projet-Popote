export interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  duration: string;
  servings: number;
  rating: number;
  difficulty: string;
  category: string;
  price: number;
  ingredients: {
    id: string;
    name: string;
    quantity: number;
    unit: string;
    image: string;
    price: number;
  }[];
  steps: {
    id: string;
    description: string;
    duration: number;
    temperature?: number;
    tips?: string[];
    image?: string;
  }[];
  nutrition: {
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
    fiber: number;
    sugar: number;
    sodium: number;
    score: 'A' | 'B' | 'C' | 'D' | 'E';
  };
  reviews: {
    id: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
    helpful: number;
    images?: string[];
  }[];
  tips: string[];
  utensils: {
    name: string;
    icon: 'chef' | 'utensils' | 'pot' | 'flame';
    required: boolean;
    alternative?: string;
  }[];
  tags: string[];
  isFavorite: boolean;
  isPublic: boolean;
  alternatives?: {
    id: string;
    title: string;
    description: string;
    changes: string[];
    author: {
      name: string;
      avatar?: string;
    };
  }[];
}