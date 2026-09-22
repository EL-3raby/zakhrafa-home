import React from 'react';
import { ProductForm } from '@/components/admin/ProductForm';

export const metadata = {
  title: 'إضافة منتج جديد | لوحة الإدارة',
};

export default function NewProductPage() {
  return <ProductForm isEditMode={false} />;
}
