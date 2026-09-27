import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Receipt, Menu, X, Leaf } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

interface NavbarProps {
  onOpenCart: () => void;
}

export default function Navbar({ onOpenCart }: NavbarProps) {
  const itemCount = useCartStore((s) => s.itemCount());
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pine text-paper">
            <Leaf size={16} strokeWidth={2} />
          </span>
          <span className="font-display text-xl tracking-tight text-ink">ShopSphere</span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            to="/orders"
            className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm text-ink/70 transition hover:bg-ink/5 hover:text-ink sm:flex"
          >
            <Receipt size={16} strokeWidth={1.75} />
            Orders
          </Link>
          <button
            onClick={onOpenCart}
            aria-label={`Open cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
            className="relative flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-ink/70 transition hover:bg-ink/5 hover:text-ink active:scale-95"
          >
            <ShoppingBag size={16} strokeWidth={1.75} />
            <span className="hidden sm:inline">Cart</span>
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-medium text-ink">
                {itemCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex items-center rounded-full p-2 text-ink/70 transition hover:bg-ink/5 sm:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </div>

      {menuOpen && (
        <div className="border-t border-line px-5 py-3 sm:hidden">
          <Link
            to="/orders"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 rounded-lg px-2 py-2.5 text-sm text-ink/75 hover:bg-ink/5"
          >
            <Receipt size={16} strokeWidth={1.75} />
            Order history
          </Link>
        </div>
      )}
    </header>
  );
}
