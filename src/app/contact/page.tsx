'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Check } from 'lucide-react';
import Reveal from '@/components/Reveal';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  };

  const inputClass =
    'w-full border border-ivory-200 bg-white px-3.5 py-3 text-[14px] focus:border-sage-600 focus:outline-none';
  const labelClass = 'mb-1.5 block text-[12px] font-medium uppercase tracking-[0.08em] text-charcoal-muted';

  return (
    <section className="container-cc py-16 lg:py-24">
      <Reveal className="mb-12 max-w-xl">
        <p className="eyebrow mb-3">Contact</p>
        <h1 className="font-serif text-section text-charcoal">Get in touch</h1>
        <p className="mt-3 text-[15px] text-charcoal-muted">
          Questions about an order, a product, or a collaboration? We would love to hear from you.
        </p>
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Form */}
        <Reveal>
          {sent ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 rounded-sm border border-ivory-200 p-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sage-100 text-sage-600">
                <Check size={28} strokeWidth={1.5} />
              </div>
              <p className="font-serif text-xl text-charcoal">Message sent</p>
              <p className="text-[14px] text-charcoal-muted">Thank you — we will get back to you within 1–2 business days.</p>
              <button onClick={() => setSent(false)} className="btn-ghost">Send another</button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <div>
                <label className={labelClass} htmlFor="name">Name</label>
                <input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="email">Email</label>
                <input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="message">Message</label>
                <textarea id="message" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputClass} />
              </div>
              <button type="submit" className="btn-primary">Send message</button>
            </form>
          )}
        </Reveal>

        {/* Info */}
        <Reveal delay={120} className="space-y-8">
          <div className="flex gap-4">
            <Mail size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-sage-600" />
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-charcoal-muted">Email</p>
              <p className="mt-1 text-[15px] text-charcoal">hello@carryclub.com</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Phone size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-sage-600" />
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-charcoal-muted">Phone</p>
              <p className="mt-1 text-[15px] text-charcoal">+31 20 123 4567</p>
            </div>
          </div>
          <div className="flex gap-4">
            <MapPin size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-sage-600" />
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-charcoal-muted">Studio</p>
              <p className="mt-1 text-[15px] text-charcoal">Herengracht 123, Amsterdam, Netherlands</p>
            </div>
          </div>
          <div className="rounded-sm bg-ivory-200/60 p-6">
            <p className="font-serif text-lg text-charcoal">Customer care hours</p>
            <p className="mt-1 text-[14px] text-charcoal-muted">Mon–Fri, 9:00–18:00 CET</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
