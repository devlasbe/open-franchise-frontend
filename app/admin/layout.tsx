'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAdmin, isLoading, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!isLoggedIn || !isAdmin)) {
      router.replace('/');
    }
  }, [isAdmin, isLoading, isLoggedIn, router]);

  if (isLoading || !isAdmin) return null;

  return <div className="container mx-auto py-10">{children}</div>;
}


