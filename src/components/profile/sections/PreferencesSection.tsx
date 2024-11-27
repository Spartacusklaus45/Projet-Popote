import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface PreferencesSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

const commonIngredients = [
  'Tomates', 'Oignons', 'Ail', 'Poivrons', 'Carottes', 'Pommes de terre',
  'Poulet', 'Poisson', 'Bœuf', 'Champignons', 'Courgettes', 'Aubergines'
];

export function PreferencesSection({ formData, setFormData }: PreferencesSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDislike = (ingredient: string) => {
    setFormData({
      ...formData,
      dislikes: formData.dislikes.includes(ingredient)
        ? formData.dislikes.filter((d: string) => d !== ingredient)
        : [...formData.dislikes, ingredient]
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        Ingrédients non désirés
      </h3>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher un ingrédient..."
          className="pl-10 w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {commonIngredients
          .filter(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((ingredient) => (
            <button
              key={ingredient}
              onClick={() => toggleDislike(ingredient)}
              className={`flex items-center px-3 py-1 rounded-full ${
                formData.dislikes.includes(ingredient)
                  ? 'bg-red-100 text-red-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {ingredient}
              {formData.dislikes.includes(ingredient) && (
                <X className="h-4 w-4 ml-1" />
              )}
            </button>
          ))}
      </div>
    </div>
  );
}