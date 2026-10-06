'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { CATEGORIES } from '@/data/products';
import { classNames } from '@/lib/utils';

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Shop', href: '/shop' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
];

export default function MobileMenu() {
  const { isMenuOpen, closeMenu } = useStore();
  const pathname = usePathname();
  if (!isMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-[2px]" onClick={closeMenu} />
      <nav
        className="absolute left-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-ivory shadow-2xl"
        aria-label="Mobile"
      >
        <div className="flex items-center justify-between border-b border-ivory-200 px-6 py-5">
          <span className="font-serif text-xl text-charcoal">CarryClub</span>
          <button onClick={closeMenu} aria-label="Close menu" className="p-1.5 text-charcoal hover:text-sage-600">
            <X size={22} strokeWidth={1.6} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <ul className="space-y-1">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={classNames(
                      'block py-3 font-serif text-2xl transition-colors',
                      active ? 'text-sage-600' : 'text-charcoal hover:text-sage-600',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <p className="eyebrow mt-8 mb-3">Categories</p>
          <ul className="space-y-2.5">
            {CATEGORIES.map((c) => (
              <li key={c}>
                <Link
                  href={`/shop?category=${encodeURIComponent(c)}`}
                  onClick={closeMenu}
                  className="text-[14px] text-charcoal-muted transition-colors hover:text-sage-600"
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}
