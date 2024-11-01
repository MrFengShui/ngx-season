import { animate, AnimationBuilder, AnimationPlayer, style } from "@angular/animations";
import { coerceNumberProperty } from "@angular/cdk/coercion";
import { Component, ChangeDetectionStrategy, AfterViewInit, Input, ElementRef, Renderer2, NgZone, Inject, InjectionToken, ContentChildren, QueryList, ViewChild, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";

import { NGX_SEASON_CAROUSEL_TOKEN, NGXSeasonCarouselComponent } from "./carousel.component";

import { NGXSeasonSwitchSelectionIndexDispatcher } from "src/app/utils/services/switch-select.service";

export const NGX_SEASON_CAROUSEL_METAINFO_FORMAT_TOKEN: InjectionToken<string> = new InjectionToken('NGX_SEASON_CAROUSEL_METAINFO_FORMAT_TOKEN');

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'ngx-sui-carousel-content-item',
    template: `
        <div class="carousel-content-metainfo">
            <span class="metainfo-desc-wrapper">{{ imageDesc }}</span>
            <span class="metainfo-index-wrapper">{{ parseMetainfoTemplate(_format, index + 1, total$ | async) }}</span>
        </div>
        <img [attr.src]="imageSrc" [attr.alt]="imageAlt" width="100%" height="100%"/>
    `
})
export class NGXSeasonCarouselContentItemComponent implements AfterViewInit {

    @Input('imgAlt')
    set imageAlt(imageAlt: string | undefined) {
        this._imageAlt = imageAlt;
    }

    get imageAlt(): string | undefined {
        return this._imageAlt;
    }

    @Input('imgDesc')
    set imageDesc(imageDesc: string | undefined) {
        this._imageDesc = imageDesc;
    }

    get imageDesc(): string | undefined {
        return this._imageDesc;
    }

    @Input('imgSrc')
    set imageSrc(imageSrc: string | undefined) {
        this._imageSrc = imageSrc;
    }

    get imageSrc(): string | undefined {
        return this._imageSrc;
    }

    @Input('index')
    set index(index: number | string) {
        this._index = coerceNumberProperty(index);
    }

    get index(): number {
        return this._index;
    }

    private _imageAlt: string | undefined;
    private _imageDesc: string | undefined;
    private _imageSrc: string | undefined;
    private _index: number = 0;

    protected total$: Observable<number> = this._carousel.totalCount$.asObservable();

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _ngZone: NgZone,

        @Inject(NGX_SEASON_CAROUSEL_TOKEN)
        protected _carousel: NGXSeasonCarouselComponent,
        @Inject(NGX_SEASON_CAROUSEL_METAINFO_FORMAT_TOKEN)
        protected _format: string
    ) { }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'carousel-content-item');
    }

    protected parseMetainfoTemplate(template: string, index?: number, total?: number | null): string {
        return template.replace(/\${index}/, index ? index.toString() : '-1')
        .replace(/\${total}/, total ? total.toString() : '-1');
    }

}

@Component({
    selector: 'ngx-sui-carousel-content',
    template: `<div class="carousel-content-wrapper" #wrapper><ng-content select="ngx-sui-carousel-content-item"></ng-content></div>`
})
export class NGXSeasonCarouselContentComponent implements OnDestroy, AfterViewInit {

    @Input('duration')
    set duration(duration: number | string) {
        this._duration = coerceNumberProperty(duration);
    }

    get duration(): number {
        return this._duration;
    }

    @Input('offset')
    set offset(offset: number | string) {
        this._offset = coerceNumberProperty(offset);
    }

    get offset(): number {
        return this._offset;
    }

    private _duration: number = 5000;
    private _offset: number = 0;

    @ContentChildren(NGXSeasonCarouselContentItemComponent)
    items: QueryList<NGXSeasonCarouselContentItemComponent> | undefined;

    @ViewChild('wrapper', { read: ElementRef, static: true })
    protected wrapper: ElementRef<HTMLElement> | undefined;

    private player: AnimationPlayer | undefined;

    private dispatcher$: Subscription = Subscription.EMPTY;
    
    constructor(
        protected _builder: AnimationBuilder,
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _ngZone: NgZone,

        protected _dispatcher: NGXSeasonSwitchSelectionIndexDispatcher,

        @Inject(NGX_SEASON_CAROUSEL_TOKEN)
        protected _carousel: NGXSeasonCarouselComponent
    ) {}

    ngOnDestroy(): void {
        this.player?.destroy();
        this.dispatcher$.unsubscribe();
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'carousel-content');
        this.listenCarouselSelectionChange();
    }

    private listenCarouselSelectionChange(): void {
        this._ngZone.runOutsideAngular(() => 
            this.dispatcher$ = this._dispatcher.listen().subscribe(model => 
                this._ngZone.run(() => {
                    if (model.id === this._carousel.id) {
                        this.execTranslateAnimation(this.wrapper?.nativeElement, this.duration, model.prevIndex, model.currIndex, this.offset);
                    }
                })));
    }

    private execTranslateAnimation(element: HTMLElement | undefined, duration: number, prevIndex: number, currIndex: number, offset: number): void {
        const start: number = offset * prevIndex * -1;
        const final: number = offset * currIndex * -1;
        
        if (!this.player) {
            this.player = this._builder.build([
                style({ transform: `translateX(${start}px)` }),
                animate(`${duration}ms`, style({ transform: `translateX(${final}px)` }))
            ]).create(element);    
        }
            
        this.player.onDone(() => {
            this._renderer.setStyle(element, 'transform', `translateX(${final}px)`);
            this.player?.destroy();
            this.player = undefined;
        });
        this.player.onStart(() => this._renderer.setStyle(element, 'transform', `translateX(${start}px)`));
        this.player.play();
    }

}