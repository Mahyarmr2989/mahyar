'use client';

import { Instagram } from 'lucide-react';
import { pxSquare } from '@/lib/images';
import Reveal from './Reveal';

const POSTS = [5352628, 914930, 6650008, 9433993, 21897146, 30431969];

export default function InstagramSection() {
  return (
    <section className="bg-ivory py-20 lg:py-28">
      <div className="container-cc">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-3">Social</p>
          <h2 className="font-serif text-section text-charcoal">Follow our style</h2>
          <a
            href="https://instagram.com"
            className="mt-2 inline-block text-[15px] text-charcoal-muted transition-colors hover:text-sage-600"
          >
            @carryclub
          </a>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {POSTS.map((id, i) => (
            <Reveal key={id} delay={i * 60}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square-cc overflow-hidden bg-ivory-200"
                aria-label="View on Instagram"
              >
                <img
                  src={pxSquare(id, 400)}
                  alt="CarryClub on Instagram"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-elegant group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-charcoal/0 transition-colors duration-300 group-hover:bg-charcoal/30">
                  <Instagram
                    size={22}
                    strokeWidth={1.5}
                    className="text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
