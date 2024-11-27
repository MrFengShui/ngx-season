import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, InjectionToken, Input, OnChanges, OnDestroy, Renderer2, SimpleChanges } from "@angular/core";
import { BehaviorSubject, debounceTime, map, Observable, Subject } from "rxjs";

import { NGXSeasonColorPalette } from "src/app/utils/_palette.utils";
import { NGXSeasonSizeMap, NGXSeasonSizeOption } from "src/app/utils/_size.utils";

export type NGXSeasonAvatarShape = 'circle' | 'round';

export const NGX_SEASON_AVATAR_SIZE_MAP_TOKEN: InjectionToken<NGXSeasonSizeMap> = new InjectionToken('NGX_SEASON_AVATAR_SIZE_MAP_TOKEN');

@Component({
    selector: 'ngx-sui-avatar',
    template: `<img [attr.src]="srcURL" [attr.alt]="altText" [attr.width]="size$ | async" [attr.height]="size$ | async"/>`
})
export class NGXSeasonAvatarComponent implements OnChanges, OnDestroy, AfterViewInit {

    @Input('avatarAlt')
    set altText(altText: string | undefined | null) {
        this._altText = altText || undefined;
    }

    get altText(): string | undefined {
        return this._altText;
    }

    @Input('avatarColor')
    set color(color: NGXSeasonColorPalette | undefined | null) {
        this._color = color || 'default';
    }

    get color(): NGXSeasonColorPalette {
        return this._color;
    }

    @Input('avatarSrc')
    set srcURL(srcURL: string | undefined | null) {
        this._srcURL = srcURL || undefined;
    }

    get srcURL(): string | undefined {
        return this._srcURL;
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

    private _altText: string | undefined;
    private _color: NGXSeasonColorPalette = 'default';
    private _srcURL: string | undefined;
    private _shape: NGXSeasonAvatarShape = 'circle';
    private _size: NGXSeasonSizeOption = 'md';

    protected size$: Observable<number> | undefined;

    private subject$: Subject<NGXSeasonSizeOption> = new BehaviorSubject(this.size);

    constructor(
        protected _cdr: ChangeDetectorRef,
        protected _element: ElementRef,
        protected _renderer: Renderer2,

        @Inject(NGX_SEASON_AVATAR_SIZE_MAP_TOKEN)
        protected _sizeMap: NGXSeasonSizeMap
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        let keys: string[] | null = Object.keys(changes);

        if (keys.includes('color')) {
            this.changeAvatarColor(changes['color'].currentValue as NGXSeasonColorPalette);
        }

        if (keys.includes('shape')) {
            this.changeAvatarShape(changes['shape'].currentValue as NGXSeasonAvatarShape);
        }

        if (keys.includes('size')) {
            this.changeAvatarSize(changes['size'].currentValue as NGXSeasonSizeOption);
        }

        keys.splice(0);
        keys = null;
    }

    ngOnDestroy(): void {
        this.subject$.complete();

        this.size$ = undefined;
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'avatar');
        this.changeAvatarColor(this.color);
        this.changeAvatarShape(this.shape);
        this.changeAvatarSize(this.size);
    }

    protected changeAvatarColor(color: NGXSeasonColorPalette): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-avatar-color', `${color}`);
    }

    protected changeAvatarShape(shape: NGXSeasonAvatarShape): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-avatar-shape', `${shape}`);
    }

    protected changeAvatarSize(size: NGXSeasonSizeOption): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-avatar-size', `${size}`);

        this.subject$.next(size);
        this.size$ = this.subject$.asObservable().pipe(map(size => this._sizeMap[size]), debounceTime(100));
    }

}
