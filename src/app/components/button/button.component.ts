import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Inject, InjectionToken, Input, OnChanges, OnDestroy, Renderer2, RendererStyleFlags2, SimpleChanges } from "@angular/core";
import { BehaviorSubject, Subject } from 'rxjs';

import { NGX_SEASON_ICONS_SIZE_MAP_TOKEN, NGXSeasonIconName } from "../icon/icon.component";

import { NGXSeasonColorPalette } from 'src/app/utils/_palette.utils';
import { NGXSeasonSizeMap, NGXSeasonSizeOption } from 'src/app/utils/_size.utils';

export const NGX_SEASON_BUTTON_BORDER_SIZE_MAP_TOKEN: InjectionToken<NGXSeasonSizeMap> = new InjectionToken('NGX_SEASON_BUTTON_BORDER_SIZE_TOKEN');
export const NGX_SEASON_BUTTON_FONT_SIZE_MAP_TOKEN: InjectionToken<NGXSeasonSizeMap> = new InjectionToken('NGX_SEASON_BUTTON_BORDER_SIZE_TOKEN');

export type NGXSeasonButtonStyle = 'flat' | 'outline' | 'solid';

@Component({
    selector: '',
    template: ''
})
export abstract class NGXSeasonButtonComponent implements OnChanges, AfterViewInit {

    @Input('btnColor')
    set color(color: NGXSeasonColorPalette | undefined | null) {
        this._color = color || 'default';
    }

    get color(): NGXSeasonColorPalette {
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

    @Input('btnIcon')
    set icon(icon: NGXSeasonIconName | undefined) {
        this._icon = icon;
    }

    get icon(): NGXSeasonIconName | undefined {
        return this._icon;
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

    @Input('btnDisabled')
    set disabled(disabled: boolean | string | undefined | null) {
        this._disabled = coerceBooleanProperty(disabled);
    }

    get disabled(): boolean {
        return this._disabled;
    }

    @Input('btnShadow')
    set shadow(shadow: boolean | string | undefined | null) {
        this._shadow = coerceBooleanProperty(shadow);
    }

    get shadow(): boolean {
        return this._shadow;
    }

    @Input('btnSize')
    set size(size: NGXSeasonSizeOption | undefined | null) {
        this._size = size || 'md';
    }

    get size(): NGXSeasonSizeOption {
        return this._size;
    }

    @Input('btnStyle')
    set style(style: NGXSeasonButtonStyle | undefined | null) {
        this._style = style || 'outline';
    }

    get style(): NGXSeasonButtonStyle {
        return this._style;
    }

    private _color: NGXSeasonColorPalette = 'default';
    private _degree: number = 0;
    private _degreeStart: number = 0;
    private _degreeFinal: number = 0;
    private _icon: NGXSeasonIconName | undefined;
    private _rotateDuration: number = 0;
    private _rotateInfinite: boolean = false;
    private _disabled: boolean = false;
    private _shadow: boolean = false;
    private _size: NGXSeasonSizeOption = 'md';
    private _style: NGXSeasonButtonStyle = 'outline';

    @HostListener('mouseenter', ['$event'])
    protected handleHostMouseEnterEvent(event: MouseEvent): void {
        event.stopPropagation();
        this.isHover = true;
    }

    @HostListener('mouseleave', ['$event'])
    protected handleHostMouseLeaveEvent(event: MouseEvent): void {
        event.stopPropagation();
        this.isHover = false;
    }

    protected isHover: boolean = false;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,

        @Inject(NGX_SEASON_ICONS_SIZE_MAP_TOKEN)
        protected _iconSizeMap: NGXSeasonSizeMap,
        @Inject(NGX_SEASON_BUTTON_BORDER_SIZE_MAP_TOKEN)
        protected _borderSizeMap: NGXSeasonSizeMap
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'color') this.changeButtonColor(changes[name].currentValue as NGXSeasonColorPalette);

            if (name === 'disabled') this.setupButtonDisabled(coerceBooleanProperty(changes[name].currentValue));

            if (name === 'shadow') this.setupButtonShadow(coerceBooleanProperty(changes[name].currentValue));

            if (name === 'size') this.changeButtonSize(changes[name].currentValue as NGXSeasonSizeOption);

            if (name === 'style') this.changeButtonStyle(changes[name].currentValue as NGXSeasonButtonStyle);
        }
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'button');

        this.changeButtonColor(this.color);
        this.setupButtonDisabled(this.disabled);
        this.setupButtonShadow(this.shadow);
        this.changeButtonSize(this.size);
        this.changeButtonStyle(this.style);
    }

    fetchHostElement(): HTMLElement {
        return this._element.nativeElement;
    }

    protected changeButtonColor(color: NGXSeasonColorPalette): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-button-color', color);
    }

    protected setupButtonDisabled(disabled: boolean): void {
        const element: HTMLElement = this._element.nativeElement;

        if (disabled) {
            this._renderer.setAttribute(element, 'disabled', '');
        } else {
            this._renderer.removeAttribute(element, 'disabled');
        }
    }

    protected changeButtonSize(size: NGXSeasonSizeOption): void {
        const borderSize: number = this._borderSizeMap[size];
        const contentSize: number = this._iconSizeMap[size];
        this._renderer.setStyle(this._element.nativeElement, '--button-border-size', `${borderSize}px`, RendererStyleFlags2.DashCase);
        this._renderer.setStyle(this._element.nativeElement, '--button-content-size', `${contentSize}px`, RendererStyleFlags2.DashCase);
    }

    protected changeButtonStyle(style: NGXSeasonButtonStyle): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-button-style', style);
    }

    protected setupButtonShadow(shadow: boolean): void {
        const element: HTMLElement = this._element.nativeElement;

        if (shadow) this._renderer.addClass(element, 'button-shadow');
        else this._renderer.removeClass(element, 'button-shadow');
    }

}

