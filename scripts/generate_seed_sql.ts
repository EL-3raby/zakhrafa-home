import fs from 'fs';
import path from 'path';
import { PRODUCTS, CATEGORIES } from '../src/data/mock-products';

// Mapping from mock category slug to Supabase slug
// The 6 categories in Supabase:
// 'living-rooms' -> 'cecfbc32-8475-4faf-8a8e-a1316a0cb5fd'
// 'dining-rooms' -> 'fc0dd3eb-ee24-4a38-bc85-3f6bfa4f77a4'
// 'bedrooms' -> '7e8cbe3c-0477-4371-9da9-f9452fd5ecf1'
// 'tables-consoles' -> 'ad16df0d-5b7c-479d-bc66-a195fc9937db'
// 'decor-accessories' -> '6605f773-6018-4509-8450-6311e9da527e'
// 'custom-projects' -> 'cf4a6589-b0cb-4791-a1a7-6da84772035a'

function escapeSql(str: string | undefined | null): string {
  if (str === undefined || str === null) return 'NULL';
  return `'${str.replace(/'/g, "''")}'`;
}

function escapeTextArray(arr: string[] | undefined | null): string {
  if (!arr || arr.length === 0) return "'{}'::TEXT[]";
  const items = arr.map((item) => escapeSql(item)).join(', ');
  return `ARRAY[${items}]::TEXT[]`;
}

console.log(`Total mock products found: ${PRODUCTS.length}`);

let sql = `-- ==============================================================================
-- ZAKHRAFA - SEED ALL MOCK PRODUCTS INTO SUPABASE
-- Run this script in Supabase SQL Editor to populate all catalog products.
-- ==============================================================================

`;

for (const product of PRODUCTS) {
  const slug = escapeSql(product.slug);
  const name = escapeSql(product.name_ar);
  const description = escapeSql(product.description_ar);
  const categorySlug = product.category_id;
  const originalPrice = product.price ? product.price : 'NULL';
  const discountPrice = product.discount_price ? product.discount_price : 'NULL';
  const availabilityStatus = escapeSql(
    product.stock_status === 'in_stock' ? 'available_now' : 'made_to_order'
  );
  const isFeatured = product.is_featured ? 'true' : 'false';

  const primaryMaterial = product.materials?.[0] || product.material || 'خشب زان طبيعي';
  const secondaryMaterial = product.materials?.[1] || null;

  const color = escapeSql(product.color || 'متعدد الألوان');
  const availableColors = escapeTextArray(
    product.colors && product.colors.length > 0 ? product.colors : [product.color || 'بيج']
  );

  let dimensionsStr = '240 عرض × 95 عمق × 85 ارتفاع سم';
  let width = 240;
  let depth = 95;
  let height = 85;

  if (typeof product.dimensions === 'object' && product.dimensions !== null) {
    width = product.dimensions.width || 200;
    depth = product.dimensions.depth || 90;
    height = product.dimensions.height || 85;
    dimensionsStr = `${width} عرض × ${depth} عمق × ${height} ارتفاع سم`;
  } else if (typeof product.dimensions === 'string') {
    dimensionsStr = product.dimensions;
  }

  const imageUrls = product.images.map((img) => img.url);
  const images = escapeTextArray(imageUrls);

  const woodType = escapeSql(product.wood_type || 'هيكل خشب زان أحمر طبيعي مجفف حرارياً');
  const fabricType = escapeSql(product.fabric_type || 'قماش تنجيد عالي الكثافة مقاوم للبقع');
  const foamDensity = escapeSql(product.foam_density || 'إسفنج سوفت عالي المرونة كثافة 36 طبقات متعددة');
  const legsType = escapeSql(product.legs_type || 'ستانلس ستيل مطلي PVD أو خشب مصمت');
  const hardwareType = escapeSql(product.hardware_type || 'مفصلات وسكك إغلاق هادئ Soft-Close مجلفنة');
  const warrantyYears = product.warranty_years || 5;
  const customDimensionsAvailable = product.custom_dimensions_available !== false ? 'true' : 'false';
  const spaceGuideNotes = escapeSql(
    product.space_guide_notes ||
      'يرجى التأكد من أن عرض فتحة الباب والمداخل لا يقل عن 85 سم لتسهيل دخول ونقل القطعة بسلاسة.'
  );

  sql += `
INSERT INTO public.products (
  slug,
  name,
  description,
  category_id,
  original_price,
  discount_price,
  availability_status,
  is_featured,
  material_primary,
  material_secondary,
  color,
  dimensions,
  width,
  depth,
  height,
  custom_dimensions_available,
  space_guide_notes,
  wood_type,
  fabric_type,
  foam_density,
  legs_type,
  hardware_type,
  warranty_years,
  available_colors,
  images
)
VALUES (
  ${slug},
  ${name},
  ${description},
  (SELECT id FROM public.categories WHERE slug = '${categorySlug}' LIMIT 1),
  ${originalPrice},
  ${discountPrice},
  ${availabilityStatus},
  ${isFeatured},
  ${escapeSql(primaryMaterial)},
  ${escapeSql(secondaryMaterial)},
  ${color},
  ${escapeSql(dimensionsStr)},
  ${width},
  ${depth},
  ${height},
  ${customDimensionsAvailable},
  ${spaceGuideNotes},
  ${woodType},
  ${fabricType},
  ${foamDensity},
  ${legsType},
  ${hardwareType},
  ${warrantyYears},
  ${availableColors},
  ${images}
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  original_price = EXCLUDED.original_price,
  discount_price = EXCLUDED.discount_price,
  availability_status = EXCLUDED.availability_status,
  is_featured = EXCLUDED.is_featured,
  material_primary = EXCLUDED.material_primary,
  material_secondary = EXCLUDED.material_secondary,
  color = EXCLUDED.color,
  dimensions = EXCLUDED.dimensions,
  width = EXCLUDED.width,
  depth = EXCLUDED.depth,
  height = EXCLUDED.height,
  custom_dimensions_available = EXCLUDED.custom_dimensions_available,
  space_guide_notes = EXCLUDED.space_guide_notes,
  wood_type = EXCLUDED.wood_type,
  fabric_type = EXCLUDED.fabric_type,
  foam_density = EXCLUDED.foam_density,
  legs_type = EXCLUDED.legs_type,
  hardware_type = EXCLUDED.hardware_type,
  warranty_years = EXCLUDED.warranty_years,
  available_colors = EXCLUDED.available_colors,
  images = EXCLUDED.images;
`;
}

const outputPath = path.resolve(process.cwd(), 'supabase/seed_mock_products.sql');
fs.writeFileSync(outputPath, sql, 'utf-8');
console.log(`Successfully generated: ${outputPath}`);
