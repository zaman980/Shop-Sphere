import type { Dispatch, SetStateAction } from "react";
import { Search, X } from "lucide-react";
import { CATEGORIES } from "../data/products";
import type { Filters } from "../types";

interface FilterSidebarProps {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  resultCount: number;
  className?: string;
}

export default function FilterSidebar({
  filters,
  setFilters,
  resultCount,
  className = "",
}: FilterSidebarProps) {
  const toggleCategory = (cat: string) => {
    setFilters((f) => ({
      ...f,
      categories: f.categories.includes(cat)
        ? f.categories.filter((c) => c !== cat)
        : [...f.categories, cat],
    }));
  };

  const hasActiveFilters =
    filters.categories.length > 0 || filters.maxPrice < 700 || filters.minRating > 0 || filters.query;

  const clearAll = () =>
    setFilters({ query: "", categories: [], maxPrice: 700, minRating: 0 });

  return (
    <div className={className}>
      <div className="relative mb-6">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
        <input
          type="text"
          value={filters.query}
          onChange={(e) => setFilters((f) => ({ ...f, query: e.target.value }))}
          placeholder="Search products…"
          className="w-full rounded-full border border-line bg-white py-2.5 pl-9 pr-4 text-sm placeholder:text-ink/40 focus:border-pine"
        />
      </div>

      <div className="mb-6">
        <h3 className="mb-3 text-sm font-medium text-ink">Category</h3>
        <div className="flex flex-col gap-2">
          {CATEGORIES.map((cat) => (
            <label key={cat} className="flex cursor-pointer items-center gap-2.5 text-sm text-ink/75">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="h-4 w-4 rounded border-line text-pine focus:ring-pine"
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-3 flex justify-between text-sm font-medium text-ink">
          <span>Max price</span>
          <span className="text-ink/50">${filters.maxPrice}</span>
        </h3>
        <input
          type="range"
          min="20"
          max="700"
          step="10"
          value={filters.maxPrice}
          onChange={(e) => setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) }))}
          className="w-full accent-pine"
        />
      </div>

      <div className="mb-6">
        <h3 className="mb-3 text-sm font-medium text-ink">Minimum rating</h3>
        <div className="flex gap-2">
          {[0, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => setFilters((f) => ({ ...f, minRating: r }))}
              className={`rounded-full border px-3 py-1.5 text-xs transition active:scale-95 ${
                filters.minRating === r
                  ? "border-pine bg-pine text-paper"
                  : "border-line text-ink/60 hover:border-ink/30"
              }`}
            >
              {r === 0 ? "Any" : `${r}+`}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-line pt-4 text-xs text-ink/50">
        <span>{resultCount} results</span>
        {hasActiveFilters && (
          <button onClick={clearAll} className="flex items-center gap-1 text-pine hover:underline">
            <X size={12} /> Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
