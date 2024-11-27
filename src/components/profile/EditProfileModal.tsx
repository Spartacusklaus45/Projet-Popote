import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  Users,
  Baby,
  Dog,
  Leaf,
  Ban,
  Search,
  X,
  Plus,
  Minus,
  Camera,
  ChefHat,
  Utensils,
  CookingPot,
  UtensilsCrossed,
  Coffee,
  Flame
} from 'lucide-react';
import { PersonalInfoSection } from './sections/PersonalInfoSection';
import { HouseholdSection } from './sections/HouseholdSection';
import { DietarySection } from './sections/DietarySection';
import { EquipmentSection } from './sections/EquipmentSection';
import { PreferencesSection } from './sections/PreferencesSection';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const { user, updateProfile, updateAvatar } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    avatar: user?.avatar,
    household: {
      adults: user?.household?.adults || 1,
      children: user?.household?.children || 0,
      pets: user?.household?.pets || 0
    },
    diets: user?.diets || [],
    dislikes: user?.dislikes || [],
    equipment: user?.equipment || []
  });

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await updateAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
      toast.success('Photo de profil mise à jour !');
    } catch (error) {
      toast.error('Erreur lors du changement de photo');
    }
  };

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      toast.success('Profil mis à jour !');
      onClose();
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Modifier mon profil</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Photo de profil */}
          <div className="flex justify-center">
            <div className="relative">
              <div
                onClick={handleAvatarClick}
                className="w-24 h-24 rounded-full overflow-hidden cursor-pointer group relative"
              >
                {formData.avatar ? (
                  <img
                    src={formData.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <User className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
          </div>

          <PersonalInfoSection formData={formData} setFormData={setFormData} />
          <HouseholdSection formData={formData} setFormData={setFormData} />
          <DietarySection formData={formData} setFormData={setFormData} />
          <EquipmentSection formData={formData} setFormData={setFormData} />
          <PreferencesSection formData={formData} setFormData={setFormData} />
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
              onClick={handleSave}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Enregistrer
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}