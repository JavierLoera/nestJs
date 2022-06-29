import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config= new DocumentBuilder().setTitle('Task Api').setDescription('The description of the api').setVersion('1.0').build()
  const document=SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('/api/v1',app,document)
  await app.listen(8000);
}
bootstrap();


//https://www.freecodecamp.org/news/build-web-apis-with-nestjs-beginners-guide/