'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Sparkles, HeartHandshake } from 'lucide-react';
import {
  RoyalWarrantySealIcon,
  WhiteGloveCareIcon,
} from './ArtisanalIcons';

export const AboutCareSlide: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Lag-free fade in on approach and complete disappearance on scroll down
  const stageOpacity = useTransform(scrollYProgress, [0, 0.18, 0.7, 0.92], [0, 1, 1, 0]);
  const stageScale = useTransform(scrollYProgress, [0.7, 0.92], [1, 0.94]);
  const stageY = useTransform(scrollYProgress, [0.7, 0.92], [0, -40]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[125vh] z-50"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center bg-[#F6F2ED] text-[#0B3D42] py-10 sm:py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Chapter Marker */}
        <div className="absolute top-4 right-6 sm:top-6 sm:right-10 flex items-center gap-2 text-stone-500 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-[#E17F3F]" />
          <span>05 / 06 • راحة البال وخدمة VIP</span>
        </div>

        <motion.div
          style={{ opacity: stageOpacity, scale: stageScale, y: stageY }}
          className="relative z-10 mx-auto max-w-5xl w-full will-change-[transform,opacity]"
        >
        {/* Header with generous font spacing */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B3D42]/5 border border-[#0B3D42]/15 text-[#0B3D42] text-xs font-bold shadow-2xs"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#E17F3F]" />
            <span>التزامنا الكامل بعد الشراء</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl xs:text-4xl sm:text-5xl font-black text-[#0B3D42] tracking-tight leading-[1.36] sm:leading-[1.32]"
            style={{ fontFamily: 'var(--font-alexandria), sans-serif' }}
          >
            تجربة فندقية تليق بك وببيتك
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-stone-600 text-xs sm:text-base leading-[1.85] pt-1"
          >
            علاقتنا معك لا تنتهي عند استلام القطعة، بل تبدأ من لحظة دخولها بيتك.
          </motion.p>
        </div>

        {/* 2 VIP Cards with generous typography spacing */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {/* Card 1: Royal Warranty */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="p-8 sm:p-10 rounded-3xl bg-white border border-stone-200 shadow-md hover:shadow-2xl text-right flex flex-col justify-between transition-all duration-300 relative group overflow-hidden"
          >
            {/* Top Accent Strip */}
            <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-[#0B3D42] to-[#E17F3F]" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-13 h-13 rounded-2xl bg-[#0B3D42]/5 text-[#0B3D42] group-hover:text-[#E17F3F] flex items-center justify-center transition-colors">
                  <RoyalWarrantySealIcon className="w-7 h-7" />
                </div>
                <span className="text-xs font-mono font-black text-stone-300">5 YEARS</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[#0B3D42] leading-[1.4] mb-3">
                شهادة ضمان 5 سنوات معتمدة
              </h3>

              <p className="text-xs sm:text-[13.5px] text-stone-600 leading-[1.85] mb-5">
                نضمن لك الهياكل الخشبية المصمتة والوصلات وحشوات الإسفنج الطبي ضد عيوب الصناعة أو الهبوط لمدة 5 أعوام كاملة، مع صيانة فورية عند الحاجة.
              </p>
            </div>

            <div className="pt-3.5 border-t border-stone-100 text-xs font-bold text-[#E17F3F] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>شهادة ضمان ورقية مع كل فاتورة</span>
            </div>
          </motion.div>

          {/* Card 2: White Glove VIP Delivery */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="p-8 sm:p-10 rounded-3xl bg-white border border-stone-200 shadow-md hover:shadow-2xl text-right flex flex-col justify-between transition-all duration-300 relative group overflow-hidden"
          >
            {/* Top Accent Strip */}
            <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-[#E17F3F] to-[#0B3D42]" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-13 h-13 rounded-2xl bg-[#E17F3F]/10 text-[#E17F3F] group-hover:text-[#0B3D42] flex items-center justify-center transition-colors">
                  <WhiteGloveCareIcon className="w-7 h-7" />
                </div>
                <span className="text-xs font-mono font-black text-stone-300">VIP CARE</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[#0B3D42] leading-[1.4] mb-3">
                توصيل وتركيب VIP فندقي
              </h3>

              <p className="text-xs sm:text-[13.5px] text-stone-600 leading-[1.85] mb-5">
                فريق مدرب من الفنيين المحترفين يقومون بنقل قطع الأثاث وتركيبها وتنسيقها داخل منزلك بعناية فائقة ونظافة تامة، مع إزالة كافة مواد التغليف.
              </p>
            </div>

            <div className="pt-3.5 border-t border-stone-100 text-xs font-bold text-[#0B3D42] flex items-center gap-1.5">
              <HeartHandshake className="w-3.5 h-3.5 text-[#E17F3F]" />
              <span>مواعيد تسليم دقيقة بدون تأخير</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
      </div>
    </div>
  );
};
