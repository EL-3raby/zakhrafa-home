'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { BrandLogo } from '@/components/common/BrandLogo';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  PlusCircle,
  ExternalLink,
  LogOut,
  Menu,
  X,
  User,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sliders,
} from 'lucide-react';

export const AdminNav: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  // Load user info and sidebar preference
  useEffect(() => {
    setHasMounted(true);

    if (isLoginPage) return;

    // Load saved collapsed state
    try {
      const saved = localStorage.getItem('zakhrafa_admin_sidebar_collapsed');
      if (saved !== null) {
        setIsCollapsed(saved === 'true');
      }
    } catch {
      // Ignore localStorage errors
    }

    const fetchUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.email) {
        setUserEmail(user.email);
      }
    };

    fetchUser();
  }, [isLoginPage]);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleCollapsed = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('zakhrafa_admin_sidebar_collapsed', String(next));
      } catch {
        // Ignore
      }
      return next;
    });
  };

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsSigningOut(false);
    }
  };

  // If on login page, render children directly without admin sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  const navItems = [
    {
      label: 'نظرة عامة',
      href: '/admin',
      icon: LayoutDashboard,
      active: pathname === '/admin',
      badge: null,
    },
    {
      label: 'المنتجات',
      href: '/admin/products',
      icon: Package,
      active: pathname.startsWith('/admin/products') && pathname !== '/admin/products/new',
      badge: null,
    },
    {
      label: 'إضافة منتج جديد',
      href: '/admin/products/new',
      icon: PlusCircle,
      active: pathname === '/admin/products/new',
      badge: 'جديد',
    },
    {
      label: 'الفئات والأقسام',
      href: '/admin/categories',
      icon: FolderTree,
      active: pathname.startsWith('/admin/categories'),
      badge: null,
    },
    {
      label: 'بنرات الواجهة (Hero)',
      href: '/admin/hero-slides',
      icon: Sliders,
      active: pathname.startsWith('/admin/hero-slides'),
      badge: 'فيديو/صور',
    },
  ];

  return (
    <div className="min-h-screen bg-stone-100/60 flex flex-col md:flex-row" dir="rtl">
      {/* ========================================================================= */}
      {/* 1. Desktop Collapsible Sticky Sidebar */}
      {/* ========================================================================= */}
      <aside
        className={`hidden md:flex relative flex-col justify-between bg-[#0B3D42] text-white shrink-0 min-h-screen sticky top-0 h-screen border-l border-[#12555C] shadow-xl z-30 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-64 lg:w-72'
        }`}
      >
        {/* Floating Center Border Arrow Toggle (مؤشر سهم احترافي في المنتصف) */}
        <button
          type="button"
          onClick={toggleCollapsed}
          className="absolute -left-3.5 top-1/2 -translate-y-1/2 z-40 w-7 h-7 rounded-full bg-white text-[#0B3D42] hover:bg-[#E17F3F] hover:text-white border border-stone-200/90 shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-115 active:scale-90 group"
          title={isCollapsed ? 'توسيع القائمة الجانبية' : 'تصغير القائمة الجانبية'}
          aria-label={isCollapsed ? 'توسيع القائمة الجانبية' : 'تصغير القائمة الجانبية'}
        >
          {isCollapsed ? (
            <ChevronLeft className="w-4 h-4 stroke-[2.5] transition-transform group-hover:-translate-x-0.5" />
          ) : (
            <ChevronRight className="w-4 h-4 stroke-[2.5] transition-transform group-hover:translate-x-0.5" />
          )}

          {/* Floating Tooltip */}
          <span className="absolute right-full mr-2.5 px-2.5 py-1 bg-[#07262A] text-white text-[11px] font-bold rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity border border-white/10">
            {isCollapsed ? 'توسيع القائمة' : 'تصغير القائمة'}
          </span>
        </button>

        {/* Top Section: Brand Logo / Official Emblem */}
        <div
          className={`border-b border-[#12555C] transition-all duration-300 flex items-center ${
            isCollapsed ? 'p-4 justify-center' : 'p-5 justify-start'
          }`}
        >
          <Link
            href="/admin"
            className="block transition-all duration-200"
            title="لوحة التحكم الرئيسية"
          >
            {isCollapsed ? (
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-white/15 to-white/5 border border-white/15 flex items-center justify-center shadow-md hover:scale-105 transition-all group relative">
                <BrandLogo markOnly theme="dark" className="h-7 w-auto" />
                <span className="absolute right-full mr-3 px-2.5 py-1 bg-[#07262A] text-white text-xs font-bold rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity border border-white/10">
                  لوحة التحكم الرئيسية
                </span>
              </div>
            ) : (
              <div className="space-y-1">
                <BrandLogo className="h-8 w-auto" theme="dark" />
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 bg-[#E17F3F]/15 border border-[#E17F3F]/30 text-[#E17F3F] px-2 py-0.5 rounded-md text-[10px] font-bold">
                    <ShieldCheck className="w-3 h-3" />
                    <span>لوحة الإدارة</span>
                  </span>
                </div>
              </div>
            )}
          </Link>
        </div>

        {/* Middle Section: Navigation Links with Tooltips in Collapsed Mode */}
        <div className="flex-1 overflow-y-auto px-3 py-5 no-scrollbar space-y-6">

          {/* Group 1: Core Navigation */}
          <div>
            {!isCollapsed && (
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 px-3 block mb-2">
                إدارة الكتالوج
              </span>
            )}

            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative flex items-center rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 group ${
                      isCollapsed
                        ? 'justify-center w-10 h-10 mx-auto p-0'
                        : 'justify-between px-3.5 py-2.5'
                    } ${
                      item.active
                        ? 'bg-[#E17F3F] text-white shadow-md shadow-[#E17F3F]/20'
                        : 'text-stone-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent
                        className={`w-4 h-4 transition-transform group-hover:scale-110 shrink-0 ${
                          item.active ? 'text-white' : 'text-stone-300'
                        }`}
                      />
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                    </div>

                    {!isCollapsed && (
                      item.badge ? (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                            item.active
                              ? 'bg-white/25 text-white'
                              : 'bg-[#E17F3F]/20 text-[#E17F3F]'
                          }`}
                        >
                          {item.badge}
                        </span>
                      ) : item.active ? (
                        <ChevronLeft className="w-3.5 h-3.5 text-white/80 shrink-0" />
                      ) : null
                    )}

                    {/* Floating Tooltip in Collapsed Mode */}
                    {isCollapsed && (
                      <span className="absolute right-full mr-3 px-3 py-1.5 bg-[#07262A] text-white text-xs font-bold rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 flex items-center gap-1.5">
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#E17F3F] text-white">
                            {item.badge}
                          </span>
                        )}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Group 2: Quick Links */}
          <div className="pt-2 border-t border-white/10">
            {!isCollapsed && (
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 px-3 block mb-2">
                المتجر والعملاء
              </span>
            )}

            <nav className="space-y-1.5">
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className={`relative flex items-center rounded-xl text-xs sm:text-sm font-semibold text-stone-300 hover:text-white hover:bg-white/10 transition-all duration-200 group ${
                  isCollapsed
                    ? 'justify-center w-10 h-10 mx-auto p-0'
                    : 'justify-between px-3.5 py-2.5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ExternalLink className="w-4 h-4 text-[#E17F3F] transition-transform group-hover:translate-x-0.5 shrink-0" />
                  {!isCollapsed && <span>معاينة المتجر</span>}
                </div>

                {!isCollapsed && (
                  <span className="text-[10px] text-stone-400 font-normal">نافذة جديدة</span>
                )}

                {/* Floating Tooltip in Collapsed Mode */}
                {isCollapsed && (
                  <span className="absolute right-full mr-3 px-3 py-1.5 bg-[#07262A] text-white text-xs font-bold rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity border border-white/10">
                    معاينة المتجر الحي
                  </span>
                )}
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Section: Admin Card & Sign Out */}
        <div
          className={`border-t border-[#12555C] bg-[#07262A]/60 transition-all duration-300 ${
            isCollapsed ? 'p-3 space-y-2' : 'p-4 space-y-3'
          }`}
        >
          {/* User Info */}
          <div
            className={`flex items-center gap-3 group relative ${
              isCollapsed ? 'justify-center p-1' : 'px-2 py-1.5'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-[#E17F3F] shrink-0">
              <User className="w-4 h-4" />
            </div>

            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white truncate">مشرف النظام</p>
                <p className="text-[11px] text-stone-400 truncate" dir="ltr">
                  {userEmail || 'admin@zakhrafa.com'}
                </p>
              </div>
            )}

            {isCollapsed && (
              <span className="absolute right-full mr-3 px-3 py-1.5 bg-[#07262A] text-white text-xs font-bold rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity border border-white/10" dir="ltr">
                {userEmail || 'مشرف النظام'}
              </span>
            )}
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className={`flex items-center justify-center rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer disabled:opacity-60 group relative ${
              isCollapsed
                ? 'w-10 h-10 mx-auto bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white p-0'
                : 'w-full gap-2 bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 hover:border-transparent py-2 px-3'
            }`}
            title="تسجيل الخروج"
          >
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            {!isCollapsed && <span>{isSigningOut ? 'جاري الخروج...' : 'تسجيل الخروج'}</span>}

            {isCollapsed && (
              <span className="absolute right-full mr-3 px-3 py-1.5 bg-red-700 text-white text-xs font-bold rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                تسجيل الخروج
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. Mobile Top Bar (Visible only on mobile/tablets) */}
      {/* ========================================================================= */}
      <div className="md:hidden bg-[#0B3D42] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40 border-b border-[#12555C] shadow-sm">
        <Link href="/admin" className="flex items-center gap-2">
          <BrandLogo className="h-7 w-auto" theme="dark" />
          <span className="text-[10px] bg-[#E17F3F] text-white px-2 py-0.5 rounded-full font-bold">
            الإدارة
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition"
            title="معاينة المتجر"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
            aria-label="فتح القائمة الجانبية"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. Mobile Drawer Backdrop & Sidebar */}
      {/* ========================================================================= */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative mr-auto w-72 max-w-[85vw] bg-[#0B3D42] text-white h-full flex flex-col justify-between shadow-2xl z-10 border-l border-[#12555C]">
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#12555C] flex items-center justify-between">
              <BrandLogo className="h-8 w-auto" theme="dark" />
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
                aria-label="إغلاق القائمة"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                        item.active
                          ? 'bg-[#E17F3F] text-white'
                          : 'text-stone-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white font-bold">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-3 border-t border-white/10">
                <Link
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-stone-300 hover:text-white hover:bg-white/10"
                >
                  <ExternalLink className="w-4 h-4 text-[#E17F3F]" />
                  <span>معاينة المتجر الحي</span>
                </Link>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-[#12555C] bg-[#07262A]/70 space-y-3">
              {userEmail && (
                <div className="flex items-center gap-2.5 px-2">
                  <User className="w-4 h-4 text-[#E17F3F]" />
                  <span className="text-xs text-stone-300 truncate" dir="ltr">
                    {userEmail}
                  </span>
                </div>
              )}
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2.5 px-3 rounded-xl text-xs font-bold transition cursor-pointer disabled:opacity-60 shadow-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>{isSigningOut ? 'جاري الخروج...' : 'تسجيل الخروج'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. Main Content Area */}
      {/* ========================================================================= */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* Desktop Top Header Bar with Breadcrumb & Quick Sidebar Toggle */}
        <header className="hidden md:flex items-center justify-between bg-white border-b border-stone-200/80 px-6 py-3.5 sticky top-0 z-20 shadow-2xs">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
              <span className="text-[#0B3D42] font-bold">لوحة التحكم</span>
              <span>/</span>
              <span className="text-stone-700 font-semibold">
                {pathname === '/admin'
                  ? 'نظرة عامة'
                  : pathname === '/admin/products'
                  ? 'إدارة المنتجات'
                  : pathname === '/admin/products/new'
                  ? 'إضافة منتج جديد'
                  : pathname.includes('/edit')
                  ? 'تعديل منتج'
                  : pathname === '/admin/categories'
                  ? 'إدارة الأقسام'
                  : pathname.startsWith('/admin/hero-slides')
                  ? 'بنرات الواجهة الرئيسية'
                  : 'الرئيسية'}
              </span>
            </div>


          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B3D42] hover:text-[#E17F3F] bg-stone-100 hover:bg-stone-200/80 px-3 py-1.5 rounded-lg transition"
            >
              <span>معاينة المتجر</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {userEmail && (
              <div className="flex items-center gap-1.5 text-xs text-stone-600 bg-stone-50 border border-stone-200 px-3 py-1 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span dir="ltr" className="font-mono text-[11px]">{userEmail}</span>
              </div>
            )}
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>

        {/* Admin Footer */}
        <footer className="border-t border-stone-200 bg-white py-3.5 px-6 text-xs text-stone-500">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-right">
            <span>كتالوج زخرفة للأثاث والديكور • لوحة التحكم الإدارية المركزية</span>
            <span className="text-stone-400 font-mono text-[11px]">v1.2.0 • Supabase Live</span>
          </div>
        </footer>
      </div>
    </div>
  );
};
