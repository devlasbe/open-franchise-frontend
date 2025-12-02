import { AuthService } from '@/services/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const allCookies = cookieStore.getAll();

  if (allCookies.length === 0) {
    redirect('/');
  }

  let user;

  try {
    const response = await AuthService.getProfile();
    user = response.payload;
  } catch {
    // 토큰 만료나 에러나면 user는 undefined
  }

  if (!user || user.role !== 'ADMIN') {
    redirect('/');
  }

  return <div className="container mx-auto py-10">{children}</div>;
}
