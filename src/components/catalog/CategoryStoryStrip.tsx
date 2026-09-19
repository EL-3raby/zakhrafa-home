'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CategoryStripItem {
  id: string;
  slug?: string;
  title: string;
  image_url: string;
}

export const CATEGORY_STRIP_ITEMS: CategoryStripItem[] = [
  {
    id: 'living-rooms',
    slug: 'living-rooms',
    title: 'صالونات ومعيشة',
    image_url:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'dining-rooms',
    slug: 'dining-rooms',
    title: 'طاولات سفرة',
    image_url:
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'bedrooms',
    slug: 'bedrooms',
    title: 'غرف نوم',
    image_url:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'tables-consoles',
    slug: 'tables-consoles',
    title: 'طاولات وسط',
    image_url:
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'side-tables',
    slug: 'tables-consoles',
    title: 'ترابيزات جانبية',
    image_url:
      'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'tv-units',
    slug: 'custom-projects',
    title: 'وحدات تليفزيون',
    image_url:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'consoles',
    slug: 'tables-consoles',
    title: 'كونسول ومداخل',
    image_url:
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'buffets',
    slug: 'dining-rooms',
    title: 'خزائن وبوفيه',
    image_url:
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'decor-accessories',
    slug: 'decor-accessories',
    title: 'إضاءة وديكور',
    image_url:
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'custom-projects',
    slug: 'custom-projects',
    title: 'تفصيل خاص',
    image_url:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop',
  },
];

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
