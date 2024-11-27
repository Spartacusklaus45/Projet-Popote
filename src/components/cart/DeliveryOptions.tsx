import React from 'react';
import { Truck, Clock, Navigation } from 'lucide-react';

interface DeliveryOptionsProps {
  selectedOption: string;
  onOptionChange: (option: string) => void;
  userLocation?: { latitude: number; longitude: number };
}

export default function DeliveryOptions({ 
  selectedOption, 
  onOptionChange,
  userLocation 
}: DeliveryOptionsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Options de livraison</h3>
      
      {userLocation && (
        <div className="mb-4 p-3 bg-green-50 rounded-lg flex items-center">
          <Navigation className="h-5 w-5 text-green-500 mr-2" />
          <span className="text-sm text-green-700">
            Livraison à votre position actuelle disponible
          </span>
        </div>
      )}

      <div className="space-y-4">
        <label className="flex items-start p-4 rounded-lg border cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="delivery"
            value="standard"
            checked={selectedOption === 'standard'}
            onChange={(e) => onOptionChange(e.target.value)}
            className="mt-1 text-orange-500 focus:ring-orange-500"
          />
          <div className="ml-4">
            <div className="flex items-center">
              <Truck className="h-5 w-5 text-gray-400 mr-2" />
              <span className="font-medium text-gray-900">Livraison standard</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Livraison sous 24-48h
            </p>
            <p className="text-sm font-medium text-orange-500 mt-1">
              1 000 FCFA
            </p>
          </div>
        </label>

        <label className="flex items-start p-4 rounded-lg border cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="delivery"
            value="express"
            checked={selectedOption === 'express'}
            onChange={(e) => onOptionChange(e.target.value)}
            className="mt-1 text-orange-500 focus:ring-orange-500"
          />
          <div className="ml-4">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-400 mr-2" />
              <span className="font-medium text-gray-900">Livraison express</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Livraison sous 2-4h
            </p>
            <p className="text-sm font-medium text-orange-500 mt-1">
              2 000 FCFA
            </p>
          </div>
        </label>

        {userLocation && (
          <label className="flex items-start p-4 rounded-lg border cursor-pointer hover:bg-gray-50 bg-orange-50 border-orange-200">
            <input
              type="radio"
              name="delivery"
              value="immediate"
              checked={selectedOption === 'immediate'}
              onChange={(e) => onOptionChange(e.target.value)}
              className="mt-1 text-orange-500 focus:ring-orange-500"
            />
            <div className="ml-4">
              <div className="flex items-center">
                <Navigation className="h-5 w-5 text-orange-500 mr-2" />
                <span className="font-medium text-gray-900">Livraison immédiate</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Livraison à votre position actuelle sous 30-45min
              </p>
              <p className="text-sm font-medium text-orange-500 mt-1">
                3 000 FCFA
              </p>
            </div>
          </label>
        )}
      </div>
    </div>
  );
}