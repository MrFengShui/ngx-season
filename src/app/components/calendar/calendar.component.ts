import { coerceBooleanProperty, coerceNumberProperty } from "@angular/cdk/coercion";
import { Component, OnChanges, AfterViewInit, Input, ElementRef, Renderer2, SimpleChanges, EventEmitter, Output } from "@angular/core";
import { I18n, Lunar, Solar } from "lunar-typescript";

import moment from "moment";

import { LUNAR_ZHS_CONFIG, LUNAR_ZHT_CONFIG } from "./calendar-config.utils";
import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";

export type NGXSeasonCalendarLocaleName = 'en' | 'es' | 'fr' | 'it' | 'jp' | 'kr' | 'zhs' | 'zht';
export type NGXSeasonCalendarLocalePair = { name: NGXSeasonCalendarLocaleName, config: moment.LocaleSpecification };
export type NGXSeasonCalendarDate = { solar: number, lunar: string, masked: boolean };
export type NGXSeasonCalendarSelectionModel = { year: number, month: number, date: number };

export const LOCALE_ZHS_CONFIG: moment.LocaleSpecification = {
    calendar: {
        sameDay: '[今天] LT',
        nextDay: '[明天] LT',
        nextWeek: '[下周]dd LT',
        lastDay: '[昨天] LT',
        lastWeek: '[上周]dd LT',
        sameElse: 'L'
    },
    invalidDate: '无效日期',
    longDateFormat: {
        LTS: 'HH:mm:ss',
        LT: 'hh:mm A',
        L: 'YYYY/MM/DD',
        LL: 'YYYY/MM/DD hh:mm A',
        LLL: 'YYYY年MMMDD日 ddd HH:mm:ss',
        LLLL: 'YYYY年MMMMDD日 dddd HH:mm:ss'
    },
    meridiemParse: /凌晨|早晨|上午|中午|下午|傍晚|午夜/,
    meridiem: hour => {
        if (hour >= 0 && hour < 5) return '凌晨';
        else if (hour >= 5 && hour < 7) return '早晨';
        else if (hour >= 7 && hour < 11) return '上午';
        else if (hour >= 11 && hour < 13) return '中午';
        else if (hour >= 13 && hour < 18) return '下午';
        else if (hour >= 18 && hour < 20) return '傍晚';
        else return '午夜';
    },
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthsShort: ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月'],
    relativeTime: {
        future: '%s内',
        past: '%s前',
        s: '一秒',
        ss: '%d秒',
        m: '一分钟',
        mm: '%d分钟',
        h: '一小时',
        hh: '%d小时',
        d: '天',
        dd: '%d天',
        w: '一周',
        ww: '%d周',
        M: '一个月',
        MM: '%d个月',
        y: '一年',
        yy: '%d年'
    },
    weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    weekdaysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    weekdaysMin: ['日', '一', '二', '三', '四', '五', '六']
};
export const LOCALE_ZHT_CONFIG: moment.LocaleSpecification = {
    calendar: {
        sameDay: '[今天] LT',
        nextDay: '[明天] LT',
        nextWeek: '[下週]dd LT',
        lastDay: '[昨天] LT',
        lastWeek: '[上週]dd LT',
        sameElse: 'L'
    },
    invalidDate: '無效日期',
    longDateFormat: {
        LTS: 'HH:mm:ss',
        LT: 'hh:mm A',
        L: 'YYYY/MM/DD',
        LL: 'YYYY/MM/DD hh:mm A',
        LLL: 'YYYY年MMMDD日 ddd HH:mm:ss',
        LLLL: 'YYYY年MMMMDD日 dddd HH:mm:ss'
    },
    meridiemParse: /凌晨|早晨|上午|中午|下午|傍晚|午夜/,
    meridiem: hour => {
        if (hour >= 0 && hour < 5) return '凌晨';
        else if (hour >= 5 && hour < 7) return '早晨';
        else if (hour >= 7 && hour < 11) return '上午';
        else if (hour >= 11 && hour < 13) return '中午';
        else if (hour >= 13 && hour < 18) return '下午';
        else if (hour >= 18 && hour < 20) return '傍晚';
        else return '午夜';
    },
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthsShort: ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月'],
    relativeTime: {
        future: '%s内',
        past: '%s前',
        s: '一秒鐘',
        ss: '%d秒鐘',
        m: '一分鐘',
        mm: '%d分鐘',
        h: '一小時',
        hh: '%d小時',
        d: '天',
        dd: '%d天',
        w: '一週',
        ww: '%d週',
        M: '一个月',
        MM: '%d个月',
        y: '一年',
        yy: '%d年'
    },
    weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    weekdaysShort: ['週日', '週一', '週二', '週三', '週四', '週五', '週六'],
    weekdaysMin: ['日', '一', '二', '三', '四', '五', '六']
};

