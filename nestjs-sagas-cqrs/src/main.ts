// [Nest] 2702614  - 03/28/2023, 10:50:15 AM   ERROR [ExceptionHandler] Failed to connect to a RabbitMQ broker within a timeout of 5000ms
// Error: Failed to connect to a RabbitMQ broker within a timeout of 5000ms
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';
import helmet from 'helmet';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('v1', {
    exclude: [
      { path: '/', method: RequestMethod.GET },
      { path: 'health', method: RequestMethod.GET },
      { path: 'swagger', method: RequestMethod.GET },
    ],
  });
  app.use(new compression());
  app.use(cookieParser());
  app.use(helmet());

  const options = new DocumentBuilder()
    .setTitle('Swagger API')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/swagger', app, document);
  Sentry.init({
    dsn: process.env.SENTRY_DNS,
  });

  app.enableShutdownHooks();
  await app.listen(3002);
}
bootstrap();
