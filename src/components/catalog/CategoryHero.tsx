import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Home } from 'lucide-react';
import { Category } from '@/types/category';

interface CategoryHeroProps {
  category?: Category;
  totalProductsCount: number;
}

export const CategoryHero: React.FC<CategoryHeroProps> = ({
  category,
  totalProductsCount,
}) => {
  const isAllCategories = !category;
  const title = isAllCategories ? 'كتالوج المنتجات الشامل' : category.name_ar;
  const description = isAllCategories
    ? 'استكشف تشكيلتنا الحصرية من أطقم الصالونات، غرف السفرة، غرف النوم، والديكورات العصرية المصنوعة بأعلى مقاييس الجودة.'
    : category.description_ar;

  return (
    <section className="bg-gradient-to-b from-[#EDF5F6]/60 via-[#FAF9F5]/40 to-white pt-5 pb-5 sm:pt-8 sm:pb-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb navigation */}
        <nav aria-label="مسار التصفح" className="flex items-center gap-1.5 text-xs text-gray-500 mb-3 sm:mb-6 overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link href="/" className="hover:text-[#E17F3F] transition flex items-center gap-1 shrink-0">
            <Home className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>الرئيسية</span>
          </Link>
          <ChevronLeft className="w-3.5 h-3.5 text-gray-400 stroke-[1.5] shrink-0" />
          <Link
            href="/categories"
            className={`transition shrink-0 ${isAllCategories ? 'text-[#0B3D42] font-semibold' : 'hover:text-[#E17F3F]'}`}
          >
            أقسام الكتالوج
          </Link>
          {!isAllCategories && (
            <>
              <ChevronLeft className="w-3.5 h-3.5 text-gray-400 stroke-[1.5] shrink-0" />
              <span className="text-[#0B3D42] font-semibold shrink-0">{category.name_ar}</span>
            </>
          )}
        </nav>

        {/* Hero title & description */}
        <div className="max-w-3xl space-y-2 sm:space-y-3 text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#0B3D42]/10 text-[#0B3D42] text-[11px] sm:text-xs font-semibold shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E17F3F]" />
            <span>{totalProductsCount} تصاميم متوفرة ومعروضة</span>
          </div>

          <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B3D42] tracking-tight">
            {title}
          </h1>

          <p className="text-gray-600 text-xs sm:text-base leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};
