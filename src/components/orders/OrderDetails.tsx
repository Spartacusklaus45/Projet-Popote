import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Package, 
  Clock, 
  MapPin, 
  CreditCard,
  ExternalLink 
} from 'lucide-react';
import { Order } from '../../contexts/OrderContext';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface OrderDetailsProps {
  order: Order;
  onClose: () => void;
}

export default function OrderDetails({ order, onClose }: OrderDetailsProps) {
  const navigate = useNavigate();

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  const statusLabels = {
    pending: 'En attente',
    processing: 'En préparation',
    delivered: 'Livré',
    cancelled: 'Annulé'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onClose}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour
        </button>
        <span className={`px-3 py-1 rounded-full text-sm ${statusColors[order.status]}`}>
          {statusLabels[order.status]}
        </span>
      </div>

      <div className="space-y-6">
        {/* Order Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Commande</p>
            <p className="font-medium">{order.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Date</p>
            <p className="font-medium">
              {format(new Date(order.date), 'dd MMMM yyyy', { locale: fr })}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Total</p>
            <p className="font-medium">{order.total.toLocaleString()} FCFA</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Paiement</p>
            <p className="font-medium">{order.paymentMethod}</p>
          </div>
        </div>

        {/* Order Items */}
        <div>
          <h3 className="font-medium text-gray-900 mb-4">Articles commandés</h3>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center p-4 bg-gray-50 rounded-lg"
              >
                <img
                  src={item.recipe.image}
                  alt={item.recipe.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="ml-4 flex-grow">
                  <h4 className="font-medium text-gray-900">{item.recipe.title}</h4>
                  <p className="text-sm text-gray-600">Quantité : {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    {item.price.toLocaleString()} FCFA
                  </p>
                  <button
                    onClick={() => navigate(`/recipes/${item.recipeId}`)}
                    className="text-sm text-orange-500 hover:text-orange-600 flex items-center mt-1"
                  >
                    Voir la recette
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Info */}
        <div>
          <h3 className="font-medium text-gray-900 mb-4">Informations de livraison</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-gray-400 mt-1" />
              <div>
                <p className="font-medium text-gray-900">Adresse de livraison</p>
                <p className="text-gray-600">{order.deliveryAddress}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}