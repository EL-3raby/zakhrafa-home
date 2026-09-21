'use client';

import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { ProductCard } from '@/components/catalog/ProductCard';
import { useStore } from '@/components/common/StoreProvider';

export default function WishlistPage() {
  const { wishlist } = useStore();

  return (
    <div className="min-h-screen bg-slate-50/50 px-4 py-8 pb-24">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center gap-3">
          <Heart className="h-6 w-6 text-[#E17F3F]" />
          <div>
            <h1 className="text-2xl font-extrabold text-[#0B3D42]">المفضلة</h1>
            <p className="mt-1 text-sm text-stone-500">احتفظ بالقطع التي أعجبتك للرجوع إليها لاحقًا.</p>
          </div>
        </div>
        {wishlist.length === 0 ? (
          <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center">
            <p className="font-bold text-stone-700">لم تضف أي قطع للمفضلة بعد</p>
            <Link href="/categories" className="mt-4 inline-flex rounded-xl bg-[#0B3D42] px-5 py-2.5 text-sm font-bold text-white">تصفح المنتجات</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"><>{wishlist.map((product) => <ProductCard key={product.id} product={product} />)}</></div>
        )}
      </div>
    </div>
  );
}