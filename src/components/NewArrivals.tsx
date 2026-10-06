'use client';

import Link from 'next/link';
import { getNewArrivals } from '@/data/products';
import ProductCard from './ProductCard';
import Reveal from './Reveal';

export default function NewArrivals() {
  const products = getNewArrivals();
  if (products.length === 0) return null;
  return (
    <section className="bg-ivory py-20 lg:py-28">
      <div className="container-cc">
        <Reveal className="mb-3 text-center">
          <p className="eyebrow mb-3">Just landed</p>
          <h2 className="font-serif text-section text-charcoal">New Arrivals</h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] text-charcoal-muted">
            Fresh pieces for your everyday style.
          </p>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {products.slice(0, 4).map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
