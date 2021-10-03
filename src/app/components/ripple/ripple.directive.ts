import { coerceBooleanProperty, coerceNumberProperty } from "@angular/cdk/coercion";
import { Directive, ElementRef, HostBinding, HostListener, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from "@angular/core";

@Directive({
    selector: '[octopus-ripple]'
})
export class OctopusRipple implements OnChanges, OnInit {

    @Input('rippleCenter') center: boolean | string = false;
    @Input('rippleColor') color: string = '#9e9e9e';

    @Input('rippleRadius')
    get radius(): any { return this._radius; }
    set radius(_radius: any) { this._radius = coerceNumberProperty(_radius); }
    private _radius: any = 0;

    @HostBinding('class') class: string = 'octopus-ripple';

    @HostListener('click', ['$event'])
    listenHostClick(event: MouseEvent): void {
        setTimeout(() => this._render.addClass(this.element, 'active'));
        setTimeout(() => this.locate(coerceBooleanProperty(this.center), coerceNumberProperty(this.radius), event));
        setTimeout(() => this._render.removeClass(this.element, 'active'), 500);
    }

    private element: HTMLElement = this._render.createElement('div');

    constructor(
        private _ref: ElementRef<HTMLElement>,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.color !== undefined) {
            this.renderColor(changes.color.currentValue);
        }

        if (changes.radius !== undefined) {
            this.renderSize(changes.radius.currentValue);
        }
    }

    ngOnInit() {
        setTimeout(() => {
            this._render.appendChild(this._ref.nativeElement, this.element);
            this.renderColor(this.color);
            this.renderSize(coerceNumberProperty(this.radius));
        });
    }

    private renderColor(color: string): void {
        this._render.addClass(this.element, 'octopus-ripple-wrapper');
        this._render.setStyle(this.element, 'background-color', color);
        this._render.setStyle(this.element, 'opacity', 0.25);
    }

    private renderSize(size: number): void {
        if (size === 0) {
            size = Math.max(this._ref.nativeElement.clientWidth, this._ref.nativeElement.clientHeight);
        }

        this._render.setStyle(this.element, 'width', `${size * 2}px`);
        this._render.setStyle(this.element, 'height', `${size * 2}px`);
    }

    private locate(center: boolean, radius: number, event: MouseEvent): void {
        if (radius === 0) {
            radius = Math.max(this._ref.nativeElement.clientWidth, this._ref.nativeElement.clientHeight);
        }

        if (center) {
            this._render.setStyle(this.element, 'top', `${this._ref.nativeElement.clientHeight * 0.5 - radius}px`);
            this._render.setStyle(this.element, 'left', `${this._ref.nativeElement.clientWidth * 0.5 - radius}px`);
        } else {
            this._render.setStyle(this.element, 'top', `${event.offsetY - radius}px`);
            this._render.setStyle(this.element, 'left', `${event.offsetX - radius}px`);
        }
    }

}