'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
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

let cachedCategories: Category[] = [];
let isFetching = false;
const listeners = new Set<(categories: Category[]) => void>();

async function fetchCategories() {
  if (isFetching) return;
  isFetching = true;

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('display_order', { ascending: true });

    if (!error && data) {
      cachedCategories = data.map((record) => mapCategory(record as CategoryRecord));
      listeners.forEach((listener) => listener(cachedCategories));
    }
  } catch (err) {
    console.error('Error loading catalog categories:', err);
  } finally {
    isFetching = false;
  }
}

export function useCatalogCategories() {
  const [categories, setCategories] = useState<Category[]>(cachedCategories);

  useEffect(() => {
    // 1. Register listener for state synchronization
    listeners.add(setCategories);

    // 2. Fetch if not already cached
    if (cachedCategories.length === 0) {
      fetchCategories();
    } else {
      setCategories(cachedCategories);
    }

    // 3. Unique channel ID to prevent collision with other hook instances (Navbar, Footer)
    const supabase = createClient();
    const channelId = `categories-rt-${Math.random().toString(36).slice(2, 9)}`;
    const channel = supabase
      .channel(channelId)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'categories' },
        () => {
          fetchCategories();
        }
      )
      .subscribe();

    return () => {
      listeners.delete(setCategories);
      supabase.removeChannel(channel);
    };
  }, []);

  return categories;
}
