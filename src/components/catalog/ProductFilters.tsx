'use client';

import React from 'react';
import { Filter, X, RotateCcw, Check, Tag } from 'lucide-react';
import { StockStatus } from '@/types/product';

export interface FilterState {
  selectedMaterials: string[];
  selectedColors: string[];
  stockStatus?: StockStatus | 'all';
  onlyOffers?: boolean;
  minPrice?: number;
  maxPrice?: number;
  searchQuery?: string;
}

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  totalFilteredCount: number;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const AVAILABLE_MATERIALS = [
  'خشب زان',
  'قماش مخمل',
  'رخام طبيعي',
  'ستانلس ستيل',
  'خشب جوز',
  'جلد طبيعي',
  'كتان طبيعي',
];

export const AVAILABLE_COLORS = [
  { name: 'بيج', hex: '#E6DCB8' },
  { name: 'رمادي', hex: '#9E9E9E' },
  { name: 'أخضر زيتي', hex: '#4A5D4E' },
  { name: 'كحلي', hex: '#1E2F4D' },
  { name: 'بني', hex: '#6D4C41' },
  { name: 'ذهبي', hex: '#D4AF37' },
  { name: 'أسود', hex: '#212121' },
];

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalFilteredCount,
  isMobileOpen,
  onCloseMobile,
}) => {
  const toggleMaterial = (mat: string) => {
    const next = filters.selectedMaterials.includes(mat)
      ? filters.selectedMaterials.filter((m) => m !== mat)
      : [...filters.selectedMaterials, mat];
    onFilterChange({ ...filters, selectedMaterials: next });
  };

  const toggleColor = (colorName: string) => {
    const next = filters.selectedColors.includes(colorName)
      ? filters.selectedColors.filter((c) => c !== colorName)
      : [...filters.selectedColors, colorName];
    onFilterChange({ ...filters, selectedColors: next });
  };

  const setStockStatus = (status: StockStatus | 'all') => {
    onFilterChange({ ...filters, stockStatus: status });
  };

  const setPriceRange = (min?: number, max?: number) => {
    onFilterChange({ ...filters, minPrice: min, maxPrice: max });
  };

  const hasActiveFilters =
    Boolean(filters.onlyOffers) ||
    filters.selectedMaterials.length > 0 ||
    filters.selectedColors.length > 0 ||
    (filters.stockStatus && filters.stockStatus !== 'all') ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined;

  const FilterContent = (
    <div className="space-y-6">
      {/* Header and Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2 text-[#0B3D42]">
          <Filter className="w-4 h-4 stroke-[1.75]" />
          <h2 className="font-bold text-sm">تصفية المنتجات</h2>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-xs text-[#E17F3F] hover:text-[#C96A2D] font-medium flex items-center gap-1 transition"
          >
            <RotateCcw className="w-3 h-3 stroke-[2]" />
            <span>إعادة تعيين</span>
          </button>
        )}
      </div>

      {/* Special Offers Filter - Luxury Brand-Aligned Card */}
      <button
        type="button"
        onClick={() => onFilterChange({ ...filters, onlyOffers: !filters.onlyOffers })}
        aria-pressed={Boolean(filters.onlyOffers)}
        className={`w-full text-right p-3 rounded-xl border transition-all duration-300 relative overflow-hidden group focus:outline-none select-none cursor-pointer ${
          filters.onlyOffers
            ? 'bg-[#0B3D42] text-white border-[#0B3D42] shadow-md shadow-[#0B3D42]/15'
            : 'bg-[#FAF9F5] hover:bg-white border-stone-200/90 hover:border-[#0B3D42]/30 shadow-2xs'
        }`}
      >
        {/* Top Header Row: Icon + Title on Right, Switch on Left */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                filters.onlyOffers
                  ? 'bg-white/15 text-[#E17F3F]'
                  : 'bg-[#0B3D42]/5 text-[#0B3D42] group-hover:bg-[#E17F3F]/10 group-hover:text-[#E17F3F]'
              }`}
            >
              <Tag className="w-3.5 h-3.5 stroke-[2.2]" />
            </div>
            <span
              className={`text-xs font-bold whitespace-nowrap transition-colors ${
                filters.onlyOffers ? 'text-white' : 'text-stone-900 group-hover:text-[#0B3D42]'
              }`}
            >
              عروض وتخفيضات
            </span>
          </div>

          {/* Luxury iOS-style Toggle Switch */}
          <div className="shrink-0" aria-hidden="true">
            <div
              className={`w-9 h-5 rounded-full transition-colors duration-200 relative p-0.5 flex items-center ${
                filters.onlyOffers ? 'bg-[#E17F3F]' : 'bg-stone-300 group-hover:bg-stone-400'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform duration-200 ease-out ${
                  filters.onlyOffers ? '-translate-x-4' : 'translate-x-0'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Subtitle description on single line */}
        <p
          className={`text-[11px] mt-1.5 transition-colors whitespace-nowrap ${
            filters.onlyOffers ? 'text-stone-300' : 'text-stone-500'
          }`}
        >
          إظهار القطع المخفضة فقط
        </p>

        {/* Active state footer indicator */}
        {filters.onlyOffers && (
          <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
            <span className="flex items-center gap-1.5 text-emerald-300 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              مفعّل حالياً
            </span>
            <span className="text-stone-300 text-[10px]">
              انقر للإلغاء
            </span>
          </div>
        )}
      </button>

      {/* 1. Stock Status */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-[#0B3D42] tracking-wide">حالة التوفر</h3>
        <div className="flex flex-col gap-2.5 text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-gray-700">
            <input
              type="radio"
              name="stock"
              checked={!filters.stockStatus || filters.stockStatus === 'all'}
              onChange={() => setStockStatus('all')}
              className="accent-[#0B3D42] w-3.5 h-3.5"
            />
            <span>جميع القطع</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-gray-700">
            <input
              type="radio"
              name="stock"
              checked={filters.stockStatus === 'in_stock'}
              onChange={() => setStockStatus('in_stock')}
              className="accent-[#0B3D42] w-3.5 h-3.5"
            />
            <span>متوفر في المعرض للتسليم الفوري</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-gray-700">
            <input
              type="radio"
              name="stock"
              checked={filters.stockStatus === 'made_to_order'}
              onChange={() => setStockStatus('made_to_order')}
              className="accent-[#0B3D42] w-3.5 h-3.5"
            />
            <span>تنفيذ وتفصيل حسب الطلب</span>
          </label>
        </div>
      </div>

      {/* 2. Materials */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-[#0B3D42] tracking-wide">نوع الخامة</h3>
        <div className="flex flex-col gap-2 text-xs max-h-48 overflow-y-auto pr-1">
          {AVAILABLE_MATERIALS.map((mat) => {
            const isChecked = filters.selectedMaterials.includes(mat);
            return (
              <label
                key={mat}
                className="flex items-center justify-between cursor-pointer text-gray-700 hover:text-[#0B3D42] py-0.5"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleMaterial(mat)}
                    className="rounded-sm accent-[#0B3D42] w-3.5 h-3.5"
                  />
                  <span>{mat}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* 3. Colors */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-[#0B3D42] tracking-wide">الألوان المفضلة</h3>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_COLORS.map((c) => {
            const isSelected = filters.selectedColors.includes(c.name);
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => toggleColor(c.name)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs transition border ${
                  isSelected
                    ? 'border-[#0B3D42] bg-[#0B3D42]/5 text-[#0B3D42] font-semibold'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                  style={{ backgroundColor: c.hex }}
                />
                <span>{c.name}</span>
                {isSelected && <Check className="w-3 h-3 stroke-[2] text-[#0B3D42]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Price range presets */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-[#0B3D42] tracking-wide">نطاق السعر</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            type="button"
            onClick={() => setPriceRange(undefined, 5000)}
            className={`py-1.5 px-2 rounded-lg border text-center transition ${
              filters.maxPrice === 5000 && !filters.minPrice
                ? 'bg-[#0B3D42] text-white border-[#0B3D42]'
                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            أقل من 5,000 ج.م
          </button>
          <button
            type="button"
            onClick={() => setPriceRange(5000, 10000)}
            className={`py-1.5 px-2 rounded-lg border text-center transition ${
              filters.minPrice === 5000 && filters.maxPrice === 10000
                ? 'bg-[#0B3D42] text-white border-[#0B3D42]'
                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            5,000 - 10,000 ج.م
          </button>
          <button
            type="button"
            onClick={() => setPriceRange(10000, 15000)}
            className={`py-1.5 px-2 rounded-lg border text-center transition ${
              filters.minPrice === 10000 && filters.maxPrice === 15000
                ? 'bg-[#0B3D42] text-white border-[#0B3D42]'
                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            10,000 - 15,000 ج.م
          </button>
          <button
            type="button"
            onClick={() => setPriceRange(15000, undefined)}
            className={`py-1.5 px-2 rounded-lg border text-center transition ${
              filters.minPrice === 15000 && !filters.maxPrice
                ? 'bg-[#0B3D42] text-white border-[#0B3D42]'
                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            أكثر من 15,000 ج.م
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-[140px] bg-white rounded-2xl border border-gray-100 p-6 shadow-xs">
          {FilterContent}
        </div>
      </aside>

      {/* Mobile Drawer (Modal) */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer content */}
          <div className="relative mr-auto w-full max-w-xs bg-white h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                <span className="font-bold text-[#0B3D42] text-base">خيارات الفلترة</span>
                <button
                  onClick={onCloseMobile}
                  className="p-1 rounded-md text-gray-500 hover:text-gray-800"
                >
                  <X className="w-5 h-5 stroke-[1.75]" />
                </button>
              </div>
              {FilterContent}
            </div>

            <div className="pt-6 border-t border-gray-100 mt-8">
              <button
                onClick={onCloseMobile}
                className="w-full bg-[#E17F3F] text-white py-3 rounded-xl font-bold text-sm shadow-xs hover:bg-[#C96A2D] transition"
              >
                عرض النتائج ({totalFilteredCount})
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
