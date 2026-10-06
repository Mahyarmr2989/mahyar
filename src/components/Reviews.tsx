'use client';

import { REVIEWS } from '@/data/reviews';
import StarRating from './StarRating';
import Reveal from './Reveal';

export default function Reviews() {
  return (
    <section className="bg-ivory py-20 lg:py-28">
      <div className="container-cc">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-3">Testimonials</p>
          <h2 className="font-serif text-section text-charcoal">What our customers say</h2>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={(i % 3) * 90} className="card-surface p-7">
              <StarRating rating={r.rating} size={15} />
              <p className="mt-4 text-[15px] leading-relaxed text-charcoal">“{r.text}”</p>
              <div className="mt-5 flex items-center justify-between border-t border-ivory-200 pt-4">
                <div>
                  <p className="font-serif text-[15px] text-charcoal">{r.name}</p>
                  <p className="text-[12px] text-charcoal-muted">{r.location}</p>
                </div>
                {r.verified && (
                  <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-sage-600">
                    Verified
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
