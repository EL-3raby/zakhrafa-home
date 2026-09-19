import React from 'react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';
import { MobileBottomNav } from '@/components/common/MobileBottomNav';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer />
      <WhatsAppButton />
      <MobileBottomNav />
    </div>
  );
}
