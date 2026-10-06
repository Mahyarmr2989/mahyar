'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
    setEmail('');
  };

  return (
    <section className="border-b border-ivory-200 bg-sage-50">
      <div className="container-cc py-16 text-center">
        <p className="eyebrow mb-3">Newsletter</p>
        <h2 className="font-serif text-section text-charcoal">Stay in the loop</h2>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-charcoal-muted">
          Get first access to new collections, special offers and style inspiration.
        </p>
        {done ? (
          <p className="mx-auto mt-7 flex max-w-sm items-center justify-center gap-2 text-[14px] text-sage-600">
            <Check size={18} strokeWidth={2} /> Thank you — you&apos;re subscribed.
          </p>
        ) : (
          <form onSubmit={submit} className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              aria-label="Email address"
              className="flex-1 border-b border-charcoal/30 bg-transparent px-1 py-3 text-[14px] text-charcoal placeholder:text-charcoal-muted/60 focus:border-sage-600 focus:outline-none"
            />
            <button type="submit" className="btn-primary">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
