'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, ArrowLeft, Tag, Eye } from 'lucide-react';
import { WhatsAppIcon } from '@/components/common/BrandIcons';

export interface OfferProduct {
  id: string;
  slug: string;
  categorySlug: string;
  categoryName: string;
  title: string;
  subtitle?: string;
  image: string;
  originalPrice: number;
  discountPrice: number;
  discountBadge: string;
}

const OFFERS_LIST: OfferProduct[] = [
  {
    id: 'offer-1',
    slug: 'milano-luxury-sofa-set',
    categorySlug: 'living-rooms',
    categoryName: 'غرف المعيشة والصالونات',
    title: 'طقم كنب ميلانو الفاخر (4 قطع)',
    subtitle: 'خشب زان أحمر + قماش مخمل إيطالي',
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=700&auto=format&fit=crop',
    originalPrice: 14500,
    discountPrice: 12900,
    discountBadge: '-11%',
  },
  {
    id: 'offer-2',
    slug: 'aurora-king-bed-set',
    categorySlug: 'bedrooms',
    categoryName: 'غرف النوم الفاخرة',
    title: 'غرفة نوم أورورا الفاخرة (كينج)',
    subtitle: 'سرير كينج + زوج كمودينات + تسريحة رخام',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=700&auto=format&fit=crop',
    originalPrice: 22000,
    discountPrice: 19500,
    discountBadge: '-12%',
  },
  {
    id: 'offer-3',
    slug: 'marbella-marble-dining-table',
    categorySlug: 'dining-rooms',
    categoryName: 'غرف السفرة وطاولات الطعام',
    title: 'طاولة طعام ماربيلا رخام إيطالي (8 كراسي)',
    subtitle: 'رخام طبيعي كلكتا وقواعد برونزية متينة',
    image:
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=700&auto=format&fit=crop',
    originalPrice: 16500,
    discountPrice: 14800,
    discountBadge: '-10%',
  },
  {
    id: 'offer-4',
    slug: 'arcadia-corner-sofa',
    categorySlug: 'living-rooms',
    categoryName: 'غرف المعيشة والصالونات',
    title: 'كنبة زاوية أركاديا المودرن',
    subtitle: 'قماش بوكليه ناعم + أرجل ستانلس ذهبي',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=700&auto=format&fit=crop',
    originalPrice: 9800,
    discountPrice: 8400,
    discountBadge: '-15%',
  },
  {
    id: 'offer-5',
    slug: 'serena-floating-bed',
    categorySlug: 'bedrooms',
    categoryName: 'غرف النوم الفاخرة',
    title: 'سرير سيرينا المودرن بتصميم عائم',
    subtitle: 'خشب جوز طبيعي + إضاءة LED مدمجة',
    image:
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=700&auto=format&fit=crop',
    originalPrice: 8900,
    discountPrice: 7600,
    discountBadge: '-15%',
  },
  {
    id: 'offer-6',
    slug: 'imperial-velvet-armchair',
    categorySlug: 'living-rooms',
    categoryName: 'غرف المعيشة والصالونات',
    title: 'فوتيه إمبريال المخملي الفاخر',
    subtitle: 'خشب زان + قماش مخمل زيتي وتفاصيل نحاسية',
    image:
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=700&auto=format&fit=crop',
    originalPrice: 3200,
    discountPrice: 2850,
    discountBadge: '-11%',
  },
];

