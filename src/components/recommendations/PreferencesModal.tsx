import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PreferencesModal({ isOpen, onClose }: PreferencesModalProps) {
  const [preferences, setPreferences] = useState({
    diet: '',
    allergies: [] as string[],
    cuisineTypes: [] as string[],
    cookingTime: '',
    difficulty: '',
    equipment: [] as string[]
  });

  const dietTypes = [
    'Aucun régime particulier',
    'Végétarien',
    'Végétalien',
    'Sans gluten',
    'Sans lactose'
  ];

  const allergies = [
    'Arachides',
    'Fruits de mer',
    'Œufs',
    'Soja',
    'Lactose',
    'Fruits à coque'
  ];

  const cuisineTypes = [
    'Ivoirienne',
    'Africaine',
    'Internationale',
    'Asiatique',
    'Européenne'
  ];

  const equipment = [
    'Four',
    'Micro-ondes',
    'Robot culinaire',
    'Mixeur',
    'Autocuiseur'
  ];

  const handleAllergiesChange = (allergy: string) => {
    setPreferences(prev => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter(a => a !== allergy)
        : [...prev.allergies, allergy]
    }));
  };

  const handleCuisineTypesChange = (cuisine: string) => {
    setPreferences(prev => ({
      ...prev,
      cuisineTypes: prev.cuisineTypes.includes(cuisine)
        ? prev.cuisineTypes.filter(c => c !== cuisine)
        : [...prev.cuisineTypes, cuisine]
    }));
  };

  const handleEquipmentChange = (item: string) => {
    setPreferences(prev => ({
      ...prev,
      equipment: prev.equipment.includes(item)
        ? prev.equipment.filter(e => e !== item)
        : [...prev.equipment, item]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Préférences alimentaires
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Diet Type */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Régime alimentaire
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {dietTypes.map((diet) => (
                <label key={diet} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="diet"
                    value={diet}
                    checked={preferences.diet === diet}
                    onChange={(e) => setPreferences({ ...preferences, diet: e.target.value })}
                    className="text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-gray-700">{diet}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Allergies */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Allergies et intolérances
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {allergies.map((allergy) => (
                <label key={allergy} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={preferences.allergies.includes(allergy)}
                    onChange={() => handleAllergiesChange(allergy)}
                    className="rounded text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-gray-700">{allergy}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Cuisine Types */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Types de cuisine préférés
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {cuisineTypes.map((cuisine) => (
                <label key={cuisine} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={preferences.cuisineTypes.includes(cuisine)}
                    onChange={() => handleCuisineTypesChange(cuisine)}
                    className="rounded text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-gray-700">{cuisine}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Equipment */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Équipement de cuisine disponible
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {equipment.map((item) => (
                <label key={item} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={preferences.equipment.includes(item)}
                    onChange={() => handleEquipmentChange(item)}
                    className="rounded text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Annuler
            </button>
            <button
              onClick={onClose}
              className="flex items-center px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Check className="h-5 w-5 mr-2" />
              Enregistrer
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}