'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number, selectedVariants?: Record<string, string>) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity = 1, selectedVariants) => {
        const items = get().items;
        const existing = items.find((item) => {
          if (item.product.id !== product.id) return false;
          if (!selectedVariants && !item.selectedVariants) return true;
          return JSON.stringify(item.selectedVariants) === JSON.stringify(selectedVariants);
        });

        if (existing) {
          set({
            items: items.map((item) =>
              item === existing
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({ items: [...items, { product, quantity, selectedVariants }] });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.product.id !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set({ isOpen: !get().isOpen }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getItemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

      getSubtotal: () =>
        get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    }),
    {
      name: 'naveed-games-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
