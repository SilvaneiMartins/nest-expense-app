import { v4 as uuid } from "uuid";
import { Injectable } from '@nestjs/common';

import { data, ReportType } from './data';

interface Report {
    amount: number;
    source: string;
}

@Injectable()
export class AppService {
    getAllReports(type: ReportType) {
        return data.report.filter((report) => {
            return report.type === type;
        });
    }

    getReportById(id: string, type: ReportType) {
        const report = data.report
            .filter((report) => report.type === type)
            .find((report) => report.id === id);

        return report;
    }

    createReport(type: ReportType, { amount, source }: Report) {
        const newReport = {
            id: uuid(),
            amount,
            source,
            created_at: new Date(),
            updated_at: new Date(),
            type,
        };

        data.report.push(newReport);
        return newReport;
    }

    updateReport(type: ReportType, id: string, body: Report) {
        const reportToUpdate = data.report
            .filter((report) => report.type === type)
            .find((report) => report.id === id);

        if (!reportToUpdate) return;

        const reportIndex = data.report.findIndex((report) => report.id === reportToUpdate.id);

        data.report[reportIndex] = {
            ...data.report[reportIndex],
            ...body,
            updated_at: new Date(),
        };

        return data.report[reportIndex];
    }

    deleteReport(id: string) {
        const reportIndex = data.report.findIndex((report) => report.id === id);

        if (reportIndex === -1) return;

        data.report.splice(reportIndex, 1);
    }
}
