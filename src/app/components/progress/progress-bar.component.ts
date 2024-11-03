import { coerceBooleanProperty, coerceNumberProperty } from "@angular/cdk/coercion";
import { formatPercent } from "@angular/common";
import { AfterViewInit, Component, ElementRef, Inject, InjectionToken, Input, OnChanges, OnDestroy, Renderer2, SimpleChanges } from "@angular/core";
import { BehaviorSubject, map, Observable, of, Subject } from "rxjs";

export type NGXSeasonProgressColor = 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'failure' | 'info';
export type NGXSeasonProgressLabelPosition = 'above' | 'below';
export type NGXSeasonProgressSize = 'sm' | 'md' | 'lg' | 'xl';

type NGXSeasonProgressMetainfo = { value: number, threshold: number };

@Component({
    selector: '',
    template: ''
})
export class NGXSeasonProgressComponent implements OnChanges, OnDestroy, AfterViewInit {

    @Input('pgsColor')
    set color(color: NGXSeasonProgressColor) {
        this._color = color;
    }

    get color(): NGXSeasonProgressColor {
        return this._color;
    }

    @Input('pgsReady')
    set ready(ready: boolean | string) {
        this._ready = coerceBooleanProperty(ready);
    }

    get ready(): boolean {
        return this._ready;
    }

    @Input('pgsSize')
    set size(size: NGXSeasonProgressSize) {
        this._size = size;
    }

    get size(): NGXSeasonProgressSize {
        return this._size;
    }

    @Input('pgsThreshold')
    set threshold(threshold: number | string | null) {
        this._threshold = coerceNumberProperty(threshold);
    }

    get threshold(): number {
        return this._threshold;
    }

    @Input('pgsValue')
    set value(value: number | string | null) {
        this._value = coerceNumberProperty(value);
    }

    get value(): number {
        return this._value;
    }

    private _color: NGXSeasonProgressColor = 'default';
    private _ready: boolean = false;
    private _size: NGXSeasonProgressSize = 'md';
    private _threshold: number = 100;
    private _value: number = 0;

    protected metainfo: NGXSeasonProgressMetainfo = { value: this.value, threshold: this.threshold };
    protected metainfo$: Subject<NGXSeasonProgressMetainfo> = new BehaviorSubject(this.metainfo);

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'color') this.changeProgressColor(changes[name].currentValue as NGXSeasonProgressColor);

            if (name === 'size') this.changeProgressSize(changes[name].currentValue as NGXSeasonProgressSize);

            if (name === 'value') this.metainfo.value = coerceNumberProperty(changes[name].currentValue);

            if (name === 'threshold') this.metainfo.threshold = coerceNumberProperty(changes[name].currentValue);
        }

        this.metainfo$.next(this.metainfo);
    }

    ngOnDestroy(): void {
        this.metainfo$.complete();
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'progress');
        this.changeProgressColor(this.color);
        this.changeProgressSize(this.size);
    }

    protected changeProgressColor(color: NGXSeasonProgressColor): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-progress-color', color);
    }

    protected changeProgressSize(size: NGXSeasonProgressSize): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-progress-size', size);
    }

    protected calcProgressPercent(flag: boolean): Observable<number | string> {
        return flag 
            ? this.metainfo$.asObservable().pipe(map(metainfo => metainfo.value / metainfo.threshold)) 
            : this.metainfo$.asObservable().pipe(map(metainfo => formatPercent(metainfo.value / metainfo.threshold, 'en-US', '0.0-3')));
    }

}

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