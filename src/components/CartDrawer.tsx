import { useNavigate } from "react-router-dom";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import { imageFor } from "../data/products";
import { formatPrice } from "../lib/format";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const navigate = useNavigate();
  const lineItems = useCartStore((s) => s.lineItems());
  const subtotal = useCartStore((s) => s.subtotal());
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-ink/30 animate-fadeIn" onClick={onClose} />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-paper shadow-xl animate-slideIn">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-display text-lg">Your cart</h2>
          <button onClick={onClose} aria-label="Close cart" className="rounded-full p-1.5 hover:bg-ink/5">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lineItems.length === 0 ? (
            <div className="mt-14 flex flex-col items-center text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-ink/5 text-ink/30">
                <ShoppingBag size={22} />
              </div>
              <p className="text-sm text-ink/50">Nothing here yet. Add something you like.</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {lineItems.map((li) => (
                <li key={li.productId} className="flex gap-3">
                  <img
                    src={imageFor(li.product.seed, 120)}
                    alt={li.product.name}
                    className="h-16 w-16 shrink-0 rounded-md object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm font-medium leading-snug">{li.product.name}</span>
                      <button
                        onClick={() => removeItem(li.productId)}
                        aria-label={`Remove ${li.product.name}`}
                        className="text-ink/35 hover:text-clay"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="mt-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border border-line px-2 py-0.5">
                        <button
                          onClick={() => updateQty(li.productId, li.qty - 1)}
                          className="text-ink/60 hover:text-ink"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-4 text-center text-xs">{li.qty}</span>
                        <button
                          onClick={() => updateQty(li.productId, li.qty + 1)}
                          className="text-ink/60 hover:text-ink"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-sm text-ink/70">{formatPrice(li.subtotal)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lineItems.length > 0 && (
          <div className="border-t border-line px-5 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-ink/60">Subtotal</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <button
              onClick={() => {
                onClose();
                navigate("/checkout");
              }}
              className="w-full rounded-full bg-pine py-3 text-sm font-medium text-paper transition hover:bg-pine-dark active:scale-[0.99]"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
