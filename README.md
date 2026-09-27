# ShopSphere

A storefront and order-management demo built with React (Vite) and Zustand.

**Live demo:** _add your Vercel link here_

## Features

- Product catalog with search, category, price, and rating filters
- Cart persisted to `localStorage` (survives a page refresh)
- 3-step checkout (shipping → payment → review) validated with `react-hook-form` + `zod`
- Order placement with an optimistic UI: the order appears instantly as "Processing"
  and updates to "Confirmed" or "Failed" once payment is verified, with a retry option
  on failure
- Order history table with live status

## Tech stack

React · TypeScript · Vite · React Router · Zustand · react-hook-form · zod · Tailwind CSS

## Getting started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

`npm run build` runs the TypeScript compiler (`tsc -b`) before bundling, so
type errors will fail the build rather than surface at runtime.

## Deploying to Vercel

1. Push this project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects the Vite framework preset — leave the default build
   command (`npm run build`) and output directory (`dist`).
4. Deploy. The included `vercel.json` handles client-side routing, so pages
   like `/orders` or `/product/:id` work correctly on refresh and direct link.

## Project structure

```
src/
  components/   Navbar, ProductCard, FilterSidebar, CartDrawer, StepIndicator, StatusBadge
  data/         mock product catalog
  lib/          zod schemas, formatting helpers
  pages/        Home, ProductDetail, Checkout, OrderConfirmation, OrderHistory, NotFound
  store/        useCartStore, useOrderStore (Zustand)
  types.ts      shared TypeScript types (Product, Order, CartItem, LineItem, Filters)
```

## Notes

- Product images are placeholder photos from `picsum.photos`, seeded per
  product so they stay consistent across reloads.
- There is no real backend. `confirmOrderOnServer()` in `useOrderStore.js`
  simulates a network call with a short delay and an ~85% success rate.
