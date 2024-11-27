import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Phone,
  MapPin,
  User,
  Mail,
  AlertCircle,
  Check,
  Navigation
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import LocationPicker from '../components/location/LocationPicker';

// ... (rest of the imports)

interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

export default function Checkout() {
  const { total } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [location, setLocation] = useState<Location | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    notes: ''
  });

  const handleLocationSelect = (selectedLocation: Location) => {
    setLocation(selectedLocation);
    if (selectedLocation.address) {
      setFormData(prev => ({
        ...prev,
        address: selectedLocation.address
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Simuler le processus de paiement
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Rediriger vers la confirmation
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Erreur lors du paiement:', error);
    }
  };

  return (
    <div className="pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Finaliser la commande</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Location Picker */}
          <LocationPicker onLocationSelect={handleLocationSelect} />

          {/* Informations de livraison */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Informations de livraison
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ... (rest of the delivery information form) ... */}
            </div>
          </div>

          {/* ... (rest of the checkout form) ... */}
        </form>
      </div>
    </div>
  );
}