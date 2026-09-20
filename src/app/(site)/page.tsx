import React from 'react';
import { PromoHeroSlider } from '@/components/home/PromoHeroSlider';
import { BestOffersStrip } from '@/components/home/BestOffersStrip';
import { ShopByDepartments } from '@/components/home/ShopByDepartments';
import { SearchBar } from '@/components/catalog/SearchBar';
import { CategoryStoryStrip } from '@/components/catalog/CategoryStoryStrip';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { CtaBanner } from '@/components/home/CtaBanner';

export default function HomePage() {
  return (
    <>
      {/* 1. Visual Search & Category Quick Strip (At the very top) */}
      <section className="bg-white border-b border-gray-100 py-6 sm:py-7 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <SearchBar />
          <CategoryStoryStrip />
        </div>
      </section>

      {/* 2. Promotional Offers Banner Slider */}
      <PromoHeroSlider />

      {/* 3. Best Offers Strip (أقوى العروض مع السحب التفاعلي والتحريك التلقائي) */}
      <BestOffersStrip />

      {/* 4. Shop By Departments (تسوق الأقسام مع التبويبات وسلايدر المنتجات) */}
      <ShopByDepartments />

      {/* 5. Comprehensive Categories Grid (تصفح أقسام الأثاث والديكور) */}
      <CategoryGrid />

      {/* 6. CTA Banner */}
      <CtaBanner />
    </>
  );
}
