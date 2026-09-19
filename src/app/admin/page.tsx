import Link from 'next/link';
import { Package, FolderTree, PlusCircle, ArrowRight } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5">
        <div>
          <h1 className="text-2xl font-bold text-[#0B3D42]">لوحة التحكم</h1>
          <p className="text-gray-500 text-sm mt-1">
            مرحباً بك في لوحة تحكم كتالوج زخرفة للديكورات والأثاث
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            disabled
            className="inline-flex items-center gap-2 bg-[#E17F3F] text-white px-4 py-2 rounded-lg font-medium text-sm opacity-70 cursor-not-allowed shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            إضافة منتج جديد (قريباً)
          </button>
        </div>
      </div>

      {/* Quick stats placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm font-medium">إجمالي المنتجات</span>
            <div className="w-10 h-10 rounded-lg bg-[#0B3D42]/10 text-[#0B3D42] flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-[#0B3D42] mt-3">200+</p>
          <p className="text-xs text-emerald-600 mt-2 font-medium">جاهزة للربط مع Supabase</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm font-medium">الأقسام النشطة</span>
            <div className="w-10 h-10 rounded-lg bg-[#E17F3F]/10 text-[#E17F3F] flex items-center justify-center">
              <FolderTree className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-[#0B3D42] mt-3">6</p>
          <p className="text-xs text-gray-500 mt-2">غرف معيشة، نوم، سفرة والمزيد</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm font-medium">حالة التخزين السحابي</span>
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
          </div>
          <p className="text-lg font-semibold text-gray-800 mt-3">Cloudinary & Supabase</p>
          <p className="text-xs text-gray-500 mt-2">تم تجهيز الهيكل الأساسي للربط</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl border border-dashed border-gray-300 text-center py-12">
        <p className="text-gray-600 font-medium">
          سيتم تفعيل لوحة الإدارة الكاملة لإضافة وتعديل المنتجات والأقسام في الخطوة القادمة.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-4 text-[#0B3D42] hover:text-[#E17F3F] font-semibold text-sm transition"
        >
          <span>الرجوع للصفحة الرئيسية</span>
          <ArrowRight className="w-4 h-4 rotate-180" />
        </Link>
      </div>
    </div>
  );
}
