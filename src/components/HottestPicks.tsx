'use client';

import Link from 'next/link';
import { getFeatured } from '@/data/products';
import ProductCard from './ProductCard';
import Reveal from './Reveal';

export default function HottestPicks() {
  const products = getFeatured();
  return (
    <section className="bg-ivory-200/60 py-20 lg:py-28">
      <div className="container-cc">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-3">Curated for you</p>
          <h2 className="font-serif text-section text-charcoal">Hottest picks</h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <ProductCard product={p} priority={i < 2} />
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/shop" className="btn-ghost">
            View all products
          </Link>
        </div>
      </div>
    </section>
  );
}
