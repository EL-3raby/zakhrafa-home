import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, Home } from 'lucide-react';
import {
  getAllProducts,
  getProductBySlug,
  getCategoryBySlug,
  getRelatedProducts,
} from '@/lib/catalog';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ProductTabs } from '@/components/product/ProductTabs';
import { RelatedProducts } from '@/components/product/RelatedProducts';

export const revalidate = 60; // ISR: Revalidate every 60 seconds
export const dynamicParams = true; // Allow newly published products to be generated on-demand

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'المنتج غير موجود | زخرفة',
    };
  }

  const primaryImage =
    product.images.find((img) => img.is_primary) || product.images[0];

  return {
    title: `${product.name_ar} | زخرفة للأثاث والديكور`,
    description: product.description_ar,
    openGraph: {
      title: `${product.name_ar} | زخرفة`,
      description: product.description_ar,
      images: primaryImage ? [{ url: primaryImage.url }] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const category = await getCategoryBySlug(product.category_id);
  const relatedProducts = await getRelatedProducts(product.id, product.category_id, 3);

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav
          aria-label="مسار التصفح"
          className="flex items-center gap-1.5 text-xs text-gray-500 mb-8 overflow-x-auto no-scrollbar pb-1"
        >
          <Link href="/" className="hover:text-[#E17F3F] transition flex items-center gap-1 shrink-0">
            <Home className="w-3.5 h-3.5 stroke-[1.75]" />
            <span>الرئيسية</span>
          </Link>
          <ChevronLeft className="w-3.5 h-3.5 text-gray-400 stroke-[1.5] shrink-0" />
          <Link href="/categories" className="hover:text-[#E17F3F] transition shrink-0">
            أقسام الكتالوج
          </Link>
          {category && (
            <>
              <ChevronLeft className="w-3.5 h-3.5 text-gray-400 stroke-[1.5] shrink-0" />
              <Link
                href={`/categories/${category.slug}`}
                className="hover:text-[#E17F3F] transition shrink-0"
              >
                {category.name_ar}
              </Link>
            </>
          )}
          <ChevronLeft className="w-3.5 h-3.5 text-gray-400 stroke-[1.5] shrink-0" />
          <span className="text-[#0B3D42] font-semibold truncate shrink-0">
            {product.name_ar}
          </span>
        </nav>

        {/* 2-Columns: Gallery & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Gallery (Right on RTL) - Sticky on desktop */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <ProductGallery
              images={product.images}
              productName={product.name_ar}
              stockStatus={product.stock_status}
              isFeatured={product.is_featured}
              discountPrice={product.discount_price}
              originalPrice={product.price}
            />
          </div>

          {/* Info & Purchase CTAs (Left on RTL) */}
          <div className="lg:col-span-5">
            <ProductInfo product={product} category={category || undefined} />
          </div>
        </div>

        {/* Deep-Dive Specifications & Guidance Tabs */}
        <ProductTabs product={product} category={category || undefined} />

        {/* Related Products from the same category */}
        <RelatedProducts products={relatedProducts} category={category || undefined} />
      </div>
    </div>
  );
}
