import { animate, AnimationAnimateMetadata, AnimationBuilder, AnimationPlayer, keyframes, style } from "@angular/animations";
import { coerceBooleanProperty, coerceNumberProperty } from "@angular/cdk/coercion";
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, InjectionToken, Input, NgZone, OnChanges, OnDestroy, QueryList, Renderer2, SimpleChanges, ViewChild, ViewChildren } from "@angular/core";
import { BehaviorSubject, debounceTime, Subject, Subscription } from "rxjs";

import { NGXSeasonIconName } from "../icon/icon.component";

import { NGXSeasonColorPalette } from "src/app/utils/_palette.utils";
import { NGXSeasonAnimationSpeed } from "src/app/utils/animate.utils";

export const NGX_SEASON_BANNER_SPEED_MAP_TOKEN: InjectionToken<NGXSeasonBannerSpeedMap> = new InjectionToken('NGX_SEASON_BANNER_SPEED_MAP_TOKEN');
export const NGX_SEASON_MEDIA_BANNER_TYPE_MAP_TOKEN: InjectionToken<NGXSeasonMediaBannerTypeMap> = new InjectionToken('NGX_SEASON_MEDIA_BANNER_TYPE_MAP_TOKEN');

export type NGXSeasonBannerManner = 'fade' | 'alternate';
export type NGXSeasonMediaBannerType = 'image' | 'audio' | 'video';
export type NGXSeasonBannerSpeedMap = { [key in NGXSeasonAnimationSpeed]: number };
export type NGXSeasonMediaBannerTypeMap = { [key in NGXSeasonMediaBannerType]: NGXSeasonIconName };

type BannerAnimationMetainfo = { target?: HTMLElement | HTMLElement[], color: NGXSeasonColorPalette, manner: NGXSeasonBannerManner, speed: NGXSeasonAnimationSpeed };

@Component({
    selector: '',
    template: ''
})
export abstract class NGXSeasonBannerComponent implements OnChanges, OnDestroy, AfterViewInit {

    @Input({ alias: 'banColor' })
    set color(color: NGXSeasonColorPalette | undefined | null) {
        this._color = color || 'default';
    }

    get color(): NGXSeasonColorPalette {
        return this._color;
    }

    @Input({ alias: 'banManner' })
    set manner(manner: NGXSeasonBannerManner | undefined | null) {
        this._manner = manner || 'alternate';
    }

    get manner(): NGXSeasonBannerManner {
        return this._manner;
    }

    @Input({ alias: 'banShowShadow' })
    set showShadow(showShadow: boolean | string | undefined | null) {
        this._showShadow = coerceBooleanProperty(showShadow);
    }

    get showShadow(): boolean {
        return this._showShadow;
    }

    @Input({ alias: 'banSpeed'})
    set speed(duration: NGXSeasonAnimationSpeed | undefined | null) {
        this._speed = duration || 'md';
    }

    get speed(): NGXSeasonAnimationSpeed {
        return this._speed;
    }

    private _color: NGXSeasonColorPalette = 'default';
    private _manner: NGXSeasonBannerManner = 'alternate';
    private _showShadow: boolean = false;
    private _speed: NGXSeasonAnimationSpeed = 'md';

    private players: AnimationPlayer[] = [];
    private player: AnimationPlayer | undefined;
    private metainfo: BannerAnimationMetainfo = { color: this.color, manner: this.manner, speed: this.speed };
    private metainfoChange$: Subject<BannerAnimationMetainfo> = new BehaviorSubject(this.metainfo);
    private metainfo$: Subscription = Subscription.EMPTY;

    constructor(
        protected _builder: AnimationBuilder,
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _ngZone: NgZone,

        @Inject(NGX_SEASON_BANNER_SPEED_MAP_TOKEN)
        protected _speedMap: NGXSeasonBannerSpeedMap
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'color') this.metainfo.color = changes[name].currentValue as NGXSeasonColorPalette;

            if (name === 'manner') this.metainfo.manner = changes[name].currentValue as NGXSeasonBannerManner;

            if (name === 'speed') this.metainfo.speed = changes[name].currentValue as NGXSeasonAnimationSpeed;

