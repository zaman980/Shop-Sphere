import type { z } from "zod";
import type { shippingSchema, paymentSchema } from "./lib/schemas";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  seed: string;
  description: string;
  tags: string[];
}

export interface CartItem {
  productId: string;
  qty: number;
}

export interface LineItem extends CartItem {
  product: Product;
  subtotal: number;
}

export type ShippingInfo = z.infer<typeof shippingSchema>;
export type PaymentInfo = z.infer<typeof paymentSchema>;

export type OrderStatus = "processing" | "confirmed" | "failed";

export interface Order {
  id: string;
  status: OrderStatus;
  createdAt: string;
  lineItems: LineItem[];
  total: number;
  shipping: ShippingInfo;
  error?: string;
}

export interface Filters {
  query: string;
  categories: string[];
  maxPrice: number;
  minRating: number;
}
