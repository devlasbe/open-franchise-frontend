'use client';

import { createContext, useState } from 'react';
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

export function AuthProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: UserWithoutPassword | null;
}) {
  const [user, setUser] = useState<UserWithoutPassword | null>(initialUser);
  const isLoading = false;
  const router = useRouter();

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
