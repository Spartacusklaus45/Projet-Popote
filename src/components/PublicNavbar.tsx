import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChefHat, 
  Menu, 
  X, 
  Heart,
  Book,
  Coffee
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthModal from './auth/AuthModal';
import { cn } from '../utils/cn';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { path: '/recipes', label: 'Recettes', icon: Coffee },
  { path: '/blog', label: 'Blog', icon: Book },
  { path: '/about', label: 'À propos', icon: Coffee },
  { path: '/contact', label: 'Contact', icon: Heart }
];

export default function PublicNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLink = ({ path, label, icon: Icon }: { path: string; label: string; icon: React.ElementType }) => (
    <Link
      to={path}
      className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-300"
    >
      <motion.div
        whileHover={{ scale: 1.2, rotate: 15 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Icon className="h-5 w-5" />
      </motion.div>
      <span>{label}</span>
    </Link>
  );

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      isScrolled 
        ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-lg" 
        : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Navigation Links */}
            {navItems.map((item) => (
              <NavLink key={item.path} {...item} />
            ))}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Auth Button */}
            <motion.button
              onClick={() => setShowAuthModal(true)}
              className="bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-600 dark:to-pink-600 text-white px-5 py-2 rounded-lg hover:from-orange-600 hover:to-pink-600 dark:hover:from-orange-700 dark:hover:to-pink-700 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              Connexion
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
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
                <NavLink key={item.path} {...item} />
              ))}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </nav>
  );
}