import Link from 'next/link';
import { ArrowLeft, Check, Palette, ShieldCheck, Truck } from 'lucide-react';
import { BrandLogo } from '@/components/common/BrandLogo';

const principles = [
  {
    number: '01',
    title: 'نبدأ من إحساس المكان',
    description: 'نختار القطع التي تمنح البيت راحة وحضورًا، لا مجرد شكل جميل في صورة.',
  },
  {
    number: '02',
    title: 'نوازن بين الشكل والاستخدام',
    description: 'كل تفصيلة لها وظيفة: خامة تتحمل، مقاس مناسب، وتصميم يعيش مع يومك.',
  },
  {
    number: '03',
    title: 'نترك مساحة لشخصيتك',
    description: 'زخرفة لا تفرض ستايلًا واحدًا؛ نحن نساعدك أن تجعل المساحة تشبهك أنت.',
  },
];

export default function AboutPage() {
  return (
    <div className="overflow-hidden bg-[#FAF9F5] text-[#0B3D42]">
      <section className="relative overflow-hidden border-b border-stone-200 bg-[#F4EEE8]">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full border-[36px] border-white/60" />
        <div className="absolute bottom-0 right-0 h-1.5 w-40 bg-[#E17F3F] motion-safe:animate-pulse-subtle sm:w-64" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-28">
          <div className="order-2 text-right motion-safe:animate-reveal-up lg:order-1">
            <p className="mb-5 text-xs font-bold tracking-[0.25em] text-[#E17F3F]">حكاية زخرفة</p>
            <h1 className="max-w-2xl text-4xl font-black leading-[1.4] text-[#0B3D42] sm:text-5xl lg:text-6xl">
              نختار التفاصيل التي تجعل البيت أحنّ.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-stone-600 sm:text-lg">
              زخرفة مساحة تجمع قطعًا لها معنى، وخدمة تعرف أن اختيار قطعة جديدة للبيت قرار شخصي يستحق وقتًا واهتمامًا.
            </p>
            <div className="mt-8 flex flex-wrap justify-end gap-3">
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 rounded-full bg-[#0B3D42] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#07262A]"
              >
                <span>اكتشف اختياراتنا</span>
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center rounded-full border border-[#0B3D42]/20 bg-white/70 px-5 py-3 text-sm font-bold text-[#0B3D42] transition hover:-translate-y-0.5 hover:bg-white"
              >
                تكلّم معنا
              </Link>
            </div>
          </div>

          <div className="order-1 motion-safe:animate-reveal-right lg:order-2">
            <div className="relative mx-auto max-w-sm border border-[#0B3D42]/15 bg-white p-6 shadow-[18px_18px_0_#E17F3F] transition duration-500 hover:-translate-y-2 hover:shadow-[18px_24px_0_#E17F3F] motion-safe:animate-soft-glow sm:p-8">
              <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-6">
                <span className="text-xs font-bold text-stone-400">01 / 03</span>
                <BrandLogo className="h-10 w-auto" theme="light" />
              </div>
              <div className="py-12 text-right">
                <span className="text-5xl font-black leading-none text-[#0B3D42] sm:text-6xl">زخرفة</span>
                <p className="mt-6 text-xl font-black leading-9 text-[#0B3D42]">أثاث وديكور<br />بطابعك الخاص.</p>
              </div>
              <div className="flex items-center justify-between border-t border-stone-200 pt-5 text-xs text-stone-500">
                <span>مساحات تشبه أصحابها</span>
                <span className="font-bold text-[#E17F3F]">منذ 2021</span>
              </div>
              <span className="absolute -right-3 top-10 h-6 w-6 rounded-full bg-[#0B3D42] motion-safe:animate-float" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-0 px-4 py-6 sm:grid-cols-3 sm:gap-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="border-b border-[#E17F3F] py-4 text-right motion-safe:animate-reveal-up sm:border-b-0 sm:border-r-2 sm:py-0 sm:pr-4">
            <p className="text-3xl font-black text-[#0B3D42]">+5</p>
            <p className="mt-1 text-sm text-stone-500">سنوات من اختيار التفاصيل</p>
          </div>
          <div className="border-b border-[#0B3D42]/15 py-4 text-right motion-safe:animate-reveal-up sm:border-b-0 sm:border-r-2 sm:py-0 sm:pr-4 [animation-delay:120ms]">
            <p className="text-3xl font-black text-[#0B3D42]">100%</p>
            <p className="mt-1 text-sm text-stone-500">اهتمام بكل طلب</p>
          </div>
          <div className="py-4 text-right motion-safe:animate-reveal-up sm:border-r-2 sm:border-[#0B3D42]/15 sm:py-0 sm:pr-4 [animation-delay:240ms]">
            <p className="text-3xl font-black text-[#0B3D42]">1</p>
            <p className="mt-1 text-sm text-stone-500">فكرة: بيت على ذوقك</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="text-right">
            <p className="text-xs font-bold tracking-[0.25em] text-[#E17F3F]">طريقتنا</p>
            <h2 className="mt-4 text-3xl font-black leading-[1.45] sm:text-4xl">نختار ببطء، عشان تختار بثقة.</h2>
            <p className="mt-5 text-base leading-8 text-stone-600">
              نبحث عن القطع التي تستحق مكانها في بيتك. نراجع الخامة، النسب، واللمسة النهائية، ثم نضعها أمامك بطريقة بسيطة تساعدك على الاختيار.
            </p>
            <div className="mt-7 space-y-3 text-sm text-stone-700">
              <p className="flex items-center justify-end gap-2"><span>اختيارات مدروسة وليست عشوائية</span><Check className="h-4 w-4 text-[#E17F3F]" /></p>
              <p className="flex items-center justify-end gap-2"><span>تفاصيل عملية للاستخدام اليومي</span><Check className="h-4 w-4 text-[#E17F3F]" /></p>
              <p className="flex items-center justify-end gap-2"><span>تواصل إنساني قبل وبعد الطلب</span><Check className="h-4 w-4 text-[#E17F3F]" /></p>
            </div>
          </div>

          <div className="divide-y divide-stone-200 border-y border-stone-200">
            {principles.map((principle) => (
              <article key={principle.number} className="grid gap-3 py-5 transition duration-300 hover:translate-x-1 sm:grid-cols-[72px_1fr] sm:items-start sm:py-6">
                <span className="text-sm font-black text-[#E17F3F]">{principle.number}</span>
                <div className="text-right">
                  <h3 className="text-xl font-extrabold">{principle.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-7 text-stone-600">{principle.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-right">
            <p className="text-xs font-bold tracking-[0.25em] text-[#E17F3F]">التزامنا</p>
            <h2 className="mt-3 text-3xl font-black">تجربة تليق بالقطعة وبك.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <article className="border border-stone-200 p-6 text-right transition duration-500 hover:-translate-y-2 hover:border-[#0B3D42]/30 hover:shadow-[0_16px_28px_rgba(11,61,66,0.08)]">
              <ShieldCheck className="h-7 w-7 text-[#0B3D42]" />
              <h3 className="mt-5 text-lg font-extrabold">جودة نقدر نقف وراها</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">نشرح لك الخامة والتفاصيل بوضوح، عشان قرارك يكون مطمئنًا من البداية.</p>
            </article>
            <article className="border border-stone-200 p-6 text-right transition delay-100 duration-500 hover:-translate-y-2 hover:border-[#E17F3F]/50 hover:shadow-[0_16px_28px_rgba(225,127,63,0.12)]">
              <Palette className="h-7 w-7 text-[#E17F3F]" />
              <h3 className="mt-5 text-lg font-extrabold">ذوق له مساحة</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">نقدم لك أساسًا جميلًا تقدر تكمله بطريقتك وتعيش معه لفترة طويلة.</p>
            </article>
            <article className="border border-stone-200 p-6 text-right transition delay-200 duration-500 hover:-translate-y-2 hover:border-emerald-500/40 hover:shadow-[0_16px_28px_rgba(16,185,129,0.1)]">
              <Truck className="h-7 w-7 text-emerald-700" />
              <h3 className="mt-5 text-lg font-extrabold">متابعة لحد باب البيت</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">من أول استفسار حتى التوصيل، ستجد شخصًا يتابع معك الخطوات ببساطة.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#0B3D42] px-4 py-16 text-center text-white sm:py-20">
        <p className="text-xs font-bold tracking-[0.25em] text-[#E7C9B2]">خلّي المكان يحكي عنك</p>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-black leading-tight sm:text-4xl">جاهز تلاقي القطعة اللي تكمل بيتك؟</h2>
        <Link
          href="/categories"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#E17F3F] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#C96A2D]"
        >
          <span>تصفح الكتالوج</span>
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
