'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { searchProducts } from '@/data/products';
import { px } from '@/lib/images';
import { formatPrice } from '@/lib/utils';

export default function SearchModal() {
  const { isSearchOpen, closeSearch } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch();
    };
    if (isSearchOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isSearchOpen, closeSearch]);

  const results = useMemo(() => (query.trim() ? searchProducts(query).slice(0, 6) : []), [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-[2px]" onClick={closeSearch} />
      <div className="absolute inset-x-0 top-0 bg-ivory shadow-xl">
        <div className="container-cc py-6">
          <div className="flex items-center gap-4 border-b border-ivory-200 pb-4">
            <Search size={22} strokeWidth={1.5} className="text-charcoal-muted" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for bags, collections…"
              aria-label="Search products"
              className="flex-1 bg-transparent text-lg text-charcoal placeholder:text-charcoal-muted/50 focus:outline-none"
            />
            <button onClick={closeSearch} aria-label="Close search" className="p-1.5 text-charcoal hover:text-sage-600">
              <X size={22} strokeWidth={1.6} />
            </button>
          </div>

          {query.trim() && (
            <div className="mt-5">
              {results.length === 0 ? (
                <p className="py-8 text-center text-[14px] text-charcoal-muted">
                  No products found for “{query}”.
                </p>
              ) : (
                <ul className="grid gap-2 sm:grid-cols-2">
                  {results.map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/product/${p.slug}`}
                        onClick={closeSearch}
                        className="flex items-center gap-4 p-2 transition-colors hover:bg-ivory-200"
                      >
                        <img src={px(p.images[0], 120)} alt={p.name} className="h-16 w-14 object-cover" />
                        <div>
                          <p className="font-serif text-[15px] text-charcoal">{p.name}</p>
                          <p className="text-[13px] text-charcoal-muted">{formatPrice(p.price)}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {!query.trim() && (
            <div className="mt-5 flex flex-wrap gap-2 pb-2">
              <span className="text-[12px] text-charcoal-muted">Popular:</span>
              {['Clutches', 'Tote', 'Shoulder', 'Evening', 'Sale'].map((t) => (
                <button
                  key={t}
                  onClick={() => setQuery(t)}
                  className="rounded-full border border-ivory-200 px-3 py-1 text-[12px] text-charcoal transition-colors hover:border-sage-600 hover:text-sage-600"
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
