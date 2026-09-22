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

      {/* 6. CTA Banner */}
      <CtaBanner />
    </>
  );
}
