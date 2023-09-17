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

import {
    CreateReportDto,
    UpdateReportDto,
    ReportResponseDto,
} from '../dtos/report.dto';
import { ReportType } from "../data";
import { ReportService } from "./report.service";

@Controller('report/:type')
export class ReportController {
    constructor(
        private readonly reportService: ReportService,
    ) { }

    @Get()
    getAllReports(@Param('type', new ParseEnumPipe(ReportType)) type: string): ReportResponseDto[] {
        const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
        return this.reportService.getAllReports(reportType)
    }

    @Get(':id')
    getReportById(
        @Param('id', ParseUUIDPipe) id: string,
        @Param('type', new ParseEnumPipe(ReportType)) type: string,
    ): ReportResponseDto {
        const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
        return this.reportService.getReportById(id, reportType)
    }

    @Post()
    createReport(
        @Body() { amount, source }: CreateReportDto,
        @Param('type', new ParseEnumPipe(ReportType)) type: string
    ): ReportResponseDto {
        const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
        return this.reportService.createReport(reportType, { amount, source })
    }

    @Put(':id')
    updateReport(
        @Body() body: UpdateReportDto,
        @Param('id', ParseUUIDPipe) id: string,
        @Param('type', new ParseEnumPipe(ReportType)) type: string,
    ): ReportResponseDto {
        const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
        return this.reportService.updateReport(reportType, id, body)
    }

    @HttpCode(204)
    @Delete(':id')
    deleteReport(@Param('id', ParseUUIDPipe) id: string) {
        return this.reportService.deleteReport(id)
    }
}
