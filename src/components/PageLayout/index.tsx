'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  const isAuthPage = pathname === '/login' || pathname === '/register';
  
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      {
        isAuthPage && <Footer pathname={pathname} />
      }
    </>
  );
}