'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Check,
  Share2,
  Plus,
  Minus,
  Sparkles,
  MessageCircle,
  Copy,
  CheckCheck,
  Heart,
  ShoppingBag,
} from 'lucide-react';
import {
  WhatsAppIcon,
  LuxuryShieldIcon,
  WhiteGloveTruckIcon,
  CalipersRulerIcon,
  FabricWeaveIcon,
  SolidWoodIcon,
  CertifiedShieldIcon,
  InspectBeforePayIcon,
  BespokeCustomIcon,
} from '@/components/common/BrandIcons';
import { Product } from '@/types/product';
import { Category } from '@/types/category';
import { useStore } from '@/components/common/StoreProvider';

interface ProductInfoProps {
  product: Product;
  category?: Category;
}

// Color map for visual swatches
const COLOR_HEX_MAP: Record<string, string> = {
  'بيج': '#E8DFD8',
  'أوف وايت': '#F4F1EA',
  'رمادي': '#8E9196',
  'رمادي فاتح': '#D1D5DB',
  'رمادي داكن': '#4B5563',
  'كحلي': '#1E3A5F',
  'أخضر زيتي': '#3A533E',
  'زيتي': '#3A533E',
  'بني': '#6E4D36',
  'بني دافئ': '#7C5335',
  'أسود': '#1F2937',
  'ذهبي': '#D4AF37',
  'نحاسي': '#B87333',
  'أبيض رخامي': '#F9FAFB',
};

