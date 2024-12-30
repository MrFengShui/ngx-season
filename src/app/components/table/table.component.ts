
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { AfterViewInit, Component, ElementRef, InjectionToken, Input, NgZone, OnChanges, OnDestroy, Renderer2, SimpleChanges, ViewChild } from "@angular/core";

import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";
import { NGXSeasonGeneralType } from "src/app/utils/type.utils";
import { NGXSeasonTableDataSource } from 'src/app/components/table/table.utils';

import { NGXSeasonScrollbarMetainfo } from './../effects/scrollbar.directive';
import { debounceTime, Subject, Subscription } from 'rxjs';

export const NGX_SEASON_TABLE_TOKEN: InjectionToken<NGXSeasonTableComponent> = new InjectionToken('NGX_SEASON_TABLE_TOKEN');

export type NGXSeasonTableColumnSize = 'stretch' | 'shrink';
export type NGXSeasonTableCellAlignment = 'left' | 'center' | 'right';
export type NGXSeasonTableCaptionPosition = 'top' | 'bottom';
export type NGXSeasonTableObjectType = { [key: NGXSeasonGeneralType]: any };

@Component({
    selector: 'ngx-sui-table',
    template: `
        <label ngx-sui-Search [searchColor]="color" [searchPlaceholder]="searchPlaceholder" [searchShowBtn]="showSearchBtn" [searchBtnLabel]="searchBtnLabel" (searchTextChange)="inputChange$.next($event)" *ngIf="showFilter"></label>
        <div cdkScrollable ngx-sui-Scrollbar [sbAxis]="showRows === 0 ? 'none-axis' : 'xy-axis'" (sbScrollChange)="listenScrollMetainfoChange($event)" #scrollBox>
            <table class="table" [attr.data-table-color]="color">
                <thead class="table-header" #thead><ng-content select="[ngx-sui-THeadRow], [ngx-sui-THeadRowDef]"></ng-content></thead>
                <tbody class="table-content"><ng-content select="[ngx-sui-TBodyRow], [ngx-sui-TBodyRowDef]"></ng-content></tbody>
                <tfoot class="table-footer" #tfoot><ng-content select="[ngx-sui-TFootRow], [ngx-sui-TFootRowDef]"></ng-content></tfoot>
                <ng-content select="[ngx-sui-TableCaption]"></ng-content>
            </table>
        </div>
        <ngx-sui-paginator [pageColor]="color" [pageShowHeadRearBtn]="showPageHRBtn" [pageShowPrevNextBtn]="showPagePNBtn" [pageTotal]="dataSrc?.data?.length" (pageEvent)="dataSrc?.paginate($event.currPageIndex, $event.pageSize, $event.totalCount)" *ngIf="showRows === 0"></ngx-sui-paginator>
    `,
    providers: [{ provide: NGX_SEASON_TABLE_TOKEN, useExisting: NGXSeasonTableComponent }]
})
export class NGXSeasonTableComponent<T = any> implements OnChanges, OnDestroy, AfterViewInit {

    @Input({ alias: 'tbColor' })
    set color(color: NGXSeasonColorPalette | undefined | null) {
        this._color = color || 'default';
    }

    get color(): NGXSeasonColorPalette {
        return this._color;
    }

    @Input({ alias: 'tbDataSrc', required: true })
    set dataSrc(dataSrc: NGXSeasonTableDataSource<T> | undefined | null) {
        this._dataSrc = dataSrc || undefined;
    }

    get dataSrc(): NGXSeasonTableDataSource<T> | undefined {
        return this._dataSrc;
    }

    @Input({ alias: 'tbSearchPlaceholder' })
    set searchPlaceholder(searchPlaceholder: string | undefined | null) {
        this._searchPlaceholder = searchPlaceholder || undefined;
    }

    get searchPlaceholder(): string | undefined {
        return this._searchPlaceholder;
    }

    @Input({ alias: 'tbSearchBtnLabel' })
    set searchBtnLabel(searchBtnLabel: string | undefined | null) {
        this._searchBtnLabel = searchBtnLabel || undefined;
    }

    get searchBtnLabel(): string | undefined {
        return this._searchBtnLabel;
    }

    @Input({ alias: 'tbSearchShowBtn' })
    set showSearchBtn(showSearchBtn: boolean | string | undefined | null) {
        this._showSearchBtn = coerceBooleanProperty(showSearchBtn);
    }

    get showSearchBtn(): boolean {
        return this._showSearchBtn;
    }

    @Input({ alias: 'tbShowPageHRBtn' })
    set showPageHRBtn(showPageHRBtn: boolean | string | undefined | null) {
        this._showPageHRBtn = coerceBooleanProperty(showPageHRBtn);
    }

