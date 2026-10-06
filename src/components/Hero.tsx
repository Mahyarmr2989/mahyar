'use client';

import Link from 'next/link';
import { px } from '@/lib/images';

export default function Hero() {
  return (
    <section className="relative bg-ivory">
      <div className="container-cc grid items-stretch gap-0 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Image */}
        <div className="relative min-h-[60vh] overflow-hidden lg:min-h-[88vh]">
          <img
            src={px(4127641, 1100)}
            alt="A woman carrying a CarryClub handbag in soft natural light"
            className="absolute inset-0 h-full w-full object-cover animate-scaleIn"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center px-2 py-16 lg:pl-14 lg:py-0">
          <p className="eyebrow mb-5 animate-fadeUp" style={{ animationDelay: '0.1s' }}>
            New Collection · Autumn 2026
          </p>
          <h1 className="font-serif text-hero text-charcoal">
            <span className="block animate-fadeUp" style={{ animationDelay: '0.18s' }}>
              CARRY
            </span>
            <span className="block animate-fadeUp italic text-sage-600" style={{ animationDelay: '0.3s' }}>
              fashion in
            </span>
            <span className="block animate-fadeUp" style={{ animationDelay: '0.42s' }}>
              every step
            </span>
          </h1>
          <p
            className="mt-7 max-w-md animate-fadeUp text-[16px] leading-relaxed text-charcoal-muted"
            style={{ animationDelay: '0.56s' }}
          >
            Your bags aren&apos;t just accessories — they&apos;re an integral part of your style journey.
          </p>
          <div className="mt-9 animate-fadeUp" style={{ animationDelay: '0.7s' }}>
            <Link href="/shop" className="btn-outline">
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
