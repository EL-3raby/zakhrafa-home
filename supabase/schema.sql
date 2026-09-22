-- ==============================================================================
-- ZAKHRAFA FURNITURE CATALOG - DATABASE SCHEMA
-- Compatible with Supabase PostgreSQL & Next.js 16
-- ==============================================================================

-- 1. Enable pgcrypto for UUID generation (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. TABLE: CATEGORIES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  image TEXT NOT NULL,                         -- Cloudinary image URL
  icon_name TEXT NOT NULL,                     -- Lucide React icon name (e.g. Sofa, Bed)
  badge_label TEXT,                            -- Optional badge like "الأكثر طلباً"
  display_order INTEGER NOT NULL DEFAULT 0,    -- Display sequence order
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- 3. TABLE: PRODUCTS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  original_price NUMERIC(12, 2),               -- Optional for made_to_order
  discount_price NUMERIC(12, 2),               -- Optional discount price
  availability_status TEXT NOT NULL CHECK (availability_status IN ('available_now', 'made_to_order')),
  is_featured BOOLEAN NOT NULL DEFAULT false,
  material_primary TEXT NOT NULL,
  material_secondary TEXT,
  color TEXT NOT NULL,
  dimensions TEXT NOT NULL,                     -- Example: "310x180x80 cm"
  -- Detailed Dimensions & Space Guide
  width NUMERIC(10, 2),                         -- Width in cm
  depth NUMERIC(10, 2),                         -- Depth in cm
  height NUMERIC(10, 2),                        -- Height in cm
  custom_dimensions_available BOOLEAN NOT NULL DEFAULT true,
  space_guide_notes TEXT,                       -- Fitting & room space notes
  -- Technical Specifications & Materials
  wood_type TEXT,                               -- Frame wood details (e.g. خشب زان أحمر طبيعي)
  fabric_type TEXT,                             -- Fabric & upholstery details
  foam_density TEXT,                            -- Foam cushioning & density (e.g. إسفنج سوفت كثافة 36)
  legs_type TEXT,                               -- Legs & base type (e.g. ستانلس ستيل ذهبي)
  hardware_type TEXT,                           -- Hardware & hinges
  warranty_years INTEGER NOT NULL DEFAULT 5,    -- Warranty duration in years
  available_colors TEXT[] NOT NULL DEFAULT '{}'::TEXT[], -- Model available colors
  images TEXT[] NOT NULL DEFAULT '{}'::TEXT[],  -- Array of Cloudinary image URLs
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- 4. PERFORMANCE INDEXES
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_display_order ON public.categories(display_order);

CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON public.products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_availability ON public.products(availability_status);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON public.products(created_at DESC);

-- ==============================================================================
-- 5. AUTOMATIC UPDATED_AT TRIGGER
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_categories_updated_at ON public.categories;
CREATE TRIGGER set_categories_updated_at
BEFORE UPDATE ON public.categories
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_products_updated_at ON public.products;
CREATE TRIGGER set_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Categories RLS:
-- Public can view categories
DROP POLICY IF EXISTS "Allow public read access on categories" ON public.categories;
CREATE POLICY "Allow public read access on categories"
  ON public.categories FOR SELECT
  TO anon, authenticated
  USING (true);

-- Authenticated admin can insert/update/delete categories
DROP POLICY IF EXISTS "Allow authenticated admin full access on categories" ON public.categories;
CREATE POLICY "Allow authenticated admin full access on categories"
  ON public.categories FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Products RLS:
-- Public can view products
DROP POLICY IF EXISTS "Allow public read access on products" ON public.products;
CREATE POLICY "Allow public read access on products"
  ON public.products FOR SELECT
  TO anon, authenticated
  USING (true);

-- Authenticated admin can insert/update/delete products
DROP POLICY IF EXISTS "Allow authenticated admin full access on products" ON public.products;
CREATE POLICY "Allow authenticated admin full access on products"
  ON public.products FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ==============================================================================
-- 7. INITIAL SEED DATA (Core Categories)
-- ==============================================================================
INSERT INTO public.categories (slug, name_ar, name_en, image, icon_name, badge_label, display_order)
VALUES
  (
    'living-rooms',
    'غرف المعيشة والصالونات',
    'Living Rooms',
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=900&auto=format&fit=crop',
    'Sofa',
    'الأكثر طلباً',
    1
  ),
  (
    'dining-rooms',
    'غرف السفرة وطاولات الطعام',
    'Dining Rooms',
    'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=900&auto=format&fit=crop',
    'UtensilsCrossed',
    NULL,
    2
  ),
  (
    'bedrooms',
    'غرف النوم الفاخرة',
    'Bedrooms',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=900&auto=format&fit=crop',
    'Bed',
    'تشكيلة ملكية',
    3
  ),
  (
    'tables-consoles',
    'طاولات القهوة والكونسول',
    'Tables & Consoles',
    'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=900&auto=format&fit=crop',
    'Coffee',
    NULL,
    4
  ),
  (
    'decor-accessories',
    'الديكورات والإكسسوارات',
    'Decor & Accessories',
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=900&auto=format&fit=crop',
    'Sparkles',
    'جديد',
    5
  ),
  (
    'custom-projects',
    'تفصيل وتنفيذ المشاريع',
    'Custom Projects',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=900&auto=format&fit=crop',
    'Hammer',
    'حسب المقاس',
    6
  )
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  image = EXCLUDED.image,
  icon_name = EXCLUDED.icon_name,
  badge_label = EXCLUDED.badge_label,
  display_order = EXCLUDED.display_order;
