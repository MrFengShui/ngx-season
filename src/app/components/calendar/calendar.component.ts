import { AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnInit, Pipe, PipeTransform, Renderer2, SimpleChanges } from "@angular/core";

import { ColorPalette } from "src/app/global/enum.utils";

@Pipe({
    name: 'zero'
})
export class ZeroTextPipe implements PipeTransform {

    transform(value: number, ...args: any[]): string | number {
        return value < 10 ? `0${value}` : value;
    }

}

@Component({
    selector: 'octopus-calendar',
    templateUrl: './calendar.component.html'
})
export class OctopusCalendar implements OnChanges, OnInit {

    @Input('color') color: ColorPalette = 'primary';
    @Input('date') date: Date = new Date(Date.now());

    @Input('dateChange') dateChange: EventEmitter<Date> = new EventEmitter();

    @HostBinding('class') class: string = 'octopus-calendar';

    prevList: number[] = [];
    currList: number[] = [];
    nextList: number[] = [];
    year: number = 0;
    month: number = 0
    today: number = 0;

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.color !== undefined) {
            setTimeout(() => this.renderColor(changes.color.previousValue, changes.color.currentValue));
        }

        if (changes.date !== undefined) {
            setTimeout(() => this.renderDate(changes.date.currentValue));
        }
    }

    ngOnInit() {
        setTimeout(() => {
            this.renderColor(undefined, this.color);
            this.renderDate(this.date);
        });
    }

    handleYearActionEvent(flag: number): void {
        if (flag === -1 && this.year > 1900) {
            this.year -= 1;
        }

        if (flag === 1 && this.year < 2100) {
            this.year += 1;
        }

        this.buildCalendar(this.year, this.month);
    }

    handleMonthActionEvent(flag: number): void {
        if (flag === -1) {
            this.month = (this.month - 1) % 12;

            if (this.month === 0) {
                this.month = 12;
                this.year -= 1;
            }
        }

        if (flag === 1) {
            this.month = (this.month + 1) % 13;

            if (this.month === 0) {
                this.month = 1;
                this.year += 1;
            }
        }

        this.buildCalendar(this.year, this.month);
    }

    handleTodayActionEvent(): void {
        this.date = new Date(Date.now());
        this.dateChange.emit(this.date);
        this.renderDate(this.date);
    }

    handleSelectActionEvent(day: number): void {
        this.today = day;
        this.date = new Date(this.year, this.month - 1, this.today);
        this.dateChange.emit(this.date);
    }

    private buildCalendar(year: number, month: number): void {
        this.prevList.length = 0;
        this.currList.length = 0;
        this.nextList.length = 0;

        let index: number = this.findDay(year, month, 1);
        let max: number = this.findMaxDays(year, month);
        let prevMax: number = this.findMaxDays(year, month - 1);

        for (let i = 0; i < index; i++) {
            this.prevList.push(prevMax - i - 1);
        }

        this.prevList.sort((a: number, b: number) => a - b);

        for (let i = 0; i < max; i++) {
            this.currList.push(i + 1);
        }

        for (let i = 0; i < 42 - max - index; i++) {
            this.nextList.push(i + 1);
        }
    }

    private findMaxDays(year: number, month: number): number {
        let date: Date = new Date(month === 12 ? year + 1 : year, month === 12 ? 0 : month, 0);
        return date.getDate();
    }

    private findDay(year: number, month: number, day: number): number {
        let date: Date = new Date(year, month - 1, day);
        return date.getDay();
    }

    private renderDate(date: Date): void {
        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;
        this.today = date.getDate();
        this.buildCalendar(this.year, this.month);
    }

    private renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-calendar' : `octopus-${prevColor}-calendar`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-calendar`);
    }

}