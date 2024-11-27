import React from 'react';
import { ClipboardList, Clock } from 'lucide-react';

interface Step {
  id: number;
  description: string;
  duration?: string;
  image?: string;
}

interface CookingStepsProps {
  steps: Step[];
}

export default function CookingSteps({ steps }: CookingStepsProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <ClipboardList className="h-5 w-5 mr-2 text-gray-500" />
        Étapes de préparation
      </h3>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={step.id} className="flex">
            <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 font-semibold">
              {index + 1}
            </div>
            <div className="ml-4 flex-grow">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">{step.description}</p>
                {step.duration && (
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {step.duration}
                  </div>
                )}
              </div>
              {step.image && (
                <img
                  src={step.image}
                  alt={`Étape ${index + 1}`}
                  className="mt-3 rounded-lg w-full max-w-md object-cover"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}