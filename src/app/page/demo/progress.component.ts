import { Component, NgZone } from "@angular/core";
import { interval, map, Observable, Subscription, takeWhile, throttleTime } from "rxjs";

import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";
import { NGXSeasonNomralSizeOption } from "src/app/utils/size.utils";

type ProgressControlModel = { already: boolean, disabled: boolean, progress: number };

@Component({
    selector: 'ngx-sui-demo-progress-page',
    templateUrl: './progress.component.html',
    styles: `
        :host {
            .grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(384px, 1fr));
                grid-auto-flow: row;
            }
        }
    `
})
export class DemoProgressPageComponent {

    protected readonly PROGRESS_DURATION: number = 10000;
    protected readonly PROGRESS_THRESHOLD: number = 1000;

    protected list: Array<{ color: NGXSeasonColorPalette, value: Observable<number> }> = [
        { color: 'default', value: interval(this.PROGRESS_DURATION).pipe(map(() => Math.floor(Math.random() * (this.PROGRESS_THRESHOLD + 1)))) },
        { color: 'primary', value: interval(this.PROGRESS_DURATION).pipe(map(() => Math.floor(Math.random() * (this.PROGRESS_THRESHOLD + 1)))) },
        { color: 'accent', value: interval(this.PROGRESS_DURATION).pipe(map(() => Math.floor(Math.random() * (this.PROGRESS_THRESHOLD + 1)))) },
        { color: 'success', value: interval(this.PROGRESS_DURATION).pipe(map(() => Math.floor(Math.random() * (this.PROGRESS_THRESHOLD + 1)))) },
        { color: 'warning', value: interval(this.PROGRESS_DURATION).pipe(map(() => Math.floor(Math.random() * (this.PROGRESS_THRESHOLD + 1)))) },
        { color: 'failure', value: interval(this.PROGRESS_DURATION).pipe(map(() => Math.floor(Math.random() * (this.PROGRESS_THRESHOLD + 1)))) },
        { color: 'info', value: interval(this.PROGRESS_DURATION).pipe(map(() => Math.floor(Math.random() * (this.PROGRESS_THRESHOLD + 1)))) },
        { color: 'help', value: interval(this.PROGRESS_DURATION).pipe(map(() => Math.floor(Math.random() * (this.PROGRESS_THRESHOLD + 1)))) },
    ];
    protected sizes: NGXSeasonNomralSizeOption[] = ['xs', 'sm', 'md', 'lg', 'xl'];
    protected progressBar: ProgressControlModel = { already: false, disabled: false, progress: 0 };
    protected progressRing: ProgressControlModel = { already: false, disabled: false, progress: 0 };

    protected progress$: Observable<number> = interval(this.PROGRESS_DURATION).pipe(map(() => Math.floor(Math.random() * (this.PROGRESS_THRESHOLD + 1))));

    private interval$: Subscription = Subscription.EMPTY;

    constructor(private _ngZone: NgZone) {}

    protected handleProgressRunEvent(option: 'bar' | 'ring'): void {
        let value: number = 0;

        this._ngZone.runOutsideAngular(() => {
            this.setupAlready(option, true);
            this.setupDisabled(option, true);

            this.interval$ = interval(500)
                .pipe(
                    map(() => value += Math.floor((Math.random() * 50 + 1) * 0.5)),
                    takeWhile(value => value <= this.PROGRESS_THRESHOLD),
                    throttleTime(1000)
                )
                .subscribe({
                    next: value => this.setupProgress(option, value),
                    complete: () => {
                        this.setupDisabled(option, false);
                        this.setupProgress(option, this.PROGRESS_THRESHOLD);
                        this.interval$.unsubscribe();
                    }
                });
        });
    }

    protected handleProgressResetEvent(option: 'bar' | 'ring'): void {
        this.setupAlready(option, false);
        this.setupProgress(option, 0);
    }

    private setupAlready(option: 'bar' | 'ring', value: boolean): void {
        if (option === 'bar') this.progressBar.already = value;

        if (option === 'ring') this.progressRing.already = value;
    }

    private setupDisabled(option: 'bar' | 'ring', value: boolean): void {
        if (option === 'bar') this.progressBar.disabled = value;

        if (option === 'ring') this.progressRing.disabled = value;
    }

    private setupProgress(option: 'bar' | 'ring', value: number): void {
        if (option === 'bar') this.progressBar.progress = value;

        if (option === 'ring') this.progressRing.progress = value;
    }

}
