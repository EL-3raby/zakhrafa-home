import React from 'react';
import Link from 'next/link';
import { LayoutGrid } from 'lucide-react';
import { PromoHeroSlider } from '@/components/home/PromoHeroSlider';
import { BestOffersStrip } from '@/components/home/BestOffersStrip';
import { ShopByDepartments } from '@/components/home/ShopByDepartments';
import { SearchBar } from '@/components/catalog/SearchBar';
import { CategoryStoryStrip } from '@/components/catalog/CategoryStoryStrip';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { CtaBanner } from '@/components/home/CtaBanner';
import {
  getAllCategories,
  getAllProducts,
  getDiscountedOffers,
  getActiveHeroSlides,
} from '@/lib/catalog';

export const revalidate = 60; // ISR: Revalidate homepage every 60 seconds

export default async function HomePage() {
  const [categories, products, discountedOffers, heroSlides] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
    getDiscountedOffers(8),
    getActiveHeroSlides(),
  ]);

  const categoryStripItems = categories.map((c) => ({
    id: c.id,
    slug: c.slug,
    title: c.name_ar,
    image_url: c.image_url,
  }));

  return (
    <>
      {/* 1. Visual Search & Category Quick Strip (At the very top) */}
      <section className="bg-white border-b border-gray-100 py-6 sm:py-7 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <SearchBar products={products} />
          <div className="flex justify-end">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 rounded-full border border-[#0B3D42]/15 bg-[#0B3D42]/5 px-4 py-2 text-xs sm:text-sm font-bold text-[#0B3D42] transition-colors hover:border-[#0B3D42]/30 hover:bg-[#0B3D42]/10"
            >
              <LayoutGrid className="h-4 w-4" />
              <span>كل الأقسام</span>
            </Link>
          </div>
          <CategoryStoryStrip categories={categoryStripItems} />
        </div>
      </section>

      {/* 2. Promotional Offers Banner Slider */}
      <PromoHeroSlider initialSlides={heroSlides} />

      {/* 3. Best Offers Strip (أقوى العروض مع السحب التفاعلي والتحريك التلقائي) */}
      <BestOffersStrip offers={discountedOffers} />

      {/* 4. Shop By Departments (تسوق الأقسام مع التبويبات وسلايدر المنتجات) */}
      <ShopByDepartments categories={categories} products={products} />

      {/* 5. Comprehensive Categories Grid (تصفح أقسام الأثاث والديكور) */}
      <CategoryGrid categories={categories} />

      {/* 6. About Section */}
      <section id="about" className="bg-gradient-to-br from-[#F7F2EE] via-white to-[#F8F8F6] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-[0_18px_50px_rgba(11,61,66,0.06)] sm:p-8">
              <p className="text-sm font-bold tracking-[0.2em] text-[#E17F3F]">من نحن</p>
              <h2 className="mt-3 text-2xl font-black text-[#0B3D42] sm:text-3xl">نصنع فهماً جديداً للبيت العربي</h2>
              <p className="mt-4 text-base leading-8 text-stone-600">
                متجر زخرفة يجمع بين الأصالة والحداثة، ليمنح كل مساحة طابعها الخاص من خلال قطع أثاث
                ومنتجات ديكور مصممة بعناية لتتناسب مع أسلوبك اليومي وذوقك الشخصي.
              </p>
              <Link
                href="/about"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0B3D42] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#07262A]"
              >
                <span>اعرف أكثر عنا</span>
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-stone-200 bg-white p-5 text-right shadow-sm">
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0B3D42]/10 text-[#0B3D42]">
                  <span className="text-lg font-black">01</span>
                </div>
                <h3 className="text-base font-extrabold text-[#0B3D42]">تصميم</h3>
                <p className="mt-2 text-sm leading-7 text-stone-600">تشكيلات تجمع بين المفهوم العصري والدفء المنزلي.</p>
              </div>

              <div className="rounded-3xl border border-stone-200 bg-white p-5 text-right shadow-sm">
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E17F3F]/10 text-[#E17F3F]">
                  <span className="text-lg font-black">02</span>
                </div>
                <h3 className="text-base font-extrabold text-[#0B3D42]">جودة</h3>
                <p className="mt-2 text-sm leading-7 text-stone-600">خامات مختارة بعناية وتجهيزات مميزة في كل قطعة.</p>
              </div>

              <div className="rounded-3xl border border-stone-200 bg-white p-5 text-right shadow-sm">
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <span className="text-lg font-black">03</span>
                </div>
                <h3 className="text-base font-extrabold text-[#0B3D42]">خدمة</h3>
                <p className="mt-2 text-sm leading-7 text-stone-600">تواصل فوري ومتابعة مريحة من الطلب حتى التسليم.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA Banner */}
      <CtaBanner />
    </>
  );
}
