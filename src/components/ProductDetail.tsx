'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Minus, Plus, ShoppingBag, Heart, Truck, RotateCcw, ChevronLeft, ChevronRight, X, Check, ZoomIn } from 'lucide-react';
import type { Product } from '@/data/products';
import { SHIPPING_INFO, RETURNS_INFO, getRelated } from '@/data/products';
import { px } from '@/lib/images';
import { formatPrice, classNames } from '@/lib/utils';
import { useStore } from '@/context/StoreContext';
import StarRating from './StarRating';
import WishlistButton from './WishlistButton';
import ProductCard from './ProductCard';
import Reveal from './Reveal';

export default function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart } = useStore();
  const [activeImg, setActiveImg] = useState(0);
  const [color, setColor] = useState(product.colors[0]?.name ?? '');
  const [size, setSize] = useState(product.sizes[0] ?? '');
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState(false);
  const [added, setAdded] = useState(false);

  const related = getRelated(product);

  const handleAdd = () => {
    addToCart(product, { color, size, quantity: qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleBuyNow = () => {
    addToCart(product, { color, size, quantity: qty });
    router.push('/checkout');
  };

  return (
    <>
      <div className="container-cc py-8 lg:py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-[12px] text-charcoal-muted" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-sage-600">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-sage-600">Shop</Link>
          <span>/</span>
          <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-sage-600">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-charcoal">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Gallery */}
          <div>
            <div className="relative aspect-product overflow-hidden bg-ivory-200">
              <img
                src={px(product.images[activeImg], 900)}
                alt={`${product.name} — view ${activeImg + 1}`}
                className="h-full w-full object-cover"
              />
              {product.oldPrice && (
                <span className="absolute left-4 top-4 bg-sage-600 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-white">
                  Sale
                </span>
              )}
              <button
                onClick={() => setZoom(true)}
                aria-label="Zoom image"
                className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-white/85 px-3 py-2 text-[12px] uppercase tracking-[0.08em] backdrop-blur-sm transition-colors hover:bg-white"
              >
                <ZoomIn size={15} strokeWidth={1.6} /> Zoom
              </button>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="mt-4 flex gap-3">
                {product.images.map((id, i) => (
                  <button
                    key={id}
                    onClick={() => setActiveImg(i)}
                    aria-label={`View image ${i + 1}`}
                    className={classNames(
                      'relative h-20 w-16 overflow-hidden border transition-all',
                      i === activeImg ? 'border-sage-600' : 'border-ivory-200 opacity-70 hover:opacity-100',
                    )}
                  >
                    <img src={px(id, 160)} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="lg:py-2">
            <div className="mb-2 flex items-center gap-3">
              <StarRating rating={product.rating} size={15} showValue />
              <span className="text-[13px] text-charcoal-muted">{product.reviewCount} reviews</span>
            </div>
            <h1 className="font-serif text-[2rem] leading-tight text-charcoal lg:text-[2.5rem]">{product.name}</h1>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-[1.5rem] font-medium text-charcoal">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <span className="text-[1.1rem] text-charcoal-muted line-through">{formatPrice(product.oldPrice)}</span>
              )}
            </div>

            <p className="mt-5 text-[15px] leading-relaxed text-charcoal-muted">{product.description}</p>

            {/* Color */}
            {product.colors.length > 0 && (
              <div className="mt-7">
                <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.1em] text-charcoal">
                  Color: <span className="text-charcoal-muted">{color}</span>
                </p>
                <div className="flex gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setColor(c.name)}
                      aria-label={c.name}
                      title={c.name}
                      className={classNames(
                        'h-9 w-9 rounded-full border-2 transition-all',
                        color === c.name ? 'border-sage-600 ring-2 ring-sage-600/25' : 'border-ivory-200 hover:scale-110',
                      )}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size */}
            {product.sizes.length > 1 && (
              <div className="mt-6">
                <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.1em] text-charcoal">Size</p>
                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={classNames(
                        'min-w-[3rem] border px-4 py-2.5 text-[13px] transition-all',
                        size === s
                          ? 'border-charcoal bg-charcoal text-white'
                          : 'border-ivory-200 text-charcoal hover:border-charcoal',
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + actions */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="flex items-center border border-ivory-200">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="p-3 text-charcoal hover:text-sage-600"
                >
                  <Minus size={15} strokeWidth={1.6} />
                </button>
                <span className="w-10 text-center text-[15px]">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="p-3 text-charcoal hover:text-sage-600"
                >
                  <Plus size={15} strokeWidth={1.6} />
                </button>
              </div>
              <button onClick={handleAdd} className="btn-primary flex-1">
                {added ? (
                  <><Check size={16} strokeWidth={2} /> Added</>
                ) : (
                  <><ShoppingBag size={16} strokeWidth={1.6} /> Add to Cart</>
                )}
              </button>
              <WishlistButton productId={product.id} className="border border-ivory-200 p-3 hover:border-sage-600" size={20} />
            </div>
            <button onClick={handleBuyNow} className="btn-outline mt-3 w-full">
              Buy Now
            </button>

            {/* Meta */}
            <dl className="mt-7 space-y-1.5 border-t border-ivory-200 pt-5 text-[13px]">
              <div className="flex gap-3">
                <dt className="w-24 text-charcoal-muted">SKU</dt>
                <dd className="text-charcoal">{product.sku}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-24 text-charcoal-muted">Category</dt>
                <dd className="text-charcoal">{product.category}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-24 text-charcoal-muted">Tags</dt>
                <dd className="text-charcoal">{product.tags.join(', ')}</dd>
              </div>
            </dl>

            {/* Shipping / returns */}
            <div className="mt-6 space-y-3 border-t border-ivory-200 pt-5">
              <div className="flex gap-3 text-[13px] text-charcoal-muted">
                <Truck size={18} strokeWidth={1.5} className="shrink-0 text-sage-600" />
                <p>{SHIPPING_INFO}</p>
              </div>
              <div className="flex gap-3 text-[13px] text-charcoal-muted">
                <RotateCcw size={18} strokeWidth={1.5} className="shrink-0 text-sage-600" />
                <p>{RETURNS_INFO}</p>
              </div>
            </div>

            {/* Features */}
            <div className="mt-6 border-t border-ivory-200 pt-5">
              <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.1em] text-charcoal">Features</p>
              <ul className="grid grid-cols-2 gap-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[13px] text-charcoal-muted">
                    <Check size={15} strokeWidth={1.6} className="mt-0.5 shrink-0 text-sage-600" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-ivory-200/60 py-16 lg:py-20">
          <div className="container-cc">
            <Reveal className="mb-10 text-center">
              <h2 className="font-serif text-section text-charcoal">You may also like</h2>
            </Reveal>
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 80}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fullscreen zoom viewer */}
      {zoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 p-6" onClick={() => setZoom(false)}>
          <button className="absolute right-5 top-5 text-white/80 hover:text-white" aria-label="Close zoom">
            <X size={28} strokeWidth={1.5} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setActiveImg((i) => (i - 1 + product.images.length) % product.images.length); }}
            className="absolute left-5 text-white/80 hover:text-white"
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>
          <img
            src={px(product.images[activeImg], 1400)}
            alt={product.name}
            className="max-h-[85vh] max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => { e.stopPropagation(); setActiveImg((i) => (i + 1) % product.images.length); }}
            className="absolute right-5 text-white/80 hover:text-white"
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </>
  );
}
