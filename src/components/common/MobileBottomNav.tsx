'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Sparkles, Phone } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+201000000000';

  const isHome = pathname === '/';
  const isCatalog = pathname.startsWith('/categories') || pathname.startsWith('/products');

  const defaultMessage = encodeURIComponent(
    'مرحباً متجر زخرفة، أود الاستفسار وطلب تفاصيل عن المعروضات والأسعار.'
  );

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur-xl border-t border-stone-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 select-none pb-[calc(0.375rem+env(safe-area-inset-bottom,0px))]">
      <div className="grid grid-cols-5 items-center justify-between max-w-md mx-auto">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
            isHome ? 'text-[#0B3D42] font-extrabold' : 'text-stone-500 hover:text-stone-800 font-medium'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <Home className={`w-5 h-5 ${isHome ? 'stroke-[2.5] text-[#0B3D42]' : 'stroke-[1.75]'}`} />
            {isHome && (
              <span className="absolute -top-1 w-1 h-1 rounded-full bg-[#E17F3F]" />
            )}
          </div>
          <span className="text-[10px] mt-0.5">الرئيسية</span>
        </Link>

        {/* Catalog */}
        <Link
          href="/categories"
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
            isCatalog ? 'text-[#0B3D42] font-extrabold' : 'text-stone-500 hover:text-stone-800 font-medium'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <LayoutGrid className={`w-5 h-5 ${isCatalog ? 'stroke-[2.5] text-[#0B3D42]' : 'stroke-[1.75]'}`} />
            {isCatalog && (
              <span className="absolute -top-1 w-1 h-1 rounded-full bg-[#E17F3F]" />
            )}
          </div>
          <span className="text-[10px] mt-0.5">الكتالوج</span>
        </Link>

        {/* Center: WhatsApp Instant CTA */}
        <a
          href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${defaultMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center -mt-3.5 group cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full bg-[#0B3D42] text-white flex items-center justify-center shadow-md shadow-[#0B3D42]/30 border-2 border-white group-active:scale-95 transition-transform">
            <WhatsAppIcon className="w-6 h-6 fill-white" />
          </div>
          <span className="text-[10px] font-bold text-[#0B3D42] mt-0.5">واتساب</span>
        </a>

        {/* Offers */}
        <Link
          href="/categories?offers=true"
          className="flex flex-col items-center justify-center py-1 rounded-xl transition-all text-stone-500 hover:text-stone-800 font-medium"
        >
          <div className="relative flex items-center justify-center">
            <Sparkles className="w-5 h-5 stroke-[1.75] text-[#E17F3F]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" />
          </div>
          <span className="text-[10px] mt-0.5">العروض</span>
        </Link>

        {/* Call Us */}
        <a
          href={`tel:${whatsappNumber.replace(/[^0-9+]/g, '')}`}
          className="flex flex-col items-center justify-center py-1 rounded-xl transition-all text-stone-500 hover:text-stone-800 font-medium"
        >
          <Phone className="w-5 h-5 stroke-[1.75]" />
          <span className="text-[10px] mt-0.5">اتصل بنا</span>
        </a>
      </div>
    </div>
  );
};
