'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Clock,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  Check,
  ArrowUpDown,
} from 'lucide-react';

export type SortOption = 'featured' | 'newest' | 'price_asc' | 'price_desc';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

interface SortItem {
  id: SortOption;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SORT_ITEMS: SortItem[] = [
  {
    id: 'featured',
    label: 'الأبرز والمميز',
    sublabel: 'المختارات الأكثر تميزاً وطلباً',
    icon: Sparkles,
  },
  {
    id: 'newest',
    label: 'الأحدث وصولاً',
    sublabel: 'أحدث إضافات وتصاميم الكتالوج',
    icon: Clock,
  },
  {
    id: 'price_asc',
    label: 'السعر: من الأقل للأعلى',
    sublabel: 'ترتيب تصاعدي حسب السعر',
    icon: TrendingDown,
  },
  {
    id: 'price_desc',
    label: 'السعر: من الأعلى للأقل',
    sublabel: 'ترتيب تنازلي للقطع الحصرية',
    icon: TrendingUp,
  },
];

export const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentItem = SORT_ITEMS.find((item) => item.id === value) || SORT_ITEMS[0];
  const CurrentIcon = currentItem.icon;

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (optionId: SortOption) => {
    onChange(optionId);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-right" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`inline-flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border cursor-pointer select-none ${
          isOpen
            ? 'bg-white border-[#0B3D42] ring-3 ring-[#0B3D42]/10 shadow-sm text-[#0B3D42]'
            : 'bg-white hover:bg-stone-50/90 border-stone-200/90 text-stone-800 shadow-2xs hover:border-stone-300'
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="w-5 h-5 rounded-md bg-[#0B3D42]/5 text-[#E17F3F] flex items-center justify-center shrink-0">
          <CurrentIcon className="w-3.5 h-3.5" />
        </div>

        <span className="text-stone-400 font-normal text-xs hidden xs:inline">ترتيب:</span>

        <span className="text-stone-800 font-bold whitespace-nowrap text-xs sm:text-sm">
          {currentItem.label}
        </span>

        <ChevronDown
          className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#0B3D42]' : ''
          }`}
        />
      </button>

      {/* Floating Menu Card */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="خيارات الترتيب"
          className="absolute left-0 rtl:right-auto sm:rtl:left-0 mt-2 w-72 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl shadow-stone-900/10 border border-stone-200/90 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 origin-top-left"
        >
          <div className="px-3 py-2 border-b border-stone-100 flex items-center justify-between text-[11px] font-bold text-stone-400">
            <span>ترتيب المنتجات حسب</span>
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
          </div>

          <div className="p-1 space-y-1">
            {SORT_ITEMS.map((item) => {
              const isSelected = item.id === value;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center justify-between gap-3 p-2.5 rounded-xl text-right transition-all duration-150 cursor-pointer group ${
                    isSelected
                      ? 'bg-[#0B3D42]/5 text-[#0B3D42] font-bold border border-[#0B3D42]/15 shadow-2xs'
                      : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#0B3D42] text-white shadow-xs'
                          : 'bg-stone-100 text-stone-500 group-hover:bg-[#0B3D42]/10 group-hover:text-[#0B3D42]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div>
                      <span className="block text-xs font-bold leading-snug">
                        {item.label}
                      </span>
                      <span className="block text-[10px] text-stone-400 font-normal leading-tight mt-0.5">
                        {item.sublabel}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#0B3D42] text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
