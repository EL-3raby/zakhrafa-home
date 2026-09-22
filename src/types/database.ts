export type AvailabilityStatus = 'available_now' | 'made_to_order';

export interface CategoryRecord {
  id: string;
  name_ar: string;
  name_en: string;
  slug: string;
  image: string;
  icon_name: string;
  badge_label?: string | null;
  display_order: number;
  created_at?: string;
  updated_at?: string;
  product_count?: number;
}

export interface ProductRecord {
  id: string;
  name: string;
  slug: string;
  description: string;
  category_id: string;
  category?: CategoryRecord;
  original_price: number | null;
  discount_price: number | null;
  availability_status: AvailabilityStatus;
  is_featured: boolean;
  material_primary: string;
  material_secondary?: string | null;
  color: string;
  available_colors?: string[];
  dimensions: string; // Composite/fallback text e.g. "240x95x85 cm"
  // Detailed dimensions & space guide
  width?: number | null;
  depth?: number | null;
  height?: number | null;
  custom_dimensions_available?: boolean;
  space_guide_notes?: string | null;
  // Detailed specifications & materials
  wood_type?: string | null;
  fabric_type?: string | null;
  foam_density?: string | null;
  legs_type?: string | null;
  hardware_type?: string | null;
  warranty_years?: number | null;
  images: string[];
  created_at?: string;
  updated_at?: string;
}

export const PRIMARY_MATERIALS = [
  'خشب زان',
  'قماش محلي',
  'رخام طبيعي',
  'ستانلس ستيل',
  'خشب جوز',
  'جلد طبيعي',
  'كتان طبيعي',
  'قماش بوكليه',
  'أوراق ذهب',
  'زجاج سيكوريت',
] as const;

export const WOOD_TYPES = [
  'هيكل خشب زان أحمر طبيعي مجفف حرارياً ومقاوم للتسوس',
  'هيكل خشب زان روماني عالي المتانة والصلابة',
  'خشب جوز طبيعي فاخر مع عروق بارزة',
  'خشب بلوط صلب (آرو) بتشطيب طبيعي',
  'خشب تيك طبيعي صلب عالي المقاومة',
] as const;

export const FABRIC_TYPES = [
  'مخمل إيطالي ناعم معالج ضد البقع وسهل التنظيف',
  'كتان تركي طبيعي عالي الكثافة ومقاوم للاهتراء',
  'قماش بوكليه ناعم بملمس دافئ وفاخر',
  'جلد طبيعي إيطالي عالي الجودة والنعومة',
  'قماش جاكار دمشقي مطرز عالي الفخامة',
] as const;

export const FOAM_TYPES = [
  'إسفنج سوفت عالي المرونة (كثافة 36) دعم طبي كامل',
  'إسفنج طبي عالي الكثافة (كثافة 38) لا يهبط مع الاستخدام',
  'حشوات ريش مع طبقات إسفنج هايبر سوفت فائقة الراحة',
  'إسفنج ميموري فوم مع نوابض جيبية منفصلة',
] as const;

export const LEGS_TYPES = [
  'ستانلس ستيل 304 مطلي ذهبي مقاوم للخدش والتآكل',
  'ستانلس ستيل أسود مطفي دهان حراري إلكتروستاتيك',
  'خشب زان أحمر مصمت محفور يدوياً',
  'قواعد خفية مدمجة بتصميم عائم',
  'أرجل نحاسية مصقولة ومحمية باللكر',
] as const;

export interface ColorOption {
  label: string;
  hex: string;
}

export const PRODUCT_COLORS: ColorOption[] = [
  { label: 'بيج', hex: '#D1C2A5' },
  { label: 'أوف وايت', hex: '#F4F1EA' },
  { label: 'رمادي', hex: '#6B7280' },
  { label: 'رمادي فاتح', hex: '#D1D5DB' },
  { label: 'رمادي داكن', hex: '#4B5563' },
  { label: 'كحلي', hex: '#1E3A8A' },
  { label: 'أخضر زيتي', hex: '#4D5B3A' },
  { label: 'بني', hex: '#78350F' },
  { label: 'بني دافئ', hex: '#7C5335' },
  { label: 'ذهبي', hex: '#D4AF37' },
  { label: 'نحاسي', hex: '#B87333' },
  { label: 'أسود', hex: '#111827' },
  { label: 'أبيض رخامي', hex: '#F9FAFB' },
];

export const POPULAR_LUCIDE_ICONS = [
  'Sofa',
  'UtensilsCrossed',
  'Bed',
  'Coffee',
  'Sparkles',
  'Lamp',
  'Armchair',
  'Frame',
  'Palette',
  'Home',
  'Boxes',
  'Hammer',
  'Shield',
  'Tv',
  'Sun',
  'Sliders',
] as const;

export type HeroMediaType = 'image' | 'video';
export type HeroBadgeType = 'hot' | 'new' | 'limited';

export interface HeroSlideRecord {
  id: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  badge?: string | null;
  badge_type?: HeroBadgeType | null;
  media_type: HeroMediaType;
  media_url: string;
  video_poster_url?: string | null;
  starting_price?: string | null;
  original_price?: string | null;
  discount_percentage?: string | null;
  highlight_tag?: string | null;
  cta_text?: string | null;
  link: string;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}
