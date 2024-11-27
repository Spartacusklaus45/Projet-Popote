import React from 'react';
import { motion } from 'framer-motion';
import { 
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { Transaction } from '../../utils/transactions';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface CardTransactionHistoryProps {
  transactions: Transaction[];
}

export default function CardTransactionHistory({ transactions }: CardTransactionHistoryProps) {
  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'RECHARGE':
        return ArrowUpRight;
      case 'PAYMENT':
        return ArrowDownLeft;
      case 'REWARD':
        return CheckCircle;
      case 'REFUND':
        return ArrowUpRight;
      default:
        return AlertCircle;
    }
  };

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'COMPLETED':
        return 'text-green-500';
      case 'PENDING':
        return 'text-orange-500';
      case 'FAILED':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
        Historique des transactions
      </h3>

      <div className="space-y-4">
        {transactions.map((transaction) => {
          const Icon = getTransactionIcon(transaction.type);
          const statusColor = getStatusColor(transaction.status);

          return (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${
                  transaction.type === 'PAYMENT'
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-500'
                    : 'bg-green-100 dark:bg-green-900/30 text-green-500'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {transaction.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    {format(transaction.date, 'dd MMMM yyyy à HH:mm', { locale: fr })}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-medium ${
                  transaction.type === 'PAYMENT' ? 'text-red-500' : 'text-green-500'
                }`}>
                  {transaction.type === 'PAYMENT' ? '-' : '+'}
                  {transaction.amount.toLocaleString()} FCFA
                </p>
                {transaction.points && (
                  <p className="text-sm text-orange-500">
                    +{transaction.points} points
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {transactions.length === 0 && (
        <div className="text-center py-12">
          <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Aucune transaction pour le moment
          </p>
        </div>
      )}
    </div>
  );
}