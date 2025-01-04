import { coerceBooleanProperty, coerceNumberProperty } from "@angular/cdk/coercion";
import { Component, OnChanges, OnDestroy, AfterViewInit, Input, ElementRef, Renderer2, SimpleChanges, InjectionToken, Inject, NgZone, Output, EventEmitter, ChangeDetectorRef } from "@angular/core";
import { BehaviorSubject, map, Observable, Subscription } from "rxjs";

import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";
import { NGXSeasonNomralSizeOption, NGXSeasonNormalSizeMap } from "src/app/utils/size.utils";

export const NGX_SEASON_PROGRESS_SIZE_TOKEN: InjectionToken<NGXSeasonNormalSizeMap> = new InjectionToken('NGX_SEASON_PROGRESS_SIZE_TOKEN');

type ProgressValueModel = { value: number, maxValue: number };

@Component({
    selector: 'ngx-sui-base-progress',
    template: ''
})
export abstract class NGXSeasonBaseProgressComponent implements OnChanges, OnDestroy, AfterViewInit {

    @Input({ alias: 'progColor' })
    set color(color: NGXSeasonColorPalette | undefined | null) {
        this._color = color || 'default';
    }

    get color(): NGXSeasonColorPalette {
        return this._color;
    }

    @Input({ alias: 'progReady' })
    set ready(ready: boolean | string | undefined | null) {
        this._ready = coerceBooleanProperty(ready);
    }

    get ready(): boolean {
        return this._ready;
    }

    @Input({ alias: 'progRounded' })
    set rounded(rounded: boolean | string | undefined | null) {
        this._rounded = coerceBooleanProperty(rounded);
    }

    get rounded(): boolean {
        return this._rounded;
    }

    @Input({ alias: 'progSize' })
    set size(size: NGXSeasonNomralSizeOption | undefined | null) {
        this._size = size || 'md';
    }

    get size(): NGXSeasonNomralSizeOption {
        return this._size;
    }

    @Input({ alias: 'progThreshold' })
    set threshold(threshold: number | string | undefined | null) {
        this._threshold = coerceNumberProperty(threshold);
    }

    get threshold(): number {
        return this._threshold;
    }

    @Input({ alias: 'progValue' })
    set value(value: number | string | undefined | null) {
        this._value = coerceNumberProperty(value);
    }

    get value(): number {
        return this._value;
    }

    private _color: NGXSeasonColorPalette = 'default';
    private _ready: boolean = false;
    private _rounded: boolean = true;
    private _size: NGXSeasonNomralSizeOption = 'md';
    private _threshold: number = 100;
    private _value: number = 0;

    @Output('progStatusChange')
    statusChange: EventEmitter<boolean> = new EventEmitter(true);

    protected modelChange$: BehaviorSubject<ProgressValueModel> = new BehaviorSubject({ value: this.value, maxValue: this.threshold });
    protected offsetChange$: Observable<number> = this.modelChange$.asObservable().pipe(map(model => model.value / model.maxValue));

    private model$: Subscription = Subscription.EMPTY;

    constructor(
        protected _cdr: ChangeDetectorRef,
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _ngZone: NgZone,

        @Inject(NGX_SEASON_PROGRESS_SIZE_TOKEN)
        protected _sizeMap: NGXSeasonNormalSizeMap
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'color') this.changeProgressColor(changes[name].currentValue as NGXSeasonColorPalette);

            if (name === 'rounded') this.setupProgressRounded(coerceBooleanProperty(changes[name].currentValue));

            if (name === 'size') this.setupProgressSize(changes[name].currentValue as NGXSeasonNomralSizeOption);

            if (name === 'value') {
                const model: ProgressValueModel = this.modelChange$.value;
                model.value = coerceNumberProperty(changes[name].currentValue);
                this.modelChange$.next(model);
            }

            if (name === 'threshold') {
                const model: ProgressValueModel = this.modelChange$.value;
                model.maxValue = coerceNumberProperty(changes[name].currentValue);
                this.modelChange$.next(model);
            }
        }
    }

    ngOnDestroy(): void {
        this.model$.unsubscribe();

        this.modelChange$.complete();
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'progress');

        this.changeProgressColor(this.color);
        this.setupProgressRounded(this.rounded);
        this.setupProgressSize(this.size);
        this.listenProgressChange();
    }

    protected changeProgressColor(color: NGXSeasonColorPalette): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-progress-color', color);
    }

    protected setupProgressRounded(rounded: boolean): void {
        const element = this._element.nativeElement;

        if (rounded) this._renderer.addClass(element, 'progress-round');
        else this._renderer.removeClass(element, 'progress-round');
    }

    protected abstract setupProgressSize(size: NGXSeasonNomralSizeOption): void;

    private listenProgressChange(): void {
        this._ngZone.runOutsideAngular(() =>
            this.model$ = this.modelChange$.asObservable().subscribe(model =>
                this.statusChange.emit(model.value === model.maxValue)));
    }

}
