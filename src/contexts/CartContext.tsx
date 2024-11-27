import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Recipe } from '../types/recipe';

interface CartItem {
  recipeId: number;
  quantity: number;
  recipe: Recipe;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (recipe: Recipe, quantity?: number) => void;
  removeFromCart: (recipeId: number) => void;
  updateQuantity: (recipeId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  total: 0,
  itemCount: 0
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (recipe: Recipe, quantity = 1) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.recipeId === recipe.id);
      
      if (existingItem) {
        return currentItems.map(item =>
          item.recipeId === recipe.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...currentItems, { recipeId: recipe.id, quantity, recipe }];
    });

    toast.success('Recette ajoutée au panier');
  };

  const removeFromCart = (recipeId: number) => {
    setItems(items.filter(item => item.recipeId !== recipeId));
    toast.success('Recette retirée du panier');
  };

  const updateQuantity = (recipeId: number, quantity: number) => {
    if (quantity < 1) return;
    
    setItems(items.map(item =>
      item.recipeId === recipeId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setItems([]);
    toast.success('Panier vidé');
  };

  const total = items.reduce((sum, item) => {
    const recipePrice = item.recipe.price || 0;
    return sum + (recipePrice * item.quantity);
  }, 0);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      total,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}