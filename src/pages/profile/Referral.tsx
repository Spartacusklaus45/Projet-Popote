import React from 'react';
import { Gift, Copy, Share2, Users } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Referral() {
  const [referralCode] = React.useState('POPOTE123');
  const [showCopied, setShowCopied] = React.useState(false);

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

  return (
    <div className="space-y-6">
      {/* Code de parrainage */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Programme de parrainage</h2>
            <p className="text-gray-600">Invitez vos amis et gagnez des récompenses</p>
          </div>
          <Gift className="h-8 w-8 text-orange-500" />
        </div>

        <div className="flex items-center space-x-4 mb-6">
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
            onClick={() => {
              navigator.share({
                title: 'Popote - Parrainage',
                text: `Utilisez mon code ${referralCode} pour obtenir une réduction sur votre première commande Popote !`,
                url: 'https://popote.ci'
              });
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Share2 className="h-5 w-5" />
            <span>Partager</span>
          </button>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-orange-50 rounded-lg p-4">
            <p className="text-sm text-orange-600 mb-1">Filleuls actifs</p>
            <p className="text-2xl font-bold text-gray-900">2</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-600 mb-1">Gains totaux</p>
            <p className="text-2xl font-bold text-gray-900">2,000 FCFA</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-600 mb-1">En attente</p>
            <p className="text-2xl font-bold text-gray-900">1,000 FCFA</p>
          </div>
        </div>

        {/* Liste des parrainages */}
        <div>
          <h3 className="font-medium text-gray-900 mb-4">Historique des parrainages</h3>
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
      </div>

      {/* Conditions */}
      <div className="bg-orange-50 rounded-xl p-6">
        <h3 className="font-medium text-gray-900 mb-4">Conditions du programme</h3>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 mr-2" />
            Gagnez 1,000 FCFA pour chaque ami qui passe sa première commande
          </li>
          <li className="flex items-start">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 mr-2" />
            La commande minimum doit être de 20,000 FCFA
          </li>
          <li className="flex items-start">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 mr-2" />
            Les gains sont ajoutés à votre carte Popote
          </li>
          <li className="flex items-start">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 mr-2" />
            Maximum 2 codes de récompense par commande
          </li>
        </ul>
      </div>
    </div>
  );
}