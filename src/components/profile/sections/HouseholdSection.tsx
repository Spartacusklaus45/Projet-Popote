import React from 'react';
import { Users, Baby, Dog, Plus, Minus } from 'lucide-react';

interface HouseholdSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export function HouseholdSection({ formData, setFormData }: HouseholdSectionProps) {
  const updateHousehold = (type: 'adults' | 'children' | 'pets', delta: number) => {
    setFormData({
      ...formData,
      household: {
        ...formData.household,
        [type]: Math.max(0, formData.household[type] + delta)
      }
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        Composition du foyer
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { type: 'adults', label: 'Adultes', icon: Users },
          { type: 'children', label: 'Enfants', icon: Baby },
          { type: 'pets', label: 'Animaux', icon: Dog }
        ].map(({ type, label, icon: Icon }) => (
          <div key={type} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Icon className="h-5 w-5 text-gray-500 mr-2" />
                <span className="font-medium">{label}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateHousehold(type as any, -1)}
                  className="p-1 rounded-full hover:bg-gray-200"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center">
                  {formData.household[type]}
                </span>
                <button
                  onClick={() => updateHousehold(type as any, 1)}
                  className="p-1 rounded-full hover:bg-gray-200"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}