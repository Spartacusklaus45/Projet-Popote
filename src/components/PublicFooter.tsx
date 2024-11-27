import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChefHat, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function PublicFooter() {
  const footerSections = [
    {
      title: 'À propos',
      links: [
        { name: 'Notre histoire', path: '/about' },
        { name: 'Comment ça marche', path: '/how-it-works' },
        { name: 'Nos partenaires', path: '/partners' },
        { name: 'Carrières', path: '/careers' }
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Recettes', path: '/recipes' },
        { name: 'Blog', path: '/blog' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Contact', path: '/contact' }
      ]
    },
    {
      title: 'Légal',
      links: [
        { name: 'Conditions générales', path: '/terms' },
        { name: 'Politique de confidentialité', path: '/privacy' },
        { name: 'Mentions légales', path: '/legal' },
        { name: 'Cookies', path: '/cookies' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, name: 'Facebook', url: 'https://facebook.com/popote' },
    { icon: Instagram, name: 'Instagram', url: 'https://instagram.com/popote' },
    { icon: Twitter, name: 'Twitter', url: 'https://twitter.com/popote' },
    { icon: Youtube, name: 'Youtube', url: 'https://youtube.com/popote' }
  ];

  return (
    <footer className="bg-gradient-to-br from-green-200 via-yellow-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Decorative background patterns */}
      <div className="absolute inset-0 bg-[url('/images/motif-ustensiles.svg')] opacity-5 animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/30 dark:via-black/5 dark:to-black/20" />

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-green-400 to-yellow-500 p-2 rounded-xl shadow-lg"
              >
                <ChefHat className="h-8 w-8 text-white" />
              </motion.div>
              <span className="text-2xl font-bold text-green-900">Popote</span>
            </Link>
            <p className="text-green-800 dark:text-gray-300 mb-8">
              Découvrez une nouvelle façon de cuisiner avec Popote. 
              Des ingrédients frais, des recettes délicieuses, le tout livré chez vous.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-green-900/10 hover:bg-green-900/20 rounded-lg text-green-900 dark:text-gray-300 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold text-green-900 dark:text-gray-100 mb-6">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-green-800 dark:text-gray-300 hover:text-green-700 dark:hover:text-gray-200 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-green-800/30 dark:border-gray-700/30">
          {[
            { icon: MapPin, text: "Abidjan, Côte d'Ivoire" },
            { icon: Phone, text: "+225 XX XX XX XX" },
            { icon: Mail, text: "contact@popote.ci" }
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-3 text-green-900 dark:text-gray-300">
              <item.icon className="h-5 w-5" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="py-8 border-t border-green-800/30 dark:border-gray-700/30 text-center">
          <p className="text-green-800/70 dark:text-gray-400/70">
            © {new Date().getFullYear()} Popote. Tous droits réservés.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}