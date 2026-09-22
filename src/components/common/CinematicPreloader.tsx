'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export const CinematicPreloader: React.FC = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (pathname !== '/' && pathname !== '') return false;

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const forceIntro = urlParams.get('intro') === 'true';
      const hasSeen = sessionStorage.getItem('zakhrafa_intro_completed');
      return forceIntro || (!hasSeen && pathname === '/');
    } catch {
      return false;
    }
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    document.body.style.overflow = 'hidden';

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = prev < 50 ? 2.5 : prev < 85 ? 2 : 1.5;
        return Math.min(Math.round(prev + increment), 100);
      });
    }, 30);

    const timer = setTimeout(() => {
      try {
        sessionStorage.setItem('zakhrafa_intro_completed', 'true');
      } catch {
        // Ignore sessionStorage errors.
      }

      document.body.style.overflow = '';
      setIsVisible(false);
    }, 2400);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  const handleComplete = () => {
    try {
      sessionStorage.setItem('zakhrafa_intro_completed', 'true');
    } catch {
      // Ignore
    }
    document.body.style.overflow = '';
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="cinematic-preloader"
        initial={{ y: 0 }}
        exit={{
          y: '-100%',
          transition: {
            duration: 0.9,
            ease: [0.77, 0, 0.175, 1],
          },
        }}
        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#07262A] text-white overflow-hidden select-none"
      >
        {/* Ambient Lighting & Glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[#E17F3F]/25 blur-[130px]" />
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#12555C]/40 blur-[100px]" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#E17F3F]/15 blur-[100px]" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px] opacity-60" />
        </div>

        {/* Skip Button */}
        <button
          onClick={handleComplete}
          type="button"
          className="absolute top-6 left-6 z-50 text-xs font-semibold text-stone-300 hover:text-white px-3.5 py-1.5 rounded-full border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/15 backdrop-blur-sm transition-all duration-200 cursor-pointer"
        >
          تخطي
        </button>

        {/* Central Brand Showcase */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
          {/* Logo with Light Sweep */}
          <div className="relative group mb-6 cursor-default">
            {/* Light Sweep Sheen */}
            <motion.div
              initial={{ x: '-160%', opacity: 0 }}
              animate={{ x: '190%', opacity: [0, 0.9, 0] }}
              transition={{ duration: 1.3, delay: 0.2, ease: 'easeInOut' }}
              className="absolute inset-0 z-20 w-full h-full pointer-events-none bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-25deg]"
            />

            <div className="absolute -inset-2 rounded-2xl bg-[#E17F3F]/30 blur-lg -z-10" />

            <svg
              viewBox="0 0 108 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
              aria-label="زخرفة"
            >
              <path
                d="M 8,0 H 92 V 8 H 100 V 92 H 92 V 100 H 8 V 92 H 0 V 8 H 8 Z"
                fill="#E17F3F"
              />
              <path
                d="M 22,20.5 H 78.5 L 51.5,47.5 H 42 L 66.5,24.5 H 26 Z"
                fill="#07262A"
              />
              <path
                d="M 78,79.5 H 21.5 L 48.5,52.5 H 58 L 33.5,75.5 H 74 Z"
                fill="#07262A"
              />
              <text
                x="95"
                y="10"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="9"
                fontWeight="900"
                fill="#E17F3F"
              >
                TM
              </text>
            </svg>
          </div>

          {/* Typography */}
          <div className="flex flex-col items-center">
            <h1
              className="font-black text-2xl sm:text-3xl tracking-[0.22em] text-[#E17F3F] pl-[0.22em] text-center"
              style={{ fontFamily: 'var(--font-alexandria), sans-serif' }}
            >
              ZAKHRAFA
            </h1>

            <div className="w-[140px] h-[1.5px] bg-gradient-to-r from-transparent via-[#E17F3F] to-transparent my-3" />

            <p
              className="text-stone-300 text-xs sm:text-sm font-medium tracking-wide"
              style={{ fontFamily: 'var(--font-alexandria), sans-serif' }}
            >
              ديكورات مبتكرة • أثاث عصري فاخر
            </p>
          </div>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="absolute bottom-12 w-48 sm:w-60 flex flex-col items-center gap-2">
          <div className="w-full h-[2.5px] bg-white/10 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-[#E17F3F] to-[#f4aa73] transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="text-[11px] font-mono tracking-widest text-stone-400">
            {progress}%
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
