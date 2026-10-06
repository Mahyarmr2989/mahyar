'use client';

import { Heart } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { classNames } from '@/lib/utils';

export default function WishlistButton({
  productId,
  className,
  size = 18,
}: {
  productId: string;
  className?: string;
  size?: number;
}) {
  const { isWishlisted, toggleWishlist } = useStore();
  const active = isWishlisted(productId);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(productId);
      }}
      aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
      aria-pressed={active}
      className={classNames(
        'inline-flex items-center justify-center rounded-full transition-all duration-300',
        'hover:scale-110 active:scale-95',
        className,
      )}
    >
      <Heart
        size={size}
        strokeWidth={1.5}
        className={classNames(
          'transition-colors duration-300',
          active ? 'fill-sage-600 text-sage-600' : 'fill-transparent text-charcoal/70',
        )}
      />
    </button>
  );
}
