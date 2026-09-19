import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { WhatsAppIcon } from '@/components/common/BrandIcons';
import { Product } from '@/types/product';
import { CATEGORIES } from '@/data/mock-products';
import { createWhatsAppProductMessage } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+201000000000';
  const orderMessage = createWhatsAppProductMessage(product);

  const primaryImage = product.images.find((img) => img.is_primary) || product.images[0];

  const formattedPrice = product.price
    ? new Intl.NumberFormat('ar-EG').format(product.price)
    : null;

  const formattedDiscountPrice = product.discount_price
    ? new Intl.NumberFormat('ar-EG').format(product.discount_price)
    : null;

  const category = CATEGORIES.find(
    (c) => c.id === product.category_id || c.slug === product.category_id
  );

  return (
    <div className="group flex flex-col justify-between bg-white rounded-xl sm:rounded-2xl border border-gray-100/90 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 hover:border-[#0B3D42]/20 transition-all duration-300">
      {/* Clickable Product Image Tile */}
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-square sm:aspect-[4/3] w-full overflow-hidden bg-slate-100 block cursor-pointer"
      >
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={product.name_ar}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
            لا توجد صورة
          </div>
        )}

        {/* Top badges */}
        <div className="absolute top-2 right-2 left-2 sm:top-3 sm:right-3 sm:left-3 flex items-center justify-between pointer-events-none gap-1">
          {product.discount_price ? (
            <span className="inline-flex items-center gap-1 bg-red-600 text-white text-[9px] sm:text-[11px] font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md shadow-xs">
              <span>عرض</span>
              {product.price && (
                <span>
                  -{Math.round(((product.price - product.discount_price) / product.price) * 100)}%
                </span>
              )}
            </span>
          ) : product.stock_status === 'in_stock' ? (
            <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-xs text-[#0B3D42] text-[9px] sm:text-[11px] font-semibold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md shadow-xs">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500" />
              <span className="hidden xs:inline">متوفر بالمعرض</span>
              <span className="xs:hidden">متوفر</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-xs text-[#E17F3F] text-[9px] sm:text-[11px] font-semibold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md shadow-xs">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#E17F3F]" />
              <span>تفصيل</span>
            </span>
          )}

          {product.is_featured && !product.discount_price && (
            <span className="inline-flex items-center gap-1 bg-[#E17F3F] text-white text-[9px] sm:text-[11px] font-semibold px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-md shadow-xs">
              <span>مميز</span>
            </span>
          )}
        </div>
      </Link>

      {/* Card Details */}
      <div className="p-2.5 sm:p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-1 sm:space-y-1.5">
          {/* Category link */}
          {category && (
            <Link
              href={`/categories/${category.slug}`}
              className="text-[10px] sm:text-[11px] font-semibold text-[#E17F3F] hover:underline block truncate"
            >
              {category.name_ar}
            </Link>
          )}

          {/* Main Clickable Title */}
          <Link href={`/products/${product.slug}`} className="block group/title">
            <h3 className="text-xs sm:text-base font-bold text-[#0B3D42] group-hover/title:text-[#E17F3F] transition-colors line-clamp-1 leading-snug">
              {product.name_ar}
            </h3>
          </Link>

          {/* Description snippet (Desktop only) */}
          <p className="hidden sm:block text-xs text-gray-500 line-clamp-2 leading-relaxed">
            {product.description_ar}
          </p>

          {/* Specifications Chips (Desktop only) */}
          <div className="hidden sm:flex pt-2 flex-wrap items-center gap-1.5 text-[11px] text-gray-600">
            {product.material && (
              <span className="bg-slate-50 border border-gray-100 px-2.5 py-1 rounded-md">
                {product.material}
              </span>
            )}
            {product.color && (
              <span className="bg-slate-50 border border-gray-100 px-2.5 py-1 rounded-md">
                اللون: {product.color}
              </span>
            )}
            {product.dimensions && (
              <span className="bg-slate-50 border border-gray-100 px-2.5 py-1 rounded-md" dir="ltr">
                {product.dimensions.width}×{product.dimensions.depth}×{product.dimensions.height} cm
              </span>
            )}
          </div>
        </div>

        {/* Pricing, View Details & WhatsApp CTA */}
        <div className="pt-2.5 sm:pt-5 mt-2 sm:mt-4 border-t border-gray-100 space-y-2 sm:space-y-3">
          <div className="flex items-center justify-between">
            <div>
              {product.is_price_on_request ? (
                <span className="text-[11px] sm:text-xs font-bold text-[#E17F3F]">طلب السعر</span>
              ) : formattedDiscountPrice ? (
                <div className="flex flex-col">
                  <span className="text-xs sm:text-base font-extrabold text-[#0B3D42] leading-tight">
                    {formattedDiscountPrice} <span className="text-[10px] sm:text-xs font-normal text-gray-500">ج.م</span>
                  </span>
                  <span className="text-[9px] sm:text-[11px] text-gray-400 line-through">
                    {formattedPrice} ج.م
                  </span>
                </div>
              ) : (
                <span className="text-xs sm:text-base font-extrabold text-[#0B3D42] leading-tight">
                  {formattedPrice}{' '}
                  <span className="text-[10px] sm:text-xs font-normal text-gray-500">ج.م</span>
                </span>
              )}
            </div>

            {/* View Details Text link */}
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs font-semibold text-gray-500 hover:text-[#0B3D42] transition-colors group/arrow"
            >
              <span>التفاصيل</span>
              <ArrowLeft className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[2] transition-transform duration-200 group-hover/arrow:-translate-x-1" />
            </Link>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <a
              href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${orderMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1 sm:gap-2 bg-[#0B3D42] hover:bg-[#07262A] text-white py-1.5 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold shadow-2xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <WhatsAppIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white shrink-0" />
              <span className="truncate">طلب عبر واتساب</span>
            </a>

            <Link
              href={`/products/${product.slug}`}
              className="hidden sm:inline-flex items-center justify-center bg-slate-100 hover:bg-[#E17F3F] hover:text-white text-[#0B3D42] py-2.5 px-3 rounded-xl text-xs font-semibold hover:shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span>عرض القطعة</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
