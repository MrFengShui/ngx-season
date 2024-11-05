import { coerceBooleanProperty, coerceNumberProperty } from "@angular/cdk/coercion";
import { AfterViewInit, Directive, ElementRef, Inject, InjectionToken, Input, OnChanges, Renderer2, RendererStyleFlags2, SimpleChanges } from "@angular/core";

export const NGX_SEASON_BACKGROUND_PATTERN_SIZE_MAP_TOKEN: InjectionToken<NGXSeasonBackgroundSizeMap> = new InjectionToken('NGX_SEASON_BACKGROUND_PATTERN_SIZE_TOKEN');

export const NGX_SEASON_BACKGROUND_STRIPE_SIZE_MAP_TOKEN: InjectionToken<NGXSeasonBackgroundSizeMap> = new InjectionToken('NGX_SEASON_BACKGROUND_STRIPE_SIZE_MAP_TOKEN');
export const NGX_SEASON_BACKGROUND_STRIPE_SPEED_MAP_TOKEN: InjectionToken<NGXSeasonBackgroundSpeedMap> = new InjectionToken('NGX_SEASON_BACKGROUND_STRIPE_SPEED_MAP_TOKEN');

export type NGXSeasonBackgroundPatternName = 'brick' | 'cloud' | 'cube' | 'grid' | 'hive' | 'line' | 'maze' | 'ring';
export type NGXSeasonBackgroundPatternSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';

export type NGXSeasonBackgroundStripeColor = 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'failure' | 'info';
export type NGXSeasonBackgroundStripeDirection = 'left' | 'right';
export type NGXSeasonBackgroundStripeSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
export type NGXSeasonBackgroundStripeSpeed = 'xs' | 'sl' | 'md' | 'fs' | 'xf';

type NGXSeasonBackgroundSizeMap = { sm: number, md: number, lg: number, xl: number, xxl: number, xxxl: number };
type NGXSeasonBackgroundSpeedMap = { xs: number, sl: number, md: number, fs: number, xf: number };

@Directive()
export abstract class NGXSeasonBackgroundDirective implements AfterViewInit {

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'background');

        this.changeBackground();
    }

    protected abstract changeBackground(): void;

}

@Directive({
    selector: '[ngx-sui-PatternBackground]'
})
export class NGXSeasonPatternBackgroudnDirective extends NGXSeasonBackgroundDirective implements OnChanges {

    @Input('bgPatternGlassy')
    set glassy(glassy: boolean | string | null) {
        this._glassy = coerceBooleanProperty(glassy);
    }

    get glassy(): boolean {
        return this._glassy;
    }

    @Input('bgPatternName')
    set name(name: NGXSeasonBackgroundPatternName | null) {
        this._name = name ? name : 'brick';
    }

    get name(): NGXSeasonBackgroundPatternName {
        return this._name;
    }

    @Input('bgPatternSize')
    set size(size: NGXSeasonBackgroundPatternSize | null) {
        this._size = size ? size : 'md';
    }

    get size(): NGXSeasonBackgroundPatternSize {
        return this._size;
    }

    private _glassy: boolean = true;  
    private _name: NGXSeasonBackgroundPatternName = 'brick';
    private _size: NGXSeasonBackgroundPatternSize = 'md';

    constructor(
        protected override _element: ElementRef,
        protected override _renderer: Renderer2,

        @Inject(NGX_SEASON_BACKGROUND_PATTERN_SIZE_MAP_TOKEN)
        protected _sizeMap: NGXSeasonBackgroundSizeMap
    ) {
        super(_element, _renderer);
    }

    ngOnChanges(changes: SimpleChanges): void {
        for (let name in changes) {
            if (name === 'glassy') this.setupPatternGlassy(coerceBooleanProperty(changes[name].currentValue));

            if (name === 'name') this.changePatternName(changes[name].currentValue as NGXSeasonBackgroundPatternName);

            if (name === 'size') this.changePatternSize(changes[name].currentValue as NGXSeasonBackgroundPatternSize);
        }
    }

    protected override changeBackground(): void {
        this._renderer.addClass(this._element.nativeElement, 'background-pattern');

        this.setupPatternGlassy(this.glassy);
        this.changePatternName(this.name);
        this.changePatternSize(this.size);
    }

    protected setupPatternGlassy(glassy: boolean): void {
        const element: HTMLElement = this._element.nativeElement;

        if (glassy) {
            this._renderer.addClass(element, 'glassy');
        } else {
            this._renderer.removeClass(element, 'glassy');
        }
    }

    private changePatternName(name: NGXSeasonBackgroundPatternName): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-background-pattern-name', name);
    }

    private changePatternSize(size: NGXSeasonBackgroundPatternSize): void {
        this._renderer.setStyle(this._element.nativeElement, '--background-pattern-size', `${this._sizeMap[size]}px`, RendererStyleFlags2.DashCase);
    }

}

@Directive({
    selector: '[ngx-sui-StripeBackground]'
})
export class NGXSeasonStripeBackgroudnDirective extends NGXSeasonBackgroundDirective implements OnChanges {

