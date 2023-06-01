import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PORT } from './config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder().addBearerAuth()
  .setTitle('Warteg API')
  .setDescription('Warteg API documentation')
  .setVersion('2.0')
  .addTag('API')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

await app.listen(PORT, () => {
  console.log(`Your application is running on http://localhost:${PORT}`);
});
}

bootstrap();