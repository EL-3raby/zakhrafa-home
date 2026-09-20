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
    <nav aria-label="تنقل الصفحات" className="pt-6 pb-2 flex flex-col items-center justify-center gap-2">
      {/* Centered Floating Luxury Pagination Pill */}
      <div className="inline-flex items-center gap-1 sm:gap-1.5 p-1.5 bg-white rounded-2xl border border-stone-200/90 shadow-xs shadow-stone-900/5">
        {/* Previous Button (In RTL, ChevronRight is Previous) */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-9 px-2.5 sm:px-3.5 rounded-xl inline-flex items-center gap-1.5 text-xs font-bold transition-all disabled:opacity-25 disabled:cursor-not-allowed hover:bg-stone-100 text-stone-700 active:scale-95 cursor-pointer select-none"
          aria-label="الصفحة السابقة"
          title="الصفحة السابقة"
        >
          <ChevronRight className="w-4 h-4 stroke-[2]" />
          <span className="hidden sm:inline">السابق</span>
        </button>

        <div className="h-4 w-[1px] bg-stone-200 mx-0.5" />

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pages.map((page, idx) => {
            if (page === '...') {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-stone-400 font-bold select-none text-xs"
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
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center cursor-pointer select-none ${
                  isActive
                    ? 'bg-[#0B3D42] text-white shadow-sm shadow-[#0B3D42]/20 font-black scale-105'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-[#0B3D42]'
                }`}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`صفحة ${pageNum}`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <div className="h-4 w-[1px] bg-stone-200 mx-0.5" />

        {/* Next Button (In RTL, ChevronLeft is Next) */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-9 px-2.5 sm:px-3.5 rounded-xl inline-flex items-center gap-1.5 text-xs font-bold transition-all disabled:opacity-25 disabled:cursor-not-allowed hover:bg-stone-100 text-stone-700 active:scale-95 cursor-pointer select-none"
          aria-label="الصفحة التالية"
          title="الصفحة التالية"
        >
          <span className="hidden sm:inline">التالي</span>
          <ChevronLeft className="w-4 h-4 stroke-[2]" />
        </button>
      </div>

      {/* Page indicator hint */}
      <p className="text-[11px] text-stone-400 font-medium">
        صفحة <strong className="text-stone-700 font-bold">{currentPage}</strong> من{' '}
        <strong className="text-stone-700 font-bold">{totalPages}</strong>
      </p>
    </nav>
  );
};
