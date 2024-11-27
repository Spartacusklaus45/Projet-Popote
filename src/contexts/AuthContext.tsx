import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  household?: {
    adults: number;
    children: number;
    pets: number;
  };
  diets?: string[];
  dislikes?: string[];
  equipment?: string[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  updateAvatar: (file: File) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const updateLocalStorage = (userData: User) => {
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: '1',
        name: email.split('@')[0],
        email,
        avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`,
        household: {
          adults: 2,
          children: 0,
          pets: 0
        },
        diets: [],
        dislikes: [],
        equipment: []
      };

      setUser(mockUser);
      updateLocalStorage(mockUser);
      toast.success('Connexion réussie !');
      navigate('/');
    } catch (error) {
      toast.error('Erreur lors de la connexion');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: Date.now().toString(),
        name,
        email,
        avatar: `https://ui-avatars.com/api/?name=${name}&background=random`,
        household: {
          adults: 1,
          children: 0,
          pets: 0
        },
        diets: [],
        dislikes: [],
        equipment: []
      };

      setUser(mockUser);
      updateLocalStorage(mockUser);
      toast.success('Inscription réussie !');
      navigate('/');
    } catch (error) {
      toast.error('Erreur lors de l\'inscription');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Déconnexion réussie');
    navigate('/');
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      if (!user) return;
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      updateLocalStorage(updatedUser);
      toast.success('Profil mis à jour !');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du profil');
      throw error;
    }
  };

  const updateAvatar = async (file: File) => {
    try {
      if (!user) return;
      const reader = new FileReader();
      const avatarUrl = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const updatedUser = { ...user, avatar: avatarUrl };
      setUser(updatedUser);
      updateLocalStorage(updatedUser);
      toast.success('Photo de profil mise à jour !');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour de la photo');
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      updateProfile,
      updateAvatar,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}