import {
    Get,
    Put,
    Post,
    Body,
    Param,
    Delete,
    HttpCode,
    Controller,
} from "@nestjs/common";
import { v4 as uuid } from "uuid";

import { ReportType, data } from "./data";
import { AppService } from "./app.service";

@Controller('report/:type')
export class AppController {
    constructor(
        private readonly appService: AppService,
    ) { }

    @Get()
    getAllReports(@Param('type') type: string) {
        const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
        return this.appService.getAllReports(reportType)
    }

    @Get(':id')
    getReportById(
        @Param('id') id: string,
        @Param('type') type: string,
    ) {
        const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
        return this.appService.getReportById(id, reportType)
    }

    @Post()
    createReport(
        @Body() { amount, source }: { amount: number, source: string },
        @Param('type') type: string
    ) {
        const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
        return this.appService.createReport(reportType, { amount, source })
    }

    @Put(':id')
    updateReport(
        @Param('type') type: string,
        @Param('id') id: string,
        @Body() body: { amount: number, source: string },
    ) {
        const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
        return this.appService.updateReport(reportType, id, body)
    }

    @HttpCode(204)
    @Delete(':id')
    deleteReport(
        @Param('id') id: string,
    ) {
        return this.appService.deleteReport(id)
    }
}
