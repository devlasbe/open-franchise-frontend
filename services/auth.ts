import myFetch from '@/lib/myFetch';
import { LoginRequestDto, LoginResponseDto } from '@/types/apiTypes';

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
}
