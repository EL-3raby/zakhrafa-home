'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CinematicPreloader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Show on first visit in the current session, or whenever ?intro=true is present
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const forceIntro = urlParams.get('intro') === 'true';
      const hasSeen = sessionStorage.getItem('zakhrafa_intro_completed');
      if (forceIntro || !hasSeen) {
        setIsVisible(true);
      }
    } catch {
      // Fallback if sessionStorage is disabled
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Prevent body scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    // Simulate luxury progress smoothly over ~3.2 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Steady, elegant progression
        const increment = prev < 60 ? 2 : prev < 90 ? 1.5 : 1;
        return Math.min(Math.round(prev + increment), 100);
      });
    }, 45);

    // Auto dismiss after ~3.8 seconds
    const timer = setTimeout(() => {
      handleComplete();
    }, 3800);

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

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="cinematic-preloader"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 1.0,
              ease: [0.77, 0, 0.175, 1], // Cinematic theatrical curtain ease
            },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#07262A] text-white overflow-hidden select-none"
          style={{ perspective: 1200 }}
        >
          {/* 1. Ambient Background Glows & Luxury Architectural Grid */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Center Golden/Copper Radial Aura */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: [0.8, 1.25, 1], opacity: [0.2, 0.45, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[#E17F3F]/25 blur-[130px]"
            />

            {/* Subtle Deep Teal Ambient Spotlight */}
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#12555C]/40 blur-[100px]" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#E17F3F]/15 blur-[100px]" />

            {/* Geometric luxury lines watermark */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px] opacity-60" />
          </div>

          {/* 2. Skip Button (تخطي) */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            onClick={handleComplete}
            type="button"
            className="absolute top-6 left-6 z-50 text-xs font-semibold text-stone-400 hover:text-white px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-200 cursor-pointer"
          >
            تخطي
          </motion.button>

          {/* 3. Main Center Stage (Emblem + Typography) */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
            {/* 3D Rotating & Assembling Z Emblem Cube */}
            <motion.div
              initial={{
                scale: 0.35,
                rotateY: -70,
                rotateX: 20,
                opacity: 0,
                filter: 'blur(12px)',
              }}
              animate={{
                scale: 1,
                rotateY: 0,
                rotateX: 0,
                opacity: 1,
                filter: 'blur(0px)',
              }}
              transition={{
                duration: 1.4,
                ease: [0.16, 1, 0.3, 1], // Majestic smooth ease
              }}
              className="relative group mb-7 cursor-default"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Shimmer Light Beam Effect passing over the Cube */}
              <motion.div
                initial={{ x: '-160%', opacity: 0 }}
                animate={{ x: '190%', opacity: [0, 0.85, 0] }}
                transition={{ duration: 1.6, delay: 0.7, ease: 'easeInOut' }}
                className="absolute inset-0 z-20 w-full h-full pointer-events-none bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg]"
              />

              {/* Glowing Outer Shadow Halo */}
              <div className="absolute -inset-2 rounded-2xl bg-[#E17F3F]/30 blur-lg -z-10 group-hover:bg-[#E17F3F]/50 transition-all" />

              {/* The Official Vector Emblem SVG (Rendered High-End) */}
              <svg
                viewBox="0 0 108 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
                aria-label="زخرفة"
              >
                {/* Stepped Islamic Architectural Exterior Frame */}
                <path
                  d="M 8,0 H 92 V 8 H 100 V 92 H 92 V 100 H 8 V 92 H 0 V 8 H 8 Z"
                  fill="#E17F3F"
                />

                {/* Top Dynamic Ribbon of Z Cutout */}
                <path
                  d="M 22,20.5 H 78.5 L 51.5,47.5 H 42 L 66.5,24.5 H 26 Z"
                  fill="#07262A"
                />

                {/* Bottom Dynamic Ribbon of Z Cutout */}
                <path
                  d="M 78,79.5 H 21.5 L 48.5,52.5 H 58 L 33.5,75.5 H 74 Z"
                  fill="#07262A"
                />

                {/* TM Trademark Mark */}
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
            </motion.div>

            {/* Typography Reveal (Cinematic Tracking & Blur Effect) */}
            <div className="flex flex-col items-center">
              {/* English Brand Name */}
              <motion.h1
                initial={{
                  letterSpacing: '0.45em',
                  opacity: 0,
                  filter: 'blur(14px)',
                  y: 14,
                }}
                animate={{
                  letterSpacing: '0.22em',
                  opacity: 1,
                  filter: 'blur(0px)',
                  y: 0,
                }}
                transition={{
                  duration: 1.2,
                  delay: 1.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-black text-2xl sm:text-3xl tracking-[0.22em] text-[#E17F3F] pl-[0.22em] text-center"
                style={{ fontFamily: 'var(--font-alexandria), sans-serif' }}
              >
                ZAKHRAFA
              </motion.h1>

              {/* Expanding Golden Hairline Accent */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 140, opacity: 1 }}
                transition={{ duration: 0.9, delay: 1.6, ease: 'easeOut' }}
                className="h-[1.5px] bg-gradient-to-r from-transparent via-[#E17F3F] to-transparent my-3"
              />

              {/* Tagline Reveal (Arabic & Luxury Slogan) */}
              <motion.p
                initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.9, delay: 1.9, ease: 'easeOut' }}
                className="text-stone-300 text-xs sm:text-sm font-medium tracking-wide"
                style={{ fontFamily: 'var(--font-alexandria), sans-serif' }}
              >
                ديكورات مبتكرة • أثاث عصري فاخر
              </motion.p>
            </div>
          </div>

          {/* 4. Luxury Hairline Progress Indicator at the bottom */}
          <div className="absolute bottom-12 w-48 sm:w-60 flex flex-col items-center gap-2">
            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#E17F3F] to-[#f4aa73]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-[10px] font-mono tracking-widest text-stone-400"
            >
              {progress}%
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
