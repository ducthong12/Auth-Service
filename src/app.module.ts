import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Biến môi trường sẽ có sẵn trong toàn bộ ứng dụng
      envFilePath: '.env', // Tệp .env của bạn
    }),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_KEY, // Khóa bí mật từ biến môi trường
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      signOptions: { expiresIn: process.env.JWT_ACCESS_LIFE as any }, // Thời gian hết hạn token
    }),
    AppModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
