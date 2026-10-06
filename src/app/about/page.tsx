import Link from 'next/link';
import { px } from '@/lib/images';
import Reveal from '@/components/Reveal';
import BrandValues from '@/components/BrandValues';

export const metadata = { title: 'About — CarryClub' };

export default function AboutPage() {
  return (
    <>
      <section className="bg-ivory py-16 lg:py-24">
        <div className="container-cc grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-4">Our Story</p>
            <h1 className="font-serif text-section text-charcoal">Embracing style and utility</h1>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-charcoal-muted">
              <p>
                Welcome to CarryClub, where fashion and function intertwine to create a world of exquisite bags that
                elevate your style and enhance your everyday experiences.
              </p>
              <p>
                Founded in 2011 by Emma &amp; Daisy, CarryClub began with a simple belief: a bag should be as
                considered as the outfit it completes. What started as a small studio of two has grown into a curated
                collection worn around the world — yet the philosophy remains unchanged.
              </p>
              <p>
                Every piece is selected for its material, its make, and the way it lives with you over time. We design
                for the long wear, not the season, so each bag stays relevant long after trends have moved on.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-6">
              <Link href="/shop" className="btn-outline">Shop the Collection</Link>
            </div>
          </Reveal>
          <Reveal delay={120} className="flex justify-center lg:justify-end">
            <div className="h-[440px] w-[340px] overflow-hidden rounded-[200px] lg:h-[560px] lg:w-[420px]">
              <img src={px(4881012, 800)} alt="Emma and Daisy, founders of CarryClub" className="h-full w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory-200/60 py-16 lg:py-24">
        <div className="container-cc grid gap-10 sm:grid-cols-3">
          {[
            { n: '2011', l: 'Founded in a small studio' },
            { n: '40k+', l: 'Bags carried worldwide' },
            { n: '4.8★', l: 'Average customer rating' },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 90} className="text-center">
              <p className="font-serif text-4xl text-sage-600">{s.n}</p>
              <p className="mt-2 text-[14px] text-charcoal-muted">{s.l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <BrandValues />
    </>
  );
}
