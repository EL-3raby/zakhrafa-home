'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Heart, ShoppingCart, MessageCircle } from 'lucide-react';
import { useStore } from './StoreProvider';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const { cart, wishlist } = useStore();

  const isHome = pathname === '/';
  const isCatalog = pathname.startsWith('/categories') || pathname.startsWith('/products');
  const isCart = pathname.startsWith('/cart');
  const isWishlist = pathname.startsWith('/wishlist');

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur-xl border-t border-stone-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 select-none pb-[calc(0.375rem+env(safe-area-inset-bottom,0px))]">
      <div className="grid grid-cols-5 items-center justify-between max-w-md mx-auto">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
            isHome ? 'text-[#0B3D42] font-extrabold' : 'text-stone-500 hover:text-stone-800 font-medium'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <div className={`flex h-9 w-9 items-center justify-center rounded-2xl ${isHome ? 'bg-[#0B3D42]/10 text-[#0B3D42]' : 'text-stone-500'}`}>
              <Home className={`w-5 h-5 ${isHome ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
            </div>
            {isHome && (
              <span className="absolute -top-1 w-1 h-1 rounded-full bg-[#E17F3F]" />
            )}
          </div>
          <span className="text-[10px] mt-0.5">الرئيسية</span>
        </Link>

        {/* Catalog */}
        <Link
          href="/categories"
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
            isCatalog ? 'text-[#0B3D42] font-extrabold' : 'text-stone-500 hover:text-stone-800 font-medium'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <div className={`flex h-9 w-9 items-center justify-center rounded-2xl ${isCatalog ? 'bg-[#0B3D42]/10 text-[#0B3D42]' : 'text-stone-500'}`}>
              <LayoutGrid className={`w-5 h-5 ${isCatalog ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
            </div>
            {isCatalog && (
              <span className="absolute -top-1 w-1 h-1 rounded-full bg-[#E17F3F]" />
            )}
          </div>
          <span className="text-[10px] mt-0.5">الكتالوج</span>
        </Link>

        {/* Cart */}
        <Link
          href="/cart"
          className={`relative -mt-5 flex flex-col items-center justify-center rounded-xl py-1 font-medium transition-all ${isCart ? 'text-[#0B3D42]' : 'text-stone-500 hover:text-stone-800'}`}
        >
          <div className={`flex h-12 w-12 items-center justify-center rounded-full border-4 border-white shadow-lg transition-transform active:scale-95 ${isCart ? 'bg-[#0B3D42]' : 'bg-[#0B3D42]/90'}`}>
            <ShoppingCart className="h-5 w-5 stroke-[1.8] text-white" />
          </div>
          <span className="mt-0.5 text-[10px] font-bold">السلة</span>
          {cart.length > 0 && <span className="absolute right-1/2 top-0 flex h-5 min-w-5 translate-x-5 items-center justify-center rounded-full bg-[#E17F3F] px-1 text-[9px] font-bold text-white ring-2 ring-white">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>}
        </Link>

        {/* Wishlist */}
        <Link
          href="/wishlist"
          className={`relative flex flex-col items-center justify-center rounded-xl py-1 font-medium transition-all ${isWishlist ? 'text-[#0B3D42]' : 'text-stone-500 hover:text-stone-800'}`}
        >
          <div className={`flex h-9 w-9 items-center justify-center rounded-2xl ${isWishlist ? 'bg-[#E17F3F]/10' : ''}`}>
            <Heart className="h-5 w-5 stroke-[1.75] text-[#E17F3F]" fill={isWishlist ? 'currentColor' : 'none'} />
          </div>
          <span className="text-[10px] mt-0.5">المفضلة</span>
          {wishlist.length > 0 && <span className="absolute top-0 right-1/4 min-w-4 h-4 px-1 rounded-full bg-[#E17F3F] text-white text-[9px] flex items-center justify-center">{wishlist.length}</span>}
        </Link>

        {/* Support */}
        <Link
          href="/#contact"
          className="flex flex-col items-center justify-center rounded-xl py-1 font-medium text-stone-500 transition-all hover:text-stone-800"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl text-stone-500">
            <MessageCircle className="h-5 w-5 stroke-[1.75]" />
          </div>
          <span className="text-[10px] mt-0.5">التواصل</span>
        </Link>

      </div>
    </div>
  );
};
