import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Loader } from 'lucide-react';
import toast from 'react-hot-toast';

interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

interface LocationPickerProps {
  onLocationSelect: (location: Location) => void;
}

export default function LocationPicker({ onLocationSelect }: LocationPickerProps) {
  const [loading, setLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);

  const getAddressFromCoords = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      return data.display_name;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'adresse:', error);
      return null;
    }
  };

  const getCurrentLocation = () => {
    setLoading(true);
    if (!navigator.geolocation) {
      toast.error('La géolocalisation n\'est pas supportée par votre navigateur');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const address = await getAddressFromCoords(latitude, longitude);
        const location = { latitude, longitude, address };
        setCurrentLocation(location);
        onLocationSelect(location);
        setLoading(false);
        toast.success('Localisation récupérée avec succès !');
      },
      (error) => {
        console.error('Erreur de géolocalisation:', error);
        toast.error('Impossible de récupérer votre position');
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Adresse de livraison</h3>
        <button
          onClick={getCurrentLocation}
          disabled={loading}
          className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <Loader className="h-5 w-5 animate-spin mr-2" />
          ) : (
            <Navigation className="h-5 w-5 mr-2" />
          )}
          Utiliser ma position
        </button>
      </div>

      {currentLocation && (
        <div className="mt-4 p-4 bg-orange-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-orange-500 flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-gray-900">Position actuelle</p>
              <p className="text-sm text-gray-600 mt-1">{currentLocation.address}</p>
              <p className="text-xs text-gray-500 mt-1">
                {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4">
        <p className="text-sm text-gray-600">
          Activez la localisation pour une livraison plus précise et rapide. 
          Nous utiliserons votre position uniquement pour la livraison.
        </p>
      </div>
    </div>
  );
}