'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const STORAGE_KEY = 'carryclub.announcement.closed';

export default function AnnouncementBar() {
  const [closed, setClosed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      setClosed(window.localStorage.getItem(STORAGE_KEY) === '1');
    } catch {
      /* noop */
    }
  }, []);

  const dismiss = () => {
    setClosed(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* noop */
    }
  };

  if (!mounted || closed) return null;

  return (
    <div className="relative flex items-center justify-center bg-sage-600 px-10 py-2.5 text-center">
      <p className="text-[12px] tracking-[0.04em] text-white/95">
        Want $10 off your first purchase? Use code{' '}
        <span className="font-medium uppercase tracking-[0.1em]">PURCHASE</span> at checkout.
      </p>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/80 transition-colors hover:text-white"
      >
        <X size={15} strokeWidth={1.75} />
      </button>
    </div>
  );
}
