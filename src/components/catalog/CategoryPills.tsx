import React from 'react';
import Link from 'next/link';
import { LayoutGrid } from 'lucide-react';
import { Category } from '@/types/category';

interface CategoryPillsProps {
  currentCategorySlug?: string;
  categories?: Category[];
}

const SHORT_NAMES: Record<string, string> = {
  'living-rooms': 'غرف المعيشة',
  'dining-rooms': 'غرف السفرة',
  'bedrooms': 'غرف النوم',
  'tables-consoles': 'طاولات وكونسول',
  'decor-accessories': 'ديكور وإضاءة',
  'custom-projects': 'تفصيل خاص',
};

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  currentCategorySlug,
  categories: passedCategories,
}) => {
  const categoryList = passedCategories && passedCategories.length > 0 ? passedCategories : [];
  if (categoryList.length === 0) {
    return null;
  }
  return (
    <div
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      className="w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden no-scrollbar py-2.5 sm:py-3.5 border-b border-stone-200/70 bg-white/95 backdrop-blur-md sticky top-16 z-30 shadow-2xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 sm:gap-2.5">
        {/* All Categories Chip */}
        <Link
          href="/categories"
          className={`shrink-0 inline-flex items-center gap-2 pl-3.5 pr-2.5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer select-none active:scale-95 ${
            !currentCategorySlug
              ? 'bg-[#0B3D42] text-white shadow-sm shadow-[#0B3D42]/20 ring-2 ring-[#0B3D42]/15'
              : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-200/90 shadow-2xs hover:border-[#0B3D42]/30'
          }`}
        >
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
              !currentCategorySlug
                ? 'bg-white/15 text-white'
                : 'bg-stone-100 text-stone-600'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </div>
          <span>كل الأقسام</span>
        </Link>

        {/* Category Chips with Real Micro-Thumbnails */}
        {categoryList.map((cat) => {
          const isActive = currentCategorySlug === cat.slug;
          const displayName = SHORT_NAMES[cat.slug] || cat.name_ar;

          return (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className={`shrink-0 inline-flex items-center gap-2 pl-3 pr-1.5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer select-none active:scale-95 ${
                isActive
                  ? 'bg-[#0B3D42] text-white shadow-sm shadow-[#0B3D42]/20 ring-2 ring-[#0B3D42]/15'
                  : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-200/90 shadow-2xs hover:border-[#0B3D42]/30'
              }`}
            >
              {/* Category Micro-Thumbnail Photo */}
              <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full overflow-hidden shrink-0 border border-white/40 shadow-2xs bg-stone-100">
                <img
                  src={cat.image_url}
                  alt={cat.name_ar}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <span>{displayName}</span>

              {/* Count Indicator */}
              <span
                className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-stone-100 text-stone-400'
                }`}
              >
                {cat.item_count}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
