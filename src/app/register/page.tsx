'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthForm } from '@/components/AuthForm';
import { ErrorsAlert } from '@/components/ErrorsAlert';
import { useAuthStore } from '@/store/auth';

export default function Register() {
  const router = useRouter();
  const { register, loading } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: { email: string; password: string; name?: string }) => {
    if (!data.name) return;

    setError(null);
    const success = await register(data.email, data.password, data.name);
    if (success) {
      router.push('/account');
    } else {
      setError('Ошибка при регистрации. Возможно, такой email уже существует.');
    }
  };

  return (
    <div className='authPage'>
      {error && <ErrorsAlert error={error} />}
      <AuthForm
        type="register"
        onSubmit={handleSubmit}
        isLoading={loading}
      />
    </div>
  );
}