import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger setting
  // const setting = new DocumentBuilder()
  //   .setTitle('title')
  //   .setDescription('desc')
  //   .setVersion('1')
  //   .addTag('tag')
  //   .addBearerAuth()
  //   .build();

  // const document = SwaggerModule.createDocument(app, setting);
  // SwaggerModule.setup('docs', app, document);

  await app.listen(33000);
}
bootstrap();
