import { coerceNumberProperty } from "@angular/cdk/coercion";
import { AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, EventEmitter, InjectionToken, Input, NgZone, OnChanges, OnDestroy, Output, QueryList, Renderer2, SimpleChanges, ViewChild } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

import { NGXSeasonCarouselControlComponent } from "./carousel-control.component";

import { NGXSeasonIDUtils } from "src/app/utils/id.utils";

import { NGXSeasonSwitchSelectionIndexDispatcher } from "src/app/utils/services/switch-select.service";

export const NGX_SEASON_CAROUSEL_TOKEN: InjectionToken<NGXSeasonCarouselComponent> = new InjectionToken('NGX_SEASON_CAROUSEL_TOKEN');

export type NGXSeasonCarouselColor = 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'failure' | 'info';
export type NGXSeasonCarouselMetainfoModel = { imageSrc?: string, imageAlt?: string, imageDesc?: string, imageIndex?: number };
export type NGXSeasonCarouselProgressState = 'start' | 'done' | undefined;

@Component({
    selector: 'ngx-sui-carousel-item',
    template: ''
})
export class NGXSeasonCarouselItemComponent {

    @Input('carslImageAlt')
    set imageAlt(imageAlt: string | undefined) {
        this._imageAlt = imageAlt;
    }

    get imageAlt(): string | undefined {
        return this._imageAlt;
    }

    @Input('carslImageDesc')
    set imageDesc(imageDesc: string | undefined) {
        this._imageDesc = imageDesc;
    }

    get imageDesc(): string | undefined {
        return this._imageDesc;
    }

    @Input('carslImageSrc')
    set imageSrc(imageSrc: string | undefined) {
        this._imageSrc = imageSrc;
    }

    get imageSrc(): string | undefined {
        return this._imageSrc;
    }

    private _imageAlt: string | undefined;
    private _imageDesc: string | undefined;
    private _imageSrc: string | undefined;

}

@Component({
    selector: 'ngx-sui-carousel',
    template: `
        <ngx-sui-carousel-content [duration]="delay" [offset]="width">
            <ngx-sui-carousel-content-item [imgAlt]="item.imageAlt" [imgSrc]="item.imageSrc" [imgDesc]="item.imageDesc" [index]="idx" *ngFor="let item of items; index as idx"></ngx-sui-carousel-content-item>
        </ngx-sui-carousel-content>
        <ngx-sui-carousel-control [delay]="delay" [duration]="duration" (selectedChange)="selectedChange.emit($event)" (selectedIndexChange)="selectedIndexChange.emit($event)">
            <a ngx-sui-CarouselControlItem [imgAlt]="item.imageAlt" [imgSrc]="item.imageSrc" [index]="idx" *ngFor="let item of items; index as idx"></a>
        </ngx-sui-carousel-control>
        <ng-template><ng-content select="ngx-sui-carousel-item"></ng-content></ng-template>
    `,
    providers: [
        NGXSeasonSwitchSelectionIndexDispatcher,
        { provide: NGX_SEASON_CAROUSEL_TOKEN, useExisting: NGXSeasonCarouselComponent }
    ]
})
export class NGXSeasonCarouselComponent implements OnChanges, OnDestroy, AfterContentInit, AfterViewInit {

    @Input('carslColor')
    set color(color: NGXSeasonCarouselColor) {
        this._color = color;
    }

    get color(): NGXSeasonCarouselColor {
        return this._color;
    }

    @Input('carslDelay')
    set delay(delay: number | string) {
        this._delay = coerceNumberProperty(delay);
    }

    get delay(): number {
        return this._delay;
    }

    @Input('carslDuration')
    set duration(duration: number | string) {
        this._duration = coerceNumberProperty(duration);
    }

    get duration(): number {
        return this._duration;
    }

    @Input('carslIndex')
    set index(index: number | string) {
        this._index = coerceNumberProperty(index);
    }

    get index(): number {
        return this._index;
    }

    @Input('carslWidth')
    set width(width: number | string) {
        this._width = coerceNumberProperty(width);
    }

    get width(): number {
        return this._width;
    }

    private _color: NGXSeasonCarouselColor = 'default';
    private _delay: number = 1000;
    private _duration: number = 5000;
    private _index: number = 0;
    private _width: number = 0;

    @Output('carslSelectedChange')
    selectedChange: EventEmitter<{ prevIndex: number, currIndex: number }> = new EventEmitter();

    @Output('carslSelectedIndexChange')
    selectedIndexChange: EventEmitter<number> = new EventEmitter(true);

    @ContentChildren(NGXSeasonCarouselItemComponent)
    items: QueryList<NGXSeasonCarouselItemComponent> | undefined;

    @ViewChild('control', { read: NGXSeasonCarouselControlComponent, static: true })
    protected control: NGXSeasonCarouselControlComponent | undefined;

    id: string = NGXSeasonIDUtils.generateHashID('ngx-sui-carousel');

    totalCount$: Subject<number> = new BehaviorSubject(0);

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _ngZone: NgZone,

        protected _dispatcher: NGXSeasonSwitchSelectionIndexDispatcher
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        let keys: string[] | null = Object.keys(changes);

        if (keys.includes('color')) {
            this.changeCarouselColor(changes['color'].currentValue);
        }
        
        if (keys.includes('index')) {
            this.changeCarouselIndex(coerceNumberProperty(changes['index'].currentValue));
        }
        
        if (keys.includes('width')) {
            this.changeCarouselWidth(coerceNumberProperty(changes['width'].currentValue));
        }

        keys.splice(0);
        keys = null;
    }

    ngOnDestroy(): void {
        this.totalCount$.complete();
    }

    ngAfterContentInit(): void {
        if (this.items) this.totalCount$.next(this.items.length);
    }

    ngAfterViewInit(): void {
        this.initialize();
        this.changeCarouselColor(this.color);
        this.changeCarouselIndex(this.index);
        this.changeCarouselWidth(this.width);
    }

    protected initialize(): void {
        const element: HTMLElement = this._element.nativeElement;
        this._renderer.addClass(element, 'carousel');
        this._renderer.setAttribute(element, 'data-carousel-id', this.id);
    }

    protected changeCarouselColor(color: NGXSeasonCarouselColor): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-carousel-color', color);
    }

    protected changeCarouselIndex(index: number): void {
        this._dispatcher.notify(-1, index, this.id);
    }

    protected changeCarouselWidth(width: number): void {
        this._renderer.setStyle(this._element.nativeElement, 'width', width === 0 ? '100%' : `${width}px`);
    }

}
