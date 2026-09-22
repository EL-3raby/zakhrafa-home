'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { CategoryRecord } from '@/types/database';
import { DynamicLucideIcon } from '@/components/common/DynamicLucideIcon';
import { CategoryFormModal } from '@/components/admin/CategoryFormModal';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import {
  FolderTree,
  Plus,
  ArrowUp,
  ArrowDown,
  Edit2,
  Trash2,
  Loader2,
  AlertCircle,
  Tag,
  Search,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryRecord | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<CategoryRecord | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const supabase = createClient();

      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        throw error;
      }

      setCategories(data || []);
    } catch (err: unknown) {
      console.error('Error fetching categories:', err);
      const msg = err instanceof Error ? err.message : 'فشل تحميل بيانات الفئات من Supabase.';
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Handle Save (Create or Update)
  const handleSaveCategory = async (categoryData: Partial<CategoryRecord>) => {
    setIsSaving(true);
    try {
      const supabase = createClient();

      if (editingCategory) {
        // Update existing category
        const { error } = await supabase
          .from('categories')
          .update(categoryData)
          .eq('id', editingCategory.id);

        if (error) throw error;
      } else {
        // Create new category
        const { error } = await supabase
          .from('categories')
          .insert([categoryData]);

        if (error) throw error;
      }

      await fetchCategories();
      setIsFormOpen(false);
      setEditingCategory(null);
    } catch (err: unknown) {
      console.error('Error saving category:', err);
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Order Shift (Up or Down)
  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= categories.length) return;

    const currentCat = categories[index];
    const targetCat = categories[targetIndex];

    try {
      const supabase = createClient();

      // Swap display_order
      const tempOrder = currentCat.display_order;
      const newCurrentOrder = targetCat.display_order;
      const newTargetOrder = tempOrder;

      // Optimistic update
      const updatedList = [...categories];
      updatedList[index] = { ...currentCat, display_order: newCurrentOrder };
      updatedList[targetIndex] = { ...targetCat, display_order: newTargetOrder };
      updatedList.sort((a, b) => a.display_order - b.display_order);
      setCategories(updatedList);

      // Persist to Supabase
      await Promise.all([
        supabase.from('categories').update({ display_order: newCurrentOrder }).eq('id', currentCat.id),
        supabase.from('categories').update({ display_order: newTargetOrder }).eq('id', targetCat.id),
      ]);
    } catch (err) {
      console.error('Error updating order:', err);
      fetchCategories();
    }
  };

  // Handle Delete Confirmation
  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return;
    setIsDeleting(true);

    try {
      const supabase = createClient();

      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryToDelete.id);

      if (error) throw error;

      // Delete image from Cloudinary in the background
      if (categoryToDelete.image && categoryToDelete.image.includes('cloudinary.com')) {
        fetch('/api/upload', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: categoryToDelete.image }),
        }).catch((err) => console.error('Error cleaning up category image from Cloudinary:', err));
      }

      await fetchCategories();
      setDeleteModalOpen(false);
      setCategoryToDelete(null);
    } catch (err: unknown) {
      console.error('Error deleting category:', err);
      const msg = err instanceof Error ? err.message : 'حدث خطأ أثناء الحذف.';
      alert(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredCategories = categories.filter((c) =>
    c.name_ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#E17F3F] mb-1">
            <FolderTree className="w-4 h-4" />
            <span>إدارة الكتالوج</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B3D42]">
            الفئات والأقسام
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            إدارة أقسام الأثاث، صورها، أيقوناتها، وترتيب ظهورها في المتجر
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingCategory(null);
            setIsFormOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 bg-[#E17F3F] hover:bg-[#C96A2D] text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة فئة جديدة</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-stone-200 shadow-2xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="البحث في الفئات بالاسم أو الرابط..."
            className="w-full bg-stone-50 border border-stone-200 rounded-xl pr-10 pl-4 py-2 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D42]/20 focus:border-[#0B3D42] transition"
          />
        </div>
        <div className="text-xs font-semibold text-stone-500 shrink-0 px-2">
          إجمالي الفئات: <span className="text-[#0B3D42] font-bold">{categories.length}</span>
        </div>
      </div>

      {/* Error message */}
      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Categories Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-4 sm:p-6 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3.5 rounded-xl bg-stone-50/70 border border-stone-100"
              >
                <div className="flex items-center gap-3.5">
                  <Skeleton className="w-12 h-12 rounded-xl bg-stone-200 shrink-0" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-40 sm:w-56 rounded bg-stone-200" />
                    <Skeleton className="h-3 w-24 rounded bg-stone-100" />
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-6">
                  <Skeleton className="h-5 w-20 rounded-full bg-stone-100" />
                  <Skeleton className="h-5 w-16 rounded bg-stone-200" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-lg bg-stone-100" />
                  <Skeleton className="h-8 w-8 rounded-lg bg-stone-100" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
              <FolderTree className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-stone-700">لا توجد فئات حالياً</p>
            <p className="text-xs text-stone-500">
              قم بإضافة فئة جديدة للبدء في تنظيم كتالوج المتجر.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-stone-50/80 border-b border-stone-200 text-[11px] font-bold text-stone-600 uppercase">
                  <th className="py-3 px-4 w-20 text-center">الترتيب</th>
                  <th className="py-3 px-4">الفئة</th>
                  <th className="py-3 px-4">الرابط (Slug)</th>
                  <th className="py-3 px-4 text-center">الأيقونة</th>
                  <th className="py-3 px-4">الشارة</th>
                  <th className="py-3 px-4 text-left">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs sm:text-sm">
                {filteredCategories.map((cat, index) => (
                  <tr
                    key={cat.id}
                    className="hover:bg-stone-50/70 transition-colors group"
                  >
                    {/* Order Controls */}
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleMoveOrder(index, 'up')}
                          disabled={index === 0}
                          className="p-1 rounded hover:bg-stone-200 text-stone-500 hover:text-stone-900 disabled:opacity-20 disabled:hover:bg-transparent cursor-pointer"
                          title="تحريك لأعلى"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono text-xs font-bold text-stone-700 w-5 text-center">
                          {cat.display_order}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleMoveOrder(index, 'down')}
                          disabled={index === filteredCategories.length - 1}
                          className="p-1 rounded hover:bg-stone-200 text-stone-500 hover:text-stone-900 disabled:opacity-20 disabled:hover:bg-transparent cursor-pointer"
                          title="تحريك لأسفل"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* Category Image & Name */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                          {cat.image ? (
                            <Image
                              src={cat.image}
                              alt={cat.name_ar}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-stone-400">
                              <FolderTree className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-stone-900">{cat.name_ar}</div>
                          <div className="text-xs text-stone-500 font-sans" dir="ltr">
                            {cat.name_en}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Slug */}
                    <td className="py-3 px-4 font-mono text-xs text-stone-600" dir="ltr">
                      {cat.slug}
                    </td>

                    {/* Icon */}
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#0B3D42]/10 text-[#0B3D42]">
                        <DynamicLucideIcon name={cat.icon_name} className="w-4 h-4" />
                      </div>
                    </td>

                    {/* Badge Label */}
                    <td className="py-3 px-4">
                      {cat.badge_label ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E17F3F]/10 text-[#E17F3F]">
                          <Tag className="w-3 h-3" />
                          <span>{cat.badge_label}</span>
                        </span>
                      ) : (
                        <span className="text-stone-300 text-xs">—</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-left">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCategory(cat);
                            setIsFormOpen(true);
                          }}
                          className="p-1.5 text-stone-600 hover:text-[#0B3D42] hover:bg-stone-100 rounded-lg transition cursor-pointer"
                          title="تعديل الفئة"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setCategoryToDelete(cat);
                            setDeleteModalOpen(true);
                          }}
                          className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                          title="حذف الفئة"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Form Modal */}
      <CategoryFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingCategory(null);
        }}
        onSave={handleSaveCategory}
        initialData={editingCategory}
        isLoading={isSaving}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        title="تأكيد حذف الفئة"
        message="هل أنت متأكد من رغبتك في حذف هذه الفئة نهائياً؟ تنبيه: قد يؤدي ذلك إلى حذف أو فصل جميع المنتجات المرتبطة بها."
        itemName={categoryToDelete?.name_ar}
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setDeleteModalOpen(false);
          setCategoryToDelete(null);
        }}
        isLoading={isDeleting}
      />
    </div>
  );
}
