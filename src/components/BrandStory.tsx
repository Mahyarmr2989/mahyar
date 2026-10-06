'use client';

import Link from 'next/link';
import { px } from '@/lib/images';
import Reveal from './Reveal';

export default function BrandStory() {
  return (
    <section className="bg-ivory py-20 lg:py-28">
      <div className="container-cc grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Text */}
        <Reveal>
          <p className="eyebrow mb-4">Our Story</p>
          <h2 className="font-serif text-section text-charcoal">Embracing style and utility</h2>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-charcoal-muted">
            <p>
              Welcome to CarryClub, where fashion and function intertwine to create a world of exquisite bags that
              elevate your style and enhance your everyday experiences.
            </p>
            <p>
              Founded in 2011 with a passion for timeless design and everyday functionality, CarryClub brings together
              carefully selected pieces that make a statement while remaining effortless to wear.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link href="/shop" className="btn-outline">
              Shop the Collection
            </Link>
            <Link href="/about" className="btn-ghost">
              Meet Emma &amp; Daisy
            </Link>
          </div>
        </Reveal>

        {/* Image — organic rounded crop */}
        <Reveal delay={120} className="flex justify-center lg:justify-end">
          <div className="group relative h-[420px] w-[340px] overflow-hidden rounded-[200px] lg:h-[520px] lg:w-[420px]">
            <img
              src={px(4907610, 800)}
              alt="Emma and Daisy, the founders of CarryClub"
              className="h-full w-full object-cover transition-transform duration-[1.2s] ease-elegant group-hover:scale-105"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
