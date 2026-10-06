'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { px } from '@/lib/images';
import { formatPrice } from '@/lib/utils';
import { Check, Lock } from 'lucide-react';

const DISCOUNT_CODE = 'PURCHASE';

export default function CheckoutClient() {
  const { cart, cartSubtotal, clearCart } = useStore();
  const [code, setCode] = useState('');
  const [applied, setApplied] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', postal: '', country: 'Netherlands',
    card: '', expiry: '', cvc: '', method: 'card',
  });

  const discount = applied ? 10 : 0;
  const shipping = cartSubtotal > 75 || cartSubtotal === 0 ? 0 : 8;
  const total = Math.max(0, cartSubtotal - discount) + shipping;

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo checkout: record the order, do NOT claim a real payment was processed.
    setOrderId('CC-' + Math.random().toString(36).slice(2, 8).toUpperCase());
    setPlaced(true);
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (placed) {
    return (
      <div className="container-cc py-24 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 text-sage-600">
          <Check size={32} strokeWidth={1.5} />
        </div>
        <h1 className="mt-6 font-serif text-section text-charcoal">Order received</h1>
        <p className="mx-auto mt-3 max-w-md text-[15px] text-charcoal-muted">
          Thank you, {form.firstName || 'friend'}. Your order <span className="font-medium text-charcoal">{orderId}</span> has
          been placed. This is a demo checkout — no payment has been processed. You will receive a confirmation email shortly.
        </p>
        <Link href="/shop" className="btn-outline mt-8 inline-flex">
          Continue shopping
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container-cc py-24 text-center">
        <h1 className="font-serif text-section text-charcoal">Your cart is empty</h1>
        <p className="mt-3 text-[15px] text-charcoal-muted">Add a few pieces before heading to checkout.</p>
        <Link href="/shop" className="btn-outline mt-8 inline-flex">Browse the shop</Link>
      </div>
    );
  }

  const inputClass =
    'w-full border border-ivory-200 bg-white px-3.5 py-3 text-[14px] text-charcoal placeholder:text-charcoal-muted/50 focus:border-sage-600 focus:outline-none';
  const labelClass = 'mb-1.5 block text-[12px] font-medium uppercase tracking-[0.08em] text-charcoal-muted';

  return (
    <div className="container-cc py-10 lg:py-14">
      <h1 className="mb-8 font-serif text-section text-charcoal">Checkout</h1>
      <form onSubmit={submit} className="grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-14">
        {/* Form */}
        <div className="space-y-10">
          {/* Customer */}
          <section>
            <h2 className="mb-5 font-serif text-xl text-charcoal">Customer information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="firstName">First name</label>
                <input id="firstName" required value={form.firstName} onChange={(e) => set('firstName', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="lastName">Last name</label>
                <input id="lastName" required value={form.lastName} onChange={(e) => set('lastName', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="email">Email</label>
                <input id="email" type="email" required value={form.email} onChange={(e) => set('email', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="phone">Phone</label>
                <input id="phone" type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} className={inputClass} />
              </div>
            </div>
          </section>

          {/* Shipping */}
          <section>
            <h2 className="mb-5 font-serif text-xl text-charcoal">Shipping address</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="address">Address</label>
                <input id="address" required value={form.address} onChange={(e) => set('address', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="city">City</label>
                <input id="city" required value={form.city} onChange={(e) => set('city', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="state">State / Province</label>
                <input id="state" value={form.state} onChange={(e) => set('state', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="postal">Postal code</label>
                <input id="postal" required value={form.postal} onChange={(e) => set('postal', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="country">Country</label>
                <select id="country" value={form.country} onChange={(e) => set('country', e.target.value)} className={inputClass}>
                  <option>Netherlands</option><option>Germany</option><option>France</option><option>United Kingdom</option><option>United States</option><option>Other</option>
                </select>
              </div>
            </div>
          </section>

          {/* Payment */}
          <section>
            <h2 className="mb-5 font-serif text-xl text-charcoal">Payment</h2>
            <div className="mb-4 flex gap-3">
              {['card', 'paypal'].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => set('method', m)}
                  className={
                    'flex-1 border px-4 py-3 text-[13px] capitalize transition-all ' +
                    (form.method === m ? 'border-charcoal bg-charcoal text-white' : 'border-ivory-200 text-charcoal hover:border-charcoal')
                  }
                >
                  {m === 'card' ? 'Credit Card' : 'PayPal'}
                </button>
              ))}
            </div>
            {form.method === 'card' ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor="card">Card number</label>
                  <input id="card" inputMode="numeric" placeholder="0000 0000 0000 0000" value={form.card} onChange={(e) => set('card', e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="expiry">Expiry</label>
                  <input id="expiry" placeholder="MM / YY" value={form.expiry} onChange={(e) => set('expiry', e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="cvc">CVC</label>
                  <input id="cvc" inputMode="numeric" placeholder="123" value={form.cvc} onChange={(e) => set('cvc', e.target.value)} className={inputClass} />
                </div>
              </div>
            ) : (
              <p className="text-[14px] text-charcoal-muted">You will be redirected to PayPal to complete your payment (demo).</p>
            )}
            <p className="mt-4 flex items-center gap-2 text-[12px] text-charcoal-muted">
              <Lock size={13} strokeWidth={1.6} /> This is a demo checkout — do not enter real card details.
            </p>
          </section>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card-surface p-6">
            <h2 className="mb-5 font-serif text-xl text-charcoal">Order summary</h2>
            <ul className="space-y-4">
              {cart.map((line) => (
                <li key={line.key} className="flex gap-3">
                  <div className="relative shrink-0">
                    <img src={px(line.product.images[0], 120)} alt={line.product.name} className="h-16 w-14 object-cover" />
                    <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-charcoal px-1 text-[11px] text-white">
                      {line.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-serif text-[14px] leading-tight text-charcoal">{line.product.name}</p>
                    <p className="text-[12px] text-charcoal-muted">{line.color} · {line.size}</p>
                  </div>
                  <span className="text-[14px]">{formatPrice(line.product.price * line.quantity)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex gap-2">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Discount code"
                aria-label="Discount code"
                className="flex-1 border border-ivory-200 px-3 py-2.5 text-[13px] uppercase focus:border-sage-600 focus:outline-none"
              />
              <button type="button" onClick={() => setApplied(code.trim().toUpperCase() === DISCOUNT_CODE)} className="btn border border-charcoal px-4 py-2.5 text-charcoal hover:bg-charcoal hover:text-white">
                Apply
              </button>
            </div>
            {applied && <p className="mt-2 text-[12px] text-sage-600">Code “PURCHASE” applied.</p>}

            <div className="mt-5 space-y-1.5 border-t border-ivory-200 pt-4 text-[14px]">
              <div className="flex justify-between text-charcoal-muted"><span>Subtotal</span><span>{formatPrice(cartSubtotal)}</span></div>
              {applied && <div className="flex justify-between text-sage-600"><span>Discount</span><span>−{formatPrice(discount)}</span></div>}
              <div className="flex justify-between text-charcoal-muted"><span>Shipping</span><span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
              <div className="flex justify-between border-t border-ivory-200 pt-2 font-medium text-charcoal"><span>Total</span><span>{formatPrice(total)}</span></div>
            </div>

            <button type="submit" className="btn-primary mt-6 w-full">Place order</button>
            <Link href="/shop" className="btn-ghost mt-2 w-full justify-center">Continue shopping</Link>
          </div>
        </aside>
      </form>
    </div>
  );
}
