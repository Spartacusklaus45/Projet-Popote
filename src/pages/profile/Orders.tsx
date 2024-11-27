import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ChevronRight } from 'lucide-react';

export default function Orders() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
      <Package className="h-16 w-16 text-gray-400 mx-auto mb-6" />
      <h3 className="text-xl font-medium text-gray-900 mb-2">
        Aucune commande
      </h3>
      <p className="text-gray-600 mb-6">
        Vous n'avez pas encore passé de commande
      </p>
      <button
        onClick={() => navigate('/recipes')}
        className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
      >
        Découvrir les recettes
        <ChevronRight className="h-5 w-5 ml-2" />
      </button>
    </div>
  );
}