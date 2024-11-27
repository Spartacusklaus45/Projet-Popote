import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Baby, 
  ChefHat, 
  Utensils, 
  CookingPot, 
  Coffee,
  Microwave,
  Flame,
  Salad,
  Fish,
  Beef,
  Wheat,
  Milk,
  Egg
} from 'lucide-react';
import { useMealPlanning } from '../../contexts/MealPlanningContext';

interface IconButtonProps {
  icon: React.ElementType;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const IconButton = ({ icon: Icon, label, isSelected, onClick }: IconButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex flex-col items-center p-4 rounded-xl transition-colors ${
      isSelected 
        ? 'bg-orange-100 text-orange-600 border-2 border-orange-500'
        : 'bg-white border-2 border-gray-200 hover:bg-gray-50'
    }`}
  >
    <Icon className="h-8 w-8 mb-2" />
    <span className="text-sm font-medium">{label}</span>
  </motion.button>
);

export default function PlanningConfig({ onConfigChange }: { onConfigChange: (config: any) => void }) {
  const { config, updateConfig } = useMealPlanning();

  const diets = [
    { id: 'vegetarian', icon: Salad, label: 'Végétarien' },
    { id: 'pescatarian', icon: Fish, label: 'Pescétarien' },
    { id: 'meat', icon: Beef, label: 'Viande' },
    { id: 'gluten-free', icon: Wheat, label: 'Sans gluten' },
    { id: 'dairy-free', icon: Milk, label: 'Sans lactose' },
    { id: 'egg-free', icon: Egg, label: 'Sans œufs' }
  ];

  const equipment = [
    { id: 'oven', icon: ChefHat, label: 'Four' },
    { id: 'microwave', icon: Microwave, label: 'Micro-ondes' },
    { id: 'stove', icon: Flame, label: 'Plaque' },
    { id: 'blender', icon: Coffee, label: 'Blender' },
    { id: 'robot', icon: CookingPot, label: 'Robot' },
    { id: 'basic', icon: Utensils, label: 'Basique' }
  ];

  const updateHousehold = (type: 'adults' | 'children', value: number) => {
    const newConfig = {
      ...config,
      household: {
        ...config.household,
        [type]: Math.max(0, value)
      }
    };
    updateConfig(newConfig);
    onConfigChange(newConfig);
  };

  const toggleDiet = (dietId: string) => {
    const newDiets = config.diet.includes(dietId)
      ? config.diet.filter(d => d !== dietId)
      : [...config.diet, dietId];
    
    const newConfig = { ...config, diet: newDiets };
    updateConfig(newConfig);
    onConfigChange(newConfig);
  };

  const toggleEquipment = (equipmentId: string) => {
    const newEquipment = config.equipment.includes(equipmentId)
      ? config.equipment.filter(e => e !== equipmentId)
      : [...config.equipment, equipmentId];
    
    const newConfig = { ...config, equipment: newEquipment };
    updateConfig(newConfig);
    onConfigChange(newConfig);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Configuration du planning</h2>

      {/* Composition du foyer */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Composition du foyer</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
            <Users className="h-8 w-8 text-gray-600 mb-2" />
            <span className="text-sm font-medium mb-2">Adultes</span>
            <div className="flex items-center space-x-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => updateHousehold('adults', config.household.adults - 1)}
                className="p-2 bg-white rounded-full shadow-sm"
              >
                -
              </motion.button>
              <span className="text-xl font-semibold">{config.household.adults}</span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => updateHousehold('adults', config.household.adults + 1)}
                className="p-2 bg-white rounded-full shadow-sm"
              >
                +
              </motion.button>
            </div>
          </div>

          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
            <Baby className="h-8 w-8 text-gray-600 mb-2" />
            <span className="text-sm font-medium mb-2">Enfants</span>
            <div className="flex items-center space-x-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => updateHousehold('children', config.household.children - 1)}
                className="p-2 bg-white rounded-full shadow-sm"
              >
                -
              </motion.button>
              <span className="text-xl font-semibold">{config.household.children}</span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => updateHousehold('children', config.household.children + 1)}
                className="p-2 bg-white rounded-full shadow-sm"
              >
                +
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Régimes alimentaires */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Régimes alimentaires</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {diets.map((diet) => (
            <IconButton
              key={diet.id}
              icon={diet.icon}
              label={diet.label}
              isSelected={config.diet.includes(diet.id)}
              onClick={() => toggleDiet(diet.id)}
            />
          ))}
        </div>
      </div>

      {/* Équipement disponible */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Équipement disponible</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {equipment.map((item) => (
            <IconButton
              key={item.id}
              icon={item.icon}
              label={item.label}
              isSelected={config.equipment.includes(item.id)}
              onClick={() => toggleEquipment(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}