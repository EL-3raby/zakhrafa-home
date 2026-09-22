'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  UploadCloud,
  X,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Star,
  CheckCircle2,
} from 'lucide-react';

interface ProductMultiImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  folder?: string;
}

export const ProductMultiImageUpload: React.FC<ProductMultiImageUploadProps> = ({
  images,
  onChange,
  folder = 'zakhrafa/products',
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setErrorMessage(null);
    setIsUploading(true);

    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (!file.type.startsWith('image/')) {
          continue;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (response.ok && data.url) {
          uploadedUrls.push(data.url);
        } else {
          throw new Error(data.error || 'فشل رفع إحدى الصور');
        }
      }

      if (uploadedUrls.length > 0) {
        onChange([...images, ...uploadedUrls]);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ أثناء رفع الصور إلى Cloudinary.';
      setErrorMessage(msg);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = async (indexToRemove: number) => {
    const urlToDelete = images[indexToRemove];
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    onChange(updated);

    // If it's a Cloudinary image, delete it from the cloud
    if (urlToDelete && urlToDelete.includes('cloudinary.com')) {
      try {
        await fetch('/api/upload', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: urlToDelete }),
        });
      } catch (err) {
        console.error('Failed to delete image from Cloudinary:', err);
      }
    }
  };

  const handleMove = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index + 1 : index - 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const updated = [...images];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onChange(updated);
  };

  const handleSetCover = (index: number) => {
    if (index === 0) return;
    const updated = [...images];
    const [selected] = updated.splice(index, 1);
    updated.unshift(selected);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFilesSelected}
        className="hidden"
      />

      {/* Upload Dropzone */}
      <div
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center min-h-[140px] ${isUploading
            ? 'border-stone-300 bg-stone-50 cursor-wait'
            : 'border-stone-300 hover:border-[#E17F3F] hover:bg-[#E17F3F]/5'
          }`}
      >
        {isUploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-7 h-7 text-[#E17F3F] animate-spin" />
            <p className="text-xs sm:text-sm font-semibold text-stone-700">
              جاري رفع الصور ومعالجتها سحابياً...
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#E17F3F]/10 text-[#E17F3F] flex items-center justify-center">
              <UploadCloud className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-stone-800">
                انقر لرفع صورة أو عدة صور للمنتج
              </p>
              <p className="text-[11px] text-stone-500 mt-0.5">
                يمكنك رفع أكثر من صورة في نفس الوقت، وإعادة ترتيبها لتحديد صورة الغلاف
              </p>
            </div>
          </div>
        )}
      </div>

      {errorMessage && (
        <p className="text-xs text-red-600 font-medium bg-red-50 p-2.5 rounded-xl border border-red-200">
          {errorMessage}
        </p>
      )}

      {/* Images Grid */}
      {images.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-600">
            <span>صور المنتج المرفوعة ({images.length})</span>
            <span className="text-[11px] text-stone-400">الصورة الأولى هي صورة الغلاف الرئيسية</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {images.map((url, idx) => {
              const isCover = idx === 0;
              return (
                <div
                  key={`${url}-${idx}`}
                  className={`relative group rounded-xl overflow-hidden border aspect-square bg-stone-100 shadow-2xs ${isCover ? 'border-[#E17F3F] ring-2 ring-[#E17F3F]/20' : 'border-stone-200'
                    }`}
                >
                  <Image
                    src={url}
                    alt={`صورة المنتج ${idx + 1}`}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />

                  {/* Cover Badge */}
                  {isCover && (
                    <div className="absolute top-1.5 right-1.5 bg-[#E17F3F] text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs z-10">
                      <Star className="w-3 h-3 fill-white" />
                      <span>الغلاف</span>
                    </div>
                  )}

                  {/* Actions Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                    {/* Delete button */}
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="p-1 rounded-md bg-red-600/90 hover:bg-red-600 text-white transition cursor-pointer shadow-xs"
                        title="حذف الصورة"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Bottom controls: Move & Set as cover */}
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1">
                        {/* RTL: Moving right in display is moving towards index 0 */}
                        <button
                          type="button"
                          onClick={() => handleMove(idx, 'right')}
                          disabled={idx === 0}
                          className="p-1 rounded bg-white/90 hover:bg-white text-stone-800 disabled:opacity-30 transition cursor-pointer"
                          title="تحريك للأمام"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMove(idx, 'left')}
                          disabled={idx === images.length - 1}
                          className="p-1 rounded bg-white/90 hover:bg-white text-stone-800 disabled:opacity-30 transition cursor-pointer"
                          title="تحريك للخلف"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {!isCover && (
                        <button
                          type="button"
                          onClick={() => handleSetCover(idx)}
                          className="text-[10px] bg-white/90 hover:bg-white text-stone-900 font-bold px-1.5 py-1 rounded transition cursor-pointer"
                          title="تعيين كصورة غلاف رئيسية"
                        >
                          تعيين غلاف
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
