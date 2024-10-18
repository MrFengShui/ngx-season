import { AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { coerceBooleanProperty } from '@angular/cdk/coercion';

export type NGXSeasonButtonColor = 'primary' | 'accent' | 'success' | 'warning' | 'failure' | 'info' | 'default';
export type NGXSeasonButtonSize = 'sm' | 'md' | 'lg';

@Component({
    selector: 'button[ngx-sui-Button], a[ngx-sui-Button]',
    template: `
        <ngx-sui-icon [iconShape]="icon" [iconSolid]="isLinkHover || disabled" *ngIf="icon"></ngx-sui-icon>
        <span class="btn-wrapper"><ng-content></ng-content></span>
    `
})
export class NGXSeasonButtonComponent implements OnChanges, AfterViewInit {

    @Input('btnBlocked') 
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

    @Input('btnDisabled') 
    set disabled(disabled: boolean | string) {
        this._disabled = coerceBooleanProperty(disabled);
    }

    get disabled(): boolean {
        return this._disabled;
    }

    @Input('btnIcon')
    set icon(icon: string | undefined) {
        this._icon = icon;
    }

    get icon(): string | undefined {
        return this._icon;
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
    private _icon: string | undefined;
    private _size: NGXSeasonButtonSize = 'md';

    @HostListener('mouseenter')
    protected handleHostMouseEnterEvent(): void {
        this.isLinkHover = true;
    }

    @HostListener('mouseleave')
    protected handleHostMouseLeaveEvent(): void {
        this.isLinkHover = false;
    }

    protected readonly COLORS: NGXSeasonButtonColor[] = ['primary',  'accent',  'success',  'warning',  'failure',  'info'];
    protected readonly SIZES: NGXSeasonButtonSize[] = ['sm',  'md',  'lg'];

    protected isLinkHover: boolean = false;

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

    protected checkWrapperContent(wrapper: HTMLElement): boolean {
        return wrapper.innerHTML.length > 0;
    }

}

@Component({
    selector: 'button[ngx-sui-IconButton], a[ngx-sui-IconButton]',
    template: `<ngx-sui-icon [iconShape]="icon ? icon : ''" [iconSolid]="isLinkHover || disabled" [iconSize]="size"></ngx-sui-icon>`
})
export class NGXSeasonIconButtonComponent extends NGXSeasonButtonComponent {
    
    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.setAttribute(this._element.nativeElement, 'data-type', 'icon');
    }

    protected override changeButtonColor(color: NGXSeasonButtonColor): void {
        const element: HTMLElement = this._element.nativeElement;
        let value: string;

        for (let item of this.COLORS) {
            value = `btn-icon-${item}`;

            if (element.classList.contains(value)) this._renderer.removeClass(element, value);
        }

        Promise.resolve().then(() => this._renderer.addClass(element, `btn-icon-${color}`))
    }

}

@Component({
    selector: 'button[ngx-sui-OutlineButton], a[ngx-sui-OutlineButton]',
    template: `
        <ngx-sui-icon [iconShape]="icon" [iconSolid]="isLinkHover || disabled" *ngIf="icon"></ngx-sui-icon>
        <span class="btn-wrapper"><ng-content></ng-content></span>
    `
})
export class NGXSeasonOutlineButtonComponent extends NGXSeasonButtonComponent {
    
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

@Component({
    selector: 'button[ngx-sui-OutlineIconButton], a[ngx-sui-OutlineIconButton]',
    template: `<ngx-sui-icon [iconShape]="icon ? icon : ''" [iconSolid]="isLinkHover || disabled" [iconSize]="size"></ngx-sui-icon>`
})
export class NGXSeasonOutlineIconButtonComponent extends NGXSeasonOutlineButtonComponent {
    
    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.setAttribute(this._element.nativeElement, 'data-type', 'icon');
    }

    protected override changeButtonColor(color: NGXSeasonButtonColor): void {
        const element: HTMLElement = this._element.nativeElement;
        let value: string;

        for (let item of this.COLORS) {
            value = `btn-outline-icon-${item}`;

            if (element.classList.contains(value)) this._renderer.removeClass(element, value);
        }

        Promise.resolve().then(() => this._renderer.addClass(element, `btn-outline-icon-${color}`));
    }

}

@Component({
    selector: 'button[ngx-sui-FlatButton], a[ngx-sui-FlatButton]',
    template: `
        <ngx-sui-icon [iconShape]="icon" [iconSolid]="isLinkHover || disabled" *ngIf="icon"></ngx-sui-icon>
        <span class="btn-wrapper"><ng-content></ng-content></span>
    `
})
export class NGXSeasonFlatButtonComponent extends NGXSeasonButtonComponent {
    
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

@Component({
    selector: 'button[ngx-sui-FlatIconButton], a[ngx-sui-FlatIconButton]',
    template: `<ngx-sui-icon [iconShape]="icon ? icon : ''" [iconSolid]="isLinkHover || disabled" [iconSize]="size"></ngx-sui-icon>`
})
export class NGXSeasonFlatIconButtonComponent extends NGXSeasonFlatButtonComponent {
    
    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.setAttribute(this._element.nativeElement, 'data-type', 'icon');
    }

    protected override changeButtonColor(color: NGXSeasonButtonColor): void {
        const element: HTMLElement = this._element.nativeElement;
        let value: string;

        for (let item of this.COLORS) {
            value = `btn-flat-icon-${item}`;

            if (element.classList.contains(value)) this._renderer.removeClass(element, value);
        }

        Promise.resolve().then(() => this._renderer.addClass(element, `btn-flat-icon-${color}`));
    }

}

@Component({
    selector: 'button[ngx-sui-LinkButton], a[ngx-sui-LinkButton]',
    template: `
        <ngx-sui-icon [iconShape]="icon" [iconSolid]="isLinkHover || disabled" *ngIf="icon"></ngx-sui-icon>
        <span class="btn-wrapper"><ng-content></ng-content></span>
    `
})
export class NGXSeasonLinkButtonComponent extends NGXSeasonFlatButtonComponent {
    
    protected override changeButtonColor(color: NGXSeasonButtonColor): void {
        Promise.resolve().then(() => this._renderer.addClass(this._element.nativeElement, `btn-link`));
    }

}

@Component({
    selector: 'button[ngx-sui-LinkIconButton], a[ngx-sui-LinkIconButton]',
    template: `
        <ngx-sui-icon [iconShape]="icon" [iconSolid]="isLinkHover || disabled" *ngIf="icon"></ngx-sui-icon>
        <span class="btn-wrapper"><ng-content></ng-content></span>
    `
})
export class NGXSeasonLinkIconButtonComponent extends NGXSeasonLinkButtonComponent {
    
    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.setAttribute(this._element.nativeElement, 'data-type', 'icon');
    }

    protected override changeButtonColor(color: NGXSeasonButtonColor): void {
        Promise.resolve().then(() => this._renderer.addClass(this._element.nativeElement, `btn-link-icon`));
    }

}