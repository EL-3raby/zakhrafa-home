'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Truck,
  Sparkle,
  Layers,
  Ruler,
  Info,
  Check,
} from 'lucide-react';
import {
  CalipersRulerIcon,
  FabricWeaveIcon,
  SolidWoodIcon,
  CertifiedShieldIcon,
  CareMaintenanceIcon,
  InspectBeforePayIcon,
  WhiteGloveTruckIcon,
  BespokeCustomIcon,
} from '@/components/common/BrandIcons';
import { Product } from '@/types/product';
import { cn } from '@/lib/classHelpers';
import { Category } from '@/types/category';

interface ProductTabsProps {
  product: Product;
  category?: Category;
}

export const ProductTabs: React.FC<ProductTabsProps> = ({ product, category }) => {
  const [activeTab, setActiveTab] = useState<'specs' | 'dimensions' | 'delivery' | 'care'>('specs');

  const tabs = [
    {
      id: 'specs' as const,
      label: 'المواصفات الفنية والخامات',
      icon: Layers,
    },
    {
      id: 'dimensions' as const,
      label: 'المقاسات ودليل المساحة',
      icon: Ruler,
    },
    {
      id: 'delivery' as const,
      label: 'الشحن والتركيب في مصر',
      icon: Truck,
    },
    {
      id: 'care' as const,
      label: 'إرشادات العناية والتنظيف',
      icon: Sparkles,
    },
  ];

  return (
    <div className="mt-16 sm:mt-20 pt-10 border-t border-stone-200/80">
      {/* Tabs Navigation Header */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 no-scrollbar border-b border-stone-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
  "flex items-center gap-2.5 px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer",
  isActive
    ? "bg-[#0B3D42] text-white shadow-md"
    : "bg-stone-50 text-stone-600 hover:bg-stone-100 hover:text-stone-900 border border-transparent"
)}
>
  <Icon className={cn("w-4 h-4 stroke-[2]", isActive ? "text-[#E17F3F]" : "text-stone-400")} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Panes */}
      <div className="py-8 sm:py-10">
        {/* Tab 1: Specs & Materials */}
        {activeTab === 'specs' && (
          <div className="space-y-8 animate-fade-in">
            <div className="max-w-3xl">
              <h3 className="text-xl sm:text-2xl font-black text-[#0B3D42] tracking-tight mb-2">
                جودة الصنعة واختيار الخامات الفاخرة
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                كل قطعة في زخرفة تصنع بأيدي أمهر الحرفيين في مصر، مع التزام صارم بأعلى المعايير الهندسية ومعالجة الخامات لتحمل الاستخدام اليومي لأعوام طويلة مع الحفاظ على بريقها ورونقها الأصلي.
              </p>
            </div>

            {/* Visual Specs Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Card 1: Solid Wood */}
              <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-stone-50 to-white border border-stone-200/80 shadow-2xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#0B3D42]/10 text-[#0B3D42] flex items-center justify-center">
                  <SolidWoodIcon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-stone-900 text-base">
                  {product.wood_type || 'هيكل خشب زان أحمر طبيعي'}
                </h4>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  هيكل داخلي متين مجفف حرارياً ومقاوم للتسوس والتقوس، يضمن متانة فائقة واستقراراً هيكلياً يدوم لسنوات.
                </p>
              </div>

              {/* Card 2: Fabric & Upholstery */}
              <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-stone-50 to-white border border-stone-200/80 shadow-2xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#E17F3F]/10 text-[#E17F3F] flex items-center justify-center">
                  <FabricWeaveIcon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-stone-900 text-base">
                  {product.fabric_type || 'أقمشة فاخرة معالجة'}
                </h4>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  مخمل إيطالي ناعم، كتان تركي أو بوكليه عالي الكثافة معالج ضد البقع وسهل التنظيف مع ملمس فائق الراحة.
                </p>
              </div>

              {/* Card 3: High Density Foam */}
              <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-stone-50 to-white border border-stone-200/80 shadow-2xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#0B3D42]/10 text-[#0B3D42] flex items-center justify-center">
                  <CertifiedShieldIcon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-stone-900 text-base">
                  {product.foam_density || 'إسفنج سوفت عالي المرونة (كثافة 36)'}
                </h4>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  حشوات طبية مريحة لا تهبط بمرور الوقت، تمنح دعماً مثالياً لفقرات الظهر وتجربة جلوس استرخائية لا تضاهى.
                </p>
              </div>
            </div>

            {/* Detailed Spec Table */}
            <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
              <table className="w-full text-right text-xs sm:text-sm">
                <tbody>
                  <tr className="border-b border-stone-100 bg-stone-50/70">
                    <td className="py-3.5 px-5 font-bold text-stone-700 w-1/3">كود القطعة</td>
                    <td className="py-3.5 px-5 font-mono text-stone-900">{product.id}</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-3.5 px-5 font-bold text-stone-700">القسم الرئيسي</td>
                    <td className="py-3.5 px-5 text-stone-900">{category?.name_ar || 'أثاث منزلي'}</td>
                  </tr>
                  <tr className="border-b border-stone-100 bg-stone-50/70">
                    <td className="py-3.5 px-5 font-bold text-stone-700">الخامات المحددة</td>
                    <td className="py-3.5 px-5 text-stone-900">
                      {product.material || 'خشب زان طبيعي، قماش مخمل، إكسسوارات معالجة'}
                    </td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-3.5 px-5 font-bold text-stone-700">الألوان المتاحة</td>
                    <td className="py-3.5 px-5 text-stone-900">
                      {product.colors ? product.colors.join('، ') : product.color || 'بيج، رمادي، حسب الطلب'}
                    </td>
                  </tr>
                  <tr className="border-b border-stone-100 bg-stone-50/70">
                    <td className="py-3.5 px-5 font-bold text-stone-700">بلد المنشأ والتصنيع</td>
                    <td className="py-3.5 px-5 text-stone-900">{product.origin_country || 'جمهورية مصر العربية (مصانع وورش زخرفة)'}</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-5 font-bold text-stone-700">مدة الضمان</td>
                    <td className="py-3.5 px-5 font-bold text-emerald-700">
                      {product.warranty_years ? `${product.warranty_years} سنوات ضمان شامل على الهيكل والتصنيع` : '5 سنوات ضمان شامل على الهيكل والتصنيع'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Dimensions */}
        {activeTab === 'dimensions' && (
          <div className="space-y-8 animate-fade-in">
            <div className="max-w-3xl">
              <h3 className="text-xl sm:text-2xl font-black text-[#0B3D42] tracking-tight mb-2">
                المقاسات الدقيقة وتنسيق المساحة
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                {product.space_guide_notes || 'تأكد من ملاءمة القطعة لمساحتك ومداخل الأبواب. نتيح إمكانية تفصيل وتعديل أي بعد بالميليمتر ليناسب مساحة غرفتك بالكامل.'}
              </p>
            </div>

            {/* Visual Dimension Callout Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 text-center">
                <span className="block text-stone-400 text-xs font-semibold mb-1">العرض الإجمالي</span>
                <span className="text-2xl sm:text-3xl font-black text-[#0B3D42]">
                  {product.dimensions?.width || 220}
                </span>
                <span className="text-xs text-stone-500 font-bold block mt-0.5">سم</span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 text-center">
                <span className="block text-stone-400 text-xs font-semibold mb-1">العمق</span>
                <span className="text-2xl sm:text-3xl font-black text-[#0B3D42]">
                  {product.dimensions?.depth || 90}
                </span>
                <span className="text-xs text-stone-500 font-bold block mt-0.5">سم</span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 text-center">
                <span className="block text-stone-400 text-xs font-semibold mb-1">الارتفاع الكلي</span>
                <span className="text-2xl sm:text-3xl font-black text-[#0B3D42]">
                  {product.dimensions?.height || 85}
                </span>
                <span className="text-xs text-stone-500 font-bold block mt-0.5">سم</span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#0B3D42] text-white border border-[#0B3D42] text-center flex flex-col justify-center">
                <span className="block text-slate-300 text-[11px] font-semibold mb-1">تعديل المقاسات</span>
                <span className="text-base sm:text-lg font-black text-[#E17F3F]">
                  {product.custom_dimensions_available !== false ? 'متاح حسب الطلب' : 'مقاس قياسي'}
                </span>
                <span className="text-[10px] text-slate-300 block mt-0.5">تواصل مع المهندس</span>
              </div>
            </div>

            {/* Room Fit Guide Card */}
            <div className="p-5 sm:p-6 rounded-3xl bg-stone-50 border border-stone-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#E17F3F]/15 text-[#E17F3F] flex items-center justify-center shrink-0">
                  <BespokeCustomIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-base">هل تحتاج مقاساً خاصاً لغرفتك؟</h4>
                  <p className="text-stone-600 text-xs sm:text-sm mt-0.5">
                    يمكن لمهندسينا تعديل الأبعاد (طول، عمق، ارتفاع) أو حتى زاوية الكنب لتناسب أبعاد جدارك بالضبط دون أي رسوم تصميمية إضافية.
                  </p>
                </div>
              </div>

              <a
                href={`https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+201000000000').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `مرحباً زخرفة، أود الاستفسار عن إمكانية تفصيل وتعديل مقاسات: ${product.name_ar} (كود: ${product.id})`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-5 py-2.5 rounded-xl bg-[#0B3D42] hover:bg-[#07262A] text-white text-xs font-bold transition shadow-xs"
              >
                طلب مقاس مخصص
              </a>
            </div>
          </div>
        )}

        {/* Tab 3: Delivery & Installation */}
        {activeTab === 'delivery' && (
          <div className="space-y-8 animate-fade-in">
            <div className="max-w-3xl">
              <h3 className="text-xl sm:text-2xl font-black text-[#0B3D42] tracking-tight mb-2">
                الشحن والتوصيل الاحترافي لكافة المحافظات
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                نحرص على وصول أثاثك بأعلى درجات الأمان والسلامة عبر أسطول سياراتنا المجهزة وفنيي تركيب معتمدين.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Feature 1 */}
              <div className="p-5 sm:p-6 rounded-3xl bg-stone-50 border border-stone-200/80 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#0B3D42]/10 text-[#0B3D42] flex items-center justify-center">
                  <WhiteGloveTruckIcon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-stone-900 text-sm">مواعيد التوصيل</h4>
                <ul className="text-xs text-stone-600 space-y-1.5 pt-1">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>القاهرة والجيزة:</strong> خلال 24 إلى 48 ساعة</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>الإسكندرية والوجه البحري:</strong> 2 - 3 أيام عمل</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>مدن القناة والصعيد:</strong> 3 - 5 أيام عمل</span>
                  </li>
                </ul>
              </div>

              {/* Feature 2 */}
              <div className="p-5 sm:p-6 rounded-3xl bg-stone-50 border border-stone-200/80 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <InspectBeforePayIcon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-stone-900 text-sm">المعاينة قبل الدفع والاستلام</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  يحق للعميل فحص القطعة بالكامل مع مندوب التوصيل والتأكد من مطابقة اللون والتشطيب وجودة الخامات قبل الاعتماد النهائي.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-5 sm:p-6 rounded-3xl bg-stone-50 border border-stone-200/80 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#E17F3F]/10 text-[#E17F3F] flex items-center justify-center">
                  <Sparkle className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-stone-900 text-sm">تركيب احترافي وتغليف متقدم</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  تغليف فندقي ثلاثي الطبقات (فقاعات هوائية + كرتون مقوى + بلاستيك ستريتش) مع فريق فني مدرب لتركيب الأثاث في مكانه المفضل بمنزلك.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Care Instructions */}
        {activeTab === 'care' && (
          <div className="space-y-8 animate-fade-in">
            <div className="max-w-3xl">
              <h3 className="text-xl sm:text-2xl font-black text-[#0B3D42] tracking-tight mb-2">
                دليل الحفاظ على الأثاث ورونقه
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                اتباع نصائح العناية البسيطة التالية يضمن احتفاظ القطعة بمظهرها الجديد وفخامتها لعقود قادمة.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0B3D42]/10 text-[#0B3D42] flex items-center justify-center shrink-0">
                  <CareMaintenanceIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">تنظيف الأقمشة والمخمل</h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    استخدم مكنسة كهربائية برأس فرشاة ناعمة لإزالة الغبار. في حال انسكاب سوائل، امسح فوراً بقطعة قماش جافة دون فرك، ثم استعمل رغوة تنظيف الأقمشة الجافة.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0B3D42]/10 text-[#0B3D42] flex items-center justify-center shrink-0">
                  <SolidWoodIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">العناية بالخشب الطبيعي</h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    امسح الأسطح الخشبية بقطعة قماش قطنية ناعمة ورطبة قليلاً، وتجنب استعمال المذيبات الكيميائية القوية أو الكحوليات التي قد تؤثر على طبقة الحماية.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0B3D42]/10 text-[#0B3D42] flex items-center justify-center shrink-0">
                  <CalipersRulerIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">المعادن والستانلس ستيل</h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    نظف القوائم المعدنية والإطارات بقطعة قماش مايكروفايبر جافة للحفاظ على لمعانها ولمنع تراكم بصمات الأصابع.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0B3D42]/10 text-[#0B3D42] flex items-center justify-center shrink-0">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">تجنب الحرارة والشمس المباشرة</h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    يفضل وضع القطعة بعيداً عن أشعة الشمس المباشرة الحارقة أو مصادر التدفئة المباشرة للحفاظ على ثبات الألوان ومرونة الأنسجة.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
