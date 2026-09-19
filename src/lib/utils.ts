import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createWhatsAppProductMessage(product: {
  name_ar: string;
  id: string;
  slug: string;
  price?: number;
  discount_price?: number;
  is_price_on_request?: boolean;
}): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
  const priceDisplay = product.is_price_on_request
    ? 'السعر عند الطلب'
    : product.discount_price
      ? `${product.discount_price} ج.م (خصم خاص)`
      : product.price
        ? `${product.price} ج.م`
        : 'السعر عند الطلب';

  const productUrlLine = siteUrl ? `\n- الرابط: ${siteUrl}/products/${product.slug}` : '';

  return encodeURIComponent(
    `مرحباً متجر زخرفة، أود الاستفسار عن توفر وطلب المنتج التالي:\n- اسم المنتج: ${product.name_ar}\n- كود المنتج: ${product.id}\n- السعر: ${priceDisplay}${productUrlLine}`
  );
}

