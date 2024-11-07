import { AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { AnimationBuilder } from "@angular/animations";
import { NGXSeasonIconName } from "../icon/icon.component";

export type NGXSeasonButtonColor = 'primary' | 'accent' | 'success' | 'warning' | 'failure' | 'info' | 'default';
export type NGXSeasonButtonSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
    selector: 'button[ngx-sui-Button], a[ngx-sui-Button]',
    templateUrl: './button.component.html'
})
export class NGXSeasonButtonComponent implements OnChanges, AfterViewInit {

    @Input('btnBlocked') 
    set blocked(blocked: boolean | string) {
        this._blocked = coerceBooleanProperty(blocked);
    }

    get blocked(): boolean {
        return this._blocked;
    }

    @Input('btnCircled') 
    set circled(circled: boolean | string) {
        this._circled = coerceBooleanProperty(circled);
    }

    get circled(): boolean {
        return this._circled;
    }

    @Input('btnColor') 
    set color(color: NGXSeasonButtonColor | null) {
        this._color = color ? color : 'default';
    }

    get color(): NGXSeasonButtonColor {
        return this._color;
    }

    @Input('btnIconDegree')
    set degree(degree: number | string) {
        this._degree = coerceNumberProperty(degree);
    }

    get degree(): number {
        return this._degree;
    }

    @Input('btnIconDegreeStart')
    set degreeStart(degreeStart: number | string) {
        this._degreeStart = coerceNumberProperty(degreeStart);
    }

    get degreeStart(): number {
        return this._degreeStart;
    }

    @Input('btnIconDegreeFinal')
    set degreeFinal(degreeFinal: number | string) {
        this._degreeFinal = coerceNumberProperty(degreeFinal);
    }

    get degreeFinal(): number {
        return this._degreeFinal;
    }

    @Input('btnDisabled') 
    set disabled(disabled: boolean | string) {
        this._disabled = coerceBooleanProperty(disabled);
    }

    get disabled(): boolean {
        return this._disabled;
    }

    @Input('btnIcon')
    set icon(icon: NGXSeasonIconName | undefined) {
        this._icon = icon;
    }

    get icon(): NGXSeasonIconName | undefined {
        return this._icon;
    }

    @Input('btnIconOnly')
    set iconOnly(iconOnly: boolean | string) {
        this._iconOnly = coerceBooleanProperty(iconOnly);
    }

    get iconOnly(): boolean {
        return this._iconOnly;
    }

    @Input('btnIconRotateDuration')
    set rotateDuration(rotateDuration: number | string) {
        this._rotateDuration = coerceNumberProperty(rotateDuration);
    }

    get rotateDuration(): number {
        return this._rotateDuration;
    }

    @Input('btnIconRotateInfinite')
    set rotateInfinite(rotateInfinite: boolean | string) {
        this._rotateInfinite = coerceBooleanProperty(rotateInfinite);
    }

    get rotateInfinite(): boolean {
        return this._rotateInfinite;
    }

    @Input('btnSize') 
    set size(size: NGXSeasonButtonSize) {
        this._size = size;
    }

    get size(): NGXSeasonButtonSize {
        return this._size;
    }

    private _blocked: boolean = false;
    private _circled: boolean = false;
    private _color: NGXSeasonButtonColor = 'default';
    private _degree: number = 0;
    private _degreeStart: number = 0;
    private _degreeFinal: number = 0;
    private _disabled: boolean = false;
    private _icon: NGXSeasonIconName | undefined;
    private _iconOnly: boolean = false;
    private _rotateDuration: number = 0;
    private _rotateInfinite: boolean = false;
    private _size: NGXSeasonButtonSize = 'md';

    @HostListener('mouseenter', ['$event'])
    protected handleHostMouseEnterEvent(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        this.isLinkHover = true;
    }

    @HostListener('mouseleave', ['$event'])
    protected handleHostMouseLeaveEvent(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        this.isLinkHover = false;
    }

    protected isLinkHover: boolean = false;

    constructor(
        protected _builder: AnimationBuilder,
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        let keys: string[] | null = Object.keys(changes);
        
        if (keys.includes('blocked')) {
            this.setupButtonBlocked(changes['blocked'].currentValue as boolean);
        }
        
        if (keys.includes('circled')) {
            this.setupButtonCircled(changes['circled'].currentValue as boolean);
        }

        if (keys.includes('color')) {
            this.changeButtonColor(changes['color'].currentValue as NGXSeasonButtonColor);
        }
        
        if (keys.includes('disabled')) {
            this.setupButtonDisabled(changes['disabled'].currentValue as boolean);
        }
        
        if (keys.includes('iconOnly')) {
            this.setupButtonIconOnly(changes['iconOnly'].currentValue as boolean);
        }
        
        if (keys.includes('size')) {
            this.changeButtonSize(changes['size'].currentValue as NGXSeasonButtonSize);
        }

        if (keys.includes('shadow')) {
            this.setupButtonDisabled(changes['shadow'].currentValue as boolean);
        }
        
        keys.splice(0);
        keys = null;
    }

