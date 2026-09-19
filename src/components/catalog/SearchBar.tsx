'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowLeft, Package } from 'lucide-react';
import { getAllProducts } from '@/data/mock-products';
import { Product } from '@/types/product';

interface SearchBarProps {
  value?: string;
  onChange?: (query: string) => void;
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value = '',
  onChange,
  onSearch,
  placeholder = 'ابحث عن منتج، خامة، أو قسم...',
}) => {
  const [query, setQuery] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const allProducts = useRef(getAllProducts());

  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Live search filtering
  useEffect(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const matched = allProducts.current.filter((p) => {
      const name = p.name_ar.toLowerCase();
      const desc = p.description_ar.toLowerCase();
      const material = (p.material || '').toLowerCase();
      const color = (p.color || '').toLowerCase();
      return (
        name.includes(trimmed) ||
        desc.includes(trimmed) ||
        material.includes(trimmed) ||
        color.includes(trimmed)
      );
    });

    setResults(matched.slice(0, 5));
    setIsOpen(true);
  }, [query]);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setQuery(text);
    if (onChange) onChange(text);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    if (onChange) onChange('');
    if (onSearch) onSearch('');
  };

  const router = useRouter();

  const handleExecuteSearch = (customQuery?: string) => {
    const q = (customQuery ?? query).trim();
    setIsOpen(false);
    if (onSearch) {
      onSearch(q);
    } else if (q) {
      router.push(`/categories?search=${encodeURIComponent(q)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleExecuteSearch();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      {/* Search Input Container */}
      <div className="relative flex items-center bg-slate-100/90 hover:bg-slate-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0B3D42] focus-within:shadow-md transition-all duration-200 rounded-full px-4 py-2.5 sm:py-3 border border-gray-200/80">
        <Search className="w-5 h-5 text-gray-400 focus-within:text-[#0B3D42] shrink-0 stroke-[2]" />

        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          placeholder={placeholder}
          className="w-full bg-transparent border-none outline-hidden px-3 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 font-medium"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200/60 transition shrink-0"
            aria-label="مسح البحث"
          >
            <X className="w-4 h-4 stroke-[2]" />
          </button>
        )}
      </div>

      {/* Live Search Autocomplete Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 inset-x-0 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-2 text-[11px] font-semibold text-gray-400 border-b border-gray-100 flex items-center justify-between">
            <span>النتائج المطابقة ({results.length})</span>
            <span>اضغط Enter للبحث الشامل</span>
          </div>

          <div className="divide-y divide-gray-50 max-h-80 overflow-y-auto">
            {results.map((product) => {
              const primaryImg =
                product.images.find((img) => img.is_primary) || product.images[0];
              const price = product.discount_price || product.price;

              return (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition group"
                >
                  {/* Thumbnail */}
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-gray-100">
                    {primaryImg ? (
                      <Image
                        src={primaryImg.url}
                        alt={product.name_ar}
                        fill
                        sizes="48px"
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <Package className="w-5 h-5" />
                      </div>
                    )}
                  </div>

                  {/* Title & Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-[#0B3D42] group-hover:text-[#E17F3F] transition-colors truncate">
                      {product.name_ar}
                    </h4>
                    <p className="text-[11px] text-gray-400 truncate mt-0.5">
                      {product.material || product.description_ar}
                    </p>
                  </div>

                  {/* Price & Arrow */}
                  <div className="text-left shrink-0">
                    {product.is_price_on_request ? (
                      <span className="text-[11px] font-bold text-[#E17F3F]">عند الطلب</span>
                    ) : (
                      <span className="text-xs font-black text-[#0B3D42]">
                        {price ? new Intl.NumberFormat('ar-EG').format(price) : ''}{' '}
                        <span className="text-[10px] font-normal text-gray-500">ج.م</span>
                      </span>
                    )}
                    <div className="flex items-center justify-end text-gray-400 group-hover:text-[#0B3D42] transition">
                      <ArrowLeft className="w-3 h-3 stroke-[2]" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* View All Matches Button */}
          <div className="pt-2 border-t border-gray-100 mt-1">
            <button
              type="button"
              onClick={() => handleExecuteSearch()}
              className="w-full py-2 px-3 text-center text-xs font-semibold text-[#0B3D42] hover:text-[#E17F3F] hover:bg-slate-50 rounded-lg transition"
            >
              عرض كافة النتائج لـ &ldquo;{query}&rdquo;
            </button>
          </div>
        </div>
      )}

      {/* No Results Found Dropdown */}
      {isOpen && results.length === 0 && query.trim() && (
        <div className="absolute top-full mt-2 inset-x-0 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 z-50 text-center text-xs text-gray-500">
          لم يتم العثور على منتجات تطابق &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
};
