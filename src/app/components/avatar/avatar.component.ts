import { coerceCssPixelValue } from "@angular/cdk/coercion";
import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, Inject, InjectionToken, Input, OnChanges, Renderer2, RendererStyleFlags2, SimpleChanges } from "@angular/core";
import { Subscription } from "rxjs";

import { fetchFile } from "src/app/utils/fetch.utils";
import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";
import { NGXSeasonSizeMap, NGXSeasonSizeOption } from "src/app/utils/size.utils";

export type NGXSeasonAvatarShape = 'circle' | 'square';

export const NGX_SEASON_AVATAR_SIZE_MAP_TOKEN: InjectionToken<NGXSeasonSizeMap> = new InjectionToken('NGX_SEASON_AVATAR_SIZE_MAP_TOKEN');

@Directive({
    selector: 'img[ngx-sui-Avatar]'
})
export class NGXSeasonAvatarComponent implements OnChanges, AfterViewInit {

    @Input('avatarColor')
    set color(color: NGXSeasonColorPalette | undefined | null) {
        this._color = color || 'default';
    }

    get color(): NGXSeasonColorPalette {
        return this._color;
    }

    @Input('avatarAlt')
    set imgAlt(imgAlt: string | undefined | null) {
        this._imgAlt = imgAlt || undefined;
    }

    get imgAlt(): string | undefined {
        return this._imgAlt;
    }

    @Input('avatarSrc')
    set imgSrc(imgSrc: string | undefined | null) {
        this._imgSrc = imgSrc || undefined;
    }

    get imgSrc(): string | undefined {
        return this._imgSrc;
    }

    @Input('avatarShape')
    set shape(shape: NGXSeasonAvatarShape | undefined | null) {
        this._shape = shape || 'circle';
    }

    get shape(): NGXSeasonAvatarShape {
        return this._shape;
    }

    @Input('avatarSize')
    set size(size: NGXSeasonSizeOption | undefined | null) {
        this._size = size || 'md';
    }

    get size(): NGXSeasonSizeOption {
        return this._size;
    }

    private _color: NGXSeasonColorPalette = 'default';
    private _imgAlt: string | undefined;
    private _imgSrc: string | undefined;
    private _shape: NGXSeasonAvatarShape = 'circle';
    private _size: NGXSeasonSizeOption = 'md';

    constructor(
        protected _cdr: ChangeDetectorRef,
        protected _element: ElementRef,
        protected _renderer: Renderer2,

        @Inject(NGX_SEASON_AVATAR_SIZE_MAP_TOKEN)
        protected _sizeMap: NGXSeasonSizeMap
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'color') this.changeAvatarColor(changes['color'].currentValue as NGXSeasonColorPalette);

            if (name === 'imgAlt') this.setupAvatarImageAlt(changes['imgAlt'].currentValue);

            if (name === 'imgSrc') this.setupAvatarImageSrc(changes['imgSrc'].currentValue);

            if (name === 'shape') this.changeAvatarShape(changes['shape'].currentValue as NGXSeasonAvatarShape);

            if (name === 'size') this.changeAvatarSize(changes['size'].currentValue as NGXSeasonSizeOption);
        }
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'avatar');
        this.changeAvatarColor(this.color);
        this.setupAvatarImageAlt(this.imgAlt);
        this.setupAvatarImageSrc(this.imgSrc);
        this.changeAvatarShape(this.shape);
        this.changeAvatarSize(this.size);
    }

    protected changeAvatarColor(color: NGXSeasonColorPalette): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-avatar-color', `${color}`);
    }

    protected setupAvatarImageAlt(imgAlt: string | undefined): void {
        this._renderer.setProperty(this._element.nativeElement, 'alt', window.btoa(imgAlt || this.imgSrc || `${Date.now()}`).toLowerCase());
    }

    protected setupAvatarImageSrc(imgSrc: string | undefined): void {
        if (imgSrc) {
            let subscription: Subscription = fetchFile(imgSrc).subscribe({
                next: value => this._renderer.setProperty(this._element.nativeElement, 'src', value),
                complete: () => subscription.unsubscribe()
            });
        }
    }

    protected changeAvatarShape(shape: NGXSeasonAvatarShape): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-avatar-shape', `${shape}`);
    }

    protected changeAvatarSize(size: NGXSeasonSizeOption): void {
        this._renderer.setStyle(this._element.nativeElement, '--avatar-size', coerceCssPixelValue(this._sizeMap[size]), RendererStyleFlags2.DashCase);
    }

}
