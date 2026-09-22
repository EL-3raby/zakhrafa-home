'use client';

import React, { useState, useEffect } from 'react';
import { CategoryRecord, POPULAR_LUCIDE_ICONS } from '@/types/database';
import { DynamicLucideIcon } from '@/components/common/DynamicLucideIcon';
import { CloudinaryImageUpload } from '@/components/common/CloudinaryImageUpload';
import { generateSlug } from '@/lib/slugify';
import { X, Loader2, Save } from 'lucide-react';

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (categoryData: Partial<CategoryRecord>) => Promise<void>;
  initialData?: CategoryRecord | null;
  isLoading?: boolean;
}

export const CategoryFormModal: React.FC<CategoryFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  isLoading = false,
}) => {
  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [slug, setSlug] = useState('');
  const [image, setImage] = useState('');
  const [iconName, setIconName] = useState('Sofa');
  const [badgeLabel, setBadgeLabel] = useState('');
  const [displayOrder, setDisplayOrder] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setNameAr(initialData.name_ar || '');
      setNameEn(initialData.name_en || '');
      setSlug(initialData.slug || '');
      setImage(initialData.image || '');
      setIconName(initialData.icon_name || 'Sofa');
      setBadgeLabel(initialData.badge_label || '');
      setDisplayOrder(initialData.display_order ?? 0);
    } else {
      setNameAr('');
      setNameEn('');
      setSlug('');
      setImage('');
      setIconName('Sofa');
      setBadgeLabel('');
      setDisplayOrder(0);
    }
    setErrorMessage(null);
  }, [initialData, isOpen]);

  // Auto-generate slug when name_en or name_ar changes (if creating new)
  const handleNameEnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNameEn(val);
    if (!initialData) {
      setSlug(generateSlug(val || nameAr));
    }
  };

  const handleNameArChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNameAr(val);
    if (!initialData && !nameEn) {
      setSlug(generateSlug(val));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!nameAr.trim() || !nameEn.trim()) {
      setErrorMessage('يرجى كتابة اسم الفئة باللغتين العربية والإنجليزية.');
      return;
    }

    if (!slug.trim()) {
      setErrorMessage('يرجى تحديد الرابط التعريفي (Slug).');
      return;
    }

    if (!image.trim()) {
      setErrorMessage('يرجى رفع صورة للفئة إلى Cloudinary.');
      return;
    }

    try {
      await onSave({
        name_ar: nameAr.trim(),
        name_en: nameEn.trim(),
        slug: slug.trim(),
        image: image.trim(),
        icon_name: iconName.trim() || 'FolderTree',
        badge_label: badgeLabel.trim() || null,
        display_order: Number(displayOrder) || 0,
      });
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ أثناء حفظ الفئة.';
      setErrorMessage(msg);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto"
      dir="rtl"
    >
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6 text-right my-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#0B3D42]">
              {initialData ? 'تعديل الفئة' : 'إضافة فئة جديدة'}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              بيانات وتصنيفات أقسام الأثاث في الكتالوج
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700">
                الاسم بالعربية <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={nameAr}
                onChange={handleNameArChange}
                placeholder="مثال: غرف المعيشة والصالونات"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D42]/20 focus:border-[#0B3D42] transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700">
                الاسم بالإنجليزية <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={nameEn}
                onChange={handleNameEnChange}
                placeholder="مثال: Living Rooms"
                dir="ltr"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D42]/20 focus:border-[#0B3D42] transition text-left"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700">
                الرابط التعريفي (Slug) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="living-rooms"
                dir="ltr"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm font-mono text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D42]/20 focus:border-[#0B3D42] transition text-left"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700">
                ترتيب العرض (Display Order)
              </label>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                placeholder="1"
                dir="ltr"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D42]/20 focus:border-[#0B3D42] transition text-left"
              />
            </div>
          </div>

          {/* Icon Picker & Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700">
                أيقونة الفئة (Lucide Icon)
              </label>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-[#0B3D42]/10 text-[#0B3D42] flex items-center justify-center shrink-0 border border-stone-200">
                  <DynamicLucideIcon name={iconName} className="w-5 h-5" />
                </div>
                <select
                  value={iconName}
                  onChange={(e) => setIconName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D42]/20 focus:border-[#0B3D42] transition cursor-pointer"
                >
                  {POPULAR_LUCIDE_ICONS.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700">
                شارة مخصصة (اختياري)
              </label>
              <input
                type="text"
                value={badgeLabel}
                onChange={(e) => setBadgeLabel(e.target.value)}
                placeholder="مثال: الأكثر طلباً، جديد"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D42]/20 focus:border-[#0B3D42] transition"
              />
            </div>
          </div>

          {/* Category Image */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-700">
              صورة الفئة الرئيسية (Cloudinary) <span className="text-red-500">*</span>
            </label>
            <CloudinaryImageUpload
              currentImageUrl={image}
              onUploadSuccess={(res) => setImage(res.url)}
              onRemove={() => setImage('')}
              folder="zakhrafa/categories"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2.5 text-xs sm:text-sm font-bold text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition cursor-pointer disabled:opacity-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#E17F3F] hover:bg-[#C96A2D] rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>جاري الحفظ...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>حفظ الفئة</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
