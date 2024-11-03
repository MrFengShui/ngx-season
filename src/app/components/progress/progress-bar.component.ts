import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { Component, ElementRef, Input, Renderer2, SimpleChanges } from "@angular/core";
import { map, Observable } from "rxjs";

import { NGXSeasonProgressComponent, NGXSeasonProgressLabelPosition } from "./progress.component";

@Component({
    selector: 'ngx-sui-progress-bar',
    template: `
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" class="progress-track"/>
            <ng-container *ngIf="ready; then readyBlock else awaitBlock"></ng-container>
            <ng-template #readyBlock>
                <rect x="0" y="0" rx="4" ry="4" [attr.width]="label$ | async" height="100%" class="progress-thumb"/>
            </ng-template>
            <ng-template #awaitBlock>
                <rect x="0" y="0" rx="4" ry="4" height="100%" class="progress-await"/>
            </ng-template>
        </svg>
        <span class="progress-label" [style.left]="value$ | async" *ngIf="show && ready">
            <span class="progress-label-text">{{ label$ | async }}</span>
            <span class="progress-label-arrow"></span>
        </span>
    `
})
export class NGXSeasonProgressBarComponent extends NGXSeasonProgressComponent {

    @Input('pgsLabelPos')
    set position(position: NGXSeasonProgressLabelPosition) {
        this._position = position;
    }

    get position(): NGXSeasonProgressLabelPosition {
        return this._position;
    }

    @Input('pgsLabelShow')
    set show(show: boolean | string) {
        this._show = coerceBooleanProperty(show);
    }

    get show(): boolean {
        return this._show;
    }

    private _position: NGXSeasonProgressLabelPosition = 'above';
    private _show: boolean = false;

    protected label$: Observable<number | string> = this.calcProgressPercent(false);
    protected value$: Observable<string> = this.calcProgressPercent(false).pipe(map(value => `calc(${value} - var(--progress-bar-label-text-width) * 0.5)`));

    constructor(
        protected override _element: ElementRef,
        protected override _renderer: Renderer2
    ) {
        super(_element, _renderer);
    }

    override ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        for (const name in changes) {
            if (name === 'position') this.changeProgressBarLabelPosition(changes[name].currentValue as NGXSeasonProgressLabelPosition);
        }
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.addClass(this._element.nativeElement, 'progress-bar');
        this.changeProgressBarLabelPosition(this.position);
    }

    protected changeProgressBarLabelPosition(position: NGXSeasonProgressLabelPosition): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-progress-bar-label-pos', position);
    }

}

