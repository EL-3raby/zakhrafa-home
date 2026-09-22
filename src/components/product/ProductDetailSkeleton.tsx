import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ProductCardSkeleton } from '@/components/catalog/ProductCardSkeleton';

export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* 1. Breadcrumbs Skeleton */}
        <div className="flex items-center gap-2 mb-8">
          <Skeleton className="h-3.5 w-14 rounded bg-stone-200" />
          <span className="text-gray-300">/</span>
          <Skeleton className="h-3.5 w-24 rounded bg-stone-200" />
          <span className="text-gray-300">/</span>
          <Skeleton className="h-3.5 w-32 rounded bg-stone-300/70" />
        </div>

        {/* 2. Main 2-Columns: Gallery & Details Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Gallery Column (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-square sm:aspect-[4/3] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/70">
              <Skeleton className="w-full h-full rounded-none" />
              <div className="absolute top-4 right-4">
                <Skeleton className="h-6 w-20 rounded-md bg-stone-300/60" />
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex items-center gap-3 overflow-hidden">
              <Skeleton className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl bg-stone-200 shrink-0" />
              <Skeleton className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl bg-stone-100 shrink-0" />
              <Skeleton className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl bg-stone-100 shrink-0" />
              <Skeleton className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl bg-stone-100 shrink-0" />
            </div>
          </div>

          {/* Info & Purchase CTAs Column (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Category tag & stock badge */}
            <div className="flex items-center justify-between gap-4">
              <Skeleton className="h-4 w-24 rounded bg-stone-200" />
              <Skeleton className="h-6 w-24 rounded-full bg-stone-100" />
            </div>

            {/* Product Title */}
            <div className="space-y-2">
              <Skeleton className="h-8 sm:h-10 w-4/5 rounded-xl bg-stone-300/80" />
              <Skeleton className="h-4 w-1/2 rounded bg-stone-200" />
            </div>

            {/* Price Box */}
            <div className="pt-2">
              <Skeleton className="h-9 w-40 rounded-lg bg-stone-300/80" />
            </div>

            {/* Description lines */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <Skeleton className="h-3.5 w-full rounded bg-stone-100" />
              <Skeleton className="h-3.5 w-5/6 rounded bg-stone-100" />
              <Skeleton className="h-3.5 w-4/6 rounded bg-stone-100" />
            </div>

            {/* Quick Specs Cards */}
            <div className="grid grid-cols-2 gap-2.5 p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
              <Skeleton className="h-12 rounded-xl bg-white" />
              <Skeleton className="h-12 rounded-xl bg-white" />
              <Skeleton className="h-12 rounded-xl bg-white" />
              <Skeleton className="h-12 rounded-xl bg-white" />
            </div>

            {/* CTAs Action Buttons */}
            <div className="space-y-3 pt-4">
              <Skeleton className="h-13 w-full rounded-2xl bg-stone-300/80" />
              <Skeleton className="h-13 w-full rounded-2xl bg-stone-200" />
            </div>
          </div>
        </div>

        {/* 3. Deep-Dive Specifications & Guidance Tabs Skeleton */}
        <div className="pt-10 border-t border-stone-200/80 space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-32 rounded-xl bg-stone-200" />
            <Skeleton className="h-10 w-32 rounded-xl bg-stone-100" />
            <Skeleton className="h-10 w-32 rounded-xl bg-stone-100" />
          </div>
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-3">
            <Skeleton className="h-4 w-full rounded bg-stone-200/80" />
            <Skeleton className="h-4 w-5/6 rounded bg-stone-200/80" />
            <Skeleton className="h-4 w-3/4 rounded bg-stone-200/80" />
          </div>
        </div>

        {/* 4. Related Products Skeleton */}
        <div className="pt-8 space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-7 w-44 rounded-lg bg-stone-300/80" />
            <Skeleton className="h-4 w-20 rounded bg-stone-200" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6">
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
