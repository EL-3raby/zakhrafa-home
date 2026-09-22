import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ProductCardSkeleton } from '@/components/catalog/ProductCardSkeleton';

export function HomeSkeleton() {
  return (
    <div className="min-h-screen bg-white pb-16 space-y-10 sm:space-y-14">
      {/* 1. Visual Search & Category Story Strip Skeleton */}
      <section className="bg-white border-b border-gray-100 py-6 sm:py-7 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          {/* Search bar placeholder */}
          <div className="max-w-2xl mx-auto">
            <Skeleton className="h-12 w-full rounded-2xl bg-stone-200" />
          </div>

          <div className="flex justify-end">
            <Skeleton className="h-9 w-28 rounded-full bg-stone-100" />
          </div>

          {/* Category Story Strip placeholder */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 overflow-hidden py-2">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center gap-2 shrink-0">
                <Skeleton className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-stone-200" />
                <Skeleton className="h-3 w-14 rounded bg-stone-200" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Hero Slider Banner Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-200">
          <Skeleton className="w-full h-full rounded-none" />
          <div className="absolute bottom-6 right-6 sm:bottom-12 sm:right-12 space-y-3 max-w-md">
            <Skeleton className="h-5 w-28 rounded-md bg-stone-300/80" />
            <Skeleton className="h-8 sm:h-12 w-full rounded-xl bg-stone-300/90" />
            <Skeleton className="h-4 w-3/4 rounded bg-stone-300/70" />
            <Skeleton className="h-10 w-36 rounded-xl bg-stone-300/80 mt-2" />
          </div>
        </div>
      </div>

      {/* 3. Best Offers Strip Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-28 rounded bg-stone-200" />
            <Skeleton className="h-7 w-48 rounded-lg bg-stone-300/80" />
          </div>
          <Skeleton className="h-9 w-28 rounded-xl bg-stone-100" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>

      {/* 4. Shop by Departments Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-44 rounded-lg bg-stone-300/80" />
          <div className="flex items-center gap-2 overflow-hidden">
            <Skeleton className="h-9 w-24 rounded-full bg-stone-200" />
            <Skeleton className="h-9 w-24 rounded-full bg-stone-100" />
            <Skeleton className="h-9 w-24 rounded-full bg-stone-100" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
