import { Get, Controller } from "@nestjs/common";

@Controller()
export class AppController {

    @Get('report/income')
    getAllIncomeReports() {
        return []
    }


    @Get('/')
    getAllIncomeReports2() {
        return {}
    }
}
