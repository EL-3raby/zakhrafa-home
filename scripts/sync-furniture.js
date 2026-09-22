/**
 * Zakhrafa - DummyJSON Furniture Syncer
 * Run: node scripts/sync-furniture.js
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local manually if not in Next environment
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valParts] = trimmed.split('=');
      const val = valParts.join('=');
      if (key && val && !process.env[key]) {
        process.env[key] = val;
      }
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase URL and Key are required in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const ARABIC_DETAILS = {
  11: {
    name_ar: 'سرير أنيبالي كولومبو الفاخر - Annibale Colombo Bed',
    desc_ar:
      'سرير إيطالي فخم ومريح مصمم بعناية فائقة بأرقى المواد والخامات المتينة، يمنح غرفة نومك طابعاً ملكياً وعصرياً فريداً مع ظهر مبطن ومريح للجلسات المسائية.',
    category_id: '7e8cbe3c-0477-4371-9da9-f9452fd5ecf1', // bedrooms
    material_primary: 'خشب زان طبيعي صلب',
    material_secondary: 'تنجيد مخملي إيطالي فاخر',
    color: 'بني كلاسيكي',
    dimensions: '200 عرض × 210 عمق × 130 ارتفاع سم',
    width: 200,
    depth: 210,
    height: 130,
    wood_type: 'خشب زان أحمر طبيعي مجفف حرارياً ومقاوم للتسوس والرطوبة',
    fabric_type: 'قماش مخمل إيطالي ناعم معالج ضد السوائل والبقع',
    foam_density: 'إسفنج سوفت عالي الكثافة 36 لدعم الظهر والفقرات',
    legs_type: 'أرجل خشبية مصمتة بلون جوزي مطعم بلمسات برونزية',
    hardware_type: 'وصلات وزوايا فولاذية صامتة ومقاومة للاهتزاز',
    warranty_years: 5,
    space_guide: 'يناسب المراتب مقاس كينج (190×200 سم). يتطلب ممر مدخل بعرض لا يقل عن 85 سم.',
    colors: ['بني كلاسيكي', 'عاجي بيج', 'رمادي ملكي'],
    price_egp: 18999,
  },
  12: {
    name_ar: 'كنبة أنيبالي كولومبو الفاخرة - Annibale Colombo Sofa',
    desc_ar:
      'كنبة مودرن راقية تجمع بين الراحة القصوى والتصميم المعماري المتناسق، مزودة بتنجيد فخم ومساند واسعة لتكون القطعة المركزية المضيئة في صالونك أو غرفة معيشتك.',
    category_id: 'cecfbc32-8475-4faf-8a8e-a1316a0cb5fd', // living-rooms
    material_primary: 'خشب زان روماني مبخر',
    material_secondary: 'قماش بوكليه تركي فاخر',
    color: 'عاجي وذهبي',
    dimensions: '240 عرض × 95 عمق × 85 ارتفاع سم',
    width: 240,
    depth: 95,
    height: 85,
    wood_type: 'خشب زان روماني مبخر معالج ومقاوم للانحناء',
    fabric_type: 'قماش بوكليه ناعم إيطالي معالج ضد التجعد والاهتراء',
    foam_density: 'إسفنج مرن هيدروليكي كثافة 36 مع وسائد سفلية من الريش المعقم',
    legs_type: 'قواعد ستانلس ستيل مطلي PVD ذهبي مقاوم للصدأ',
    hardware_type: 'أحزمة وتثبيت إيطالي مرن عالي التحمل',
    warranty_years: 5,
    space_guide: 'تناسب الصالونات وغرف المعيشة الواسعة. تحتاج مساحة لا تقل عن 260 سم على الجدار الرئيسي.',
    colors: ['عاجي وذهبي', 'رمادي فاتح', 'أخضر زمردي'],
    price_egp: 24999,
  },
  13: {
    name_ar: 'طاولة جانبية من خشب الكرز الأفريقي - Bedside Table African Cherry',
    desc_ar:
      'طاولة سرير وكمودينو جانبي أنيق مصنوع من خشب الكرز الأفريقي الطبيعي مع درج تخزين سلس، يوفر مساحة مريحة للمقتنيات ومصباح الإضاءة بلمسة دافئة وعصرية.',
    category_id: 'ad16df0d-5b7c-479d-bc66-a195fc9937db', // tables-consoles
    material_primary: 'خشب كرز أفريقي طبيعي',
    material_secondary: 'مقابض نحاس معتق',
    color: 'كرزي طبيعي دافئ',
    dimensions: '55 عرض × 45 عمق × 60 ارتفاع سم',
    width: 55,
    depth: 45,
    height: 60,
    wood_type: 'خشب كرز أفريقي مصمت مجفف مع حماية ورنيش مطفي',
    fabric_type: 'بدون قماش تنجيد',
    foam_density: 'لا يوجد',
    legs_type: 'أرجل خشب كرز مصمتة مدعمة',
    hardware_type: 'مجاري وسكك إغلاق ناعم هيدروليكية ألمانية الصنع',
    warranty_years: 3,
    space_guide: 'تصميم مدمج ومثالي لجانبي السرير أو زوايا غرف المعيشة بجانب الفوتيهات.',
    colors: ['كرزي طبيعي دافئ', 'جوزي غامق', 'بني طبيعي'],
    price_egp: 4500,
  },
  14: {
    name_ar: 'كرسي نول سارينين الفاخر - Knoll Saarinen Chair',
    desc_ar:
      'تحفة كلاسيكية خالدة بتصميم انسيابي مريح يدعم الظهر بدقة. يلائم طاولات السفرة الفاخرة، المكاتب التنفيذية، وقاعات الاجتماعات الراقية.',
    category_id: 'fc0dd3eb-ee24-4a38-bc85-3f6bfa4f77a4', // dining-rooms
    material_primary: 'هيكل ستانلس ستيل معزز',
    material_secondary: 'قماش صوف كريب عالي المتانة',
    color: 'رمادي فحمي',
    dimensions: '65 عرض × 60 عمق × 80 ارتفاع سم',
    width: 65,
    depth: 60,
    height: 80,
    wood_type: 'هيكل داخلي مقوى من الألياف والخشب الصلب',
    fabric_type: 'قماش صوف منسوج عالي التحمل ضد الاحتكاك اليومي',
    foam_density: 'إسفنج قولبة باردة عالي المرونة ومريح جداً',
    legs_type: 'أرجل ستانلس ستيل مصقول كروم لامع مضاد للخدش',
    hardware_type: 'مثبتات وقواعد حماية للأرضيات والباركيه',
    warranty_years: 3,
    space_guide: 'ارتفاع المقعد عن الأرض 48 سم، متوافق مع كافة طاولات الطعام القياسية.',
    colors: ['رمادي فحمي', 'أزرق كحلي', 'بيج كريمي'],
    price_egp: 5800,
  },
  15: {
    name_ar: 'وحدة حوض خشبية مع مرآة - Wooden Bathroom Sink With Mirror',
    desc_ar:
      'وحدة ديكور استثنائية من الخشب الطبيعي المعالج بالراتنج العازل مع مرآة مطابقة، تضفي لمسة فندقية ساحرة على الحمامات وغرف الضيوف.',
    category_id: '6605f773-6018-4509-8450-6311e9da527e', // decor-accessories
    material_primary: 'خشب تيك طبيعي معالج بالراتنج',
    material_secondary: 'زجاج كريستال بلجيكي فائق النقاء',
    color: 'بلوط طبيعي',
    dimensions: '90 عرض × 50 عمق × 85 ارتفاع سم',
    width: 90,
    depth: 50,
    height: 85,
    wood_type: 'خشب تيك أو آرو طبيعي معالج بطبقات عزل إيبوكسي مقاوم للماء بنسبة 100%',
    fabric_type: 'بدون قماش تنجيد',
    foam_density: 'لا يوجد',
    legs_type: 'قواعد خشبية معالجة أو تثبيت معلق على الجدار',
    hardware_type: 'إكسسوارات تعليق ستانلس ستيل مخفية شديدة المتانة',
    warranty_years: 5,
    space_guide: 'مجهزة بفتحات تمديدات السباكة القياسية. مقاس المرآة 80×60 سم.',
    colors: ['بلوط طبيعي', 'جوزي مدخن'],
    price_egp: 9200,
  },
};

async function sync() {
  console.log('Fetching products from DummyJSON Furniture API...');
  const res = await fetch('https://dummyjson.com/products/category/furniture');
  const json = await res.json();
  const raw = json.products || [];

  console.log(`Received ${raw.length} products from API.`);

  const records = raw.map((p) => {
    const extra = ARABIC_DETAILS[p.id];
    const originalPrice = extra.price_egp;
    const discountPercentage = p.discountPercentage || 10;
    const discountPrice = Math.round(originalPrice * (1 - discountPercentage / 100));
    const slug = p.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    return {
      name: extra.name_ar,
      slug: slug,
      description: extra.desc_ar,
      category_id: extra.category_id,
      original_price: originalPrice,
      discount_price: discountPrice,
      availability_status: p.id === 15 ? 'made_to_order' : 'available_now',
      is_featured: true,
      material_primary: extra.material_primary,
      material_secondary: extra.material_secondary,
      color: extra.color,
      dimensions: extra.dimensions,
      width: extra.width,
      depth: extra.depth,
      height: extra.height,
      custom_dimensions_available: true,
      space_guide_notes: extra.space_guide,
      wood_type: extra.wood_type,
      fabric_type: extra.fabric_type,
      foam_density: extra.foam_density || null,
      legs_type: extra.legs_type || null,
      hardware_type: extra.hardware_type || null,
      warranty_years: extra.warranty_years,
      available_colors: extra.colors,
      images: p.images || [],
    };
  });

  console.log('Upserting products into Supabase...');
  const { data, error } = await supabase
    .from('products')
    .upsert(records, { onConflict: 'slug' })
    .select();

  if (error) {
    console.error('Supabase Upsert Error:', error.message);
    console.log(
      '\nIf this is an RLS error, please run the SQL script "supabase/seed_dummyjson_furniture.sql" in your Supabase SQL Editor.'
    );
  } else {
    console.log(`Success! Inserted/Updated ${data.length} products in Supabase.`);
  }
}

sync();
