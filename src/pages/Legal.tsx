import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Building2, Mail, Phone } from 'lucide-react';

export default function Legal() {
  return (
    <div className="pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Mentions Légales
          </h1>
          <p className="text-xl text-gray-600">
            Informations légales concernant Popote
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
              <Building2 className="h-6 w-6 text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Informations sur la société
              </h2>
            </div>
            <div className="space-y-2 text-gray-600">
              <p><strong>Raison sociale :</strong> Popote SARL</p>
              <p><strong>Capital social :</strong> 10 000 000 FCFA</p>
              <p><strong>RCCM :</strong> CI-ABJ-XXXX-XX</p>
              <p><strong>Siège social :</strong> Abidjan, Côte d'Ivoire</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Scale className="h-6 w-6 text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Responsabilité éditoriale
              </h2>
            </div>
            <div className="space-y-2 text-gray-600">
              <p><strong>Directeur de la publication :</strong> John Doe</p>
              <p><strong>Responsable éditorial :</strong> Jane Smith</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Mail className="h-6 w-6 text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Contact
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail className="h-5 w-5" />
                <span>contact@popote.ci</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone className="h-5 w-5" />
                <span>+225 XX XX XX XX</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Building2 className="h-5 w-5" />
                <span>Abidjan, Côte d'Ivoire</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Hébergement
            </h2>
            <p className="text-gray-600">
              Le site Popote est hébergé par XXXX, société au capital de XXX FCFA,
              dont le siège social est situé à XXX.
            </p>
          </motion.div>

          {/* Informations complémentaires */}
          <div className="bg-orange-50 rounded-xl p-6">
            <h3 className="font-medium text-gray-900 mb-4">
              Informations complémentaires
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Les prix sont indiqués en FCFA toutes taxes comprises</li>
              <li>• Les photos sont non contractuelles</li>
              <li>• La société se réserve le droit de modifier ses offres à tout moment</li>
              <li>• Les conditions générales de vente sont disponibles sur demande</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}