I18n.setMessages('zhs', LUNAR_ZHS_CONFIG);
I18n.setMessages('zht', LUNAR_ZHT_CONFIG);

@Component({
    selector: 'ngx-sui-calendar',
    template: `
        <ngx-sui-calendar-control [ctrlColor]="color" [ctrlYear]="year" [ctrlMonth]="month" [ctrlLocaleMonths]="currentLocale?.months()" (ctrlSelectionChange)="listenControlSelectionChange($event)"></ngx-sui-calendar-control>
        <ngx-sui-calendar-content [ctntYear]="year" [ctntMonth]="month" [ctntShowLunar]="showLunar && localePair.name.includes('zh')" [ctntLabels]="currentLocale?.weekdaysMin()" [ctntList]="list" (ctntSelectionChange)="listenContentSelectionChange($event)"></ngx-sui-calendar-content>
    `
})
export class NGXSeasonCalendarComponent implements OnChanges, AfterViewInit {

    @Input('caleColor')
    set color(color: NGXSeasonColorPalette | undefined | null) {
        this._color = color || 'default';
    }

    get color(): NGXSeasonColorPalette {
        return this._color;
    }

    @Input('caleLocale')
    set localePair(localePair: NGXSeasonCalendarLocalePair | undefined | null) {
        this._localePair = localePair || { name: 'zhs', config: LOCALE_ZHS_CONFIG };
    }

    get localePair(): NGXSeasonCalendarLocalePair {
        return this._localePair;
    }

    @Input('caleShowLunar')
    set showLunar(showLunar: boolean | undefined | null) {
        this._showLunar = coerceBooleanProperty(showLunar);
    }

    get showLunar(): boolean {
        return this._showLunar;
    }

    private _color: NGXSeasonColorPalette = 'default';
    private _localePair: NGXSeasonCalendarLocalePair = { name: 'zhs', config: LOCALE_ZHS_CONFIG };
    private _showLunar: boolean = true;

    @Output('caleSelectionChange')
    selectionChange: EventEmitter<NGXSeasonCalendarSelectionModel> = new EventEmitter(true);

    protected currentLocale: moment.Locale | undefined;
    protected year: number = moment(Date.now()).year();
    protected month: number = moment(Date.now()).month();

