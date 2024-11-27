import React from 'react';
import { ChefHat, Utensils, CookingPot, UtensilsCrossed, Coffee, Flame } from 'lucide-react';

interface EquipmentSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

const kitchenEquipment = [
  { id: 'oven', label: 'Four', icon: ChefHat },
  { id: 'microwave', label: 'Micro-onde', icon: Utensils },
  { id: 'stove', label: 'Cuisinière', icon: Flame },
  { id: 'mixer', label: 'Mixeur', icon: Coffee },
  { id: 'robot', label: 'Robot cuisinier', icon: CookingPot },
  { id: 'hotplate', label: 'Plaque de cuisson', icon: UtensilsCrossed }
];

export function EquipmentSection({ formData, setFormData }: EquipmentSectionProps) {
  const toggleEquipment = (equipmentId: string) => {
    setFormData({
      ...formData,
      equipment: formData.equipment.includes(equipmentId)
        ? formData.equipment.filter((e: string) => e !== equipmentId)
        : [...formData.equipment, equipmentId]
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        Équipements de cuisine
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {kitchenEquipment.map((equipment) => (
          <button
            key={equipment.id}
            onClick={() => toggleEquipment(equipment.id)}
            className={`flex items-center p-3 rounded-lg border ${
              formData.equipment.includes(equipment.id)
                ? 'border-orange-500 bg-orange-50 text-orange-700'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <equipment.icon className="h-5 w-5 mr-2" />
            <span>{equipment.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}