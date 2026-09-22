'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '@/data/mock-products';

export interface CategoryStripItem {
  id: string;
  slug?: string;
  title: string;
  image_url: string;
}

export const CATEGORY_STRIP_ITEMS: CategoryStripItem[] = CATEGORIES.map((category) => ({
  id: category.id,
  slug: category.slug,
  title: category.name_ar,
  image_url: category.image_url,
}));

interface CategoryStoryStripProps {
  currentCategorySlug?: string;
  onSelectCategory?: (slug?: string) => void;
}

export const CategoryStoryStrip: React.FC<CategoryStoryStripProps> = ({
  currentCategorySlug,
  onSelectCategory,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position to toggle arrows
  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    // In RTL, scrollLeft can be negative or positive depending on browser implementation
    const maxScroll = scrollWidth - clientWidth;
    const absScroll = Math.abs(scrollLeft);

    setCanScrollRight(absScroll < maxScroll - 10);
    setCanScrollLeft(absScroll > 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 320;
    // RTL scroll direction adjustment
    const delta = direction === 'left' ? -scrollAmount : scrollAmount;
    scrollContainerRef.current.scrollBy({
      left: delta,
      behavior: 'smooth',
    });
    setTimeout(checkScroll, 350);
  };

  return (
    <div className="relative w-full py-4 sm:py-6 group">
      {/* Scroll Left Button */}
      <button
        type="button"
        onClick={() => handleScroll('left')}
        aria-label="التمرير لليسار"
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 backdrop-blur-xs shadow-md border border-gray-100 items-center justify-center text-gray-700 hover:text-[#0B3D42] hover:scale-105 transition active:scale-95"
      >
        <ChevronLeft className="w-5 h-5 stroke-[2]" />
      </button>

      {/* Scroll Right Button */}
      <button
        type="button"
        onClick={() => handleScroll('right')}
        aria-label="التمرير لليمين"
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 backdrop-blur-xs shadow-md border border-gray-100 items-center justify-center text-gray-700 hover:text-[#0B3D42] hover:scale-105 transition active:scale-95"
      >
        <ChevronRight className="w-5 h-5 stroke-[2]" />
      </button>

      {/* Carousel Container */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        className="flex items-center gap-4 sm:gap-6 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden no-scrollbar px-4 sm:px-8 scroll-smooth"
      >
        {CATEGORY_STRIP_ITEMS.map((item) => {
          const isActive = Boolean(
            currentCategorySlug && item.slug && currentCategorySlug === item.slug
          );

          const href = item.slug ? `/categories/${item.slug}` : '/categories';

          const content = (
            <div className="flex flex-col items-center gap-2.5 w-20 sm:w-24 shrink-0 group/item cursor-pointer">
              {/* Squircle Thumbnail Card */}
              <div
                className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden p-1.5 transition-all duration-300 ${
                  isActive
                    ? 'border-2 border-[#0B3D42] ring-3 ring-[#0B3D42]/15 bg-white shadow-sm scale-105'
                    : 'border border-gray-200/70 bg-[#FAF9F5] group-hover/item:border-[#0B3D42]/40 group-hover/item:shadow-md group-hover/item:-translate-y-1 group-hover/item:scale-105'
                }`}
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-100">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    sizes="96px"
                    className="object-cover transition-transform duration-500 group-hover/item:scale-112"
                  />
                </div>
              </div>

              {/* Title Underneath */}
              <span
                className={`text-[11px] sm:text-xs text-center font-medium leading-tight line-clamp-1 transition-colors ${
                  isActive
                    ? 'text-[#0B3D42] font-bold'
                    : 'text-gray-700 group-hover/item:text-[#E17F3F]'
                }`}
              >
                {item.title}
              </span>
            </div>
          );

          if (onSelectCategory) {
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectCategory(item.slug)}
                className="focus:outline-hidden"
              >
                {content}
              </button>
            );
          }

          return (
            <Link key={item.id} href={href} className="focus:outline-hidden">
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
