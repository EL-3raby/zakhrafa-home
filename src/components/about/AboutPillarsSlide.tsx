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

  // Lag-free fade in on approach and complete disappearance on scroll down
  const stageOpacity = useTransform(scrollYProgress, [0, 0.18, 0.7, 0.92], [0, 1, 1, 0]);
  const stageScale = useTransform(scrollYProgress, [0.7, 0.92], [1, 0.94]);
  const stageY = useTransform(scrollYProgress, [0.7, 0.92], [0, -40]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[125vh] z-40"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center bg-white text-[#0B3D42] py-10 sm:py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle Architectural Blueprint Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b3d4208_1px,transparent_1px),linear-gradient(to_bottom,#0b3d4208_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

        {/* Chapter Marker */}
        <div className="absolute top-4 right-6 sm:top-6 sm:right-10 flex items-center gap-2 text-stone-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-[#0B3D42]" />
          <span>04 / 06 • معايير الصنعة الحرفية</span>
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B3D42]/5 border border-[#0B3D42]/15 text-[#0B3D42] text-xs font-bold shadow-2xs"
          >
            <Compass className="w-3.5 h-3.5 text-[#E17F3F]" />
            <span>معايير الصنعة الهندسية الحقيقية</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl xs:text-4xl sm:text-5xl font-black text-[#0B3D42] tracking-tight leading-[1.36] sm:leading-[1.32]"
            style={{ fontFamily: 'var(--font-alexandria), sans-serif' }}
          >
            ثلاث ركائز لا نساوم عليها في أي قطعة
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-stone-600 text-xs sm:text-base leading-[1.85] max-w-xl mx-auto pt-1"
          >
            كل تصميم يمر بمراحل دقيقة من اختيار الأخشاب الطبيعية، وقص الإسفنج الطبي، وحتى الدرزات اليدوية الأخيرة.
          </motion.p>
        </div>

        {/* 3 Pillars Cards with generous font breathing room */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {PILLARS_DATA.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="relative p-7 sm:p-8 rounded-3xl bg-[#FAF8F5] hover:bg-[#FDFBF7] border border-stone-200/90 hover:border-[#E17F3F]/50 shadow-md hover:shadow-2xl transition-all duration-300 text-right flex flex-col justify-between group"
              >
                {/* Header of Pillar */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-13 h-13 rounded-2xl bg-white border border-stone-200/90 text-[#0B3D42] group-hover:text-[#E17F3F] flex items-center justify-center shadow-xs transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-black text-stone-300 group-hover:text-[#E17F3F] transition-colors">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-[#0B3D42] leading-[1.4] mb-3">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-[13.5px] text-stone-600 leading-[1.85] mb-6">
                    {item.desc}
                  </p>
                </div>

                {/* Feature Check Badge */}
                <div className="pt-3.5 border-t border-stone-200/70 flex items-center gap-2 text-xs font-bold text-[#0B3D42]">
                  <span className="w-5 h-5 rounded-full bg-[#E17F3F]/15 flex items-center justify-center text-[#E17F3F] shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>{item.feature}</span>
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