            if (name === 'showShadow') this.setupBannerShadow(coerceBooleanProperty(changes[name].currentValue));
        }

        this.metainfoChange$.next(this.metainfo);
    }

    ngOnDestroy(): void {
        this.players.splice(0);

        this.metainfo$.unsubscribe();
        this.metainfoChange$.complete();
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'banner');

        this.changeBannerColor(this.color);
        this.changeBannerManner(this.manner);
        this.changeBannerSpeed(this.speed);
        this.setupBannerShadow(this.showShadow);
        this.listenBannerMetainfoChange();
    }

    protected changeBannerColor(color: NGXSeasonColorPalette): void {
        this.metainfo.color = color;
        this.metainfoChange$.next(this.metainfo);
    }

    protected changeBannerManner(manner: NGXSeasonBannerManner): void {
        this.metainfo.manner = manner;
        this.metainfoChange$.next(this.metainfo);
    }

    protected changeBannerSpeed(speed: NGXSeasonAnimationSpeed): void {
        this.metainfo.speed = speed;
        this.metainfoChange$.next(this.metainfo);
    }

    protected setupBannerShadow(showShadow: boolean): void {
        const element: HTMLElement = this._element.nativeElement;

        if (showShadow) this._renderer.addClass(element, 'banner-shadow');
        else this._renderer.removeClass(element, 'banner-shadow');
    }

    protected setupBannerAnimateTarget(target?: HTMLElement | HTMLElement[]): void {
        this.metainfo.target = target;
        this.metainfoChange$.next(this.metainfo);
    }

    private createAnimation(metainfo: BannerAnimationMetainfo): AnimationAnimateMetadata | null {
        const duration: number = this._speedMap[metainfo.speed];

        if (metainfo.manner === 'alternate') {
            return animate(`${duration}ms`, keyframes([
                style({ offset: 0, background: `repeating-linear-gradient(45deg, var(--banner-bgcolor-${metainfo.color}-50) 0%, var(--banner-bgcolor-${metainfo.color}-25) 0%, var(--banner-bgcolor-${metainfo.color}-50) 100%)` }),
                style({ offset: 0.1, background: `repeating-linear-gradient(45deg, var(--banner-bgcolor-${metainfo.color}-50) 0%, var(--banner-bgcolor-${metainfo.color}-25) 20%, var(--banner-bgcolor-${metainfo.color}-50) 100%)` }),
                style({ offset: 0.2, background: `repeating-linear-gradient(45deg, var(--banner-bgcolor-${metainfo.color}-50) 0%, var(--banner-bgcolor-${metainfo.color}-25) 40%, var(--banner-bgcolor-${metainfo.color}-50) 100%)` }),
                style({ offset: 0.3, background: `repeating-linear-gradient(45deg, var(--banner-bgcolor-${metainfo.color}-50) 0%, var(--banner-bgcolor-${metainfo.color}-25) 60%, var(--banner-bgcolor-${metainfo.color}-50) 100%)` }),
                style({ offset: 0.4, background: `repeating-linear-gradient(45deg, var(--banner-bgcolor-${metainfo.color}-50) 0%, var(--banner-bgcolor-${metainfo.color}-25) 80%, var(--banner-bgcolor-${metainfo.color}-50) 100%)` }),
                style({ offset: 0.5, background: `repeating-linear-gradient(45deg, var(--banner-bgcolor-${metainfo.color}-50) 0%, var(--banner-bgcolor-${metainfo.color}-25) 100%, var(--banner-bgcolor-${metainfo.color}-50) 100%)` }),
                style({ offset: 0.6, background: `repeating-linear-gradient(45deg, var(--banner-bgcolor-${metainfo.color}-50) 0%, var(--banner-bgcolor-${metainfo.color}-25) 80%, var(--banner-bgcolor-${metainfo.color}-50) 100%)` }),
                style({ offset: 0.7, background: `repeating-linear-gradient(45deg, var(--banner-bgcolor-${metainfo.color}-50) 0%, var(--banner-bgcolor-${metainfo.color}-25) 60%, var(--banner-bgcolor-${metainfo.color}-50) 100%)` }),
                style({ offset: 0.8, background: `repeating-linear-gradient(45deg, var(--banner-bgcolor-${metainfo.color}-50) 0%, var(--banner-bgcolor-${metainfo.color}-25) 40%, var(--banner-bgcolor-${metainfo.color}-50) 100%)` }),
                style({ offset: 0.9, background: `repeating-linear-gradient(45deg, var(--banner-bgcolor-${metainfo.color}-50) 0%, var(--banner-bgcolor-${metainfo.color}-25) 20%, var(--banner-bgcolor-${metainfo.color}-50) 100%)` }),
                style({ offset: 1, background: `repeating-linear-gradient(45deg, var(--banner-bgcolor-${metainfo.color}-50) 0%, var(--banner-bgcolor-${metainfo.color}-25) 0%, var(--banner-bgcolor-${metainfo.color}-50) 100%)` }),
            ]));
        }

        if (metainfo.manner === 'fade') {
            return animate(`${duration}ms`, keyframes([
                style({ offset: 0, backgroundColor: `var(--banner-bgcolor-${metainfo.color}-25)` }),
                style({ offset: 0.1, backgroundColor: `var(--banner-bgcolor-${metainfo.color}-30)` }),
                style({ offset: 0.2, backgroundColor: `var(--banner-bgcolor-${metainfo.color}-35)` }),
                style({ offset: 0.3, backgroundColor: `var(--banner-bgcolor-${metainfo.color}-40)` }),
                style({ offset: 0.4, backgroundColor: `var(--banner-bgcolor-${metainfo.color}-45)` }),
                style({ offset: 0.5, backgroundColor: `var(--banner-bgcolor-${metainfo.color}-50)` }),
                style({ offset: 0.6, backgroundColor: `var(--banner-bgcolor-${metainfo.color}-45)` }),
                style({ offset: 0.7, backgroundColor: `var(--banner-bgcolor-${metainfo.color}-40)` }),
                style({ offset: 0.8, backgroundColor: `var(--banner-bgcolor-${metainfo.color}-35)` }),
                style({ offset: 0.9, backgroundColor: `var(--banner-bgcolor-${metainfo.color}-30)` }),
                style({ offset: 1, backgroundColor: `var(--banner-bgcolor-${metainfo.color}-25)` }),
            ]));
        }

        return null;
    }

    private animateBannerRunning(target: HTMLElement | HTMLElement[] | undefined, animation: AnimationAnimateMetadata | null): void {
        if (!target || animation === null) throw new Error();

        if (Array.isArray(target)) {
            for (let i = 0, length = target.length; i < length; i++) {
                this.players[i] = this._builder.build(animation).create(target[i]);
                this.players[i].onDone(() => this.players[i].restart());
                this.players[i].play();
            }
        } else {
            this.player = this._builder.build(animation).create(target);
            this.player.onDone(() => this.player?.restart());
            this.player.play();
        }
    }

    private animateBannerCancel(): void {
        if (this.players.length > 0) this.players.forEach(player => player.destroy());

        if (this.player) {
            this.player.destroy();
            this.player = undefined;
        }
    }

    private listenBannerMetainfoChange(): void {
        this._ngZone.runOutsideAngular(() =>
            this.metainfo$ = this.metainfoChange$.asObservable().pipe(debounceTime(100))
                .subscribe(metainfo =>
                    this._ngZone.run(() => {
                        this.animateBannerCancel();
                        this.animateBannerRunning(metainfo.target, this.createAnimation(metainfo));
                    })));
    }

}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'div[ngx-sui-MediaBanner]',
    template: `<ngx-sui-icon [iconColor]="color" [iconShape]="_typeMap[mediaType]" iconSize="xxxl"></ngx-sui-icon>`
})
export class NGXSeasonMediaBannerComponent extends NGXSeasonBannerComponent {

