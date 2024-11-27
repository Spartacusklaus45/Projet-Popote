import React, { useState } from 'react';
import { Search, Plus, X, ChefHat, ShoppingBag, ArrowRight } from 'lucide-react';

interface Ingredient {
  id: string;
  name: string;
}

interface Recipe {
  id: number;
  title: string;
  image: string;
  matchingIngredients: number;
  totalIngredients: number;
  missingIngredients: string[];
  duration: string;
  difficulty: string;
}

export default function FridgeCooking() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: 1,
      title: "Poulet Kedjenou",
      image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
      matchingIngredients: 4,
      totalIngredients: 6,
      missingIngredients: ["Tomates", "Piment"],
      duration: "45 min",
      difficulty: "Facile"
    }
  ]);

  const addIngredient = () => {
    if (inputValue.trim()) {
      setIngredients([...ingredients, { id: Date.now().toString(), name: inputValue.trim() }]);
      setInputValue('');
    }
  };

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
  };

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <ChefHat className="h-16 w-16 text-orange-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cuisine avec ton frigo !
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Entrez les ingrédients disponibles dans votre frigo et découvrez les recettes que vous pouvez préparer.
          </p>
        </div>

        {/* Ingredient Input */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex gap-4 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
                placeholder="Entrez un ingrédient..."
                className="pl-10 pr-4 py-3 w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <button
              onClick={addIngredient}
              className="flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Ajouter
            </button>
          </div>

          {/* Ingredient Tags */}
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ingredient) => (
              <span
                key={ingredient.id}
                className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-700"
              >
                {ingredient.name}
                <button
                  onClick={() => removeIngredient(ingredient.id)}
                  className="ml-2 p-1 hover:bg-orange-200 rounded-full"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Recipe Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{recipe.title}</h3>
                
                {/* Ingredient Match Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Ingrédients disponibles</span>
                    <span>{recipe.matchingIngredients}/{recipe.totalIngredients}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: `${(recipe.matchingIngredients / recipe.totalIngredients) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Missing Ingredients */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Ingrédients manquants :</p>
                  <div className="flex flex-wrap gap-2">
                    {recipe.missingIngredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recipe Info */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>{recipe.duration}</span>
                  <span>{recipe.difficulty}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 btn btn-primary">
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Commander
                  </button>
                  <button className="flex-1 btn btn-secondary">
                    Voir la recette
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}