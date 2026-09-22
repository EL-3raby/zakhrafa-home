import type { Metadata } from 'next';
import { AdminNav } from '@/components/admin/AdminNav';

export const metadata: Metadata = {
  title: 'لوحة التحكم | زخرفة',
  description: 'إدارة كتالوج المنتجات والأقسام لمتجر زخرفة للأثاث والديكور',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminNav>{children}</AdminNav>;
}
