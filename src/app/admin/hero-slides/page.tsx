'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { HeroSlideRecord, HeroMediaType, HeroBadgeType } from '@/types/database';
import {
  Sliders,
  Plus,
  Video,
  ImageIcon,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
  Play,
  Copy,
  Sparkles,
  RefreshCw,
} from 'lucide-react';

const FALLBACK_DEFAULT_SLIDES: HeroSlideRecord[] = [
  {
    id: 'default-1',
    title: 'أطقم صالونات ومعيشة فاخرة',
    subtitle: 'أناقة تدوم في كل تفصيلة',
    description:
      'أطقم كنب زاوية ومودرن مصنوعة من خشب الزان الطبيعي وأقمشة إيطالية مقاومة للبقع والاهتراء مع ضمان 5 سنوات.',
    badge: 'مهرجان عروض الموسم • خصومات حصرية',
    badge_type: 'hot',
    media_type: 'image',
    media_url:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop',
    starting_price: '11,990',
    original_price: '16,500',
    discount_percentage: 'خصم 30%',
    highlight_tag: 'أطقم معيشة تبدأ من',
    cta_text: 'استكشف عروض الصالونات',
    link: '/categories/living-rooms',
    display_order: 0,
    is_active: true,
  },
  {
    id: 'default-2',
    title: 'غرف نوم رئيسية متكاملة',
    subtitle: 'راحة فندقية وتصميم استثنائي',
    description:
      'سرير فندقي كينج مع خزانة ملابس دريسنج روم وتسريحة بتشطيبات أخشاب ورخام طبيعي لتجربة نوم لا تضاهى.',
    badge: 'مهرجان الصيف والتجديد • تشكيلة ملكية',
    badge_type: 'limited',
    media_type: 'image',
    media_url:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop',
    starting_price: '18,490',
    original_price: '24,000',
    discount_percentage: 'خصم 25%',
    highlight_tag: 'غرف نوم تبدأ من',
    cta_text: 'استكشف غرف النوم',
    link: '/categories/bedrooms',
    display_order: 1,
    is_active: true,
  },
  {
    id: 'default-3',
    title: 'طاولات سفرة رخام طبيعي',
    subtitle: 'فخامة الاستقبال وكرم الضيافة',
    description:
      'طاولات طعام مع 6 و 8 كراسي مبطنة ومريحة، قواعد ستانلس ستيل معالجة ضد الخدوش ولمسات خشبية راقية.',
    badge: 'أناقة الضيافة • تسليم فوري وتفصيل',
    badge_type: 'new',
    media_type: 'image',
    media_url:
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1600&auto=format&fit=crop',
    starting_price: '8,750',
    original_price: '12,200',
    discount_percentage: 'وفر 3,450 ج.م',
    highlight_tag: 'طاولات سفرة تبدأ من',
    cta_text: 'استكشف طاولات السفرة',
    link: '/categories/dining-rooms',
    display_order: 2,
    is_active: true,
  },
];

