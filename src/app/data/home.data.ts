import { NoticeEntity, NoticeUnitEntity } from "../models/notice.model";
import { ReportEntity } from "../models/report.model";

const create = (text: string, count: number): NoticeUnitEntity[] => {
    let list: NoticeUnitEntity[] = [];

    for (let i = 0; i < count; i++) {
        list.push({
            title: text + ' Title ' + (i + 1),
            brand: text + ' Brand ' + (i + 1),
            span: 3600 * (i + 1)
        });
    }

    return list;
}

export const createNoticeData = (count: number): NoticeEntity => {
    return new NoticeEntity(
        create('Audio', count),
        create('Video', count),
        create('Article', count),
        create('Blog', count),
        create('Gallery', count)
    );
}

export const REPORT_TABLE_COLUMN_KEY: string[] = ['reportID', 'reportSubject', 'reportDescription', 'reportCreateTime'];
export const REPORT_TABLE_COLUMN_VALUE: string[] = ['Report ID', 'Report Subject', 'Report Description', 'Report Created Time'];

export const createReportData = (count: number): ReportEntity[] => {
    let list: ReportEntity[] = [];

    for (let i = 0; i < count; i++) {
        list.push({
            reportID: 'Report ID ' + (i + 1),
            reportSubject: 'Report Subject ' + (i + 1),
            reportDescription: 'Report Description ' + (i + 1),
            reportCreateTime: new Date()
        });
    }

    return list;
}