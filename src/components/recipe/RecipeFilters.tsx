import React from 'react';
import { motion } from 'framer-motion';
import { 
  Filter, 
  Clock, 
  DollarSign, 
  ChefHat, 
  Heart,
  Star,
  Leaf
} from 'lucide-react';

interface RecipeFiltersProps {
  onFilterChange: (filters: {
    duration: string;
    price: string;
    difficulty: string;
    category: string;
    rating: number;
    dietary: string[];
  }) => void;
}

export default function RecipeFilters({ onFilterChange }: RecipeFiltersProps) {
  const [filters, setFilters] = React.useState({
    duration: '',
    price: '',
    difficulty: '',
    category: '',
    rating: 0,
    dietary: [] as string[]
  });

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDietaryChange = (diet: string) => {
    const newDietary = filters.dietary.includes(diet)
      ? filters.dietary.filter(d => d !== diet)
      : [...filters.dietary, diet];
    
    handleFilterChange('dietary', newDietary);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filtres</h3>
        <Filter className="h-5 w-5 text-gray-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Temps de préparation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>Temps de préparation</span>
            </div>
          </label>
          <select
            value={filters.duration}
            onChange={(e) => handleFilterChange('duration', e.target.value)}
            className="w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
          >
            <option value="">Tous</option>
            <option value="15">15 minutes max</option>
            <option value="30">30 minutes max</option>
            <option value="45">45 minutes max</option>
            <option value="60">1 heure max</option>
          </select>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <span>Budget</span>
            </div>
          </label>
          <select
            value={filters.price}
            onChange={(e) => handleFilterChange('price', e.target.value)}
            className="w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
          >
            <option value="">Tous</option>
            <option value="5000">Moins de 5 000 FCFA</option>
            <option value="10000">Moins de 10 000 FCFA</option>
            <option value="15000">Moins de 15 000 FCFA</option>
          </select>
        </div>

        {/* Difficulté */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center space-x-2">
              <ChefHat className="h-4 w-4 text-gray-500" />
              <span>Difficulté</span>
            </div>
          </label>
          <select
            value={filters.difficulty}
            onChange={(e) => handleFilterChange('difficulty', e.target.value)}
            className="w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
          >
            <option value="">Tous</option>
            <option value="easy">Facile</option>
            <option value="medium">Moyen</option>
            <option value="hard">Difficile</option>
          </select>
        </div>

        {/* Note minimale */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-gray-500" />
              <span>Note minimale</span>
            </div>
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <motion.button
                key={rating}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleFilterChange('rating', rating)}
                className={`p-2 rounded-lg ${
                  filters.rating === rating
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {rating}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Régimes alimentaires */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center space-x-2">
              <Leaf className="h-4 w-4 text-gray-500" />
              <span>Régimes alimentaires</span>
            </div>
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              'Végétarien',
              'Végétalien',
              'Sans gluten',
              'Sans lactose',
              'Halal',
              'Casher'
            ].map((diet) => (
              <motion.button
                key={diet}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDietaryChange(diet)}
                className={`px-4 py-2 rounded-lg ${
                  filters.dietary.includes(diet)
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {diet}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end mt-6 space-x-4">
        <button
          onClick={() => {
            setFilters({
              duration: '',
              price: '',
              difficulty: '',
              category: '',
              rating: 0,
              dietary: []
            });
            onFilterChange({
              duration: '',
              price: '',
              difficulty: '',
              category: '',
              rating: 0,
              dietary: []
            });
          }}
          className="px-4 py-2 text-gray-600 hover:text-gray-900"
        >
          Réinitialiser
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Appliquer les filtres
        </motion.button>
      </div>
    </div>
  );
}