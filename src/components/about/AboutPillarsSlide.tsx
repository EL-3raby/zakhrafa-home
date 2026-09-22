'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Check, Compass, Ruler, Sparkles } from 'lucide-react';
import {
  WoodGrainJoineryIcon,
  WovenFabricIcon,
  ArchitecturalDraftingIcon,
} from './ArtisanalIcons';

const PILLARS_DATA = [
  {
    icon: WoodGrainJoineryIcon,
    number: '01',
    title: 'خشب زان أحمر طبيعي 100%',
    desc: 'هياكل خشبية مصنوعة من خشب الزان الأحمر الروماني المصمت، المجفف حرارياً بنسب رطوبة دقيقة لمنع أي تقوس أو تصدع مع تغير فصول السنة.',
    feature: 'خشب طبيعي صلب بدون حشوات رديئة',
    accentColor: '#E17F3F',
  },
  {
    icon: WovenFabricIcon,
    number: '02',
    title: 'أقمشة إيطالية معالجة ضد البقع',
    desc: 'مخمل ناعم وكتان تركي عالي الكثافة مقاوم للاهتراء، مع معالجة ذكية ضد تسرب السوائل والبقع لضمان سهولة التنظيف اليومي وأناقة تدوم.',
    feature: 'إسفنج سوفت وطبي كثافة عالية (36-38)',
    accentColor: '#0B3D42',
  },
  {
    icon: ArchitecturalDraftingIcon,
    number: '03',
    title: 'تفصيل بالمليمتر لمساحتك أنت',
    desc: 'لا داعي للقلق بشأن أبعاد غرفتك؛ نوفر خيار تفصيل الأطقم الزاوية والكنب وغرف النوم بالمقاسات والاتجاهات الدقيقة التي تلائم جدرانك بدقة هندسية.',
    feature: 'أكثر من 40 درجة لونية للأقمشة والأخشاب',
    accentColor: '#10B981',
  },
];

export const AboutPillarsSlide: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

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
      className="relative w-full h-[140vh] sm:h-[160vh] z-30"
    >
      <div className="sticky top-0 min-h-screen w-full flex flex-col justify-center items-center bg-[#FAF8F5] text-[#0B3D42] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-hidden shadow-[0_-30px_60px_rgba(0,0,0,0.2)] border-t border-stone-200/80">
        {/* Subtle Architectural Blueprint Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b3d4208_1px,transparent_1px),linear-gradient(to_bottom,#0b3d4208_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

        {/* Chapter Marker (Clear typography) */}
        <div className="absolute top-4 right-6 sm:top-6 sm:right-10 flex items-center gap-2.5 text-stone-500 text-xs select-none">
          <span className="w-2 h-2 rounded-full bg-[#0B3D42]" />
          <span className="font-mono font-bold text-stone-600 text-[13px]">04 / 06</span>
          <span className="text-stone-300">•</span>
          <span className="font-sans font-semibold text-stone-700">معايير الصنعة الحرفية</span>
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
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#0B3D42]/5 border border-[#0B3D42]/15 text-[#0B3D42] text-[11px] sm:text-xs font-bold shadow-2xs"
          >
            <Compass className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#E17F3F]" />
            <span>معايير الصنعة الهندسية الحقيقية</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B3D42] tracking-tight leading-[1.3] sm:leading-[1.28]"
            style={{ fontFamily: 'var(--font-alexandria), sans-serif' }}
          >
            ثلاث ركائز لا نساوم عليها في أي قطعة
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-stone-600 text-xs sm:text-sm lg:text-base leading-relaxed max-w-xl mx-auto line-clamp-2"
          >
            كل تصميم يمر بمراحل دقيقة من اختيار الأخشاب الطبيعية، وقص الإسفنج الطبي، وحتى الدرزات اليدوية الأخيرة.
          </motion.p>
        </div>

        {/* 3 Pillars Cards: Compact on Mobile, 3-cols on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
          {PILLARS_DATA.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="relative p-4 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl bg-[#FAF8F5] hover:bg-[#FDFBF7] border border-stone-200/90 hover:border-[#E17F3F]/50 shadow-sm hover:shadow-xl transition-all duration-300 text-right flex flex-col justify-between group"
              >
                {/* Header of Pillar */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl bg-white border border-stone-200/90 text-[#0B3D42] group-hover:text-[#E17F3F] flex items-center justify-center shadow-xs transition-colors">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-mono font-black text-stone-300 group-hover:text-[#E17F3F] transition-colors">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="text-sm xs:text-base sm:text-lg lg:text-xl font-black text-[#0B3D42] leading-snug mb-1 sm:mb-2">
                    {item.title}
                  </h3>

                  <p className="text-[11px] sm:text-xs lg:text-[13px] text-stone-600 leading-relaxed mb-2 sm:mb-4 line-clamp-3">
                    {item.desc}
                  </p>
                </div>

                {/* Feature Check Badge */}
                <div className="pt-2 sm:pt-3 border-t border-stone-200/70 flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold text-[#0B3D42]">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#E17F3F]/15 flex items-center justify-center text-[#E17F3F] shrink-0">
                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </span>
                  <span className="truncate">{item.feature}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
      </div>
    </div>
  );
};
