-- ==============================================================================
-- MIGRATION: ADD DETAILED PRODUCT SPECS & DIMENSIONS
-- ==============================================================================

-- 1. Dimensions and space guide fields
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS width NUMERIC(10, 2),
ADD COLUMN IF NOT EXISTS depth NUMERIC(10, 2),
ADD COLUMN IF NOT EXISTS height NUMERIC(10, 2),
ADD COLUMN IF NOT EXISTS custom_dimensions_available BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS space_guide_notes TEXT;

-- 2. Technical specifications and materials fields
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS wood_type TEXT,
ADD COLUMN IF NOT EXISTS fabric_type TEXT,
ADD COLUMN IF NOT EXISTS foam_density TEXT,
ADD COLUMN IF NOT EXISTS legs_type TEXT,
ADD COLUMN IF NOT EXISTS hardware_type TEXT,
ADD COLUMN IF NOT EXISTS warranty_years INTEGER DEFAULT 5,
ADD COLUMN IF NOT EXISTS available_colors TEXT[] DEFAULT '{}'::TEXT[];

-- 3. Comments for documentation
COMMENT ON COLUMN public.products.width IS 'Product total width in cm';
COMMENT ON COLUMN public.products.depth IS 'Product total depth in cm';
COMMENT ON COLUMN public.products.height IS 'Product total height in cm';
COMMENT ON COLUMN public.products.wood_type IS 'Internal solid wood frame details (e.g. خشب زان أحمر طبيعي)';
COMMENT ON COLUMN public.products.fabric_type IS 'Upholstery & fabric specifications (e.g. مخمل إيطالي معالج)';
COMMENT ON COLUMN public.products.foam_density IS 'Foam density and cushioning details (e.g. إسفنج سوفت كثافة 36)';
COMMENT ON COLUMN public.products.warranty_years IS 'Warranty duration in years (default: 5)';
COMMENT ON COLUMN public.products.available_colors IS 'Array of available color names for this model';
