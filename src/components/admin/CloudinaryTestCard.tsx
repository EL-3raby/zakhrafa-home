'use client';

import React, { useState } from 'react';
import { CloudinaryImageUpload } from '@/components/common/CloudinaryImageUpload';
import { CloudRain, CheckCircle, ExternalLink } from 'lucide-react';

export const CloudinaryTestCard: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<{ url: string; public_id: string } | null>(null);

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#E17F3F]/10 text-[#E17F3F] flex items-center justify-center">
            <CloudRain className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#0B3D42]">تجربة رفع الصور المباشر (Cloudinary)</h3>
            <p className="text-xs text-gray-500">جرب رفع صورة لاختبار الاتصال بالسحابة والتأكد من نجاح الإعداد</p>
          </div>
        </div>

        {uploadedImage && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>متصل وفعال</span>
          </span>
        )}
      </div>

      <CloudinaryImageUpload
        onUploadSuccess={(result) => setUploadedImage(result)}
        onRemove={() => setUploadedImage(null)}
        folder="zakhrafa/demo"
      />

      {uploadedImage && (
        <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 space-y-1.5 text-xs text-stone-700">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-stone-900">معرّف الصورة (Public ID):</span>
            <code className="bg-stone-200 px-1.5 py-0.5 rounded font-mono text-[11px]">{uploadedImage.public_id}</code>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-stone-900">رابط السحابة المباشر:</span>
            <a
              href={uploadedImage.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E17F3F] hover:underline flex items-center gap-1 font-medium truncate max-w-[280px]"
            >
              <span className="truncate">{uploadedImage.url}</span>
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
