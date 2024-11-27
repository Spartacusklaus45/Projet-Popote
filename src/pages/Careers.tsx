import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Users, 
  Award, 
  TrendingUp,
  Briefcase,
  GraduationCap,
  Globe,
  Heart,
  Star
} from 'lucide-react';
import JobApplicationModal from '../components/careers/JobApplicationModal';

const positions = [
  {
    title: "Chef de Projet Digital",
    department: "Tech",
    location: "Abidjan",
    type: "CDI",
    description: "Dirigez le développement de nouvelles fonctionnalités innovantes",
    requirements: [
      "5+ ans d'expérience en gestion de projet",
      "Maîtrise des méthodologies Agile",
      "Excellentes capacités de communication"
    ]
  },
  {
    title: "Développeur Frontend",
    department: "Tech",
    location: "Remote",
    type: "CDI",
    description: "Créez des expériences utilisateur exceptionnelles",
    requirements: [
      "3+ ans d'expérience en React",
      "Expertise en TypeScript",
      "Passion pour l'UI/UX"
    ]
  },
  {
    title: "Chef Cuisinier",
    department: "Cuisine",
    location: "Abidjan",
    type: "CDI",
    description: "Créez et validez de nouvelles recettes pour notre plateforme",
    requirements: [
      "5+ ans d'expérience en cuisine",
      "Expertise en cuisine africaine",
      "Créativité et innovation"
    ]
  },
  {
    title: "Responsable Marketing",
    department: "Marketing",
    location: "Abidjan",
    type: "CDI",
    description: "Développez notre présence sur le marché ivoirien",
    requirements: [
      "3+ ans en marketing digital",
      "Maîtrise des réseaux sociaux",
      "Expérience en growth hacking"
    ]
  }
];

const benefits = [
  {
    icon: Building2,
    title: "Environnement moderne",
    description: "Des bureaux confortables et bien équipés"
  },
  {
    icon: Users,
    title: "Équipe passionnée",
    description: "Collaborez avec des experts talentueux"
  },
  {
    icon: Award,
    title: "Formation continue",
    description: "Développez vos compétences"
  },
  {
    icon: Heart,
    title: "Avantages sociaux",
    description: "Mutuelle santé et autres avantages"
  },
  {
    icon: Star,
    title: "Bonus annuel",
    description: "Récompenses basées sur la performance"
  },
  {
    icon: Globe,
    title: "Remote possible",
    description: "Flexibilité de travail"
  }
];

const values = [
  {
    title: "Innovation",
    description: "Nous repoussons constamment les limites de la technologie culinaire",
    icon: TrendingUp
  },
  {
    title: "Excellence",
    description: "Nous visons l'excellence dans tout ce que nous faisons",
    icon: Award
  },
  {
    title: "Collaboration",
    description: "Le travail d'équipe est au cœur de notre réussite",
    icon: Users
  }
];

export default function Careers() {
  const [selectedPosition, setSelectedPosition] = useState<any>(null);

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="relative mb-16">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
              alt="Carrières chez Popote"
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
              Rejoignez l'aventure Popote
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-orange-100 max-w-2xl mx-auto"
            >
              Ensemble, révolutionnons la façon de cuisiner en Afrique
            </motion.p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Nos valeurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm text-center"
              >
                <div className="inline-flex p-3 bg-orange-100 rounded-lg mb-4">
                  <value.icon className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Avantages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <benefit.icon className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Postes ouverts
          </h2>
          <div className="space-y-6">
            {positions.map((position, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {position.title}
                      </h3>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-gray-500">
                          {position.department}
                        </span>
                        <span className="text-sm text-gray-500">
                          {position.location}
                        </span>
                        <span className="text-sm text-gray-500">
                          {position.type}
                        </span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedPosition(position)}
                      className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      Postuler
                    </motion.button>
                  </div>
                  <p className="text-gray-600 mb-4">{position.description}</p>
                  <div className="space-y-2">
                    {position.requirements.map((req, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2" />
                        {req}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-orange-50 rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Vous ne trouvez pas le poste idéal ?
          </h2>
          <p className="text-gray-600 mb-8">
            Envoyez-nous une candidature spontanée et nous vous recontacterons dès qu'un poste correspondant à votre profil sera disponible.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
          >
            <Briefcase className="h-5 w-5 mr-2" />
            Candidature spontanée
          </motion.button>
        </motion.div>
      </div>

      <JobApplicationModal
        isOpen={!!selectedPosition}
        onClose={() => setSelectedPosition(null)}
        position={selectedPosition}
      />
    </div>
  );
}