import { Product, StockStatus } from '@/types/product';
import { Category } from '@/types/category';

export const CATEGORIES: Category[] = [
  {
    id: 'living-rooms',
    slug: 'living-rooms',
    name_ar: 'غرف المعيشة والصالونات',
    name_en: 'Living Rooms & Sofas',
    description_ar:
      'أطقم كنب وكنبات زاوية مودرن وكلاسيك بأقمشة إيطالية فاخرة وهياكل من خشب الزان الطبيعي المتين.',
    image_url:
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=900&auto=format&fit=crop',
    item_count: 6,
    is_active: true,
  },
  {
    id: 'dining-rooms',
    slug: 'dining-rooms',
    name_ar: 'غرف السفرة وطاولات الطعام',
    name_en: 'Dining Rooms & Tables',
    description_ar:
      'طاولات طعام من الرخام والخشب الطبيعي مع كراسي مريحة وأنيقة تليق بأرقى مناسبات الضيافة.',
    image_url:
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=900&auto=format&fit=crop',
    item_count: 5,
    is_active: true,
  },
  {
    id: 'bedrooms',
    slug: 'bedrooms',
    name_ar: 'غرف النوم الفاخرة',
    name_en: 'Luxury Bedrooms',
    description_ar:
      'تصاميم أسرّة عصرية مع خزائن وكمودينات بتشطيبات راقية تمنحك أقصى درجات الراحة والهدوء.',
    image_url:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=900&auto=format&fit=crop',
    item_count: 5,
    is_active: true,
  },
  {
    id: 'tables-consoles',
    slug: 'tables-consoles',
    name_ar: 'طاولات القهوة والكونسول',
    name_en: 'Coffee Tables & Consoles',
    description_ar:
      'طاولات جانبية وكونسولات مدخل فاخرة بتفاصيل من الرخام، الخشب الطبيعي، والستانلس ستيل المقاوم.',
    image_url:
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=900&auto=format&fit=crop',
    item_count: 4,
    is_active: true,
  },
  {
    id: 'decor-accessories',
    slug: 'decor-accessories',
    name_ar: 'الديكورات واللمسات المبتكرة',
    name_en: 'Decor & Lighting',
    description_ar:
      'إكسسوارات جدارية، مرايا فخمة، ووحدات إضاءة فريدة تكتمل بها أناقة وهوية كل مساحة في منزلك.',
    image_url:
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=900&auto=format&fit=crop',
    item_count: 4,
    is_active: true,
  },
  {
    id: 'custom-projects',
    slug: 'custom-projects',
    name_ar: 'تفصيل خاص ومشاريع متكاملة',
    name_en: 'Bespoke & Custom Projects',
    description_ar:
      'تصميم وتنفيذ أثاث حصري ومقاسات خاصة تحت إشراف مهندسي ديكور ومصممي أثاث محترفين.',
    image_url:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=900&auto=format&fit=crop',
    item_count: 4,
    is_active: true,
  },
];

