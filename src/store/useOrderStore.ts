import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LineItem, Order, ShippingInfo } from "../types";

function confirmOrderOnServer(): Promise<void> {
  return new Promise((resolve, reject) => {
    const delay = 900 + Math.random() * 900;
    setTimeout(() => {
      if (Math.random() < 0.85) {
        resolve();
      } else {
        reject(new Error("Payment could not be verified. Please retry."));
      }
    }, delay);
  });
}

function generateOrderId(): string {
  return `SS-${Date.now().toString().slice(-6)}`;
}

interface PlaceOrderArgs {
  lineItems: LineItem[];
  total: number;
  shipping: ShippingInfo;
}

interface OrderState {
  orders: Order[];
  placeOrder: (args: PlaceOrderArgs) => string;
  retryOrder: (id: string) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orders: [],

      placeOrder: ({ lineItems, total, shipping }) => {
        const id = generateOrderId();
        const newOrder: Order = {
          id,
          status: "processing",
          createdAt: new Date().toISOString(),
          lineItems,
          total,
          shipping,
        };

        set((state) => ({ orders: [newOrder, ...state.orders] }));

        confirmOrderOnServer()
          .then(() => {
            set((state) => ({
              orders: state.orders.map((o) => (o.id === id ? { ...o, status: "confirmed" } : o)),
            }));
          })
          .catch((err: Error) => {
            set((state) => ({
              orders: state.orders.map((o) =>
                o.id === id ? { ...o, status: "failed", error: err.message } : o
              ),
            }));
          });

        return id;
      },

      retryOrder: (id) => {
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === id ? { ...o, status: "processing", error: undefined } : o
          ),
        }));

        confirmOrderOnServer()
          .then(() => {
            set((state) => ({
              orders: state.orders.map((o) => (o.id === id ? { ...o, status: "confirmed" } : o)),
            }));
          })
          .catch((err: Error) => {
            set((state) => ({
              orders: state.orders.map((o) =>
                o.id === id ? { ...o, status: "failed", error: err.message } : o
              ),
            }));
          });
      },
    }),
    { name: "shopsphere-orders" }
  )
);
