import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getAllCategories,
  getCategoryBySlug,
  getProductsByCategory,
} from '@/data/mock-products';
import { CategoryHero } from '@/components/catalog/CategoryHero';
import { CategoryPills } from '@/components/catalog/CategoryPills';
import { ProductGrid } from '@/components/catalog/ProductGrid';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: 'القسم غير موجود | زخرفة',
    };
  }

  return {
    title: `${category.name_ar} | كتالوج زخرفة للأثاث الفاخر`,
    description: category.description_ar,
    openGraph: {
      title: `${category.name_ar} | زخرفة`,
      description: category.description_ar,
      images: [{ url: category.image_url }],
    },
  };
}

export default async function CategoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(slug);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <CategoryHero category={category} totalProductsCount={products.length} />
      <CategoryPills currentCategorySlug={slug} />
      <ProductGrid initialProducts={products} />
    </div>
  );
}
