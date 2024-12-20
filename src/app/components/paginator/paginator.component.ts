import { coerceBooleanProperty, coerceNumberProperty } from "@angular/cdk/coercion";
import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, InjectionToken, Input, OnChanges, Output, Renderer2, SimpleChanges } from "@angular/core";

import { NGXSeasonColorPalette } from "src/app/utils/_palette.utils";

export const NGX_SEASON_PAGINATOR_LOCALIZATION_TOKEN: InjectionToken<NGXSeasonPaginatorLocalization> = new InjectionToken('NGX_SEASON_PAGINATOR_LOCALIZATION_TOKEN');

export type NGXSeasonPaginatorPageEvent = { totalCount: number, prevPageIndex: number, currPageIndex: number, pageSize: number, pageCount: number };
export type NGXSeasonPaginatorLocalization = { pageSize: string, metainfo: string };

@Component({
    selector: 'ngx-sui-paginator',
    template: `
        <span class="label">{{ formatPaginatorLocalization(_localization.pageSize, pageEvent) }}</span>
        <label ngx-sui-Select [selectedColor]="color" [(selectedValue)]="pageSize" (selectedValueChange)="listenPageSizeOptionChange($event)">
            <a ngx-sui-SelectOption [optValue]="option" *ngFor="let option of sizeOptions">{{ option }}</a>
        </label>
        <span class="flex-auto"></span>
        <span class="label">{{ formatPaginatorLocalization(_localization.metainfo, pageEvent) }}</span>
        <button ngx-sui-IconButton btnCircled [btnColor]="color" [btnDisabled]="pageEvent.pageCount === 0 || pageEvent.currPageIndex === 0" btnIcon="step" btnIconDegree="-180" btnStyle="flat" (click)="handleFirstLastPageEvent('head')" *ngIf="showHeadRearBtn"></button>
        <button ngx-sui-IconButton btnCircled [btnColor]="color" [btnDisabled]="pageEvent.pageCount === 0 || pageEvent.currPageIndex === 0" btnIcon="angle" btnIconDegree="-90" btnStyle="flat" (click)="handlePreviousNextPageEvent('dec')" *ngIf="showPrevNextBtn"></button>
        <button ngx-sui-IconButton btnCircled [btnColor]="color" [btnDisabled]="pageEvent.pageCount === 0 || pageEvent.currPageIndex === pageEvent.pageCount - 1" btnIcon="angle" btnIconDegree="90" btnStyle="flat" (click)="handlePreviousNextPageEvent('inc')" *ngIf="showPrevNextBtn"></button>
        <button ngx-sui-IconButton btnCircled [btnColor]="color" [btnDisabled]="pageEvent.pageCount === 0 || pageEvent.currPageIndex === pageEvent.pageCount - 1" btnIcon="step" btnIconDegree="0" btnStyle="flat" (click)="handleFirstLastPageEvent('rear')" *ngIf="showHeadRearBtn"></button>
    `
})
export class NGXSeasonPaginatorComponent implements OnChanges, AfterViewInit {

    @Input({ alias: 'pageColor' })
    set color(color: NGXSeasonColorPalette | undefined | null) {
        this._color = color || 'default';
    }

    get color(): NGXSeasonColorPalette {
        return this._color;
    }

    @Input({ alias: 'pageIndex' })
    set index(index: number | string | undefined | null) {
        this._index = coerceNumberProperty(index);
    }

    get index(): number {
        return this._index;
    }

    @Input({ alias: 'pageShowHeadRearBtn' })
    set showHeadRearBtn(showHeadRearBtn: boolean | string | undefined | null) {
        this._showHeadRearBtn = coerceBooleanProperty(showHeadRearBtn);
    }

    get showHeadRearBtn(): boolean {
        return this._showHeadRearBtn;
    }

    @Input({ alias: 'pageShowPrevNextBtn' })
    set showPrevNextBtn(showPrevNextBtn: boolean | string | undefined | null) {
        this._showPrevNextBtn = coerceBooleanProperty(showPrevNextBtn);
    }

    get showPrevNextBtn(): boolean {
        return this._showPrevNextBtn;
    }

    @Input({ alias: 'pageSize' })
    set pageSize(pageSize: number | string | undefined | null) {
        this._size = coerceNumberProperty(pageSize);
    }