export const BestOffersStrip: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+201000000000';

  // Move to next offers (leftwards in RTL)
  const handleNext = useCallback(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
  }, []);

  // Move to previous offers (rightwards in RTL)
  const handlePrev = useCallback(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
  }, []);

  // Automatic slow scrolling / loop
  useEffect(() => {
    if (isPaused || isMouseDown) return;

    const interval = setInterval(() => {
      if (!scrollRef.current) return;
      const el = scrollRef.current;
      const maxScroll = el.scrollWidth - el.clientWidth;
      const absScroll = Math.abs(el.scrollLeft);

      // If reached the end of the scroll track, loop back to the start smoothly
      if (absScroll >= maxScroll - 20) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // In RTL, next items are at negative left
        el.scrollBy({ left: -320, behavior: 'smooth' });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused, isMouseDown]);

  // Mouse Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsMouseDown(true);
    setHasDragged(false);
    setStartX(e.clientX);
    setScrollStart(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !scrollRef.current) return;
    e.preventDefault();
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 6) {
      setHasDragged(true);
    }
    scrollRef.current.scrollLeft = scrollStart - dx;
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <section className="w-full py-8 sm:py-12 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header Row: Title on right, "View All Offers" button & Arrows on left */}
        <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3 sm:pb-4">
          {/* Section Title */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#E17F3F]/10 flex items-center justify-center text-[#E17F3F] shrink-0">
              <Tag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#0B3D42] tracking-tight">
                  أقوى العروض
                </h2>
                <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] sm:text-[11px] font-bold">
                  عرض خاص
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5 line-clamp-1">
                تخفيضات استثنائية لفترة محدودة على تشكيلات مختارة
              </p>
            </div>
          </div>

          {/* Action Group: View All Button + Arrow Nav Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/categories?offers=true"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0B3D42] hover:text-[#E17F3F] transition-colors py-1.5 px-3 rounded-lg hover:bg-gray-50 group"
            >
              <span>مشاهدة كل العروض</span>
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 stroke-[2]" />
            </Link>

            {/* Arrows: Right (>) goes Prev, Left (<) goes Next in RTL */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="العرض السابق"
                title="السابق"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-900 hover:bg-[#0B3D42] text-white flex items-center justify-center transition hover:scale-105 active:scale-95 shadow-sm"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="العرض التالي"
                title="التالي"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-900 hover:bg-[#0B3D42] text-white flex items-center justify-center transition hover:scale-105 active:scale-95 shadow-sm"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Carousel Strip */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            handleMouseUp();
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{
            cursor: isMouseDown ? 'grabbing' : 'grab',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden no-scrollbar pb-3 select-none"
        >
          {OFFERS_LIST.map((item) => {
            const formattedPrice = new Intl.NumberFormat('ar-EG').format(item.originalPrice);
            const formattedDiscountPrice = new Intl.NumberFormat('ar-EG').format(
              item.discountPrice
            );

            return (
              <div
                key={item.id}
                className="w-[240px] sm:w-[310px] shrink-0 bg-white rounded-xl sm:rounded-2xl border border-gray-100/90 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 hover:border-[#0B3D42]/20 transition-all duration-300 flex flex-col justify-between group/card"
              >
                {/* Product Image Frame with Offer Badges */}
                <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="310px"
                    className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-108"
                  />

                  {/* Top-Right: Red "عرض" Badge */}
                  <div className="absolute top-3 right-3 z-10 pointer-events-none">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-red-600 text-white font-extrabold text-xs shadow-md tracking-wide">
                      عرض
                    </span>
                  </div>

                  {/* Top-Left: Discount Percentage Badge */}
                  <div className="absolute top-3 left-3 z-10 pointer-events-none">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-[#0B3D42]/90 backdrop-blur-xs text-white font-bold text-xs shadow-md border border-white/20">
                      {item.discountBadge}
                    </span>
                  </div>

                  {/* Hover Overlay with Quick Actions */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2.5">
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={(e) => {
                        if (hasDragged) e.preventDefault();
                      }}
                      className="w-10 h-10 rounded-full bg-white text-[#0B3D42] flex items-center justify-center hover:bg-[#E17F3F] hover:text-white transition-all duration-200 shadow-md translate-y-2 group-hover/card:translate-y-0 hover:scale-110 active:scale-95"
                      title="عرض التفاصيل"
                    >
                      <Eye className="w-5 h-5 stroke-[2]" />
                    </Link>
                    <a
                      href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `مرحباً زخرفة، أود الاستفسار عن عرض: ${item.title} بسعر ${formattedDiscountPrice} ج.م`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-[#0B3D42] text-white flex items-center justify-center hover:bg-[#07262A] transition-all duration-200 shadow-md translate-y-2 group-hover/card:translate-y-0 hover:scale-110 active:scale-95"
                      title="طلب سريع عبر واتساب"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-white" />
                    </a>
                  </div>
                </div>

                {/* Content info below image */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* Category Link */}
                    <Link
                      href={`/categories/${item.categorySlug}`}
                      onClick={(e) => {
                        if (hasDragged) e.preventDefault();
                      }}
                      className="text-[11px] font-semibold text-[#E17F3F] hover:underline block mb-1"
                    >
                      {item.categoryName}
                    </Link>

                    {/* Product Title Link */}
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={(e) => {
                        if (hasDragged) e.preventDefault();
                      }}
                      className="block font-bold text-sm sm:text-base text-gray-800 hover:text-[#0B3D42] transition line-clamp-1"
                    >
                      {item.title}
                    </Link>
                    {item.subtitle && (
                      <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                        {item.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Price display (Original crossed out + Discount in bold red) */}
                  <div className="pt-2 border-t border-gray-100 flex items-baseline justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base sm:text-lg font-black text-red-600">
                        {formattedDiscountPrice}{' '}
                        <span className="text-xs font-bold text-gray-500">ج.م</span>
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        {formattedPrice} ج.م
                      </span>
                    </div>

                    <Link
                      href={`/products/${item.slug}`}
                      onClick={(e) => {
                        if (hasDragged) e.preventDefault();
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#0B3D42] hover:text-[#E17F3F] transition"
                    >
                      <span>التفاصيل</span>
                      <ArrowLeft className="w-3 h-3 stroke-[2]" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile View All Button */}
        <div className="sm:hidden pt-2 text-center">
          <Link
            href="/categories?offers=true"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold text-[#0B3D42] bg-[#FAF9F5] border border-gray-200 transition"
          >
            <span>مشاهدة كل العروض</span>
            <ArrowLeft className="w-4 h-4 stroke-[2]" />
          </Link>
        </div>
      </div>
    </section>
  );
};
