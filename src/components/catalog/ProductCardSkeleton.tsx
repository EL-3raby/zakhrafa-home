import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col justify-between bg-white rounded-xl sm:rounded-2xl border border-gray-100/90 overflow-hidden shadow-xs">
      {/* Product Image Area */}
      <div className="relative aspect-square sm:aspect-[4/3] w-full overflow-hidden bg-stone-100">
        <Skeleton className="w-full h-full rounded-none" />
        {/* Placeholder Top Badges */}
        <div className="absolute top-2 right-2 left-2 sm:top-3 sm:right-3 sm:left-3 flex items-center justify-between pointer-events-none">
          <Skeleton className="h-5 w-12 sm:w-16 rounded-md bg-stone-300/60" />
          <Skeleton className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white/90 shadow-sm" />
        </div>
      </div>

      {/* Card Details Area */}
      <div className="p-2.5 sm:p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5 sm:space-y-2">
          {/* Category Placeholder */}
          <Skeleton className="h-2.5 sm:h-3 w-16 sm:w-20 rounded bg-stone-200" />

          {/* Main Title Placeholder */}
          <Skeleton className="h-4 sm:h-5 w-4/5 rounded bg-stone-300/80" />

          {/* Description snippet (Desktop only) */}
          <div className="hidden sm:block space-y-1.5 pt-1">
            <Skeleton className="h-3 w-full rounded bg-stone-100" />
            <Skeleton className="h-3 w-3/4 rounded bg-stone-100" />
          </div>

          {/* Specification Chips (Desktop only) */}
          <div className="hidden sm:flex pt-2 flex-wrap items-center gap-1.5">
            <Skeleton className="h-6 w-16 rounded-md bg-stone-100" />
            <Skeleton className="h-6 w-14 rounded-md bg-stone-100" />
            <Skeleton className="h-6 w-20 rounded-md bg-stone-100" />
          </div>
        </div>

        {/* Pricing & Details Link */}
        <div className="pt-2.5 sm:pt-4 mt-2 sm:mt-3 border-t border-gray-100 space-y-2 sm:space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 sm:h-6 w-20 sm:w-24 rounded bg-stone-300/70" />
            <Skeleton className="h-3.5 w-12 sm:w-14 rounded bg-stone-200" />
          </div>

          {/* Action CTAs Placeholder */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Skeleton className="h-9 sm:h-10 flex-1 rounded-lg sm:rounded-xl bg-stone-200/90" />
            <Skeleton className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-stone-100" />
          </div>
        </div>
      </div>
    </div>
  );
}