    get pageSize(): number {
        return this._size;
    }

    @Input({ alias: 'pageSizeOptions' })
    set sizeOptions(sizeOptions: number[] | undefined | null) {
        this._sizeOptions = sizeOptions || [5, 10, 20, 25, 50, 100];
    }

    get sizeOptions(): number[] {
        return this._sizeOptions;
    }

    @Input({ alias: 'pageTotal' })
    set total(total: number | string | undefined | null) {
        this._total = coerceNumberProperty(total);
    }

    get total(): number {
        return this._total;
    }

    private _color: NGXSeasonColorPalette = 'default';
    private _index: number = 0;
    private _showHeadRearBtn: boolean = true;
    private _showPrevNextBtn: boolean = true;
    private _size: number = 5;
    private _sizeOptions: number[] = [5, 10, 20, 25, 50, 100];
    private _total: number = 0;

    @Output('pageEvent')
    pageEvent$: EventEmitter<NGXSeasonPaginatorPageEvent> = new EventEmitter(true);

    protected pageEvent: NGXSeasonPaginatorPageEvent = { totalCount: this.total, prevPageIndex: -1, currPageIndex: this.index, pageSize: this.pageSize, pageCount: -1 };

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,

        @Inject(NGX_SEASON_PAGINATOR_LOCALIZATION_TOKEN)
        protected _localization: NGXSeasonPaginatorLocalization
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'color') this.changePaginatorColor(changes[name].currentValue as NGXSeasonColorPalette);

            if (name === 'total') {
                this.pageEvent.totalCount = coerceNumberProperty(changes[name].currentValue);
                this.pageEvent.pageCount = Math.ceil(this.pageEvent.totalCount / this.pageEvent.pageSize);
            }
        }
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'paginator');

        this.changePaginatorColor(this.color);

        this.pageEvent.pageCount = Math.ceil(this.pageEvent.totalCount / this.pageEvent.pageSize);

        this.pageEvent$.emit(this.pageEvent);
    }

    protected changePaginatorColor(color: NGXSeasonColorPalette): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-paginator-color', color);
    }

    protected listenPageSizeOptionChange(value: number): void {
        if (this.pageEvent.pageCount > 0) {
            this.pageEvent.currPageIndex = 0;
            this.pageEvent.prevPageIndex = -1;
            this.pageEvent.pageSize = value;
            this.pageEvent.pageCount = Math.ceil(this.total / value);
            this.pageEvent$.emit(this.pageEvent);
        }
    }

    protected handlePreviousNextPageEvent(flag: 'inc' | 'dec'): void {
        if (this.pageEvent.pageCount > 0) {
            const page: number = this.pageEvent.currPageIndex;
            this.pageEvent.prevPageIndex = page;

            if (flag === 'inc') this.pageEvent.currPageIndex = Math.min(page + 1, this.pageEvent.pageCount - 1);

            if (flag === 'dec') this.pageEvent.currPageIndex = Math.max(page - 1, 0);

            this.pageEvent$.emit(this.pageEvent);
        }
    }

    protected handleFirstLastPageEvent(flag: 'head' | 'rear'): void {
        if (this.pageEvent.pageCount > 0) {
            const page: number = this.pageEvent.currPageIndex;
            this.pageEvent.prevPageIndex = page;

            if (flag === 'head') this.pageEvent.currPageIndex = 0;

            if (flag === 'rear') this.pageEvent.currPageIndex = this.pageEvent.pageCount - 1;

            this.pageEvent$.emit(this.pageEvent);
        }
    }

    protected formatPaginatorLocalization(value: string, event: NGXSeasonPaginatorPageEvent): string {
        const startRow: number = event.currPageIndex * event.pageSize, finalRow: number = Math.min(startRow + event.pageSize - 1, event.totalCount - 1);
        return value
            .replace('${pageIndex}', event.totalCount === 0 ? '0' : `${event.currPageIndex + 1}`)
            .replace('${pageCount}', event.totalCount === 0 ? '0' : `${event.pageCount}`)
            .replace('${startRow}', event.totalCount === 0 ? '0' : `${startRow + 1}`)
            .replace('${finalRow}', event.totalCount === 0 ? '0' : `${finalRow + 1}`);
    }

}
