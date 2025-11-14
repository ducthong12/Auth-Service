import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    // Mock database
  }

  register(email: string, pass: string) {
    return { id: '1', email: email, pass: pass };
  }

  async login(email: string, pass: string) {
    // Tưởng tượng: kiểm tra user/pass trong DB
    const user = { id: '1', email: email, pass: pass };

    // Tạo JWT token
    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_KEY') || '15m',
    });
    return { token };
  }

  // Logic xác thực token
  async validateToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync<{
        sub: string;
        email?: string;
      }>(token, {
        secret: this.configService.get<string>('JWT_ACCESS_KEY'),
      });

      // Token hợp lệ
      return {
        isValid: true,
        userId: payload.sub,
        error: null,
      };
    } catch (e) {
      let errorMessage = 'Token không hợp lệ hoặc đã hết hạn';

      // Xử lý 'e' (unknown) một cách an toàn
      if (e instanceof Error) {
        errorMessage = e.message;
      } else if (typeof e === 'string') {
        errorMessage = e;
      } else if (e && typeof e === 'object') {
        // Lỗi từ JWT thường có 'message'
        const err = e as { message?: unknown };
        if (typeof err.message === 'string') {
          errorMessage = err.message;
        }
      }

      // Token không hợp lệ
      return {
        isValid: false,
        userId: null,
        error: errorMessage,
      };
    }
  }
}
