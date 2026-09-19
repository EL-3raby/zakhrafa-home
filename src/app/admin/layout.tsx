import type { Metadata } from 'next';
import Link from 'next/link';
import { BrandLogo } from '@/components/common/BrandLogo';

export const metadata: Metadata = {
  title: 'لوحة التحكم | زخرفة',
  description: 'إدارة كتالوج المنتجات والأقسام لمتجر زخرفة',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col" dir="rtl">
      <header className="bg-[#0B3D42] text-white border-b border-[#12555C] px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="inline-block" aria-label="عرض المتجر">
              <BrandLogo className="h-8 w-auto" theme="dark" />
            </Link>
            <span className="text-xs bg-[#E17F3F] text-white px-2 py-0.5 rounded font-bold">
              لوحة الإدارة
            </span>
          </div>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/" className="text-slate-200 hover:text-white transition">
              عرض المتجر
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-7xl w-full mx-auto p-6">{children}</main>
    </div>
  );
}
