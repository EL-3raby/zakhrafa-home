import React from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/data/mock-products';

interface CategoryPillsProps {
  currentCategorySlug?: string;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  currentCategorySlug,
}) => {
  return (
    <div
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      className="w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden no-scrollbar py-3 sm:py-4 border-b border-gray-100 bg-white/95 backdrop-blur-md sticky top-16 z-30 shadow-xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2.5">
        <Link
          href="/categories"
          className={`shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
            !currentCategorySlug
              ? 'bg-[#0B3D42] text-white shadow-xs'
              : 'bg-slate-100 text-gray-700 hover:bg-slate-200/80 hover:text-[#0B3D42]'
          }`}
        >
          كل الأقسام
        </Link>

        {CATEGORIES.map((cat) => {
          const isActive = currentCategorySlug === cat.slug;
          return (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-[#0B3D42] text-white shadow-xs'
                  : 'bg-slate-100 text-gray-700 hover:bg-slate-200/80 hover:text-[#0B3D42]'
              }`}
            >
              <span>{cat.name_ar}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
