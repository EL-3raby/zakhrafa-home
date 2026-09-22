'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion';
import { Sparkles, TrendingUp, ShieldCheck, TreePine, Award } from 'lucide-react';

interface MetricItem {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  desc: string;
  accentColor: string;
  delay: number;
  duration: number;
}

const METRICS_DATA: MetricItem[] = [
  {
    icon: TrendingUp,
    value: 5,
    prefix: '',
    suffix: '+',
    label: 'سنوات من الخبرة الفندقية',
    desc: 'انتقاء أدق التفاصيل وتطوير الصنعة من 2021',
    accentColor: '#E17F3F',
    delay: 0.1,
    duration: 1.4,
  },
  {
    icon: TreePine,
    value: 100,
    prefix: '',
    suffix: '%',
    label: 'خشب زان أحمر طبيعي',
    desc: 'مجفف حرارياً بنسب رطوبة مدروسة لمنع التقوس',
    accentColor: '#10B981',
    delay: 0.25,
    duration: 1.8,
  },
  {
    icon: ShieldCheck,
    value: 5,
    prefix: '',
    suffix: '',
    label: 'أعوام ضمان شامل معتمد',
    desc: 'على الهياكل المصمتة والوصلات وحشوات الإسفنج',
    accentColor: '#E17F3F',
    delay: 0.4,
    duration: 1.4,
  },
  {
    icon: Award,
    value: 1200,
    prefix: '',
    suffix: '+',
    label: 'بيت زيّنته دار زخرفة',
    desc: 'بقطع متفردة تلبي ذوق أصحابها بكل فخر',
    accentColor: '#38BDF8',
    delay: 0.55,
    duration: 2.2,
  },
];

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
  isActive: boolean;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  prefix = '',
  suffix = '',
  duration = 2.0,
  delay = 0,
  isActive,
}) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    if (!isActive) {
      node.textContent = `${prefix}0${suffix}`;
      return;
    }

    const timer = setTimeout(() => {
      const controls = animate(0, value, {
        duration,
        ease: [0.16, 1, 0.3, 1], // Smooth luxury deceleration curve
        onUpdate(latest) {
          const rounded = Math.round(latest);
          const formatted = rounded.toLocaleString('en-US');
          if (node) {
            node.textContent = `${prefix}${formatted}${suffix}`;
          }
        },
      });

      return () => controls.stop();
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isActive, value, prefix, suffix, duration, delay]);

  return (
    <span
      ref={nodeRef}
      dir="ltr"
      className="inline-block tabular-nums"
    >
      {prefix}0{suffix}
    </span>
  );
};

export const AboutMetricsSlide: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const isInView = useInView(gridRef, { amount: 0.25, once: false });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Subtle scale-down as next section slides over it
  const stageOpacity = useTransform(scrollYProgress, [0.75, 0.98], [1, 0.7]);
  const stageScale = useTransform(scrollYProgress, [0.75, 0.98], [1, 0.96]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[140vh] sm:h-[160vh] z-20"
    >
      <div className="sticky top-0 min-h-screen w-full flex flex-col justify-center items-center bg-[#07262A] text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-hidden shadow-[0_-30px_60px_rgba(0,0,0,0.5)] border-t border-white/10">
        {/* Zero-Lag Ambient Radial Glows (No CSS blur penalty) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,127,63,0.15),transparent_65%),radial-gradient(circle_at_top_right,rgba(11,61,66,0.3),transparent_55%)] pointer-events-none" />

        {/* Chapter Marker (Clear typography) */}
        <div className="absolute top-4 right-6 sm:top-6 sm:right-10 flex items-center gap-2.5 text-stone-400 text-xs select-none">
          <span className="w-2 h-2 rounded-full bg-[#E17F3F]" />
          <span className="font-mono font-bold text-stone-300 text-[13px]">03 / 06</span>
          <span className="text-stone-500">•</span>
          <span className="font-sans font-semibold text-stone-200">الأرقام والمصداقية</span>
        </div>

        <motion.div
          style={{ opacity: stageOpacity, scale: stageScale }}
          className="relative z-10 mx-auto max-w-7xl w-full will-change-[transform,opacity]"
        >
        {/* Header with generous font spacing */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-8 lg:mb-10 space-y-1.5 sm:space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/5 border border-white/10 text-[#F3B084] text-[11px] sm:text-xs font-bold shadow-xs"
          >
            <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#E17F3F]" />
            <span>ثقة نعتز بها في كل تفصيلة</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.3] sm:leading-[1.28]"
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
            className="text-stone-300/90 text-xs sm:text-sm lg:text-base leading-relaxed max-w-lg mx-auto line-clamp-2"
          >
            وراء كل رقم سنوات من التطوير، وعلاقات ثقة بنيناها مع عملائنا قطعة بقطعة.
          </motion.p>
        </div>

        {/* 4 Metric Cards Grid: 2x2 on Mobile, 4-cols on Desktop */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6"
        >
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
                className="relative p-3.5 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 hover:border-[#E17F3F]/40 text-right space-y-2 sm:space-y-3 shadow-xl transition-colors group flex flex-col justify-between"
              >
                {/* Top Corner Icon */}
                <div className="flex items-center justify-between border-b border-white/10 pb-2 sm:pb-3">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E17F3F] group-hover:scale-110 transition-transform">
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-mono text-stone-400 font-bold">
                    0{idx + 1}
                  </span>
                </div>

                {/* Big Metric Display with Dynamic Counting Animation */}
                <div className="pt-0.5 sm:pt-1 space-y-0.5 sm:space-y-1">
                  <span
                    className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight block group-hover:text-[#E17F3F] transition-colors leading-none"
                    style={{ fontFamily: 'var(--font-alexandria), sans-serif' }}
                  >
                    <AnimatedCounter
                      value={item.value}
                      prefix={item.prefix}
                      suffix={item.suffix}
                      duration={item.duration}
                      delay={item.delay}
                      isActive={isInView}
                    />
                  </span>
                  <p className="text-xs sm:text-sm lg:text-base font-extrabold text-stone-100 leading-snug pt-0.5 line-clamp-1">
                    {item.label}
                  </p>
                </div>

                {/* Description with readable line-height */}
                <p className="text-[10px] sm:text-xs text-stone-400 leading-relaxed line-clamp-2">
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
