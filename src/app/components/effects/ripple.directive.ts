import { animate, AnimationBuilder, AnimationPlayer, style } from "@angular/animations";
import { coerceNumberProperty } from "@angular/cdk/coercion";
import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges } from "@angular/core";

export type NGXSeasonRippleColor = 'primary' | 'accent' | 'success' | 'warning' | 'failure' | 'info' | 'default';

type RippleActiveConfig = { duration: number, ratio: number, scale: number };

@Directive({
    selector: '[ngx-sui-Ripple]'
})
export class NGXSeasonRippleDirective implements OnChanges, OnInit, OnDestroy, AfterViewInit {

    @Input('rippleColor') 
    set color(color: NGXSeasonRippleColor) {
        this._color = color;
    }

    get color(): NGXSeasonRippleColor {
        return this._color;
    }

    @Input('rippleDuration') 
    set duration(duration: number | string) {
        this._duration = coerceNumberProperty(duration);
    }

    get duration(): number {
        return this._duration;
    }

    @Input('rippleScale') 
    set scale(scale: number | string) {
        this._scale = coerceNumberProperty(scale);
    }

    get scale(): number {
        return this._scale;
    }

    private _color: NGXSeasonRippleColor = 'default';
    private _duration: number = 250;
    private _scale: number = 25;

    @HostListener('click', ['$event']) 
    protected listenHostClickEvent(event: MouseEvent): void {
        if (!this.element) throw new Error();

        const element: HTMLElement = this._element.nativeElement;
        const hostSize: number = Math.max(element.offsetWidth, element.offsetHeight);
        const dotSize: number = Math.max(this.element.offsetWidth, this.element.offsetHeight);

        this._renderer.setStyle(this.element, 'left', `${event.offsetX}px`);
        this._renderer.setStyle(this.element, 'top', `${event.offsetY}px`);

        this.config = { ...this.config, ratio: (hostSize + dotSize) / dotSize };
        
        this.buildAnimation(this.element, this.config);
    }

    protected readonly COLORS: NGXSeasonRippleColor[] = ['default', 'primary',  'accent',  'success',  'warning',  'failure',  'info'];

    private element: HTMLElement | undefined;
    private config: RippleActiveConfig = { duration: 0, ratio: 0, scale: 0 };

    constructor(
        protected builder: AnimationBuilder,
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        let keys: string[] | null = Object.keys(changes);
        
        if (keys.includes('color')) {
            this.changeRippleColor(changes['color'].currentValue as NGXSeasonRippleColor);
        }

        if (keys.includes('duration')) {
            this.config = { ...this.config, duration: changes['duration'].currentValue as number };
        }

        if (keys.includes('scale')) {
            this.config = { ...this.config, scale: changes['scale'].currentValue as number };
        }

        keys.splice(0);
        keys = null;
    }

    ngOnInit(): void {
        this.config = { ...this.config, duration: this.duration, scale: this.scale };
    }

    ngOnDestroy(): void {
        this.element = undefined;
    }

    ngAfterViewInit(): void {
        this.element = this.initialize();
        this.changeRippleColor(this.color);
    }

    protected initialize(): HTMLElement {
        const element: HTMLElement = this._element.nativeElement;
        this._renderer.addClass(element, 'ripple');

        const rippleElement: HTMLElement = this._renderer.createElement('div') as HTMLElement;
        this._renderer.addClass(rippleElement, 'ripple-dot');
        this._renderer.appendChild(element, rippleElement);

        return rippleElement;
    }

    protected changeRippleColor(color: NGXSeasonRippleColor): void {
        const element: HTMLElement = this._element.nativeElement;
        let value: string;

        for (let item of this.COLORS) {
            value = `ripple-${item}`;

            if (element.classList.contains(value)) this._renderer.removeClass(element, value);
        }

        Promise.resolve().then(() => this._renderer.addClass(element, `ripple-${color}`))
    }

    private buildAnimation(element: HTMLElement | undefined, config: RippleActiveConfig | undefined): void {
        if (element === undefined) throw new Error();

        if (config === undefined) throw new Error();

        if (config.duration <= 0) throw new Error();

        if (config.ratio <= 0 || config.scale <= 0) throw new Error();
        
        let player: AnimationPlayer = this.builder.build([
            style({ transform: 'scale(0)' }),
            animate(config.duration, style({ transform: `scale(${config.scale * config.ratio}%)` }))
        ]).create(element);
        player.onDone(() => player.destroy());
        player.play();
    }

}