import React, { useState } from 'react';
import { Edit2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import EditProfileModal from './EditProfileModal';

export default function ProfileHeader() {
  const { user } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);

  const initialData = {
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    household: {
      adults: 2,
      children: 0,
      pets: 0
    },
    diets: [],
    dislikes: [],
    equipment: []
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8 transition-colors duration-300">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-pink-100 dark:from-orange-900 dark:to-pink-900 rounded-full flex items-center justify-center text-2xl font-bold text-orange-500 dark:text-orange-400">
          {user?.name.charAt(0)}
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{user?.name}</h1>
            <button 
              onClick={() => setShowEditModal(true)}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
            >
              <Edit2 className="h-4 w-4" />
              <span>Modifier</span>
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
        </div>
      </div>

      <EditProfileModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        initialData={initialData}
      />
    </div>
  );
}