import { Module } from '@nestjs/common';

import { SummaryService } from './summary.service';
import { ReportModule } from 'src/report/report.module';
import { SummaryController } from './summary.controller';

@Module({
    imports: [ReportModule],
    controllers: [SummaryController],
    providers: [SummaryService]
})
export class SummaryModule { }
