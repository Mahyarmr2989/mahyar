'use client';

import { Gem, Clock, Briefcase, Truck } from 'lucide-react';
import Reveal from './Reveal';

const VALUES = [
  {
    icon: Gem,
    title: 'Premium Quality',
    text: 'Carefully selected materials and finishes that age beautifully.',
  },
  {
    icon: Clock,
    title: 'Timeless Style',
    text: 'Pieces designed to stay relevant beyond seasonal trends.',
  },
  {
    icon: Briefcase,
    title: 'Everyday Function',
    text: 'Fashion that works naturally in everyday life.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    text: 'Reliable delivery and carefully packaged orders.',
  },
];

export default function BrandValues() {
  return (
    <section className="border-y border-ivory-200 bg-ivory py-20 lg:py-24">
      <div className="container-cc">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 90} className="text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-sage-200 text-sage-600">
                <v.icon size={22} strokeWidth={1.4} />
              </div>
              <h3 className="font-serif text-xl text-charcoal">{v.title}</h3>
              <p className="mx-auto mt-2 max-w-[220px] text-[14px] leading-relaxed text-charcoal-muted">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
