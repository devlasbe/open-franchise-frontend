import myFetch from '@/lib/myFetch';
import { LoginRequestDto, LoginResponseDto, UserWithoutPassword } from '@/types/apiTypes';

export class AuthService {
  static async login(credentials: LoginRequestDto) {
    const data = await myFetch<LoginResponseDto>({
      path: 'auth/login',
      init: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include',
      },
      isClient: true,
    });
    return data;
  }

  static async getProfile() {
    const response = await myFetch<UserWithoutPassword>({
      path: 'auth/profile',
      init: {
        method: 'GET',
        credentials: 'include',
      },
      isClient: true,
    });
    return response;
  }

  static async logout() {
    return await myFetch<{ message: string }>({
      path: 'auth/logout',
      init: {
        method: 'POST',
        credentials: 'include',
      },
      isClient: true,
    });
  }
}
