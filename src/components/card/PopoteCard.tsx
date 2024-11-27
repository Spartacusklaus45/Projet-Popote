import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  Shield, 
  Lock,
  Plus,
  Minus,
  Wallet,
  RefreshCw,
  Gift,
  Ticket,
  Calendar,
  ChevronRight,
  Smartphone,
  Building2
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  CARD_TIERS,
  CardTier,
  formatCardNumber,
  maskCardNumber,
  calculateNextTier,
  getCurrentTier 
} from '../../utils/cardGenerator';
import toast from 'react-hot-toast';

interface PopoteCardProps {
  className?: string;
  showActions?: boolean;
  onRecharge?: () => void;
}

const paymentMethods = [
  { id: 'card', name: 'Carte bancaire', icon: CreditCard },
  { id: 'orange', name: 'Orange Money', icon: Smartphone },
  { id: 'mtn', name: 'MTN Mobile Money', icon: Smartphone },
  { id: 'moov', name: 'Moov Money', icon: Smartphone },
  { id: 'wave', name: 'Wave', icon: Building2 }
];

export default function PopoteCard({ className = '', showActions = false, onRecharge }: PopoteCardProps) {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [points, setPoints] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState(5000);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const currentTier = getCurrentTier(points);
  const { nextTier, pointsNeeded } = calculateNextTier(points);
  const tierDetails = CARD_TIERS[currentTier];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 10;
      const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -10;

      setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
      setRotation({ x: 0, y: 0 });
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const handleRecharge = async () => {
    if (!selectedPaymentMethod) {
      toast.error('Veuillez sélectionner un moyen de paiement');
      return;
    }

    try {
      setIsProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setBalance(prev => prev + rechargeAmount);
      setShowRechargeModal(false);
      
      toast.success(`Carte rechargée de ${rechargeAmount.toLocaleString()} FCFA`);
      
      if (onRecharge) {
        onRecharge();
      }
    } catch (error) {
      toast.error('Erreur lors du rechargement');
    } finally {
      setIsProcessing(false);
      setSelectedPaymentMethod('');
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Card Preview with 3D effect */}
      <div 
        ref={cardRef}
        className="relative h-64 cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          className="absolute inset-0 w-full h-full rounded-2xl transform-style-3d transition-transform duration-500"
          style={{
            transform: `
              rotateX(${rotation.x}deg) 
              rotateY(${rotation.y}deg)
              ${isFlipped ? 'rotateY(180deg)' : ''}
            `
          }}
        >
          {/* Front of the card */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <div className={`w-full h-full rounded-2xl p-8 text-${tierDetails.colors.text} shadow-xl relative overflow-hidden
              bg-gradient-to-br ${tierDetails.colors.from} ${tierDetails.colors.via || ''} ${tierDetails.colors.to}`}
            >
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-gradient-shift" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">Carte Popote</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-0.5 rounded-full text-sm bg-black/20 ${tierDetails.colors.text}`}>
                        {tierDetails.name}
                      </span>
                    </div>
                    <p className="font-mono mt-2">
                      {maskCardNumber('4242424242424242')}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-8 w-8" />
                    <Shield className="h-6 w-6" />
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm mb-1 opacity-80">Solde disponible</p>
                    <motion.p 
                      className="text-3xl font-bold"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {balance.toLocaleString()} FCFA
                    </motion.p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm mb-1 opacity-80">Titulaire</p>
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-sm opacity-80">Exp: 12/26</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back of the card */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-white">
              <div className="h-12 bg-gray-700 -mx-8 mb-8" />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-80">Code de sécurité</span>
                  <span className="font-mono">***</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-80">Points fidélité</span>
                  <span>{points.toLocaleString()} pts</span>
                </div>
                {nextTier && (
                  <div className="text-sm opacity-80">
                    Plus que {pointsNeeded} points pour le niveau {CARD_TIERS[nextTier].name}
                  </div>
                )}
              </div>
              <div className="mt-8 text-xs opacity-70">
                Cette carte est la propriété de Popote. L'utilisation est soumise aux conditions générales.
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Gift, label: 'Voir les récompenses', value: '3 disponibles' },
          { icon: Ticket, label: 'Coupons actifs', value: '2 coupons' },
          { icon: Calendar, label: 'Prochaine expiration', value: '15 mars 2024' }
        ].map((action, index) => (
          <motion.button
            key={index}
            className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-50 dark:bg-orange-900/30 rounded-lg text-orange-500 dark:text-orange-400">
                <action.icon className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-600 dark:text-gray-400">{action.label}</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{action.value}</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
          </motion.button>
        ))}
      </div>

      {showActions && (
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowRechargeModal(true)}
            className="flex items-center justify-center px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Recharger
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsFlipped(!isFlipped)}
            className="flex items-center justify-center px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Retourner
          </motion.button>
        </div>
      )}

      {/* Recharge Modal */}
      <AnimatePresence>
        {showRechargeModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Recharger ma carte
              </h3>

              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  {[5000, 10000, 20000].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setRechargeAmount(amount)}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        rechargeAmount === amount
                          ? 'border-orange-500 bg-orange-50 dark:border-orange-400 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                          : 'border-gray-200 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-800'
                      }`}
                    >
                      {amount.toLocaleString()} FCFA
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    Moyen de paiement
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedPaymentMethod(method.id)}
                        className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-colors ${
                          selectedPaymentMethod === method.id
                            ? 'border-orange-500 bg-orange-50 dark:border-orange-400 dark:bg-orange-900/30'
                            : 'border-gray-200 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-800'
                        }`}
                      >
                        <method.icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {method.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowRechargeModal(false)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleRecharge}
                    disabled={isProcessing || !selectedPaymentMethod}
                    className="flex items-center px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                        Traitement...
                      </>
                    ) : (
                      'Recharger'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Benefits Section */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-4">
          Avantages {tierDetails.name}
        </h4>
        <ul className="space-y-2">
          {tierDetails.benefits.map((benefit, index) => (
            <li key={index} className="flex items-center text-gray-600 dark:text-gray-400">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}