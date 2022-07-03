import {
    AfterViewInit,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    Renderer2,
    SimpleChanges
} from "@angular/core";
import {coerceNumberProperty} from "@angular/cdk/coercion";

import {OCTOPUS_COLOR_PALETTES, OctopusColorPalette} from "../global/enums.utils";

@Component({
    template: ''
})
abstract class OctopusAbstractProgress implements OnChanges, AfterViewInit {

    @Input('octoColor') color: OctopusColorPalette = 'primary';

    @Input('octoThick')
    get digit() { return this._digit; }
    set digit(_digit: any) { this._digit = coerceNumberProperty(_digit); }
    private _digit: number = 1;

    @Input('octoThick')
    get thickness() { return this._thickness; }
    set thickness(_thickness: any) { this._thickness = coerceNumberProperty(_thickness); }
    private _thickness: number = 12;

    @Input('octoValue')
    get value() { return this._value; }
    set value(_value: any) { this._value = coerceNumberProperty(_value); }
    private _value: number = 0.5;

    @HostBinding('class') class: string = 'octo-progress';

    constructor(
        protected _element: ElementRef,
        protected _render: Renderer2
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['color']) {
            this.renderColor(changes['color'].currentValue);
        }

        if (changes['thickness']) {
            this.renderColor(changes['thickness'].currentValue);
        }
    }

    ngAfterViewInit() {
        this._render.addClass(this._element.nativeElement, 'octo-shadow-2');
        this.renderColor(this.color);
        this.renderThickness(this.thickness);
    }

    protected renderColor(color: OctopusColorPalette): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            OCTOPUS_COLOR_PALETTES.forEach(item =>
                this._render.removeClass(this._element.nativeElement, `octo-progress-${item}`));

            if (color !== 'base') {
                this._render.addClass(this._element.nativeElement, `octo-progress-${color}`);
            }
        });
    }

    protected abstract renderThickness(thickness: number): void;

}

@Component({
    selector: 'octo-progress-bar',
    template: `
        <svg width="100%" height="100%">
            <rect x="0" y="0" width="100%" height="100%" class="octo-progress-track"></rect>
            <rect x="0" y="0" [attr.width]="(value * 100) + '%'" height="100%" class="octo-progress-index"></rect>
        </svg>
    `
})
export class OctopusProgressBar extends OctopusAbstractProgress {

    override ngAfterViewInit() {
        super.ngAfterViewInit();
        this._render.addClass(this._element.nativeElement, 'octo-progress-bar');
    }

    protected override renderThickness(thickness: number) {
        let task = setTimeout(() => {
            clearTimeout(task);
            this._render.setStyle(this._element.nativeElement, 'height', `${thickness}px`);
        });
    }

}

@Component({
    selector: 'octo-progress-pie',
    template: `
        <svg width="100%" height="100%">
            <circle [attr.r]="radius" [attr.cx]="radius + thickness * 0.5" [attr.cy]="radius + thickness * 0.5"
                    [attr.stroke-width]="thickness" class="octo-progress-track"></circle>
            <circle [attr.r]="radius" [attr.cx]="radius + thickness * 0.5" [attr.cy]="radius + thickness * 0.5"
                    [attr.stroke-width]="thickness" class="octo-progress-index"
                    [style.stroke-dasharray]="calcDashArray(radius)"
                    [style.stroke-dashoffset]="calcDashOffset(radius, value)"></circle>
            <text [attr.x]="radius + thickness * 0.5 - text.getBoundingClientRect().width * 0.5"
                  [attr.y]="radius + thickness * 0.5 + text.getBoundingClientRect().height * 0.25"
                  class="octo-progress-text" #text>{{value | percent: '0.' + digit + '-' + digit}}</text>
        </svg>
    `
})
export class OctopusProgressPie extends OctopusAbstractProgress {

    @Input('octoRadius')
    get radius() { return this._radius; }
    set radius(_radius: any) { this._radius = coerceNumberProperty(_radius); }
    private _radius: number = 64;

    override ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);

        if (changes['radius']) {
            this.renderRadius(changes['radius'].currentValue);
        }
    }

    override ngAfterViewInit() {
        super.ngAfterViewInit();
        this._render.addClass(this._element.nativeElement, 'octo-progress-pie');
        this.renderRadius(this.radius);
    }

    calcDashArray(radius: number): number {
        return 2 * Math.PI * radius;
    }

    calcDashOffset(radius: number, value: number): number {
        return this.calcDashArray(radius) * (1.0 - value);
    }

    private renderRadius(radius: number): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            this._render.setStyle(this._element.nativeElement, 'width', `${radius * 2 + this.thickness}px`);
            this._render.setStyle(this._element.nativeElement, 'height', `${radius * 2 + this.thickness}px`);
        });
    }

    protected override renderThickness(thickness: number) {
        let task = setTimeout(() => {
            clearTimeout(task);
            this._render.setStyle(this._element.nativeElement, 'width', `${this.radius * 2 + thickness}px`);
            this._render.setStyle(this._element.nativeElement, 'height', `${this.radius * 2 + thickness}px`);
        });
    }

}
