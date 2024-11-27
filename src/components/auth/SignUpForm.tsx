import React, { useState } from 'react';
import { User, Mail, Lock, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

interface SignUpFormProps {
  onToggleMode: () => void;
  onSuccess: () => void;
}

export default function SignUpForm({ onToggleMode, onSuccess }: SignUpFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      setLoading(true);
      await register(formData.name, formData.email, formData.password);
      onSuccess();
      toast.success('Inscription réussie !');
    } catch (error) {
      toast.error('Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-8 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ background: 'linear-gradient(to bottom, #DFF5E7, #FFF8E1)' }}
    >
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-semibold text-green-600">Créer un compte</h2>
        <p className="text-green-500">Rejoignez la communauté Popote</p>
      </motion.div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nom complet
        </label>
        <motion.div className="mt-1 relative" whileHover={{ scale: 1.02 }}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-green-400" />
          </div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 transition-colors duration-300"
            placeholder="Votre nom"
            disabled={loading}
          />
        </motion.div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <motion.div className="mt-1 relative" whileHover={{ scale: 1.02 }}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-green-400" />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 transition-colors duration-300"
            placeholder="votre@email.com"
            disabled={loading}
          />
        </motion.div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Téléphone
        </label>
        <motion.div className="mt-1 relative" whileHover={{ scale: 1.02 }}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone className="h-5 w-5 text-green-400" />
          </div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 transition-colors duration-300"
            placeholder="+225 XX XX XX XX"
            disabled={loading}
          />
        </motion.div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Mot de passe
        </label>
        <motion.div className="mt-1 relative" whileHover={{ scale: 1.02 }}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-green-400" />
          </div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 transition-colors duration-300"
            placeholder="••••••••"
            disabled={loading}
          />
        </motion.div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Confirmer le mot de passe
        </label>
        <motion.div className="mt-1 relative" whileHover={{ scale: 1.02 }}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-green-400" />
          </div>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 transition-colors duration-300"
            placeholder="••••••••"
            disabled={loading}
          />
        </motion.div>
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300 disabled:opacity-50"
        whileHover={!loading ? { scale: 1.05 } : {}}
      >
        {loading ? 'Création du compte...' : 'S\'inscrire'}
      </motion.button>

      <motion.div
        className="text-center mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <span className="text-sm text-gray-600">Déjà un compte ?</span>
        <motion.button
          type="button"
          onClick={onToggleMode}
          className="ml-2 text-sm text-green-500 hover:text-green-600 focus:outline-none"
          whileHover={{ scale: 1.05 }}
        >
          Se connecter
        </motion.button>
      </motion.div>
    </motion.form>
  );
}
