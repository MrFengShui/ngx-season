import {Component, ContentChild, Directive, HostBinding, Input, OnInit, TemplateRef} from "@angular/core";
import {ArrayDataSource, DataSource} from "@angular/cdk/collections";
import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {OctopusColorPalette} from "../global/enums.utils";

export type OctopusTableColumn = {align?: 'left' | 'center' | 'right', label: string, props: string};

@Directive({
    selector: '[octo-table-foot]'
})
export class OctopusTableFoot {

    constructor(public _template: TemplateRef<any>) {
    }

}

@Component({
    selector: 'octo-table',
    template: `
        <table cdk-table [dataSource]="source" class="octo-table-{{color}}"
               [class.octo-table-striped]="striped">
            <ng-container [cdkColumnDef]="column.props" *ngFor="let column of columns; first as isFirst">
                <th cdk-header-cell *cdkHeaderCellDef class="octo-table-header-cell" [style.text-align]="column.align"
                    [style.border-width]="renderColRowGrid(colGrid, rowGrid)">
                    {{column.label}}
                </th>
                <td cdk-cell *cdkCellDef="let element" class="octo-table-cell" [style.text-align]="column.align"
                    [style.border-width]="renderColRowGrid(colGrid, rowGrid)">
                    {{element[column.props]}}
                </td>
                <td cdk-footer-cell *cdkFooterCellDef class="octo-table-footer-cell" [attr.colspan]="columns.length"
                    [class.d-none]="!isFirst"><ng-container [ngTemplateOutlet]="foot._template"></ng-container></td>
            </ng-container>

            <tr cdk-header-row *cdkHeaderRowDef="headerColumns; sticky: headSticky" class="octo-table-header-row"></tr>
            <tr cdk-row *cdkRowDef="let row; columns: headerColumns;" class="octo-table-row"></tr>
            <tr cdk-footer-row *cdkFooterRowDef="footerColumns; sticky: footSticky" class="octo-table-footer-row"></tr>
        </table>
        <ng-template><ng-content></ng-content></ng-template>
    `
})
export class OctopusTable<T> implements OnInit {

    @Input('octoColor') color: OctopusColorPalette = 'base';
    @Input('octoColumns') columns: OctopusTableColumn[] = [];
    @Input('octoData') data: T[] = [];

    @Input('octoStriped')
    get striped() { return this._striped; }
    set striped(_striped: any) { this._striped = coerceBooleanProperty(_striped); }
    private _striped: boolean = false;

    @Input('octoHeadSticky')
    get headSticky() { return this._headSticky; }
    set headSticky(_headSticky: any) { this._headSticky = coerceBooleanProperty(_headSticky); }
    private _headSticky: boolean = false;

    @Input('octoFootSticky')
    get footSticky() { return this._footSticky; }
    set footSticky(_footSticky: any) { this._footSticky = coerceBooleanProperty(_footSticky); }
    private _footSticky: boolean = false;

    @Input('octoColGrid')
    get colGrid() { return this._colGrid; }
    set colGrid(_colGrid: any) { this._colGrid = coerceBooleanProperty(_colGrid); }
    private _colGrid: boolean = false;

    @Input('octoRowGrid')
    get rowGrid() { return this._rowGrid; }
    set rowGrid(_rowGrid: any) { this._rowGrid = coerceBooleanProperty(_rowGrid); }
    private _rowGrid: boolean = false;

    @ContentChild(OctopusTableFoot) foot!: OctopusTableFoot;

    @HostBinding('class') class: string = 'octo-table';

    source!: DataSource<T>;
    headerColumns!: string[];
    footerColumns!: string[];

    ngOnInit() {
        this.source = new ArrayDataSource<T>(this.data);
        this.headerColumns = Array.from(this.columns).map<string>(item => item.props);
        this.footerColumns = this.headerColumns.slice(0, 1);
        this.columns = this.columns.map(item => item.align ? ({...item}) : ({...item, align: 'left'}));
    }

    renderColRowGrid(colGrid: boolean, rowGrid: boolean): string {
        return `0 ${colGrid ? '1px' : 0} ${rowGrid ? '1px' : 0} 0`;
    }

}
