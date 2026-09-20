'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, X, ArrowLeft } from 'lucide-react';
import { WhatsAppIcon } from '@/components/common/BrandIcons';
import { PRODUCTS, CATEGORIES } from '@/data/mock-products';

export interface HotspotItem {
  id: string;
  productSlug: string; // Must match a slug in mock-products.ts
  x: number; // % from left (0 to 100)
  y: number; // % from top (0 to 100)
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
}

export interface RoomScene {
  id: string;
  name: string;
  badge: string;
  image: string;
  description: string;
  hotspots: HotspotItem[];
}

const ROOM_SCENES: RoomScene[] = [
  {
    id: 'panoramic-living',
    name: 'صالون الإطلالة البانورامية',
    badge: 'الأكثر إعجاباً',
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1800&auto=format&fit=crop',
    description: 'تناغم فاخر بين درجات البيج والكريمي مع أخشاب الجوز الطبيعية في صالون مفتوح بإطلالة واسعة.',
    hotspots: [
      {
        id: 'spot-sofa',
        productSlug: 'milano-luxury-sofa-set',
        x: 80,
        y: 62,
        tooltipPosition: 'left',
      },
      {
        id: 'spot-table',
        productSlug: 'zen-solid-wood-coffee-table',
        x: 51,
        y: 68,
        tooltipPosition: 'top',
      },
      {
        id: 'spot-armchair',
        productSlug: 'imperial-velvet-armchair',
        x: 18,
        y: 72,
        tooltipPosition: 'right',
      },
      {
        id: 'spot-sideboard',
        productSlug: 'castello-entrance-console',
        x: 41,
        y: 53,
        tooltipPosition: 'top',
      },
      {
        id: 'spot-sidetable',
        productSlug: 'linear-side-table-pair',
        x: 84,
        y: 81,
        tooltipPosition: 'left',
      },
    ],
  },
  {
    id: 'modern-dining',
    name: 'غرفة السفرة والضيافة',
    badge: 'طقم متكامل',
    image:
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1600&auto=format&fit=crop',
    description: 'طاولات طعام رخامية مع كراسي مخملية راقية وإضاءة معمارية فاخرة.',
    hotspots: [
      {
        id: 'spot-dining-table',
        productSlug: 'marbella-marble-dining-table',
        x: 50,
        y: 64,
        tooltipPosition: 'top',
      },
      {
        id: 'spot-chairs',
        productSlug: 'siena-dining-chairs-pair',
        x: 37,
        y: 74,
        tooltipPosition: 'right',
      },
      {
        id: 'spot-mirror',
        productSlug: 'venice-sculptural-mirror',
        x: 50,
        y: 35,
        tooltipPosition: 'bottom',
      },
      {
        id: 'spot-chandelier',
        productSlug: 'nordic-brass-pendant-light',
        x: 50,
        y: 24,
        tooltipPosition: 'left',
      },
      {
        id: 'spot-buffet',
        productSlug: 'verona-luxury-buffet',
        x: 48,
        y: 56,
        tooltipPosition: 'top',
      },
    ],
  },
  {
    id: 'master-bedroom',
    name: 'ماستر سويت ملكي',
    badge: 'تصميم حصري',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop',
    description: 'تصميم هادئ ومريح يجمع بين خشب الجوز والأقمشة الرمادية الفاتحة وإضاءات LED خافتة.',
    hotspots: [
      {
        id: 'spot-bed',
        productSlug: 'aurora-king-bed-set',
        x: 48,
        y: 52,
        tooltipPosition: 'top',
      },
      {
        id: 'spot-bench',
        productSlug: 'palermo-velvet-bench',
        x: 73,
        y: 72,
        tooltipPosition: 'left',
      },
      {
        id: 'spot-nightstand',
        productSlug: 'como-nightstand-pair',
        x: 10,
        y: 57,
        tooltipPosition: 'right',
      },
      {
        id: 'spot-lamp',
        productSlug: 'nordic-brass-pendant-light',
        x: 14,
        y: 25,
        tooltipPosition: 'right',
      },
    ],
  },
];

