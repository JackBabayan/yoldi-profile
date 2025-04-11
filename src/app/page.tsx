'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';

export default function Home() {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/all-accounts');
    } else {
      router.push('/register');
    }
  }, [isLoggedIn, router]);

  return null;
}