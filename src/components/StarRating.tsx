'use client';

import { Star } from 'lucide-react';
import { classNames } from '@/lib/utils';

export default function StarRating({
  rating,
  size = 13,
  showValue = false,
  className,
}: {
  rating: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className={classNames('flex items-center gap-0.5', className)} aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full;
        const isHalf = i === full && half;
        return (
          <Star
            key={i}
            size={size}
            className={classNames(
              'shrink-0',
              filled || isHalf ? 'fill-charcoal text-charcoal' : 'fill-transparent text-charcoal/25',
            )}
            strokeWidth={1.5}
          />
        );
      })}
      {showValue && <span className="ml-1 text-xs text-charcoal-muted">{rating.toFixed(1)}</span>}
    </div>
  );
}
