import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { AfterViewInit, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";

export type NGXSeasonBadgeColor = 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'failure' | 'info';
export type NGXSeasonBadgePosition = 'top-left' | 'top-right' | 'top' | 'bottom-left' | 'bottom-right' | 'bottom' | 'left' | 'right';

@Directive({
    selector: '[ngx-sui-Badge]'
})
export class NGXSeasonBadgeDirective implements OnChanges, AfterViewInit {

    @Input('badgeColor')
    set color(color: NGXSeasonBadgeColor) {
        this._color = color;
    }

    get color(): NGXSeasonBadgeColor {
        return this._color;
    }

    @Input('badgeDotted')
    set dotted(dotted: boolean | string) {
        this._dotted = coerceBooleanProperty(dotted);
    }

    get dotted(): boolean {
        return this._dotted;
    }

    @Input('badgeOverlapped')
    set overlapped(overlapped: boolean | string) {
        this._overlapped = coerceBooleanProperty(overlapped);
    }

    get overlapped(): boolean {
        return this._overlapped;
    }

    @Input('badgePosition')
    set position(position: NGXSeasonBadgePosition) {
        this._position = position;
    }

    get position(): NGXSeasonBadgePosition {
        return this._position;
    }

    @Input('badgeText')
    set text(text: string | undefined) {
        this._text = text;
    }

    get text(): string | undefined {
        return this._text;
    }

    @Input('badgeVisible')
    set visible(visible: boolean | string) {
        this._visible = coerceBooleanProperty(visible);
    }

    get visible(): boolean {
        return this._visible;
    }

    private _color: NGXSeasonBadgeColor = 'default';
    private _dotted: boolean = true;
    private _overlapped: boolean = false;
    private _position: NGXSeasonBadgePosition = 'top-right';
    private _text: string | undefined;
    private _visible: boolean = true;

    private element: HTMLElement | undefined;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        let keys: string[] | null = Object.keys(changes);

        if (keys.includes('color')) {
            this.changeBadgeColor(changes['color'].currentValue as NGXSeasonBadgeColor);
        }

        if (keys.includes('dotted') && this.element) {
            this.setupBadgeDotted(changes['dotted'].currentValue as boolean, this.element);
        }

        if (keys.includes('overlapped')) {
            this.setupBadgeOverlapped(changes['overlapped'].currentValue as boolean);
        }

        if (keys.includes('position') && this.element) {
            this.changeBadgePosition(changes['position'].currentValue as NGXSeasonBadgePosition, this.element);
        }

        if (keys.includes('text') && this.element) {
            this.changeBadgeText(changes['text'].currentValue, this.element);
        }

        if (keys.includes('visible')) {
            this.setupBadgeVisible(changes['visible'].currentValue as boolean);
        }

        keys.splice(0);
        keys = null;
    }

    ngAfterViewInit(): void {
        this.element = this.initialize();

        this.changeBadgeColor(this.color);
        this.setupBadgeDotted(this.dotted, this.element);
        this.setupBadgeOverlapped(this.overlapped);
        this.changeBadgePosition(this.position, this.element);
        this.changeBadgeText(this.text, this.element);
        this.setupBadgeVisible(this.visible);
    }

    protected initialize(): HTMLElement {
        const element: HTMLElement = this._element.nativeElement;
        this._renderer.addClass(this._element.nativeElement, 'badge');

        const dotElement: HTMLElement = this._renderer.createElement('span');
        this._renderer.addClass(dotElement, 'badge-dot');
        this._renderer.appendChild(element, dotElement);

        return dotElement;
    }

    protected changeBadgeColor(color: NGXSeasonBadgeColor): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-badge-color', `${color}`);
    }

    protected setupBadgeDotted(dotted: boolean, element: HTMLElement): void {
        if (dotted && !this.text) {
            this._renderer.setStyle(element, 'padding', '0px');
        } else {
            this._renderer.removeStyle(element, 'padding');
        }
    }

    protected setupBadgeOverlapped(overlapped: boolean): void {
        const element: HTMLElement = this._element.nativeElement;

        if (overlapped) {
            this._renderer.addClass(element, 'badge-overlap');
        } else {
            this._renderer.removeClass(element, 'badge-overlap');
        }
    }

    protected changeBadgePosition(position: NGXSeasonBadgePosition, element: HTMLElement): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            
            if (this.overlapped) {
                if (position === 'top') {
                    this._renderer.setStyle(element, 'top', `calc(0px - ${element.offsetHeight}px * 0.5)`);
                }
        
                if (position === 'top-left') {
                    this._renderer.setStyle(element, 'top', `calc(0px - ${element.offsetHeight}px * 0.5)`);
                    this._renderer.setStyle(element, 'left', `calc(0px - ${element.offsetWidth}px * 0.5)`);
                }
        
                if (position === 'top-right') { 
                    this._renderer.setStyle(element, 'top', `calc(0px - ${element.offsetHeight}px * 0.5)`);
                    this._renderer.setStyle(element, 'right', `calc(0px - ${element.offsetWidth}px * 0.5)`);
                }
    
                if (position === 'bottom') {
                    this._renderer.setStyle(element, 'bottom', `calc(0px - ${element.offsetHeight}px * 0.5)`);
                }
        
                if (position === 'bottom-left') {
                    this._renderer.setStyle(element, 'bottom', `calc(0px - ${element.offsetHeight}px * 0.5)`);
                    this._renderer.setStyle(element, 'left', `calc(0px - ${element.offsetWidth}px * 0.5)`);
                }
        
                if (position === 'bottom-right') { 
                    this._renderer.setStyle(element, 'bottom', `calc(0px - ${element.offsetHeight}px * 0.5)`);
                    this._renderer.setStyle(element, 'right', `calc(0px - ${element.offsetWidth}px * 0.5)`);
                }
                
                if (position === 'left') {
                    this._renderer.setStyle(element, 'left', `calc(${element.offsetWidth}px * 0.25)`);
                }
        
                if (position === 'right') { 
                    this._renderer.setStyle(element, 'right', `calc(${element.offsetWidth}px * 0.25)`);
                }
            }
        });
    }

    protected changeBadgeText(text: string | undefined, element: HTMLElement): void {
        const innerText = this._renderer.createText(text ? text : '');
        this._renderer.appendChild(element, innerText);
    }

    protected setupBadgeVisible(visible: boolean): void {
        const element: HTMLElement = this._element.nativeElement;

        if (visible) {
            this._renderer.setAttribute(element, 'data-badge-state', 'visible');
        } else {
            this._renderer.setAttribute(element, 'data-badge-state', 'hidden');
        }
    }

}