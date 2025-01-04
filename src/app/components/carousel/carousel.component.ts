import { coerceBooleanProperty, coerceCssPixelValue, coerceNumberProperty } from "@angular/cdk/coercion";
import { CdkVirtualForOfContext, CdkVirtualScrollViewport, DEFAULT_SCROLL_TIME } from "@angular/cdk/scrolling";
import { AnimationBuilder } from "@angular/animations";
import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, ElementRef, EventEmitter, HostListener, Input, NgZone, OnChanges, OnDestroy, Output, Renderer2, RendererStyleFlags2, SimpleChanges, TemplateRef, ViewChild } from "@angular/core";
import { debounceTime, interval, Subscription, takeWhile } from "rxjs";

import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";

import { NGXSeasonCarouselPanelTemplateDirective } from "./carousel.directive";

export type NGXSeasonCarouselProgressModel = { progress: number, completed: boolean };

@Component({
    selector: 'ul[ngx-sui-CarouselOrbit]',
    template: `
        <li class="orbit-item" [class.selected]="index === idx" *ngx-sui-While="count; index as idx">
            <button ngx-sui-IconButton btnCircled [btnColor]="color" [btnDisabled]="disabled" btnStyle="solid" (click)="selectionChange.emit(idx)"></button>
        </li>
    `
})
export class NGXSeasonCarouselOrbitComponent implements OnChanges, OnDestroy, AfterViewInit {

    @Input({ alias: 'color' })
    set color(color: NGXSeasonColorPalette | undefined | null) {
        this._color = color || 'default';
    }

    get color(): NGXSeasonColorPalette {
        return this._color;
    }

    @Input({ alias: 'count' })
    set count(count: number | string | undefined | null) {
        this._count = coerceNumberProperty(count);
    }

    get count(): number {
        return this._count;
    }

    @Input({ alias: 'disabled' })
    set disabled(disabled: boolean | string | undefined | null) {
        this._disabled = coerceBooleanProperty(disabled);
    }

    get disabled(): boolean {
        return this._disabled;
    }

    @Input({ alias: 'index' })
    set index(index: number | string | undefined | null) {
        this._index = coerceNumberProperty(index);
    }

    get index(): number {
        return this._index;
    }

    @Input({ alias: 'total' })
    set total(total: number | string | undefined | null) {
        this._total = coerceNumberProperty(total);
    }

    get total(): number {
        return this._total;
    }

    private _color: NGXSeasonColorPalette = 'default';
    private _count: number = 0;
    private _disabled: boolean = false;
    private _index: number = 0;
    private _total: number = 0;

    @Output('selectionChange')
    selectionChange: EventEmitter<number> = new EventEmitter(true);

    @Output('progressChange')
    progressChange: EventEmitter<NGXSeasonCarouselProgressModel> = new EventEmitter(true);

    private progress$: Subscription = Subscription.EMPTY;

    constructor(
        protected _builder: AnimationBuilder,
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _ngZone: NgZone
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'index' && !changes[name].isFirstChange()) this.listenTimerValueChange(this.total);
        }
    }

    ngOnDestroy(): void {
        this.selectionChange.complete();
        this.progressChange.complete();
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'orbit-list');

        this.listenTimerValueChange(this.total);
    }

    protected handleSelectEvent(index: number): void {
        if (this.index !== index) this.selectionChange.emit(index);
    }

    private listenTimerValueChange(total: number): void {
        this.progress$.unsubscribe();

        this._ngZone.runOutsideAngular(() =>
            this.progress$ = interval(1).pipe(takeWhile(value => value <= total)).subscribe({
                next: value => this.progressChange.emit({ progress: value, completed: false }),
                complete: () => {
                    this.progressChange.emit({ progress: total, completed: true });
                    this.progress$.unsubscribe();
                }
            }));
    }

}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'ngx-sui-carousel',
    template: `
        <cdk-virtual-scroll-viewport orientation="horizontal" [itemSize]="dimension[0]" [maxBufferPx]="dimension[0] * list.length" class="viewport" #viewport>
            @if (template) {
                <ng-container *cdkVirtualFor="let item of list; template: template; templateCacheSize: 0"></ng-container>
            }
        </cdk-virtual-scroll-viewport>
        <button ngx-sui-IconButton [btnColor]="color" [btnDisabled]="disabled || selectedIndex === 0" btnIcon="angle" btnIconDegree="-90" btnSize="lg" btnStyle="solid" class="control left" [class.none]="!showControl" (click)="handleCarouselPanelSwitchEvent('dec')"></button>
        <button ngx-sui-IconButton [btnColor]="color" [btnDisabled]="disabled || selectedIndex === list.length - 1" btnIcon="angle" btnIconDegree="90" btnSize="lg" btnStyle="solid" class="control right" [class.none]="!showControl" (click)="handleCarouselPanelSwitchEvent('inc')"></button>
        <ul ngx-sui-CarouselOrbit [color]="color" [count]="list.length" [disabled]="disabled || selectedIndex === list.length - 1" [total]="duration" [index]="selectedIndexChange | async" (progressChange)="listenOrbitProgressChange($event)" (selectionChange)="listenOrbitSelectionChange($event)" [class.none]="!showOrbit"></ul>
        <div class="progress-wrapper" [class.none]="!showProgress">
            <ngx-sui-progress-bar [progColor]="color" progReady progRounded="false" progSize="xs" [progValue]="showProgress ? progress : 0" [progThreshold]="duration" #progressBar></ngx-sui-progress-bar>
        </div>
    `
})
export class NGXSeasonCarouselComponent<T = unknown> implements OnChanges, OnDestroy, AfterViewInit {

    @Input({ alias: 'caroColor' })
    set color(color: NGXSeasonColorPalette | undefined | null) {
        this._color = color || 'default';
    }

