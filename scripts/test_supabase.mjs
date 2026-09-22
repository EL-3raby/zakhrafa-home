import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rfuanarhmyjcossjbhsw.supabase.co';
const supabaseKey = 'sb_publishable_u2_S8M3v2Zo6QjJFXRTXlA_1nUjwd90';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: categories, error: catError } = await supabase.from('categories').select('*');
  console.log('Categories count:', categories ? categories.length : 'error', catError);
  if (categories && categories.length > 0) {
    console.log('Categories found:', categories.map(c => ({ id: c.id, slug: c.slug, name_ar: c.name_ar })));
  }

  const { data: products, error: prodError } = await supabase.from('products').select('id, slug, name, category_id');
  console.log('Products count:', products ? products.length : 'error', prodError);
  if (products && products.length > 0) {
    console.log('Products found:', products);
  }

  // Also test if anon can insert
  const testInsert = await supabase.from('categories').insert([
    { slug: 'test-insert-check', name_ar: 'تجربة', name_en: 'test', image: 'https://test.com', icon_name: 'Sofa', display_order: 99 }
  ]);
  console.log('Anon insert test result:', testInsert.error ? testInsert.error.message : 'SUCCESS');

  if (!testInsert.error) {
    // clean it up
    await supabase.from('categories').delete().eq('slug', 'test-insert-check');
  }
}

run();
