'use client';

import { createContext, useEffect, useState } from 'react';
import { AuthService } from '@/services/auth';
import { UserWithoutPassword } from '@/types/apiTypes';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: UserWithoutPassword | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserWithoutPassword | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await AuthService.getProfile();
        // @ts-expect-error payload property might exist on response wrapper
        if (userData.payload) {
          // @ts-expect-error payload property might exist on response wrapper
          setUser(userData.payload);
        } else {
          setUser(userData);
        }
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUser(null);
      router.push('/login');
      router.refresh();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isAdmin: user?.role === 'ADMIN',
        isLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
