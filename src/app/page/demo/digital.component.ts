import { AfterViewInit, ChangeDetectorRef, Component, NgZone, OnDestroy } from "@angular/core";
import { interval, map, Observable, Subscription } from "rxjs";

import * as moment from "moment";

import { NGXSeasonDigitalColor, NGXSeasonDigitalValue } from "src/app/components/digital/digial.component";

@Component({
    selector: 'ngx-sui-demo-digital-page',
    templateUrl: './digital.component.html'
})
export class DemoDigitalPageComponent implements OnDestroy, AfterViewInit {

    protected colors: NGXSeasonDigitalColor[] = ['default', 'primary', 'accent', 'success', 'warning', 'failure', 'info'];
    protected values: NGXSeasonDigitalValue[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '-', ':', '%'];

    protected fstYear: NGXSeasonDigitalValue | undefined;
    protected sndYear: NGXSeasonDigitalValue | undefined;
    protected trdYear: NGXSeasonDigitalValue | undefined;
    protected fthYear: NGXSeasonDigitalValue | undefined;

    protected fstMonth: NGXSeasonDigitalValue | undefined;
    protected sndMonth: NGXSeasonDigitalValue | undefined;

    protected fstDate: NGXSeasonDigitalValue | undefined;
    protected sndDate: NGXSeasonDigitalValue | undefined;

    protected fstHour: NGXSeasonDigitalValue | undefined;
    protected sndHour: NGXSeasonDigitalValue | undefined;

    protected fstMinute: NGXSeasonDigitalValue | undefined;
    protected sndMinute: NGXSeasonDigitalValue | undefined;

    protected fstSecond: NGXSeasonDigitalValue | undefined;
    protected sndSecond: NGXSeasonDigitalValue | undefined;

    protected active$: Observable<boolean> = interval(1000).pipe(map(value => value % 2 === 0));
    protected datetime$: Observable<moment.Moment> = interval(1000).pipe(map(() => moment()));

    private datatime$$: Subscription = Subscription.EMPTY;

    constructor(
        private _cdr: ChangeDetectorRef,
        private _ngZone: NgZone
    ) { }

    ngOnDestroy(): void {
        this.datatime$$.unsubscribe();
    }

    ngAfterViewInit(): void {
        this._ngZone.runOutsideAngular(() =>
            this.datatime$$ = this.datetime$.subscribe(moment =>
                this._ngZone.run(() => {
                    this.fstYear = Math.floor(moment.year() / 1000) as NGXSeasonDigitalValue;
                    this.sndYear = Math.floor(moment.year() % 1000 / 100) as NGXSeasonDigitalValue;
                    this.trdYear = Math.floor(moment.year() % 100 / 10) as NGXSeasonDigitalValue;
                    this.fthYear = Math.floor(moment.year() % 10) as NGXSeasonDigitalValue;
                    
                    this.fstMonth = Math.floor((moment.month() + 1) / 10) as NGXSeasonDigitalValue;
                    this.sndMonth = Math.floor((moment.month() + 1) % 10) as NGXSeasonDigitalValue;

                    this.fstDate = Math.floor(moment.date() / 10) as NGXSeasonDigitalValue;
                    this.sndDate = Math.floor(moment.date() % 10) as NGXSeasonDigitalValue;

                    this.fstHour = Math.floor(moment.hour() / 10) as NGXSeasonDigitalValue;
                    this.sndHour = Math.floor(moment.hour() % 10) as NGXSeasonDigitalValue;

                    this.fstMinute = Math.floor(moment.minute() / 10) as NGXSeasonDigitalValue;
                    this.sndMinute = Math.floor(moment.minute() % 10) as NGXSeasonDigitalValue;

                    this.fstSecond = Math.floor(moment.second() / 10) as NGXSeasonDigitalValue;
                    this.sndSecond = Math.floor(moment.second() % 10) as NGXSeasonDigitalValue;

                    this._cdr.markForCheck();
                })));

    }

    protected isActive(value: NGXSeasonDigitalValue | undefined): boolean {
        return Number.isInteger(value) && (value as number) % 2 === 0
    }

}