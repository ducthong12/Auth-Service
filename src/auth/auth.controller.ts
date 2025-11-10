import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, ValidateTokenDto } from './dto/auth.dto';

// Tên service 'AuthService' phải khớp với file .proto
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthService', 'Register')
  register(data: RegisterDto) {
    // Logic nghiệp vụ nên ở trong service
    return this.authService.register(data.email, data.password);
  }

  @GrpcMethod('AuthService', 'Login')
  async login(data: LoginDto) {
    const { token } = await this.authService.login(data.email, data.password);
    return { token };
  }

  @GrpcMethod('AuthService', 'ValidateToken')
  async validateToken(data: ValidateTokenDto) {
    return this.authService.validateToken(data.token);
  }
}
