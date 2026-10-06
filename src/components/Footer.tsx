'use client';

import Link from 'next/link';
import { Instagram, Facebook } from 'lucide-react';
import Newsletter from './Newsletter';

const COLUMNS = [
  {
    title: 'Shop',
    links: [
      { label: 'All Products', href: '/shop' },
      { label: 'New Arrivals', href: '/shop?filter=new' },
      { label: 'Best Sellers', href: '/shop?filter=best' },
      { label: 'Sale', href: '/shop?filter=sale' },
    ],
  },
  {
    title: 'Customer Care',
    links: [
      { label: 'Shipping', href: '/faq' },
      { label: 'Returns', href: '/faq' },
      { label: 'Size Guide', href: '/faq' },
      { label: 'Track Order', href: '/faq' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Our Story', href: '/about' },
      { label: 'Collections', href: '/shop' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-ivory-200 bg-ivory-50">
      <Newsletter />
      <div className="container-cc py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="font-serif text-2xl font-semibold text-charcoal">
              CarryClub
            </Link>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-charcoal-muted">
              Where fashion and function intertwine. Carefully selected bags designed to elevate your style and
              enhance your everyday.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="https://instagram.com" aria-label="Instagram" className="text-charcoal-muted transition-colors hover:text-sage-600">
                <Instagram size={19} strokeWidth={1.6} />
              </a>
              <a href="https://facebook.com" aria-label="Facebook" className="text-charcoal-muted transition-colors hover:text-sage-600">
                <Facebook size={19} strokeWidth={1.6} />
              </a>
              <a href="https://pinterest.com" aria-label="Pinterest" className="text-[13px] font-medium uppercase tracking-[0.1em] text-charcoal-muted transition-colors hover:text-sage-600">
                Pinterest
              </a>
              <a href="https://tiktok.com" aria-label="TikTok" className="text-[13px] font-medium uppercase tracking-[0.1em] text-charcoal-muted transition-colors hover:text-sage-600">
                TikTok
              </a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="eyebrow mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-[14px] text-charcoal-muted transition-colors hover:text-sage-600">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ivory-200 pt-6 sm:flex-row">
          <p className="text-[12px] text-charcoal-muted/80">
            © {new Date().getFullYear()} CarryClub. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.1em] text-charcoal-muted/70">
            <span className="rounded-sm border border-ivory-200 px-2 py-1">Visa</span>
            <span className="rounded-sm border border-ivory-200 px-2 py-1">Mastercard</span>
            <span className="rounded-sm border border-ivory-200 px-2 py-1">Amex</span>
            <span className="rounded-sm border border-ivory-200 px-2 py-1">PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
