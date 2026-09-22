'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react';
import { useStore } from '@/components/common/StoreProvider';
import { WhatsAppIcon } from '@/components/common/BrandIcons';

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity } = useStore();
  const total = cart.reduce((sum, item) => sum + (item.discount_price || item.price || 0) * item.quantity, 0);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+201000000000';
  const formatPrice = (price: number) => new Intl.NumberFormat('ar-EG').format(price);
  const orderMessage = encodeURIComponent([
    'مرحباً متجر زخرفة، أود تأكيد طلبي من السلة:',
    ...cart.map((item, index) => `${index + 1}. ${item.name_ar} - الكمية: ${item.quantity} - السعر: ${formatPrice((item.discount_price || item.price || 0) * item.quantity)} ج.م`),
    `الإجمالي التقديري: ${formatPrice(total)} ج.م`,
    'أرغب في معرفة طرق الدفع وتأكيد الشحن.',
  ].join('\n'));

  return (
    <div className="min-h-screen bg-[#F7F8F6] px-4 py-8 pb-24 sm:py-12">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-end justify-between gap-4 border-b border-stone-200 pb-5">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#E17F3F]">مراجعة الطلب</p>
            <h1 className="text-2xl font-extrabold text-[#0B3D42] sm:text-3xl">سلتك المختارة</h1>
            <p className="mt-1 text-sm text-stone-500">راجع القطع والكميات، ثم أرسل طلبك للتأكيد عبر واتساب.</p>
          </div>
          <Link href="/categories" className="hidden items-center gap-1 text-xs font-bold text-[#0B3D42] hover:text-[#E17F3F] sm:inline-flex">متابعة التسوق <ArrowLeft className="h-4 w-4" /></Link>
        </div>
        {cart.length === 0 ? (
          <div className="rounded-3xl border border-stone-200 bg-white p-10 text-center shadow-sm">
            <p className="font-bold text-stone-700">السلة فارغة حاليًا</p>
            <Link href="/categories" className="mt-4 inline-flex rounded-xl bg-[#0B3D42] px-5 py-2.5 text-sm font-bold text-white">تصفح المنتجات</Link>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 rounded-2xl border border-stone-200/80 bg-white p-3 shadow-sm sm:gap-4 sm:p-4">
                  <img src={item.images[0]?.url} alt={item.name_ar} className="h-24 w-24 rounded-xl object-cover sm:h-28 sm:w-28" />
                  <div className="min-w-0 flex-1">
                    <Link href={`/products/${item.slug}`} className="font-bold leading-relaxed text-[#0B3D42] hover:text-[#E17F3F]">{item.name_ar}</Link>
                    <p className="mt-1 text-sm font-semibold text-stone-500">{formatPrice(item.discount_price || item.price || 0)} ج.م للقطعة</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button type="button" onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="rounded-lg border p-1" aria-label="تقليل الكمية"><Minus className="h-3.5 w-3.5" /></button>
                      <span className="min-w-5 text-center text-sm">{item.quantity}</span>
                      <button type="button" onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="rounded-lg border p-1" aria-label="زيادة الكمية"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                  <button type="button" onClick={() => removeFromCart(item.id)} className="self-start rounded-lg p-2 text-stone-400 hover:text-red-600" aria-label="حذف من السلة"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
            </div>
            <div className="rounded-3xl bg-[#0B3D42] p-5 text-white shadow-lg shadow-[#0B3D42]/15">
              <div className="flex items-center justify-between">
                <span className="font-bold">الإجمالي التقديري</span>
                <span className="text-lg font-extrabold">{formatPrice(total)} ج.م</span>
              </div>
              <p className="mt-2 text-xs text-white/65">سيتم تأكيد طريقة الدفع والتوصيل معك عبر واتساب.</p>
              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${orderMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#E17F3F] px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#C96A2D] active:scale-[0.98]"
              >
                <WhatsAppIcon className="h-5 w-5 fill-white" />
                <span>إتمام الطلب والدفع عبر واتساب</span>
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}