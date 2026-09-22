'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useStore } from './StoreProvider';

const CartButton: React.FC = () => {
  const pathname = usePathname();
  const { cart } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const isActive = pathname?.startsWith('/cart');

  return (
    <Link
      href="/cart"
      className={`relative inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition-all duration-200 ${
        isActive
          ? 'border-[#0B3D42]/15 bg-[#EAF4F0] text-[#0B3D42]'
          : 'border-stone-200 bg-white text-[#0B3D42] hover:border-[#E17F3F]/40 hover:bg-[#E17F3F]/5 hover:text-[#E17F3F]'
      }`}
      aria-label="السلة"
    >
      <div className="relative flex items-center justify-center">
        <ShoppingCart className={`h-4 w-4 ${isActive ? 'text-[#0B3D42]' : 'text-[#0B3D42]'}`} />
        {mounted && cartItemCount > 0 && (
          <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#E17F3F] px-1 text-[9px] font-bold text-white ring-2 ring-white">
            {cartItemCount}
          </span>
        )}
      </div>
      <span>السلة</span>
    </Link>
  );
};

export default CartButton;
