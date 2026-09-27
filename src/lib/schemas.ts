import { z } from "zod";

export const shippingSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  address: z.string().min(5, "Enter a street address"),
  city: z.string().min(2, "Enter a city"),
  state: z.string().min(2, "Enter a state or province"),
  zip: z.string().regex(/^\d{4,6}$/, "Enter a valid postal code"),
  phone: z.string().regex(/^\+?[\d\s-]{7,15}$/, "Enter a valid phone number"),
});

export const paymentSchema = z.object({
  cardName: z.string().min(2, "Enter the name on the card"),
  cardNumber: z
    .string()
    .regex(/^(\d{4}\s?){3}\d{4}$/, "Enter a 16-digit card number"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY"),
  cvv: z.string().regex(/^\d{3,4}$/, "Enter a valid CVV"),
});

export const checkoutSchema = shippingSchema.merge(paymentSchema);
