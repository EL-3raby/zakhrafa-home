import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * Geometric Architectural Monogram Logo for Zakhrafa
 * Inspired by luxury Islamic geometry and faceted 3D architectural volume.
 */
export const BrandLogoMark: React.FC<IconProps> = ({ className = 'w-5 h-5 text-[#E17F3F]' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Isometric Architectural Cube & Facets */}
    <path d="M12 2.5L20.5 7.4V16.6L12 21.5L3.5 16.6V7.4L12 2.5Z" />
    <path d="M12 2.5V21.5" />
    <path d="M12 12L20.5 7.4" />
    <path d="M12 12L3.5 7.4" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

/**
 * Official Sleek WhatsApp Outline Icon (Used by global brands)
 */
export const WhatsAppIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 20.16C10.55 20.16 9.09 19.76 7.8 19L7.49 18.82L4.38 19.64L5.21 16.61L5.01 16.29C4.18 14.97 3.75 13.46 3.75 11.91C3.75 7.34 7.47 3.62 12.04 3.62C14.25 3.62 16.33 4.49 17.9 6.05C19.46 7.62 20.33 9.7 20.33 11.92C20.33 16.48 16.61 20.16 12.04 20.16ZM16.59 14.38C16.34 14.25 15.11 13.65 14.88 13.57C14.65 13.48 14.49 13.44 14.32 13.69C14.16 13.94 13.69 14.49 13.55 14.65C13.41 14.82 13.26 14.84 13.01 14.71C12.76 14.59 11.97 14.33 11.03 13.49C10.29 12.83 9.8 12.02 9.65 11.77C9.51 11.52 9.64 11.39 9.76 11.27C9.87 11.16 10.01 10.98 10.14 10.83C10.26 10.68 10.3 10.57 10.39 10.41C10.47 10.24 10.43 10.1 10.37 9.97C10.31 9.85 9.82 8.64 9.61 8.14C9.41 7.66 9.21 7.72 9.06 7.71H8.59C8.42 7.71 8.15 7.77 7.93 8.01C7.7 8.26 7.07 8.85 7.07 10.06C7.07 11.27 7.95 12.43 8.07 12.6C8.2 12.76 9.8 15.22 12.24 16.28C12.82 16.53 13.27 16.68 13.63 16.79C14.22 16.98 14.75 16.95 15.18 16.89C15.66 16.82 16.65 16.29 16.86 15.71C17.07 15.13 17.07 14.63 17.01 14.53C16.95 14.43 16.83 14.5 16.59 14.38Z" />
  </svg>
);

/**
 * Luxury Guarantee / Certified Quality Icon (Minimalist Seal)
 */
export const LuxuryShieldIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

/**
 * White-Glove Fast Delivery & Installation Icon
 */
export const WhiteGloveTruckIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M15 18H9" />
    <path d="M19 18h2a1 1 0 0 0 1-1v-5.5a1.5 1.5 0 0 0-.44-1.06L18.5 7.38A1.5 1.5 0 0 0 17.44 7H14v11h1" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
  </svg>
);

/**
 * Architectural Drafting Compass Icon (for Bespoke / Custom Design)
 */
export const ArchitectCompassIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="5" r="2" />
    <path d="m11 7-7 14" />
    <path d="m13 7 7 14" />
    <path d="m6 16 12 0" />
    <path d="M12 2v1" />
  </svg>
);

/**
 * Pure Natural Materials / Craftsmanship Icon (Gemstone / Material Layers)
 */
export const NaturalMaterialsIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 3h12l4 6-10 12L2 9z" />
    <path d="M11 3 8 9l4 12 4-12-3-6" />
    <path d="M2 9h20" />
  </svg>
);

/**
 * Architectural Living Room Sofa Icon
 */
export const ArchitecturalSofaIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 9V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2" />
    <path d="M2 11a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-6z" />
    <path d="M4 18v3" />
    <path d="M20 18v3" />
    <path d="M8 9v3" />
    <path d="M16 9v3" />
  </svg>
);

