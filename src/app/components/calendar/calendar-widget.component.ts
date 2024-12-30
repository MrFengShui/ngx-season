import { coerceBooleanProperty, coerceStringArray } from "@angular/cdk/coercion";
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChanges } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Lunar } from "lunar-typescript";

import moment from "moment";

import { LOCALE_ZHS_CONFIG, NGXSeasonCalendarDate, NGXSeasonCalendarSelectionModel } from "./calendar.component";

import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";

@Component({
    selector: 'ngx-sui-calendar-control',
    template: `
        <button ngx-sui-IconButton [btnColor]="color" btnIcon="minus" btnStyle="solid" (click)="yearDecrement()"></button>
        <span class="text">{{ year }}</span>
        <button ngx-sui-IconButton [btnColor]="color" btnIcon="plus" btnStyle="solid" (click)="yearIncrement()"></button>
        <button ngx-sui-IconButton [btnColor]="color" btnIcon="minus" btnStyle="solid" (click)="monthDecrement()"></button>
        <span class="text">{{ month$.asObservable() | async }}</span>
        <button ngx-sui-IconButton [btnColor]="color" btnIcon="plus" btnStyle="solid" (click)="monthIncrement()"></button>
        <button ngx-sui-IconButton [btnColor]="color" btnIcon="target" btnCircled="true" btnStyle="solid" (click)="today()"></button>
    `
})
export class NGXSeasonCalendarControlComponent implements OnChanges, AfterViewInit {

    @Input('ctrlColor')
    set color(color: NGXSeasonColorPalette | undefined | null) {
        this._color = color || undefined;
    }

    get color(): NGXSeasonColorPalette | undefined {
        return this._color;
    }

    @Input('ctrlLocaleMonths')
    set localeMonths(localeMonths: string[] | undefined | null) {
        this._localeMonths = localeMonths || (LOCALE_ZHS_CONFIG.months as (string[] | undefined));
    }

    get localeMonths(): string[] | undefined {
        return this._localeMonths;
    }

    @Input('ctrlYear')
    set year(year: number | undefined | null) {
        this._year = year || 0;
    }

    get year(): number {
        return this._year;
    }

    @Input('ctrlMonth')
    set month(month: number | undefined | null) {
        this._month = month || 0;
    }

    get month(): number {
        return this._month;
    }

    private _color: NGXSeasonColorPalette | undefined;
    private _localeMonths: string[] | undefined = LOCALE_ZHS_CONFIG.months as (string[] | undefined);
    private _year: number = 0;
    private _month: number = 0;

    @Output('ctrlSelectionChange')
    selectionChange: EventEmitter<NGXSeasonCalendarSelectionModel> = new EventEmitter(true);

    protected month$: Subject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);

    private date: number = 0;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'localeMonths') this.setupControlMonth(coerceStringArray(changes[name].currentValue), this.month);

            if (name === 'month') this.setupControlMonth(this.localeMonths, changes[name].currentValue);
        }
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'control');

        this.setupControlMonth(this.localeMonths, this.month);
    }

    protected setupControlMonth(months: string[] | undefined, month: number): void {
        if (months === undefined) throw new Error();

        this.month$.next(months[month]);
    }

    protected today(): void {
        const datetime = moment(Date.now());
        this.year = datetime.year();
        this.month = datetime.month();
        this.date = datetime.date();
        this.selectionChange.emit({ year: this.year, month: this.month, date: this.date });

        this.setupControlMonth(this.localeMonths, this.month);
    }

    protected yearIncrement(): void {
        this.year += 1;

        this.selectionChange.emit({ year: this.year, month: this.month, date: this.date });
    }

    protected yearDecrement(): void {
        this.year -= 1;

        this.selectionChange.emit({ year: this.year, month: this.month, date: this.date });
    }

    protected monthIncrement(): void {
        this.month += 1;

        if (this.month === 12) {
            this.month = 0;
            this.year += 1;
        }

        this.setupControlMonth(this.localeMonths, this.month);
        this.selectionChange.emit({ year: this.year, month: this.month, date: this.date });
    }

    protected monthDecrement(): void {
        this.month -= 1;

        if (this.month === -1) {
            this.month = 11;
            this.year -= 1;
        }

        this.setupControlMonth(this.localeMonths, this.month);
        this.selectionChange.emit({ year: this.year, month: this.month, date: this.date });
    }

}

