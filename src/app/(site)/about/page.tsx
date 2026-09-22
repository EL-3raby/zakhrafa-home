import Link from 'next/link';
import { ArrowLeft, HeartHandshake, Palette, ShieldCheck, Sparkles, Truck } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="bg-white">
      <section className="border-b border-stone-200 bg-gradient-to-br from-[#F7F2EE] via-white to-[#F6F7F3]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6 text-right">
              <span className="inline-flex items-center rounded-full border border-[#0B3D42]/15 bg-[#0B3D42]/5 px-3 py-1.5 text-xs font-bold text-[#0B3D42]">
                من نحن
              </span>

              <h1 className="text-3xl font-black tracking-tight text-[#0B3D42] sm:text-4xl lg:text-5xl">
                نطوّر مساحات تعكس ذوقك وتدوم معك.
              </h1>

              <p className="max-w-xl text-base leading-8 text-stone-600 sm:text-lg">
                متجر زخرفة هو وجهة لعشاق الأثاث والديكور، حيث نجمع بين التصميم العصري، الخامات المميزة،
                والتفصيل الدقيق ليمنح كل بيت شخصية خاصة ومشاعر مميزة.
              </p>

              <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                <Link
                  href="/categories"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0B3D42] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#07262A]"
                >
                  <span>تصفح الكتالوج</span>
                  <ArrowLeft className="h-4 w-4" />
                </Link>

                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-[#0B3D42]/15 bg-white px-5 py-3 text-sm font-bold text-[#0B3D42] transition hover:bg-stone-50"
                >
                  <span>تواصل معنا</span>
                </Link>
              </div>
            </div>

            <div className="rounded-[28px] border border-stone-200 bg-white p-4 shadow-[0_20px_60px_rgba(11,61,66,0.08)] sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-[#0B3D42] p-5 text-white">
                  <Sparkles className="mb-4 h-8 w-8 text-[#E17F3F]" />
                  <p className="text-3xl font-black">+5</p>
                  <p className="mt-2 text-sm text-stone-200">سنوات خبرة في التصميم والديكور</p>
                </div>

                <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 text-right">
                  <HeartHandshake className="mb-4 h-8 w-8 text-[#E17F3F]" />
                  <p className="text-3xl font-black text-[#0B3D42]">100%</p>
                  <p className="mt-2 text-sm text-stone-600">خدمة عملاء مخصصة واهتمام شخصي</p>
                </div>

                <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 text-right sm:col-span-2">
                  <Palette className="mb-4 h-8 w-8 text-[#E17F3F]" />
                  <p className="text-lg font-extrabold text-[#0B3D42]">تصميم يوازن بين الدفء والهوية</p>
                  <p className="mt-2 text-sm leading-7 text-stone-600">
                    نقدّم تشكيلة تم اختيارها بعناية لتناسب كل نمط حياة، من الأجواء الدافئة إلى اللمسات العصرية والراقية.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-bold tracking-[0.2em] text-[#E17F3F]">قيمنا</p>
          <h2 className="mt-3 text-2xl font-black text-[#0B3D42] sm:text-3xl">ما الذي يميز متجر زخرفة؟</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <article className="rounded-3xl border border-stone-200 bg-white p-6 text-right shadow-sm">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B3D42]/10 text-[#0B3D42]">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-extrabold text-[#0B3D42]">جودة وثقة</h3>
            <p className="mt-3 text-sm leading-7 text-stone-600">
              نختار الخامات بعناية ونضمن جودة التنفيذ، مع اهتمام كبير بالتفاصيل من أول فكرة حتى التوصيل.
            </p>
          </article>

          <article className="rounded-3xl border border-stone-200 bg-white p-6 text-right shadow-sm">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E17F3F]/10 text-[#E17F3F]">
              <Palette className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-extrabold text-[#0B3D42]">تصميم متوازن</h3>
            <p className="mt-3 text-sm leading-7 text-stone-600">
              نعمل على توازن الألوان، الأشكال، والوظائف ليصبح المنتج ليس فقط جميلًا، بل عمليًا ومناسبًا للحياة اليومية.
            </p>
          </article>

          <article className="rounded-3xl border border-stone-200 bg-white p-6 text-right shadow-sm">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <Truck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-extrabold text-[#0B3D42]">توصيل سريع</h3>
            <p className="mt-3 text-sm leading-7 text-stone-600">
              نوفر خدمة توصيل آمنة داخل مصر، مع متابعة خدمية تساعدك في كل خطوة من الطلب حتى الوصول إلى المنزل.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-[#0B3D42] py-14 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-bold tracking-[0.2em] text-[#E7C9B2]">رسالتنا</p>
          <h2 className="mt-3 text-2xl font-black sm:text-3xl">
            نجعل كل بيت يروي قصة صاحبته بلمسة مميزة.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-stone-200">
            نؤمن أن الأثاث والديكور ليس مجرد عنصر وظيفي، بل هو جزء من الهدوء، الراحة، والهوية الشخصية في المنزل.
            لذلك نركز على التفاصيل، الجودة، والراحة خلال تجربة الشراء بالكامل.
          </p>
        </div>
      </section>
    </main>
  );
}
