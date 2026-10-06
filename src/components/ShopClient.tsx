'use client';

import { useEffect, useMemo, useState, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import {
  PRODUCTS,
  CATEGORIES,
  COLLECTIONS,
  ALL_COLORS,
  type Product,
} from '@/data/products';
import ProductCard from './ProductCard';
import { classNames } from '@/lib/utils';

type SortKey = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'best' | 'rating';

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'featured', label: 'Featured' },
  { key: 'newest', label: 'Newest' },
  { key: 'price-asc', label: 'Price: Low to High' },
  { key: 'price-desc', label: 'Price: High to Low' },
  { key: 'best', label: 'Best Selling' },
  { key: 'rating', label: 'Top Rated' },
];

const PRICE_MAX = 160;

function ShopInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [categories, setCategories] = useState<string[]>([]);
  const [collections, setCollections] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState(PRICE_MAX);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>('featured');
  const [query, setQuery] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync from URL once on mount.
  useEffect(() => {
    const cat = searchParams.get('category');
    const filter = searchParams.get('filter');
    const q = searchParams.get('q');
    if (cat) setCategories([cat]);
    if (q) setQuery(q);
    if (filter === 'new') setSort('newest');
    if (filter === 'best') setSort('best');
    if (filter === 'sale') {
      // pre-filter sale via collections trick — handled below
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saleOnly = searchParams.get('filter') === 'sale';

  const toggle = (list: string[], setter: (v: string[]) => void, value: string) => {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const resetFilters = () => {
    setCategories([]);
    setCollections([]);
    setColors([]);
    setPriceMax(PRICE_MAX);
    setMinRating(0);
    setInStockOnly(false);
    setQuery('');
    router.replace(pathname);
  };

  const filtered = useMemo(() => {
    let list: Product[] = [...PRODUCTS];
    if (saleOnly) list = list.filter((p) => p.isOnSale);
    if (categories.length) list = list.filter((p) => categories.includes(p.category));
    if (collections.length) list = list.filter((p) => collections.includes(p.collection));
    if (colors.length) list = list.filter((p) => p.colors.some((c) => colors.includes(c.name)));
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }
    list = list.filter((p) => p.price <= priceMax);
    list = list.filter((p) => p.rating >= minRating);
    if (inStockOnly) list = list.filter(() => true); // all in stock

    switch (sort) {
      case 'newest':
        list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
        break;
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'best':
        list.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort((a, b) => Number(!!b.isFeatured) - Number(!!a.isFeatured));
    }
    return list;
  }, [categories, collections, colors, priceMax, minRating, inStockOnly, sort, query, saleOnly]);

  const activeCount =
    categories.length + collections.length + colors.length + (minRating > 0 ? 1 : 0) + (priceMax < PRICE_MAX ? 1 : 0);

  const Filters = () => (
    <div className="space-y-8">
      {/* Search */}
      <div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products…"
          aria-label="Search products"
          className="w-full border-b border-ivory-200 bg-transparent py-2 text-[14px] focus:border-sage-600 focus:outline-none"
        />
      </div>

      {/* Category */}
      <FilterGroup title="Category">
        {CATEGORIES.map((c) => (
          <CheckRow key={c} label={c} checked={categories.includes(c)} onChange={() => toggle(categories, setCategories, c)} />
        ))}
      </FilterGroup>

      {/* Collection */}
      <FilterGroup title="Collection">
        {COLLECTIONS.map((c) => (
          <CheckRow key={c} label={c} checked={collections.includes(c)} onChange={() => toggle(collections, setCollections, c)} />
        ))}
      </FilterGroup>

      {/* Price */}
      <FilterGroup title="Price">
        <input
          type="range"
          min={50}
          max={PRICE_MAX}
          step={5}
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full accent-sage-600"
          aria-label="Maximum price"
        />
        <p className="mt-2 text-[13px] text-charcoal-muted">Up to ${priceMax}</p>
      </FilterGroup>

      {/* Color */}
      <FilterGroup title="Color">
        <div className="flex flex-wrap gap-2.5">
          {ALL_COLORS.map((c) => {
            const active = colors.includes(c.name);
            return (
              <button
                key={c.name}
                onClick={() => toggle(colors, setColors, c.name)}
                aria-label={c.name}
                aria-pressed={active}
                className={classNames(
                  'h-7 w-7 rounded-full border transition-all',
                  active ? 'border-sage-600 ring-2 ring-sage-600/30' : 'border-ivory-200 hover:scale-110',
                )}
                style={{ backgroundColor: c.hex }}
              />
            );
          })}
        </div>
      </FilterGroup>

      {/* Rating */}
      <FilterGroup title="Rating">
        {[4, 4.5].map((r) => (
          <CheckRow
            key={r}
            label={`${r}+ stars`}
            checked={minRating === r}
            onChange={() => setMinRating(minRating === r ? 0 : r)}
          />
        ))}
      </FilterGroup>

      {/* Availability */}
      <FilterGroup title="Availability">
        <CheckRow label="In stock only" checked={inStockOnly} onChange={() => setInStockOnly((v) => !v)} />
      </FilterGroup>

      {activeCount > 0 && (
        <button onClick={resetFilters} className="btn-ghost">
          Clear all ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="container-cc py-10 lg:py-14">
      {/* Header */}
      <div className="mb-8">
        <p className="eyebrow mb-2">Shop</p>
        <h1 className="font-serif text-section text-charcoal">
          {saleOnly ? 'Sale' : 'All Products'}
        </h1>
        <p className="mt-2 text-[14px] text-charcoal-muted">{filtered.length} products</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-14">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <Filters />
        </aside>

        <div>
          {/* Toolbar */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.08em] text-charcoal lg:hidden"
            >
              <SlidersHorizontal size={16} strokeWidth={1.6} /> Filters
              {activeCount > 0 && <span className="text-sage-600">({activeCount})</span>}
            </button>
            <div className="ml-auto flex items-center gap-2">
              <label htmlFor="sort" className="text-[12px] uppercase tracking-[0.08em] text-charcoal-muted">
                Sort
              </label>
              <div className="relative">
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="appearance-none border-b border-ivory-200 bg-transparent py-1 pl-2 pr-7 text-[13px] text-charcoal focus:border-sage-600 focus:outline-none"
                >
                  {SORTS.map((s) => (
                    <option key={s.key} value={s.key}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-charcoal-muted" />
              </div>
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-[15px] text-charcoal-muted">No products match your filters.</p>
              <button onClick={resetFilters} className="btn-ghost mt-3">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 lg:gap-6">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} priority={i < 3} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filters drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-charcoal/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto bg-ivory p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-serif text-xl">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters" className="p-1.5">
                <X size={20} />
              </button>
            </div>
            <Filters />
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="btn-primary mt-8 w-full"
            >
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-ivory-200 pb-6">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-[12px] font-medium uppercase tracking-[0.12em] text-charcoal"
      >
        {title}
        <ChevronDown size={15} className={classNames('transition-transform', open ? 'rotate-180' : '')} />
      </button>
      {open && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );
}

function CheckRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-[14px] text-charcoal-muted">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-sage-600"
      />
      {label}
    </label>
  );
}

export default function ShopClient() {
  return (
    <Suspense fallback={<div className="container-cc py-20 text-center text-charcoal-muted">Loading…</div>}>
      <ShopInner />
    </Suspense>
  );
}
