'use client';

import React from 'react';

interface IconProps {
  className?: string;
}

/**
 * Bespoke Handcrafted Icons for Zakhrafa Luxury Furniture Atelier
 * Non-generic, architectural vectors representing fine woodworking, fabrics, and royal hallmarks.
 */

// 1. Natural Solid Wood Joinery Icon (تعشيقة الخشب الزان الطبيعي المعماري)
export const WoodGrainJoineryIcon: React.FC<IconProps> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    {/* Interlocking Mortise and Tenon Solid Wood Blocks */}
    <rect x="4" y="5" width="10" height="22" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <rect x="18" y="5" width="10" height="22" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Natural Wood Grain Rings */}
    <path d="M7 11C8.5 11 9 13 9 15C9 17 8.5 19 7 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <path d="M21 10C23 10 24 12 24 16C24 20 23 22 21 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    {/* Interlocking Joint Key */}
    <path d="M14 13H18M14 19H18" stroke="#E17F3F" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 2. Woven Italian Fabric & Upholstery Icon (خيوط النسيج والتطريز الإيطالي)
export const WovenFabricIcon: React.FC<IconProps> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    {/* Luxury Fabric Swatch Fold */}
    <path
      d="M6 8C6 6.89543 6.89543 6 8 6H20C21.1046 6 22 6.89543 22 8V24C22 25.1046 21.1046 26 20 26H8C6.89543 26 6 25.1046 6 24V8Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M22 10L26 12V22L22 20"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.5"
    />
    {/* Fine Textile Weave Cross Stitch */}
    <path d="M10 11H18M10 16H18M10 21H18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    <path d="M14 8V24" stroke="#E17F3F" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 3" />
  </svg>
);

// 3. Architectural Proportion & Tailoring Caliper (مسطرة وفرجار القياس الهندسي الدقيق)
export const ArchitecturalDraftingIcon: React.FC<IconProps> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    {/* Precision Drafting Compass / Caliper */}
    <circle cx="16" cy="7" r="3" stroke="#E17F3F" strokeWidth="2" />
    <path d="M14 9.5L7 26M18 9.5L25 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Caliper Measurement Arc */}
    <path d="M10 20C12.5 19 19.5 19 22 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <circle cx="7" cy="26" r="1.5" fill="currentColor" />
    <circle cx="25" cy="26" r="1.5" fill="currentColor" />
  </svg>
);

// 4. Royal Wax Hallmark & 5-Year Guarantee Seal (ختم الضمان الملكي والموثوقية)
export const RoyalWarrantySealIcon: React.FC<IconProps> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    {/* Octagonal Stepped Royal Islamic Seal */}
    <path
      d="M11 4H21L27 10V20L21 26H11L5 20V10L11 4Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Inner Star / Emblem */}
    <circle cx="16" cy="15" r="5" stroke="#E17F3F" strokeWidth="1.75" />
    {/* Golden Hallmark Check */}
    <path d="M14 15L15.5 16.5L18.5 13.5" stroke="#E17F3F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Ribbon Tails */}
    <path d="M12 25L9 29L12 28L15 29V25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 25L23 29L20 28L17 29V25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 5. White-Glove VIP Delivery & Home Installation (توصيل وتركيب VIP فندقي)
export const WhiteGloveCareIcon: React.FC<IconProps> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    {/* Artisan Protective Glove / Caring Hands */}
    <path
      d="M7 23V16C7 13.2386 9.23858 11 12 11C12.5 11 13 11.2 13.5 11.5C13.8 9.5 15.5 8 17.5 8C19 8 20.3 8.8 20.8 10.2C21.2 10 21.6 10 22 10C23.6569 10 25 11.3431 25 13V18C25 22.4183 21.4183 26 17 26H12C9.23858 26 7 24.5 7 23Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Sparkle of Cleanliness / Perfection */}
    <path d="M12 4L13 6L15 7L13 8L12 10L11 8L9 7L11 6L12 4Z" fill="#E17F3F" />
  </svg>
);
