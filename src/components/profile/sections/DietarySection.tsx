import React from 'react';
import { Leaf, Ban } from 'lucide-react';

interface DietarySectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

const dietaryRestrictions = [
  { id: 'vegetarian', label: 'Végétarien', icon: Leaf },
  { id: 'vegan', label: 'Végétalien', icon: Leaf },
  { id: 'no-pork', label: 'Sans porc', icon: Ban },
  { id: 'gluten-free', label: 'Sans gluten', icon: Ban },
  { id: 'lactose-free', label: 'Sans lactose', icon: Ban },
  { id: 'nut-free', label: 'Sans cacahouète', icon: Ban }
];

export function DietarySection({ formData, setFormData }: DietarySectionProps) {
  const toggleDiet = (dietId: string) => {
    setFormData({
      ...formData,
      diets: formData.diets.includes(dietId)
        ? formData.diets.filter((d: string) => d !== dietId)
        : [...formData.diets, dietId]
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        Régimes alimentaires
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {dietaryRestrictions.map((diet) => (
          <button
            key={diet.id}
            onClick={() => toggleDiet(diet.id)}
            className={`flex items-center p-3 rounded-lg border ${
              formData.diets.includes(diet.id)
                ? 'border-orange-500 bg-orange-50 text-orange-700'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <diet.icon className="h-5 w-5 mr-2" />
            <span>{diet.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}