import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getAllCategories,
  getCategoryBySlug,
  getProductsByCategory,
} from '@/lib/catalog';
import { CategoryHero } from '@/components/catalog/CategoryHero';
import { CategoryPills } from '@/components/catalog/CategoryPills';
import { ProductGrid } from '@/components/catalog/ProductGrid';

export const revalidate = 60; // ISR: Revalidate every 60 seconds
export const dynamicParams = true; // Allow new categories to be generated on-demand

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: 'القسم غير موجود | زخرفة',
    };
  }

  return {
    title: `${category.name_ar} | كتالوج زخرفة للأثاث الفاخر`,
    description: category.description_ar || `تصفح تشكيلة ${category.name_ar} الفاخرة من مصانع وورش زخرفة للأثاث والديكور.`,
    openGraph: {
      title: `${category.name_ar} | زخرفة`,
      description: category.description_ar || `تصفح تشكيلة ${category.name_ar} الفاخرة`,
      images: category.image_url ? [{ url: category.image_url }] : [],
    },
  };
}

export default async function CategoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const [category, allCategories, products] = await Promise.all([
    getCategoryBySlug(slug),
    getAllCategories(),
    getProductsByCategory(slug),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <CategoryHero category={category} totalProductsCount={products.length} />
      <CategoryPills currentCategorySlug={slug} categories={allCategories} />
      <ProductGrid initialProducts={products} />
    </div>
  );
}