export const PRODUCTS: Product[] = [
  // --- Living Rooms ---
  {
    id: 'prod-lr-1',
    slug: 'milano-luxury-sofa-set',
    name_ar: 'طقم كنب ميلانو الفاخر (4 قطع)',
    name_en: 'Milano Luxury Sofa Set (4-Pieces)',
    description_ar:
      'طقم صالون راقٍ يتكون من أريكة ثلاثية، أريكة ثنائية ومقعدين فرديين. مصنوع من خشب الزان الأحمر الروماني مع حشوات إسفنجية عالية الكثافة وتنجيد قماش مخملي إيطالي مقاوم للبقع.',
    category_id: 'living-rooms',
    price: 14500,
    discount_price: 12900,
    material: 'خشب زان طبيعي + قماش مخمل إيطالي',
    materials: ['خشب زان', 'قماش مخمل'],
    color: 'بيج',
    colors: ['بيج', 'رمادي'],
    dimensions: { width: 240, depth: 95, height: 85, unit: 'سم' },
    stock_status: 'in_stock',
    is_featured: true,
    is_new_arrival: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop',
        is_primary: true,
      },
    ],
  },
  {
    id: 'prod-lr-2',
    slug: 'arcadia-corner-sofa',
    name_ar: 'كنبة زاوية أركاديا المودرن',
    name_en: 'Arcadia Modern Sectional Corner Sofa',
    description_ar:
      'كنبة زاوية واسعة ومريحة للغاية، بتصميم نورديك أوروبي معاصر، أرجل من الستانلس ستيل الذهبي وقماش بوكليه ناعم يمنح الغرفة دفئاً استثنائياً.',
    category_id: 'living-rooms',
    price: 9800,
    discount_price: 8400,
    material: 'قماش بوكليه + أرجل ستانلس ذهبي',
    materials: ['قماش بوكليه', 'ستانلس ستيل'],
    color: 'أوف وايت',
    colors: ['أوف وايت', 'بيج'],
    dimensions: { width: 310, depth: 180, height: 80, unit: 'سم' },
    stock_status: 'in_stock',
    is_featured: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop',
        is_primary: true,
      },
    ],
  },
  {
    id: 'prod-lr-3',
    slug: 'imperial-velvet-armchair',
    name_ar: 'فوتيه إمبريال المخملي',
    name_en: 'Imperial Velvet Accent Armchair',
    description_ar:
      'كرسي مفرد بذراعين بتصميم كلاسيكي مدمج مع خطوط مودرن أنيقة، قماش مخملي بلون زيتي عميق مع إطار خشب زان وتفاصيل نحاسية متقنة.',
    category_id: 'living-rooms',
    price: 3200,
    discount_price: 2850,
    material: 'خشب زان + قماش مخمل + نحاس',
    materials: ['خشب زان', 'قماش مخمل'],
    color: 'أخضر زيتي',
    colors: ['أخضر زيتي', 'كحلي', 'بيج'],
    dimensions: { width: 85, depth: 85, height: 95, unit: 'سم' },
    stock_status: 'in_stock',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop',
        is_primary: true,
      },
    ],
  },
  {
    id: 'prod-lr-4',
    slug: 'florence-classic-salon',
    name_ar: 'صالون فلورنسا الكلاسيكي الملكي',
    name_en: 'Florence Royal Classic Salon',
    description_ar:
      'صالون ملكي بحفر يدوي دقيق على خشب الزان مع لمسات أوراق الذهب المعتق، أقمشة دمشقية فاخرة ووسائد مطرزة يدوياً.',
    category_id: 'living-rooms',
    price: 18900,
    material: 'خشب زان محفور + ورق ذهب + قماش جاكار',
    materials: ['خشب زان', 'أوراق ذهب'],
    color: 'ذهبي / بيج',
    colors: ['ذهبي', 'بيج'],
    stock_status: 'made_to_order',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1512212621149-107ffe572d2f?q=80&w=1000&auto=format&fit=crop',
        is_primary: true,
      },
    ],
  },
  {
    id: 'prod-lr-5',
    slug: 'verona-minimalist-sofa',
    name_ar: 'أريكة فيرونا المودرن ثلاثية',
    name_en: 'Verona 3-Seater Minimalist Sofa',
    description_ar:
      'أريكة مودرن بتصميم ناعم ومريح للمنازل العصرية، قماش كتان هولندي مقاوم للبقع مع وسائد محشوة بريش النعام الصناعي.',
    category_id: 'living-rooms',
    price: 6400,
    material: 'قماش كتان طبيعي + خشب زان',
    materials: ['خشب زان', 'كتان طبيعي'],
    color: 'رمادي',
    colors: ['رمادي', 'كحلي', 'بيج'],
    dimensions: { width: 225, depth: 90, height: 82, unit: 'سم' },
    stock_status: 'in_stock',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1000&auto=format&fit=crop',
        is_primary: true,
      },
    ],
  },
  {
    id: 'prod-lr-6',
    slug: 'nordic-lounge-chair-leather',
    name_ar: 'كرسي استرخاء لاونج جلد طبيعي',
    name_en: 'Nordic Leather Lounge Chair',
    description_ar:
      'كرسي لاونج مع مسند قدم منفصل، مصنوع من جلد إيطالي طبيعي عالي الجودة مع هيكل خشب الجوز وقاعدة دوارة من الألمنيوم المصقول.',
    category_id: 'living-rooms',
    price: 4900,
    material: 'جلد طبيعي + خشب جوز',
    materials: ['جلد طبيعي', 'خشب جوز'],
    color: 'بني',
    colors: ['بني', 'أسود'],
    stock_status: 'in_stock',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1580481077195-c324c43a04a4?q=80&w=1000&auto=format&fit=crop',
        is_primary: true,
      },
    ],
  },

  // --- Dining Rooms ---
  {
    id: 'prod-dr-1',
    slug: 'marbella-marble-dining-table',
    name_ar: 'طاولة طعام ماربيلا رخام إيطالي (8 كراسي)',
    name_en: 'Marbella Italian Marble Dining Table (8-Chairs)',
    description_ar:
      'طاولة طعام فاخرة بسطح رخام طبيعي كلكتا معالج ضد البقع، قاعدة معدنية بتشطيب برونزي مطفي، مع 8 كراسي مريحة بتنجيد مخملي ناعم.',
    category_id: 'dining-rooms',
    price: 16500,
    discount_price: 14800,
    material: 'رخام طبيعي كلكتا + ستانلس ستيل + قماش مخمل',
    materials: ['رخام طبيعي', 'ستانلس ستيل'],
    color: 'بيج / ذهبي',
    colors: ['بيج', 'رمادي'],
    dimensions: { width: 260, depth: 110, height: 78, unit: 'سم' },
    stock_status: 'in_stock',
    is_featured: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1000&auto=format&fit=crop',
        is_primary: true,
      },
    ],
  },
  {
    id: 'prod-dr-2',
    slug: 'valencia-oak-dining-set',
    name_ar: 'طقم سفرة فالنسيا خشب بلوط صلب (6 كراسي)',
    name_en: 'Valencia Solid Oak Dining Set (6-Chairs)',
    description_ar:
      'طاولة طعام دافئة مصنعة من خشب البلوط الطبيعي بتشطيب شمعي مطفي يبرز جمال التموجات الخشبية، مع كراسي مريحة بقماش طبيعي محايد.',
    category_id: 'dining-rooms',
    price: 11200,
    material: 'خشب بلوط صلب + قماش كتان',
    materials: ['خشب بلوط', 'كتان طبيعي'],
    color: 'بني طبيعي',
    colors: ['بني طبيعي', 'بيج'],
    dimensions: { width: 210, depth: 100, height: 77, unit: 'سم' },
    stock_status: 'in_stock',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=1000&auto=format&fit=crop',
        is_primary: true,
      },
    ],
  },
  {
    id: 'prod-dr-3',
    slug: 'verona-luxury-buffet',
    name_ar: 'بوفيه سفرة فيرونا رخام وخشب جوز',
    name_en: 'Verona Walnut & Marble Dining Buffet',
    description_ar:
      'خزانة بوفيه أنيقة بـ 4 أبواب مضلعة من خشب الجوز وسطح من الرخام الأسود المارق، مع تفاصيل أرفف داخلية ومفصلات إغلاق هادئ ألمانية.',
    category_id: 'dining-rooms',
    price: 7900,
    material: 'خشب جوز + رخام أسود ماركوينا',
    materials: ['خشب جوز', 'رخام طبيعي'],
    color: 'بني داكن',
    colors: ['بني داكن'],
    dimensions: { width: 200, depth: 48, height: 85, unit: 'سم' },
    stock_status: 'made_to_order',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1000&auto=format&fit=crop',
        is_primary: true,
      },
    ],
  },
  {
    id: 'prod-dr-4',
    slug: 'monaco-round-dining-table',
    name_ar: 'طاولة طعام موناكو دائرية (6 أشخاص)',
    name_en: 'Monaco Round Dining Table (6-Persons)',
    description_ar:
      'طاولة طعام دائرية قطر 150 سم، مع قاعدة خشبية نحتية مضلعة وسطح متين من الرخام الإسباني الرمادي، مثالية للتجمعات العائلية الحميمة.',
    category_id: 'dining-rooms',
    price: 8600,
    material: 'رخام طبيعي + خشب زان',
    materials: ['رخام طبيعي', 'خشب زان'],
    color: 'رمادي / بيج',
    colors: ['رمادي', 'بيج'],
    stock_status: 'in_stock',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?q=80&w=1000&auto=format&fit=crop',
        is_primary: true,
      },
    ],
  },
  {
    id: 'prod-dr-5',
    slug: 'siena-dining-chairs-pair',
    name_ar: 'زوج كراسي سفرة سيينا بظهر منحني',
    name_en: 'Pair of Siena Curved Dining Chairs',
    description_ar:
      'زوج كراسي سفرة بتصميم عصري مريح، أرجل من خشب الزان الأسود وقماش تنجيد مخملي ناعم الملمس متوفر بخيارات لونية متعددة.',
    category_id: 'dining-rooms',
    price: 2400,
    material: 'خشب زان + مخمل',
    materials: ['خشب زان', 'قماش مخمل'],
    color: 'أخضر زيتي',
    colors: ['أخضر زيتي', 'بيج', 'رمادي'],
    stock_status: 'in_stock',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1580481077195-c324c43a04a4?q=80&w=1000&auto=format&fit=crop',
        is_primary: true,
      },
    ],
  },

  // --- Bedrooms ---
  {
    id: 'prod-br-1',
    slug: 'aurora-king-bed-set',
    name_ar: 'غرفة نوم أورورا الفاخرة (كينج)',
    name_en: 'Aurora Luxury King Bedroom Set',
    description_ar:
      'غرفة نوم متكاملة تتضمن سرير كينج بظهر قماشي كابيتونيه فاخر ممتد، زوج كمودينات، تسريحة مع مرآة بإضاءة ليد مخفية ودولاب ملابس واسع.',
    category_id: 'bedrooms',
    price: 22000,
    discount_price: 19500,
    material: 'خشب زان + قماش مخمل مقاوم + مرايا عاكسة',
    materials: ['خشب زان', 'قماش مخمل'],
    color: 'بيج هادئ',
    colors: ['بيج', 'رمادي'],
    dimensions: { width: 210, depth: 220, height: 140, unit: 'سم' },
    stock_status: 'in_stock',
    is_featured: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1000&auto=format&fit=crop',
        is_primary: true,
        alt: 'سرير كينج فاخر من الأمام',
      },
      {
        url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1000&auto=format&fit=crop',
        alt: 'تفاصيل التسريحة والكمودينات',
      },
      {
        url: 'https://images.unsplash.com/photo-1582582621959-48d27397dc69?q=80&w=1000&auto=format&fit=crop',
        alt: 'زاوية الغرفة والإضاءة الهادئة',
      },
      {
        url: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1000&auto=format&fit=crop',
        alt: 'تفاصيل الخامات والمرايا',
      },
    ],
  },
  {
    id: 'prod-br-2',
    slug: 'serena-floating-bed',
    name_ar: 'سرير سيرينا المودرن بتصميم عائم',
    name_en: 'Serena Modern Floating Bed',
    description_ar:
      'سرير مودرن بتصميم عائم مبتكر وإضاءة سفلية خافتة، لوح رأس عريض مدمج به طاولات سرير جانبية مع شواحن لاسلكية ذكية.',
    category_id: 'bedrooms',
    price: 8900,
    discount_price: 7600,
    material: 'خشب جوز طبيعي + إضاءة LED مدمجة',
    materials: ['خشب جوز', 'ستانلس ستيل'],
    color: 'بني جوزي',
    colors: ['بني جوزي', 'رمادي'],
    dimensions: { width: 200, depth: 215, height: 110, unit: 'سم' },
    stock_status: 'made_to_order',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1000&auto=format&fit=crop',
        is_primary: true,
      },
    ],
  },
  {
    id: 'prod-br-3',
    slug: 'palermo-velvet-bench',
    name_ar: 'بنش نهاية السرير باليرمو مخملي',
    name_en: 'Palermo End-of-Bed Velvet Bench',
    description_ar:
      'مقعد بنش أنيق يوضع عند نهاية السرير أو في المداخل، تنجيد مخملي كابيتونيه ناعم مع قاعدة ذهبية من الستانلس ستيل المقاوم.',
    category_id: 'bedrooms',
    price: 2100,
    material: 'قماش مخمل + ستانلس ذهبي',
    materials: ['قماش مخمل', 'ستانلس ستيل'],
    color: 'كحلي',
    colors: ['كحلي', 'بيج', 'رمادي'],
    dimensions: { width: 140, depth: 45, height: 48, unit: 'سم' },
    stock_status: 'in_stock',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1582582621959-48d27397dc69?q=80&w=1000&auto=format&fit=crop',
        is_primary: true,
      },
    ],
  },
  {
    id: 'prod-br-4',
    slug: 'clarion-luxury-wardrobe',
    name_ar: 'دولاب ملابس كلاريون زجاج مدخن وإضاءة',
    name_en: 'Clarion Smoked Glass Wardrobe',
    description_ar:
      'دولاب ملابس فخم بأبواب زجاجية مدخنة وإطارات ألمنيوم سوداء نحيفة، تقسيمات داخلية مخصصة للحقائب والساعات والإكسسوارات مع إضاءة ذكية.',
    category_id: 'bedrooms',
    price: 15400,
    material: 'ألمنيوم + زجاج مدخن + خشب زان',
    materials: ['ألمنيوم', 'زجاج مدخن', 'خشب زان'],
    color: 'رمادي فحمي',
    colors: ['رمادي فحمي'],
    stock_status: 'made_to_order',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1000&auto=format&fit=crop',
        is_primary: true,
      },
    ],
  },
  {
    id: 'prod-br-5',
    slug: 'como-nightstand-pair',
    name_ar: 'زوج كمودينات كومو بتشطيب رخامي',
    name_en: 'Pair of Como Marble Top Nightstands',
    description_ar:
      'زوج طاولات سرير جانبية بتصميم أسطواني عصري، درجين بمجرى إغلاق هادئ وسطح رخامي مستدير مقاوم للخدوش.',
    category_id: 'bedrooms',
    price: 3100,
    material: 'خشب زان + سطح رخام طبيعي',
    materials: ['خشب زان', 'رخام طبيعي'],
    color: 'أوف وايت',
    colors: ['أوف وايت', 'رمادي'],
    stock_status: 'in_stock',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?q=80&w=1000&auto=format&fit=crop',
        is_primary: true,
      },
    ],
  },

  // --- Tables & Consoles ---
  {
    id: 'prod-tc-1',
    slug: 'orion-marble-coffee-table-set',
    name_ar: 'طقم طاولات قهوة أوريون المتداخلة (رخام)',
    name_en: 'Orion Nesting Marble Coffee Table Set',
    description_ar:
      'طقم يتكون من طاولتين متداخلتين بارتفاعات متفاوتة، سطح رخامي تركي طبيعي وقواعد معدنية مضلعة بتشطيب نحاسي عتيق.',
    category_id: 'tables-consoles',
    price: 4600,
    discount_price: 3950,
    material: 'رخام طبيعي + حديد مطلي برونزي',
    materials: ['رخام طبيعي', 'حديد مشغول'],
    color: 'أبيض / برونزي',
    colors: ['أبيض', 'أسود'],
    dimensions: { width: 90, depth: 90, height: 45, unit: 'سم' },
    stock_status: 'in_stock',
    is_featured: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1000&auto=format&fit=crop',
        is_primary: true,
      },
    ],
  },
  {
    id: 'prod-tc-2',
    slug: 'castello-entrance-console',
    name_ar: 'كونسول مدخل كاستيلو الفاخر مع مرآة',
    name_en: 'Castello Luxury Entrance Console with Mirror',
    description_ar:
      'كونسول استقبال فخم بتصميم هندسي انسيابي، سطح رخام أسود بورتورو مع قاعدة ذهبية نحتية ومرآة جدارية متناسقة بأشكال غير متماثلة.',
    category_id: 'tables-consoles',
    price: 6200,
    material: 'رخام طبيعي + ستانلس ستيل + زجاج بلوري',
    materials: ['رخام طبيعي', 'ستانلس ستيل'],
    color: 'أسود / ذهبي',
    colors: ['أسود', 'ذهبي'],
    dimensions: { width: 140, depth: 40, height: 88, unit: 'سم' },
    stock_status: 'in_stock',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1000&auto=format&fit=crop',
        is_primary: true,
      },
    ],
  },
  {
    id: 'prod-tc-3',
    slug: 'zen-solid-wood-coffee-table',
    name_ar: 'طاولة وسط زن من جذوع الخشب الطبيعي',
    name_en: 'Zen Live Edge Solid Wood Coffee Table',
    description_ar:
      'طاولة قهوة فريدة منحوتة من قطعة خشب تيك صلبة بحوافها الطبيعية الحرة، مما يجعل كل قطعة تحفة فنية لا تتكرر في العالم.',
    category_id: 'tables-consoles',
    price: 5400,
    material: 'خشب تيك طبيعي صلب',
    materials: ['خشب تيك صلب'],
    color: 'بني طبيعي',
    colors: ['بني طبيعي'],
    stock_status: 'in_stock',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=1000&auto=format&fit=crop',
        is_primary: true,
      },
    ],
  },
  {
    id: 'prod-tc-4',
    slug: 'linear-side-table-pair',
    name_ar: 'زوج طاولات خدمة لينير الجانبية',
    name_en: 'Pair of Linear Modern Side Tables',
    description_ar:
      'طاولات خدمة جانبية خفيفة وسهلة الحركة بجانب الكنب، بتصميم ذكي ينزلق تحت قاعدة الأريكة لتناول القهوة أو العمل براحة.',
    category_id: 'tables-consoles',
    price: 1850,
    material: 'ستانلس ستيل أسود مطفي + خشب سنديان',
    materials: ['ستانلس ستيل', 'خشب سنديان'],
    color: 'أسود / خشب',
    colors: ['أسود', 'ذهبي'],
    stock_status: 'in_stock',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=1000&auto=format&fit=crop',
        is_primary: true,
      },
    ],
  },

  // --- Decor & Lighting ---
  {
    id: 'prod-dec-1',
    slug: 'venice-sculptural-mirror',
    name_ar: 'مرآة فينيسيا النحتية ذات الإطار الذهبي',
    name_en: 'Venice Sculptural Gold Frame Wall Mirror',
    description_ar:
      'مرآة جدارية كبيرة بإطار نحتي مستوحى من أشعة الشمس، مطلي بالذهب العتيق ليعكس الفخامة ويعطي اتساعاً وإضاءة للمداخل والممرات.',
    category_id: 'decor-accessories',
    price: 2900,
    material: 'زجاج بلجيكي عاكس + معدن مطلي ذهبي',
    materials: ['زجاج بلجيكي', 'معدن مطلي'],
    color: 'ذهبي',
    colors: ['ذهبي'],
    dimensions: { width: 110, depth: 5, height: 110, unit: 'سم' },
    stock_status: 'in_stock',
    is_featured: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1000&auto=format&fit=crop',
        is_primary: true,
      },
    ],
  },
  {
    id: 'prod-dec-2',
    slug: 'nordic-brass-pendant-light',
    name_ar: 'ثريا نورديك نحاسية متدلية مودرن',
    name_en: 'Nordic Brass Modern Chandelier',
    description_ar:
      'وحدة إضاءة متدلية بتصميم هندسي معلق فوق طاولات الطعام أو الجلسات، مصنوعة من النحاس الخالص مع كرات زجاجية بيضاء معتمة لإضاءة ناعمة.',
    category_id: 'decor-accessories',
    price: 3600,
    material: 'نحاس أصفر مصقول + زجاج أوبال',
    materials: ['نحاس أصفر', 'زجاج أوبال'],
    color: 'ذهبي مطفي',
    colors: ['ذهبي'],
    stock_status: 'in_stock',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop',
        is_primary: true,
      },
    ],
  },
  {
    id: 'prod-dec-3',
    slug: 'ceramic-sculpture-vases-set',
    name_ar: 'طقم فازات نحتية سيراميك ملمس خشن (3 قطع)',
    name_en: 'Set of 3 Textured Ceramic Sculptural Vases',
    description_ar:
      'تحف خزفية فنية بدرجات ألوان ترابية محايدة، مصنوعة يدوياً بملمس حبيبي مطفي لإضافة لمسة فنية راقية لطاولات القهوة والرفوف.',
    category_id: 'decor-accessories',
    price: 850,
    material: 'سيراميك طيني طبيعي',
    materials: ['سيراميك'],
    color: 'بيج رملي',
    colors: ['بيج', 'أبيض'],
    stock_status: 'in_stock',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1000&auto=format&fit=crop',
        is_primary: true,
      },
    ],
  },
  {
    id: 'prod-dec-4',
    slug: 'abstract-canvas-art-diptych',
    name_ar: 'لوحتان كانفاس تجريدية مع إطار خشب عائم',
    name_en: 'Abstract Canvas Wall Art Diptych',
    description_ar:
      'عمل فني ثنائي بألوان محايدة ولمسات بارزة من معجون الجبس، مشدود ومؤطر بإطار خشب زان عائم لإضفاء رونق على جدران الصالون.',
    category_id: 'decor-accessories',
    price: 2200,
    material: 'كانفاس قطني + إطار خشب زان',
    materials: ['كانفاس', 'خشب زان'],
    color: 'بيج / أسود',
    colors: ['بيج', 'أسود'],
    dimensions: { width: 160, depth: 4, height: 100, unit: 'سم' },
    stock_status: 'in_stock',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1000&auto=format&fit=crop',
        is_primary: true,
      },
    ],
  },

  // --- Custom Projects ---
  {
    id: 'prod-cp-1',
    slug: 'royal-diwan-custom-majlis',
    name_ar: 'مجلس عربي ملكي مخصص بالكامل',
    name_en: 'Custom Royal Arabic Majlis Project',
    description_ar:
      'تنفيذ مجلس متكامل يشمل الكنب الأرضي أو المرتفع، بانوهات الجدران، طاولات الخدمة والستائر حسب المقاسات والمخطط المعماري لمنزلك.',
    category_id: 'custom-projects',
    is_price_on_request: true,
    material: 'أخشاب زان + أقمشة مخملية حريرية مطرزة',
    materials: ['خشب زان', 'قماش مخمل'],
    color: 'حسب اختيار العميل',
    colors: ['بيج', 'كحلي', 'أخضر زيتي'],
    stock_status: 'made_to_order',
    is_featured: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
        is_primary: true,
      },
    ],
  },
  {
    id: 'prod-cp-2',
    slug: 'custom-walk-in-closet',
    name_ar: 'غرفة ملابس (دريسنج روم) تفصيل حسب المقاس',
    name_en: 'Custom Luxury Walk-in Closet Project',
    description_ar:
      'تصميم وتنفيذ غرف الملابس المفتوحة والمغلقة بأحدث الإكسسوارات الهيدروليكية، جزيرة وسطى للساعات والمجوهرات، وإضاءة سنسور ذكية.',
    category_id: 'custom-projects',
    is_price_on_request: true,
    material: 'خشب ألماني مقاوم للرطوبة + زجاج سيكوريت',
    materials: ['خشب ألماني', 'زجاج سيكوريت'],
    color: 'رمادي حجري / خشب',
    colors: ['رمادي', 'بني'],
    stock_status: 'made_to_order',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1000&auto=format&fit=crop',
        is_primary: true,
      },
    ],
  },
  {
    id: 'prod-cp-3',
    slug: 'luxury-tv-wall-cladding',
    name_ar: 'بديل رخام وخشب جداري لوحدة التلفاز',
    name_en: 'Integrated TV Wall Cladding & Console',
    description_ar:
      'تجاليد جدارية فاخرة لوحدات التلفزيون تجمع بين الرخام المضاء وخشب السنديان المضلع مع مدفأة بخار ديكورية كهربائية ذكية.',
    category_id: 'custom-projects',
    price: 8500,
    material: 'رخام طبيعي مضاء + بديل خشب + مدفأة ديكور',
    materials: ['رخام طبيعي', 'خشب سنديان'],
    color: 'رمادي / بني',
    colors: ['رمادي', 'بني'],
    stock_status: 'made_to_order',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1000&auto=format&fit=crop',
        is_primary: true,
      },
    ],
  },
  {
    id: 'prod-cp-4',
    slug: 'hotel-suite-interior-package',
    name_ar: 'تأثيث أجنحة وشقق فندقية متكاملة',
    name_en: 'Turnkey Suite Furniture Package',
    description_ar:
      'باقة متكاملة لتأثيث الشقق الفاخرة والاستثمارية تشمل غرفة النوم، المعيشة، السفرة وكافة اللمسات التكميلية بجودة تناسب التشغيل طويل الأمد.',
    category_id: 'custom-projects',
    is_price_on_request: true,
    material: 'خامات عالية التحمل مطابقة للمعايير الفندقية',
    materials: ['خشب زان', 'أقمشة مضادة للبقع'],
    color: 'تشكيلات متناسقة',
    colors: ['بيج', 'رمادي'],
    stock_status: 'made_to_order',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?q=80&w=1000&auto=format&fit=crop',
        is_primary: true,
      },
    ],
  },
];

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

