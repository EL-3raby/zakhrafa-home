'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { ProductRecord, CategoryRecord } from '@/types/database';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Loader2,
  AlertCircle,
  Star,
  ChevronRight,
  ChevronLeft,
  Tag,
  CheckCircle,
  Clock,
  ExternalLink,
} from 'lucide-react';

const ITEMS_PER_PAGE = 20;

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductRecord[]>([]);
  const [categories, setCategories] = useState<CategoryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Deletion Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<ProductRecord | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch Categories for filter dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('categories')
          .select('*')
          .order('display_order', { ascending: true });
        setCategories(data || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  // Fetch Products with filters and pagination
  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const supabase = createClient();

      let query = supabase
        .from('products')
        .select('*, category:categories(*)', { count: 'exact' });

      // Apply search filter
      if (searchTerm.trim()) {
        query = query.ilike('name', `%${searchTerm.trim()}%`);
      }

      // Apply category filter
      if (selectedCategory !== 'all') {
        query = query.eq('category_id', selectedCategory);
      }

      // Apply availability filter
      if (selectedAvailability !== 'all') {
        query = query.eq('availability_status', selectedAvailability);
      }

      // Pagination range
      const from = (currentPage - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      const { data, count, error } = await query
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      setProducts(data || []);
      setTotalCount(count || 0);
    } catch (err: unknown) {
      console.error('Error fetching products:', err);
      const msg = err instanceof Error ? err.message : 'فشل تحميل قائمة المنتجات من Supabase.';
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, selectedCategory, selectedAvailability, currentPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handle Delete Confirmation
  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);

    try {
      const supabase = createClient();

      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productToDelete.id);

      if (error) throw error;

      // Delete images from Cloudinary in the background
      if (productToDelete.images && productToDelete.images.length > 0) {
        const cloudinaryUrls = productToDelete.images.filter((img) =>
          img && img.includes('cloudinary.com')
        );
        if (cloudinaryUrls.length > 0) {
          fetch('/api/upload', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ urls: cloudinaryUrls }),
          }).catch((err) => console.error('Error cleaning up Cloudinary images:', err));
        }
      }

      await fetchProducts();
      setDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (err: unknown) {
      console.error('Error deleting product:', err);
      const msg = err instanceof Error ? err.message : 'حدث خطأ أثناء الحذف.';
      alert(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE) || 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#E17F3F] mb-1">
            <Package className="w-4 h-4" />
            <span>كتالوج المنتجات</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B3D42]">
            إدارة المنتجات
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            عرض وتعديل وإضافة منتجات الأثاث، الأسعار، العروض، وحالة التوفر
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 bg-[#E17F3F] hover:bg-[#C96A2D] text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة منتج جديد</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="البحث باسم المنتج..."
            className="w-full bg-stone-50 border border-stone-200 rounded-xl pr-10 pl-4 py-2 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D42]/20 focus:border-[#0B3D42] transition"
          />
        </div>

        {/* Category Filter */}
        <div className="w-full sm:w-48">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D42]/20 focus:border-[#0B3D42] transition cursor-pointer"
          >
            <option value="all">جميع الأقسام</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name_ar}
              </option>
            ))}
          </select>
        </div>

        {/* Availability Filter */}
        <div className="w-full sm:w-48">
          <select
            value={selectedAvailability}
            onChange={(e) => {
              setSelectedAvailability(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D42]/20 focus:border-[#0B3D42] transition cursor-pointer"
          >
            <option value="all">جميع الحالات</option>
            <option value="available_now">متوفر للتسليم الفوري</option>
            <option value="made_to_order">تنفيذ حسب الطلب</option>
          </select>
        </div>
      </div>

      {/* Error alert */}
      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3 text-stone-400">
            <Loader2 className="w-8 h-8 animate-spin text-[#E17F3F]" />
            <span className="text-xs font-semibold">جاري تحميل المنتجات من Supabase...</span>
          </div>
        ) : products.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
              <Package className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-stone-700">لا توجد منتجات مطابقة</p>
            <p className="text-xs text-stone-500">
              جرب تغيير كلمات البحث أو الفلاتر، أو أضف منتجاً جديداً الآن.
            </p>
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E17F3F] hover:underline pt-2"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة منتج جديد</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-stone-50/80 border-b border-stone-200 text-[11px] font-bold text-stone-600 uppercase">
                  <th className="py-3.5 px-4">المنتج</th>
                  <th className="py-3.5 px-4">القسم</th>
                  <th className="py-3.5 px-4">حالة التوفر</th>
                  <th className="py-3.5 px-4">السعر والخصم</th>
                  <th className="py-3.5 px-4 text-center">مميز</th>
                  <th className="py-3.5 px-4 text-left">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs sm:text-sm">
                {products.map((product) => {
                  const mainImage = product.images?.[0] || '';
                  const hasDiscount =
                    product.original_price &&
                    product.discount_price &&
                    product.discount_price < product.original_price;

                  const discountPercent = hasDiscount
                    ? Math.round(
                        ((product.original_price! - product.discount_price!) /
                          product.original_price!) *
                          100
                      )
                    : 0;

                  return (
                    <tr
                      key={product.id}
                      className="hover:bg-stone-50/70 transition-colors group"
                    >
                      {/* Product Name & Thumbnail */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                            {mainImage ? (
                              <Image
                                src={mainImage}
                                alt={product.name}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-stone-400">
                                <Package className="w-5 h-5" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-stone-900 group-hover:text-[#0B3D42] transition">
                              {product.name}
                            </div>
                            <div className="text-[11px] text-stone-400 font-mono mt-0.5 truncate max-w-[200px]" dir="ltr">
                              {product.slug}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <span className="text-xs font-semibold text-stone-700 bg-stone-100 px-2.5 py-1 rounded-lg">
                          {product.category?.name_ar || 'غير محدد'}
                        </span>
                      </td>

                      {/* Availability Status */}
                      <td className="py-3.5 px-4">
                        {product.availability_status === 'available_now' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                            <CheckCircle className="w-3 h-3" />
                            <span>متوفر للتسليم الفوري</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                            <Clock className="w-3 h-3" />
                            <span>تفصيل حسب الطلب</span>
                          </span>
                        )}
                      </td>

                      {/* Prices & Discount */}
                      <td className="py-3.5 px-4">
                        {product.original_price ? (
                          <div className="space-y-0.5">
                            {hasDiscount ? (
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-emerald-600 font-mono text-xs sm:text-sm">
                                  {product.discount_price?.toLocaleString()} ج.م
                                </span>
                                <span className="text-[11px] text-stone-400 line-through font-mono">
                                  {product.original_price?.toLocaleString()}
                                </span>
                                <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.2 rounded">
                                  -{discountPercent}%
                                </span>
                              </div>
                            ) : (
                              <div className="font-bold text-stone-800 font-mono text-xs sm:text-sm">
                                {product.original_price.toLocaleString()} ج.م
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-stone-400 font-medium">
                            السعر عند الطلب
                          </span>
                        )}
                      </td>

                      {/* Is Featured */}
                      <td className="py-3.5 px-4 text-center">
                        {product.is_featured ? (
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500 mx-auto" />
                        ) : (
                          <span className="text-stone-300 text-xs">—</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-left">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            className="p-1.5 text-stone-600 hover:text-[#0B3D42] hover:bg-stone-100 rounded-lg transition"
                            title="تعديل المنتج"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => {
                              setProductToDelete(product);
                              setDeleteModalOpen(true);
                            }}
                            className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                            title="حذف المنتج"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-stone-200 bg-stone-50/50 text-xs text-stone-600">
            <div>
              عرض{' '}
              <span className="font-bold text-stone-900">
                {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{' '}
                {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)}
              </span>{' '}
              من إجمالي <span className="font-bold text-stone-900">{totalCount}</span> منتج
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 disabled:opacity-30 transition cursor-pointer"
                title="الصفحة السابقة"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <span className="px-3 py-1 font-bold text-stone-800">
                صفحة {currentPage} من {totalPages}
              </span>

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 disabled:opacity-30 transition cursor-pointer"
                title="الصفحة التالية"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        title="تأكيد حذف المنتج"
        message="هل أنت متأكد من حذف هذا المنتج نهائياً من الكتالوج؟ لا يمكن التراجع عن هذه العملية."
        itemName={productToDelete?.name}
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setDeleteModalOpen(false);
          setProductToDelete(null);
        }}
        isLoading={isDeleting}
      />
    </div>
  );
}
