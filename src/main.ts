import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';

export async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('NodeJS Course 2022')
    .setDescription('Документация')
    .setVersion('1.0.0')
    .addTag('Maksim Zhuk')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log(`Server start on ${PORT} port`));
}
// bootstrap();
//Включить когда запускаешь сервер
//выключить когда запускаешь тесты
