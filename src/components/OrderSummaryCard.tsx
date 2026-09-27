import { imageFor } from "../data/products";
import { formatPrice } from "../lib/format";
import type { LineItem } from "../types";

interface OrderSummaryCardProps {
  lineItems: LineItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
}

export default function OrderSummaryCard({ lineItems, subtotal, shippingCost, total }: OrderSummaryCardProps) {
  return (
    <div className="rounded-xl border border-line bg-white p-5 shadow-card lg:sticky lg:top-24">
      <h2 className="mb-4 font-display text-lg">Order summary</h2>
      <ul className="flex flex-col gap-3">
        {lineItems.map((li) => (
          <li key={li.productId} className="flex items-center gap-3">
            <img
              src={imageFor(li.product.seed, 100)}
              alt={li.product.name}
              className="h-12 w-12 shrink-0 rounded-md object-cover"
            />
            <div className="flex-1 text-sm">
              <p className="leading-snug">{li.product.name}</p>
              <p className="text-ink/50">Qty {li.qty}</p>
            </div>
            <span className="shrink-0 text-sm text-ink/70">{formatPrice(li.subtotal)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 space-y-1.5 border-t border-line pt-4 text-sm">
        <div className="flex justify-between text-ink/60">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-ink/60">
          <span>Shipping</span>
          <span>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
        </div>
        <div className="flex justify-between border-t border-line pt-2 text-base font-medium text-ink">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}
