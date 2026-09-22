import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ProductCardSkeleton } from './ProductCardSkeleton';

export function ProductGridSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* 1. Category Hero Banner Skeleton */}
      <section className="bg-gradient-to-b from-[#EDF5F6]/60 via-[#FAF9F5]/40 to-white pt-5 pb-5 sm:pt-8 sm:pb-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Skeleton */}
          <div className="flex items-center gap-2 mb-3 sm:mb-6">
            <Skeleton className="h-3.5 w-16 rounded bg-stone-200" />
            <span className="text-gray-300">/</span>
            <Skeleton className="h-3.5 w-24 rounded bg-stone-200" />
          </div>

          {/* Title & Description Skeleton */}
          <div className="max-w-3xl space-y-3 text-right">
            <Skeleton className="h-6 w-36 rounded-full bg-white border border-stone-200" />
            <Skeleton className="h-8 sm:h-10 w-64 sm:w-80 rounded-xl bg-stone-300/80" />
            <div className="space-y-1.5 pt-1">
              <Skeleton className="h-3.5 w-full max-w-lg rounded bg-stone-200/90" />
              <Skeleton className="h-3.5 w-3/4 max-w-md rounded bg-stone-200/70" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Pills Skeleton Strip */}
      <div className="w-full py-2.5 sm:py-3.5 border-b border-stone-200/70 bg-white/95 backdrop-blur-md sticky top-16 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 sm:gap-2.5 overflow-hidden">
          <Skeleton className="shrink-0 h-9 w-28 rounded-full bg-stone-200" />
          <Skeleton className="shrink-0 h-9 w-32 rounded-full bg-stone-100" />
          <Skeleton className="shrink-0 h-9 w-28 rounded-full bg-stone-100" />
          <Skeleton className="shrink-0 h-9 w-32 rounded-full bg-stone-100" />
          <Skeleton className="shrink-0 h-9 w-28 rounded-full bg-stone-100" />
          <Skeleton className="shrink-0 h-9 w-32 rounded-full bg-stone-100" />
        </div>
      </div>

      {/* 3. Catalog Products & Toolbar Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-6">
        {/* Toolbar Header Skeleton */}
        <div className="flex items-center justify-between gap-4 pb-2 border-b border-stone-200/80">
          <Skeleton className="h-5 w-36 rounded bg-stone-200" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-24 rounded-xl bg-stone-200" />
            <Skeleton className="h-9 w-28 rounded-xl bg-stone-200" />
          </div>
        </div>

        {/* Responsive Product Cards Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
