'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useAuthStore } from '@/store/auth';
import styles from '@/styles/Layout.module.scss';

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isLoggedIn } = useAuthStore();
  
  // Проверяем текущий путь для отображения нужного варианта Header и Footer
  const isAuthPage = pathname === '/login' || pathname === '/register';
  
  return (
    <>
      <Header 
        isLoggedIn={isLoggedIn} 
        isAuthPage={isAuthPage} 
      />
      <main className={styles.mainContent}>
        {children}
      </main>
      {
        isAuthPage && <Footer pathname={pathname} />
      }
    </>
  );
}