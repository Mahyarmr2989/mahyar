'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Search, ShoppingBag, User, Menu } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { classNames } from '@/lib/utils';

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Shop', href: '/shop' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const { cartCount, openCart, openSearch, openMenu } = useStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={classNames(
        'sticky top-0 z-40 w-full bg-ivory/95 backdrop-blur-md transition-shadow duration-300',
        scrolled ? 'shadow-[0_1px_0_0_rgba(0,0,0,0.06)]' : 'border-b border-ivory-200',
      )}
    >
      <div className="container-cc flex h-16 items-center justify-between gap-4 lg:h-[68px]">
        {/* Left: mobile menu + logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openMenu}
            aria-label="Open menu"
            className="-ml-1 p-1.5 text-charcoal lg:hidden"
          >
            <Menu size={22} strokeWidth={1.6} />
          </button>
          <Link href="/" className="font-serif text-[22px] font-semibold tracking-[0.02em] text-charcoal lg:text-[24px]">
            CarryClub
          </Link>
        </div>

        {/* Center: nav */}
        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={classNames(
                  'link-underline text-[13px] font-medium uppercase tracking-[0.1em] transition-colors',
                  active ? 'text-sage-600' : 'text-charcoal hover:text-sage-600',
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            className="flex items-center gap-1 text-[13px] font-medium uppercase tracking-[0.1em] text-charcoal transition-colors hover:text-sage-600"
          >
            Pages
          </button>
        </nav>

        {/* Right: actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={openSearch}
            aria-label="Search"
            className="p-2 text-charcoal transition-colors hover:text-sage-600"
          >
            <Search size={19} strokeWidth={1.6} />
          </button>
          <Link
            href="/account"
            aria-label="Account"
            className="hidden p-2 text-charcoal transition-colors hover:text-sage-600 sm:inline-flex"
          >
            <User size={19} strokeWidth={1.6} />
          </Link>
          <button
            type="button"
            onClick={openCart}
            aria-label={`Cart, ${cartCount} items`}
            className="relative p-2 text-charcoal transition-colors hover:text-sage-600"
          >
            <ShoppingBag size={19} strokeWidth={1.6} />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-sage-600 px-1 text-[10px] font-medium text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
