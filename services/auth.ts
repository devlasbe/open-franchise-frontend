import fetchService from '@/lib/fetchService';
import { GetProfileResponseDto, LoginRequestDto, LoginResponseDto } from '@/types/apiTypes';

export class AuthService {
  static async login(credentials: LoginRequestDto) {
    const data = await fetchService<LoginResponseDto>({
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

  static async getProfile(cookie?: string) {
    const response = await fetchService<GetProfileResponseDto>({
      path: 'auth/profile',
      init: {
        method: 'GET',
        credentials: 'include',
        headers: cookie ? { Cookie: cookie } : undefined,
      },
      isClient: !cookie,
    });
    return response;
  }

  static async logout() {
    return await fetchService<{ message: string }>({
      path: 'auth/logout',
      init: {
        method: 'POST',
        credentials: 'include',
      },
      isClient: true,
    });
  }
}
