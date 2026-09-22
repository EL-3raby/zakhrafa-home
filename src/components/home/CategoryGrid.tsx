'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import {
  ArchitecturalSofaIcon,
  ArchitecturalDiningIcon,
  ArchitecturalBedIcon,
  ArchitecturalCoffeeTableIcon,
  ArchitecturalDecorIcon,
  ArchitectCompassIcon,
} from '@/components/common/BrandIcons';
import { Category } from '@/types/category';

interface CategoryItem extends Category {
  badgeText?: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CATEGORY_ICONS: Record<string, CategoryItem['icon']> = {
  'living-rooms': ArchitecturalSofaIcon,
  'dining-rooms': ArchitecturalDiningIcon,
  bedrooms: ArchitecturalBedIcon,
  'tables-consoles': ArchitecturalCoffeeTableIcon,
  'decor-accessories': ArchitecturalDecorIcon,
  'custom-projects': ArchitectCompassIcon,
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: 'easeOut',
    },
  },
};

interface CategoryGridProps {
  categories?: Category[];
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ categories: passedCategories }) => {
  const categoriesList = React.useMemo(() => {
    const raw = passedCategories && passedCategories.length > 0 ? passedCategories : [];
    return raw.map((category) => ({
      ...category,
      icon: CATEGORY_ICONS[category.slug] || ArchitecturalSofaIcon,
      badgeText:
        category.slug === 'living-rooms'
          ? 'الأكثر طلباً'
          : category.slug === 'bedrooms'
          ? 'تشكيلة جديدة'
          : category.slug === 'custom-projects'
          ? 'حسب الطلب'
          : undefined,
    }));
  }, [passedCategories]);

  if (categoriesList.length === 0) {
    return null;
  }
  return (
    <section id="categories" className="py-12 sm:py-16 lg:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDF5F6] text-[#0B3D42] text-xs font-semibold mb-2.5 sm:mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E17F3F]" />
            <span>كتالوج زخرفة الشامل</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#0B3D42] tracking-tight">
            تصفح أقسام الأثاث والديكور
          </h2>
          <p className="mt-2 sm:mt-3 text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
            اختر القسم المناسب لاستعراض الموديلات المتوفرة مع خيارات المقاسات والألوان المخصصة.
          </p>
        </div>

        {/* Full-bleed Category Image Tiles with Staggered Reveal */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8"
        >
          {categoriesList.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <motion.div key={cat.id} variants={cardVariants}>
                <Link
                  href={`/categories/${cat.slug}`}
                  className="group relative block overflow-hidden rounded-xl sm:rounded-2xl aspect-[4/5] w-full shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                >
                  {/* Full-bleed Background Image with single hover effect: scale zoom */}
                  <Image
                    src={cat.image_url}
                    alt={cat.name_ar}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />

                  {/* Gradient Overlay for Typography Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D42]/95 via-black/40 to-transparent pointer-events-none" />

                  {/* Top Badge (if any) */}
                  {cat.badgeText && (
                    <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-10 pointer-events-none">
                      <span className="bg-[#E17F3F] text-white text-[9px] sm:text-[11px] font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md shadow-xs">
                        {cat.badgeText}
                      </span>
                    </div>
                  )}

                  {/* Content Overlay directly on image tile */}
                  <div className="absolute bottom-0 inset-x-0 p-3 sm:p-7 text-white flex flex-col justify-end z-10">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                      <IconComponent className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#E17F3F] stroke-[1.75]" />
                      <span className="text-[10px] sm:text-xs font-semibold text-slate-200">
                        {cat.item_count} تصميم
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-2xl font-bold text-white tracking-tight mb-1 sm:mb-2 leading-snug">
                      {cat.name_ar}
                    </h3>

                    <p className="hidden sm:block text-xs text-slate-300 line-clamp-2 leading-relaxed opacity-95 mb-4">
                      {cat.description_ar}
                    </p>

                    <div className="flex items-center gap-1 sm:gap-2 text-[11px] sm:text-sm font-semibold text-[#E17F3F] group-hover:text-white transition-colors">
                      <span className="hidden xs:inline">استكشف القسم</span>
                      <span className="xs:hidden">استكشف</span>
                      <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2] transition-transform duration-300 group-hover:-translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
