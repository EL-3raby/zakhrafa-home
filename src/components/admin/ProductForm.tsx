'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  CategoryRecord,
  ProductRecord,
  AvailabilityStatus,
  PRIMARY_MATERIALS,
  PRODUCT_COLORS,
  WOOD_TYPES,
  FABRIC_TYPES,
  FOAM_TYPES,
  LEGS_TYPES,
} from '@/types/database';
import { ProductMultiImageUpload } from '@/components/admin/ProductMultiImageUpload';
import { generateSlug } from '@/lib/slugify';
import {
  Save,
  Loader2,
  ArrowRight,
  AlertCircle,
  Tag,
  Percent,
  Check,
  Ruler,
  Layers,
  Sparkles,
  ShieldCheck,
  Sliders,
  Palette,
  Eye,
  Info,
  CheckCircle2,
  Copy,
  CheckCheck,
} from 'lucide-react';

interface ProductFormProps {
  initialData?: ProductRecord | null;
  isEditMode?: boolean;
}

const MIGRATION_SQL_SNIPPET = `ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS width NUMERIC(10, 2),
ADD COLUMN IF NOT EXISTS depth NUMERIC(10, 2),
ADD COLUMN IF NOT EXISTS height NUMERIC(10, 2),
ADD COLUMN IF NOT EXISTS custom_dimensions_available BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS space_guide_notes TEXT,
ADD COLUMN IF NOT EXISTS wood_type TEXT,
ADD COLUMN IF NOT EXISTS fabric_type TEXT,
ADD COLUMN IF NOT EXISTS foam_density TEXT,
ADD COLUMN IF NOT EXISTS legs_type TEXT,
ADD COLUMN IF NOT EXISTS hardware_type TEXT,
ADD COLUMN IF NOT EXISTS warranty_years INTEGER DEFAULT 5,
ADD COLUMN IF NOT EXISTS available_colors TEXT[] DEFAULT '{}'::TEXT[];`;

