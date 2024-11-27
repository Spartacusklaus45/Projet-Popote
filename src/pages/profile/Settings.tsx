import React, { useState } from 'react';
import { 
  Sun, 
  Moon, 
  Globe, 
  Bell, 
  CreditCard, 
  Lock, 
  Languages,
  ChevronRight,
  Smartphone,
  Mail,
  Volume2,
  Eye,
  Shield,
  HelpCircle
} from 'lucide-react';

export default function Settings() {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('fr');
  const [currency, setCurrency] = useState('XOF');
  const [notifications, setNotifications] = useState({
    orders: true,
    promotions: true,
    newsletter: false,
    app: true,
    email: true,
    sms: false
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    activityStatus: true,
    recipeSharing: true
  });

  return (
    <div className="space-y-6">
      {/* Apparence */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Apparence</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Thème</p>
            <p className="text-sm text-gray-600">Personnalisez l'apparence de l'application</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setTheme('light')}
              className={`p-2 rounded-lg flex items-center ${
                theme === 'light' ? 'bg-orange-100 text-orange-500' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Sun className="h-5 w-5 mr-2" />
              Clair
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`p-2 rounded-lg flex items-center ${
                theme === 'dark' ? 'bg-orange-100 text-orange-500' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Moon className="h-5 w-5 mr-2" />
              Sombre
            </button>
          </div>
        </div>
      </div>

      {/* Langue et Région */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Langue et Région</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Langue
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="ar">العربية</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Devise
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            >
              <option value="XOF">Franc CFA (FCFA)</option>
              <option value="EUR">Euro (€)</option>
              <option value="USD">Dollar ($)</option>
              <option value="GBP">Livre Sterling (£)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fuseau horaire
            </label>
            <select
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            >
              <option value="GMT">GMT (Greenwich Mean Time)</option>
              <option value="WAT">WAT (West Africa Time)</option>
              <option value="CET">CET (Central European Time)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Notifications</h2>
        
        {/* Canaux de notification */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Canaux de notification</h3>
          <div className="space-y-4">
            {[
              { key: 'app', icon: Smartphone, label: 'Notifications push', desc: 'Notifications sur l\'application' },
              { key: 'email', icon: Mail, label: 'Email', desc: 'Notifications par email' },
              { key: 'sms', icon: Volume2, label: 'SMS', desc: 'Notifications par SMS' }
            ].map(({ key, icon: Icon, label, desc }) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{label}</p>
                    <p className="text-sm text-gray-600">{desc}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications[key]}
                    onChange={(e) => setNotifications({
                      ...notifications,
                      [key]: e.target.checked
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Types de notifications */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Types de notifications</h3>
          <div className="space-y-4">
            {[
              { key: 'orders', label: 'Commandes', desc: 'Statut et mises à jour des commandes' },
              { key: 'promotions', label: 'Promotions', desc: 'Offres spéciales et codes promo' },
              { key: 'newsletter', label: 'Newsletter', desc: 'Nouvelles recettes et actualités' }
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{label}</p>
                  <p className="text-sm text-gray-600">{desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications[key]}
                    onChange={(e) => setNotifications({
                      ...notifications,
                      [key]: e.target.checked
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Confidentialité */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Confidentialité</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Visibilité du profil
            </label>
            <select
              value={privacy.profileVisibility}
              onChange={(e) => setPrivacy({ ...privacy, profileVisibility: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            >
              <option value="public">Public</option>
              <option value="friends">Amis uniquement</option>
              <option value="private">Privé</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Statut en ligne</p>
              <p className="text-sm text-gray-600">Afficher votre statut d'activité</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={privacy.activityStatus}
                onChange={(e) => setPrivacy({ ...privacy, activityStatus: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Partage de recettes</p>
              <p className="text-sm text-gray-600">Autoriser le partage de vos recettes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={privacy.recipeSharing}
                onChange={(e) => setPrivacy({ ...privacy, recipeSharing: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Sécurité */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Sécurité</h2>
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50">
            <div className="flex items-center">
              <Lock className="h-5 w-5 text-gray-400 mr-3" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Changer le mot de passe</p>
                <p className="text-sm text-gray-600">Dernière modification il y a 3 mois</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-gray-400 mr-3" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Authentification à deux facteurs</p>
                <p className="text-sm text-gray-600">Sécurité renforcée du compte</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50">
            <div className="flex items-center">
              <Eye className="h-5 w-5 text-gray-400 mr-3" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Sessions actives</p>
                <p className="text-sm text-gray-600">Gérer les appareils connectés</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Aide et Support */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Aide et Support</h2>
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50">
            <div className="flex items-center">
              <HelpCircle className="h-5 w-5 text-gray-400 mr-3" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Centre d'aide</p>
                <p className="text-sm text-gray-600">Questions fréquentes et guides</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Actions du compte */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Actions du compte</h2>
        <div className="space-y-4">
          <button className="w-full text-left text-red-600 hover:text-red-700">
            Désactiver mon compte
          </button>
          <button className="w-full text-left text-red-600 hover:text-red-700">
            Supprimer mon compte
          </button>
        </div>
      </div>
    </div>
  );
}