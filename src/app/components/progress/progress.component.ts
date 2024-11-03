import { coerceBooleanProperty, coerceNumberProperty } from "@angular/cdk/coercion";
import { formatPercent } from "@angular/common";
import { Component, OnChanges, OnDestroy, AfterViewInit, Input, ElementRef, Renderer2, SimpleChanges } from "@angular/core";
import { Subject, BehaviorSubject, Observable, map } from "rxjs";

export type NGXSeasonProgressColor = 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'failure' | 'info';
export type NGXSeasonProgressLabelPosition = 'above' | 'below';
export type NGXSeasonProgressSize = 'sm' | 'md' | 'lg' | 'xl';

export type NGXSeasonProgressMetainfo = { value: number; threshold: number; };

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
    ) { }

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
