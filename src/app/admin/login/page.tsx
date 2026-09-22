'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { BrandLogo } from '@/components/common/BrandLogo';
import { Lock, Mail, Eye, EyeOff, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage('يرجى إدخال البريد الإلكتروني وكلمة المرور.');
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setErrorMessage('بيانات الدخول غير صحيحة. يرجى التحقق من البريد وكلمة المرور.');
        } else if (error.message.includes('Email not confirmed')) {
          setErrorMessage('البريد الإلكتروني لم يتم تأكيده بعد.');
        } else {
          setErrorMessage(error.message || 'حدث خطأ أثناء تسجيل الدخول.');
        }
        return;
      }

      // Successful login
      router.push('/admin');
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'تعذر الاتصال بالخادم';
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-[#07262A] via-[#0B3D42] to-[#0D444A] text-stone-100"
      dir="rtl"
    >
      {/* Background ambient accents */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-[#E17F3F]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 rounded-full bg-[#12555C]/30 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-stone-100 text-stone-900 space-y-7">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex justify-center mb-1">
            <BrandLogo className="h-10 w-auto" theme="light" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B3D42]/5 text-[#0B3D42] text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E17F3F]" />
            <span>لوحة الإدارة المركزية</span>
          </div>

          <h1 className="text-2xl font-extrabold text-[#0B3D42] tracking-tight">
            تسجيل الدخول
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            أدخل بيانات حساب المشرف لإدارة الكتالوج والمنتجات
          </p>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5 text-right">
            <label className="block text-xs font-bold text-stone-700">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@zakhrafa.com"
                dir="ltr"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 pl-10 text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D42]/20 focus:border-[#0B3D42] transition placeholder:text-stone-400 text-left font-sans"
              />
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5 text-right">
            <label className="block text-xs font-bold text-stone-700">
              كلمة المرور
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                dir="ltr"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 pl-10 pr-10 text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D42]/20 focus:border-[#0B3D42] transition placeholder:text-stone-400 text-left font-sans"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 transition cursor-pointer"
                aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-[#E17F3F] hover:bg-[#C96A2D] text-white font-bold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed text-sm"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>جاري التحقق والدخول...</span>
              </>
            ) : (
              <span>دخول لوحة التحكم</span>
            )}
          </button>
        </form>

        <div className="pt-2 text-center border-t border-stone-100">
          <p className="text-[11px] text-stone-400">
            نظام كتالوج زخرفة للأثاث والديكور • محمي بصلاحيات المشرف فقط
          </p>
        </div>
      </div>
    </div>
  );
}