    get color(): NGXSeasonColorPalette {
        return this._color;
    }

    @Input({ alias: 'caroDimension' })
    set dimension(dimension: [number, number] | undefined | null) {
        this._dimension = dimension || [640, 480];
    }

    get dimension(): [number, number] {
        return this._dimension;
    }

    @Input({ alias: 'caroDuration' })
    set duration(duration: number | string | undefined | null) {
        this._duration = coerceNumberProperty(duration);
    }

    get duration(): number {
        return this._duration;
    }

    @Input({ alias: 'caroList' })
    set list(list: T[] | undefined | null) {
        this._list = list || [];
    }

    get list(): T[] {
        return this._list;
    }

    @Input({ alias: 'caroSelectedIndex' })
    set selectedIndex(selectedIndex: number | string | undefined | null) {
        this._selectedIndex = coerceNumberProperty(selectedIndex);
    }

    get selectedIndex(): number {
        return this._selectedIndex;
    }

    @Input({ alias: 'caroShowCtrl' })
    set showControl(showControl: boolean | string | undefined | null) {
        this._showControl = coerceBooleanProperty(showControl);
    }

    get showControl(): boolean {
        return this._showControl;
    }

    @Input({ alias: 'caroShowOrbit' })
    set showOrbit(showOrbit: boolean | string | undefined | null) {
        this._showOrbit = coerceBooleanProperty(showOrbit);
    }

    get showOrbit(): boolean {
        return this._showOrbit;
    }

    @Input({ alias: 'caroShowProg' })
    set showProgress(showProgress: boolean | string | undefined | null) {
        this._showProgress = coerceBooleanProperty(showProgress);
    }

    get showProgress(): boolean {
        return this._showProgress;
    }

    private _color: NGXSeasonColorPalette = 'default';
    private _dimension: [number, number] = [640, 480];
    private _duration: number = 5000;
    private _list: T[] = [];
    private _selectedIndex: number = 0;
    private _showControl: boolean = true;
    private _showOrbit: boolean = false;
    private _showProgress: boolean = false;

    @Output('caroSelectedIndexChange')
    selectedIndexChange: EventEmitter<number> = new EventEmitter(true);

    @ContentChild(NGXSeasonCarouselPanelTemplateDirective, { read: TemplateRef })
    protected template: TemplateRef<CdkVirtualForOfContext<T>> | undefined;

    @ViewChild('viewport')
    protected viewport: CdkVirtualScrollViewport | undefined;

    @ViewChild('orbit')
    protected orbit: NGXSeasonCarouselOrbitComponent | undefined;

    @ViewChild('progressBar', { read: ElementRef })
    protected progressBar: ElementRef | undefined;

    @HostListener('window:resize')
    protected listenWindowResizeChange(): void {
        this.setupCarouselDimension(this.dimension);
        this.switchCarouselPanel(this.selectedIndex);
    }

    protected disabled: boolean = false;
    protected progress: number = 0;

    private scrolled$: Subscription = Subscription.EMPTY;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _ngZone: NgZone
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'dimension' && !changes[name].isFirstChange()) this.setupCarouselDimension(changes[name].currentValue);
        }
    }

    ngOnDestroy(): void {
        this.scrolled$.unsubscribe();

        this.selectedIndexChange.complete();
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'carousel');
        this._renderer.setStyle(this.progressBar?.nativeElement, '--progress-duration', `${DEFAULT_SCROLL_TIME}ms`, RendererStyleFlags2.DashCase);

        this.setupCarouselDimension(this.dimension);

        if (this.viewport) this.listenViewportScrolledChange(this.viewport);
    }

    previous(): void {
        this.switchCarouselPanel(Math.max(this.selectedIndex - 1, 0));
    }

    next(): void {
        if (this.viewport) this.switchCarouselPanel(Math.min(this.selectedIndex + 1, this.list.length - 1));
    }

    cycle(): void {
        this.switchCarouselPanel((this.selectedIndex + 1) % this.list.length);
    }

    protected setupCarouselDimension(dimension: [number, number]): void {
        this._renderer.setStyle(this._element.nativeElement, 'width', coerceCssPixelValue(dimension[0]));
        this._renderer.setStyle(this._element.nativeElement, 'height', coerceCssPixelValue(dimension[1]));
        this._renderer.setStyle(this._element.nativeElement, '--carousel-panel-width', coerceCssPixelValue(dimension[0]), RendererStyleFlags2.DashCase);
        this._renderer.setStyle(this._element.nativeElement, '--carousel-panel-height', coerceCssPixelValue(dimension[1]), RendererStyleFlags2.DashCase);
    }

    protected handleCarouselPanelSwitchEvent(flag: 'dec' | 'inc'): void {
        if (flag === 'dec') this.previous();

        if (flag === 'inc') this.next();
    }

    protected listenOrbitProgressChange(model: NGXSeasonCarouselProgressModel): void {
        if (model.completed) this.cycle(); else this.progress = model.progress;
    }

    protected listenOrbitSelectionChange(index: number): void {
        this.switchCarouselPanel(index);
    }

    private listenViewportScrolledChange(viewport: CdkVirtualScrollViewport): void {
        this._ngZone.runOutsideAngular(() =>
            this.scrolled$ = viewport.elementScrolled().pipe(debounceTime(DEFAULT_SCROLL_TIME))
                .subscribe(() => {
                    this.disabled = false;
                    this.selectedIndexChange.emit(this.selectedIndex);
                }));
    }

    private switchCarouselPanel(index: number): void {
        if (this.viewport) {
            this.selectedIndex = index;

            this.disabled = true;
            this.viewport.scrollToIndex(this.selectedIndex, 'smooth');
        }
    }

}
