import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminLoading() {
  return (
    <div className="p-6 sm:p-8 space-y-6">
      {/* Admin Page Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 rounded-lg bg-stone-300/80" />
          <Skeleton className="h-4 w-72 rounded bg-stone-200" />
        </div>
        <Skeleton className="h-10 w-36 rounded-xl bg-stone-200" />
      </div>

      {/* Admin Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="p-5 rounded-2xl bg-white border border-stone-200/80 space-y-3 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-20 rounded bg-stone-200" />
              <Skeleton className="h-8 w-8 rounded-lg bg-stone-100" />
            </div>
            <Skeleton className="h-7 w-24 rounded-lg bg-stone-300/80" />
          </div>
        ))}
      </div>

      {/* Admin Content Table Skeleton */}
      <div className="rounded-2xl bg-white border border-stone-200/80 p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-stone-100">
          <Skeleton className="h-10 w-64 rounded-xl bg-stone-100" />
          <Skeleton className="h-10 w-32 rounded-xl bg-stone-100" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3.5 rounded-xl bg-stone-50/70"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-lg bg-stone-200" />
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-40 rounded bg-stone-200" />
                  <Skeleton className="h-3 w-24 rounded bg-stone-100" />
                </div>
              </div>
              <Skeleton className="h-8 w-24 rounded-lg bg-stone-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
