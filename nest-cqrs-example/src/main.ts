import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ApplicationModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    ApplicationModule,
    {
      bufferLogs: true,
      cors: true,
    },
  );

  const setting = new DocumentBuilder()
    .setTitle('Digital wallet api gateway')
    .setDescription('Digital wallet api gateway')
    .setVersion("1.0.0a")
    .addTag('DGATEWAY')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, setting);
  SwaggerModule.setup('docs', app, document);

  const port = 43000;
  app.listen(port, () =>
    console.log(`Application is listening on port: ${port}.`),
  );
}
bootstrap();
