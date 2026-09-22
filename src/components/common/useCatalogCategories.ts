'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { CATEGORIES as MOCK_CATEGORIES } from '@/data/mock-products';
import type { Category } from '@/types/category';
import type { CategoryRecord } from '@/types/database';

function mapCategory(record: CategoryRecord): Category {
  return {
    id: record.id,
    slug: record.slug,
    name_ar: record.name_ar,
    name_en: record.name_en,
    image_url: record.image,
    display_order: record.display_order,
    item_count: record.product_count,
    is_active: true,
  };
}

export function useCatalogCategories() {
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);

  useEffect(() => {
    const supabase = createClient();
    let isMounted = true;

    const loadCategories = async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });

      if (!error && data && isMounted) {
        setCategories(data.map((record) => mapCategory(record as CategoryRecord)));
      }
    };

    loadCategories();

    const channel = supabase
      .channel('public-categories-menu')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'categories' },
        () => {
          loadCategories();
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return categories;
}
