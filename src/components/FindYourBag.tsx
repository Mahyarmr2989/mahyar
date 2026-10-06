'use client';

import Link from 'next/link';
import { px } from '@/lib/images';
import Reveal from './Reveal';

const ITEMS = [
  { label: 'Everyday', image: 6650008, query: 'Handbags' },
  { label: 'Shoulder Bags', image: 21897320, query: 'Shoulder Bags' },
  { label: 'Crossbody', image: 6650000, query: 'Crossbody Bags' },
  { label: 'Backpacks', image: 9630186, query: 'Backpacks' },
  { label: 'Clutches', image: 7953286, query: 'Clutches' },
  { label: 'Travel', image: 11696717, query: 'Travel Bags' },
];

export default function FindYourBag() {
  return (
    <section className="bg-sage-50 py-20 lg:py-28">
      <div className="container-cc">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-3">Browse by style</p>
          <h2 className="font-serif text-section text-charcoal">Find your perfect bag</h2>
        </Reveal>
        <div className="no-scrollbar -mx-5 flex gap-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-6">
          {ITEMS.map((item, i) => (
            <Reveal key={item.label} delay={i * 70} className="shrink-0 sm:shrink">
              <Link
                href={`/shop?category=${encodeURIComponent(item.query)}`}
                className="group block w-[180px] sm:w-auto"
              >
                <div className="relative aspect-square-cc overflow-hidden rounded-sm bg-ivory-200">
                  <img
                    src={px(item.image, 400)}
                    alt={item.label}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-elegant group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/10" />
                </div>
                <p className="mt-3 text-center text-[13px] font-medium uppercase tracking-[0.1em] text-charcoal transition-colors group-hover:text-sage-600">
                  {item.label}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
