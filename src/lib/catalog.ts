import { createClient } from '@supabase/supabase-js';
import { ProductRecord, CategoryRecord } from '@/types/database';
import { Product } from '@/types/product';
import { Category } from '@/types/category';
import {
  PRODUCTS as MOCK_PRODUCTS,
  CATEGORIES as MOCK_CATEGORIES,
} from '@/data/mock-products';

const isDev = process.env.NODE_ENV === 'development';

// Public Supabase client for ISR and Server Components without reading cookies
export function getPublicSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    '';
  return createClient(supabaseUrl, supabaseKey);
}

// Convert Supabase ProductRecord to storefront Product
export function mapProductRecordToProduct(record: ProductRecord): Product {
  const images =
    record.images && record.images.length > 0
      ? record.images.map((url, idx) => ({
          url,
          is_primary: idx === 0,
        }))
      : [
          {
            url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop',
            is_primary: true,
          },
        ];

  const dimensionsObj =
    record.width && record.depth && record.height
      ? {
          width: Number(record.width),
          depth: Number(record.depth),
          height: Number(record.height),
          unit: 'سم',
        }
      : typeof record.dimensions === 'string'
      ? record.dimensions
      : { width: 220, depth: 90, height: 85, unit: 'سم' };

  return {
    id: record.id,
    slug: record.slug,
    name_ar: record.name,
    name_en: record.slug,
    description_ar: record.description,
    category_id: record.category?.slug || record.category_id,
    category: record.category
      ? {
          id: record.category.id,
          slug: record.category.slug,
          name_ar: record.category.name_ar,
          name_en: record.category.name_en,
          image_url: record.category.image,
        }
      : undefined,
    price: record.original_price ? Number(record.original_price) : undefined,
    discount_price: record.discount_price ? Number(record.discount_price) : undefined,
    is_price_on_request:
      record.availability_status === 'made_to_order' && !record.original_price,
    material: [record.material_primary, record.material_secondary]
      .filter(Boolean)
      .join(' + '),
    materials: [record.material_primary, record.material_secondary].filter(
      Boolean
    ) as string[],
    color: record.color,
    colors:
      record.available_colors && record.available_colors.length > 0
        ? record.available_colors
        : [record.color],
    dimensions: dimensionsObj as Product['dimensions'],
    stock_status:
      record.availability_status === 'available_now' ? 'in_stock' : 'made_to_order',
    is_featured: Boolean(record.is_featured),
    images,
    wood_type: record.wood_type || undefined,
    fabric_type: record.fabric_type || undefined,
    foam_density: record.foam_density || undefined,
    legs_type: record.legs_type || undefined,
    hardware_type: record.hardware_type || undefined,
    warranty_years: record.warranty_years ? Number(record.warranty_years) : 5,
    custom_dimensions_available: record.custom_dimensions_available !== false,
    space_guide_notes: record.space_guide_notes || undefined,
    created_at: record.created_at,
    updated_at: record.updated_at,
  };
}

// Convert Supabase CategoryRecord to storefront Category
export function mapCategoryRecordToCategory(record: CategoryRecord): Category {
  return {
    id: record.id,
    slug: record.slug,
    name_ar: record.name_ar,
    name_en: record.name_en,
    image_url: record.image,
    display_order: record.display_order,
    is_active: true,
  };
}

// 1. Fetch all categories
export async function getAllCategories(): Promise<Category[]> {
  try {
    const supabase = getPublicSupabase();
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;

    if (data && data.length > 0) {
      return data.map(mapCategoryRecordToCategory);
    }
  } catch (err) {
    console.error('Error fetching categories from Supabase:', err);
  }

  // Fallback only in development
  return isDev ? MOCK_CATEGORIES : [];
}

// 2. Fetch category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const supabase = getPublicSupabase();
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) throw error;

    if (data) {
      return mapCategoryRecordToCategory(data);
    }
  } catch (err) {
    console.error(`Error fetching category with slug "${slug}":`, err);
  }

  if (isDev) {
    const found = MOCK_CATEGORIES.find((c) => c.slug === slug);
    return found || null;
  }

  return null;
}

// 3. Fetch all products
export async function getAllProducts(): Promise<Product[]> {
  try {
    const supabase = getPublicSupabase();
    const { data, error } = await supabase
      .from('products')
      .select('*, category:categories(*)')
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (data && data.length > 0) {
      return data.map(mapProductRecordToProduct);
    }
  } catch (err) {
    console.error('Error fetching products from Supabase:', err);
  }

  // Fallback only in development
  return isDev ? MOCK_PRODUCTS : [];
}

// 4. Fetch product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const supabase = getPublicSupabase();
    const { data, error } = await supabase
      .from('products')
      .select('*, category:categories(*)')
      .eq('slug', slug)
      .maybeSingle();

    if (error) throw error;

    if (data) {
      return mapProductRecordToProduct(data);
    }
  } catch (err) {
    console.error(`Error fetching product with slug "${slug}":`, err);
  }

  if (isDev) {
    const found = MOCK_PRODUCTS.find((p) => p.slug === slug);
    return found || null;
  }

  return null;
}

// 5. Fetch products by category slug
export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    const supabase = getPublicSupabase();

    // 1. Look up category ID
    const { data: cat } = await supabase
      .from('categories')
      .select('id, slug')
      .eq('slug', categorySlug)
      .maybeSingle();

    if (cat) {
      const { data, error } = await supabase
        .from('products')
        .select('*, category:categories(*)')
        .eq('category_id', cat.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) {
        return data.map(mapProductRecordToProduct);
      }
    }
  } catch (err) {
    console.error(`Error fetching products for category "${categorySlug}":`, err);
  }

  if (isDev) {
    return MOCK_PRODUCTS.filter((p) => p.category_id === categorySlug);
  }

  return [];
}

// 6. Fetch related products
export async function getRelatedProducts(
  currentProductId: string,
  categorySlugOrId: string,
  limit: number = 3
): Promise<Product[]> {
  try {
    const supabase = getPublicSupabase();

    let categoryId = categorySlugOrId;
    // Check if categorySlugOrId is a slug
    if (!categorySlugOrId.includes('-') || categorySlugOrId.length < 32) {
      const { data: cat } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', categorySlugOrId)
        .maybeSingle();
      if (cat) categoryId = cat.id;
    }

    const { data, error } = await supabase
      .from('products')
      .select('*, category:categories(*)')
      .eq('category_id', categoryId)
      .neq('id', currentProductId)
      .limit(limit);

    if (error) throw error;
    if (data && data.length > 0) {
      return data.map(mapProductRecordToProduct);
    }
  } catch (err) {
    console.error('Error fetching related products:', err);
  }

  if (isDev) {
    return MOCK_PRODUCTS.filter(
      (p) =>
        (p.category_id === categorySlugOrId || p.category?.slug === categorySlugOrId) &&
        p.id !== currentProductId
    ).slice(0, limit);
  }

  return [];
}

// 7. Fetch discounted offers
export async function getDiscountedOffers(limit: number = 6): Promise<Product[]> {
  try {
    const supabase = getPublicSupabase();
    const { data, error } = await supabase
      .from('products')
      .select('*, category:categories(*)')
      .not('discount_price', 'is', null)
      .gt('discount_price', 0)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    if (data && data.length > 0) {
      return data.map(mapProductRecordToProduct);
    }
  } catch (err) {
    console.error('Error fetching discounted offers:', err);
  }

  if (isDev) {
    return MOCK_PRODUCTS.filter((p) => p.discount_price && p.discount_price > 0).slice(0, limit);
  }

  return [];
}
