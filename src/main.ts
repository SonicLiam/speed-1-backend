/* eslint-disable prettier/prettier */
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express/adapters/express-adapter';
import { ClassSerializerInterceptor } from '@nestjs/common';

// const localURL = 'http://localhost:3000';
const vercelURL = 'https://speed-1-frontend-chi.vercel.app/';

  const CORS_OPTIONS = {
    origin: '*', // Replace with the actual origin of your frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue : false,
    credentials: true,
  };

  async function bootstrap() {
    const app = await NestFactory.create(AppModule, new ExpressAdapter());
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
    app.enableCors(CORS_OPTIONS);

    await app.listen(3001); // You can specify the port you want to listen on

  }
bootstrap();