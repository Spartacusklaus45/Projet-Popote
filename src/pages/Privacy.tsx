import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, UserCheck } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Politique de Confidentialité
          </h1>
          <p className="text-xl text-gray-600">
            Comment nous protégeons vos données personnelles
          </p>
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Protection des données
              </h2>
            </div>
            <p className="text-gray-600">
              Nous accordons une importance particulière à la protection de vos données personnelles.
              Cette politique détaille comment nous collectons, utilisons et protégeons vos informations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Database className="h-6 w-6 text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Données collectées
              </h2>
            </div>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2" />
                <span>Informations d'identification (nom, prénom, email)</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2" />
                <span>Données de livraison (adresse, téléphone)</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2" />
                <span>Préférences alimentaires et restrictions</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Lock className="h-6 w-6 text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Sécurité des données
              </h2>
            </div>
            <p className="text-gray-600">
              Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles
              pour protéger vos données contre tout accès non autorisé, modification,
              divulgation ou destruction.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center space-x-3 mb-4">
              <UserCheck className="h-6 w-6 text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Vos droits
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              Vous disposez de droits concernant vos données personnelles :
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Droit d'accès à vos données</li>
              <li>• Droit de rectification</li>
              <li>• Droit à l'effacement</li>
              <li>• Droit à la portabilité</li>
              <li>• Droit d'opposition</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Eye className="h-6 w-6 text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Contact
              </h2>
            </div>
            <p className="text-gray-600">
              Pour toute question concernant notre politique de confidentialité ou
              pour exercer vos droits, contactez notre délégué à la protection des
              données à privacy@popote.ci
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}