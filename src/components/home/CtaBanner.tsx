import React from 'react';
import { Phone } from 'lucide-react';
import { WhatsAppIcon } from '@/components/common/BrandIcons';

export const CtaBanner: React.FC = () => {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+201000000000';

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B3D42] via-[#0D444A] to-[#07262A] text-white px-6 py-12 md:p-16 border border-[#12555C] shadow-xl">
          {/* Subtle Ambient Glowing Orbs */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#E17F3F]/15 blur-3xl pointer-events-none animate-pulse-subtle" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#12555C]/40 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xs text-white text-xs font-semibold border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E17F3F] animate-pulse" />
              <span>جاهزون لتنفيذ أرقى الأفكار لمنزلك</span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug">
              هل لديك استفسار أو ترغب في تسعير تصميم محدد؟
            </h2>

            <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              فريقنا متاح لمساعدتك في اختيار القطع المناسبة وتزويدك بالتفاصيل والأسعار مباشرة عبر
              واتساب أو الاتصال الهاتفي.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#E17F3F] hover:bg-[#C96A2D] text-white px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 group"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white transition-transform group-hover:scale-110" />
                <span>محادثة واتساب فورية</span>
              </a>

              <a
                href={`tel:${whatsappNumber.replace(/[^0-9+]/g, '')}`}
                className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/25 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <Phone className="w-4 h-4 text-[#E17F3F] stroke-[1.5]" />
                <span>اتصال مباشر</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
