import type { Metadata } from "next";
import { Alexandria } from "next/font/google";
import "./globals.css";

const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "زخرفة | ديكورات مبتكرة وأثاث عصري فاخر",
  description:
    "متجر زخرفة للأثاث والديكورات المبتكرة - تشكيلة راقية من غرف المعيشة، السفرة، غرف النوم والديكورات الفاخرة بجودة استثنائية وتصاميم تواكب أحدث صيحات الديكور.",
  keywords: ["أثاث فاخر", "ديكورات مبتكرة", "زخرفة", "صالونات", "غرف نوم", "طاولات مودرن"],
  authors: [{ name: "Zakhrafa" }],
  openGraph: {
    title: "زخرفة | ديكورات مبتكرة وأثاث فاخر",
    description: "تصاميم مبتكرة تضفي لمسة فخامة على منزلك.",
    type: "website",
    locale: "ar_EG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${alexandria.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-white text-[#1F2937] min-h-screen flex flex-col selection:bg-[#E17F3F] selection:text-white">
        {children}
      </body>
    </html>
  );
}
