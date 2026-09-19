import React from 'react';
import { Check } from 'lucide-react';
import {
  LuxuryShieldIcon,
  WhiteGloveTruckIcon,
  ArchitectCompassIcon,
} from '@/components/common/BrandIcons';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: LuxuryShieldIcon,
      iconColor: 'text-[#0B3D42]',
      title: 'ضمان معتمد وجودة تصنيع فائقة',
      description:
        'نعتمد على أجود أخشاب الزان الطبيعية والأقمشة المقاومة للبقع والاهتراء، مع ضمان رسمي على الهيكل والتشطيب يدوم لسنوات.',
      highlights: ['خشب زان طبيعي 100%', 'أقمشة مستوردة مقاومة للاستخدام اليومي', 'ضمان معتمد ضد عيوب الصناعة'],
    },
    {
      icon: WhiteGloveTruckIcon,
      iconColor: 'text-[#E17F3F]',
      title: 'شحن آمن وتركيب احترافي متكامل',
      description:
        'خدمة شحن محمية بعناية فائقة لكافة المدن، وفريق فني متخصص يتولى معاينة الموقع وتركيب الأثاث بدقة وسرعة متناهية.',
      highlights: ['تغليف متعدد الطبقات لحماية القطع', 'فريق تركيب مدرب ومجهز', 'متابعة مباشرة حتى اكتمال التركيب'],
    },
    {
      icon: ArchitectCompassIcon,
      iconColor: 'text-[#0B3D42]',
      title: 'تفصيل حسب الطلب واستشارات تصميم',
      description:
        'حوّل رؤيتك إلى واقع مع خبرائنا. نساعدك في تنسيق الخامات والألوان واختيار المقاسات المناسبة لمساحة الغرفة بدقة تامة.',
      highlights: ['تعديل الأبعاد والألوان بحرية', 'عينات أقمشة وأخشاب للمعاينة', 'استشارات هندسية للمساحات السكنية'],
    },
  ];

  return (
    <section id="services" className="py-20 sm:py-28 bg-[#FAF9F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - appears normally without entrance scroll animations */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-[#0B3D42] text-xs font-semibold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E17F3F]" />
            <span>معايير التميز في زخرفة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B3D42] tracking-tight">
            خدمات وتجربة اقتناء استثنائية
          </h2>
          <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
            لا نبيع مجرد قطع أثاث، بل نبتكر تجربة تأثيث متكاملة تضمن لك راحة البال والجودة التي تدوم.
          </p>
        </div>

        {/* 3 Columns: Borderless layout with generous whitespace & clean typography */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 md:divide-x md:divide-x-reverse md:divide-gray-200/80">
          {services.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <div
                key={idx}
                className="flex flex-col justify-between md:pr-12 lg:pr-16 md:first:pr-0"
              >
                <div>
                  {/* Clean Icon with brand stroke color and consistent stroke width */}
                  <div className="mb-6">
                    <IconComponent className={`w-10 h-10 ${service.iconColor} stroke-[1.5]`} />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-[#0B3D42] tracking-tight mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Subtle Highlights Checklist */}
                <div className="pt-5 border-t border-gray-200/60 space-y-3">
                  {service.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs text-gray-700">
                      <Check className="w-4 h-4 text-[#E17F3F] stroke-[2] shrink-0 mt-0.5" />
                      <span className="leading-tight">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
