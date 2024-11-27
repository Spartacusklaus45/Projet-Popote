import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  AlertCircle,
  Camera,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface Step {
  id: string;
  description: string;
  duration: number;
  image?: string;
  tips?: string[];
}

interface RecipeProgressProps {
  steps: Step[];
  currentStep: number;
  onStepComplete: (stepId: string) => void;
  onNextStep: () => void;
  onPreviousStep: () => void;
}

export default function RecipeProgress({
  steps,
  currentStep,
  onStepComplete,
  onNextStep,
  onPreviousStep
}: RecipeProgressProps) {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const handleStepComplete = (stepId: string) => {
    setCompletedSteps(prev => [...prev, stepId]);
    onStepComplete(stepId);
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="relative">
        <div className="h-2 bg-gray-200 rounded-full">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            className="h-full bg-orange-500 rounded-full"
          />
        </div>
        <div className="absolute -top-8 left-0 right-0 flex justify-between">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                index < currentStep
                  ? 'bg-orange-500 text-white'
                  : index === currentStep
                  ? 'bg-orange-100 text-orange-500'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Current Step */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Étape {currentStep + 1}
          </h3>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-gray-400" />
            <span className="text-gray-600">{currentStepData.duration} min</span>
          </div>
        </div>

        <p className="text-gray-700 mb-6">{currentStepData.description}</p>

        {currentStepData.image && (
          <img
            src={currentStepData.image}
            alt={`Étape ${currentStep + 1}`}
            className="w-full h-48 object-cover rounded-lg mb-6"
          />
        )}

        {currentStepData.tips && currentStepData.tips.length > 0 && (
          <div className="bg-orange-50 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 mr-2" />
              <div>
                <h4 className="font-medium text-gray-900">Conseils</h4>
                <ul className="mt-2 space-y-2">
                  {currentStepData.tips.map((tip, index) => (
                    <li key={index} className="flex items-start text-gray-600">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPreviousStep}
            disabled={currentStep === 0}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Précédent
          </motion.button>

          {currentStep < steps.length - 1 ? (
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNextStep}
              className="flex items-center px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Suivant
              <ChevronRight className="h-5 w-5 ml-2" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleStepComplete(currentStepData.id)}
              className="flex items-center px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              Terminer
            </motion.button>
          )}
        </div>
      </div>

      {/* Step List */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex items-center p-4 rounded-lg ${
              index === currentStep
                ? 'bg-orange-50 border-2 border-orange-500'
                : 'bg-white'
            }`}
          >
            {completedSteps.includes(step.id) ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <Circle className="h-6 w-6 text-gray-300" />
            )}
            <span className="ml-4 text-gray-600">{step.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}