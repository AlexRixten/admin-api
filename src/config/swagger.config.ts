import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Admin-panel API')
  .setDescription('This api for admin-panel')
  .setVersion('1.0')
  .addTag('API')
  .build();
