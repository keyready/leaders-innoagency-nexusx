import { NestFactory } from '@nestjs/core';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const ApiDocsConfig = new DocumentBuilder()
    .setTitle('Документация к единому сервису бронирования креативных площадок города Москвы.')
    .setDescription('Решение 1 трека | Хакатон "Лидеры цифровой трансформации 2023" | NexusX Team')
    .setVersion('1.0.0')
    .addTag('NexusX Team')
    .build()
    
  const document = SwaggerModule.createDocument(app,ApiDocsConfig)
  SwaggerModule.setup('/docs',app,document)

  await app.listen(9999,() =>{
    console.log(`Server started http://localhost:${9999}`);
  });
}
bootstrap();
