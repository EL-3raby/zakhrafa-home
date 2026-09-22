-- Reset role to default postgres superuser in case SQL Editor had another role selected
RESET ROLE;

-- ==============================================================================
-- MIGRATION: CREATE HERO SLIDES TABLE WITH VIDEO & IMAGE SUPPORT
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.hero_slides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  badge TEXT,
  badge_type TEXT DEFAULT 'hot' CHECK (badge_type IN ('hot', 'new', 'limited')),
  media_type TEXT NOT NULL DEFAULT 'image' CHECK (media_type IN ('image', 'video')),
  media_url TEXT NOT NULL,
  video_poster_url TEXT,
  starting_price TEXT,
  original_price TEXT,
  discount_percentage TEXT,
  highlight_tag TEXT DEFAULT 'أطقم معيشة تبدأ من',
  cta_text TEXT DEFAULT 'استكشف العروض',
  link TEXT NOT NULL DEFAULT '/',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for fast query
CREATE INDEX IF NOT EXISTS idx_hero_slides_display_order ON public.hero_slides(display_order ASC);
CREATE INDEX IF NOT EXISTS idx_hero_slides_is_active ON public.hero_slides(is_active);

-- Auto updated_at trigger
DROP TRIGGER IF EXISTS set_hero_slides_updated_at ON public.hero_slides;
CREATE TRIGGER set_hero_slides_updated_at
BEFORE UPDATE ON public.hero_slides
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Enable Row Level Security (RLS)
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow public read active hero slides" ON public.hero_slides;
DROP POLICY IF EXISTS "Allow authenticated admin full access to hero slides" ON public.hero_slides;

-- Public can view active slides
CREATE POLICY "Allow public read active hero slides"
ON public.hero_slides
FOR SELECT
USING (is_active = true);

-- Authenticated admins have full CRUD access
CREATE POLICY "Allow authenticated admin full access to hero slides"
ON public.hero_slides
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Grant appropriate permissions to Supabase roles
GRANT ALL ON public.hero_slides TO postgres;
GRANT ALL ON public.hero_slides TO service_role;
GRANT ALL ON public.hero_slides TO authenticated;
GRANT SELECT ON public.hero_slides TO anon;

-- Seed initial slides from default showcase
INSERT INTO public.hero_slides (
  title, subtitle, description, badge, badge_type, media_type, media_url,
  starting_price, original_price, discount_percentage, highlight_tag, cta_text, link, display_order, is_active
)
VALUES
(
  'أطقم صالونات ومعيشة فاخرة',
  'أناقة تدوم في كل تفصيلة',
  'أطقم كنب زاوية ومودرن مصنوعة من خشب الزان الطبيعي وأقمشة إيطالية مقاومة للبقع والاهتراء مع ضمان 5 سنوات.',
  'مهرجان عروض الموسم • خصومات حصرية',
  'hot',
  'image',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop',
  '11,990',
  '16,500',
  'خصم 30%',
  'أطقم معيشة تبدأ من',
  'استكشف عروض الصالونات',
  '/categories/living-rooms',
  0,
  true
),
(
  'غرف نوم رئيسية متكاملة',
  'راحة فندقية وتصميم استثنائي',
  'سرير فندقي كينج مع خزانة ملابس دريسنج روم وتسريحة بتشطيبات أخشاب ورخام طبيعي لتجربة نوم لا تضاهى.',
  'مهرجان الصيف والتجديد • تشكيلة ملكية',
  'limited',
  'image',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop',
  '18,490',
  '24,000',
  'خصم 25%',
  'غرف نوم تبدأ من',
  'استكشف غرف النوم',
  '/categories/bedrooms',
  1,
  true
),
(
  'طاولات سفرة رخام طبيعي',
  'فخامة الاستقبال وكرم الضيافة',
  'طاولات طعام مع 6 و 8 كراسي مبطنة ومريحة، قواعد ستانلس ستيل معالجة ضد الخدوش ولمسات خشبية راقية.',
  'أناقة الضيافة • تسليم فوري وتفصيل',
  'new',
  'image',
  'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1600&auto=format&fit=crop',
  '8,750',
  '12,200',
  'وفر 3,450 ج.م',
  'طاولات سفرة تبدأ من',
  'استكشف طاولات السفرة',
  '/categories/dining-rooms',
  2,
  true
)
ON CONFLICT DO NOTHING;
