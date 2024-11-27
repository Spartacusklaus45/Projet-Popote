import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, AlertCircle } from 'lucide-react';

export default function Terms() {
  return (
    <div className="pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Conditions Générales d'Utilisation
          </h1>
          <p className="text-xl text-gray-600">
            Dernière mise à jour : {new Date().toLocaleDateString()}
          </p>
        </motion.div>

        <div className="prose prose-lg max-w-none">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="flex items-center text-2xl font-bold text-gray-900 mb-4">
              <Shield className="h-6 w-6 text-orange-500 mr-2" />
              1. Introduction
            </h2>
            <p className="text-gray-600">
              Les présentes conditions générales régissent l'utilisation de Popote, une plateforme de cuisine en ligne.
              En utilisant notre service, vous acceptez ces conditions dans leur intégralité.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="flex items-center text-2xl font-bold text-gray-900 mb-4">
              <Lock className="h-6 w-6 text-orange-500 mr-2" />
              2. Utilisation du service
            </h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Vous devez avoir au moins 18 ans pour utiliser notre service</li>
              <li>Vous êtes responsable de la confidentialité de votre compte</li>
              <li>Toute utilisation frauduleuse sera sanctionnée</li>
              <li>Les commandes sont soumises à disponibilité</li>
              <li>Les prix peuvent être modifiés sans préavis</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="flex items-center text-2xl font-bold text-gray-900 mb-4">
              <Eye className="h-6 w-6 text-orange-500 mr-2" />
              3. Confidentialité et données personnelles
            </h2>
            <p className="text-gray-600 mb-4">
              Nous accordons une grande importance à la protection de vos données personnelles.
              Pour plus d'informations, consultez notre politique de confidentialité.
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Collecte et utilisation des données</li>
              <li>Protection des informations personnelles</li>
              <li>Cookies et traceurs</li>
              <li>Droits des utilisateurs</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="flex items-center text-2xl font-bold text-gray-900 mb-4">
              <AlertCircle className="h-6 w-6 text-orange-500 mr-2" />
              4. Limitations de responsabilité
            </h2>
            <p className="text-gray-600 mb-4">
              Popote ne peut être tenu responsable des dommages indirects résultant de l'utilisation de notre service.
            </p>
            <div className="bg-orange-50 rounded-lg p-4">
              <p className="text-orange-800">
                En cas de litige, une solution amiable sera privilégiée avant tout recours judiciaire.
              </p>
            </div>
          </motion.section>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 p-6 bg-white rounded-xl shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Contact
          </h3>
          <p className="text-gray-600">
            Pour toute question concernant ces conditions générales, contactez-nous à{' '}
            <a href="mailto:legal@popote.ci" className="text-orange-500 hover:text-orange-600">
              legal@popote.ci
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}