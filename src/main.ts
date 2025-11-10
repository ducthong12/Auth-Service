import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

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
  await app.listen();
  console.log('Auth Microservice (gRPC) is running on port 50051');
}

bootstrap()
  .then(() => {
    console.log('Auth Microservice Successfully Started');
  })
  .catch(() => {
    console.error('Auth Microservice Fail Started');
  });
