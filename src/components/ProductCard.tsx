'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import type { Product } from '@/data/products';
import { px } from '@/lib/images';
import { formatPrice, classNames } from '@/lib/utils';
import { useStore } from '@/context/StoreContext';
import StarRating from './StarRating';
import WishlistButton from './WishlistButton';

export default function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { addToCart } = useStore();
  const [hovered, setHovered] = useState(false);
  const hasSecond = product.images.length > 1;
  const onSale = product.oldPrice && product.oldPrice > product.price;

  return (
    <article
      className="group relative flex flex-col card-surface overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/product/${product.slug}`} className="block" aria-label={product.name}>
        <div className="relative aspect-product overflow-hidden bg-ivory-200">
          {/* Primary image */}
          <img
            src={px(product.images[0], 600)}
            alt={product.name}
            loading={priority ? 'eager' : 'lazy'}
            className={classNames(
              'absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-elegant',
              hovered && hasSecond ? 'opacity-0 scale-105' : 'opacity-100 scale-100 group-hover:scale-[1.04]',
            )}
          />
          {/* Secondary image on hover */}
          {hasSecond && (
            <img
              src={px(product.images[1], 600)}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className={classNames(
                'absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-elegant',
                hovered ? 'opacity-100' : 'opacity-0',
              )}
            />
          )}

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {onSale && (
              <span className="bg-sage-600 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-white">
                Sale
              </span>
            )}
            {product.isNew && !onSale && (
              <span className="bg-charcoal px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-white">
                New
              </span>
            )}
          </div>

          {/* Wishlist */}
          <div className="absolute right-2 top-2">
            <WishlistButton
              productId={product.id}
              className="bg-white/85 backdrop-blur-sm p-1.5 shadow-sm hover:bg-white"
            />
          </div>

          {/* Add to cart — slides up on hover */}
          <div
            className={classNames(
              'absolute inset-x-0 bottom-0 translate-y-full p-3 transition-transform duration-500 ease-elegant',
              'group-hover:translate-y-0',
            )}
          >
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className="flex w-full items-center justify-center gap-2 bg-charcoal/95 py-3 text-[12px] font-medium uppercase tracking-[0.12em] text-white backdrop-blur-sm transition-colors hover:bg-sage-600"
            >
              <ShoppingBag size={15} strokeWidth={1.6} />
              Add to cart
            </button>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col px-4 py-4">
        <div className="mb-1 flex items-center justify-between gap-2">
          <StarRating rating={product.rating} />
          <span className="text-[11px] text-charcoal-muted/70">({product.reviewCount})</span>
        </div>
        <Link href={`/product/${product.slug}`} className="group/title">
          <h3 className="font-serif text-[17px] leading-snug text-charcoal transition-colors group-hover/title:text-sage-600">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-[13px] leading-relaxed text-charcoal-muted line-clamp-2">{product.shortDescription}</p>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-[15px] font-medium text-charcoal">{formatPrice(product.price)}</span>
          {onSale && (
            <span className="text-[13px] text-charcoal-muted line-through">{formatPrice(product.oldPrice!)}</span>
          )}
        </div>
      </div>
    </article>
  );
}
