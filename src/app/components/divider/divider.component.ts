import { AfterViewInit, Component, ElementRef, Inject, InjectionToken, Input, OnChanges, Renderer2, RendererStyleFlags2, SimpleChanges } from "@angular/core";

export const NGX_SEASON_DIVIDER_THICKNESS_MAP_TOKEN: InjectionToken<NGXSeasonDividerThicknessMap> = new InjectionToken('NGX_SEASON_DIVIDER_THICKNESS_MAP_TOKEN');

export type NGXSeasonDividerColor = 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'failure' | 'info';
export type NGXSeasonDividerThickness = 'thin' | 'normal' | 'thick';

export type NGXSeasonDividerThicknessMap = { thin: number, normal: number, thick: number };

@Component({
    selector: '',
    template: ''
})
export abstract class NGXSeasonDividerComponent implements OnChanges, AfterViewInit {

    @Input('divColor')
    set color(color: NGXSeasonDividerColor | null) {
        this._color = color ? color : 'default';
    }

    get color(): NGXSeasonDividerColor {
        return this._color;
    }

    @Input('divText')
    set text(text: string | undefined | null) {
        this._text = text ? text : undefined;
    }

    get text(): string | undefined {
        return this._text;
    }

    @Input('divThick')
    set thickness(thickness: NGXSeasonDividerThickness | null) {
        this._thickness = thickness ? thickness : 'normal';
    }

    get thickness(): NGXSeasonDividerThickness {
        return this._thickness;
    }

    private _color: NGXSeasonDividerColor = 'default';
    private _text: string | undefined;
    private _thickness: NGXSeasonDividerThickness = 'normal';

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,

        @Inject(NGX_SEASON_DIVIDER_THICKNESS_MAP_TOKEN)
        protected _thickMap: NGXSeasonDividerThicknessMap
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'color') this.changeDividerColor(changes[name].currentValue as NGXSeasonDividerColor);

            if (name === 'thickness') this.changeDividerThickness(changes[name].currentValue as NGXSeasonDividerThickness);
        }
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'divider');

        this.changeDividerColor(this.color);
        this.changeDividerThickness(this.thickness);
    }

    protected changeDividerColor(color: NGXSeasonDividerColor): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-divider-color', color);
    }

    protected changeDividerThickness(thickness: NGXSeasonDividerThickness): void {
        this._renderer.setStyle(this._element.nativeElement, '--divider-thickness', `${this._thickMap[thickness]}px`, RendererStyleFlags2.DashCase);
    }

}

@Component({
    selector: 'ngx-sui-x-divider',
    template: `
        <div class="left"></div>
        <span class="text" *ngIf="text">{{ text }}</span>
        <div class="right"></div>
    `
})
export class NGXSeasonHorizontalDividerComponent extends NGXSeasonDividerComponent {

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.addClass(this._element.nativeElement, 'x-divider');
    }

}

@Component({
    selector: 'ngx-sui-y-divider',
    template: `
        <div class="left"></div>
        <span class="text" *ngIf="text">{{ text }}</span>
        <div class="right"></div>
    `
})
export class NGXSeasonVerticalDividerComponent extends NGXSeasonDividerComponent {

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.addClass(this._element.nativeElement, 'y-divider');
    }

}
