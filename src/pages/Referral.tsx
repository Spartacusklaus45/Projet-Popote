import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Gift, 
  Copy, 
  Share2, 
  Users, 
  Award,
  ChevronRight,
  AlertCircle,
  TrendingUp,
  Heart
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Referral() {
  const [referralCode] = useState('POPOTE123');
  const [showCopied, setShowCopied] = useState(false);

  const referrals = [
    {
      name: 'Marie K.',
      date: '15 Mars 2024',
      status: 'completed',
      reward: '1,000 FCFA'
    },
    {
      name: 'Jean D.',
      date: '10 Mars 2024',
      status: 'pending',
      reward: '1,000 FCFA'
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setShowCopied(true);
      toast.success('Code copié !');
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      toast.error('Erreur lors de la copie');
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Popote - Parrainage',
        text: `Utilisez mon code ${referralCode} pour obtenir une réduction sur votre première commande Popote !`,
        url: 'https://popote.ci'
      });
    } catch (err) {
      toast.error('Erreur lors du partage');
    }
  };

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="relative mb-16">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d"
              alt="Parrainage"
              className="w-full h-96 object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/90 to-pink-500/90 rounded-2xl" />
          </div>
          
          <div className="relative py-24 px-8 text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold mb-4"
            >
              Programme de Parrainage
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-orange-100 max-w-2xl mx-auto"
            >
              Partagez l'amour de la cuisine et gagnez des récompenses
            </motion.p>
          </div>
        </div>

        {/* Rewards Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Gift,
              title: "1 000 FCFA",
              description: "Pour chaque filleul qui passe sa première commande"
            },
            {
              icon: Heart,
              title: "500 FCFA",
              description: "Pour votre filleul sur sa première commande"
            },
            {
              icon: TrendingUp,
              title: "Points bonus",
              description: "Points de fidélité doublés pendant 1 mois"
            }
          ].map((reward, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm text-center"
            >
              <div className="inline-flex p-3 bg-orange-100 rounded-lg mb-4">
                <reward.icon className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {reward.title}
              </h3>
              <p className="text-gray-600">{reward.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Referral Code Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Votre code de parrainage</h2>
              <p className="text-gray-600">Partagez ce code avec vos amis</p>
            </div>
            <Award className="h-12 w-12 text-orange-500" />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex-grow">
              <div className="relative">
                <input
                  type="text"
                  value={referralCode}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg font-mono text-lg text-gray-900"
                />
                <button
                  onClick={copyToClipboard}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Copy className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Share2 className="h-5 w-5" />
              <span>Partager</span>
            </button>
          </div>
        </div>

        {/* How it Works */}
        <div className="bg-orange-50 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Comment ça marche ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Partagez votre code",
                description: "Envoyez votre code unique à vos amis"
              },
              {
                step: 2,
                title: "Ils commandent",
                description: "Vos amis utilisent le code pour leur première commande"
              },
              {
                step: 3,
                title: "Gagnez des récompenses",
                description: "Recevez vos récompenses dès leur première commande"
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Referral History */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Historique des parrainages</h2>
          <div className="space-y-4">
            {referrals.map((referral, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{referral.name}</p>
                    <p className="text-sm text-gray-500">{referral.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{referral.reward}</p>
                  <p className={`text-sm ${
                    referral.status === 'completed' ? 'text-green-600' : 'text-orange-600'
                  }`}>
                    {referral.status === 'completed' ? 'Validé' : 'En attente'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Prêt à commencer ?
          </h2>
          <p className="text-gray-600 mb-8">
            Partagez Popote avec vos amis et commencez à gagner des récompenses
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
          >
            Inviter des amis
            <ChevronRight className="ml-2 h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}