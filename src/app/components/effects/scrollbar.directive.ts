import { coerceNumberProperty } from "@angular/cdk/coercion";
import { CdkScrollable, ScrollDispatcher } from "@angular/cdk/scrolling";
import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, NgZone, OnChanges, Output, Renderer2, RendererStyleFlags2, SimpleChanges } from "@angular/core";

import { NGXSeasonColorPalette } from "src/app/utils/_palette.utils";

export type NGXSeasonScrollbarDirection = 'x-axis' | 'y-axis' | 'xy-axis' | 'none-axis';
export type NGXSeasonScrollbarMetainfo = { direction: NGXSeasonScrollbarDirection, x: number, y: number, offsetWidth: number, offsetHeight: number, scrollWidth: number, scrollHeight: number, top: boolean, bottom: boolean, left: boolean, right: boolean };

@Directive({
    selector: '[ngx-sui-Scrollbar]'
})
export class NGXSeasonScrollbarDirective implements OnChanges, AfterViewInit {

    @Input({ alias: 'sbAxis'})
    set axis(axis: NGXSeasonScrollbarDirection | undefined | null) {
        this._axis = axis || 'xy-axis';
    }

    get axis(): NGXSeasonScrollbarDirection {
        return this._axis;
    }

    @Input({ alias: 'sbColor'})
    set color(color: NGXSeasonColorPalette | undefined | null) {
        this._color = color || 'default';
    }

    get color(): NGXSeasonColorPalette {
        return this._color;
    }

    @Input({ alias: 'sbScrollDelay' })
    set scrollDelay(scrollDelay: number | string | undefined | null) {
        this._scrollDelay = coerceNumberProperty(scrollDelay);
    }

    get scrollDelay(): number {
        return this._scrollDelay;
    }

    @Input({ alias: 'sbSize' })
    set size(size: number | string | undefined | null) {
        this._size = coerceNumberProperty(size);
    }

    get size(): number {
        return this._size;
    }

    private _axis: NGXSeasonScrollbarDirection = 'xy-axis';
    private _color: NGXSeasonColorPalette = 'default';
    private _scrollDelay: number = 100;
    private _size: number = 16;

    @Output('sbScrollChange')
    change: EventEmitter<NGXSeasonScrollbarMetainfo> = new EventEmitter(true);

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _ngZone: NgZone,
        protected _dispatcher: ScrollDispatcher
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'axis') this.changeScrollbarDirection(changes[name].currentValue as NGXSeasonScrollbarDirection);

            if (name === 'color') this.changeScrollbarColor(changes[name].currentValue as NGXSeasonColorPalette);

            if (name === 'size') this.changeScrollbarSize(coerceNumberProperty(changes[name].currentValue));
        }
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'scrollbar');

        this.changeScrollbarColor(this.color);
        this.changeScrollbarDirection(this.axis);
        this.changeScrollbarSize(this.size);
        this.listenHostScrollingChange(this.scrollDelay);
    }

    protected changeScrollbarColor(color: NGXSeasonColorPalette): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-scrollbar-color', color);
    }

    protected changeScrollbarDirection(axis: NGXSeasonScrollbarDirection): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-scrollbar-axis', axis);
    }

    protected changeScrollbarSize(size: number): void {
        const padding: number = Math.floor(size * 0.125), radius: number = Math.floor(size * 0.25);

        if (padding === 0 || radius === 0) throw new Error();

        const element: HTMLElement = this._element.nativeElement;
        this._renderer.setStyle(element, '--scrollbar-size', `${size}px`, RendererStyleFlags2.DashCase);
        this._renderer.setStyle(element, '--scrollbar-thumb-padding', `${padding}px`, RendererStyleFlags2.DashCase);
        this._renderer.setStyle(element, '--scrollbar-thumb-radius', `${radius}px`, RendererStyleFlags2.DashCase);
    }

    private listenHostScrollingChange(delay: number): void {
        this._ngZone.runOutsideAngular(() =>
            this._dispatcher.ancestorScrolled(this._element, delay)
                .subscribe(change => {
                    if (change instanceof CdkScrollable) {
                        const element: HTMLElement = change.getElementRef().nativeElement;
                        const x: number = element.scrollLeft, y: number = element.scrollTop;
                        const offsetWidth: number = element.clientWidth, offsetHeight: number = element.clientHeight;
                        const scrollWidth: number = element.scrollWidth, scrollHeight: number = element.scrollHeight;
                        this.change.emit({
                            direction: this.axis, x, y, offsetWidth, offsetHeight, scrollWidth, scrollHeight,
                            left: x === 0, right: x + offsetWidth === scrollWidth,
                            top: y === 0, bottom: y + offsetHeight === scrollHeight
                        });
                    }
                }));
    }

}
