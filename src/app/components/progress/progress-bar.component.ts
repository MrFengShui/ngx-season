import { coerceBooleanProperty, coerceCssPixelValue } from "@angular/cdk/coercion";
import { ChangeDetectionStrategy, Component, Input, RendererStyleFlags2, SimpleChanges } from "@angular/core";

import { NGXSeasonBaseProgressComponent } from "./progress.component";

import { NGXSeasonNomralSizeOption } from "src/app/utils/size.utils";

export type NGXSeasonProgressBarLabelPosition = 'above' | 'below';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'ngx-sui-progress-bar',
    template: `
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <rect x="0" y="0" width="100%" height="100%" class="progress-track"/>
            <ng-container *ngIf="ready; then readyBlock else awaitBlock"></ng-container>
            <ng-template #readyBlock>
                <rect x="0" y="0" [attr.width]="offsetChange$ | async | percent" height="100%" class="progress-thumb"/>
            </ng-template>
            <ng-template #awaitBlock>
                <rect x="0" y="0" height="100%" class="progress-await"/>
            </ng-template>
        </svg>
        <span class="progress-label" [style.left]="offsetChange$ | async | percent" *ngIf="showLabel && ready">
            <span class="progress-label-text">{{ offsetChange$ | async | percent }}</span>
            <span class="progress-label-arrow"></span>
        </span>
    `
})
export class NGXSeasonProgressBarComponent extends NGXSeasonBaseProgressComponent {

    @Input({ alias: 'pbLabelPos' })
    set position(position: NGXSeasonProgressBarLabelPosition | undefined | null) {
        this._position = position || 'above';
    }

    get position(): NGXSeasonProgressBarLabelPosition {
        return this._position;
    }

    @Input({ alias: 'pbShowLabel' })
    set showLabel(showLabel: boolean | string | undefined | null) {
        this._showLabel = coerceBooleanProperty(showLabel);
    }

    get showLabel(): boolean {
        return this._showLabel;
    }

    private _position: NGXSeasonProgressBarLabelPosition = 'above';
    private _showLabel: boolean = false;

    override ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        for (const name in changes) {
            if (name === 'position') this.changeProgressBarLabelPosition(changes[name].currentValue as NGXSeasonProgressBarLabelPosition);
        }
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.addClass(this._element.nativeElement, 'progress-bar');

        this.changeProgressBarLabelPosition(this.position);
    }

    protected override setupProgressSize(size: NGXSeasonNomralSizeOption): void {
        const element = this._element.nativeElement, thickness: number = this._sizeMap[size];
        this._renderer.setStyle(element, '--progress-bar-thickness', coerceCssPixelValue(thickness), RendererStyleFlags2.DashCase);
        this._renderer.setStyle(element, '--progress-bar-radius', coerceCssPixelValue(Math.floor(thickness * 0.25)), RendererStyleFlags2.DashCase);
    }

    protected changeProgressBarLabelPosition(position: NGXSeasonProgressBarLabelPosition): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-progress-bar-label-position', position);
    }

}

