import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  ChefHat, 
  Thermometer, 
  AlertCircle,
  Check,
  Timer
} from 'lucide-react';

interface Step {
  id: string;
  description: string;
  duration: number;
  temperature?: number;
  tips?: string[];
  image?: string;
}

interface CookingStepsProps {
  steps: Step[];
}

export default function CookingSteps({ steps }: CookingStepsProps) {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [activeTimer, setActiveTimer] = useState<string | null>(null);

  const toggleStep = (stepId: string) => {
    setCompletedSteps(prev =>
      prev.includes(stepId)
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const totalDuration = steps.reduce((total, step) => total + step.duration, 0);

  return (
    <div className="space-y-8">
      {/* Résumé */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          <Timer className="h-5 w-5 text-gray-500 mr-2" />
          <span className="font-medium text-gray-900">Temps total de préparation</span>
        </div>
        <span className="text-gray-600">{totalDuration} minutes</span>
      </div>

      {/* Étapes */}
      <div className="space-y-6">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative p-6 rounded-lg border-2 transition-colors ${
              completedSteps.includes(step.id)
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200'
            }`}
          >
            {/* Numéro de l'étape */}
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleStep(step.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    completedSteps.includes(step.id)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {completedSteps.includes(step.id) ? (
                    <Check className="h-6 w-6" />
                  ) : (
                    <span className="text-lg font-bold">{index + 1}</span>
                  )}
                </motion.button>
              </div>

              <div className="ml-4 flex-grow">
                {/* Informations de l'étape */}
                <div className="flex items-center space-x-4 mb-2">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600">{step.duration} min</span>
                  </div>
                  {step.temperature && (
                    <div className="flex items-center">
                      <Thermometer className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-600">{step.temperature}°C</span>
                    </div>
                  )}
                  {activeTimer === step.id ? (
                    <button
                      onClick={() => setActiveTimer(null)}
                      className="text-sm text-orange-500 hover:text-orange-600"
                    >
                      Arrêter le minuteur
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveTimer(step.id)}
                      className="text-sm text-gray-500 hover:text-gray-600"
                    >
                      Démarrer le minuteur
                    </button>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-900 mb-4">{step.description}</p>

                {/* Image de l'étape */}
                {step.image && (
                  <img
                    src={step.image}
                    alt={`Étape ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}

                {/* Conseils */}
                {step.tips && step.tips.length > 0 && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <AlertCircle className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="font-medium text-blue-900">Conseils</span>
                    </div>
                    <ul className="space-y-2">
                      {step.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start text-blue-800">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}