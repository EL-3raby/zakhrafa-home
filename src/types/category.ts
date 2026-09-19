export interface Category {
  id: string;
  name_ar: string;
  name_en?: string;
  slug: string;
  description_ar?: string;
  image_url: string;
  display_order?: number;
  is_active?: boolean;
  item_count?: number;
  created_at?: string;
  updated_at?: string;
}

export type CategoryCreateInput = Omit<Category, 'id' | 'created_at' | 'updated_at'>;
export type CategoryUpdateInput = Partial<CategoryCreateInput>;
