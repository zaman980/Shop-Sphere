import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProductById } from "../data/products";
import type { CartItem, LineItem } from "../types";

interface CartState {
  items: CartItem[];
  addItem: (productId: string, qty?: number) => void;
  updateQty: (productId: string, qty: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  lineItems: () => LineItem[];
  itemCount: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId, qty = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.productId === productId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === productId ? { ...i, qty: i.qty + qty } : i
              ),
            };
          }
          return { items: [...state.items, { productId, qty }] };
        });
      },

      updateQty: (productId, qty) => {
        if (qty <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) => (i.productId === productId ? { ...i, qty } : i)),
        }));
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }));
      },

      clearCart: () => set({ items: [] }),

      lineItems: () => {
        return get()
          .items.map((i): LineItem | null => {
            const product = getProductById(i.productId);
            if (!product) return null;
            return { ...i, product, subtotal: product.price * i.qty };
          })
          .filter((li): li is LineItem => li !== null);
      },

      itemCount: () => get().items.reduce((sum, i) => sum + i.qty, 0),

      subtotal: () => get().lineItems().reduce((sum, li) => sum + li.subtotal, 0),
    }),
    {
      name: "shopsphere-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
