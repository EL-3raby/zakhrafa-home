'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, TrendingUp, ShieldCheck, TreePine, Award } from 'lucide-react';

const METRICS_DATA = [
  {
    icon: TrendingUp,
    number: '+5',
    label: 'سنوات من الخبرة الفندقية',
    desc: 'انتقاء أدق التفاصيل وتطوير الصنعة من 2021',
    accentColor: '#E17F3F',
  },
  {
    icon: TreePine,
    number: '100%',
    label: 'خشب زان أحمر طبيعي',
    desc: 'مجفف حرارياً بنسب رطوبة مدروسة لمنع التقوس',
    accentColor: '#10B981',
  },
  {
    icon: ShieldCheck,
    number: '5',
    label: 'أعوام ضمان شامل معتمد',
    desc: 'على الهياكل المصمتة والوصلات وحشوات الإسفنج',
    accentColor: '#E17F3F',
  },
  {
    icon: Award,
    number: '+1,200',
    label: 'بيت زيّنته دار زخرفة',
    desc: 'بقطع متفردة تلبي ذوق أصحابها بكل فخر',
    accentColor: '#38BDF8',
  },
];

export const AboutMetricsSlide: React.FC = () => {
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
      className="relative w-full h-[125vh] z-30"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center bg-[#07262A] text-white py-10 sm:py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Zero-Lag Ambient Radial Glows (No CSS blur penalty) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,127,63,0.15),transparent_65%),radial-gradient(circle_at_top_right,rgba(11,61,66,0.3),transparent_55%)] pointer-events-none" />

        {/* Chapter Marker */}
        <div className="absolute top-4 right-6 sm:top-6 sm:right-10 flex items-center gap-2 text-stone-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-[#E17F3F]" />
          <span>03 / 06 • الأرقام والمصداقية</span>
        </div>

        <motion.div
          style={{ opacity: stageOpacity, scale: stageScale, y: stageY }}
          className="relative z-10 mx-auto max-w-7xl w-full will-change-[transform,opacity]"
        >
        {/* Header with generous font spacing */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#F3B084] text-xs font-bold shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E17F3F]" />
            <span>ثقة نعتز بها في كل تفصيلة</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl xs:text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.35] sm:leading-[1.32]"
            style={{ fontFamily: 'var(--font-alexandria), sans-serif' }}
          >
            أرقام تعكس{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#E17F3F] to-[#F59E0B]">
              هيبة الصنعة والالتزام
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-stone-300/90 text-xs sm:text-base leading-[1.8] max-w-lg mx-auto pt-1"
          >
            وراء كل رقم سنوات من التطوير، وعلاقات ثقة بنيناها مع عملائنا قطعة بقطعة.
          </motion.p>
        </div>

        {/* 4 Metric Cards Grid with generous breathing room */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8">
          {METRICS_DATA.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="relative p-7 sm:p-8 rounded-3xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 hover:border-[#E17F3F]/40 text-right space-y-4 shadow-xl transition-colors group"
              >
                {/* Top Corner Icon */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E17F3F] group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-stone-400 font-bold">
                    0{idx + 1}
                  </span>
                </div>

                {/* Big Metric Display with comfortable spacing */}
                <div className="pt-2 space-y-2">
                  <span
                    className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight block group-hover:text-[#E17F3F] transition-colors leading-none"
                    style={{ fontFamily: 'var(--font-alexandria), sans-serif' }}
                  >
                    {item.number}
                  </span>
                  <p className="text-sm sm:text-base font-extrabold text-stone-100 leading-snug pt-1">
                    {item.label}
                  </p>
                </div>

                {/* Description with readable line-height */}
                <p className="text-xs text-stone-400 leading-[1.7] pt-1">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
      </div>
    </div>
  );
};
