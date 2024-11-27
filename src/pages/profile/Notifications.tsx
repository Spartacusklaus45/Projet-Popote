import React from 'react';
import { Bell, ShoppingBag, Gift, Star, Settings } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'order',
    title: 'Commande livrée',
    message: 'Votre commande #ORD-2024-001 a été livrée avec succès.',
    time: 'Il y a 2 heures',
    icon: ShoppingBag,
    read: false
  },
  {
    id: 2,
    type: 'promo',
    title: 'Nouveau code promo !',
    message: 'Profitez de -20% sur votre prochaine commande avec le code POPOTE20',
    time: 'Il y a 1 jour',
    icon: Gift,
    read: true
  },
  {
    id: 3,
    type: 'review',
    title: 'Évaluez votre expérience',
    message: 'Comment s\'est passée la préparation du Poulet Kedjenou ?',
    time: 'Il y a 2 jours',
    icon: Star,
    read: true
  }
];

export default function Notifications() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
          <button className="flex items-center text-gray-600 hover:text-gray-900">
            <Settings className="h-5 w-5 mr-2" />
            Paramètres
          </button>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start p-4 rounded-lg ${
                notification.read ? 'bg-white' : 'bg-orange-50'
              }`}
            >
              <div className={`p-2 rounded-full ${
                notification.type === 'order' ? 'bg-blue-100 text-blue-600' :
                notification.type === 'promo' ? 'bg-green-100 text-green-600' :
                'bg-yellow-100 text-yellow-600'
              }`}>
                <notification.icon className="h-5 w-5" />
              </div>
              
              <div className="ml-4 flex-grow">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{notification.title}</h3>
                    <p className="text-gray-600">{notification.message}</p>
                  </div>
                  {!notification.read && (
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}