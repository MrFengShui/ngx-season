import { coerceBooleanProperty, coerceCssPixelValue } from '@angular/cdk/coercion';
import { AfterViewInit, Directive, ElementRef, Inject, InjectionToken, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

import { NGXSeasonColorPalette } from 'src/app/utils/palette.utils';
import { NGXSeasonSizeOption, NGXSeasonSizeMap } from 'src/app/utils/size.utils';

export const NGX_SEASON_AVATAR_SIZE_MAP_TOKEN: InjectionToken<NGXSeasonSizeMap> = new InjectionToken('NGX_SEASON_AVATAR_SIZE_MAP_TOKEN');

export type NGXSeasonImageCrossOrigin = 'anonymous' | 'use-credentials';
export type NGXSeasonImageLoading = 'eager' | 'lazy';
export type NGXSeasonImageRefererPolicy = 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url';
export type NGXSeasonImageObjectFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
export type NGXSeasonAvatarShape = 'circle' | 'square';

@Directive()
export abstract class NGXSeasonBaseImageDirective implements OnChanges, AfterViewInit {

    @Input('imgColor')
    set color(color: NGXSeasonColorPalette | undefined | null) {
        this._color = color || 'default';
    }

    get color(): NGXSeasonColorPalette {
        return this._color;
    }

    @Input({ alias: 'imgAlt', required: true })
    set imgAlt(imgAlt: string | undefined | null) {
        this._imgAlt = imgAlt || undefined;
    }

    get imgAlt(): string | undefined {
        return this._imgAlt;
    }

    @Input({ alias: 'imgSrc', required: true })
    set imgSrc(imgSrc: string | undefined | null) {
        this._imgSrc = imgSrc || undefined;
    }

    get imgSrc(): string | undefined {
        return this._imgSrc;
    }

    @Input({ alias: 'imgFit' })
    set fit(fit: NGXSeasonImageObjectFit | undefined | null) {
        this._fit = fit || 'cover';
    }

    get fit(): NGXSeasonImageObjectFit {
        return this._fit;
    }

    @Input({ alias: 'imgLoad' })
    set loading(loading: NGXSeasonImageLoading | undefined | null) {
        this._loading = loading || 'lazy';
    }

    get loading(): NGXSeasonImageLoading {
        return this._loading;
    }

    @Input({ alias: 'imgOrigin' })
    set origin(origin: NGXSeasonImageCrossOrigin | undefined | null) {
        this._origin = origin || undefined;
    }

    get origin(): NGXSeasonImageCrossOrigin | undefined {
        return this._origin;
    }

    @Input({ alias: 'imgPolicy' })
    set policy(policy: NGXSeasonImageRefererPolicy | undefined | null) {
        this._policy = policy || 'strict-origin-when-cross-origin';
    }

    get policy(): NGXSeasonImageRefererPolicy {
        return this._policy;
    }

    private _color: NGXSeasonColorPalette = 'default';
    private _imgAlt: string | undefined;
    private _imgSrc: string | undefined;
    private _fit: NGXSeasonImageObjectFit = 'contain';
    private _loading: NGXSeasonImageLoading = 'lazy';
    private _policy: NGXSeasonImageRefererPolicy = 'strict-origin-when-cross-origin';
    private _origin: NGXSeasonImageCrossOrigin | undefined;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'color' && !changes[name].isFirstChange()) this.changeImageColor(changes[name].currentValue as NGXSeasonColorPalette);

            if (name === 'imgAlt' && !changes[name].isFirstChange()) this.setupImageAlt(changes[name].currentValue as string);

            if (name === 'imgSrc' && !changes[name].isFirstChange()) this.setupImageSrc(changes[name].currentValue as string);

            if (name === 'fit' && !changes[name].isFirstChange()) this.changeImageObjectFit(changes[name].currentValue as NGXSeasonImageObjectFit);

            if (name === 'loading' && !changes[name].isFirstChange()) this.changeImageLoading(changes[name].currentValue as NGXSeasonImageLoading);

            if (name === 'origin' && !changes[name].isFirstChange()) this.changeImageCrossOrigin(changes[name].currentValue as NGXSeasonImageCrossOrigin);

            if (name === 'policy' && !changes[name].isFirstChange()) this.changeImageReferrerPolicy(changes[name].currentValue as NGXSeasonImageRefererPolicy);
        }
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'image');

        this.changeImageColor(this.color);
        this.setupImageAlt(this.imgAlt);
        this.setupImageSrc(this.imgSrc);
        this.changeImageObjectFit(this.fit);
        this.changeImageCrossOrigin(this.origin);
        this.changeImageLoading(this.loading);
        this.changeImageReferrerPolicy(this.policy);
    }

    protected changeImageColor(color: NGXSeasonColorPalette): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-image-color', color);
    }

    protected setupImageAlt(imgAlt: string | undefined): void {
        this._renderer.setProperty(this._element.nativeElement, 'alt', imgAlt);
    }

    protected setupImageSrc(imgSrc: string | undefined): void {
        this._renderer.setProperty(this._element.nativeElement, 'src', imgSrc || this.imgAlt);
    }

    protected changeImageObjectFit(fit: NGXSeasonImageObjectFit): void {
        this._renderer.setStyle(this._element.nativeElement, 'object-fit', fit);
    }

    protected changeImageLoading(loading: NGXSeasonImageLoading): void {
        this._renderer.setProperty(this._element.nativeElement, 'loading', loading);
    }

    protected changeImageCrossOrigin(origin: NGXSeasonImageCrossOrigin | undefined): void {
        const element = this._element.nativeElement;

        if (origin) this._renderer.setAttribute(element, 'crossorigin', origin);
        else this._renderer.removeAttribute(element, 'crossorigin');
    }

    protected changeImageReferrerPolicy(policy: NGXSeasonImageRefererPolicy): void {
        this._renderer.setAttribute(this._element.nativeElement, 'referrerpolicy', policy);
    }

}

