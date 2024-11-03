import { coerceBooleanProperty, coerceNumberProperty } from "@angular/cdk/coercion";
import { AfterViewInit, Component, ElementRef, Input, OnChanges, QueryList, Renderer2, SimpleChanges, ViewChildren } from "@angular/core";

export type NGXSeasonDigitalColor = 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'failure' | 'info';
export type NGXSeasonDigitalValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | '-' | ':' | '%';

@Component({
    selector: 'ngx-sui-digital',
    template: `
        <svg xmlns="http://www.w3.org/2000/svg" [attr.width]="width" [attr.height]="height" viewBox="0 0 100 180">
            <polygon points="10,10 20,0 80,0 90,10 80,20 20,20" class="digital-thumb" #digital/>
            <polygon points="90,10 100,20 100,80 90,90 80,80 80,20" class="digital-thumb" #digital/>
            <polygon points="90,90 100,100 100,160 90,170 80,160 80,100" class="digital-thumb" #digital/>
            <polygon points="90,170 80,180 20,180 10,170 20,160 80,160" class="digital-thumb" #digital/>
            <polygon points="10,170 0,160 0,100 10,90 20,100 20,160" class="digital-thumb" #digital/>
            <polygon points="10,90 0,80 0,20 10,10 20,20 20,80" class="digital-thumb" #digital/>
            <polygon points="10,90 20,80 80,80 90,90 80,100 20,100" class="digital-thumb" #digital/>
            <rect x="40" y="40" rx="4" ry="4" width="20" height="20" class="digital-thumb" #digital/>
            <rect x="40" y="120" rx="4" ry="4" width="20" height="20" class="digital-thumb" #digital/>
        </svg>
    `
})
export class NGXSeasonDigitalComponent implements OnChanges, AfterViewInit {

    @Input('digitActive')
    set active(active: boolean | string | null) {
        this._active = coerceBooleanProperty(active);
    }

    get active(): boolean {
        return this._active;
    }

    @Input('digitColor')
    set color(color: NGXSeasonDigitalColor) {
        this._color = color;
    }

    get color(): NGXSeasonDigitalColor {
        return this._color;
    }

    @Input('digitWidth')
    set width(width: number | string) {
        this._width = coerceNumberProperty(width);
    }

    @Input('digitValue')
    set value(value: NGXSeasonDigitalValue | string | undefined | null) {
        this._value = (Number.isInteger(value) ? coerceNumberProperty(value) : value) as NGXSeasonDigitalValue;
    }

    get value(): NGXSeasonDigitalValue {
        return this._value;
    }

    get width(): number {
        return this._width;
    }

    @Input('digitHeight')
    set height(height: number | string) {
        this._height = coerceNumberProperty(height);
    }

    get height(): number {
        return this._height;
    }

    private _active: boolean = true;
    private _color: NGXSeasonDigitalColor = 'default';
    private _value: NGXSeasonDigitalValue = 8;
    private _width: number = 100;
    private _height: number = 180;

    @ViewChildren('digital', { read: ElementRef })
    protected digitals: QueryList<ElementRef<SVGElement>> | undefined;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'active') this.changeDigitalValue(this.value);

            if (name === 'color') this.changeDigitalColor(changes[name].currentValue as NGXSeasonDigitalColor);

            if (name === 'value') this.changeDigitalValue(changes[name].currentValue as NGXSeasonDigitalValue);
        }
    }

    ngAfterViewInit(): void { 
        this._renderer.addClass(this._element.nativeElement, 'digital');
        this.changeDigitalColor(this.color);
        this.changeDigitalValue(this.value);
    }

    protected changeDigitalColor(color: NGXSeasonDigitalColor): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-digital-color', color);
    }

    protected changeDigitalValue(value: NGXSeasonDigitalValue): void {
        if (value === 0) this.activateDigital(this.active, 0, 1, 2, 3, 4, 5);

        if (value === 1) this.activateDigital(this.active, 1, 2);

        if (value === 2) this.activateDigital(this.active, 0, 1, 3, 4, 6);

        if (value === 3) this.activateDigital(this.active, 0, 1, 2, 3, 6);

        if (value === 4) this.activateDigital(this.active, 1, 2, 5, 6);

        if (value === 5) this.activateDigital(this.active, 0, 2, 3, 5, 6);

        if (value === 6) this.activateDigital(this.active, 0, 2, 3, 4, 5, 6);

        if (value === 7) this.activateDigital(this.active, 0, 1, 2);

        if (value === 8) this.activateDigital(this.active, 0, 1, 2, 3, 4, 5, 6);

        if (value === 9) this.activateDigital(this.active, 0, 1, 2, 3, 5, 6);

        if (value === '-') this.activateDigital(this.active, 6);

        if (value === ':') this.activateDigital(this.active, 7, 8);

        if (value === '%') this.activateDigital(this.active, 6, 7, 8);
    }

    private activateDigital(active: boolean, ...list: number[]): void {
        if (this.digitals) {
            this.digitals.forEach(digital => this._renderer.removeClass(digital.nativeElement, 'active'));

            if (active) {
                for (const item of list) {
                    this._renderer.addClass(this.digitals.get(item)?.nativeElement, 'active');
                }
            }
        }
    }

}