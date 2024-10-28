import { AfterViewInit, Component, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";

export type NGXSeasonRibbonColor = 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'failure' | 'info';
export type NGXSeasonRibbonPosition = 'left' | 'right' | 'top' | 'bottom';

@Component({
    selector: '[ngx-sui-Ribbon]',
    template: `<span class="ribbon-text-wrapper">{{ text }}</span>`
})
export class NGXSeasonRibbonComponent implements OnChanges, AfterViewInit {

    @Input('ribbonColor')
    set color(color: NGXSeasonRibbonColor) {
        this._color = color;
    }

    get color(): NGXSeasonRibbonColor {
        return this._color;
    }

    @Input('ribbonPosition')
    set position(position: NGXSeasonRibbonPosition) {
        this._position = position;
    }

    get position(): NGXSeasonRibbonPosition {
        return this._position;
    }

    @Input('ribbonText')
    set text(text: string | undefined) {
        this._text = text;
    }

    get text(): string | undefined {
        return this._text;
    }

    private _color: NGXSeasonRibbonColor = 'default';
    private _position: NGXSeasonRibbonPosition = 'right';
    private _text: string | undefined;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        let keys: string[] | null = Object.keys(changes);

        if (keys.includes('color')) {
            this.changeRibbonColor(changes['color'].currentValue as NGXSeasonRibbonColor);
        }

        if (keys.includes('position')) {
            this.changeRibbonPosition(changes['position'].currentValue as NGXSeasonRibbonPosition);
        }

        keys.splice(0);
        keys = null;
    }

    ngAfterViewInit(): void {
        this.initialize();
        this.changeRibbonColor(this.color);
        this.changeRibbonPosition(this.position);
    }

    protected initialize(): void {
        const element: HTMLElement = this._element.nativeElement;
        this._renderer.addClass(element, 'ribbon');

        const parentElement: HTMLElement = this._renderer.parentNode(element);
        this._renderer.setStyle(parentElement, 'position', 'relative');
    }

    protected changeRibbonColor(color: NGXSeasonRibbonColor): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-ribbon-color', `${color}`);
    }

    protected changeRibbonPosition(position: NGXSeasonRibbonPosition): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-ribbon-position', `${position}`);
    }

}