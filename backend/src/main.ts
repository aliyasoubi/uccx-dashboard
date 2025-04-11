import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors();

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Set global prefix
  app.setGlobalPrefix('api');

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('UCCX Dashboard API')
    .setDescription(`
      API documentation for UCCX Dashboard.
      
      ## Authentication
      All endpoints require authentication using JWT tokens.
      
      ## Real-time Data
      - Queue statistics are fetched from UCCX's VoiceIAQStats endpoint
      - Agent statistics are fetched from UCCX's ResourceIAQStats endpoint
      
      ## Data Sources
      The API provides access to various data sources:
      - Queue statistics
      - Agent/Operator statistics
      - Historical data
      - Real-time updates via WebSocket
      
      ## Error Handling
      - 400: Bad Request
      - 401: Unauthorized
      - 403: Forbidden
      - 404: Not Found
      - 500: Internal Server Error
    `)
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('data-sources', 'Core data source operations')
    .addTag('operators', 'Operator/Agent related operations')
    .addTag('queues', 'Queue related operations')
    .addTag('tenants', 'Tenant management operations')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'UCCX Dashboard API Documentation',
    customfavIcon: 'https://your-domain.com/favicon.ico',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    ],
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation is available at: http://localhost:${port}/api`);
}
bootstrap(); 