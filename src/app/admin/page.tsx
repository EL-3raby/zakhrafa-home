import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import {
  Package,
  FolderTree,
  PlusCircle,
  ArrowRight,
  Star,
} from 'lucide-react';

export const metadata = {
  title: 'لوحة التحكم | زخرفة',
};

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch real-time metrics safely from Supabase
  let totalProducts = 0;
  let totalCategories = 0;
  let featuredProducts = 0;

  try {
    const [productsRes, categoriesRes, featuredRes] = await Promise.all([
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('categories').select('*', { count: 'exact', head: true }),
      supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('is_featured', true),
    ]);

    totalProducts = productsRes.count ?? 0;
    totalCategories = categoriesRes.count ?? 0;
    featuredProducts = featuredRes.count ?? 0;
  } catch (error) {
    console.error('Error fetching dashboard stats from Supabase:', error);
  }

  return (
    <div className="space-y-8" dir="rtl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B3D42]">
            لوحة التحكم الرئيسية
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            مرحباً بك في لوحة إدارة كتالوج متجر زخرفة للأثاث والديكور
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 bg-[#E17F3F] hover:bg-[#C96A2D] text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>إضافة منتج جديد</span>
          </Link>
        </div>
      </div>

      {/* Real-time stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Products Stat */}
        <Link
          href="/admin/products"
          className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs hover:shadow-md hover:border-[#0B3D42]/30 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-stone-500 text-xs sm:text-sm font-bold">
              إجمالي المنتجات
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#0B3D42]/10 text-[#0B3D42] flex items-center justify-center group-hover:scale-110 transition">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-[#0B3D42] mt-3 font-mono">
            {totalProducts}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-[#E17F3F] font-semibold mt-2">
            <span>إدارة وعرض المنتجات</span>
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
          </div>
        </Link>

        {/* Categories Stat */}
        <Link
          href="/admin/categories"
          className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs hover:shadow-md hover:border-[#E17F3F]/30 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-stone-500 text-xs sm:text-sm font-bold">
              الأقسام والفئات
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#E17F3F]/10 text-[#E17F3F] flex items-center justify-center group-hover:scale-110 transition">
              <FolderTree className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-[#0B3D42] mt-3 font-mono">
            {totalCategories}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-[#E17F3F] font-semibold mt-2">
            <span>ترتيب وتعديل الفئات</span>
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
          </div>
        </Link>

        {/* Featured Stat */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-stone-500 text-xs sm:text-sm font-bold">
              منتجات مميزة
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-stone-900 mt-3 font-mono">
            {featuredProducts}
          </p>
          <p className="text-xs text-stone-500 mt-2">
            تظهر بعلامة مميزة في الصفحة الرئيسية
          </p>
        </div>
      </div>
    </div>
  );
}
