import React from 'react';
import type { Metadata } from 'next';
import { getAllProducts } from '@/data/mock-products';
import { CategoryHero } from '@/components/catalog/CategoryHero';
import { CategoryPills } from '@/components/catalog/CategoryPills';
import { ProductGrid } from '@/components/catalog/ProductGrid';

export const metadata: Metadata = {
  title: 'كتالوج المنتجات والأقسام | زخرفة للأثاث والديكور',
  description:
    'تصفح كتالوج متجر زخرفة الكامل: غرف معيشة، غرف سفرة، غرف نوم فاخرة، طاولات وكونسولات، ديكورات ومشاريع أثاث مخصصة.',
};

export default function CategoriesPage() {
  const products = getAllProducts();

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <CategoryHero totalProductsCount={products.length} />
      <CategoryPills />
      <ProductGrid initialProducts={products} />
    </div>
  );
}
