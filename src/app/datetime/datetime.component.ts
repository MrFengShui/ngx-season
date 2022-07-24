import {
    AfterViewInit,
    Component,
    EventEmitter,
    HostBinding,
    Input, OnChanges, OnInit,
    Output,
    SimpleChanges
} from "@angular/core";

import {OctopusColorPalette} from "../global/enums.utils";

type OctopusCalendarCell = {disabled: boolean, value: number};

@Component({
    selector: 'octo-calendar',
    template: `
        <table>
            <thead>
                <tr>
                    <th *ngFor="let week of weeks">{{week}}</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let row of cells">
                    <td *ngFor="let col of row">
                        <button octo-stroke-btn octoShape="ring" [disabled]="col.disabled"
                                [octoColor]="day === col.value && !col.disabled ? color : 'base'"
                                (click)="selectDate(col.value)">
                            {{col.value | number: '2.0-0'}}
                        </button>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3">
                        <div class="d-flex align-items-center">
                            <button octo-btn octoShape="ring" (click)="decreaseYearValue()">
                                <octo-icon>keyboard_double_arrow_left</octo-icon>
                            </button>
                            <span class="flex-fill flex-as-center text-center">{{year}}</span>
                            <button octo-btn octoShape="ring" (click)="increaseYearValue()">
                                <octo-icon>keyboard_double_arrow_right</octo-icon>
                            </button>
                        </div>
                    </td>
                    <td colspan="3">
                        <div class="d-flex align-items-center">
                            <button octo-btn octoShape="ring" (click)="decreaseMonthValue()">
                                <octo-icon>keyboard_arrow_left</octo-icon>
                            </button>
                            <span class="flex-fill flex-as-center text-center">{{months[month]}}</span>
                            <button octo-btn octoShape="ring" (click)="increaseMonthValue()">
                                <octo-icon>keyboard_arrow_right</octo-icon>
                            </button>
                        </div>
                    </td>
                    <td>
                        <button octo-btn octoShape="ring" (click)="today()">
                            <octo-icon octoSize="1.25rem">today</octo-icon>
                        </button>
                    </td>
                </tr>
            </tfoot>
        </table>
    `
})
export class OctopusCalendar implements OnChanges, AfterViewInit {

    @Input('octoColor') color: OctopusColorPalette = 'primary';
    @Input('octoWeeks') weeks: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    @Input('octoMonths') months: string[] = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    @Input('octoValue') value: Date = new Date();

    @Output('octoValueChange') change: EventEmitter<Date> = new EventEmitter<Date>();

    @HostBinding('class') class: string = 'octo-calendar';

    cells: OctopusCalendarCell[][] = [];
    year!: number;
    month!: number;
    day!: number;

    ngOnChanges(changes: SimpleChanges) {
        if (changes['value']) {
            this.reset(changes['value'].currentValue);
            this.update();
        }
    }

    ngAfterViewInit() {
        this.reset(this.value);
        this.update();
    }

    update(): void {
        let index: number = this.value.getDate();
        let prefix: OctopusCalendarCell[] = this.createPrefixArray(this.year, this.month);
        let infix: OctopusCalendarCell[] = this.createInfixArray(this.year, this.month);
        let suffix: OctopusCalendarCell[] = OctopusCalendar.createSuffixArray(prefix, infix);
        this.createCalendarCells(prefix, infix, suffix);
        this.value.setDate(index);
        this.change.emit(this.value);
    }

    today(): void {
        this.value.setTime(Date.now());
        this.reset(this.value);
        this.update();
    }

    decreaseYearValue(): void {
        this.year = Math.max(this.year - 1, 1900);
        this.value.setFullYear(this.year);
        this.update();
    }

    increaseYearValue(): void {
        this.year = Math.min(this.year + 1, 2100);
        this.value.setFullYear(this.year);
        this.update();
    }

    decreaseMonthValue(): void {
        this.year = this.month === 0 ? this.year - 1 : this.year;
        this.month = this.month === 0 ? 11 : this.month - 1;
        this.value.setFullYear(this.year, this.month);
        this.update();
    }

    increaseMonthValue(): void {
        this.year = this.month === 11 ? this.year + 1 : this.year;
        this.month = this.month === 11 ? 0 : this.month + 1;
        this.value.setFullYear(this.year, this.month);
        this.update();
    }

    selectDate(day: number): void {
        this.value.setDate(day);
        this.change.emit(this.value);
        this.reset(this.value);
    }

    private createCalendarCells(prefix: OctopusCalendarCell[], infix: OctopusCalendarCell[],
                                suffix: OctopusCalendarCell[]): void {
        this.cells.forEach(cell => cell.length = 0);
        this.cells.length = 0;

        let array: OctopusCalendarCell[] = Array.of(...prefix).concat(...infix).concat(...suffix);

        for (let i = 0; i < 6; i ++) {
            this.cells.push(array.slice(i * 7, i * 7 + 7));
        }

        prefix.length = 0;
        infix.length = 0;
        suffix.length = 0;
        array.length = 0;
    }

    private createPrefixArray(year: number, month: number): OctopusCalendarCell[] {
        let max: number = this.findMaxDay(month === 0 ? year - 1 : year, month === 0 ? 11 : month - 1);
        let array: OctopusCalendarCell[] = Array.from({length: this.findFirstDay(year, month)})
            .map((_, index) => ({disabled: true, value: max - index}));
        return array.sort((a, b) => a.value - b.value);
    }

    private createInfixArray(year: number, month: number): OctopusCalendarCell[] {
        return Array.from({length: this.findMaxDay(year, month)}).map((_, index) =>
            ({disabled: false, value: index + 1}));
    }

    private static createSuffixArray(prefix: OctopusCalendarCell[], infix: OctopusCalendarCell[]): OctopusCalendarCell[] {
        return Array.from({length: 42 - prefix.length - infix.length}).map((_, index) =>
            ({disabled: true, value: index + 1}));
    }

    private findFirstDay(year: number, month: number): number {
        this.value.setFullYear(year, month, 1);
        return this.value.getDay();
    }

    private findMaxDay(year: number, month: number): number {
        this.value.setFullYear(month === 11 ? year + 1 : year, (month + 1) % 12, 0);
        return this.value.getDate();
    }

    private reset(date: Date): void {
        this.year = date.getFullYear();
        this.month = date.getMonth();
        this.day = date.getDate();
    }

}

@Component({
    selector: 'octo-date-time',
    template: `<octo-icon>calendar_month</octo-icon>`
})
export class OctopusDateTime {

    @HostBinding('class') class: string = 'octo-date-time';

}
