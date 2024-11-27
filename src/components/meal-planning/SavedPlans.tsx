import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useMealPlanning } from '../../contexts/MealPlanningContext';

export default function SavedPlans() {
  const { savedPlans, loadPlan } = useMealPlanning();

  if (!savedPlans || savedPlans.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Plans enregistrés</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {savedPlans.map((plan) => (
          <button
            key={plan.id}
            onClick={() => loadPlan(plan.id)}
            className="bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <Calendar className="h-6 w-6 text-orange-500" />
              <span className="text-sm text-gray-500">
                {format(new Date(plan.week), 'dd MMMM yyyy', { locale: fr })}
              </span>
            </div>
            <h3 className="font-medium text-gray-900 mb-2">{plan.name}</h3>
            <div className="flex items-center text-orange-500">
              <span className="text-sm">Charger ce plan</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}