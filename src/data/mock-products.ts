import { Product } from '@/types/product';
import { Category } from '@/types/category';

export const CATEGORIES: Category[] = [
  {
    id: 'cecfbc32-8475-4faf-8a8e-a1316a0cb5fd',
    slug: 'living-rooms',
    name_ar: 'غرف المعيشة والصالونات',
    name_en: 'Living Rooms & Sofas',
    description_ar:
      'أطقم كنب وكنبات زاوية مودرن وكلاسيك بأقمشة إيطالية فاخرة وهياكل من خشب الزان الطبيعي المتين.',
    image_url:
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=900&auto=format&fit=crop',
    item_count: 0,
    is_active: true,
  },
  {
    id: 'fc0dd3eb-ee24-4a38-bc85-3f6bfa4f77a4',
    slug: 'dining-rooms',
    name_ar: 'غرف السفرة وطاولات الطعام',
    name_en: 'Dining Rooms & Tables',
    description_ar:
      'طاولات طعام من الرخام والخشب الطبيعي مع كراسي مريحة وأنيقة تليق بأرقى مناسبات الضيافة.',
    image_url:
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=900&auto=format&fit=crop',
    item_count: 0,
    is_active: true,
  },
  {
    id: '7e8cbe3c-0477-4371-9da9-f9452fd5ecf1',
    slug: 'bedrooms',
    name_ar: 'غرف النوم الفاخرة',
    name_en: 'Luxury Bedrooms',
    description_ar:
      'تصاميم أسرّة عصرية مع خزائن وكمودينات بتشطيبات راقية تمنحك أقصى درجات الراحة والهدوء.',
    image_url:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=900&auto=format&fit=crop',
    item_count: 0,
    is_active: true,
  },
  {
    id: 'ad16df0d-5b7c-479d-bc66-a195fc9937db',
    slug: 'tables-consoles',
    name_ar: 'طاولات القهوة والكونسول',
    name_en: 'Coffee Tables & Consoles',
    description_ar:
      'طاولات جانبية وكونسولات مدخل فاخرة بتفاصيل من الرخام، الخشب الطبيعي، والستانلس ستيل المقاوم.',
    image_url:
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=900&auto=format&fit=crop',
    item_count: 0,
    is_active: true,
  },
  {
    id: '6605f773-6018-4509-8450-6311e9da527e',
    slug: 'decor-accessories',
    name_ar: 'الديكورات واللمسات المبتكرة',
    name_en: 'Decor & Lighting',
    description_ar:
      'إكسسوارات جدارية، مرايا فخمة، ووحدات إضاءة فريدة تكتمل بها أناقة وهوية كل مساحة في منزلك.',
    image_url:
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=900&auto=format&fit=crop',
    item_count: 0,
    is_active: true,
  },
  {
    id: 'cf4a6589-b0cb-4791-a1a7-6da84772035a',
    slug: 'custom-projects',
    name_ar: 'تفصيل خاص ومشاريع متكاملة',
    name_en: 'Bespoke & Custom Projects',
    description_ar:
      'تصميم وتنفيذ أثاث حصري ومقاسات خاصة تحت إشراف مهندسي ديكور ومصممي أثاث محترفين.',
    image_url:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=900&auto=format&fit=crop',
    item_count: 0,
    is_active: true,
  },
];

// Mock products completely wiped - all products are loaded strictly from Supabase
export const PRODUCTS: Product[] = [];

// Helper functions for data queries
export function getAllCategories(): Category[] {
  return CATEGORIES;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter((p) => p.category_id === categorySlug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(
  currentProductId: string,
  categoryId: string,
  limit: number = 3
): Product[] {
  return PRODUCTS.filter(
    (p) => p.category_id === categoryId && p.id !== currentProductId
  ).slice(0, limit);
}
