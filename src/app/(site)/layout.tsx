import React from 'react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';
import { MobileBottomNav } from '@/components/common/MobileBottomNav';
import { StoreProvider } from '@/components/common/StoreProvider';
import { CinematicPreloader } from '@/components/common/CinematicPreloader';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <CinematicPreloader />
      <StoreProvider>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <MobileBottomNav />
      </StoreProvider>
    </div>
  );
}
