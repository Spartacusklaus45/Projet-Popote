import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

interface LoginFormProps {
  onToggleMode: () => void;
  onSuccess: () => void;
}

export default function LoginForm({ onToggleMode, onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      onSuccess();
      toast.success('Connexion réussie !');
    } catch (error) {
      toast.error('Erreur lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Connexion</h2>
        <p className="text-gray-600 dark:text-gray-400">Connectez-vous pour continuer</p>
      </motion.div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email ou téléphone
        </label>
        <motion.div className="mt-1 relative" whileHover={{ scale: 1.02 }}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-orange-500 dark:focus:border-orange-400 focus:ring-orange-500 dark:focus:ring-orange-400 shadow-sm transition-colors"
            placeholder="votre@email.com"
            disabled={loading}
          />
        </motion.div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Mot de passe
        </label>
        <motion.div className="mt-1 relative" whileHover={{ scale: 1.02 }}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-orange-500 dark:focus:border-orange-400 focus:ring-orange-500 dark:focus:ring-orange-400 shadow-sm transition-colors"
            placeholder="••••••••"
            disabled={loading}
          />
        </motion.div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-orange-500 focus:ring-orange-500 dark:focus:ring-orange-400"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Se souvenir de moi
          </label>
        </div>
        <motion.button
          type="button"
          className="text-sm text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 focus:outline-none"
          whileHover={{ scale: 1.1 }}
        >
          Mot de passe oublié ?
        </motion.button>
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-600 dark:to-pink-600 text-white py-2 px-4 rounded-lg hover:from-orange-600 hover:to-pink-600 dark:hover:from-orange-700 dark:hover:to-pink-700 transition-all duration-300 disabled:opacity-50"
        whileHover={!loading ? { scale: 1.05 } : {}}
      >
        {loading ? 'Connexion...' : 'Se connecter'}
      </motion.button>

      <motion.div
        className="text-center mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <span className="text-sm text-gray-600 dark:text-gray-400">Pas encore de compte ?</span>
        <motion.button
          type="button"
          onClick={onToggleMode}
          className="ml-2 text-sm text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 focus:outline-none"
          whileHover={{ scale: 1.05 }}
        >
          S'inscrire
        </motion.button>
      </motion.div>
    </motion.form>
  );
}