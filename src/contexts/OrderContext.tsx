import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

export interface OrderItem {
  recipeId: number;
  quantity: number;
  price: number;
  recipe: {
    title: string;
    image: string;
  };
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  deliveryAddress: string;
  paymentMethod: string;
  trackingNumber?: string;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'date'>) => Promise<void>;
  cancelOrder: (orderId: string) => Promise<void>;
  getOrderById: (orderId: string) => Order | undefined;
  loading: boolean;
  error: Error | null;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  const addOrder = async (orderData: Omit<Order, 'id' | 'date'>) => {
    try {
      setLoading(true);
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newOrder: Order = {
        ...orderData,
        id: `ORD-${Date.now()}`,
        date: new Date().toISOString()
      };

      setOrders(prev => [newOrder, ...prev]);
      toast.success('Commande créée avec succès !');
    } catch (err) {
      toast.error('Erreur lors de la création de la commande');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId: string) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      setOrders(prev =>
        prev.map(order =>
          order.id === orderId
            ? { ...order, status: 'cancelled' }
            : order
        )
      );
      toast.success('Commande annulée');
    } catch (err) {
      toast.error('Erreur lors de l\'annulation de la commande');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getOrderById = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  return (
    <OrderContext.Provider value={{
      orders,
      addOrder,
      cancelOrder,
      getOrderById,
      loading,
      error
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}