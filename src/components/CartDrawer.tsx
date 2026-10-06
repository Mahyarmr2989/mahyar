'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { px } from '@/lib/images';
import { formatPrice } from '@/lib/utils';

const DISCOUNT_CODE = 'PURCHASE';
const DISCOUNT_AMOUNT = 10;

export default function CartDrawer() {
  const { cart, isCartOpen, closeCart, removeFromCart, updateQuantity, cartSubtotal } = useStore();
  const [code, setCode] = useState('');
  const [applied, setApplied] = useState(false);

  const discount = applied ? DISCOUNT_AMOUNT : 0;
  const shipping = cartSubtotal > 75 || cartSubtotal === 0 ? 0 : 8;
  const total = Math.max(0, cartSubtotal - discount) + shipping;

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-[2px] transition-opacity" onClick={closeCart} />
      <aside
        role="dialog"
        aria-label="Shopping cart"
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-ivory shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ivory-200 px-6 py-5">
          <h2 className="font-serif text-xl text-charcoal">
            Cart ({cart.reduce((s, l) => s + l.quantity, 0)})
          </h2>
          <button onClick={closeCart} aria-label="Close cart" className="p-1.5 text-charcoal transition-colors hover:text-sage-600">
            <X size={20} strokeWidth={1.6} />
          </button>
        </div>

        {/* Lines */}
        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag size={40} strokeWidth={1} className="text-charcoal-muted/40" />
            <p className="text-[15px] text-charcoal-muted">Your cart is empty.</p>
            <Link href="/shop" onClick={closeCart} className="btn-outline">
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <ul className="space-y-5">
              {cart.map((line) => (
                <li key={line.key} className="flex gap-4">
                  <Link href={`/product/${line.product.slug}`} onClick={closeCart} className="shrink-0">
                    <img
                      src={px(line.product.images[0], 200)}
                      alt={line.product.name}
                      className="h-24 w-20 object-cover"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <Link
                        href={`/product/${line.product.slug}`}
                        onClick={closeCart}
                        className="font-serif text-[15px] leading-tight text-charcoal hover:text-sage-600"
                      >
                        {line.product.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(line.key)}
                        aria-label="Remove item"
                        className="text-charcoal-muted/60 transition-colors hover:text-sage-600"
                      >
                        <Trash2 size={16} strokeWidth={1.5} />
                      </button>
                    </div>
                    <p className="mt-0.5 text-[12px] text-charcoal-muted">
                      {line.color} · {line.size}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center border border-ivory-200">
                        <button
                          onClick={() => updateQuantity(line.key, line.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="p-1.5 text-charcoal transition-colors hover:text-sage-600"
                        >
                          <Minus size={13} strokeWidth={1.6} />
                        </button>
                        <span className="w-8 text-center text-[13px]">{line.quantity}</span>
                        <button
                          onClick={() => updateQuantity(line.key, line.quantity + 1)}
                          aria-label="Increase quantity"
                          className="p-1.5 text-charcoal transition-colors hover:text-sage-600"
                        >
                          <Plus size={13} strokeWidth={1.6} />
                        </button>
                      </div>
                      <span className="text-[14px] font-medium">{formatPrice(line.product.price * line.quantity)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Discount */}
            <div className="mt-6 flex gap-2">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Discount code"
                aria-label="Discount code"
                className="flex-1 border border-ivory-200 bg-white px-3 py-2.5 text-[13px] uppercase tracking-wide focus:border-sage-600 focus:outline-none"
              />
              <button
                onClick={() => setApplied(code.trim().toUpperCase() === DISCOUNT_CODE)}
                className="btn border border-charcoal px-5 py-2.5 text-charcoal hover:bg-charcoal hover:text-white"
              >
                Apply
              </button>
            </div>
            {applied && (
              <p className="mt-2 text-[12px] text-sage-600">Code “PURCHASE” applied — $10 off.</p>
            )}
          </div>
        )}

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-ivory-200 px-6 py-5">
            <div className="space-y-1.5 text-[14px]">
              <div className="flex justify-between text-charcoal-muted">
                <span>Subtotal</span>
                <span>{formatPrice(cartSubtotal)}</span>
              </div>
              {applied && (
                <div className="flex justify-between text-sage-600">
                  <span>Discount</span>
                  <span>−{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-charcoal-muted">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between border-t border-ivory-200 pt-2 font-medium text-charcoal">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <Link href="/checkout" onClick={closeCart} className="btn-primary mt-4 w-full">
              Checkout
            </Link>
            <button onClick={closeCart} className="btn-ghost mt-2 w-full justify-center">
              Continue shopping
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
