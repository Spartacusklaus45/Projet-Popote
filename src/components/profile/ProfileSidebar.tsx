import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  ShoppingBag, 
  ChefHat, 
  Bell, 
  CreditCard, 
  Gift, 
  Settings,
  LogOut,
  Activity,
  Wallet
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarItem {
  label: string;
  icon: React.ElementType;
  path: string;
}

export default function ProfileSidebar({ activeItem }: { activeItem: string }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const sidebarItems: SidebarItem[] = [
    { label: "Mon profil", icon: User, path: "/profile" },
    { label: "Mes commandes", icon: ShoppingBag, path: "/profile/orders" },
    { label: "Mes recettes", icon: ChefHat, path: "/profile/recipes" },
    { label: "Notifications", icon: Bell, path: "/profile/notifications" },
    { label: "Carte Popote", icon: CreditCard, path: "/profile/loyalty" },
    { label: "Moyens de paiement", icon: Wallet, path: "/profile/payment-methods" },
    { label: "Parrainage", icon: Gift, path: "/profile/referral" },
    { label: "Suivi nutritionnel", icon: Activity, path: "/profile/nutrition" },
    { label: "Paramètres", icon: Settings, path: "/profile/settings" }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="w-64 flex-shrink-0">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeItem === item.path
                  ? 'bg-orange-50 dark:bg-orange-900/30 text-orange-500 dark:text-orange-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </motion.button>
          ))}
        </nav>

        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Se déconnecter</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}