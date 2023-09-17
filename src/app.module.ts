import { APP_INTERCEPTOR } from '@nestjs/core';
import { ClassSerializerInterceptor, Module } from '@nestjs/common'

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ReportModule } from './report/report.module';
import { SummaryModule } from './summary/summary.module';

@Module({
    imports: [SummaryModule, ReportModule],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor,
        }
    ],
})

export class AppModule { }
