import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileStats from '../components/profile/ProfileStats';
import LoyaltyCard from '../components/profile/LoyaltyCard';
import ReferralProgram from '../components/profile/ReferralProgram';
import Orders from './profile/Orders';
import Recipes from './profile/Recipes';
import Notifications from './profile/Notifications';
import Settings from './profile/Settings';
import Referral from './profile/Referral';
import Nutrition from './profile/Nutrition';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Bouton Créer une recette */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <motion.button
            onClick={() => navigate('/create-recipe')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full md:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
          >
            <Plus className="h-5 w-5" />
            <span className="font-medium">Créer une recette</span>
          </motion.button>
        </motion.div>

        <div className="flex gap-8">
          <ProfileSidebar activeItem={location.pathname} />
          
          <div className="flex-grow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProfileHeader />
              
              <Routes>
                <Route path="/" element={
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-8"
                  >
                    <ProfileStats />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <LoyaltyCard />
                      <ReferralProgram />
                    </div>
                  </motion.div>
                } />

                <Route path="recipes/*" element={
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Recipes />
                  </motion.div>
                } />

                <Route path="orders" element={
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Orders />
                  </motion.div>
                } />

                <Route path="notifications" element={
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Notifications />
                  </motion.div>
                } />

                <Route path="loyalty" element={
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <LoyaltyCard />
                  </motion.div>
                } />

                <Route path="referral" element={
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Referral />
                  </motion.div>
                } />

                <Route path="nutrition" element={
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Nutrition />
                  </motion.div>
                } />

                <Route path="settings" element={
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Settings />
                  </motion.div>
                } />
              </Routes>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}