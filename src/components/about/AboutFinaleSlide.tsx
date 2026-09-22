'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Sparkles, MapPin, MessageCircle } from 'lucide-react';

interface AboutFinaleSlideProps {
  whatsappNumber: string;
}

export const AboutFinaleSlide: React.FC<AboutFinaleSlideProps> = ({ whatsappNumber }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [30, 0]);

  return (
    <section
      ref={containerRef}
      className="relative z-60 min-h-screen flex flex-col justify-center items-center bg-[#0B3D42] text-white py-16 sm:py-24 px-4 sm:px-6 text-center overflow-hidden"
    >
      {/* Zero-Lag Radiant Copper Glow (No CSS blur penalty) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,127,63,0.2),transparent_65%)] pointer-events-none" />

      {/* Chapter Marker */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-10 flex items-center gap-2 text-stone-300 text-xs font-mono">
        <span className="w-2 h-2 rounded-full bg-[#E17F3F]" />
        <span>06 / 06 • الخطوة التالية</span>
      </div>

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto max-w-3xl space-y-8"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#F3B084] text-xs font-semibold backdrop-blur-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E17F3F]" />
          <span>خلّي بيتك يحكي حكايتك</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.34] sm:leading-[1.3] tracking-tight"
          style={{ fontFamily: 'var(--font-alexandria), sans-serif' }}
        >
          جاهز تلاقي القطعة اللي{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#E17F3F] to-[#F59E0B]">
            تكمّل بيتك؟
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-stone-300 text-xs sm:text-base lg:text-lg leading-[1.9] max-w-xl mx-auto pt-1"
        >
          تصفح أحدث أطقم الصالونات والمعيشة، غرف النوم، وطاولات السفرة المصنوعة بعناية لتناسب أسلوب حياتك وذوقك الخاص.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-5"
        >
          <Link
            href="/categories"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#E17F3F] hover:bg-[#C96A2D] text-white text-xs sm:text-sm font-black shadow-xl hover:shadow-2xl transition-all duration-200 group active:scale-98"
          >
            <span>استكشف الكتالوج الشامل</span>
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </Link>

          <a
            href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
              'مرحباً زخرفة، أود الاستفسار عن تفصيل قطعة أثاث خاصة أو زيارة المعرض.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition-all duration-200 active:scale-98 backdrop-blur-xs"
          >
            <MessageCircle className="w-4 h-4 text-[#E17F3F]" />
            <span>تواصل مباشرة عبر واتساب</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