    get showPageHRBtn(): boolean {
        return this._showPageHRBtn;
    }

    @Input({ alias: 'tbShowPagePNBtn' })
    set showPagePNBtn(showPagePNBtn: boolean | string | undefined | null) {
        this._showPagePNBtn = coerceBooleanProperty(showPagePNBtn);
    }

    get showPagePNBtn(): boolean {
        return this._showPagePNBtn;
    }

    @Input({ alias: 'tbShowFilter' })
    set showFilter(showFilter: boolean | string | undefined | null) {
        this._showFilter = coerceBooleanProperty(showFilter);
    }

    get showFilter(): boolean {
        return this._showFilter;
    }

    @Input({ alias: 'tbShowRows' })
    set showRows(showRows: number | string | undefined | null) {
        this._showRows = coerceNumberProperty(showRows);
    }

    get showRows(): number {
        return this._showRows;
    }

    @Input({ alias: 'tbHeaderSticky' })
    set theadSticky(theadSticky: boolean | string | undefined | null) {
        this._theadSticky = coerceBooleanProperty(theadSticky);
    }

    get theadSticky(): boolean {
        return this._theadSticky;
    }

    @Input({ alias: 'tbFooterSticky' })
    set tfootSticky(tfootSticky: boolean | string | undefined | null) {
        this._tfootSticky = coerceBooleanProperty(tfootSticky);
    }

    get tfootSticky(): boolean {
        return this._tfootSticky;
    }

    private _color: NGXSeasonColorPalette = 'default';
    private _dataSrc: NGXSeasonTableDataSource<T> | undefined;
    private _searchPlaceholder: string | undefined;
    private _searchBtnLabel: string | undefined;
    private _showSearchBtn: boolean = false;
    private _showPageHRBtn: boolean = true;
    private _showPagePNBtn: boolean = true;
    private _showFilter: boolean = false;
    private _showRows: number = 0;
    private _theadSticky: boolean = false;
    private _tfootSticky: boolean = false;

    @ViewChild('scrollBox', { read: ElementRef, static: true })
    protected scrollBox: ElementRef<HTMLElement> | undefined;

    @ViewChild('thead', { read: ElementRef, static: true })
    protected thead: ElementRef<HTMLElement> | undefined;

    @ViewChild('tfoot', { read: ElementRef, static: true })
    protected tfoot: ElementRef<HTMLElement> | undefined;

    protected inputChange$: Subject<string> = new Subject();

    private input$: Subscription = Subscription.EMPTY;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _ngZone: NgZone
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'theadSticky') this.setupTableHeaderSticky(coerceBooleanProperty(changes[name].currentValue));

            if (name === 'tfootSticky') this.setupTableFooterSticky(coerceBooleanProperty(changes[name].currentValue));

            if (name === 'showRows') this.setupScrollBoxSize(coerceNumberProperty(changes[name].currentValue));
        }
    }

    ngOnDestroy(): void {
        this.input$.unsubscribe();
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'table-container');

        this.setupTableHeaderSticky(this.theadSticky);
        this.setupTableFooterSticky(this.tfootSticky);
        this.setupScrollBoxSize(this.showRows);
        this.listenTableFilterInputChange();
    }

    protected setupTableHeaderSticky(sticky: boolean): void {
        const element = this.thead?.nativeElement;

        if (sticky) this._renderer.addClass(element, 'header-sticky');
        else this._renderer.removeClass(element, 'header-sticky');
    }

    protected setupTableFooterSticky(sticky: boolean): void {
        const element = this.tfoot?.nativeElement;

        if (sticky) this._renderer.addClass(element, 'footer-sticky');
        else this._renderer.removeClass(element, 'footer-sticky');
    }

    protected listenScrollMetainfoChange(change: NGXSeasonScrollbarMetainfo): void {
        console.debug(change);
    }

    protected setupScrollBoxSize(rows: number): void {
        const element = this.scrollBox?.nativeElement;

        if (rows === 0) {
            this._renderer.setStyle(element, 'height', 'fit-content');
        } else {
            const theadSize: number = coerceNumberProperty(this.thead?.nativeElement.offsetHeight);
            const tfootSize: number = coerceNumberProperty(this.tfoot?.nativeElement.offsetHeight);
            this._renderer.setStyle(element, 'height', `calc(${rows} * var(--table-tbody-row-height) + ${theadSize}px + ${tfootSize}px)`);
        }
    }

    private listenTableFilterInputChange(): void {
        this._ngZone.runOutsideAngular(() =>
            this.input$ = this.inputChange$.asObservable().pipe(debounceTime(250))
                .subscribe(value => this.dataSrc?.filter(value)));
    }

}
