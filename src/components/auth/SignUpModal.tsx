import React, { useState } from 'react';
import { X } from 'lucide-react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import SocialAuth from './SocialAuth';

type AuthMode = 'login' | 'signup';

export default function SignUpModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {authMode === 'login' ? 'Connexion' : 'Créer un compte'}
        </h2>

        {authMode === 'login' ? (
          <LoginForm onToggleForm={() => setAuthMode('signup')} />
        ) : (
          <SignUpForm onToggleForm={() => setAuthMode('login')} />
        )}

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
          </div>
        </div>

        <SocialAuth />
      </div>
    </div>
  );
}