    @Input({ alias: 'mbType' })
    set mediaType(mediaType: NGXSeasonMediaBannerType | undefined | null) {
        this._mediaType = mediaType || 'image';
    }

    get mediaType(): NGXSeasonMediaBannerType {
        return this._mediaType;
    }

    @Input({ alias: 'mbWidth' })
    set width(width: number | string | undefined | null) {
        this._width = coerceNumberProperty(width);
    }

    get width(): number {
        return this._width;
    }

    @Input({ alias: 'mbHeight' })
    set height(height: number | string | undefined | null) {
        this._height = coerceNumberProperty(height);
    }

    get height(): number {
        return this._height;
    }

    private _mediaType: NGXSeasonMediaBannerType = 'image';
    private _width: number = 0;
    private _height: number = 0;

    constructor(
        protected override _builder: AnimationBuilder,
        protected override _element: ElementRef,
        protected override _renderer: Renderer2,
        protected override _ngZone: NgZone,

        @Inject(NGX_SEASON_BANNER_SPEED_MAP_TOKEN)
        protected override _speedMap: NGXSeasonBannerSpeedMap,
        @Inject(NGX_SEASON_MEDIA_BANNER_TYPE_MAP_TOKEN)
        protected _typeMap: NGXSeasonMediaBannerTypeMap
    ) {
        super(_builder, _element, _renderer, _ngZone, _speedMap);
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        const element: HTMLElement = this._element.nativeElement;
        this._renderer.addClass(element, 'media-banner');
        this.setupBannerAnimateTarget(element);

        this.setupBannerWidth(this.width);
        this.setupBannerHeight(this.height);
    }

