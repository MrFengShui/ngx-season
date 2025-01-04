import { coerceCssPixelValue, coerceNumberProperty } from "@angular/cdk/coercion";
import { ChangeDetectionStrategy, Component, RendererStyleFlags2 } from "@angular/core";
import { Subscription } from 'rxjs';

import { NGXSeasonBaseProgressComponent } from "./progress.component";

import { NGXSeasonNomralSizeOption } from "src/app/utils/size.utils";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'ngx-sui-progress-ring',
    template: `
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <circle fill="none" class="progress-track"/>
            <ng-container *ngIf="ready; then readyBlock else awaitBlock"></ng-container>
            <ng-template #readyBlock>
                <circle fill="none" [attr.stroke-dasharray]="valueDasharray" class="progress-thumb"/>
            </ng-template>
            <ng-template #awaitBlock>
                <circle fill="none" [attr.stroke-dasharray]="awaitDasharray" class="progress-await"/>
            </ng-template>
            <text x="50%" y="50%" text-anchor="middle" alignment-baseline="central" class="progress-label">{{ offsetChange$ | async  | percent}}</text>
        </svg>
    `
})
export class NGXSeasonProgressRingComponent extends NGXSeasonBaseProgressComponent {

    protected valueDasharray: string | undefined;
    protected awaitDasharray: string | undefined;

    private total: number = 0;

    private offset$: Subscription = Subscription.EMPTY;

    override ngOnDestroy(): void {
        super.ngOnDestroy();

        this.offset$.unsubscribe();
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.addClass(this._element.nativeElement, 'progress-ring');

        this.listenProgressOffsetChange();
    }

    protected override setupProgressSize(size: NGXSeasonNomralSizeOption): void {
        const unitSize: number = this._sizeMap[size], radius: number = unitSize * 8 - unitSize * 0.5;
        this.total = 2 * Math.PI * radius;

        const element = this._element.nativeElement;
        this._renderer.setStyle(element, '--progress-ring-size', coerceCssPixelValue(unitSize * 16), RendererStyleFlags2.DashCase);
        this._renderer.setStyle(element, '--progress-ring-axis', unitSize * 8, RendererStyleFlags2.DashCase);
        this._renderer.setStyle(element, '--progress-ring-radius', radius, RendererStyleFlags2.DashCase);
        this._renderer.setStyle(element, '--progress-ring-stroke-width', unitSize, RendererStyleFlags2.DashCase);
        this._renderer.setStyle(element, '--progress-ring-label-font-size', coerceCssPixelValue(radius * 0.65), RendererStyleFlags2.DashCase);
    }

    protected updateProgress(scale: number | null): string {
        return `${this.total * coerceNumberProperty(scale)} ${this.total}`;
    }

    private listenProgressOffsetChange(): void {
        this._ngZone.runOutsideAngular(() =>
            this.offset$ = this.offsetChange$.subscribe(value => {
                this.valueDasharray = `${this.total * value} ${this.total}`;
                this.awaitDasharray = `${this.total / 3} ${this.total}`;
                this._cdr.markForCheck();
            }));
    }

}
