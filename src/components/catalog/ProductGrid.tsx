'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { SlidersHorizontal, ArrowUpDown, X, PackageOpen, LayoutGrid, Square } from 'lucide-react';
import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';
import { ProductFilters, FilterState } from './ProductFilters';
import { Pagination } from './Pagination';
import { SortDropdown, SortOption } from './SortDropdown';

interface ProductGridProps {
  initialProducts: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ initialProducts }) => {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [mobileLayout, setMobileLayout] = useState<'grid' | 'single'>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const catalogTopRef = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState<FilterState>({
    selectedMaterials: [],
    selectedColors: [],
    stockStatus: 'all',
    onlyOffers: false,
    minPrice: undefined,
    maxPrice: undefined,
  });

  // Check URL query parameters for offers=true
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('offers') === 'true') {
        setFilters((prev) => ({ ...prev, onlyOffers: true }));
      }
    }
  }, []);

  const handleResetFilters = () => {
    setFilters({
      selectedMaterials: [],
      selectedColors: [],
      stockStatus: 'all',
      onlyOffers: false,
      minPrice: undefined,
      maxPrice: undefined,
    });
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // 0. Only Offers filter
      if (filters.onlyOffers && !product.discount_price) {
        return false;
      }

      // 1. Stock Status
      if (filters.stockStatus && filters.stockStatus !== 'all') {
        if (product.stock_status !== filters.stockStatus) return false;
      }

      // 2. Materials
      if (filters.selectedMaterials.length > 0) {
        const productMaterials = product.materials || [product.material || ''];
        const hasMatchingMaterial = filters.selectedMaterials.some((selectedMat) =>
          productMaterials.some((pm) => pm.toLowerCase().includes(selectedMat.toLowerCase()))
        );
        if (!hasMatchingMaterial) return false;
      }

      // 3. Colors
      if (filters.selectedColors.length > 0) {
        const productColors = product.colors || [product.color || ''];
        const hasMatchingColor = filters.selectedColors.some((selectedColor) =>
          productColors.some((pc) => pc.toLowerCase().includes(selectedColor.toLowerCase()))
        );
        if (!hasMatchingColor) return false;
      }

      // 4. Price range
      const effectivePrice = product.discount_price || product.price || 0;
      if (filters.minPrice !== undefined && effectivePrice < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice !== undefined && effectivePrice > filters.maxPrice) {
        return false;
      }

      // 5. Search Query
      if (filters.searchQuery && filters.searchQuery.trim()) {
        const q = filters.searchQuery.trim().toLowerCase();
        const name = product.name_ar.toLowerCase();
        const desc = product.description_ar.toLowerCase();
        const mat = (product.material || '').toLowerCase();
        const color = (product.color || '').toLowerCase();
        if (
          !name.includes(q) &&
          !desc.includes(q) &&
          !mat.includes(q) &&
          !color.includes(q)
        ) {
          return false;
        }
      }

      return true;
    });
  }, [initialProducts, filters]);

  // Sort
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'price_asc':
        return list.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'price_desc':
        return list.sort((a, b) => (b.price || 0) - (a.price || 0));
      case 'newest':
        return list.sort((a, b) => (b.is_new_arrival ? 1 : 0) - (a.is_new_arrival ? 1 : 0));
      case 'featured':
      default:
        return list.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
    }
  }, [filteredProducts, sortBy]);

  // Reset to page 1 on filter, sort, or per-page limit change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy, itemsPerPage]);

  // Pagination calculations
  const totalItems = sortedProducts.length;
  const effectiveLimit = itemsPerPage === -1 ? totalItems : itemsPerPage;
  const totalPages = Math.ceil(totalItems / effectiveLimit) || 1;
  const startIndex = (currentPage - 1) * effectiveLimit;
  const endIndex = Math.min(startIndex + effectiveLimit, totalItems);
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  // Smooth scroll handler on page change
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    if (catalogTopRef.current) {
      catalogTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Active filters count
  const activeFiltersCount =
    filters.selectedMaterials.length +
    filters.selectedColors.length +
    (filters.stockStatus && filters.stockStatus !== 'all' ? 1 : 0) +
    (filters.minPrice || filters.maxPrice ? 1 : 0) +
    (filters.searchQuery?.trim() ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Desktop & Mobile Filters */}
        <ProductFilters
          filters={filters}
          onFilterChange={setFilters}
          onReset={handleResetFilters}
          totalFilteredCount={sortedProducts.length}
          isMobileOpen={mobileFilterOpen}
          onCloseMobile={() => setMobileFilterOpen(false)}
        />

        {/* Catalog Main Content */}
        <main className="flex-1 w-full space-y-6">
          {/* Controls Bar: Results Count, Mobile Filter Button, Sort Dropdown */}
          <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
            <div className="flex items-center gap-3">
              {/* Mobile Filter Trigger Button */}
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-[#0B3D42] px-3.5 py-2 rounded-xl text-xs font-semibold transition"
              >
                <SlidersHorizontal className="w-4 h-4 stroke-[1.75]" />
                <span>الفلاتر</span>
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#E17F3F] text-white text-[10px] font-bold flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                عرض <span className="font-bold text-[#0B3D42]">{totalItems > 0 ? `${startIndex + 1} - ${endIndex}` : 0}</span> من أصل <span className="font-bold text-[#0B3D42]">{totalItems}</span> تصميم
              </p>
            </div>

            {/* Sort & Mobile View Switcher */}
            <div className="flex items-center gap-2">
              {/* Mobile View Toggle (Grid 2-col vs Single-col) */}
              <div className="flex sm:hidden items-center p-1 rounded-xl bg-stone-100 border border-stone-200/80">
                <button
                  type="button"
                  onClick={() => setMobileLayout('grid')}
                  aria-label="عرض شبكي كرتين"
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    mobileLayout === 'grid'
                      ? 'bg-white text-[#0B3D42] shadow-2xs'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                  title="عرض عمودين"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setMobileLayout('single')}
                  aria-label="عرض بطاقة عريضة"
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    mobileLayout === 'single'
                      ? 'bg-white text-[#0B3D42] shadow-2xs'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                  title="عرض كرت عريض"
                >
                  <Square className="w-3.5 h-3.5" />
                </button>
              </div>

              <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>
          </div>

          {/* Active filter badges */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-gray-500">الفلاتر المطبقة:</span>

              {filters.searchQuery && (
                <span className="inline-flex items-center gap-1 bg-[#EDF5F6] text-[#0B3D42] text-xs px-2.5 py-1 rounded-lg">
                  <span>بحث: &ldquo;{filters.searchQuery}&rdquo;</span>
                  <button
                    onClick={() => setFilters({ ...filters, searchQuery: '' })}
                    className="hover:text-red-500"
                    aria-label="مسح كلمة البحث"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {filters.stockStatus && filters.stockStatus !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-[#EDF5F6] text-[#0B3D42] text-xs px-2.5 py-1 rounded-lg">
                  <span>
                    {filters.stockStatus === 'in_stock'
                      ? 'متوفر في المعرض'
                      : 'تفصيل حسب الطلب'}
                  </span>
                  <button
                    onClick={() => setFilters({ ...filters, stockStatus: 'all' })}
                    className="hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {filters.selectedMaterials.map((mat) => (
                <span
                  key={mat}
                  className="inline-flex items-center gap-1 bg-[#EDF5F6] text-[#0B3D42] text-xs px-2.5 py-1 rounded-lg"
                >
                  <span>{mat}</span>
                  <button
                    onClick={() =>
                      setFilters({
                        ...filters,
                        selectedMaterials: filters.selectedMaterials.filter((m) => m !== mat),
                      })
                    }
                    className="hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {filters.selectedColors.map((color) => (
                <span
                  key={color}
                  className="inline-flex items-center gap-1 bg-[#EDF5F6] text-[#0B3D42] text-xs px-2.5 py-1 rounded-lg"
                >
                  <span>لون: {color}</span>
                  <button
                    onClick={() =>
                      setFilters({
                        ...filters,
                        selectedColors: filters.selectedColors.filter((c) => c !== color),
                      })
                    }
                    className="hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {(filters.minPrice !== undefined || filters.maxPrice !== undefined) && (
                <span className="inline-flex items-center gap-1 bg-[#EDF5F6] text-[#0B3D42] text-xs px-2.5 py-1 rounded-lg">
                  <span>
                    السعر: {filters.minPrice || 0} - {filters.maxPrice || 'الكل'} ج.م
                  </span>
                  <button
                    onClick={() =>
                      setFilters({ ...filters, minPrice: undefined, maxPrice: undefined })
                    }
                    className="hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {filters.onlyOffers && (
                <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 border border-red-200 text-xs px-2.5 py-1 rounded-lg font-bold">
                  <span>القطع في العرض فقط</span>
                  <button
                    onClick={() => setFilters({ ...filters, onlyOffers: false })}
                    className="hover:text-red-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                onClick={handleResetFilters}
                className="text-xs text-[#E17F3F] hover:underline font-semibold pr-2"
              >
                مسح الكل
              </button>
            </div>
          )}

          {/* Scroll anchor target for smooth pagination scroll */}
          <div ref={catalogTopRef} className="scroll-mt-28" />

          {/* Products Grid */}
          {sortedProducts.length > 0 ? (
            <div className="space-y-8">
              <div
                className={`grid ${
                  mobileLayout === 'grid'
                    ? 'grid-cols-2 gap-2.5 sm:gap-6'
                    : 'grid-cols-1 gap-4 sm:gap-6'
                } sm:grid-cols-2 xl:grid-cols-3`}
              >
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Luxury Pagination Component */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                startIndex={startIndex}
                endIndex={endIndex}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={(limit) => setItemsPerPage(limit)}
              />
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center space-y-4 shadow-xs">
              <div className="w-14 h-14 rounded-full bg-slate-100 text-gray-400 mx-auto flex items-center justify-center">
                <PackageOpen className="w-7 h-7 stroke-[1.5]" />
              </div>
              <h3 className="text-lg font-bold text-[#0B3D42]">
                لا توجد تصاميم مطابقة لهذه الخيارات
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
                جرب تغيير معايير البحث أو مسح الفلاتر المحددة لمشاهدة باقي تشكيلة الكتالوج.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 bg-[#0B3D42] hover:bg-[#07262A] text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-xs transition"
              >
                <span>عرض جميع المنتجات</span>
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
