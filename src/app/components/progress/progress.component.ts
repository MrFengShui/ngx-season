import { coerceBooleanProperty, coerceNumberProperty } from "@angular/cdk/coercion";
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from "@angular/core";

import { ColorPalette } from "src/app/global/enum.utils";

@Component({
    selector: 'octopus-progress',
    template: ''
})
abstract class AbstractOctopusProgress implements OnChanges, OnInit {

    @Input('color') color: ColorPalette = 'primary';

    @Input('value')
    get value(): any { return this._value; }
    set value(_value: any) { this._value = coerceNumberProperty(_value); }
    private _value: any = 0;

    @Input('total')
    get total(): any { return this._total; }
    set total(_total: any) { this._total = coerceNumberProperty(_total); }
    private _total: any = 100;

    @Input('precision') precision: number | string = 0;

    @Output('change') change: EventEmitter<number> = new EventEmitter();

    @HostBinding('class') class: string = 'octopus-progress';

    constructor(
        protected _ref: ElementRef<HTMLElement>,
        protected _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.color !== undefined) {
            setTimeout(() => this.renderColor(changes.color.previousValue, changes.color.currentValue));
        }

        if (changes.value !== undefined) {
            setTimeout(() => this.update(coerceNumberProperty(changes.value.currentValue), coerceNumberProperty(this.total)));
        }

        if (changes.total !== undefined) {
            setTimeout(() => this.update(coerceNumberProperty(this.value), coerceNumberProperty(changes.total.currentValue)));
        }
    }

    ngOnInit() {
        setTimeout(() => {
            this.renderColor(undefined, this.color);
            this.update(coerceNumberProperty(this.value), coerceNumberProperty(this.total));
        });
    }

    calcPercentage(value: number | string, total: number | string): string {
        let ratio: number = coerceNumberProperty(value) / coerceNumberProperty(total);
        return `${(ratio * 100).toFixed(coerceNumberProperty(this.precision))}%`;
    }

    protected abstract update(value: number, total: number): void;

    private renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-progress' : `octopus-${currColor}-progress`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-progress`);
    }

}

@Component({
    selector: 'octopus-progress-bar',
    template: `<div class="octopus-progress-bar" #wrapper>{{calcPercentage(value, total)}}</div>`
})
export class OctopusProgressBar extends AbstractOctopusProgress implements OnChanges, OnInit {

    @Input('striped') striped: boolean | string = false;
    @Input('animated') animated: boolean | string = false;

    @ViewChild('wrapper', { read: ElementRef, static: true })
    private wrapper!: ElementRef<HTMLElement>;

    constructor(
        protected _ref: ElementRef<HTMLElement>,
        protected _render: Renderer2
    ) {
        super(_ref, _render);
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);

        if (changes.striped !== undefined) {
            setTimeout(() => this.renderStripe(coerceBooleanProperty(changes.striped.currentValue)));
        }

        if (changes.animated !== undefined) {
            setTimeout(() => this.renderStripeAnimation(coerceBooleanProperty(changes.animated.currentValue)));
        }
    }

    ngOnInit() {
        super.ngOnInit();
        setTimeout(() => {
            this.renderStripe(coerceBooleanProperty(this.striped));
            this.renderStripeAnimation(coerceBooleanProperty(this.animated));
        });
    }

    private renderStripe(striped: boolean,): void {
        if (striped) {
            this._render.addClass(this.wrapper.nativeElement, 'stripe');
        } else {
            this._render.removeClass(this.wrapper.nativeElement, 'stripe');
        }
    }

    private renderStripeAnimation(animated: boolean): void {
        if (animated) {
            this._render.addClass(this.wrapper.nativeElement, 'animate');
        } else {
            this._render.removeClass(this.wrapper.nativeElement, 'animate');
        }
    }

    protected update(value: number, total: number): void {
        let ratio: number = value / total;
        this._render.setStyle(this.wrapper.nativeElement, 'width', `${ratio * 100}%`);
        this.change.emit(ratio);
    }

}

@Component({
    selector: 'octopus-progress-pie',
    template: `
        <div class="octopus-progress-pie" [style.width]="'calc(' + radius + 'px * 2)'" [style.height]="'calc(' + radius + 'px * 2)'">
            <svg xmlns="http://w3.org/2000/svg" width="100%" height="100%" class="svg">
                <circle [attr.cx]="radius" [attr.cy]="radius" [attr.r]="calcCircleRadius(radius, thick)" [attr.stroke-width]="thick" fill="none" class="track"></circle>
                <circle [attr.cx]="radius" [attr.cy]="radius" [attr.r]="calcCircleRadius(radius, thick)" [attr.stroke-width]="thick" fill="none" class="thumb" [style.stroke-dasharray]="circumference" [style.stroke-dashoffset]="offset"></circle>
            </svg>
            <span class="text d-flex justify-content-center align-items-center">{{calcPercentage(value, total)}}</span>
        </div>
    `
})
export class OctopusProgressPie extends AbstractOctopusProgress implements OnChanges, OnInit {

    @Input('radius')
    get radius(): any { return this._radius; }
    set radius(_radius: any) { this._radius = coerceNumberProperty(_radius); }
    private _radius: any = 48;

    @Input('thick')
    get thick(): any { return this._thick; }
    set thick(_thick: any) { this._thick = coerceNumberProperty(_thick); }
    private _thick: any = 12;

    @HostBinding('class') class: string = 'octopus-progress';

    circumference: number = 0;
    offset: number = 0;

    constructor(
        protected _cdr: ChangeDetectorRef,
        protected _ref: ElementRef<HTMLElement>,
        protected _render: Renderer2
    ) {
        super(_ref, _render);
    }

    ngOnChanges(changes: SimpleChanges) {
        setTimeout(() => super.ngOnChanges(changes));

        if (changes.radius !== undefined) {
            this.circumference = this.calcCircumference(coerceNumberProperty(changes.radius.currentValue), coerceNumberProperty(this.thick));
        }

        if (changes.thick !== undefined) {
            this.circumference = this.calcCircumference(coerceNumberProperty(this.radius), coerceNumberProperty(changes.thick.currentValue));
        }
    }

    ngOnInit() {
        setTimeout(() => {
            super.ngOnInit();
            this._render.setStyle(this._ref.nativeElement, 'background', 'none');
            this._render.setStyle(this._ref.nativeElement, 'width', 'auto');
            this._render.setStyle(this._ref.nativeElement, 'height', 'auto');
            this.circumference = this.calcCircumference(this.radius, this.thick);
        });
    }

    calcCircleRadius(radius: number | string, thick: number | string): number {
        return coerceNumberProperty(radius) - coerceNumberProperty(thick) * 0.5;
    }

    private calcCircumference(radius: number, thick: number): number {
        return 2 * Math.PI * (radius - thick * 0.5);
    }

    protected update(value: number, total: number): void {
        let ratio: number = value / total;
        this.change.emit(ratio);
        this.offset = this.circumference * (1 - ratio);
        this._cdr.markForCheck();
    }

}