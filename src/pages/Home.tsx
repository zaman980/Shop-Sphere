import { useMemo, useState } from "react";
import { SlidersHorizontal, X, Truck, RotateCcw, Leaf } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import type { Filters } from "../types";

const initialFilters: Filters = { query: "", categories: [], maxPrice: 700, minRating: 0 };

export default function Home() {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (filters.query && !p.name.toLowerCase().includes(filters.query.toLowerCase())) return false;
      if (filters.categories.length && !filters.categories.includes(p.category)) return false;
      if (p.price > filters.maxPrice) return false;
      if (p.rating < filters.minRating) return false;
      return true;
    });
  }, [filters]);

  const toggleCategoryChip = (cat: string) => {
    setFilters((f) => ({
      ...f,
      categories: f.categories.includes(cat)
        ? f.categories.filter((c) => c !== cat)
        : [...f.categories, cat],
    }));
  };

  return (
    <div>
      <section className="relative overflow-hidden border-b border-line bg-pine-dark px-5 py-16 text-paper sm:px-8 sm:py-24">
        <img
          src="https://picsum.photos/seed/shopsphere-hero/1600/900"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-pine-dark via-pine-dark/95 to-pine-dark/40" />
        <div className="relative mx-auto max-w-6xl">
          <p className="mb-3 flex items-center gap-1.5 text-sm text-paper/70">
            <Leaf size={14} /> Autumn collection
          </p>
          <h1 className="max-w-lg font-display text-4xl leading-[1.1] sm:text-5xl">
            Considered goods for a slower kind of everyday.
          </h1>
          <p className="mt-4 max-w-md text-paper/75">
            Small-batch furniture, lighting and textiles, sourced from makers who build things to
            last longer than a trend cycle.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleCategoryChip(cat)}
                className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
                  filters.categories.includes(cat)
                    ? "border-gold bg-gold text-ink"
                    : "border-paper/25 text-paper/85 hover:border-paper/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-5 py-6 text-sm text-ink/65 sm:grid-cols-3 sm:px-8">
          <div className="flex items-center gap-2.5">
            <Truck size={16} className="text-pine" />
            Free shipping over $150
          </div>
          <div className="flex items-center gap-2.5">
            <RotateCcw size={16} className="text-pine" />
            30-day returns
          </div>
          <div className="flex items-center gap-2.5">
            <Leaf size={16} className="text-pine" />
            Sourced from small-batch makers
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <h2 className="font-display text-xl">Shop all</h2>
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm"
          >
            <SlidersHorizontal size={14} /> Filters
          </button>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            resultCount={filtered.length}
            className="hidden lg:block"
          />

          {filtered.length === 0 ? (
            <div className="py-20 text-center text-ink/50">
              No products match those filters. Try widening your search.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 min-[400px]:gap-x-5 sm:gap-y-10 sm:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-ink/30" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-paper p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] animate-slideUp">
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-ink/15" aria-hidden="true" />
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <FilterSidebar filters={filters} setFilters={setFilters} resultCount={filtered.length} />
          </div>
        </div>
      )}
    </div>
  );
}
