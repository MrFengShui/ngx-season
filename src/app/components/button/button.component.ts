import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterViewInit, Component, ElementRef, Inject, InjectionToken, Input, OnChanges, Renderer2, RendererStyleFlags2, SimpleChanges } from "@angular/core";

import { NGX_SEASON_ICONS_SIZE_MAP_TOKEN, NGXSeasonIconSizeMap } from "../icon/icon.component";

import { NGXSeasonColorPalette } from 'src/app/utils/_palette.utils';

export const NGX_SEASON_BUTTON_BORDER_SIZE_MAP_TOKEN: InjectionToken<NGXSeasonButtonBorderSizeMap> = new InjectionToken('NGX_SEASON_BUTTON_BORDER_SIZE_TOKEN');
export const NGX_SEASON_BUTTON_FONT_SIZE_MAP_TOKEN: InjectionToken<NGXSeasonButtonFontSizeMap> = new InjectionToken('NGX_SEASON_BUTTON_BORDER_SIZE_TOKEN');

export type NGXSeasonButtonSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';

export type NGXSeasonButtonBorderSizeMap = { sm: number, md: number, lg: number, xl: number, xxl: number, xxxl: number };
export type NGXSeasonButtonFontSizeMap = { sm: number, md: number, lg: number, xl: number, xxl: number, xxxl: number };

@Component({
    selector: '',
    template: ''
})
export abstract class NGXSeasonButtonComponent implements OnChanges, AfterViewInit {

    @Input('btnBlocked')
    set blocked(blocked: boolean | string | null) {
        this._blocked = coerceBooleanProperty(blocked);
    }

    get blocked(): boolean {
        return this._blocked;
    }

    @Input('btnColor')
    set color(color: NGXSeasonColorPalette | null) {
        this._color = color ? color as NGXSeasonColorPalette : 'default';
    }

    get color(): NGXSeasonColorPalette {
        return this._color;
    }

    @Input('btnDisabled')
    set disabled(disabled: boolean | string | null) {
        this._disabled = coerceBooleanProperty(disabled);
    }

    get disabled(): boolean {
        return this._disabled;
    }

    @Input('btnSize')
    set size(size: NGXSeasonButtonSize | null) {
        this._size = size ? size : 'lg';
    }

    get size(): NGXSeasonButtonSize {
        return this._size;
    }

    private _blocked: boolean = false;
    private _color: NGXSeasonColorPalette = 'default';
    private _disabled: boolean = false;
    private _size: NGXSeasonButtonSize = 'lg';

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,

        @Inject(NGX_SEASON_ICONS_SIZE_MAP_TOKEN)
        protected _iconSizeMap: NGXSeasonIconSizeMap,
        @Inject(NGX_SEASON_BUTTON_BORDER_SIZE_MAP_TOKEN)
        protected _borderSizeMap: NGXSeasonButtonBorderSizeMap,
        @Inject(NGX_SEASON_BUTTON_FONT_SIZE_MAP_TOKEN)
        protected _fontSizeMap: NGXSeasonButtonFontSizeMap
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'blocked') this.setupButtonBlocked(coerceBooleanProperty(changes[name].currentValue));

            if (name === 'color') this.changeButtonColor(changes[name].currentValue as NGXSeasonColorPalette);

            if (name === 'disabled') this.setupButtonDisabled(coerceBooleanProperty(changes[name].currentValue));

            if (name === 'size') this.changeButtonSize(changes[name].currentValue as NGXSeasonButtonSize);
        }
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'button');

        this.setupButtonBlocked(this.blocked);
        this.changeButtonColor(this.color);
        this.setupButtonDisabled(this.disabled);
        this.changeButtonSize(this.size);
    }

    protected abstract setupButtonBlocked(blocked: boolean): void;

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

    protected changeButtonSize(size: NGXSeasonButtonSize): void {
        const borderSize: number = this._borderSizeMap[size];
        const contentSize: number = this._iconSizeMap[size];
        const fontSize: number = this._fontSizeMap[size];
        this._renderer.setStyle(this._element.nativeElement, '--button-border-size', `${borderSize}px`, RendererStyleFlags2.DashCase);
        this._renderer.setStyle(this._element.nativeElement, '--button-content-size', `${contentSize}px`, RendererStyleFlags2.DashCase);
        this._renderer.setStyle(this._element.nativeElement, '--button-font-size', `${fontSize}px`, RendererStyleFlags2.DashCase);
    }

}


