import { Link } from "react-router-dom";
import { Star, Plus } from "lucide-react";
import { imageFor } from "../data/products";
import { formatPrice } from "../lib/format";
import { useCartStore } from "../store/useCartStore";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="group flex flex-col transition duration-300 hover:-translate-y-1">
      <Link
        to={`/product/${product.id}`}
        className="relative block overflow-hidden rounded-xl bg-line/40 shadow-card"
      >
        <img
          src={imageFor(product.seed)}
          alt={product.name}
          loading="lazy"
          className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/10 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
        {product.tags.includes("new") && (
          <span className="absolute left-3 top-3 rounded-full bg-paper/95 px-2.5 py-1 text-xs font-medium text-ink shadow-sm">
            New
          </span>
        )}
        {product.tags.includes("bestseller") && (
          <span className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-1 text-xs font-medium text-ink shadow-sm">
            Bestseller
          </span>
        )}
        {product.stock <= 8 && (
          <span className="absolute bottom-3 left-3 rounded-full bg-ink/85 px-2.5 py-1 text-xs font-medium text-paper">
            Only {product.stock} left
          </span>
        )}
      </Link>

      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <Link to={`/product/${product.id}`} className="font-display text-base leading-snug hover:underline">
            {product.name}
          </Link>
          <div className="mt-1 flex items-center gap-1 text-xs text-ink/55">
            <Star size={12} className="fill-gold text-gold" />
            {product.rating}
            <span className="text-ink/30">·</span>
            {product.category}
          </div>
        </div>
        <button
          onClick={() => addItem(product.id, 1)}
          aria-label={`Add ${product.name} to cart`}
          className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-ink/70 transition hover:border-pine hover:bg-pine hover:text-paper active:scale-90"
        >
          <Plus size={16} />
        </button>
      </div>
      <div className="mt-1.5 font-medium text-ink">{formatPrice(product.price)}</div>
    </div>
  );
}
