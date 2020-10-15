import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { description, options } from './config/swagger.config';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const document = SwaggerModule.createDocument(app, description);
  SwaggerModule.setup('api/docs', app, document, options);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Application Listening on port ${port}`);
}
bootstrap();
