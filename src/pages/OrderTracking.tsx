import React from 'react';
import { Package, Search, Truck, CheckCircle } from 'lucide-react';

export default function OrderTracking() {
  return (
    <div className="pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Suivi de commande</h1>
          <p className="text-xl text-gray-600">
            Suivez l'état de votre commande en temps réel
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Entrez votre numéro de commande"
              className="input flex-grow"
            />
            <button className="btn btn-primary">
              <Search className="h-5 w-5 mr-2" />
              Rechercher
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
          {[
            {
              icon: Package,
              title: "Commande confirmée",
              date: "15 Mars 2024 - 14:30",
              status: "completed"
            },
            {
              icon: Truck,
              title: "En cours de livraison",
              date: "15 Mars 2024 - 16:45",
              status: "current"
            },
            {
              icon: CheckCircle,
              title: "Livraison effectuée",
              date: "En attente",
              status: "pending"
            }
          ].map((step, index) => (
            <div key={index} className="relative pl-20 pb-8">
              <div className={`absolute left-7 -translate-x-1/2 w-3 h-3 rounded-full border-2 ${
                step.status === 'completed' ? 'bg-orange-500 border-orange-500' :
                step.status === 'current' ? 'bg-white border-orange-500' :
                'bg-white border-gray-300'
              }`} />
              <div className={`p-4 rounded-lg ${
                step.status === 'current' ? 'bg-orange-50 border border-orange-200' : 'bg-white'
              }`}>
                <div className="flex items-center space-x-3 mb-2">
                  <step.icon className={`h-6 w-6 ${
                    step.status === 'completed' ? 'text-orange-500' :
                    step.status === 'current' ? 'text-orange-500' :
                    'text-gray-400'
                  }`} />
                  <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
                </div>
                <p className="text-gray-600 ml-9">{step.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}