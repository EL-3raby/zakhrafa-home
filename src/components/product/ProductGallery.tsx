'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import {
  ChevronRight,
  ChevronLeft,
  Maximize2,
  X,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { ProductImage, StockStatus } from '@/types/product';

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
  stockStatus: StockStatus;
  isFeatured?: boolean;
  discountPrice?: number;
  originalPrice?: number;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
  stockStatus,
  isFeatured,
  discountPrice,
  originalPrice,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isLightboxOpen]);

  // If no images provided, supply a placeholder
  const galleryImages =
    images && images.length > 0
      ? images
      : [
          {
            url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop',
            alt: productName,
            is_primary: true,
          },
        ];

  const currentImage = galleryImages[selectedIndex] || galleryImages[0];

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, [galleryImages.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowRight') handlePrev(); // RTL natural direction
      if (e.key === 'ArrowLeft') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, handleNext, handlePrev]);

  // Calculate discount percent if any
  const discountPercent =
    originalPrice && discountPrice && originalPrice > discountPrice
      ? Math.round(((originalPrice - discountPrice) / originalPrice) * 100)
      : null;

  return (
    <div className="space-y-4">
      {/* Main Image Viewport with interactive controls */}
      <div className="group/gallery relative aspect-[4/3] sm:aspect-[5/4] w-full rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/70 shadow-sm transition-all duration-300">
        <Image
          src={currentImage.url}
          alt={currentImage.alt || productName}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover transition-transform duration-700 ease-out group-hover/gallery:scale-105 cursor-zoom-in"
          onClick={() => setIsLightboxOpen(true)}
        />

        {/* Top Badges Bar */}
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 left-3 sm:left-4 flex items-center justify-between gap-2 pointer-events-none z-10">
          <div className="flex flex-wrap items-center gap-2">
            {stockStatus === 'in_stock' ? (
              <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-[#0B3D42] text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border border-stone-200/60">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>متوفر تسليم فوري في مصر</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-[#E17F3F] text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border border-stone-200/60">
                <span className="w-2 h-2 rounded-full bg-[#E17F3F]" />
                <span>تنفيذ وتفصيل حسب المقاس</span>
              </span>
            )}

            {isFeatured && (
              <span className="inline-flex items-center gap-1 bg-[#0B3D42] text-white text-[11px] sm:text-xs font-bold px-2.5 py-1.5 rounded-full shadow-sm">
                <Sparkles className="w-3 h-3 text-[#E17F3F]" />
                <span>قطعة حصرية</span>
              </span>
            )}
          </div>

          {discountPercent && (
            <span className="inline-flex items-center justify-center bg-red-600 text-white text-xs sm:text-sm font-black px-3 py-1 rounded-full shadow-md tracking-tight">
              خصم {discountPercent}%
            </span>
          )}
        </div>

        {/* Bottom Bar: Image Index Pill & Zoom Trigger */}
        <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 left-3 sm:left-4 flex items-center justify-between z-10 pointer-events-none">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/55 backdrop-blur-md text-white text-xs font-medium tracking-wide">
            {selectedIndex + 1} / {galleryImages.length}
          </span>

          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white backdrop-blur-md text-stone-800 text-xs font-bold shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
            aria-label="تكبير الصورة"
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#0B3D42]" />
            <span className="hidden sm:inline">تكبير الشاشة</span>
          </button>
        </div>

        {/* Navigation Arrows for Multi-image Galleries */}
        {galleryImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#0B3D42] flex items-center justify-center shadow-md transition-all opacity-0 group-hover/gallery:opacity-100 hover:scale-110 active:scale-95 z-10"
              aria-label="الصورة السابقة"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#0B3D42] flex items-center justify-center shadow-md transition-all opacity-0 group-hover/gallery:opacity-100 hover:scale-110 active:scale-95 z-10"
              aria-label="الصورة التالية"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {galleryImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
          {galleryImages.map((img, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`relative w-20 h-16 sm:w-24 sm:h-20 rounded-2xl overflow-hidden shrink-0 transition-all duration-200 border-2 ${
                  isSelected
                    ? 'border-[#0B3D42] ring-2 ring-[#0B3D42]/20 shadow-md scale-102'
                    : 'border-transparent opacity-65 hover:opacity-100 hover:border-stone-300'
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.alt || `${productName} - معاينة ${idx + 1}`}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
                {isSelected && (
                  <span className="absolute bottom-1 right-1 bg-[#0B3D42] text-white p-0.5 rounded-full shadow-xs">
                    <CheckCircle2 className="w-3 h-3" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Modal via React Portal */}
      {mounted &&
        isLightboxOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`تكبير صورة ${productName}`}
            className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-6 select-none animate-in fade-in duration-200"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Top Bar with Product Title and Close Button */}
            <div className="w-full max-w-6xl flex items-center justify-between z-20 pt-2 px-2">
              <div className="text-white text-right">
                <h3 className="font-bold text-sm sm:text-base leading-snug">{productName}</h3>
                <p className="text-xs text-stone-400">
                  صورة {selectedIndex + 1} من {galleryImages.length}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition border border-white/20 cursor-pointer active:scale-95"
                aria-label="إغلاق نافذة التكبير"
              >
                <X className="w-6 h-6 stroke-[2]" />
              </button>
            </div>

            {/* Centered Large Image */}
            <div
              className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-2 sm:my-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full max-h-[75vh] flex items-center justify-center">
                <Image
                  src={currentImage.url}
                  alt={currentImage.alt || productName}
                  fill
                  priority
                  sizes="95vw"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Bottom Thumbnails Strip inside Lightbox */}
            {galleryImages.length > 1 && (
              <div
                className="w-full max-w-xl flex items-center justify-center gap-2 overflow-x-auto py-2 z-20"
                onClick={(e) => e.stopPropagation()}
              >
                {galleryImages.map((img, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedIndex(idx)}
                      className={`relative w-14 h-11 sm:w-16 sm:h-12 rounded-xl overflow-hidden shrink-0 transition-all border-2 cursor-pointer ${
                        isSelected
                          ? 'border-[#E17F3F] ring-2 ring-[#E17F3F]/40 scale-105 opacity-100 shadow-md'
                          : 'border-white/20 opacity-40 hover:opacity-80'
                      }`}
                    >
                      <Image
                        src={img.url}
                        alt={`صورة مصغرة ${idx + 1}`}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Lightbox Navigation */}
            {galleryImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition hover:scale-110 active:scale-95 cursor-pointer z-30 shadow-lg"
                  aria-label="السابق"
                >
                  <ChevronRight className="w-6 h-6 stroke-[2.5]" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition hover:scale-110 active:scale-95 cursor-pointer z-30 shadow-lg"
                  aria-label="التالي"
                >
                  <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                </button>
              </>
            )}
          </div>,
          document.body
        )}
    </div>
  );
};