export default function AdminHeroSlidesPage() {
  const [slides, setSlides] = useState<HeroSlideRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [tableMissing, setTableMissing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlideRecord | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    badge: '',
    badge_type: 'hot' as HeroBadgeType,
    media_type: 'image' as HeroMediaType,
    media_url: '',
    starting_price: '',
    original_price: '',
    discount_percentage: '',
    highlight_tag: 'أطقم معيشة تبدأ من',
    cta_text: 'استكشف العروض',
    link: '/',
    display_order: 0,
    is_active: true,
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const fetchSlides = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from('hero_slides')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        if (error.code === 'PGRST205' || error.message.includes('not find the table')) {
          setTableMissing(true);
          setSlides(FALLBACK_DEFAULT_SLIDES);
        } else {
          console.error('Error fetching hero_slides:', error);
          setSlides(FALLBACK_DEFAULT_SLIDES);
        }
      } else if (data && data.length > 0) {
        setTableMissing(false);
        setSlides(data as HeroSlideRecord[]);
      } else {
        // Table exists but is empty
        setTableMissing(false);
        setSlides([]);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setSlides(FALLBACK_DEFAULT_SLIDES);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSlides();
  }, [fetchSlides]);

  const openCreateModal = () => {
    setEditingSlide(null);
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      badge: 'مهرجان عروض الموسم • خصومات حصرية',
      badge_type: 'hot',
      media_type: 'image',
      media_url: '',
      starting_price: '',
      original_price: '',
      discount_percentage: '',
      highlight_tag: 'عروض تبدأ من',
      cta_text: 'استكشف العروض',
      link: '/categories',
      display_order: slides.length,
      is_active: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (slide: HeroSlideRecord) => {
    setEditingSlide(slide);
    setFormData({
      title: slide.title || '',
      subtitle: slide.subtitle || '',
      description: slide.description || '',
      badge: slide.badge || '',
      badge_type: slide.badge_type || 'hot',
      media_type: slide.media_type || 'image',
      media_url: slide.media_url || '',
      starting_price: slide.starting_price || '',
      original_price: slide.original_price || '',
      discount_percentage: slide.discount_percentage || '',
      highlight_tag: slide.highlight_tag || 'عروض تبدأ من',
      cta_text: slide.cta_text || 'استكشف العروض',
      link: slide.link || '/',
      display_order: slide.display_order ?? 0,
      is_active: slide.is_active ?? true,
    });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setUploadProgress(20);

      const isVideo = file.type.startsWith('video/');
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('folder', 'zakhrafa/hero');

      setUploadProgress(45);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      setUploadProgress(85);
      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error || 'فشل رفع الملف');
      }

      setFormData((prev) => ({
        ...prev,
        media_url: data.url,
        media_type: isVideo ? 'video' : 'image',
      }));

      setStatusMessage({ text: 'تم رفع الملف بنجاح!', type: 'success' });
    } catch (err: unknown) {
      console.error('Upload error:', err);
      setStatusMessage({
        text: err instanceof Error ? err.message : 'فشل رفع الملف',
        type: 'error',
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSaveSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.media_url.trim()) {
      setStatusMessage({ text: 'يرجى إدخال عنوان البنر ورابط الصورة أو الفيديو', type: 'error' });
      return;
    }

    try {
      setIsSaving(true);
      const supabase = createClient();

      const payload = {
        title: formData.title.trim(),
        subtitle: formData.subtitle.trim() || null,
        description: formData.description.trim() || null,
        badge: formData.badge.trim() || null,
        badge_type: formData.badge_type,
        media_type: formData.media_type,
        media_url: formData.media_url.trim(),
        starting_price: formData.starting_price.trim() || null,
        original_price: formData.original_price.trim() || null,
        discount_percentage: formData.discount_percentage.trim() || null,
        highlight_tag: formData.highlight_tag.trim() || 'عروض تبدأ من',
        cta_text: formData.cta_text.trim() || 'استكشف العروض',
        link: formData.link.trim() || '/',
        display_order: Number(formData.display_order) || 0,
        is_active: formData.is_active,
      };

      if (editingSlide && !editingSlide.id.startsWith('default-')) {
        // Update
        const { error } = await supabase
          .from('hero_slides')
          .update(payload)
          .eq('id', editingSlide.id);

        if (error) throw error;
        setStatusMessage({ text: 'تم تحديث البنر بنجاح!', type: 'success' });
      } else {
        // Insert
        const { error } = await supabase
          .from('hero_slides')
          .insert([payload]);

        if (error) throw error;
        setStatusMessage({ text: 'تم إنشاء البنر الجديد بنجاح!', type: 'success' });
      }

      setIsModalOpen(false);
      await fetchSlides();
    } catch (err: unknown) {
      console.error('Save error:', err);
      setStatusMessage({
        text: err instanceof Error ? err.message : 'حدث خطأ أثناء الحفظ. تأكد من ترحيل جدول hero_slides في Supabase.',
        type: 'error',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleActive = async (slide: HeroSlideRecord) => {
    if (slide.id.startsWith('default-')) {
      setStatusMessage({
        text: 'هذه شريحة تجريبية افتراضية، يرجى تشغيل سكربت الترحيل في Supabase لتعديلها.',
        type: 'error',
      });
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('hero_slides')
        .update({ is_active: !slide.is_active })
        .eq('id', slide.id);

      if (error) throw error;
      setSlides((prev) =>
        prev.map((s) => (s.id === slide.id ? { ...s, is_active: !s.is_active } : s))
      );
      setStatusMessage({
        text: slide.is_active ? 'تم تعطيل البنر' : 'تم تفعيل البنر بنجاح',
        type: 'success',
      });
    } catch (err: unknown) {
      setStatusMessage({
        text: err instanceof Error ? err.message : 'فشل تغيير حالة البنر',
        type: 'error',
      });
    }
  };

  const handleDeleteSlide = async (slide: HeroSlideRecord) => {
    if (slide.id.startsWith('default-')) {
      setStatusMessage({
        text: 'هذه شريحة تجريبية افتراضية، يرجى تشغيل سكربت الترحيل في Supabase لحفظ وتعديل البنرات الحقيقية.',
        type: 'error',
      });
      return;
    }

    if (!confirm(`هل أنت متأكد من حذف بنر "${slide.title}"؟`)) return;

    try {
      const supabase = createClient();
      const { error } = await supabase.from('hero_slides').delete().eq('id', slide.id);
      if (error) throw error;

      setSlides((prev) => prev.filter((s) => s.id !== slide.id));
      setStatusMessage({ text: 'تم حذف البنر بنجاح!', type: 'success' });
    } catch (err: unknown) {
      setStatusMessage({
        text: err instanceof Error ? err.message : 'فشل حذف البنر',
        type: 'error',
      });
    }
  };

  const handleReorder = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= slides.length) return;

    const newSlides = [...slides];
    const [moved] = newSlides.splice(index, 1);
    newSlides.splice(targetIndex, 0, moved);

    // Update local order numbers
    const updated = newSlides.map((item, idx) => ({ ...item, display_order: idx }));
    setSlides(updated);

    try {
      const supabase = createClient();
      for (const item of updated) {
        if (!item.id.startsWith('default-')) {
          await supabase
            .from('hero_slides')
            .update({ display_order: item.display_order })
            .eq('id', item.id);
        }
      }
    } catch (err) {
      console.warn('Reorder sync error:', err);
    }
  };

  const copySqlToClipboard = () => {
    const sqlText = `-- انسخ هذا الكود والصقه في Supabase SQL Editor:
-- (موجود بالكامل في الملف supabase/migrations/20260922_hero_slides.sql)`;
    navigator.clipboard.writeText(sqlText);
    setStatusMessage({ text: 'تم نسخ مسار ملف الترحيل! يمكنك تشغيله في Supabase.', type: 'success' });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto" dir="rtl">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#0B3D42] text-[#E17F3F] flex items-center justify-center shadow-xs">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-[#0B3D42]">
                إدارة بنرات الواجهة الرئيسية (Hero Slides)
              </h1>
              <p className="text-xs sm:text-sm text-stone-500">
                التحكم بالكامل في البنر الترويجي العلوي بالصفحة الرئيسية مع دعم رفع الصور ومقاطع الفيديو
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={fetchSlides}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-bold transition cursor-pointer"
            title="تحديث القائمة"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#E17F3F]' : ''}`} />
            <span>تحديث</span>
          </button>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B3D42] hover:bg-[#12555C] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#E17F3F]" />
            <span>إضافة بنر جديد</span>
          </button>
        </div>
      </div>

      {/* Status Notifications */}
      {statusMessage && (
        <div
          className={`flex items-center justify-between p-4 rounded-xl text-xs sm:text-sm font-semibold border ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-red-50 text-red-800 border-red-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setStatusMessage(null)}
            className="text-stone-400 hover:text-stone-700 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Migration Notice Banner if table is not yet migrated */}
      {tableMissing && (
        <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-amber-900">
                جدول البنرات (hero_slides) جاهز للتشغيل في Supabase
              </h4>
              <p className="text-xs text-amber-700 leading-relaxed">
                تم تجهيز كود الترحيل في الملف{' '}
                <code className="bg-amber-100/80 px-1.5 py-0.5 rounded font-mono text-[11px]">
                  supabase/migrations/20260922_hero_slides.sql
                </code>
                . يتم الآن عرض الشرائح التجريبية الافتراضية حتى تقوم بتنفيذ السكربت.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={copySqlToClipboard}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shrink-0 transition"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>نسخ التوجيه</span>
          </button>
        </div>
      )}

      {/* 2. Slides List Table & Grid */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-stone-100 flex items-center justify-between">
          <span className="text-xs font-bold text-stone-700">
            إجمالي البنرات الحالية: ({slides.length})
          </span>
          <Link
            href="/"
            target="_blank"
            className="text-xs font-bold text-[#0B3D42] hover:text-[#E17F3F] inline-flex items-center gap-1"
          >
            <span>معاينة الواجهة الحية</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {slides.length === 0 && !loading ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
              <Sliders className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-stone-700">لا توجد بنرات مضافة بعد</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              ابدأ بإضافة أول بنر ترويجي للواجهة مع صورة فخمة أو مقطع فيديو لجذب انتباه العملاء.
            </p>
            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B3D42] text-white text-xs font-bold hover:bg-[#12555C] transition cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#E17F3F]" />
              <span>إضافة بنر الآن</span>
            </button>
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {slides.map((slide, idx) => (
              <div
                key={slide.id}
                className={`p-4 sm:p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 transition-colors ${
                  slide.is_active ? 'hover:bg-stone-50/70' : 'bg-stone-50/40 opacity-75'
                }`}
              >
                {/* Right: Thumbnail / Player & Meta */}
                <div className="flex items-start gap-4 min-w-0 flex-1">
                  {/* Media Thumbnail */}
                  <div className="relative w-32 sm:w-44 aspect-[16/9] rounded-xl overflow-hidden bg-stone-900 border border-stone-200 shrink-0 shadow-xs">
                    {slide.media_type === 'video' ? (
                      <div className="w-full h-full relative group">
                        <video
                          src={slide.media_url}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold flex items-center gap-1">
                          <Video className="w-3 h-3 text-[#E17F3F]" />
                          <span>فيديو</span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full relative">
                        <Image
                          src={slide.media_url}
                          alt={slide.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 130px, 180px"
                        />
                        <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold flex items-center gap-1">
                          <ImageIcon className="w-3 h-3 text-emerald-400" />
                          <span>صورة</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Info details */}
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-mono font-bold text-stone-400 bg-stone-100 px-2 py-0.5 rounded-md">
                        #{idx + 1}
                      </span>
                      {slide.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E17F3F]/15 text-[#E17F3F]">
                          {slide.badge}
                        </span>
                      )}
                      {slide.discount_percentage && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {slide.discount_percentage}
                        </span>
                      )}
                      {!slide.is_active && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                          معطل
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-[#0B3D42] truncate">
                      {slide.title}
                    </h3>
                    {slide.subtitle && (
                      <p className="text-xs text-[#E17F3F] font-semibold truncate">
                        {slide.subtitle}
                      </p>
                    )}
                    {slide.description && (
                      <p className="text-[11px] text-stone-500 line-clamp-2 max-w-xl">
                        {slide.description}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-stone-500">
                      {slide.starting_price && (
                        <span className="font-bold text-stone-700">
                          {slide.highlight_tag || 'السعر:'}{' '}
                          <span className="text-[#0B3D42] font-black">{slide.starting_price} ج.م</span>
                          {slide.original_price && (
                            <span className="line-through text-stone-400 mr-1 text-[10px]">
                              {slide.original_price} ج.م
                            </span>
                          )}
                        </span>
                      )}
                      <span className="text-stone-300">•</span>
                      <span className="truncate max-w-[200px]" dir="ltr">
                        الرابط: {slide.link}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Left: Action Buttons */}
                <div className="flex items-center gap-1.5 self-end lg:self-center shrink-0">
                  {/* Reorder Buttons */}
                  <div className="flex items-center gap-0.5 bg-stone-100 rounded-xl p-0.5 border border-stone-200">
                    <button
                      type="button"
                      onClick={() => handleReorder(idx, 'up')}
                      disabled={idx === 0}
                      title="تحريك لأعلى"
                      className="p-1.5 text-stone-600 hover:text-[#0B3D42] disabled:opacity-30 transition cursor-pointer"
                    >
                      <MoveUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReorder(idx, 'down')}
                      disabled={idx === slides.length - 1}
                      title="تحريك لأسفل"
                      className="p-1.5 text-stone-600 hover:text-[#0B3D42] disabled:opacity-30 transition cursor-pointer"
                    >
                      <MoveDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Toggle Active */}
                  <button
                    type="button"
                    onClick={() => handleToggleActive(slide)}
                    title={slide.is_active ? 'تعطيل البنر' : 'تفعيل البنر'}
                    className={`p-2 rounded-xl border text-xs font-bold transition cursor-pointer ${
                      slide.is_active
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                        : 'bg-stone-100 text-stone-500 border-stone-200 hover:bg-stone-200'
                    }`}
                  >
                    {slide.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>

                  {/* Edit Button */}
                  <button
                    type="button"
                    onClick={() => openEditModal(slide)}
                    title="تعديل البنر"
                    className="p-2 rounded-xl bg-[#0B3D42]/10 text-[#0B3D42] hover:bg-[#0B3D42] hover:text-white transition cursor-pointer"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => handleDeleteSlide(slide)}
                    title="حذف البنر"
                    className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===================================================================== */}
      {/* Modal: Add / Edit Slide */}
      {/* ===================================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-stone-200 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#0B3D42] text-[#E17F3F] flex items-center justify-center">
                  {editingSlide ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B3D42]">
                    {editingSlide ? 'تعديل بيانات البنر' : 'إضافة بنر ترويجي جديد'}
                  </h3>
                  <p className="text-xs text-stone-500">
                    أدخل معلومات البنر وارفع صورة عالية الدقة أو مقطع فيديو
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveSlide} className="space-y-4">
              {/* Media Section: Upload Image or Video */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                    {formData.media_type === 'video' ? (
                      <Video className="w-4 h-4 text-[#E17F3F]" />
                    ) : (
                      <ImageIcon className="w-4 h-4 text-emerald-600" />
                    )}
                    <span>ملف الوسائط (فيديو أو صورة الخلفية)</span>
                  </label>

                  <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-stone-200 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, media_type: 'image' })}
                      className={`px-2.5 py-1 rounded-lg transition ${
                        formData.media_type === 'image'
                          ? 'bg-[#0B3D42] text-white'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      صورة
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, media_type: 'video' })}
                      className={`px-2.5 py-1 rounded-lg transition ${
                        formData.media_type === 'video'
                          ? 'bg-[#E17F3F] text-white'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      فيديو
                    </button>
                  </div>
                </div>

                {/* Upload or Drop */}
                <div className="space-y-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={formData.media_type === 'video' ? 'video/mp4,video/webm,video/quicktime' : 'image/*'}
                    onChange={handleFileUpload}
                    className="hidden"
                    id="hero-file-upload"
                  />

                  <label
                    htmlFor="hero-file-upload"
                    className={`flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-xl cursor-pointer transition ${
                      isUploading
                        ? 'border-[#E17F3F] bg-[#E17F3F]/5'
                        : 'border-stone-300 hover:border-[#0B3D42] hover:bg-stone-100/50'
                    }`}
                  >
                    <UploadCloud className="w-8 h-8 text-[#0B3D42] mb-1.5" />
                    <span className="text-xs font-bold text-stone-700">
                      {isUploading
                        ? `جاري الرفع السحابي (${uploadProgress}%)...`
                        : formData.media_type === 'video'
                        ? 'انقر لاختيار مقطع فيديو (MP4 / WebM حتى 50MB)'
                        : 'انقر لاختيار صورة عالية الدقة (JPG / PNG / WebP)'}
                    </span>
                    <span className="text-[10px] text-stone-400 mt-0.5">
                      يتم الرفع والضغط السحابي تلقائياً عبر Cloudinary
                    </span>
                  </label>

                  {/* Manual URL input option */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="url"
                      value={formData.media_url}
                      onChange={(e) => setFormData({ ...formData, media_url: e.target.value })}
                      placeholder="أو أدخل رابط الوسائط المباشر هنا (URL)..."
                      dir="ltr"
                      className="flex-1 text-xs px-3 py-2 bg-white border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#0B3D42]"
                      required
                    />
                  </div>
                </div>

                {/* Live Miniature Preview in Modal */}
                {formData.media_url && (
                  <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden bg-black border border-stone-200 shadow-inner mt-2">
                    {formData.media_type === 'video' ? (
                      <video
                        src={formData.media_url}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={formData.media_url}
                        alt="معاينة البنر"
                        fill
                        className="object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 flex flex-col justify-end p-3 text-white">
                      <span className="text-xs font-bold text-[#E17F3F]">
                        {formData.badge || 'شارة العرض'}
                      </span>
                      <h4 className="text-sm font-black truncate">
                        {formData.title || 'عنوان البنر التجريبي'}
                      </h4>
                    </div>
                  </div>
                )}
              </div>

              {/* Text Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-stone-700">العنوان الرئيسي *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="مثال: أطقم صالونات ومعيشة فاخرة"
                    className="w-full text-xs sm:text-sm px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#0B3D42]"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-stone-700">العنوان الفرعي</label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="مثال: أناقة تدوم في كل تفصيلة"
                    className="w-full text-xs sm:text-sm px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#0B3D42]"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-stone-700">الوصف التفصيلي</label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="أدخل وصفاً تسويقياً جذاباً للبنر..."
                    className="w-full text-xs sm:text-sm px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#0B3D42]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">نص الشارة الترويجية (Badge)</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="مثال: مهرجان عروض الموسم • خصومات حصرية"
                    className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#0B3D42]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">نوع الشارة</label>
                  <select
                    value={formData.badge_type}
                    onChange={(e) => setFormData({ ...formData, badge_type: e.target.value as HeroBadgeType })}
                    className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#0B3D42]"
                  >
                    <option value="hot">عروض حصرية (Hot 🔥)</option>
                    <option value="limited">إصدار محدود (Limited ⏳)</option>
                    <option value="new">تشكيلة جديدة (New ✨)</option>
                  </select>
                </div>

                {/* Price Details */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">السعر بعد الخصم (يبدأ من)</label>
                  <input
                    type="text"
                    value={formData.starting_price}
                    onChange={(e) => setFormData({ ...formData, starting_price: e.target.value })}
                    placeholder="مثال: 11,990"
                    className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#0B3D42]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">السعر الأصلي (قبل الخصم)</label>
                  <input
                    type="text"
                    value={formData.original_price}
                    onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                    placeholder="مثال: 16,500"
                    className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#0B3D42]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">شارة الخصم أو التوفير</label>
                  <input
                    type="text"
                    value={formData.discount_percentage}
                    onChange={(e) => setFormData({ ...formData, discount_percentage: e.target.value })}
                    placeholder="مثال: خصم 30% أو وفر 3,500 ج.م"
                    className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#0B3D42]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">عنوان بطاقة السعر</label>
                  <input
                    type="text"
                    value={formData.highlight_tag}
                    onChange={(e) => setFormData({ ...formData, highlight_tag: e.target.value })}
                    placeholder="مثال: أطقم معيشة تبدأ من"
                    className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#0B3D42]"
                  />
                </div>

                {/* CTA Link */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">نص الزر (CTA)</label>
                  <input
                    type="text"
                    value={formData.cta_text}
                    onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
                    placeholder="مثال: استكشف عروض الصالونات"
                    className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#0B3D42]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">رابط التوجيه (URL)</label>
                  <input
                    type="text"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="مثال: /categories/living-rooms"
                    dir="ltr"
                    className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#0B3D42]"
                  />
                </div>
              </div>

              {/* Status & Active Checkbox */}
              <div className="pt-2 flex items-center justify-between border-t border-stone-100">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-4 h-4 rounded text-[#0B3D42] focus:ring-[#0B3D42]"
                  />
                  <span className="text-xs font-bold text-stone-700">تفعيل هذا البنر للعرض بالواجهة فوراً</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100 transition cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isSaving || isUploading}
                  className="px-5 py-2 rounded-xl bg-[#0B3D42] hover:bg-[#12555C] text-white text-xs font-bold shadow-md hover:shadow-lg transition cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? 'جاري الحفظ...' : editingSlide ? 'تحديث البنر' : 'إنشاء البنر'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
