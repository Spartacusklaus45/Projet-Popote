import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChefHat, 
  Coffee, 
  Salad, 
  Fish, 
  Beef, 
  Cookie,
  Pizza,
  Soup
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: keyof typeof icons;
  count: number;
}

const icons = {
  ChefHat,
  Coffee,
  Salad,
  Fish,
  Beef,
  Cookie,
  Pizza,
  Soup
};

interface RecipeCategoriesProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export default function RecipeCategories({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: RecipeCategoriesProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Catégories de recettes
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => {
          const Icon = icons[category.icon];
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectCategory(category.id)}
              className={`p-4 rounded-xl border-2 transition-colors ${
                selectedCategory === category.id
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-orange-200'
              }`}
            >
              <div className="flex flex-col items-center">
                <Icon className={`h-8 w-8 mb-2 ${
                  selectedCategory === category.id
                    ? 'text-orange-500'
                    : 'text-gray-500'
                }`} />
                <span className="font-medium text-gray-900">
                  {category.name}
                </span>
                <span className="text-sm text-gray-500">
                  {category.count} recettes
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}