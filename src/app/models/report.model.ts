export class ReportEntity {

    reportID!: string;
    reportSubject!: string;
    reportDescription!: string;
    reportCreateTime!: Date;

    constructor(reportID: string, reportSubject: string, reportDescription: string, reportCreateTime: Date) {
        this.reportID = reportID;
        this.reportSubject = reportSubject;
        this.reportDescription = reportDescription;
        this.reportCreateTime = reportCreateTime;
    }

}