    protected list: NGXSeasonCalendarDate[] = [];

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'color') this.changeCalendarColor(changes[name].currentValue as NGXSeasonColorPalette);

            if (name === 'localePair') this.changeCalendarLocale(changes[name].currentValue as NGXSeasonCalendarLocalePair);
        }
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'calendar');

        this.updateGridList(this.year, this.month);
        this.changeCalendarColor(this.color);
        this.changeCalendarLocale(this.localePair);
    }

    protected listenControlSelectionChange(model: NGXSeasonCalendarSelectionModel): void {
        this.selectionChange.emit(model);
        this.updateGridList(model.year, model.month);
    }

    protected listenContentSelectionChange(model: NGXSeasonCalendarSelectionModel): void {
        this.selectionChange.emit(model);
    }

    protected changeCalendarLocale(localePair: NGXSeasonCalendarLocalePair): void {
        this.currentLocale = moment.updateLocale(localePair.name, localePair.config);
        I18n.setLanguage(localePair.name);
    }

    protected changeCalendarColor(color: NGXSeasonColorPalette): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-calendar-color', color);
    }

    protected fetchFirstDateOfMonth(year: number, month: number): number {
        return Number.parseInt(moment(`${year}-${month + 1}`, 'YYYY-MM').startOf('month').format('d'));
    }

    protected fetchMaxDateOfMonth(year: number, month: number): number {
        return moment(`${year}-${month + 1}`, 'YYYY-MM').daysInMonth();
    }

    protected updateGridList(year: number, month: number): void {
        this.year = year;
        this.month = month;

        const offset: number = this.fetchFirstDateOfMonth(year, month);
        const count: number = this.fetchMaxDateOfMonth(year, month);
        const prevCount: number = this.fetchMaxDateOfMonth(year, month === 0 ? 11 : month - 1);
        let lunarDate: string, lunarJieQi: string | undefined, lunarFestivals: string[], cacheYear: number, cacheMonth: number;

        for (let i = 0, currIndex = 1, prevIndex = prevCount - offset + 1, nextIndex = 1; i < 42; i++) {
            if (i < offset) {
                cacheYear = month === 0 ? year - 1 : year;
                cacheMonth = month === 0 ? 11 : month - 1;
                lunarDate = this.fetchLunarDate(cacheYear, cacheMonth, prevIndex);
                lunarFestivals = this.fetchLunarFestivals(cacheYear, cacheMonth, prevIndex);
                lunarJieQi = this.fetchLunarJieQi(cacheYear, cacheMonth, prevIndex);
                this.list[i] = { ...this.list[i], lunar: lunarJieQi || lunarFestivals[0] || lunarDate, solar: prevIndex, masked: true };
                prevIndex += 1;
            } else if (i >= offset && i < offset + count) {
                lunarDate = this.fetchLunarDate(year, month, currIndex);
                lunarFestivals = this.fetchLunarFestivals(year, month, currIndex);
                lunarJieQi = this.fetchLunarJieQi(year, month, currIndex);
                this.list[i] = { ...this.list[i], lunar: lunarJieQi || lunarFestivals[0] || lunarDate, solar: currIndex, masked: false };
                currIndex += 1;
            } else {
                cacheYear = month === 11 ? year + 1 : year;
                cacheMonth = month === 11 ? 0 : month + 1;
                lunarDate = this.fetchLunarDate(cacheYear, cacheMonth, nextIndex);
                lunarFestivals = this.fetchLunarFestivals(cacheYear, cacheMonth, nextIndex);
                lunarJieQi = this.fetchLunarJieQi(cacheYear, cacheMonth, nextIndex);
                this.list[i] = { ...this.list[i], lunar: lunarJieQi || lunarFestivals[0] || lunarDate, solar: nextIndex, masked: true };
                nextIndex += 1;
            }
        }
    }

    private fetchLunarDate(year: number, month: number, date: number): string {
        const lunar: Lunar = Lunar.fromDate(new Date(year, month, date));
        const lunarDate: string = lunar.getDayInChinese();
        return lunarDate === '初一' ? `${lunar.getMonthInChinese()}月` : lunarDate;
    }

    private fetchLunarJieQi(year: number, month: number, date: number): string | undefined {
        const lunar: Lunar = Lunar.fromDate(new Date(year, month, date));
        const value: string = lunar.getJieQi();
        return value.length === 0 ? undefined : value;
    }

    private fetchLunarFestivals(year: number, month: number, date: number): string[] {
        const lunar: Lunar = Lunar.fromDate(new Date(year, month, date));
        return lunar.getFestivals();
    }

}

