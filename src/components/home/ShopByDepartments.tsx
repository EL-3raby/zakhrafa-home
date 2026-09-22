'use client';

import React, { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, ArrowLeft, PackageOpen } from 'lucide-react';
import { Category } from '@/types/category';
import { Product } from '@/types/product';
import { CATEGORIES as MOCK_CATEGORIES, PRODUCTS as MOCK_PRODUCTS } from '@/data/mock-products';

interface ShopByDepartmentsProps {
  categories?: Category[];
  products?: Product[];
}

export const ShopByDepartments: React.FC<ShopByDepartmentsProps> = ({
  categories: passedCategories,
  products: passedProducts,
}) => {
  const isDev = process.env.NODE_ENV === 'development';
  const allCategories =
    passedCategories && passedCategories.length > 0
      ? passedCategories
      : isDev
      ? MOCK_CATEGORIES
      : [];

  const allProducts =
    passedProducts && passedProducts.length > 0
      ? passedProducts
      : isDev
      ? MOCK_PRODUCTS
      : [];

  const initialTab = allCategories[0]?.slug || 'living-rooms';
  const [activeTabSlug, setActiveTabSlug] = useState<string>(initialTab);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter products by selected department
  const activeProducts = useMemo(() => {
    return allProducts.filter(
      (p) => p.category_id === activeTabSlug || p.category?.slug === activeTabSlug
    );
  }, [allProducts, activeTabSlug]);

  const activeCategory = useMemo(() => {
    return allCategories.find((c) => c.slug === activeTabSlug);
  }, [allCategories, activeTabSlug]);

  const activeTabInfo = useMemo(() => {
    return allCategories.find((category) => category.slug === activeTabSlug) || allCategories[0];
  }, [allCategories, activeTabSlug]);

  // Carousel scrolling handlers
  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = scrollContainerRef.current.clientWidth * 0.75;
    const delta = direction === 'left' ? -scrollAmount : scrollAmount;
    scrollContainerRef.current.scrollBy({ left: delta, behavior: 'smooth' });
  };

  if (allCategories.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-gray-100 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Category Pills - Directly underneath title starting from right */}
        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-right">
          {/* Section Main Title with Copper Bar */}
          <div className="flex items-center gap-2.5">
            <span className="w-1 sm:w-1.5 h-6 sm:h-7 rounded-full bg-[#E17F3F] shrink-0" />
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#0B3D42] tracking-tight">
              تسوق الأقسام
            </h2>
            <span className="text-xs text-stone-300 font-normal hidden sm:inline">•</span>
            <span className="text-xs sm:text-sm text-stone-500 font-normal hidden sm:inline">
              تشكيلات مختارة بعناية موزعة حسب مساحات وغرف منزلك
            </span>
          </div>

          {/* Category Tabs / Pills directly under title from right to left */}
          <div className="flex items-center justify-start gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            {allCategories.map((tab) => {
              const isActive = activeTabSlug === tab.slug;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTabSlug(tab.slug)}
                  className={`shrink-0 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer active:scale-95 whitespace-nowrap select-none ${
                    isActive
                      ? 'border-2 border-[#E17F3F] text-[#E17F3F] bg-[#E17F3F]/5 shadow-2xs'
                      : 'border border-stone-200 text-stone-600 hover:border-stone-400 hover:text-stone-900 bg-white'
                  }`}
                >
                  {tab.name_ar}
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel Slider Container */}
        {activeProducts.length > 0 ? (
          <div className="relative group/carousel">
            {/* Navigation Arrows (Desktop overlay) */}
            <button
              type="button"
              onClick={() => scroll('right')}
              aria-label="التالي"
              className="hidden md:flex absolute -right-3 sm:-right-5 top-[38%] -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 backdrop-blur-xs border border-stone-200 shadow-md text-stone-700 hover:bg-stone-50 hover:text-[#0B3D42] items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 stroke-[2]" />
            </button>

            <button
              type="button"
              onClick={() => scroll('left')}
              aria-label="السابق"
              className="hidden md:flex absolute -left-3 sm:-left-5 top-[38%] -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 backdrop-blur-xs border border-stone-200 shadow-md text-stone-700 hover:bg-stone-50 hover:text-[#0B3D42] items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2]" />
            </button>

            {/* Horizontal Product Cards Row */}
            <div
              ref={scrollContainerRef}
              className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth snap-x pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
            >
              {activeProducts.map((product) => {
                const mainImage = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=700&auto=format&fit=crop';
                const hasDiscount = Boolean(product.discount_price && product.price && product.discount_price < product.price);
                const discountPercent = hasDiscount
                  ? Math.round((((product.price || 0) - (product.discount_price || 0)) / (product.price || 1)) * 100)
                  : 20;

                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="w-[240px] sm:w-[270px] md:w-[290px] shrink-0 snap-start flex flex-col group cursor-pointer"
                  >
                    {/* Card Image Container (Landscape rounded rectangular) */}
                    <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-2xs">
                      <img
                        src={mainImage}
                        alt={product.name_ar}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />

                      {/* Discount Badge on Top-Right Corner */}
                      {hasDiscount && (
                        <div className="absolute top-2.5 right-2.5 bg-[#E17F3F] text-white font-extrabold text-[11px] px-2 py-0.5 rounded-md shadow-sm">
                          -{discountPercent}%
                        </div>
                      )}
                    </div>

                    {/* Product Title below image */}
                    <h3 className="text-stone-900 font-bold text-sm sm:text-base text-center mt-3 group-hover:text-[#0B3D42] transition-colors line-clamp-1">
                      {product.name_ar}
                    </h3>

                    {/* Prices Row below title */}
                    <div className="flex items-center justify-center gap-2 mt-1">
                      {hasDiscount ? (
                        <>
                          <span className="text-stone-400 line-through text-xs sm:text-sm font-normal">
                            {(product.price || 0).toLocaleString('ar-EG')} ج.م
                          </span>
                          <span className="text-[#E17F3F] font-black text-sm sm:text-base">
                            {(product.discount_price || 0).toLocaleString('ar-EG')} ج.م
                          </span>
                        </>
                      ) : (
                        <span className="text-[#0B3D42] font-black text-sm sm:text-base">
                          {(product.price || 0).toLocaleString('ar-EG')} ج.م
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="py-12 px-4 text-center bg-stone-50/50 rounded-2xl border border-dashed border-stone-200 space-y-2">
            <PackageOpen className="w-8 h-8 text-stone-400 mx-auto stroke-[1.5]" />
            <p className="text-stone-600 font-bold text-sm">لا توجد معروضات مضافة في هذا القسم حاليًا</p>
            <p className="text-stone-400 text-xs">سيتم تحديث القسم قريبًا بأحدث التصاميم</p>
          </div>
        )}

        {/* View All In Category Footer Link */}
        <div className="pt-6 flex items-center justify-center">
          <Link
            href={`/categories/${activeCategory?.slug || activeTabSlug}`}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-stone-200 hover:border-[#0B3D42] text-xs sm:text-sm font-bold text-stone-700 hover:text-[#0B3D42] bg-stone-50/60 hover:bg-white transition-all shadow-2xs active:scale-95 group"
          >
            <span>استكشف كافة معروضات {activeTabInfo.name_ar}</span>
            <ArrowLeft className="w-4 h-4 text-[#E17F3F] group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
