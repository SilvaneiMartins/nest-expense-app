export enum ReportType {
    EXPENSE = 'expense',
    INCOME = 'income'
}

export const data: DataProps = {
    report: [
        {
            id: 'uuid1',
            source: 'Salary',
            amount: 7500,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.INCOME,
        },
        {
            id: 'uuid2',
            source: 'YouTube',
            amount: 2500,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.INCOME,
        },
        {
            id: 'uuid3',
            source: 'SuperMarket',
            amount: 500,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.EXPENSE,
        }
    ]
}

interface DataProps {
    report: {
        id: string,
        source: string,
        amount: number,
        created_at: Date,
        updated_at: Date,
        type: ReportType,
    }[]
}
