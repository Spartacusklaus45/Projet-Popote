import React from 'react';
import { Recipe } from '../../types/recipe';
import { Clock, Users, ChefHat, Star } from 'lucide-react';

interface PrintableRecipeProps {
  recipe: Recipe;
  servings: number;
}

export default function PrintableRecipe({ recipe, servings }: PrintableRecipeProps) {
  return (
    <div className="print:block hidden p-8 bg-white">
      {/* En-tête */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{recipe.title}</h1>
        <div className="flex items-center justify-center space-x-6 text-gray-600">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {recipe.duration}
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {servings} pers.
          </div>
          <div className="flex items-center">
            <ChefHat className="h-4 w-4 mr-1" />
            {recipe.difficulty}
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1 text-yellow-400" />
            {recipe.rating}
          </div>
        </div>
      </div>

      {/* Ingrédients */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingrédients</h2>
        <ul className="space-y-2">
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient.id} className="flex justify-between">
              <span>{ingredient.name}</span>
              <span>
                {(ingredient.quantity * servings / recipe.servings).toFixed(1)} {ingredient.unit}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Instructions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructions</h2>
        <ol className="space-y-4">
          {recipe.steps.map((step, index) => (
            <li key={step.id}>
              <div className="flex items-start">
                <span className="font-bold mr-4">{index + 1}.</span>
                <div>
                  <p>{step.description}</p>
                  {step.duration && (
                    <p className="text-gray-600 text-sm mt-1">
                      Durée : {step.duration} min
                    </p>
                  )}
                  {step.tips && step.tips.length > 0 && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p className="font-medium">Conseils :</p>
                      <ul className="list-disc list-inside">
                        {step.tips.map((tip, tipIndex) => (
                          <li key={tipIndex}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Valeurs nutritionnelles */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Valeurs nutritionnelles</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Par portion :</p>
            <ul className="mt-2 space-y-1">
              <li>Calories : {(recipe.nutrition.calories / servings).toFixed(0)} kcal</li>
              <li>Protéines : {(recipe.nutrition.proteins / servings).toFixed(1)}g</li>
              <li>Glucides : {(recipe.nutrition.carbs / servings).toFixed(1)}g</li>
              <li>Lipides : {(recipe.nutrition.fats / servings).toFixed(1)}g</li>
            </ul>
          </div>
          <div>
            <p className="font-medium">Score nutritionnel :</p>
            <p className="mt-2">{recipe.nutrition.score}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-500 text-sm mt-12 pt-4 border-t">
        <p>Recette générée par Popote - www.popote.ci</p>
        <p>Pour plus de recettes, visitez notre site web</p>
      </div>
    </div>
  );
}