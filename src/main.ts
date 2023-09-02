import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
    }));
    await app.listen(
        3000,
        () => console.log('🚀 Servidor está online na porta 3000')
    );
}
bootstrap();
