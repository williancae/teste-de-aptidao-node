import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const options = new DocumentBuilder()
        .setTitle('NestJS API')
        .setDescription('API description')
        .setVersion('1.0')
        .addTag('API')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);

    await app.listen(3000);
}
bootstrap();
