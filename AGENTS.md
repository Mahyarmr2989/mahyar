# CarryClub — Base44 Dev Notes

## Stack
- Next.js 14 (App Router) + TypeScript + Tailwind CSS 3
- Animations: framer-motion; Icons: lucide-react
- Fully client-side store (cart/wishlist) persisted in localStorage — no backend or DB.

## Running
- `docker compose -f docker-compose.base44.yml up -d --build`
- Dev server on port 3000 (Next dev, binds 0.0.0.0, live reload on file change).
- Dependencies install on container startup via `npm install`.
- `node_modules` lives in an anonymous Docker volume (not the host).

## Images
- All product/lifestyle imagery is served from `images.pexels.com` via a `px(id, w)` helper in `src/lib/images.ts`.
- Plain `<img loading="lazy">` tags are used (no next/image optimization) for speed and simplicity.

## Structure
- `src/data/products.ts` — all product data (single source of truth; easy to swap for a real API/DB).
- `src/context/StoreContext.tsx` — cart + wishlist + UI state (drawers/modals), persisted to localStorage.
- `src/components/*` — reusable UI (Header, Footer, ProductCard, CartDrawer, etc.).
- `src/app/*` — routes: `/`, `/shop`, `/product/[slug]`, `/checkout`, `/about`, `/contact`, `/faq`.

## Notes
- No external credentials required to boot.
- Checkout is a demo flow: it records an order confirmation but does NOT claim a real payment was processed.
