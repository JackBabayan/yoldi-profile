'use client';

import { ReactNode, useEffect } from 'react';
import { useAuthStore } from '@/store/auth';
import { SWRConfig } from 'swr';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const { isLoggedIn, fetchProfile } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn) {
      fetchProfile();
    }
  }, [isLoggedIn, fetchProfile]);

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        errorRetryCount: 3,
      }}
    >
      {children}
    </SWRConfig>
  );
}