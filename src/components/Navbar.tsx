import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChefHat, 
  Search, 
  Menu, 
  X, 
  Bell, 
  ChevronDown, 
  LogOut,
  Calendar,
  Heart,
  Book,
  Settings,
  CreditCard,
  Gift,
  Repeat,
  ShoppingBasket,
  User
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import AuthModal from './auth/AuthModal';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { path: '/recipes', label: 'Recettes', icon: ChefHat },
  { path: '/subscription', label: 'Abonnements', icon: Repeat },
  { path: '/meal-planning', label: 'Planning', icon: Calendar },
  { path: '/blog', label: 'Blog', icon: Book },
  { path: '/contact', label: 'Contact', icon: Heart }
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { items } = useCart();
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className={`fixed top-8 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-lg" 
        : "bg-transparent"
    }`}>
      {/* Rest of the Navbar component remains the same */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.slice(0, Math.floor(navItems.length / 2)).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 rounded-lg transition-colors"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Logo - Center */}
          <Link 
            to="/" 
            className="flex items-center space-x-2"
          >
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.4 }}
            >
              <ChefHat className="h-8 w-8 text-orange-500 dark:text-orange-400" />
            </motion.div>
            <span className="text-3xl font-extrabold tracking-widest bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-400 dark:to-pink-400 bg-clip-text text-transparent">
              Popote
            </span>
          </Link>

          {/* Right section */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.slice(Math.floor(navItems.length / 2)).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 rounded-lg transition-colors"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}

            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative group"
            >
              <motion.div 
                className="p-2 hover:bg-white/20 dark:hover:bg-gray-800/20 rounded-full transition-all duration-300 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBasket className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                {items.length > 0 && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-1 -right-1 flex items-center"
                  >
                    <span className="flex items-center justify-center bg-orange-500 text-white text-xs rounded-full h-5 min-w-[1.25rem] px-1">
                      {items.length}
                    </span>
                  </motion.div>
                )}
              </motion.div>
              {items.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 hidden group-hover:block"
                >
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {items.reduce((total, item) => total + item.quantity * item.recipe.price, 0).toLocaleString()} FCFA
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {items.length} {items.length > 1 ? 'articles' : 'article'}
                  </div>
                </motion.div>
              )}
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <motion.button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 p-2 hover:bg-white/20 dark:hover:bg-gray-800/20 rounded-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-900 dark:to-pink-900 flex items-center justify-center">
                    <span className="text-orange-500 dark:text-orange-400 font-medium">
                      {user.name[0].toUpperCase()}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </motion.button>

                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg py-2 border border-gray-200 dark:border-gray-700"
                    >
                      {[
                        { label: 'Mon Profil', icon: User, path: '/profile' },
                        { label: 'Carte Popote', icon: CreditCard, path: '/profile/loyalty' },
                        { label: 'Parrainage', icon: Gift, path: '/profile/referral' },
                        { label: 'Paramètres', icon: Settings, path: '/profile/settings' }
                      ].map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <item.icon className="h-4 w-4 mr-2" />
                          {item.label}
                        </Link>
                      ))}
                      <hr className="my-2 border-gray-200 dark:border-gray-700" />
                      <motion.button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Déconnexion
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button
                onClick={() => setShowAuthModal(true)}
                className="bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-600 dark:to-pink-600 text-white px-5 py-2 rounded-lg hover:from-orange-600 hover:to-pink-600 dark:hover:from-orange-700 dark:hover:to-pink-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                Connexion
              </motion.button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link 
              to="/cart" 
              className="relative"
            >
              <ShoppingBasket className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>

            <ThemeToggle />

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-white/20 dark:hover:bg-gray-800/20 rounded-full transition-all duration-300"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg"
          >
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}

              {user ? (
                <>
                  <hr className="my-2 border-gray-200 dark:border-gray-700" />
                  {[
                    { label: 'Mon Profil', icon: User, path: '/profile' },
                    { label: 'Carte Popote', icon: CreditCard, path: '/profile/loyalty' },
                    { label: 'Parrainage', icon: Gift, path: '/profile/referral' },
                    { label: 'Paramètres', icon: Settings, path: '/profile/settings' }
                  ].map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-lg transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Déconnexion</span>
                  </button>
                </>
              ) : (
                <motion.button
                  onClick={() => {
                    setShowAuthModal(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full mt-4 bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-600 dark:to-pink-600 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-pink-600 dark:hover:from-orange-700 dark:hover:to-pink-700 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Se connecter
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </nav>
  );
}