import React, { useState } from 'react';
import { Gift, Copy, Share2, CheckCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ReferralProgram() {
  const [referralCode] = useState('POPOTE123');
  const [showCopied, setShowCopied] = useState(false);

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

  const shareReferral = async () => {
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
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Programme de Parrainage</h2>
            <p className="text-orange-100 max-w-lg">
              Partagez Popote avec vos proches et gagnez 1 000 FCFA pour chaque filleul qui passe sa première commande !
            </p>
          </div>
          <Gift className="h-12 w-12" />
        </div>
      </div>

      {/* Referral Code Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Votre code de parrainage</h3>
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
                {showCopied ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>
          <button
            onClick={shareReferral}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Share2 className="h-5 w-5" />
            <span>Partager</span>
          </button>
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Comment ça marche ?</h3>
        <div className="space-y-6">
          {[
            {
              title: "Conditions d'éligibilité",
              description: "Passez une première commande avec au moins 4 recettes et 3 ingrédients par recette."
            },
            {
              title: "Partagez votre code",
              description: "Invitez vos proches à utiliser votre code lors de leur première commande."
            },
            {
              title: "Gagnez des récompenses",
              description: "Recevez 1 000 FCFA pour chaque filleul qui passe une commande d'au moins 20 000 FCFA."
            }
          ].map((step, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center font-semibold">
                {index + 1}
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">{step.title}</h4>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="bg-orange-50 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Conditions importantes</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• L'offre est limitée à une utilisation par foyer</li>
              <li>• Maximum 2 codes de récompense par commande</li>
              <li>• Les codes sont valables pendant 30 jours</li>
              <li>• Toute utilisation abusive entraînera l'annulation du code</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}