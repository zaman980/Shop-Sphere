import type { Product } from "../types";

export const CATEGORIES = ["Lighting", "Seating", "Textiles", "Kitchenware", "Storage"] as const;

export const PRODUCTS: Product[] = [
  {
    id: "p01",
    name: "Arc Floor Lamp",
    category: "Lighting",
    price: 189,
    rating: 4.7,
    stock: 12,
    seed: "arc-lamp-1",
    description:
      "A tripod floor lamp with a brushed-brass finish and a linen shade that softens overhead light into a warm, even glow.",
    tags: ["new"],
  },
  {
    id: "p02",
    name: "Bramble Table Lamp",
    category: "Lighting",
    price: 79,
    rating: 4.4,
    stock: 30,
    seed: "table-lamp-2",
    description:
      "A compact ceramic base in a mottled glaze, paired with a natural cotton shade. Sits well on a nightstand or console.",
    tags: [],
  },
  {
    id: "p03",
    name: "Hearth Lounge Chair",
    category: "Seating",
    price: 645,
    rating: 4.9,
    stock: 6,
    seed: "lounge-chair-3",
    description:
      "Solid oak frame with a boucle seat cushion. Built for long afternoons — the kind of chair a room gets planned around.",
    tags: ["bestseller"],
  },
  {
    id: "p04",
    name: "Rowan Dining Chair",
    category: "Seating",
    price: 210,
    rating: 4.5,
    stock: 18,
    seed: "dining-chair-4",
    description:
      "A slim dining chair with a woven cane back and a solid ash frame. Sold individually, stacks two-high for storage.",
    tags: [],
  },
  {
    id: "p05",
    name: "Meadow Throw Blanket",
    category: "Textiles",
    price: 68,
    rating: 4.6,
    stock: 40,
    seed: "throw-blanket-5",
    description:
      "Brushed alpaca-wool blend in a muted sage. Woven with a double-sided nap so both faces feel equally soft.",
    tags: ["new"],
  },
  {
    id: "p06",
    name: "Linden Linen Duvet Set",
    category: "Textiles",
    price: 145,
    rating: 4.8,
    stock: 22,
    seed: "duvet-set-6",
    description:
      "Stonewashed European flax linen that softens with every wash. Includes duvet cover and two pillowcases.",
    tags: ["bestseller"],
  },
  {
    id: "p07",
    name: "Kettle Stoneware Teapot",
    category: "Kitchenware",
    price: 58,
    rating: 4.3,
    stock: 25,
    seed: "teapot-7",
    description:
      "Hand-thrown stoneware with a reactive glaze, so no two pieces finish quite the same. Holds four cups.",
    tags: [],
  },
  {
    id: "p08",
    name: "Grove Cutting Board Set",
    category: "Kitchenware",
    price: 92,
    rating: 4.7,
    stock: 15,
    seed: "cutting-board-8",
    description:
      "Three end-grain walnut boards in graduated sizes, finished with food-safe mineral oil. Nest together for storage.",
    tags: [],
  },
  {
    id: "p09",
    name: "Amber Glass Carafe",
    category: "Kitchenware",
    price: 34,
    rating: 4.5,
    stock: 50,
    seed: "carafe-9",
    description:
      "Mouth-blown amber glass that keeps cold brew or infused water out of direct light. Cork stopper included.",
    tags: ["new"],
  },
  {
    id: "p10",
    name: "Fern Woven Storage Basket",
    category: "Storage",
    price: 54,
    rating: 4.4,
    stock: 33,
    seed: "basket-10",
    description:
      "Hand-woven seagrass basket with reinforced handles. Roomy enough for blankets, firewood, or laundry.",
    tags: [],
  },
  {
    id: "p11",
    name: "Hollow Modular Shelf",
    category: "Storage",
    price: 320,
    rating: 4.6,
    stock: 9,
    seed: "shelf-11",
    description:
      "A stackable oak shelving unit that expands as your collection grows. Each module ships flat and locks in place.",
    tags: ["bestseller"],
  },
  {
    id: "p12",
    name: "Pendant Cluster Light",
    category: "Lighting",
    price: 275,
    rating: 4.8,
    stock: 7,
    seed: "pendant-12",
    description:
      "Three hand-blown glass globes on a brass canopy, each on an independently adjustable cord for staggered heights.",
    tags: ["new"],
  },
  {
    id: "p13",
    name: "Wicker Accent Stool",
    category: "Seating",
    price: 96,
    rating: 4.2,
    stock: 20,
    seed: "stool-13",
    description:
      "A lightweight rattan stool that doubles as a side table or plant stand. Easy to move between rooms.",
    tags: [],
  },
  {
    id: "p14",
    name: "Ochre Velvet Cushion",
    category: "Textiles",
    price: 42,
    rating: 4.5,
    stock: 45,
    seed: "cushion-14",
    description:
      "A cotton-velvet cushion cover with a feather-down insert included. Hidden zip closure for a clean front face.",
    tags: [],
  },
  {
    id: "p15",
    name: "Cast Iron Skillet, 10-inch",
    category: "Kitchenware",
    price: 65,
    rating: 4.9,
    stock: 28,
    seed: "skillet-15",
    description:
      "Pre-seasoned cast iron with a helper handle for stovetop-to-oven cooking. Gets better with every use.",
    tags: ["bestseller"],
  },
  {
    id: "p16",
    name: "Lattice Bookend Pair",
    category: "Storage",
    price: 38,
    rating: 4.3,
    stock: 36,
    seed: "bookend-16",
    description:
      "Powder-coated steel bookends with a slim lattice profile, heavy enough to hold a full shelf upright.",
    tags: [],
  },
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function imageFor(seed: string, size = 600): string {
  return `https://picsum.photos/seed/${seed}/${size}/${size}`;
}
