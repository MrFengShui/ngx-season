import { AfterViewInit, Component } from "@angular/core";
import { interval, map, Observable, of, take } from "rxjs";

import { NGXSeasonProgressColor, NGXSeasonProgressSize } from "src/app/components/progress/progress.component";

@Component({
    selector: 'ngx-sui-demo-progress-page',
    templateUrl: './progress.component.html'
})
export class DemoProgressPageComponent {

    protected colors: NGXSeasonProgressColor[] = ['default', 'primary', 'accent', 'success', 'warning', 'failure', 'info'];
    protected sizes: NGXSeasonProgressSize[] = ['sm', 'md', 'lg', 'xl'];
    protected threshold: number = 500;

    // protected value$: Observable<number> = interval(100).pipe(take(this.threshold + 1));
    protected value$: Observable<number> = of(this.threshold * 0.333);

}