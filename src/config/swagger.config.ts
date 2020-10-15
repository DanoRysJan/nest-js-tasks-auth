import { DocumentBuilder } from '@nestjs/swagger';

export const description = new DocumentBuilder()
  .setTitle('Task´s Api by Nest.js')
  .setDescription(
    'This is an API developed by Nest.js, PostgreSQL, TypeORM and JWT',
  )
  .setVersion('1.0')
  .addTag('tasks nestjs')
  .build();

export const options = {
  explorer: true,
  swaggerOptions: {
    filter: true,
    showRequestDuration: true,
  },
};
