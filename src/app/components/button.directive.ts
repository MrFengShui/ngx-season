import { AfterViewInit, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { coerceBooleanProperty } from '@angular/cdk/coercion';

export type NGXSeasonButtonColor = 'primary' | 'accent' | 'success' | 'warning' | 'failure' | 'info' | 'default';
export type NGXSeasonButtonSize = 'sm' | 'md' | 'lg';

@Directive({
    selector: 'button[ngx-sui-Button], a[ngx-sui-Button]'
})
export class NGXSeasonButtonDirective implements OnChanges, AfterViewInit {

    @Input('btnBlock') 
    set blocked(blocked: boolean | string) {
        this._blocked = coerceBooleanProperty(blocked);
    }

    get blocked(): boolean {
        return this._blocked;
    }

    @Input('btnColor') 
    set color(color: NGXSeasonButtonColor) {
        this._color = color;
    }

    get color(): NGXSeasonButtonColor {
        return this._color;
    }

    @Input('btnDisable') 
    set disabled(disabled: boolean | string) {
        this._disabled = coerceBooleanProperty(disabled);
    }

    get disabled(): boolean {
        return this._disabled;
    }

    @Input('btnSize') 
    set size(size: NGXSeasonButtonSize) {
        this._size = size;
    }

    get size(): NGXSeasonButtonSize {
        return this._size;
    }

    private _blocked: boolean = false;
    private _color: NGXSeasonButtonColor = 'default';
    private _disabled: boolean = false;
    private _size: NGXSeasonButtonSize = 'md';

    protected readonly COLORS: NGXSeasonButtonColor[] = ['primary',  'accent',  'success',  'warning',  'failure',  'info'];
    protected readonly SIZES: NGXSeasonButtonSize[] = ['sm',  'md',  'lg'];

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        let keys: string[] | null = Object.keys(changes);
        
        if (keys.includes('blocked')) {
            this.setupButtonBlocked(changes['blocked'].currentValue);
        }

        if (keys.includes('color')) {
            this.changeButtonColor(changes['color'].currentValue);
        }
        
        if (keys.includes('disabled')) {
            this.setupButtonDisabled(changes['disabled'].currentValue);
        }
        
        if (keys.includes('size')) {
            this.changeButtonSize(changes['size'].currentValue);
        }
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'btn');
        this.setupButtonBlocked(this.blocked);
        this.changeButtonColor(this.color);
        this.setupButtonDisabled(this.disabled);
        this.changeButtonSize(this.size);
    }

    protected setupButtonBlocked(blocked: boolean): void {
        let element: HTMLElement = this._element.nativeElement;

        Promise.resolve().then(() => {
            if (blocked) {
                this._renderer.addClass(element, 'btn-block');
            } else {
                this._renderer.removeClass(element, 'btn-block');
            }
        })
    }

    protected changeButtonColor(color: NGXSeasonButtonColor): void {
        const element: HTMLElement = this._element.nativeElement;
        let value: string;

        for (let item of this.COLORS) {
            value = `btn-${item}`;

            if (element.classList.contains(value)) this._renderer.removeClass(element, value);
        }

        Promise.resolve().then(() => this._renderer.addClass(element, `btn-${color}`))
    }

    protected setupButtonDisabled(disabled: boolean): void {
        const element: HTMLElement = this._element.nativeElement;

        Promise.resolve().then(() => {
            if (disabled) {
                this._renderer.setAttribute(element, 'disabled', '');
            } else {
                this._renderer.removeAttribute(element, 'disabled');
            }
        })
    }

    protected changeButtonSize(size: NGXSeasonButtonSize): void {
        const element: HTMLElement = this._element.nativeElement;
        let value: string;

        for (let item of this.SIZES) {
            value = `btn-${item}`;

            if (element.classList.contains(value)) this._renderer.removeClass(element, value);
        }

        Promise.resolve().then(() => this._renderer.addClass(element, `btn-${size}`));
    }

}

@Directive({
    selector: 'button[ngx-sui-OutlineButton], a[ngx-sui-OutlineButton]'
})
export class NGXSeasonOutlineButtonDirective extends NGXSeasonButtonDirective {
    
    protected override changeButtonColor(color: NGXSeasonButtonColor): void {
        const element: HTMLElement = this._element.nativeElement;
        let value: string;

        for (let item of this.COLORS) {
            value = `btn-outline-${item}`;

            if (element.classList.contains(value)) this._renderer.removeClass(element, value);
        }

        Promise.resolve().then(() => this._renderer.addClass(element, `btn-outline-${color}`));
    }

}

@Directive({
    selector: 'button[ngx-sui-FlatButton], a[ngx-sui-FlatButton]'
})
export class NGXSeasonFlatButtonDirective extends NGXSeasonButtonDirective {
    
    protected override changeButtonColor(color: NGXSeasonButtonColor): void {
        const element: HTMLElement = this._element.nativeElement;
        let value: string;

        for (let item of this.COLORS) {
            value = `btn-flat-${item}`;

            if (element.classList.contains(value)) this._renderer.removeClass(element, value);
        }

        Promise.resolve().then(() => this._renderer.addClass(element, `btn-flat-${color}`));
    }

}

@Directive({
    selector: 'button[ngx-sui-LinkButton], a[ngx-sui-LinkButton]'
})
export class NGXSeasonLinkButtonDirective extends NGXSeasonFlatButtonDirective {
    
    protected override changeButtonColor(color: NGXSeasonButtonColor): void {
        Promise.resolve().then(() => this._renderer.addClass(this._element.nativeElement, `btn-link`));
    }

}