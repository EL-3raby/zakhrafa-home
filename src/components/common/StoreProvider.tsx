'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Product } from '@/types/product';

type CartItem = Product & { quantity: number };

interface StoreContextValue {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);

  useEffect(() => {
    const savedCart = window.localStorage.getItem('zakhrafa-cart');
    const savedWishlist = window.localStorage.getItem('zakhrafa-wishlist');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    setHasLoadedStorage(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedStorage) return;
    window.localStorage.setItem('zakhrafa-cart', JSON.stringify(cart));
  }, [cart, hasLoadedStorage]);

  useEffect(() => {
    if (!hasLoadedStorage) return;
    window.localStorage.setItem('zakhrafa-wishlist', JSON.stringify(wishlist));
  }, [wishlist, hasLoadedStorage]);

  const value = useMemo<StoreContextValue>(() => ({
    cart,
    wishlist,
    addToCart: (product, quantity = 1) => {
      setCart((current) => {
        const existing = current.find((item) => item.id === product.id);
        if (existing) {
          return current.map((item) => item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item);
        }
        return [...current, { ...product, quantity }];
      });
    },
    removeFromCart: (productId) => setCart((current) => current.filter((item) => item.id !== productId)),
    updateCartQuantity: (productId, quantity) => {
      setCart((current) => quantity > 0
        ? current.map((item) => item.id === productId ? { ...item, quantity } : item)
        : current.filter((item) => item.id !== productId));
    },
    toggleWishlist: (product) => {
      setWishlist((current) => current.some((item) => item.id === product.id)
        ? current.filter((item) => item.id !== product.id)
        : [...current, product]);
    },
    isWishlisted: (productId) => wishlist.some((item) => item.id === productId),
  }), [cart, wishlist]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used inside StoreProvider');
  return context;
};