@Component({
    selector: 'button[ngx-sui-IconButton]',
    template: `<ngx-sui-icon [iconColor]="color" [iconDegree]="degree" [iconDegreeStart]="degreeStart" [iconDegreeFinal]="degreeFinal" [iconRotateDuration]="rotateDuration" [iconRotateInfinite]="rotateInfinite" [iconShape]="icon" [iconSize]="size" [iconSolid]="disabled || isHover"></ngx-sui-icon>`
})
export class NGXSeasonIconButtonComponent extends NGXSeasonButtonComponent {

    @Input('btnCircled')
    set circled(circled: boolean | string) {
        this._circled = coerceBooleanProperty(circled);
    }

    get circled(): boolean {
        return this._circled;
    }

    private _circled: boolean = false;

    override ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        for (const name in changes) {
            if (name === 'circled') this.setupButtonCircled(coerceBooleanProperty(changes[name].currentValue));
        }
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.addClass(this._element.nativeElement, 'icon-button');

        this.setupButtonCircled(this.circled);
    }

    protected setupButtonCircled(circled: boolean): void {
        let element: HTMLElement = this._element.nativeElement;

        if (circled) {
            this._renderer.addClass(element, 'button-circle');
        } else {
            this._renderer.removeClass(element, 'button-circle');
        }
    }

}

@Component({
    selector: 'button[ngx-sui-TextButton]',
    template: `
        <ngx-sui-icon [iconDegree]="degree" [iconDegreeStart]="degreeStart" [iconDegreeFinal]="degreeFinal" [iconRotateDuration]="rotateDuration" [iconRotateInfinite]="rotateInfinite" [iconShape]="icon" [iconSize]="size$.asObservable() | async" [iconSolid]="(disabled$.asObservable() | async) || isHover" *ngIf="icon"></ngx-sui-icon>
        <span class="button-wrapper">{{ text }}</span>
    `
})
export class NGXSeasonTextButtonComponent extends NGXSeasonButtonComponent implements OnDestroy {

    @Input('btnBlocked')
    set blocked(blocked: boolean | string | undefined | null) {
        this._blocked = coerceBooleanProperty(blocked);
    }

    get blocked(): boolean {
        return this._blocked;
    }

    @Input('btnText')
    set text(text: string | undefined | null) {
        this._text = text || undefined;
    }

    get text(): string | undefined {
        return this._text;
    }

    private _blocked: boolean = false;
    private _text: string | undefined;

    protected disabled$: Subject<boolean> = new BehaviorSubject(this.disabled);
    protected size$: Subject<NGXSeasonSizeOption> = new BehaviorSubject(this.size);

    override ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        for (const name in changes) {
            if (name === 'blocked') this.setupButtonBlocked(coerceBooleanProperty(changes[name].currentValue));
        }
    }

    ngOnDestroy(): void {
        this.disabled$.complete();
        this.size$.complete();
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this.setupButtonBlocked(this.blocked);

        this._renderer.addClass(this._element.nativeElement, 'text-button');
    }

    changeButtonAttributes(color: NGXSeasonColorPalette, disabled: boolean, size: NGXSeasonSizeOption, style: NGXSeasonButtonStyle): void {
        this.changeButtonColor(color);
        this.setupButtonDisabled(disabled);
        this.changeButtonSize(size);
        this.changeButtonStyle(style);
    }

    protected setupButtonBlocked(blocked: boolean): void {
        let element: HTMLElement = this._element.nativeElement;

        if (blocked) {
            this._renderer.addClass(element, 'button-block');
        } else {
            this._renderer.removeClass(element, 'button-block');
        }
    }

    protected override changeButtonSize(size: NGXSeasonSizeOption): void {
        super.changeButtonSize(size);
        this.size$.next(size);
    }

    protected override setupButtonDisabled(disabled: boolean): void {
        super.setupButtonDisabled(disabled);
        this.disabled$.next(disabled);
    }

}

@Component({
    selector: 'a[ngx-sui-LinkButton]',
    template: `
        <ngx-sui-icon [iconDegree]="degree" [iconDegreeStart]="degreeStart" [iconDegreeFinal]="degreeFinal" [iconRotateDuration]="rotateDuration" [iconRotateInfinite]="rotateInfinite" [iconShape]="icon" [iconSize]="size" [iconSolid]="disabled || isHover" *ngIf="icon"></ngx-sui-icon>
        <span class="button-wrapper">{{ text }}</span>
    `
})
export class NGXSeasonLinkButtonComponent extends NGXSeasonTextButtonComponent {

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        const element: HTMLElement = this._element.nativeElement;
        this._renderer.removeClass(element, 'text-button');
        this._renderer.addClass(element, 'link-button');
    }

    protected override changeButtonStyle(style: NGXSeasonButtonStyle): void {
        super.changeButtonStyle('flat');
    }

}
