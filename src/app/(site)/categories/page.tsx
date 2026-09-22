import React from 'react';
import type { Metadata } from 'next';
import { getAllProducts, getAllCategories } from '@/lib/catalog';
import { CategoryHero } from '@/components/catalog/CategoryHero';
import { CategoryPills } from '@/components/catalog/CategoryPills';
import { ProductGrid } from '@/components/catalog/ProductGrid';

export const revalidate = 60; // ISR: Revalidate every 60 seconds

export const metadata: Metadata = {
  title: 'كتالوج المنتجات والأقسام | زخرفة للأثاث والديكور',
  description:
    'تصفح كتالوج متجر زخرفة الكامل: غرف معيشة، غرف سفرة، غرف نوم فاخرة، طاولات وكونسولات، ديكورات ومشاريع أثاث مخصصة.',
};

export default async function CategoriesPage() {
  const [categories, products] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
  ]);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <CategoryHero totalProductsCount={products.length} />
      <CategoryPills categories={categories} />
      <ProductGrid initialProducts={products} />
    </div>
  );
}