@Directive({
    selector: 'img[ngx-sui-ImageFigure]'
})
export class NGXSeasonImageFigureDirective extends NGXSeasonBaseImageDirective {

    @Input({ alias: 'ifBordered' })
    set bordered(bordered: boolean | string | undefined | null) {
        this._bordered = coerceBooleanProperty(bordered);
    }

    get bordered(): boolean {
        return this._bordered;
    }

    @Input({ alias: 'ifDimension', required: true })
    set dimension(dimension: [number, number] | undefined | null) {
        this._dimension = dimension || undefined;
    }

    get dimension(): [number, number] | undefined {
        return this._dimension;
    }

    private _bordered: boolean = false;
    private _dimension: [number, number] | undefined;

    override ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        for (const name in changes) {
            if (name === 'bordered' && !changes[name].isFirstChange()) this.setupFitureBordered(coerceBooleanProperty(changes[name].currentValue));

            if (name === 'dimension' && !changes[name].isFirstChange()) this.setupFigureDimension(changes[name].currentValue);
        }
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.addClass(this._element.nativeElement, 'figure');

        this.setupFitureBordered(this.bordered);
        this.setupFigureDimension(this.dimension);
    }

    protected setupFitureBordered(bordered: boolean): void {
        const element = this._element.nativeElement;

        if (bordered) this._renderer.addClass(element, 'figure-bordered');
        else this._renderer.removeClass(element, 'figure-bordered');
    }

    protected setupFigureDimension(dimension: [number, number] | undefined): void {
        if (!dimension) throw new Error('错误：图片尺寸未设置。');

        const element = this._element.nativeElement;
        this._renderer.setProperty(element, 'width', dimension[0]);
        this._renderer.setProperty(element, 'height', dimension[1]);
    }

}

@Directive({
    selector: 'img[ngx-sui-ImageAvatar]'
})
export class NGXSeasonImageAvatarDirective extends NGXSeasonBaseImageDirective {

    @Input('iaShape')
    set shape(shape: NGXSeasonAvatarShape | undefined | null) {
        this._shape = shape || 'circle';
    }

    get shape(): NGXSeasonAvatarShape {
        return this._shape;
    }

    @Input('iaSize')
    set size(size: NGXSeasonSizeOption | undefined | null) {
        this._size = size || 'md';
    }

    get size(): NGXSeasonSizeOption {
        return this._size;
    }

    private _shape: NGXSeasonAvatarShape = 'circle';
    private _size: NGXSeasonSizeOption = 'md';

    constructor(
        protected override _element: ElementRef,
        protected override _renderer: Renderer2,

        @Inject(NGX_SEASON_AVATAR_SIZE_MAP_TOKEN)
        protected _sizeMap: NGXSeasonSizeMap
    ) {
        super(_element, _renderer);
    }

    override ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        for (const name in changes) {
            if (name === 'shape') this.changeAvatarShape(changes['shape'].currentValue as NGXSeasonAvatarShape);

            if (name === 'size') this.changeAvatarSize(changes['size'].currentValue as NGXSeasonSizeOption);
        }
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.addClass(this._element.nativeElement, 'avatar');

        this.changeAvatarShape(this.shape);
        this.changeAvatarSize(this.size);
    }

    protected changeAvatarShape(shape: NGXSeasonAvatarShape): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-image-avatar-shape', shape);
    }

    protected changeAvatarSize(size: NGXSeasonSizeOption): void {
        const element = this._element.nativeElement, value: number = this._sizeMap[size];
        this._renderer.setStyle(element, 'width', coerceCssPixelValue(value));
        this._renderer.setStyle(element, 'height', coerceCssPixelValue(value));
    }

}

