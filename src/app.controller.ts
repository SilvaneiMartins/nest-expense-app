import {
    Get,
    Put,
    Post,
    Body,
    Param,
    Delete,
    HttpCode,
    Controller,
    ParseUUIDPipe,
    ParseEnumPipe,
} from "@nestjs/common";

import { ReportType } from "./data";
import { AppService } from "./app.service";
import { CreateReportDto, UpdateReportDto } from './dtos/report.dto';

@Controller('report/:type')
export class AppController {
    constructor(
        private readonly appService: AppService,
    ) { }

    @Get()
    getAllReports(@Param('type', new ParseEnumPipe(ReportType)) type: string) {
        const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
        return this.appService.getAllReports(reportType)
    }

    @Get(':id')
    getReportById(
        @Param('id', ParseUUIDPipe) id: string,
        @Param('type', new ParseEnumPipe(ReportType)) type: string,
    ) {
        const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
        return this.appService.getReportById(id, reportType)
    }

    @Post()
    createReport(
        @Body() { amount, source }: CreateReportDto,
        @Param('type', new ParseEnumPipe(ReportType)) type: string
    ) {
        const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
        return this.appService.createReport(reportType, { amount, source })
    }

    @Put(':id')
    updateReport(
        @Body() body: UpdateReportDto,
        @Param('id', ParseUUIDPipe) id: string,
        @Param('type', new ParseEnumPipe(ReportType)) type: string,
    ) {
        const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
        return this.appService.updateReport(reportType, id, body)
    }

    @HttpCode(204)
    @Delete(':id')
    deleteReport(@Param('id', ParseUUIDPipe) id: string) {
        return this.appService.deleteReport(id)
    }
}
