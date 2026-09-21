'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { UploadCloud, X, Loader2, ImagePlus, CheckCircle2 } from 'lucide-react';

interface CloudinaryImageUploadProps {
  onUploadSuccess: (result: { url: string; public_id: string }) => void;
  onRemove?: () => void;
  currentImageUrl?: string;
  folder?: string;
  className?: string;
}

export const CloudinaryImageUpload: React.FC<CloudinaryImageUploadProps> = ({
  onUploadSuccess,
  onRemove,
  currentImageUrl,
  folder = 'zakhrafa/products',
  className = '',
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('يرجى اختيار ملف صورة صالح (JPG, PNG, WebP).');
      return;
    }

    // Limit to 10MB
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('حجم الصورة كبير جداً، الحد الأقصى المسموح هو 10 ميجابايت.');
      return;
    }

    setErrorMessage(null);
    setIsUploading(true);
    setIsSuccess(false);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'فشل رفع الصورة');
      }

      setPreviewUrl(data.url);
      setIsSuccess(true);
      onUploadSuccess({ url: data.url, public_id: data.public_id });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ أثناء الرفع';
      setErrorMessage(msg);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    setIsSuccess(false);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onRemove) onRemove();
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {previewUrl ? (
        <div className="relative group rounded-2xl overflow-hidden border border-stone-200 bg-stone-50 aspect-video max-h-72 w-full flex items-center justify-center">
          <Image
            src={previewUrl}
            alt="صورة تم رفعها"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-white text-stone-800 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm hover:bg-stone-100 flex items-center gap-1.5 transition"
            >
              <ImagePlus className="w-3.5 h-3.5" />
              <span>تغيير الصورة</span>
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm hover:bg-red-700 flex items-center gap-1.5 transition"
            >
              <X className="w-3.5 h-3.5" />
              <span>حذف</span>
            </button>
          </div>

          {isSuccess && (
            <div className="absolute bottom-2 right-2 bg-emerald-600/90 text-white text-[11px] font-medium px-2.5 py-1 rounded-md flex items-center gap-1 backdrop-blur-xs">
              <CheckCircle2 className="w-3 h-3" />
              <span>تم الرفع إلى Cloudinary</span>
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center min-h-[180px] ${
            isUploading
              ? 'border-stone-300 bg-stone-50 cursor-wait'
              : 'border-stone-300 hover:border-[#E17F3F] hover:bg-[#E17F3F]/5'
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 text-[#E17F3F] animate-spin" />
              <p className="text-sm font-medium text-stone-600">
                جاري رفع وضغط الصورة إلى Cloudinary...
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-[#E17F3F]/10 text-[#E17F3F] flex items-center justify-center mb-1">
                <UploadCloud className="w-6 h-6 stroke-[1.8]" />
              </div>
              <p className="text-sm font-bold text-stone-800">
                انقر لاختيار صورة أو اسحبها هنا
              </p>
              <p className="text-xs text-stone-500">
                يدعم صيغ PNG, JPG, WebP بحجم أقصى 10MB
              </p>
            </div>
          )}
        </div>
      )}

      {errorMessage && (
        <p className="text-xs text-red-600 font-medium">{errorMessage}</p>
      )}
    </div>
  );
};
