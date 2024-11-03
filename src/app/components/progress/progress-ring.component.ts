import { Component, SimpleChanges } from "@angular/core";
import { Observable, map } from "rxjs";

import { NGXSeasonProgressComponent, NGXSeasonProgressSize } from "./progress.component";

@Component({
    selector: 'ngx-sui-progress-ring',
    template: `
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <circle fill="none" class="progress-track"/>
            <ng-container *ngIf="ready; then readyBlock else awaitBlock"></ng-container>
            <ng-template #readyBlock>
                <circle fill="none" [attr.stroke-dasharray]="value$ | async" class="progress-thumb"/>
            </ng-template>
            <ng-template #awaitBlock>
                <circle fill="none" [attr.stroke-dasharray]="dasharray" class="progress-await"/>
            </ng-template>
            <text x="50%" y="50%" text-anchor="middle" class="progress-label" *ngIf="ready">{{ label$ | async }}</text>
        </svg>
    `
})
export class NGXSeasonProgressRingComponent extends NGXSeasonProgressComponent {

    protected label$: Observable<number | string> = this.calcProgressPercent(false);
    protected value$: Observable<string> = this.calcProgressPercent(true).pipe(map(value => `calc(var(--progress-ring-dasharray-gap-${this.size}) * ${value}) var(--progress-ring-dasharray-gap-${this.size})`));

    protected dasharray: string | undefined;

    override ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        for (const name in changes) {
            if (name === 'size') {
                const size: NGXSeasonProgressSize = changes[name].currentValue as NGXSeasonProgressSize;
                this.dasharray = `calc(var(--progress-ring-dasharray-gap-${size}) / 3) var(--progress-ring-dasharray-gap-${size})`;
            }
        }
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.addClass(this._element.nativeElement, 'progress-ring');
    }

}
