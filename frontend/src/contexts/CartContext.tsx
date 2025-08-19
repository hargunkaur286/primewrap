
// import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// import axios from 'axios';
// import { useAuth } from './AuthContext';

// export interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image?: string;
// }

// interface CartContextType {
//   items: CartItem[];
//   addItem: (item: CartItem) => Promise<void>;
//   removeItem: (itemId: string) => Promise<void>;
//   clearCart: () => Promise<void>;
//   getTotalItems: () => number;
//   getTotalPrice: () => number;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const { isAuthenticated } = useAuth();
//   const [items, setItems] = useState<CartItem[]>([]);

//   // Load cart when user logs in
//   useEffect(() => {
//     const fetchCart = async () => {
//       if (!isAuthenticated) {
//         console.log('🛒 [CartContext] User not authenticated — clearing cart');
//         setItems([]);
//         return;
//       }
//       try {
//         console.log('🛒 [CartContext] Fetching cart from backend...');
//         const res = await axios.get('http://localhost:4000/api/v1/user/cart', {
//           withCredentials: true,
//         });
//         console.log('🛒 [CartContext] fetchCart response:', res.data.cart);
//         setItems(res.data.cart || []);
//       } catch (err) {
//         console.error('🛒 [CartContext] fetchCart error:', err);
//         setItems([]);
//       }
//     };
//     fetchCart();
//   }, [isAuthenticated]);

//   // Sync local cart to backend
//   const syncCart = async (newCart: CartItem[]) => {
//     console.log('🛒 [CartContext] syncCart sending:', newCart);
//     setItems(newCart);
//     try {
//       const res = await axios.post(
//         'http://localhost:4000/api/v1/user/cart',
//         { cartItems: newCart },
//         { withCredentials: true }
//       );
//       console.log('🛒 [CartContext] saveCart response:', res.data.cart);
//     } catch (err) {
//       console.error('🛒 [CartContext] syncCart error:', err);
//     }
//   };

//   // const addItem = async (item: CartItem) => {
//   //   console.log('🛒 [CartContext] addItem called with:', item);
//   //   const existing = items.find(i => i.id === item.id);
//   //   let updated: CartItem[];
//   //   if (existing) {
//   //     updated = items.map(i =>
//   //       i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
//   //     );
//   //   } else {
//   //     updated = [...items, { ...item, quantity: 1 }];
//   //   }
//   //   await syncCart([newItem]); 
//   // };

//   const addItem = async (item: CartItem) => {
//     console.log('🛒 [CartContext] addItem called with:', item);
//     const existing = items.find(i => i.id === item.id);
//     let updated: CartItem[];
//     if (existing) {
//       updated = items.map(i =>
//         i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
//       );
//     } else {
//       updated = [...items, { ...item, quantity: 1 }];
//     }
//     // <-- send the full updated array
//     await syncCart(updated);
//   };

//   const removeItem = async (itemId: string) => {
//     console.log('🛒 [CartContext] removeItem called for ID:', itemId);
//     const updated = items.filter(i => i.id !== itemId);
//     await syncCart(updated);
//   };

//   const clearCart = async () => {
//     console.log('🛒 [CartContext] clearCart called');
//     await syncCart([]);
//   };

//   const getTotalItems = () => items.reduce((sum, i) => sum + i.quantity, 0);
//   const getTotalPrice = () => items.reduce((sum, i) => sum + i.price * i.quantity, 0);

//   return (
//     <CartContext.Provider
//       value={{ items, addItem, removeItem, clearCart, getTotalItems, getTotalPrice }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = (): CartContextType => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };


import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart when user logs in
  useEffect(() => {
    const fetchCart = async () => {
      if (!isAuthenticated) {
        console.log('🛒 [CartContext] clearing cart (not authenticated)');
        setItems([]);
        return;
      }
      try {
        console.log('🛒 [CartContext] fetching cart…');
        const res = await axios.get('http://localhost:4000/api/v1/user/cart', {
          withCredentials: true,
        });
        console.log('🛒 [CartContext] fetchCart response:', res.data.cart);
        setItems(res.data.cart || []);
      } catch (err) {
        console.error('🛒 [CartContext] fetchCart error:', err);
        setItems([]);
      }
    };
    fetchCart();
  }, [isAuthenticated]);

  // Sync local cart to backend
  const syncCart = async (newCart: CartItem[]) => {
    console.log('🛒 [CartContext] syncing cart:', newCart);
    setItems(newCart);
    try {
      const res = await axios.post(
        'http://localhost:4000/api/v1/user/cart',
        { cartItems: newCart },
        { withCredentials: true }
      );
      console.log('🛒 [CartContext] saveCart response:', res.data.cart);
    } catch (err) {
      console.error('🛒 [CartContext] syncCart error:', err);
    }
  };

  const addItem = async (item: CartItem) => {
    console.log('🛒 [CartContext] addItem:', item);
    const existing = items.find(i => i.id === item.id);
    const updated = existing
      ? items.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      : [...items, { ...item, quantity: 1 }];
    await syncCart(updated);
  };

  const removeItem = async (itemId: string) => {
    console.log('🛒 [CartContext] removeItem:', itemId);
    const updated = items.filter(i => i.id !== itemId);
    await syncCart(updated);
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    console.log('🛒 [CartContext] updateQuantity:', itemId, quantity);
    if (quantity < 1) {
      // If you want removing when quantity goes to zero:
      return removeItem(itemId);
    }
    const updated = items.map(i =>
      i.id === itemId ? { ...i, quantity } : i
    );
    await syncCart(updated);
  };

  const clearCart = async () => {
    console.log('🛒 [CartContext] clearCart');
    await syncCart([]);
  };

  const getTotalItems = () => items.reduce((sum, i) => sum + i.quantity, 0);
  const getTotalPrice = () =>
    items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
};
