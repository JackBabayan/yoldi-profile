'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthForm } from '@/components/AuthForm';
import { ErrorsAlert } from '@/components/ErrorsAlert';
import { useAuthStore } from '@/store/auth';

export default function Login() {
  const router = useRouter();
  const { login, loading } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: { email: string; password: string }) => {
    setError(null);
    const success = await login(data.email, data.password);
    if (success) {
      router.push('/account');
    } else {
      setError('Неверный email или пароль');
    }
  };

  return (
    <>
      {error && <ErrorsAlert error={error}/>}
      <AuthForm 
        type="login" 
        onSubmit={handleSubmit} 
        isLoading={loading} 
      />
    </>
  );
}