    @Input('bgStripeActive')
    set active(active: boolean | string | null) {
        this._active = coerceBooleanProperty(active);
    }

    get active(): boolean {
        return this._active;
    }

    @Input('bgStripeColor')
    set color(color: NGXSeasonBackgroundStripeColor) {
        this._color = color;
    }

    get color(): NGXSeasonBackgroundStripeColor {
        return this._color;
    }

    @Input('bgStripeDegree')
    set degree(degree: number | string | null) {
        this._degree = degree ? coerceNumberProperty(degree) : 45;
    }

    get degree(): number {
        return this._degree;
    }

    @Input('bgStripeDir')
    set direction(direction: NGXSeasonBackgroundStripeDirection) {
        this._direction = direction;
    }

    get direction(): NGXSeasonBackgroundStripeDirection {
        return this._direction;
    }

    @Input('bgStripeSize')
    set size(size: NGXSeasonBackgroundStripeSize) {
        this._size = size;
    }

    get size(): NGXSeasonBackgroundStripeSize {
        return this._size;
    }

    @Input('bgStripeSpeed')
    set speed(speed: NGXSeasonBackgroundStripeSpeed) {
        this._speed = speed;
    }

    get speed(): NGXSeasonBackgroundStripeSpeed {
        return this._speed;
    }

    private _active: boolean = false;
    private _color: NGXSeasonBackgroundStripeColor = 'default';
    private _degree: number = 45;
    private _direction: NGXSeasonBackgroundStripeDirection = 'left';
    private _size: NGXSeasonBackgroundStripeSize = 'md';
    private _speed: NGXSeasonBackgroundStripeSpeed = 'md';

    private element: HTMLElement | undefined;

    constructor(
        protected override _element: ElementRef,
        protected override _renderer: Renderer2,

        @Inject(NGX_SEASON_BACKGROUND_STRIPE_SIZE_MAP_TOKEN)
        protected _sizeMap: NGXSeasonBackgroundSizeMap,
        @Inject(NGX_SEASON_BACKGROUND_STRIPE_SPEED_MAP_TOKEN)
        protected _speedMap: NGXSeasonBackgroundSpeedMap
    ) {
        super(_element, _renderer);
    }

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'active') this.setupStripeActive(coerceBooleanProperty(changes[name].currentValue));

            if (name === 'color') this.changeStripeColor(changes[name].currentValue as NGXSeasonBackgroundStripeColor);

            if (name === 'degree') this.changeStripeDegree(coerceNumberProperty(changes[name].currentValue));

            if (name === 'direction') this.changeStripeDirection(changes[name].currentValue as NGXSeasonBackgroundStripeDirection);

            if (name === 'size') this.changeStripeSize(changes[name].currentValue as NGXSeasonBackgroundStripeSize);

            if (name === 'speed') this.changeStripeSpeed(changes[name].currentValue as NGXSeasonBackgroundStripeSpeed);
        }
    }

    protected override changeBackground(): void {
        const element: HTMLElement = this._element.nativeElement;
        this._renderer.addClass(element, 'background-stripe');

        this.element = this._renderer.createElement('div');
        this._renderer.addClass(this.element, 'stripe');
        this._renderer.appendChild(element, this.element);

        this.setupStripeActive(this.active);
        this.changeStripeColor(this.color);
        this.changeStripeDegree(this.degree);
        this.changeStripeDirection(this.direction);
        this.changeStripeSize(this.size);
        this.changeStripeSpeed(this.speed);
    }

    protected setupStripeActive(active: boolean): void {
        if (active) {
            this._renderer.addClass(this.element, 'active');
        } else {
            this._renderer.removeClass(this.element, 'active');
        }
    }

    protected changeStripeColor(color: NGXSeasonBackgroundStripeColor): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-background-stripe-color', color);
    }

    protected changeStripeDegree(degree: number): void {
        this._renderer.setStyle(this._element.nativeElement, '--background-stripe-degree', `${degree}deg`, RendererStyleFlags2.DashCase);
    }

    protected changeStripeDirection(direction: NGXSeasonBackgroundStripeDirection): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-background-stripe-dir', direction);
    }

    protected changeStripeSize(size: NGXSeasonBackgroundStripeSize): void {
        const fstSize: number = this._sizeMap[size];
        const sndSize: number = Math.round(fstSize * Math.tan(this.degree * Math.PI / 180));
        this._renderer.setStyle(this._element.nativeElement, '--background-stripe-size-one', `${fstSize}px`, RendererStyleFlags2.DashCase);
        this._renderer.setStyle(this._element.nativeElement, '--background-stripe-size-two', `${sndSize}px`, RendererStyleFlags2.DashCase);
    }

    protected changeStripeSpeed(speed: NGXSeasonBackgroundStripeSpeed): void {
        this._renderer.setStyle(this._element.nativeElement, '--background-stripe-duration', `${this._speedMap[speed]}ms`, RendererStyleFlags2.DashCase);
    }

}