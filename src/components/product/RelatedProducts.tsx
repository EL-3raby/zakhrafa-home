import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Product } from '@/types/product';
import { Category } from '@/types/category';
import { ProductCard } from '@/components/catalog/ProductCard';

interface RelatedProductsProps {
  products: Product[];
  category?: Category;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  products,
  category,
}) => {
  if (products.length === 0) return null;

  return (
    <section className="pt-16 sm:pt-20 border-t border-stone-200 mt-16 sm:mt-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDF5F6] text-[#0B3D42] text-xs font-bold mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E17F3F]" />
            <span>تشكيلات متناسقة ومقترحة</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0B3D42] tracking-tight">
            تصاميم أخرى قد تنال إعجابك
          </h2>
        </div>

        {category && (
          <Link
            href={`/categories/${category.slug}`}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#E17F3F] hover:text-[#C96A2D] transition group"
          >
            <span>استعراض كافة موديلات {category.name_ar}</span>
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2] transition-transform group-hover:-translate-x-1" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
