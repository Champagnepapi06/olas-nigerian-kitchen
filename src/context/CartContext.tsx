import { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Dish } from '@/types/dish';
import { toast } from 'sonner';

interface CartContextType {
  cart: CartItem[];
  addToCart: (dish: Dish) => void;
  removeFromCart: (dishId: string) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (dish: Dish) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === dish.id);
      if (existingItem) {
        toast.success(`Increased ${dish.name} quantity`);
        return prevCart.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      toast.success(`Added ${dish.name} to cart`);
      return [...prevCart, { ...dish, quantity: 1 }];
    });
  };

  const removeFromCart = (dishId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== dishId));
    toast.success('Item removed from cart');
  };

  const updateQuantity = (dishId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(dishId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === dishId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.success('Cart cleared');
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
