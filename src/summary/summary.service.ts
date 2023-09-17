import { Injectable } from '@nestjs/common';

import { ReportType } from 'src/data';
import { ReportService } from 'src/report/report.service';

@Injectable()
export class SummaryService {

    constructor(
        private readonly reportService: ReportService
    ) { }

    caculateSummary() {
        const totalExpense = this.reportService
            .getAllReports(ReportType.EXPENSE)
            .reduce((sun, report) => sun + report.amount, 0);

        const totalIncome = this.reportService
            .getAllReports(ReportType.INCOME)
            .reduce((sun, report) => sun + report.amount, 0);

        return {
            totalIncome,
            totalExpense,
            netIncome: totalExpense - totalIncome
        }
    }
}