// Helper to extract initial dimensions from numbers or legacy string
function parseInitialDimensions(initial?: ProductRecord | null) {
  if (initial?.width || initial?.depth || initial?.height) {
    return {
      width: initial.width ? String(initial.width) : '',
      depth: initial.depth ? String(initial.depth) : '',
      height: initial.height ? String(initial.height) : '',
    };
  }

  if (initial?.dimensions) {
    const raw = initial.dimensions;
    const match = raw.match(/(\d+(?:\.\d+)?)\s*(?:x|×|\*|عرض)?\s*(\d+(?:\.\d+)?)\s*(?:x|×|\*|عمق)?\s*(\d+(?:\.\d+)?)/i);
    if (match) {
      return {
        width: match[1] || '',
        depth: match[2] || '',
        height: match[3] || '',
      };
    }
  }

  return { width: '', depth: '', height: '' };
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  isEditMode = false,
}) => {
  const router = useRouter();

  const [categories, setCategories] = useState<CategoryRecord[]>([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);

  // 1. Basic Info
  const [name, setName] = useState(initialData?.name || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [isSlugManual, setIsSlugManual] = useState(Boolean(initialData?.slug));
  const [description, setDescription] = useState(initialData?.description || '');
  const [categoryId, setCategoryId] = useState(initialData?.category_id || '');
  const [availabilityStatus, setAvailabilityStatus] = useState<AvailabilityStatus>(
    initialData?.availability_status || 'available_now'
  );

  // 2. Pricing
  const [originalPrice, setOriginalPrice] = useState<string>(
    initialData?.original_price !== null && initialData?.original_price !== undefined
      ? String(initialData.original_price)
      : ''
  );
  const [discountPrice, setDiscountPrice] = useState<string>(
    initialData?.discount_price !== null && initialData?.discount_price !== undefined
      ? String(initialData.discount_price)
      : ''
  );

  // 3. Classification & Featured
  const [isFeatured, setIsFeatured] = useState<boolean>(initialData?.is_featured || false);
  const [materialPrimary, setMaterialPrimary] = useState<string>(
    initialData?.material_primary || PRIMARY_MATERIALS[0]
  );
  const [materialSecondary, setMaterialSecondary] = useState<string>(
    initialData?.material_secondary || ''
  );

  // 4. Color & Multi-Colors
  const [color, setColor] = useState<string>(
    initialData?.color || PRODUCT_COLORS[0].label
  );
  const [availableColors, setAvailableColors] = useState<string[]>(
    initialData?.available_colors && initialData.available_colors.length > 0
      ? initialData.available_colors
      : [initialData?.color || PRODUCT_COLORS[0].label]
  );
  const [customColorInput, setCustomColorInput] = useState('');

  // 5. Dimensions & Space Guide
  const initialDims = parseInitialDimensions(initialData);
  const [width, setWidth] = useState(initialDims.width);
  const [depth, setDepth] = useState(initialDims.depth);
  const [height, setHeight] = useState(initialDims.height);
  const [dimensions, setDimensions] = useState<string>(initialData?.dimensions || '');
  const [isDimensionsManual, setIsDimensionsManual] = useState(Boolean(initialData?.dimensions && !initialData?.width));
  const [customDimensionsAvailable, setCustomDimensionsAvailable] = useState<boolean>(
    initialData?.custom_dimensions_available ?? true
  );
  const [spaceGuideNotes, setSpaceGuideNotes] = useState<string>(
    initialData?.space_guide_notes ||
      'تأكد من ملاءمة القطعة لمساحتك ومداخل الأبواب. نتيح إمكانية تفصيل وتعديل أي بعد بالميليمتر ليناسب مساحة غرفتك بالكامل.'
  );

  // 6. Detailed Technical Specifications & Materials
  const [woodType, setWoodType] = useState<string>(
    initialData?.wood_type || WOOD_TYPES[0]
  );
  const [fabricType, setFabricType] = useState<string>(
    initialData?.fabric_type || FABRIC_TYPES[0]
  );
  const [foamDensity, setFoamDensity] = useState<string>(
    initialData?.foam_density || FOAM_TYPES[0]
  );
  const [legsType, setLegsType] = useState<string>(
    initialData?.legs_type || LEGS_TYPES[0]
  );
  const [hardwareType, setHardwareType] = useState<string>(
    initialData?.hardware_type || 'مفصلات وسكك إغلاق هادئ (Soft-Close) ألمانية مجلفنة'
  );
  const [warrantyYears, setWarrantyYears] = useState<number>(
    initialData?.warranty_years !== null && initialData?.warranty_years !== undefined
      ? initialData.warranty_years
      : 5
  );

  // 7. Images
  const [images, setImages] = useState<string[]>(initialData?.images || []);

  // 8. Form statuses
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sqlMigrationNotice, setSqlMigrationNotice] = useState<boolean>(false);
  const [isCopiedSql, setIsCopiedSql] = useState(false);

  // Auto-sync dimensions string whenever width, depth, or height change
  useEffect(() => {
    if (!isDimensionsManual) {
      if (width || depth || height) {
        const parts: string[] = [];
        if (width) parts.push(`${width} عرض`);
        if (depth) parts.push(`${depth} عمق`);
        if (height) parts.push(`${height} ارتفاع`);
        setDimensions(`${parts.join(' × ')} سم`);
      }
    }
  }, [width, depth, height, isDimensionsManual]);

  // Fetch Categories for dropdown
  useEffect(() => {
    const fetchCats = async () => {
      try {
        setIsCategoriesLoading(true);
        const supabase = createClient();
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) throw error;
        setCategories(data || []);

        if (!initialData?.category_id && data && data.length > 0) {
          setCategoryId(data[0].id);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setIsCategoriesLoading(false);
      }
    };

    fetchCats();
  }, [initialData]);

  // Handle name change and auto-generate slug
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (!isSlugManual) {
      setSlug(generateSlug(val));
    }
  };

  // Toggle available color
  const handleToggleColor = (colLabel: string) => {
    setAvailableColors((prev) => {
      if (prev.includes(colLabel)) {
        if (prev.length === 1) return prev; // keep at least 1 color
        const next = prev.filter((c) => c !== colLabel);
        if (color === colLabel && next.length > 0) {
          setColor(next[0]);
        }
        return next;
      } else {
        return [...prev, colLabel];
      }
    });
  };

  // Add custom color
  const handleAddCustomColor = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customColorInput.trim();
    if (trimmed && !availableColors.includes(trimmed)) {
      setAvailableColors([...availableColors, trimmed]);
      setCustomColorInput('');
    }
  };

  // Copy SQL snippet
  const handleCopySql = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(MIGRATION_SQL_SNIPPET);
      setIsCopiedSql(true);
      setTimeout(() => setIsCopiedSql(false), 2500);
    }
  };

  // Calculate discount percentage and savings
  const numOriginal = parseFloat(originalPrice) || 0;
  const numDiscount = parseFloat(discountPrice) || 0;

  const hasValidDiscount =
    numOriginal > 0 && numDiscount > 0 && numDiscount < numOriginal;

  const discountPercent = hasValidDiscount
    ? Math.round(((numOriginal - numDiscount) / numOriginal) * 100)
    : 0;

  const savingsAmount = hasValidDiscount ? numOriginal - numDiscount : 0;
  const isPriceRequired = availabilityStatus === 'available_now';

  // Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSqlMigrationNotice(false);

    // Validation
    if (!name.trim()) {
      setErrorMessage('يرجى إدخال اسم المنتج.');
      return;
    }

    if (!slug.trim()) {
      setErrorMessage('يرجى تحديد الرابط التعريفي (Slug).');
      return;
    }

    if (!categoryId) {
      setErrorMessage('يرجى اختيار فئة المنتج.');
      return;
    }

    if (!description.trim()) {
      setErrorMessage('يرجى إدخال وصف تفصيلي للمنتج.');
      return;
    }

    if (isPriceRequired && (!originalPrice || numOriginal <= 0)) {
      setErrorMessage('السعر الأصلي مطلوب للمنتجات المتوفرة للتسليم الفوري.');
      return;
    }

    if (numDiscount > 0 && numDiscount >= numOriginal && numOriginal > 0) {
      setErrorMessage('سعر الخصم يجب أن يكون أقل من السعر الأصلي.');
      return;
    }

    const finalDimensions = dimensions.trim() ||
      (width && depth && height ? `${width} عرض × ${depth} عمق × ${height} ارتفاع سم` : 'حسب الطلب');

    if (images.length === 0) {
      setErrorMessage('يرجى رفع صورة واحدة على الأقل للمنتج عبر Cloudinary.');
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createClient();

      // Base payload compatible with current Supabase schema
      const basePayload: Record<string, unknown> = {
        name: name.trim(),
        slug: slug.trim(),
        description: description.trim(),
        category_id: categoryId,
        availability_status: availabilityStatus,
        original_price: originalPrice ? parseFloat(originalPrice) : null,
        discount_price: discountPrice ? parseFloat(discountPrice) : null,
        is_featured: isFeatured,
        material_primary: materialPrimary,
        material_secondary: materialSecondary || null,
        color: color,
        dimensions: finalDimensions,
        images: images,
      };

      // Extended payload including all detailed specifications and dimensions
      const extendedPayload: Record<string, unknown> = {
        ...basePayload,
        width: width ? parseFloat(width) : null,
        depth: depth ? parseFloat(depth) : null,
        height: height ? parseFloat(height) : null,
        custom_dimensions_available: customDimensionsAvailable,
        space_guide_notes: spaceGuideNotes.trim() || null,
        wood_type: woodType.trim() || null,
        fabric_type: fabricType.trim() || null,
        foam_density: foamDensity.trim() || null,
        legs_type: legsType.trim() || null,
        hardware_type: hardwareType.trim() || null,
        warranty_years: warrantyYears || 5,
        available_colors: availableColors.length > 0 ? availableColors : [color],
      };

      let saveError: { code?: string; message?: string } | null = null;

      // First attempt: try saving with extended columns
      if (isEditMode && initialData?.id) {
        const res = await supabase
          .from('products')
          .update(extendedPayload)
          .eq('id', initialData.id);
        saveError = res.error;
      } else {
        const res = await supabase
          .from('products')
          .insert([extendedPayload]);
        saveError = res.error;
      }

      // If Postgres error 42703 (column does not exist), gracefully fallback to base payload
      if (saveError && (saveError.code === '42703' || saveError.message?.includes('column'))) {
        console.warn('Extended columns not yet in Supabase schema. Retrying with core payload...', saveError.message);
        
        if (isEditMode && initialData?.id) {
          const fallbackRes = await supabase
            .from('products')
            .update(basePayload)
            .eq('id', initialData.id);
          if (fallbackRes.error) throw fallbackRes.error;
        } else {
          const fallbackRes = await supabase
            .from('products')
            .insert([basePayload]);
          if (fallbackRes.error) throw fallbackRes.error;
        }

        // Show notice to run migration SQL
        setSqlMigrationNotice(true);
        setTimeout(() => {
          router.push('/admin/products');
          router.refresh();
        }, 3000);
        return;
      } else if (saveError) {
        throw saveError;
      }

      router.push('/admin/products');
      router.refresh();
    } catch (err: unknown) {
      console.error('Error submitting product:', err);
      const msg = err instanceof Error ? err.message : 'حدث خطأ أثناء حفظ المنتج في Supabase.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8" dir="rtl">
      {/* Top action row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-[#0B3D42] hover:bg-stone-50 transition"
            title="رجوع لقائمة المنتجات"
          >
            <ArrowRight className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B3D42]">
              {isEditMode ? 'تعديل بيانات ومواصفات المنتج' : 'إضافة منتج جديد للكتالوج'}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              تحكم كامل بالأسعار، المقاسات ودليل المساحة، المواصفات الفنية، والخامات الفاخرة
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 text-xs sm:text-sm font-bold transition"
          >
            إلغاء
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 bg-[#E17F3F] hover:bg-[#C96A2D] text-white px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition cursor-pointer active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>جاري الحفظ في Supabase...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{isEditMode ? 'حفظ التعديلات' : 'نشر المنتج'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* SQL Migration Notice if columns need migration */}
      {sqlMigrationNotice && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-xs sm:text-sm space-y-2 animate-in fade-in">
          <div className="flex items-center gap-2 font-bold text-emerald-800">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>تم حفظ المنتج بنجاح مع كافة البيانات الأساسية!</span>
          </div>
          <p className="text-xs text-emerald-700 leading-relaxed">
            لتفعيل حفظ أعمدة المواصفات الفنية والمقاسات المنفصلة بشكل دائم في Supabase، يرجى تشغيل كود SQL التالي مرة واحدة في لوحة تحكم Supabase SQL Editor:
          </p>
          <div className="relative bg-stone-900 text-amber-300 p-3 rounded-xl font-mono text-[11px] overflow-x-auto text-left" dir="ltr">
            <button
              type="button"
              onClick={handleCopySql}
              className="absolute right-2 top-2 px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-sans flex items-center gap-1 transition cursor-pointer"
            >
              {isCopiedSql ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopiedSql ? 'تم النسخ' : 'نسخ SQL'}</span>
            </button>
            <pre className="whitespace-pre">{MIGRATION_SQL_SNIPPET}</pre>
          </div>
        </div>
      )}

      {/* Error alert */}
      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs sm:text-sm flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
          <div className="space-y-1">
            <span className="font-bold">يرجى تصحيح الخطأ:</span>
            <p className="text-xs">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Main Details, Dimensions, Specs & Images */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card 1: Basic Info */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-5">
            <h2 className="text-sm font-extrabold text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#E17F3F]" />
              <span>البيانات الأساسية</span>
            </h2>

            {/* Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700">
                اسم المنتج <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={handleNameChange}
                placeholder="مثال: طقم كنب ميلانو الفاخر (4 قطع)"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D42]/20 focus:border-[#0B3D42] transition"
              />
            </div>

            {/* Slug */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-stone-700">
                  الرابط التعريفي (Slug) <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setIsSlugManual(false);
                    setSlug(generateSlug(name));
                  }}
                  className="text-[11px] text-[#E17F3F] hover:underline font-semibold cursor-pointer"
                >
                  إعادة توليد تلقائي
                </button>
              </div>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => {
                  setIsSlugManual(true);
                  setSlug(e.target.value);
                }}
                placeholder="milano-luxury-sofa-set"
                dir="ltr"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm font-mono text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D42]/20 focus:border-[#0B3D42] transition text-left"
              />
              <p className="text-[11px] text-stone-400">
                يُستخدم في رابط المنتج بالمتجر (مثال: /products/{slug || '...'})
              </p>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700">
                الوصف ونبذة التصميم <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="تفاصيل فلسفة التصميم، الاستخدام المثالي، واللمسات الجمالية الفريدة..."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-4 text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D42]/20 focus:border-[#0B3D42] transition leading-relaxed resize-y"
              />
            </div>
          </div>

          {/* Card 2: Dimensions & Space Guide (المقاسات ودليل المساحة) */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h2 className="text-sm font-extrabold text-stone-900 flex items-center gap-2">
                <Ruler className="w-4 h-4 text-[#E17F3F]" />
                <span>المقاسات ودليل المساحة (نفس تفاصيل صفحة المنتج)</span>
              </h2>
              <span className="text-xs bg-stone-100 text-stone-600 font-semibold px-2.5 py-0.5 rounded-full">
                بوحدة السنتيمتر (سم)
              </span>
            </div>

            {/* 3 Main Dimension Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Width */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  العرض الإجمالي (Width)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="مثال: 240"
                    dir="ltr"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm font-mono text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D42]/20 focus:border-[#0B3D42] transition text-left"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 pointer-events-none">
                    سم
                  </span>
                </div>
              </div>

              {/* Depth */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  العمق (Depth)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={depth}
                    onChange={(e) => setDepth(e.target.value)}
                    placeholder="مثال: 95"
                    dir="ltr"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm font-mono text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D42]/20 focus:border-[#0B3D42] transition text-left"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 pointer-events-none">
                    سم
                  </span>
                </div>
              </div>

              {/* Height */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  الارتفاع الكلي (Height)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="مثال: 85"
                    dir="ltr"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm font-mono text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D42]/20 focus:border-[#0B3D42] transition text-left"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 pointer-events-none">
                    سم
                  </span>
                </div>
              </div>
            </div>

            {/* Composite Dimensions Text (Fallback & Backward Compatibility) */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-stone-700">
                  النص المركب للأبعاد في الكتالوج (Dimensions String) <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsDimensionsManual(!isDimensionsManual)}
                  className="text-[11px] text-[#E17F3F] hover:underline font-semibold cursor-pointer"
                >
                  {isDimensionsManual ? 'العودة للتوليد التلقائي' : 'تعديل النص يدوياً'}
                </button>
              </div>
              <input
                type="text"
                required
                value={dimensions}
                readOnly={!isDimensionsManual}
                onChange={(e) => {
                  setIsDimensionsManual(true);
                  setDimensions(e.target.value);
                }}
                placeholder="240 عرض × 95 عمق × 85 ارتفاع سم"
                className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${
                  isDimensionsManual
                    ? 'bg-stone-50 border border-stone-300 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D42]/20'
                    : 'bg-stone-100/70 border border-stone-200 text-stone-700 cursor-default'
                }`}
              />
              <p className="text-[11px] text-stone-400">
                يظهر هذا النص في بطاقة المنتج السريعة وجداول المقارنة
              </p>
            </div>

            {/* Custom Dimensions Available Toggle */}
            <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-stone-900">
                  إمكانية تعديل وتفصيل المقاسات حسب الطلب
                </div>
                <div className="text-[11px] text-stone-500">
                  يُظهر صندوق «تعديل المقاسات: متاح حسب الطلب» وزر استشارة المهندس في صفحة المنتج
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={customDimensionsAvailable}
                  onChange={(e) => setCustomDimensionsAvailable(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-stone-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0B3D42]"></div>
              </label>
            </div>

            {/* Space Guide & Room Fit Notes */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700">
                ملاحظات دليل المساحة وملاءمة الأبواب (Space Guide Notes)
              </label>
              <textarea
                rows={2}
                value={spaceGuideNotes}
                onChange={(e) => setSpaceGuideNotes(e.target.value)}
                placeholder="توجيهات للمشتري بشأن مساحة الغرفة ومقاسات الأبواب المطلوبة للقطعة..."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D42]/20 focus:border-[#0B3D42] transition leading-relaxed resize-y"
              />
            </div>

            {/* LIVE PREVIEW WIDGET: Matching ProductTabs.tsx Dimensions Grid */}
            <div className="p-4 rounded-2xl bg-stone-100/60 border border-stone-200/80 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0B3D42]">
                <Eye className="w-3.5 h-3.5 text-[#E17F3F]" />
                <span>معاينة حية لشكل المقاسات في صفحة تفاصيل المنتج:</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 rounded-xl bg-white border border-stone-200 text-center shadow-2xs">
                  <span className="block text-stone-400 text-[10px] font-semibold mb-0.5">العرض الإجمالي</span>
                  <span className="text-xl font-black text-[#0B3D42]">
                    {width || 220}
                  </span>
                  <span className="text-[10px] text-stone-500 font-bold block">سم</span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-stone-200 text-center shadow-2xs">
                  <span className="block text-stone-400 text-[10px] font-semibold mb-0.5">العمق</span>
                  <span className="text-xl font-black text-[#0B3D42]">
                    {depth || 90}
                  </span>
                  <span className="text-[10px] text-stone-500 font-bold block">سم</span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-stone-200 text-center shadow-2xs">
                  <span className="block text-stone-400 text-[10px] font-semibold mb-0.5">الارتفاع الكلي</span>
                  <span className="text-xl font-black text-[#0B3D42]">
                    {height || 85}
                  </span>
                  <span className="text-[10px] text-stone-500 font-bold block">سم</span>
                </div>

                <div className="p-3 rounded-xl bg-[#0B3D42] text-white border border-[#0B3D42] text-center flex flex-col justify-center shadow-2xs">
                  <span className="block text-slate-300 text-[9px] font-semibold">تعديل المقاسات</span>
                  <span className="text-xs sm:text-sm font-black text-[#E17F3F]">
                    {customDimensionsAvailable ? 'متاح حسب الطلب' : 'مقاس قياسي'}
                  </span>
                  <span className="text-[9px] text-slate-300 block">تواصل مع المهندس</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Technical Specifications & Materials (المواصفات الفنية والخامات) */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h2 className="text-sm font-extrabold text-stone-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#E17F3F]" />
                <span>المواصفات الفنية وتفاصيل الخامات المتقدمة</span>
              </h2>
              <span className="text-xs text-stone-400">تظهر في تبويب المواصفات الفنية</span>
            </div>

            {/* 1. Solid Wood Structure */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-700">
                هيكل الخشب الداخلي (Wood Structure)
              </label>
              <input
                type="text"
                value={woodType}
                onChange={(e) => setWoodType(e.target.value)}
                placeholder="هيكل خشب زان أحمر طبيعي مجفف حرارياً ومقاوم للتسوس..."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D42]/20 focus:border-[#0B3D42] transition"
              />
              {/* Quick suggestion pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] font-bold text-stone-400">اقتراحات شائعة:</span>
                {WOOD_TYPES.slice(0, 3).map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setWoodType(w)}
                    className="text-[11px] px-2 py-0.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition cursor-pointer"
                  >
                    {w.split(' ')[1]} {w.split(' ')[2]}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Fabric & Upholstery */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-700">
                نوع القماش والتنجيد (Fabric & Upholstery)
              </label>
              <input
                type="text"
                value={fabricType}
                onChange={(e) => setFabricType(e.target.value)}
                placeholder="مخمل إيطالي ناعم معالج ضد البقع وسهل التنظيف..."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D42]/20 focus:border-[#0B3D42] transition"
              />
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] font-bold text-stone-400">اقتراحات شائعة:</span>
                {FABRIC_TYPES.slice(0, 3).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFabricType(f)}
                    className="text-[11px] px-2 py-0.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition cursor-pointer"
                  >
                    {f.split(' ')[0]} {f.split(' ')[1]}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Foam Density & Cushioning */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-700">
                نوع وكثافة الإسفنج والحشوة (Foam Density)
              </label>
              <input
                type="text"
                value={foamDensity}
                onChange={(e) => setFoamDensity(e.target.value)}
                placeholder="إسفنج سوفت عالي المرونة (كثافة 36) دعم طبي كامل..."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D42]/20 focus:border-[#0B3D42] transition"
              />
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] font-bold text-stone-400">اقتراحات:</span>
                {FOAM_TYPES.slice(0, 3).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFoamDensity(f)}
                    className="text-[11px] px-2 py-0.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition cursor-pointer"
                  >
                    {f.split(' ')[0]} {f.split(' ')[1]}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Legs, Hardware & Warranty in Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {/* Legs / Base */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  نوع القواعد والأرجل
                </label>
                <input
                  type="text"
                  value={legsType}
                  onChange={(e) => setLegsType(e.target.value)}
                  placeholder="ستانلس ستيل ذهبي / خشب زان..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D42]/20 focus:border-[#0B3D42] transition"
                />
              </div>

              {/* Hardware / Hinges */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  المفصلات والإكسسوارات
                </label>
                <input
                  type="text"
                  value={hardwareType}
                  onChange={(e) => setHardwareType(e.target.value)}
                  placeholder="مفصلات ألمانية هيدروليك..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D42]/20 focus:border-[#0B3D42] transition"
                />
              </div>

              {/* Warranty Years */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  مدة الضمان (سنوات)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="25"
                    value={warrantyYears}
                    onChange={(e) => setWarrantyYears(parseInt(e.target.value) || 5)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-mono text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D42]/20 focus:border-[#0B3D42] transition"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 pointer-events-none">
                    سنوات
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Pricing & Discount */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h2 className="text-sm font-extrabold text-stone-900 flex items-center gap-2">
                <Percent className="w-4 h-4 text-[#E17F3F]" />
                <span>التسعير والعروض</span>
              </h2>

              {hasValidDiscount && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold animate-in fade-in">
                  <span>خصم {discountPercent}%</span>
                  <span>(توفير {savingsAmount.toLocaleString()} ج.م)</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Original Price */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  السعر الأصلي (ج.م){' '}
                  {isPriceRequired ? (
                    <span className="text-red-500">*</span>
                  ) : (
                    <span className="text-stone-400 font-normal">(اختياري للطلب المخصص)</span>
                  )}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    required={isPriceRequired}
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="15000"
                    dir="ltr"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D42]/20 focus:border-[#0B3D42] transition text-left font-mono"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 pointer-events-none">
                    ج.م
                  </span>
                </div>
              </div>

              {/* Discount Price */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  سعر الخصم (ج.م){' '}
                  <span className="text-stone-400 font-normal">(اختياري في حال وجود عرض)</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={discountPrice}
                    onChange={(e) => setDiscountPrice(e.target.value)}
                    placeholder="12900"
                    dir="ltr"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D42]/20 focus:border-[#0B3D42] transition text-left font-mono"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 pointer-events-none">
                    ج.م
                  </span>
                </div>
              </div>
            </div>

            {!isPriceRequired && (
              <p className="text-[11px] text-stone-500 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                ملاحظة: اخترت حالة «تنفيذ وتفصيل حسب الطلب»، لذلك يمكنك ترك حقول الأسعار فارغة لعرض السعر عند الطلب والتواصل.
              </p>
            )}
          </div>

          {/* Card 5: Cloudinary Multi-Image Upload */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
            <h2 className="text-sm font-extrabold text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
              <span>معرض صور المنتج (Cloudinary)</span>
              <span className="text-red-500">*</span>
            </h2>

            <ProductMultiImageUpload
              images={images}
              onChange={setImages}
              folder="zakhrafa/products"
            />
          </div>
        </div>

        {/* Right 1 Column: Classification, Colors, Materials & Tips */}
        <div className="space-y-6">
          
          {/* Card 6: Classification & Availability */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-5">
            <h2 className="text-sm font-extrabold text-stone-900 border-b border-stone-100 pb-3">
              التصنيف وحالة التوفر
            </h2>

            {/* Category Dropdown */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700">
                الفئة / القسم <span className="text-red-500">*</span>
              </label>
              {isCategoriesLoading ? (
                <div className="py-2 text-xs text-stone-400 flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>جاري تحميل الفئات...</span>
                </div>
              ) : (
                <select
                  required
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D42]/20 focus:border-[#0B3D42] transition cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name_ar} ({cat.name_en})
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Availability Status */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700">
                حالة التوفر <span className="text-red-500">*</span>
              </label>
              <select
                value={availabilityStatus}
                onChange={(e) => setAvailabilityStatus(e.target.value as AvailabilityStatus)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D42]/20 focus:border-[#0B3D42] transition cursor-pointer"
              >
                <option value="available_now">متوفر في المعرض للتسليم الفوري</option>
                <option value="made_to_order">تنفيذ وتفصيل حسب الطلب</option>
              </select>
            </div>

            {/* Is Featured Checkbox */}
            <div className="pt-2">
              <label className="flex items-center gap-3 p-3 bg-stone-50 border border-stone-200 rounded-xl cursor-pointer hover:bg-stone-100 transition">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 text-[#E17F3F] border-stone-300 rounded focus:ring-[#E17F3F] cursor-pointer"
                />
                <div>
                  <div className="text-xs font-bold text-stone-900">منتج مميز (Featured)</div>
                  <div className="text-[11px] text-stone-500">
                    يظهر في الواجهة الرئيسية والمجموعات الملكية
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Card 7: Colors & Materials */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-5">
            <h2 className="text-sm font-extrabold text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
              <Palette className="w-4 h-4 text-[#E17F3F]" />
              <span>الألوان المتاحة للموديل</span>
            </h2>

            {/* Multi-Color Selection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-700">اختر الألوان المتاحة:</span>
                <span className="text-stone-500 font-semibold">{availableColors.length} لون محدد</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {PRODUCT_COLORS.map((col) => {
                  const isChecked = availableColors.includes(col.label);
                  const isPrimary = color === col.label;

                  return (
                    <button
                      key={col.label}
                      type="button"
                      onClick={() => handleToggleColor(col.label)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs transition cursor-pointer ${
                        isChecked
                          ? 'bg-[#0B3D42]/10 border-[#0B3D42] text-[#0B3D42] font-bold shadow-2xs'
                          : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span>{col.label}</span>
                      {isChecked && <Check className="w-3 h-3 stroke-[2.5]" />}
                    </button>
                  );
                })}
              </div>

              {/* Add Custom Color */}
              <div className="pt-2 flex items-center gap-2">
                <input
                  type="text"
                  value={customColorInput}
                  onChange={(e) => setCustomColorInput(e.target.value)}
                  placeholder="إضافة لون مخصص (مثال: عاجي)..."
                  className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-[#0B3D42]"
                />
                <button
                  type="button"
                  onClick={handleAddCustomColor}
                  className="px-3 py-1.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold transition cursor-pointer"
                >
                  إضافة
                </button>
              </div>
            </div>

            {/* Primary Color Selection */}
            <div className="space-y-1.5 pt-2 border-t border-stone-100">
              <label className="block text-xs font-bold text-stone-700">
                اللون الافتراضي الأساسي <span className="text-red-500">*</span>
              </label>
              <select
                value={color}
                onChange={(e) => {
                  const val = e.target.value;
                  setColor(val);
                  if (!availableColors.includes(val)) {
                    setAvailableColors([...availableColors, val]);
                  }
                }}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D42]/20 focus:border-[#0B3D42] transition cursor-pointer"
              >
                {availableColors.map((colName) => (
                  <option key={colName} value={colName}>
                    {colName}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-stone-400">
                اللون الذي يظهر أولاً عند فتح صفحة المنتج بالمتجر
              </p>
            </div>

            {/* Primary & Secondary Material Classifications */}
            <div className="space-y-3 pt-3 border-t border-stone-100">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  تصنيف الخامة الأساسية <span className="text-red-500">*</span>
                </label>
                <select
                  value={materialPrimary}
                  onChange={(e) => setMaterialPrimary(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D42]/20 focus:border-[#0B3D42] transition cursor-pointer"
                >
                  {PRIMARY_MATERIALS.map((mat) => (
                    <option key={mat} value={mat}>
                      {mat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  تصنيف الخامة الثانوية <span className="text-stone-400 font-normal">(اختياري)</span>
                </label>
                <select
                  value={materialSecondary}
                  onChange={(e) => setMaterialSecondary(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D42]/20 focus:border-[#0B3D42] transition cursor-pointer"
                >
                  <option value="">بدون خامة ثانوية</option>
                  {PRIMARY_MATERIALS.map((mat) => (
                    <option key={mat} value={mat}>
                      {mat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Card 8: Design System Tips */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0B3D42]/5 via-stone-50 to-white border border-[#0B3D42]/15 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0B3D42]">
              <Sparkles className="w-4 h-4 text-[#E17F3F]" />
              <span>نصائح كتالوج زخرفة الفاخر</span>
            </div>
            <ul className="text-xs text-stone-600 space-y-2 leading-relaxed list-disc list-inside">
              <li>
                <strong>المقاسات الدقيقة:</strong> إدخال العرض والعمق والارتفاع بالسم يُمكّن المشتري من معرفة ملاءمة القطعة لغرفته فوراً.
              </li>
              <li>
                <strong>الألوان المتعددة:</strong> تحديد عدة ألوان يمنح العميل تجربة تفاعلية لتبديل السواتشات ومشاركتها عبر واتساب.
              </li>
              <li>
                <strong>ضمان الـ 5 سنوات:</strong> يُبني ثقة استثنائية مع العميل ويوضح جودة الصنعة وهيكل الخشب الطبيعي.
              </li>
            </ul>
          </div>

        </div>
      </div>
    </form>
  );
};
