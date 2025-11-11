import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'auth',
        protoPath: join(__dirname, './proto/auth.proto'), // Đường dẫn đến file proto
        url: '0.0.0.0:50051', // Lắng nghe trên port 50051
      },
    },
  );

  // Kích hoạt ValidationPipe toàn cục
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Tự động loại bỏ các thuộc tính không có trong DTO
      forbidNonWhitelisted: true, // Báo lỗi nếu có thuộc tính không mong muốn
      transform: true, // Tự động chuyển đổi kiểu dữ liệu (ví dụ: string -> number)
    }),
  );

  await app.listen();
}

bootstrap()
  .then(() => {
    console.log('Auth Microservice Successfully Started');
  })
  .catch(() => {
    console.error('Auth Microservice Fail Started');
  });
