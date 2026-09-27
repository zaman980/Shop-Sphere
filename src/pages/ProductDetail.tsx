import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Minus, Plus, ArrowLeft } from "lucide-react";
import { getProductById, imageFor } from "../data/products";
import { formatPrice } from "../lib/format";
import { useCartStore } from "../store/useCartStore";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <p className="text-ink/60">We couldn't find that product.</p>
        <Link to="/" className="mt-3 inline-block text-pine hover:underline">
          Back to shop
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    addItem(product.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
      <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-ink/60 hover:text-ink">
        <ArrowLeft size={14} /> Back to shop
      </Link>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
        <img
          src={imageFor(product.seed, 800)}
          alt={product.name}
          className="aspect-square w-full rounded-xl object-cover shadow-card"
        />

        <div className="min-w-0">
          <p className="text-sm text-ink/50">{product.category}</p>
          <h1 className="mt-1 font-display text-3xl">{product.name}</h1>
          <div className="mt-2 flex items-center gap-1.5 text-sm text-ink/60">
            <Star size={14} className="fill-gold text-gold" />
            {product.rating} rating
            <span className="text-ink/30">·</span>
            {product.stock} in stock
          </div>
          <p className="mt-5 text-2xl font-medium">{formatPrice(product.price)}</p>
          <p className="mt-5 max-w-md leading-relaxed text-ink/70">{product.description}</p>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center gap-3 rounded-full border border-line px-3 py-2">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="text-ink/60 hover:text-ink"
              >
                <Minus size={14} />
              </button>
              <span className="w-5 text-center text-sm">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                aria-label="Increase quantity"
                className="text-ink/60 hover:text-ink"
              >
                <Plus size={14} />
              </button>
            </div>

            <button
              onClick={handleAdd}
              className="flex-1 rounded-full bg-pine py-3 text-sm font-medium text-paper transition hover:bg-pine-dark active:scale-[0.99] sm:flex-none sm:px-8"
            >
              {added ? "Added to cart" : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
