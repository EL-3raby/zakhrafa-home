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
  ExternalLink,
  LogOut,
  Menu,
  X,
  User,
} from 'lucide-react';

export const AdminNav: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) return;

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

  // If on login page, render children directly without admin header/navigation
  if (isLoginPage) {
    return <>{children}</>;
  }

  const navItems = [
    {
      label: 'نظرة عامة',
      href: '/admin',
      icon: LayoutDashboard,
      active: pathname === '/admin',
    },
    {
      label: 'المنتجات',
      href: '/admin/products',
      icon: Package,
      active: pathname.startsWith('/admin/products'),
    },
    {
      label: 'الفئات والأقسام',
      href: '/admin/categories',
      icon: FolderTree,
      active: pathname.startsWith('/admin/categories'),
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col" dir="rtl">
      {/* Top Header */}
      <header className="bg-[#0B3D42] text-white border-b border-[#12555C] sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Right: Logo & Badge */}
            <div className="flex items-center gap-3">
              <Link href="/admin" className="inline-block" aria-label="لوحة الإدارة">
                <BrandLogo className="h-8 w-auto" theme="dark" />
              </Link>
              <span className="text-[11px] bg-[#E17F3F] text-white px-2 py-0.5 rounded-full font-bold shadow-xs">
                لوحة الإدارة
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1.5">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                      item.active
                        ? 'bg-white/15 text-white shadow-xs'
                        : 'text-stone-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Left: User Info & Actions */}
            <div className="flex items-center gap-3">
              {/* Storefront Link */}
              <Link
                href="/"
                target="_blank"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-stone-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/10 transition"
                title="فتح واجهة المتجر في نافذة جديدة"
              >
                <span>المتجر</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              {/* User Email Indicator */}
              {userEmail && (
                <div className="hidden lg:flex items-center gap-1.5 text-xs text-stone-300 bg-white/10 px-2.5 py-1 rounded-lg">
                  <User className="w-3.5 h-3.5 text-[#E17F3F]" />
                  <span className="truncate max-w-[150px]" dir="ltr">{userEmail}</span>
                </div>
              )}

              {/* Logout Button */}
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="inline-flex items-center gap-1.5 bg-red-600/80 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs transition-colors cursor-pointer disabled:opacity-60"
                title="تسجيل الخروج"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">خروج</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
                aria-label="القائمة"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#12555C] bg-[#093237] px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                    item.active
                      ? 'bg-white/15 text-white'
                      : 'text-stone-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <div className="pt-2 border-t border-white/10 mt-2 flex items-center justify-between">
              <Link
                href="/"
                target="_blank"
                className="text-xs text-stone-300 hover:text-white flex items-center gap-1.5 py-1.5"
              >
                <span>معاينة المتجر</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              {userEmail && (
                <span className="text-[11px] text-stone-400" dir="ltr">{userEmail}</span>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>

      {/* Admin Footer */}
      <footer className="border-t border-stone-200 bg-white py-4 px-6 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>كتالوج زخرفة للأثاث والديكور • لوحة التحكم الإدارية</span>
          <span className="text-stone-400">الإصدار 1.0</span>
        </div>
      </footer>
    </div>
  );
};
