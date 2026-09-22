'use client';

import React from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  itemName?: string;
  onConfirm: () => Promise<void> | void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  title,
  message,
  itemName,
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      dir="rtl"
    >
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-5 text-right">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 stroke-[2]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-extrabold text-stone-900">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
              {message}
            </p>
            {itemName && (
              <p className="text-xs font-bold text-stone-800 bg-stone-100 p-2 rounded-lg mt-2 truncate">
                « {itemName} »
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-stone-100">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 text-xs sm:text-sm font-bold text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition cursor-pointer disabled:opacity-50"
          >
            إلغاء
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="px-5 py-2 text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>جاري الحذف...</span>
              </>
            ) : (
              <span>تأكيد الحذف</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
