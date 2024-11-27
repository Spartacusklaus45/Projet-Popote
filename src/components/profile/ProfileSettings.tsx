import React, { useState } from 'react';
import { Settings, User, Utensils, Heart, CreditCard, Gift } from 'lucide-react';
import PopoteCard from '../card/PopoteCard';
import ReferralProgram from './ReferralProgram';
import toast from 'react-hot-toast';

const sections = [
  {
    id: 'personal',
    icon: User,
    title: 'Informations personnelles',
    fields: [
      { name: 'name', label: 'Nom complet', type: 'text' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'phone', label: 'Téléphone', type: 'tel' },
      { name: 'birthdate', label: 'Date de naissance', type: 'date' }
    ]
  },
  {
    id: 'preferences',
    icon: Heart,
    title: 'Préférences alimentaires',
    fields: [
      { 
        name: 'diet', 
        label: 'Régime alimentaire', 
        type: 'select',
        options: ['Aucun', 'Végétarien', 'Végétalien', 'Sans gluten', 'Sans lactose']
      },
      {
        name: 'allergies',
        label: 'Allergies',
        type: 'multiselect',
        options: ['Arachides', 'Fruits de mer', 'Œufs', 'Soja', 'Lactose']
      }
    ]
  },
  {
    id: 'kitchen',
    icon: Utensils,
    title: 'Équipement de cuisine',
    fields: [
      {
        name: 'appliances',
        label: 'Appareils disponibles',
        type: 'multiselect',
        options: ['Four', 'Micro-ondes', 'Robot culinaire', 'Mixeur', 'Autocuiseur']
      }
    ]
  }
];

type TabType = 'settings' | 'loyalty' | 'referral';

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState<TabType>('settings');

  const handleRecharge = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Carte rechargée avec succès');
    } catch (error) {
      toast.error('Erreur lors du rechargement');
    }
  };

  const tabs = [
    { id: 'settings', label: 'Paramètres', icon: Settings },
    { id: 'loyalty', label: 'Carte Popote', icon: CreditCard },
    { id: 'referral', label: 'Parrainage', icon: Gift }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Settings className="h-8 w-8 text-orange-500" />
          <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
        </div>
        <div className="flex space-x-4">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as TabType)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === id
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-orange-50'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'settings' && (
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <section.icon className="h-6 w-6 text-orange-500" />
                <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.fields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    {field.type === 'select' ? (
                      <select className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
                        {field.options?.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    ) : field.type === 'multiselect' ? (
                      <div className="space-y-2">
                        {field.options?.map((option) => (
                          <label key={option} className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded text-orange-500 focus:ring-orange-500" />
                            <span className="text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <input
                        type={field.type}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
              Enregistrer les modifications
            </button>
          </div>
        </div>
      )}

      {activeTab === 'loyalty' && <PopoteCard showActions onRecharge={handleRecharge} />}
      {activeTab === 'referral' && <ReferralProgram />}
    </div>
  );
}