    protected setupBannerWidth(width: number): void {
        this._renderer.setStyle(this._element.nativeElement, 'width', width === 0 ? '100%' : `${width}px`);
    }

    protected setupBannerHeight(height: number): void {
        this._renderer.setStyle(this._element.nativeElement, 'height', height === 0 ? '100%' : `${height}px`);
    }

}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'div[ngx-sui-MetainfoBanner]',
    template: `
        <div class="banner-circle" #circle>
            <ngx-sui-icon [iconColor]="color" iconShape="group" iconSize="xl"></ngx-sui-icon>
        </div>
        <div class="banner-wrapper">
            <div class="banner-stick" #stick></div>
            <div class="banner-stick-wrapper">
                <div class="banner-stick" #stick></div>
                <div class="banner-stick" #stick></div>
                <div class="banner-stick" #stick></div>
            </div>
        </div>
    `
})
export class NGXSeasonMetainfoBannerComponent extends NGXSeasonBannerComponent {

    @ViewChild('circle', { read: ElementRef, static: true })
    protected circle: ElementRef<HTMLElement> | undefined;

    @ViewChildren('stick', { read: ElementRef })
    protected sticks: QueryList<ElementRef<HTMLElement>> | undefined;

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.addClass(this._element.nativeElement, 'profile-banner');

        this.initialize();
    }

    private initialize(): void {
        const target: HTMLElement[] = [];

        if (this.circle) target.push(this.circle.nativeElement);

        if (this.sticks) target.push(...this.sticks.toArray().map(item => item.nativeElement));

        this.setupBannerAnimateTarget(target);
    }

}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'div[ngx-sui-ParagraphBanner]',
    template: `<div class="banner-item" [style.width]="line" #item *ngFor="let line of lines$.asObservable() | async"></div>`
})
export class NGXSeasonParagraphBannerComponent extends NGXSeasonBannerComponent {

    @Input({ alias: 'pgbLines' })
    set lines(lines: number | string | undefined | null) {
        this._lines = coerceNumberProperty(lines);
    }

    get lines(): number {
        return this._lines;
    }

    private _lines: number = 10;

    @ViewChildren('item', { read: ElementRef })
    protected items: QueryList<ElementRef<HTMLElement>> | undefined;

    protected lines$: Subject<string[]> = new BehaviorSubject<string[]>([]);

    private items$: Subscription = Subscription.EMPTY;

    override ngOnDestroy(): void {
        super.ngOnDestroy();

        this.items$.unsubscribe();
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.addClass(this._element.nativeElement, 'paragraph-banner');

        this.setupBannerLines(this.lines);
        this.listenBannerItemsChange();
    }

    protected setupBannerLines(lines: number): void {
        if (lines <= 0) throw new Error();

        const list: string[] = [];

        for (let i = 0; i < lines; i++) {
            if (i < lines - 1) {
                list.push(`${Math.floor(Math.random() * 5 + 95)}%`);
            } else {
                list.push(`${Math.floor(Math.random() * 50 + 35)}%`);
            }
        }

        this.lines$.next(list);
    }

    private listenBannerItemsChange(): void {
        this._ngZone.runOutsideAngular(() => {
            if (this.items) this.items$ = this.items.changes.subscribe((change: QueryList<ElementRef<HTMLElement>>) => this.setupBannerAnimateTarget(change.toArray().map(item => item.nativeElement)));
        });
    }

}