export const ShopTheLookSection: React.FC = () => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(
    ROOM_SCENES[0].hotspots[0].id
  );

  const activeScene = ROOM_SCENES[activeSceneIndex];
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+201000000000';

  const handleSceneChange = (index: number) => {
    setActiveSceneIndex(index);
    setActiveHotspotId(ROOM_SCENES[index].hotspots[0]?.id || null);
  };

  // Find active product and category details
  const activeSpot = activeScene.hotspots.find((h) => h.id === activeHotspotId);
  const activeProduct = activeSpot
    ? PRODUCTS.find((p) => p.slug === activeSpot.productSlug)
    : null;
  const activeCategory = activeProduct
    ? CATEGORIES.find(
        (c) =>
          c.id === activeProduct.category_id ||
          c.slug === activeProduct.category_id
      )
    : null;

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Section Header - Clean, Balanced & Centered */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDF5F6] text-[#0B3D42] text-xs font-semibold mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E17F3F]" />
            <span>غرف ملهمة وتفاعلية</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#0B3D42] tracking-tight">
            اكتشف مساحاتنا ومنتجاتنا
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            انقر على أي نقطة تفاعلية لاستكشاف القطعة وتفاصيل تصميمها وأسعارها في سياقها الحقيقي داخل الغرفة.
          </p>

          {/* Room Scene Switcher Tabs - Centered & Spacious */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {ROOM_SCENES.map((scene, idx) => {
              const isCurrent = idx === activeSceneIndex;
              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => handleSceneChange(idx)}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    isCurrent
                      ? 'bg-[#0B3D42] text-white shadow-md shadow-[#0B3D42]/15 scale-102'
                      : 'bg-[#FAF9F5] text-stone-700 hover:bg-stone-100/90 hover:text-[#0B3D42] border border-stone-200/80 shadow-2xs'
                  }`}
                >
                  <span>{scene.name}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                      isCurrent
                        ? 'bg-white/20 text-white'
                        : 'bg-stone-200/80 text-stone-600'
                    }`}
                  >
                    {scene.hotspots.length} قطع
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Panoramic Scene Viewport */}
        <div className="relative rounded-3xl overflow-hidden border border-stone-200/90 shadow-xl bg-stone-900 aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] w-full select-none">
          {/* Main Background Room Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScene.id}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative w-full h-full"
            >
              <Image
                src={activeScene.image}
                alt={activeScene.name}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
              />

              {/* Gentle Vignette Overlay to ensure hotspots stand out */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10 pointer-events-none" />
            </motion.div>
          </AnimatePresence>

          {/* Interactive Hotspot Dots */}
          {activeScene.hotspots.map((spot) => {
            const isSelected = activeHotspotId === spot.id;
            const product = PRODUCTS.find((p) => p.slug === spot.productSlug);
            const category = product
              ? CATEGORIES.find(
                  (c) =>
                    c.id === product.category_id ||
                    c.slug === product.category_id
                )
              : null;

            if (!product) return null;

            const displayPrice = product.discount_price || product.price || 0;
            const originalPrice = product.discount_price ? product.price : null;
            const primaryImage =
              product.images.find((img) => img.is_primary)?.url ||
              product.images[0]?.url ||
              '';

            return (
              <div
                key={spot.id}
                style={{
                  top: `${spot.y}%`,
                  left: `${spot.x}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="absolute z-20 cursor-pointer"
                onClick={() =>
                  setActiveHotspotId(isSelected ? null : spot.id)
                }
              >
                {/* Hotspot Outer Ring & Core */}
                <div className="relative flex items-center justify-center">
                  {/* Glowing Pulse Ring for active / idle */}
                  {isSelected ? (
                    <span className="absolute w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-500/30 animate-ping pointer-events-none" />
                  ) : (
                    <span className="absolute w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/40 animate-pulse pointer-events-none" />
                  )}

                  {/* Main Hotspot Button */}
                  <button
                    type="button"
                    aria-label={`عرض قطعة: ${product.name_ar}`}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-125 focus:outline-none ${
                      isSelected
                        ? 'bg-red-600 ring-4 ring-red-500/40 scale-110 shadow-red-600/30'
                        : 'bg-white/95 backdrop-blur-xs hover:bg-white ring-2 ring-black/10 text-[#0B3D42]'
                    }`}
                  >
                    <span
                      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors ${
                        isSelected ? 'bg-white' : 'bg-black'
                      }`}
                    />
                  </button>
                </div>

                {/* Floating Desktop Tooltip Card (Positioned directly beside/above the dot) */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.92, y: 6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.92, y: 6 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      style={{
                        ...(spot.x > 50
                          ? { right: '115%', top: '-28px' }
                          : { left: '115%', top: '-28px' }),
                      }}
                      className="hidden sm:block absolute z-40 w-80 rounded-2xl bg-white/98 backdrop-blur-md p-3.5 shadow-2xl border border-stone-200/90 cursor-default text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-3">
                        {/* Left Arrow button to product */}
                        <Link
                          href={`/products/${product.slug}`}
                          className="w-8 h-8 rounded-full bg-[#FAF9F5] hover:bg-[#0B3D42] hover:text-white text-stone-700 flex items-center justify-center transition shrink-0 border border-stone-200/80"
                          title="عرض تفاصيل القطعة"
                        >
                          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                        </Link>

                        {/* Middle: Category, Title & Price */}
                        <div className="flex-1 min-w-0">
                          {category && (
                            <Link
                              href={`/categories/${category.slug}`}
                              className="text-[10px] font-bold text-[#E17F3F] hover:underline block truncate mb-0.5"
                            >
                              {category.name_ar}
                            </Link>
                          )}

                          <Link
                            href={`/products/${product.slug}`}
                            className="block text-xs font-extrabold text-stone-900 hover:text-[#0B3D42] transition truncate"
                          >
                            {product.name_ar}
                          </Link>

                          {/* Price formatting */}
                          <div className="flex items-baseline justify-end gap-1.5 mt-1">
                            {originalPrice && (
                              <span className="text-[10px] text-stone-400 line-through">
                                {new Intl.NumberFormat('ar-EG').format(
                                  originalPrice
                                )}{' '}
                                ج.م
                              </span>
                            )}
                            <span className="text-xs sm:text-sm font-black text-red-600">
                              {new Intl.NumberFormat('ar-EG').format(
                                displayPrice
                              )}{' '}
                              <span className="text-[10px] font-bold text-stone-500">
                                ج.م
                              </span>
                            </span>
                          </div>
                        </div>

                        {/* Right: Product Thumbnail */}
                        <Link
                          href={`/products/${product.slug}`}
                          className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-stone-100 border border-stone-200/80 group"
                        >
                          <Image
                            src={primaryImage}
                            alt={product.name_ar}
                            fill
                            sizes="56px"
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          {product.discount_price && (
                            <span className="absolute top-0.5 right-0.5 bg-red-600 text-white text-[8px] font-extrabold px-1 rounded">
                              عرض
                            </span>
                          )}
                        </Link>
                      </div>

                      {/* Micro Action Bar */}
                      <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                        <Link
                          href={`/products/${product.slug}`}
                          className="inline-flex items-center gap-1 font-bold text-[#0B3D42] hover:text-[#E17F3F] transition"
                        >
                          <span>عرض القطعة</span>
                          <ArrowLeft className="w-3 h-3 stroke-[2]" />
                        </Link>

                        <a
                          href={`https://wa.me/${whatsappNumber.replace(
                            /[^0-9]/g,
                            ''
                          )}?text=${encodeURIComponent(
                            `مرحباً زخرفة، أود الاستفسار عن: ${product.name_ar} بسعر ${new Intl.NumberFormat(
                              'ar-EG'
                            ).format(displayPrice)} ج.م من قسم اكتشف مساحاتنا`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-800 transition"
                        >
                          <WhatsAppIcon className="w-3 h-3 fill-emerald-600" />
                          <span>طلب واتساب</span>
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* Quick Scene Legend in Corner */}
          <div className="absolute bottom-4 right-4 z-10 hidden sm:flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-xs border border-white/15 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>انقر على أي نقطة لاكتشاف القطعة وسعرها</span>
          </div>
        </div>

        {/* Mobile Active Product Dock / Card (Cleanly docked below image on smaller screens) */}
        <AnimatePresence>
          {activeProduct && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="sm:hidden bg-[#FAF9F5] border border-stone-200/90 rounded-2xl p-4 shadow-md space-y-3 text-right"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                  <span className="text-xs font-bold text-stone-500">
                    القطعة المحددة في المشهد:
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveHotspotId(null)}
                  className="text-stone-400 hover:text-stone-700 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-stone-100 border border-stone-200">
                  <Image
                    src={
                      activeProduct.images.find((img) => img.is_primary)?.url ||
                      activeProduct.images[0]?.url ||
                      ''
                    }
                    alt={activeProduct.name_ar}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  {activeCategory && (
                    <Link
                      href={`/categories/${activeCategory.slug}`}
                      className="text-[10px] font-bold text-[#E17F3F] hover:underline block truncate mb-0.5"
                    >
                      {activeCategory.name_ar}
                    </Link>
                  )}

                  <h4 className="font-bold text-sm text-stone-900 truncate">
                    {activeProduct.name_ar}
                  </h4>

                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-sm font-extrabold text-red-600">
                      {new Intl.NumberFormat('ar-EG').format(
                        activeProduct.discount_price || activeProduct.price || 0
                      )}{' '}
                      ج.م
                    </span>
                    {activeProduct.discount_price && (
                      <span className="text-xs text-stone-400 line-through">
                        {new Intl.NumberFormat('ar-EG').format(
                          activeProduct.price || 0
                        )}{' '}
                        ج.م
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Link
                  href={`/products/${activeProduct.slug}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#0B3D42] text-white text-xs font-bold shadow-xs hover:bg-[#07262A] transition"
                >
                  <span>عرض التفاصيل</span>
                  <ArrowLeft className="w-3.5 h-3.5 stroke-[2]" />
                </Link>

                <a
                  href={`https://wa.me/${whatsappNumber.replace(
                    /[^0-9]/g,
                    ''
                  )}?text=${encodeURIComponent(
                    `مرحباً زخرفة، أود الاستفسار عن: ${activeProduct.name_ar} بسعر ${new Intl.NumberFormat(
                      'ar-EG'
                    ).format(
                      activeProduct.discount_price || activeProduct.price || 0
                    )} ج.م`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-xs hover:bg-emerald-700 transition"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                  <span>طلب واتساب</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