export const ProductInfo: React.FC<ProductInfoProps> = ({ product, category }) => {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+201000000000';
  const { addToCart, toggleWishlist, isWishlisted } = useStore();

  // Available colors
  const availableColors =
    product.colors && product.colors.length > 0
      ? product.colors
      : product.color
      ? [product.color]
      : ['بيج', 'رمادي', 'أوف وايت'];

  const [selectedColor, setSelectedColor] = useState<string>(availableColors[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [currentUrl, setCurrentUrl] = useState<string>('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const unitPrice = product.discount_price || product.price || 0;
  const totalPrice = unitPrice * quantity;

  const formattedUnitPrice = product.price
    ? new Intl.NumberFormat('ar-EG').format(product.price)
    : null;

  const formattedDiscountPrice = product.discount_price
    ? new Intl.NumberFormat('ar-EG').format(product.discount_price)
    : null;

  const formattedTotalPrice = unitPrice > 0
    ? new Intl.NumberFormat('ar-EG').format(totalPrice)
    : null;

  const savings =
    product.price && product.discount_price ? (product.price - product.discount_price) * quantity : 0;

  // Custom WhatsApp order message with color and quantity
  const createCustomWhatsAppMessage = () => {
    const siteUrl = currentUrl || '';
    const colorText = selectedColor ? `\n- اللون المختار: ${selectedColor}` : '';
    const quantityText = `\n- الكمية المطلوبة: ${quantity}`;
    const priceText = product.is_price_on_request
      ? '\n- السعر: استفسار عن السعر والمقايسة'
      : `\n- الإجمالي المقدر: ${formattedTotalPrice} ج.م`;
    const urlText = siteUrl ? `\n- رابط القطعة: ${siteUrl}` : '';

    const message = `مرحباً متجر زخرفة، أود طلب واستفسار عن القطعة التالية:\n- اسم المنتج: ${product.name_ar}\n- كود القطعة: ${product.id}${colorText}${quantityText}${priceText}${urlText}`;
    return encodeURIComponent(message);
  };

  // Copy link action
  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Link, SKU & Share Button */}
      <div className="flex flex-col gap-3 text-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {category ? (
            <Link
              href={`/categories/${category.slug}`}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 hover:bg-stone-200 text-[#0B3D42] font-bold transition"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E17F3F]" />
              <span>{category.name_ar}</span>
            </Link>
          ) : (
            <span className="text-stone-400">كتالوج زخرفة</span>
          )}

        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Share Button */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 text-stone-500 hover:text-[#0B3D42] bg-stone-50 hover:bg-stone-100 px-3 py-1 rounded-full border border-stone-200 transition text-xs font-semibold"
            title="مشاركة رابط القطعة"
          >
            {isCopied ? (
              <>
                <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">تم نسخ الرابط!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>مشاركة</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition hover:scale-[1.02] ${isWishlisted(product.id) ? 'border-red-200 bg-red-50 text-red-500' : 'border-stone-200 bg-stone-50 text-stone-500 hover:border-[#E17F3F]/40 hover:bg-[#E17F3F]/10 hover:text-[#E17F3F]'}`}
            title={isWishlisted(product.id) ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
          >
            <Heart className="h-3.5 w-3.5" fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
            <span>{isWishlisted(product.id) ? 'في المفضلة' : 'إضافة للمفضلة'}</span>
          </button>
        </div>
      </div>

      {/* Main Title & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B3D42] tracking-tight leading-snug">
          {product.name_ar}
        </h1>
        {product.name_en && (
          <p className="text-stone-400 text-xs sm:text-sm font-sans tracking-wide mt-1">
            {product.name_en}
          </p>
        )}
      </div>

      {/* Pricing Box */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-stone-50 via-stone-50/70 to-white border border-stone-200/80 shadow-2xs space-y-2">
        {product.is_price_on_request ? (
          <div>
            <span className="text-xl sm:text-2xl font-black text-[#0B3D42]">
              السعر عند الطلب
            </span>
            <p className="text-xs text-stone-500 mt-1">
              تواصل مع مهندسينا للحصول على مقايسة وتكلفة مفصلة حسب مقاساتك واختيارات الأقمشة.
            </p>
          </div>
        ) : formattedDiscountPrice ? (
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black text-[#0B3D42] tracking-tight">
                {formattedTotalPrice}
              </span>
              <span className="text-sm font-bold text-stone-500">ج.م (شامل الضريبة)</span>
              <span className="text-base text-stone-400 line-through">
                {new Intl.NumberFormat('ar-EG').format((product.price || 0) * quantity)} ج.م
              </span>
            </div>

            {savings > 0 && (
              <div className="flex items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                  <Sparkles className="w-3 h-3 text-emerald-700" />
                  <span>وفر {new Intl.NumberFormat('ar-EG').format(savings)} ج.م لفترة محدودة</span>
                </span>
                <span className="text-[11px] text-stone-400">• فحص ومعاينة عند الاستلام</span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-[#0B3D42] tracking-tight">
              {formattedTotalPrice}
            </span>
            <span className="text-sm font-bold text-stone-500">ج.م (شامل الضريبة)</span>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold text-[#0B3D42] uppercase tracking-wider">
          نبذة عن التصميم
        </h2>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          {product.description_ar}
        </p>
      </div>

      {/* Interactive Color Selector */}
      {availableColors.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#0B3D42]">خيارات الألوان المتاحة:</span>
            <span className="text-stone-600">
              اللون المحدد:{' '}
              <strong className="text-[#0B3D42] font-extrabold">{selectedColor}</strong>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {availableColors.map((colorName) => {
              const isSelected = selectedColor === colorName;
              const hexColor = COLOR_HEX_MAP[colorName] || '#D1D5DB';

              return (
                <button
                  key={colorName}
                  type="button"
                  onClick={() => setSelectedColor(colorName)}
                  className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-[#0B3D42] bg-[#0B3D42]/5 ring-2 ring-[#0B3D42]/20 font-bold text-[#0B3D42]'
                      : 'border-stone-200 bg-white hover:border-stone-400 text-stone-700'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-black/15 shadow-2xs shrink-0"
                    style={{ backgroundColor: hexColor }}
                  />
                  <span className="text-xs">{colorName}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#0B3D42] stroke-[2.5]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity Selector & Quick Note */}
      <div className="pt-2 flex items-center justify-between gap-4 p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-stone-700">العدد المطلوب:</span>
        </div>

        <div className="flex items-center gap-2 bg-white rounded-xl border border-stone-300 px-2 py-1 shadow-2xs">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            className="w-7 h-7 rounded-lg text-stone-600 hover:bg-stone-100 disabled:opacity-30 flex items-center justify-center transition cursor-pointer"
            aria-label="تقليل العدد"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-8 text-center font-bold text-sm text-[#0B3D42]">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="w-7 h-7 rounded-lg text-stone-600 hover:bg-stone-100 flex items-center justify-center transition cursor-pointer"
            aria-label="زيادة العدد"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Key Specifications Grid (Design System Cards) */}
      <div className="space-y-3 pt-2">
        <h2 className="text-xs font-bold text-[#0B3D42] uppercase tracking-wider">
          أبرز المواصفات الفنية
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Material */}
          {product.material && (
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs">
              <div className="w-8 h-8 rounded-xl bg-[#0B3D42]/10 text-[#0B3D42] flex items-center justify-center shrink-0">
                <SolidWoodIcon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">الخامات المستخدمة</span>
                <span className="font-bold text-stone-800 leading-snug">{product.material}</span>
              </div>
            </div>
          )}

          {/* Dimensions */}
          {product.dimensions && (
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs">
              <div className="w-8 h-8 rounded-xl bg-[#0B3D42]/10 text-[#0B3D42] flex items-center justify-center shrink-0">
                <CalipersRulerIcon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">الأبعاد الدقيقة</span>
                <span className="font-bold text-stone-800" dir="rtl">
                  {typeof product.dimensions === 'object' && product.dimensions?.width
                    ? `${product.dimensions.width} عرض × ${product.dimensions.depth} عمق × ${product.dimensions.height} ارتفاع سم`
                    : (product.dimensions as unknown as string)}
                </span>
              </div>
            </div>
          )}

          {/* Warranty */}
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <CertifiedShieldIcon className="w-4 h-4" />
            </div>
            <div>
              <span className="text-stone-400 block text-[10px]">الضمان المعتمد</span>
              <span className="font-bold text-stone-800">
                {product.warranty_years
                  ? `ضمان ${product.warranty_years} سنوات على الهيكل والتصنيع`
                  : 'ضمان 5 سنوات على الهيكل والتصنيع'}
              </span>
            </div>
          </div>

          {/* Shipping */}
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-[#E17F3F]/10 text-[#E17F3F] flex items-center justify-center shrink-0">
              <WhiteGloveTruckIcon className="w-4 h-4" />
            </div>
            <div>
              <span className="text-stone-400 block text-[10px]">الشحن والتركيب</span>
              <span className="font-bold text-stone-800">شحن آمن لكافة محافظات مصر</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Conversion Buttons */}
      <div className="pt-4 space-y-3">
        <div className="grid grid-cols-2 gap-2.5">
          <a
            href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${createCustomWhatsAppMessage()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#0B3D42] px-3 py-3 text-center text-xs font-extrabold text-white shadow-md transition-all hover:bg-[#07262A] hover:shadow-xl active:scale-98 sm:text-sm"
          >
            <WhatsAppIcon className="h-5 w-5 shrink-0 fill-white" />
            <span>طلب واستفسار فوري عبر واتساب</span>
          </a>

          <button
            type="button"
            onClick={() => addToCart(product, quantity)}
            className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#E17F3F] px-3 py-3 text-xs font-extrabold text-white shadow-md transition-all hover:bg-[#C96A2D] hover:shadow-xl active:scale-98 sm:text-sm"
          >
            <ShoppingBag className="h-5 w-5 shrink-0" />
            <span>إضافة للسلة</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          <a
            href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
              `مرحباً زخرفة، أود طلب مقاسات أو أقمشة خاصة لمنتج: ${product.name_ar} (كود: ${product.id})`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-[#0B3D42] bg-[#0B3D42]/5 hover:bg-[#0B3D42]/10 border border-[#0B3D42]/20 transition"
          >
            <BespokeCustomIcon className="w-4 h-4 text-[#0B3D42]" />
            <span>طلب تفصيل بمقاسات خاصة</span>
          </a>
        </div>
      </div>

      {/* Trust & Guarantee Strip */}
      <div className="pt-6 border-t border-stone-200 grid grid-cols-2 gap-3 text-xs text-stone-600">
        <div className="flex items-center gap-2">
          <InspectBeforePayIcon className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>معاينة وفحص قبل الاستلام</span>
        </div>
        <div className="flex items-center gap-2">
          <SolidWoodIcon className="w-4 h-4 text-[#0B3D42] shrink-0" />
          <span>أخشاب زان وأقمشة مستوردة</span>
        </div>
        <div className="flex items-center gap-2">
          <WhiteGloveTruckIcon className="w-4 h-4 text-[#0B3D42] shrink-0" />
          <span>توصيل وتركيب لكافة محافظات مصر</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4 text-[#E17F3F] stroke-[2.5] shrink-0" />
          <span>إمكانية تعديل المقاسات والألوان</span>
        </div>
      </div>

      {/* Floating WhatsApp button: icon-only on mobile, CTA on desktop */}
      <div className="fixed left-3 bottom-[86px] z-40 md:bottom-6 md:left-6">
        <a
          href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${createCustomWhatsAppMessage()}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="تواصل عبر واتساب"
          className="inline-flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_18px_rgba(37,211,102,0.25)] transition-all hover:scale-105 active:scale-95 md:gap-2.5 md:py-3 md:px-4 md:shadow-lg md:hover:shadow-xl md:border md:border-[#12555C] md:bg-[#0B3D42] md:hover:bg-[#07262A]"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full md:h-5 md:w-5 md:rounded-none md:bg-transparent">
            <WhatsAppIcon className="h-5 w-5 fill-white md:h-5 md:w-5" />
          </span>
          <span className="hidden md:inline-block text-xs font-medium tracking-wide text-slate-100">
            تواصل عبر واتساب
          </span>
        </a>
      </div>
    </div>
  );
};
