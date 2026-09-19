'use client';

import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (limit: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  // If only 1 page and 10 or fewer items, don't show pagination
  if (totalPages <= 1 && totalItems <= 10) return null;

  // Calculate viewed percentage
  const viewedPercent = Math.min(100, Math.round((endIndex / totalItems) * 100));

  // Generate page numbers with ellipses
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, '...', totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const pages = getPageNumbers();

  return (
    <div className="pt-8 mt-6 border-t border-stone-200/90 space-y-4">
      {/* Top Status & Progress Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600 px-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">
            عرض <strong className="text-[#0B3D42] font-black">{startIndex + 1} - {endIndex}</strong> من أصل{' '}
            <strong className="text-[#0B3D42] font-black">{totalItems}</strong> تصميم فاخر
          </span>
        </div>

        {/* Progress Bar Showing Viewed Percentage */}
        <div className="w-full sm:w-52 flex items-center gap-2.5">
          <div className="flex-1 h-1.5 rounded-full bg-stone-200 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#0B3D42] to-[#E17F3F] rounded-full transition-all duration-500"
              style={{ width: `${viewedPercent}%` }}
            />
          </div>
          <span className="text-[11px] font-bold text-stone-500 shrink-0">{viewedPercent}% مكتمل</span>
        </div>

        {/* Items Per Page Quick Selector */}
        {onItemsPerPageChange && (
          <div className="hidden md:flex items-center gap-1.5 text-[11px]">
            <span className="text-stone-400">في الصفحة:</span>
            {[10, 20].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => onItemsPerPageChange(count)}
                className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                  itemsPerPage === count
                    ? 'bg-[#0B3D42] text-white shadow-2xs'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                {count}
              </button>
            ))}
            <button
              type="button"
              onClick={() => onItemsPerPageChange(-1)}
              className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                itemsPerPage === -1
                  ? 'bg-[#0B3D42] text-white shadow-2xs'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              الكل
            </button>
          </div>
        )}
      </div>

      {/* Main Pagination Floating Bar */}
      <div className="flex items-center justify-between bg-white rounded-2xl border border-stone-200 p-2 sm:p-3 shadow-xs">
        {/* Previous Page Button (In RTL, Previous goes with ChevronRight) */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-100 text-stone-700 active:scale-95 cursor-pointer"
          aria-label="الصفحة السابقة"
        >
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          <span className="hidden sm:inline">السابق</span>
        </button>

        {/* Page Number Buttons */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {pages.map((page, idx) => {
            if (page === '...') {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-stone-400 font-bold select-none text-xs"
                >
                  •••
                </span>
              );
            }

            const pageNum = page as number;
            const isActive = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => onPageChange(pageNum)}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl text-xs sm:text-sm font-black transition-all duration-200 flex items-center justify-center cursor-pointer ${
                  isActive
                    ? 'bg-[#0B3D42] text-white shadow-md scale-105 ring-2 ring-[#0B3D42]/20'
                    : 'text-stone-700 hover:bg-stone-100 hover:text-[#0B3D42] border border-transparent hover:border-stone-200'
                }`}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`صفحة ${pageNum}`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Next Page Button (In RTL, Next goes with ChevronLeft) */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-100 text-stone-700 active:scale-95 cursor-pointer"
          aria-label="الصفحة التالية"
        >
          <span className="hidden sm:inline">التالي</span>
          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
