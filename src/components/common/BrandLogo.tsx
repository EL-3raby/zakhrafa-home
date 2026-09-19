'use client';

import React from 'react';

interface BrandLogoProps {
  className?: string;
  theme?: 'light' | 'dark'; // 'light' for white navbar, 'dark' for teal footer/admin
  markOnly?: boolean;
}

/**
 * Official Ultra-HD Vector Brand Logo for Zakhrafa
 * Lossless vector rendering with zero pixelation on all Retina and 4K screens.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = 'h-11 w-auto',
  theme = 'light',
  markOnly = false,
}) => {
  const isLight = theme === 'light';

  // Colors
  const orange = '#E17F3F';
  const teal = '#0B3D42';
  const titleColor = isLight ? teal : orange;
  const subtitleColor = orange;
  const zColor = isLight ? teal : teal; // Z cutout matches brand teal

  if (markOnly) {
    return (
      <svg
        viewBox="0 0 108 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="زخرفة - ZAKHRAFA Mark"
      >
        {/* Stepped Islamic Architectural Square */}
        <path
          d="M 8,0 H 92 V 8 H 100 V 92 H 92 V 100 H 8 V 92 H 0 V 8 H 8 Z"
          fill={orange}
        />

        {/* Top Dynamic Ribbon of Z */}
        <path
          d="M 22,20.5 H 78.5 L 51.5,47.5 H 42 L 66.5,24.5 H 26 Z"
          fill={zColor}
        />

        {/* Bottom Dynamic Ribbon of Z */}
        <path
          d="M 78,79.5 H 21.5 L 48.5,52.5 H 58 L 33.5,75.5 H 74 Z"
          fill={zColor}
        />

        {/* TM Symbol */}
        <text
          x="95"
          y="10"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="9"
          fontWeight="900"
          fill={orange}
        >
          TM
        </text>
      </svg>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* 1. Vector Emblem Mark (Retina Crisp) */}
      <svg
        viewBox="0 0 108 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto aspect-[1.08/1] shrink-0"
        aria-hidden="true"
      >
        {/* Stepped Islamic Architectural Square */}
        <path
          d="M 8,0 H 92 V 8 H 100 V 92 H 92 V 100 H 8 V 92 H 0 V 8 H 8 Z"
          fill={orange}
        />

        {/* Top Dynamic Ribbon of Z */}
        <path
          d="M 22,20.5 H 78.5 L 51.5,47.5 H 42 L 66.5,24.5 H 26 Z"
          fill={zColor}
        />

        {/* Bottom Dynamic Ribbon of Z */}
        <path
          d="M 78,79.5 H 21.5 L 48.5,52.5 H 58 L 33.5,75.5 H 74 Z"
          fill={zColor}
        />

        {/* TM Symbol */}
        <text
          x="95"
          y="10"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="9"
          fontWeight="900"
          fill={orange}
        >
          TM
        </text>
      </svg>

      {/* 2. Vector Typography (Subpixel Crisp HTML) */}
      <div className="flex flex-col justify-center leading-none text-left" dir="ltr">
        <span
          className="font-black text-xl sm:text-2xl tracking-[0.14em] transition-colors"
          style={{
            color: titleColor,
            fontFamily: 'var(--font-alexandria), system-ui, sans-serif',
          }}
        >
          ZAKHRAFA
        </span>
        <span
          className="font-bold text-[8px] sm:text-[9.5px] tracking-[0.2em] mt-1"
          style={{
            color: subtitleColor,
            fontFamily: 'var(--font-alexandria), system-ui, sans-serif',
          }}
        >
          INNOVATIVE DECORATIONS
        </span>
      </div>
    </div>
  );
};
