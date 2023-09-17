import { v4 as uuid } from "uuid";
import { Injectable } from '@nestjs/common';

import { data, ReportType } from './data';
import { ReportResponseDto } from "./dtos/report.dto";

interface Report {
    amount: number;
    source: string;
}

interface UpdateReport {
    amount?: number;
    source?: string;
}

@Injectable()
export class AppService {
    /** Método para buscar tudo */
    getAllReports(type: ReportType): ReportResponseDto[] {
        return data.report.filter((report) => {
            return report.type === type;
        }).map((report) => new ReportResponseDto(report));
    }

    /** Método para buscar por Id */
    getReportById(id: string, type: ReportType): ReportResponseDto {
        const report = data.report
            .filter((report) => report.type === type)
            .find((report) => report.id === id);

            if (!report) return;

        return new ReportResponseDto(report);
    }

    /** Método para criar */
    createReport(type: ReportType, { amount, source }: Report): ReportResponseDto {
        const newReport = {
            id: uuid(),
            amount,
            source,
            created_at: new Date(),
            updated_at: new Date(),
            type,
        };

        data.report.push(newReport);

        return new ReportResponseDto(newReport);
    }

    /** Método para atualizar */
    updateReport(type: ReportType, id: string, body: UpdateReport): ReportResponseDto {
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

        return new ReportResponseDto(data.report[reportIndex]);
    }

    /** Método para excluir */
    deleteReport(id: string) {
        const reportIndex = data.report.findIndex((report) => report.id === id);

        if (reportIndex === -1) return;

        data.report.splice(reportIndex, 1);
    }
}