    ngAfterViewInit(): void {
        this.initialize();
        this.setupButtonBlocked(this.blocked);
        this.changeButtonColor(this.color);
        this.setupButtonDisabled(this.disabled);
        this.changeButtonSize(this.size);
    }

    protected initialize(): void {
        const element: HTMLElement = this._element.nativeElement;
        this._renderer.addClass(element, 'btn');
        this._renderer.addClass(element, 'btn-basic');
    }

    protected setupButtonBlocked(blocked: boolean): void {
        let element: HTMLElement = this._element.nativeElement;

        let task = setTimeout(() => {
            clearTimeout(task);

            if (blocked) {
                this._renderer.addClass(element, 'btn-block');
            } else {
                this._renderer.removeClass(element, 'btn-block');
            }
        });
    }

    protected setupButtonCircled(circled: boolean): void {
        let element: HTMLElement = this._element.nativeElement;

        let task = setTimeout(() => {
            clearTimeout(task);

            if (circled && this.iconOnly) {
                this._renderer.addClass(element, 'btn-circle');
            } else {
                this._renderer.removeClass(element, 'btn-circle');
            }
        });
    }

    protected changeButtonColor(color: NGXSeasonButtonColor): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-button-color', `${color}`);
    }

    protected setupButtonDisabled(disabled: boolean): void {
        const element: HTMLElement = this._element.nativeElement;

        let task = setTimeout(() => {
            clearTimeout(task);

            if (disabled) {
                this._renderer.setAttribute(element, 'disabled', '');
            } else {
                this._renderer.removeAttribute(element, 'disabled');
            }
        });
    }

    protected setupButtonIconOnly(iconOnly: boolean): void {
        let element: HTMLElement = this._element.nativeElement;

        let task = setTimeout(() => {
            clearTimeout(task);

            if (iconOnly && this.iconOnly) {
                this._renderer.addClass(element, 'btn-icon-only');
            } else {
                this._renderer.removeClass(element, 'btn-icon-only');
            }
        });
    }

    protected changeButtonSize(size: NGXSeasonButtonSize): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-button-size', `${size}`);
    }

    protected checkWrapperContent(wrapper: HTMLElement): boolean {
        return wrapper.innerHTML.length > 0;
    }

}

@Component({
    selector: 'button[ngx-sui-OutlineButton], a[ngx-sui-OutlineButton]',
    templateUrl: './button.component.html'
})
export class NGXSeasonOutlineButtonComponent extends NGXSeasonButtonComponent {
    
    protected override initialize(): void {
        const element: HTMLElement = this._element.nativeElement;
        this._renderer.addClass(element, 'btn');
        this._renderer.addClass(element, 'btn-outline');
    }

}

@Component({
    selector: 'button[ngx-sui-SolidButton], a[ngx-sui-SolidButton]',
    templateUrl: './button.component.html'
})
export class NGXSeasonSolidButtonComponent extends NGXSeasonButtonComponent {
    
    @Input('btnShadow')
    set shadow(shadow: boolean | string) {
        this._shadow = coerceBooleanProperty(shadow);
    }

    get shadow(): boolean {
        return this._shadow;
    }

    private _shadow: boolean = false;

    override ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
        
        let keys: string[] | null = Object.keys(changes);
        
        if (keys.includes('shadow')) {
            this.setupButtonDisabled(changes['shadow'].currentValue as boolean);
        }
        
        keys.splice(0);
        keys = null;
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this.setupButtonShadow(this.shadow);
    }

    protected override initialize(): void {
        const element: HTMLElement = this._element.nativeElement;
        this._renderer.addClass(element, 'btn');
        this._renderer.addClass(element, 'btn-solid');
    }

    protected setupButtonShadow(shadow: boolean): void {
        const element: HTMLElement = this._element.nativeElement;
        
        let task = setTimeout(() => {
            clearTimeout(task);
            
            if (shadow) {
                this._renderer.addClass(element, `btn-shadow`);
            } else {
                this._renderer.removeClass(element, `btn-shadow`);
            }
        });
    }

}