/**
 * Architectural Dining Table Icon (No cartoon forks/knives!)
 */
export const ArchitecturalDiningIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Table Surface */}
    <rect x="3" y="8" width="18" height="2.5" rx="1" />
    {/* Table Legs */}
    <path d="M6 10.5V20" />
    <path d="M18 10.5V20" />
    {/* Minimalist Chair Silhouettes */}
    <path d="M7 4h2v4H7z" />
    <path d="M15 4h2v4h-2z" />
  </svg>
);

/**
 * Architectural Bedroom Icon
 */
export const ArchitecturalBedIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 4v16" />
    <path d="M2 8h20v12" />
    <path d="M2 17h20" />
    <path d="M6 8v4h5V8" />
    <path d="M13 8v4h5V8" />
    <path d="M22 17v3" />
  </svg>
);

/**
 * Architectural Coffee Table & Consoles Icon
 */
export const ArchitecturalCoffeeTableIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <ellipse cx="12" cy="8" rx="9" ry="3.5" />
    <path d="M5 9v9" />
    <path d="M19 9v9" />
    <path d="M12 11.5v8" />
  </svg>
);

/**
 * Architectural Ambient Decor & Lighting Icon
 */
export const ArchitecturalDecorIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 14h6l2 5H7l2-5z" />
    <path d="M12 14V3" />
    <path d="M8 3h8" />
    <circle cx="12" cy="7" r="1.5" />
  </svg>
);

/**
 * Architect Caliper / Precision Measuring Ruler Icon
 */
export const CalipersRulerIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 3L3 21" />
    <path d="M7 5L5 7" />
    <path d="M10 8L8 10" />
    <path d="M13 11L11 13" />
    <path d="M16 14L14 16" />
    <path d="M19 17L17 19" />
    <path d="M16 3h5v5" />
    <path d="M8 21H3v-5" />
  </svg>
);

/**
 * Premium Textile / Fabric Weave Swatch Icon
 */
export const FabricWeaveIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M3 9h18" />
    <path d="M3 15h18" />
    <path d="M9 3v18" />
    <path d="M15 3v18" />
  </svg>
);

/**
 * Solid Natural Wood Timber Icon
 */
export const SolidWoodIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <ellipse cx="12" cy="6" rx="8" ry="3" />
    <path d="M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
    <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
    <circle cx="12" cy="6" r="1" fill="currentColor" />
  </svg>
);

/**
 * Certified Guarantee Gold Seal Icon
 */
export const CertifiedShieldIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2L4 5v6.5C4 16.5 7.4 21 12 22c4.6-1 8-5.5 8-10.5V5l-8-3z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

/**
 * Bespoke Custom Tailored Sizing Icon
 */
export const BespokeCustomIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z" />
    <path d="m14 7 3 3" />
    <path d="M5 6v4" />
    <path d="M19 14v4" />
    <path d="M10 14h4" />
  </svg>
);

/**
 * Care & Maintenance Clean Icon
 */
export const CareMaintenanceIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2v4" />
    <path d="m4.93 4.93 2.83 2.83" />
    <path d="M2 12h4" />
    <path d="m4.93 19.07 2.83-2.83" />
    <path d="M14 17l6-6a2.83 2.83 0 0 1 4 4l-6 6a2 2 0 0 1-1.41.59H13v-3.59A2 2 0 0 1 14 17z" />
  </svg>
);

/**
 * Inspection Before Delivery Icon
 */
export const InspectBeforePayIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
    <path d="m8 11 2 2 4-4" />
  </svg>
);

/**
 * Sparkle Quality Craftsmanship Icon
 */
export const SparkleQualityIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
  </svg>
);

/**
 * Official Facebook Vector Icon
 */
export const FacebookIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

/**
 * Official Instagram Vector Icon
 */
export const InstagramIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" />
  </svg>
);
