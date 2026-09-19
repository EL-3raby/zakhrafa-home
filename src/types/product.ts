import { Category } from './category';

export type StockStatus = 'in_stock' | 'out_of_stock' | 'made_to_order';

export interface ProductImage {
  id?: string;
  url: string;
  cloudinary_public_id?: string;
  alt?: string;
  is_primary?: boolean;
  display_order?: number;
}

export interface ProductDimensions {
  width?: number; // in cm
  height?: number; // in cm
  depth?: number; // in cm
  unit?: string; // default "سم"
}

export interface Product {
  id: string;
  slug: string;
  name_ar: string;
  name_en?: string;
  description_ar: string;
  description_en?: string;
  category_id: string;
  category?: Category;
  price?: number;
  discount_price?: number;
  is_price_on_request?: boolean;
  material?: string; // e.g. خشب زان، قماش مخمل، ستانلس ستيل، رخام
  materials?: string[];
  color?: string; // e.g. بيج، زيتي، كحلي، بني
  colors?: string[];
  dimensions?: ProductDimensions;
  stock_status: StockStatus;
  is_featured?: boolean;
  is_new_arrival?: boolean;
  images: ProductImage[];
  meta_title?: string;
  meta_description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProductFilterParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  material?: string;
  color?: string;
  stockStatus?: StockStatus;
  isFeatured?: boolean;
  search?: string;
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'name_asc';
  page?: number;
  limit?: number;
}

export type ProductCreateInput = Omit<Product, 'id' | 'created_at' | 'updated_at'>;
export type ProductUpdateInput = Partial<ProductCreateInput>;