@Component({
    selector: 'ngx-sui-calendar-content',
    template: `
        <span class="label" *ngFor="let label of labels">{{ label }}</span>
        <button class="date" [disabled]="item.masked" [class.mask]="item.masked" [class.mark]="isToday(year, month, item.solar) && !item.masked" (click)="selectionChange.emit({ year, month, date: item.solar })" *ngFor="let item of list">
            <span class="solar">{{ item.solar }}</span>
            <span class="lunar" *ngIf="showLunar">{{ item.lunar }}</span>
        </button>
    `
})
export class NGXSeasonCalendarContentComponent implements AfterViewInit {

    @Input('ctntLabels')
    set labels(labels: string[] | undefined | null) {
        this._labels = labels || undefined;
    }

    get labels(): string[] | undefined {
        return this._labels;
    }

    @Input('ctntList')
    set list(list: NGXSeasonCalendarDate[] | undefined | null) {
        this._list = list || undefined;
    }

    get list(): NGXSeasonCalendarDate[] | undefined {
        return this._list;
    }

    @Input('ctntShowLunar')
    set showLunar(showLunar: boolean | undefined | null) {
        this._showLunar = coerceBooleanProperty(showLunar);
    }

    get showLunar(): boolean {
        return this._showLunar;
    }

    @Input('ctntYear')
    set year(year: number | undefined | null) {
        this._year = year || 0;
    }

    get year(): number {
        return this._year;
    }

    @Input('ctntMonth')
    set month(month: number | undefined | null) {
        this._month = month || 0;
    }

    get month(): number {
        return this._month;
    }

    private _labels: string[] | undefined;
    private _list: NGXSeasonCalendarDate[] | undefined;
    private _showLunar: boolean = false;
    private _year: number = 0;
    private _month: number = 0;

    @Output('ctntSelectionChange')
    selectionChange: EventEmitter<NGXSeasonCalendarSelectionModel> = new EventEmitter(true);

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'content');
    }

    protected isToday(year: number, month: number, date: number): boolean {
        const datetime: moment.Moment = moment(Date.now());
        return datetime.year() === year && datetime.month() === month && datetime.date() === date;
    }

}

@Component({
    selector: 'ngx-sui-calendar-lunar-select',
    template: `
        <div class="select good">
            <span class="label">宜</span>
            <div class="align"><span class="tag" *ngFor="let item of goodSelects">{{ item }}</span></div>
        </div>
        <div class="select bad">
            <span class="label">忌</span>
            <div class="align"><span class="tag" *ngFor="let item of badSelects">{{ item }}</span></div>
        </div>
    `
})
export class NGXSeasonCalendarLunarSelectionComponent implements OnChanges, AfterViewInit {

    @Input('lsModel')
    set model(model: NGXSeasonCalendarSelectionModel | undefined | null) {
        this._model = model || undefined;
    }

    get model(): NGXSeasonCalendarSelectionModel | undefined {
        return this._model;
    }

    private _model: NGXSeasonCalendarSelectionModel | undefined;

    protected goodSelects: string[] = [];
    protected badSelects: string[] = [];

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'model') {
                const model: NGXSeasonCalendarSelectionModel = changes[name].currentValue as NGXSeasonCalendarSelectionModel;
                this.setupLunarSelection(model);
            }
        }
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'lunar-select');

        this.setupLunarSelection(this.model);
    }

    protected setupLunarSelection(model: NGXSeasonCalendarSelectionModel | undefined): void {
        const datetime = moment(Date.now());
        const year: number = model?.year || datetime.year(), month: number = model?.month || datetime.month(), date: number = model?.date || datetime.date();
        const lunar = Lunar.fromDate(new Date(year, month, date));

        if (this.goodSelects.length > 0) this.goodSelects.splice(0);

        if (this.badSelects.length > 0) this.badSelects.splice(0);

        this.goodSelects = this.goodSelects.concat(...lunar.getDayYi());
        this.badSelects = this.badSelects.concat(...lunar.getDayJi());
    }

}
