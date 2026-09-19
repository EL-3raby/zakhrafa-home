'use client';

import React from 'react';
import { WhatsAppIcon } from './BrandIcons';

export const WhatsAppButton: React.FC = () => {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '201000000000';
  const defaultMessage = encodeURIComponent(
    'مرحباً متجر زخرفة، أود الاستفسار عن تشكيلة الأثاث والديكورات المتوفرة لديكم.'
  );

  return (
    <a
      href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${defaultMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا عبر واتساب"
      className="hidden md:flex fixed bottom-6 left-6 z-50 group items-center gap-2.5 bg-[#0B3D42] hover:bg-[#07262A] text-white py-3 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-[#12555C]"
    >
      <div className="relative flex items-center justify-center">
        <WhatsAppIcon className="w-5 h-5 fill-[#25D366]" />
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366]"></span>
        </span>
      </div>
      <span className="hidden sm:inline-block font-medium text-xs tracking-wide text-slate-100">
        تواصل عبر واتساب
      </span>
    </a>
  );
};
