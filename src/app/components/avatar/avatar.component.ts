import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, InjectionToken, Input, OnChanges, OnDestroy, Renderer2, SimpleChanges } from "@angular/core";
import { BehaviorSubject, debounceTime, map, Observable, Subject } from "rxjs";

export type NGXSeasonAvatarColor = 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'failure' | 'info';
export type NGXSeasonAvatarSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
export type NGXSeasonAvatarShape = 'circle' | 'round';

export const NGX_SEASON_AVATAR_SIZE_MAP_TOKEN: InjectionToken<NGXSeasonIconSizeMap> = new InjectionToken('NGX_SEASON_AVATAR_SIZE_MAP_TOKEN');

type NGXSeasonIconSizeMap = { sm: number, md: number, lg: number, xl: number, xxl: number, xxxl: number };

@Component({
    selector: 'ngx-sui-avatar',
    template: `<img [attr.src]="srcURL" [attr.alt]="altText" [attr.width]="size$ | async" [attr.height]="size$ | async"/>`
})
export class NGXSeasonAvatarComponent implements OnChanges, OnDestroy, AfterViewInit {
    
    @Input('avatarAlt')
    set altText(altText: string | undefined) {
        this._altText = altText;
    }

    get altText(): string | undefined {
        return this._altText;
    }

    @Input('avatarColor')
    set color(color: NGXSeasonAvatarColor) {
        this._color = color;
    }

    get color(): NGXSeasonAvatarColor {
        return this._color;
    }
    
    @Input('avatarSrc')
    set srcURL(srcURL: string | undefined) {
        this._srcURL = srcURL;
    }

    get srcURL(): string | undefined {
        return this._srcURL;
    }
    
    @Input('avatarShape')
    set shape(shape: NGXSeasonAvatarShape) {
        this._shape = shape;
    }

    get shape(): NGXSeasonAvatarShape {
        return this._shape;
    }
    
    @Input('avatarSize')
    set size(size: NGXSeasonAvatarSize) {
        this._size = size;
    }

    get size(): NGXSeasonAvatarSize {
        return this._size;
    }
    
    private _altText: string | undefined;
    private _color: NGXSeasonAvatarColor = 'default';
    private _srcURL: string | undefined;
    private _shape: NGXSeasonAvatarShape = 'circle';
    private _size: NGXSeasonAvatarSize = 'md';

    protected size$: Observable<number> | undefined;

    private subject$: Subject<NGXSeasonAvatarSize> = new BehaviorSubject(this.size);

    constructor(
        protected _cdr: ChangeDetectorRef,
        protected _element: ElementRef,
        protected _renderer: Renderer2,

        @Inject(NGX_SEASON_AVATAR_SIZE_MAP_TOKEN)
        protected _sizeMap: NGXSeasonIconSizeMap
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        let keys: string[] | null = Object.keys(changes);
        
        if (keys.includes('color')) {
            this.changeAvatarColor(changes['color'].currentValue as NGXSeasonAvatarColor);
        }

        if (keys.includes('shape')) {
            this.changeAvatarShape(changes['shape'].currentValue as NGXSeasonAvatarShape);
        }
        
        if (keys.includes('size')) {
            this.changeAvatarSize(changes['size'].currentValue as NGXSeasonAvatarSize);
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

    protected changeAvatarColor(color: NGXSeasonAvatarColor): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-avatar-color', `${color}`);
    }

    protected changeAvatarShape(shape: NGXSeasonAvatarShape): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-avatar-shape', `${shape}`);
    }

    protected changeAvatarSize(size: NGXSeasonAvatarSize): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-avatar-size', `${size}`);

        this.subject$.next(size);
        this.size$ = this.subject$.asObservable().pipe(map(size => this._sizeMap[size]), debounceTime(100));
    }

    // protected formatAltText(altText: string | undefined): string {
    //     if (altText) {
    //         return altText;
    //     } else {
    //         const message: string = 'alternate-text-crypto-password';
    //         const salt: string = `${message}_${moment().format('X')}`;
    //         const key: string = PBKDF2(window.btoa(message), salt, { keySize: 256, iterations: 1000 }).toString();
    //         return HmacSHA256(message, key).toString();
    //     }
    // }

}