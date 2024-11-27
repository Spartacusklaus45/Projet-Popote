import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight,
  Tag,
  Truck,
  CreditCard,
  Phone,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import PromoCodeInput from '../components/cart/PromoCodeInput';
import DeliveryOptions from '../components/cart/DeliveryOptions';
import CartSummary from '../components/cart/CartSummary';
import EmptyCart from '../components/cart/EmptyCart';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, total } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('standard');

  const deliveryFees = {
    standard: 1000,
    express: 2000
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mon Panier</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liste des articles */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.recipeId} className="flex items-center space-x-4">
                    <img
                      src={item.recipe.image}
                      alt={item.recipe.title}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-grow">
                      <h3 className="text-lg font-medium text-gray-900">
                        {item.recipe.title}
                      </h3>
                      <p className="text-orange-500 font-medium">
                        {item.recipe.price} FCFA
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.recipeId, item.quantity - 1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Minus className="h-4 w-4 text-gray-600" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.recipeId, item.quantity + 1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.recipeId)}
                        className="p-2 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code promo */}
            <PromoCodeInput
              promoCode={promoCode}
              setPromoCode={setPromoCode}
            />

            {/* Options de livraison */}
            <DeliveryOptions
              selectedOption={deliveryOption}
              onOptionChange={setDeliveryOption}
            />
          </div>

          {/* Résumé de la commande */}
          <CartSummary
            items={items}
            total={total}
            deliveryFee={deliveryFees[deliveryOption]}
            promoCode={promoCode}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
}