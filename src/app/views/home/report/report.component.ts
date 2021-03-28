import { trigger, state, style, transition, animate } from "@angular/animations";
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

import { REPORT_TABLE_COLUMN_KEY, REPORT_TABLE_COLUMN_VALUE, createReportData } from "src/app/data/home.data";

import { ReportEntity } from "src/app/models/report.model";
import { WidgetsAlertComponent } from "src/app/widgets/alert/alert.component";

@Component({
    selector: 'app-home-report',
    templateUrl: './report.component.html',
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class ReportComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild('chooser', { read: ElementRef, static: true }) chooser!: ElementRef<HTMLInputElement>

    tableColumns!: string[];
    tableHeaders!: string[];
    columnSizes!: string[];
    dataSource!: MatTableDataSource<ReportEntity>;
    expandedElement!: ReportEntity;

    attachList!: Array<string | ArrayBuffer | null | undefined>;
    filterValue!: string;

    constructor(private snack: MatSnackBar) { }

    ngOnInit() {
        this.attachList = [];
        this.tableColumns = REPORT_TABLE_COLUMN_KEY;
        this.tableHeaders = REPORT_TABLE_COLUMN_VALUE;
        this.columnSizes = ['w-15', 'w-25', '', 'w-15'];
        this.dataSource = new MatTableDataSource(Array.from(createReportData(100)));
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    ngOnDestroy() {
        this.dataSource.data.length = 0;
    }

    listenFileUploadChange(): void {
        let files: FileList | null = this.chooser.nativeElement.files || null;

        if (files !== null && files.length <= 4 && this.attachList.length <= 3) {
            for (let i = 0; i < files.length; i++) {
                let reader: FileReader = new FileReader();
                reader.onload = (data) => this.attachList.push(data.target?.result);
                reader.readAsDataURL(files[i]);
            }
        } else {
            this.snack.openFromComponent(WidgetsAlertComponent, {
                duration: 5000,
                data: {
                    status: 'warning',
                    message: 'No more than four images are permitted to select.'
                },
                panelClass: ['popup-alert']
            });
        }
    }

    handleFilterEvent(event: KeyboardEvent): void {
        this.dataSource.filter = this.filterValue.trim();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

}