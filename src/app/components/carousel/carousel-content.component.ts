import { Component, ChangeDetectionStrategy, OnDestroy, AfterViewInit, Input, ElementRef, Renderer2, NgZone, Inject, InjectionToken } from "@angular/core";
import { Subscription } from "rxjs";

import { NGX_SEASON_CAROUSEL_TOKEN, NGXSeasonCarouselComponent } from "./carousel.component";
import { coerceNumberProperty } from "@angular/cdk/coercion";

export const NGX_SEASON_CAROUSEL_METAINFO_FORMAT_TOKEN: InjectionToken<string> = new InjectionToken('NGX_SEASON_CAROUSEL_METAINFO_FORMAT_TOKEN');

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'ngx-sui-carousel-content',
    template: `
        <div class="carousel-content-metainfo">
            <span class="metainfo-desc-wrapper">{{ imageDesc }}</span>
            <span class="metainfo-index-wrapper">{{ parseMetainfoTemplate(_format, imageIndex + 1, total) }}</span>
        </div>
        <img [attr.src]="imageSrc" [attr.alt]="imageAlt" width="100%" height="100%"/>
    `
})
export class NGXSeasonCarouselContentComponent implements OnDestroy, AfterViewInit {

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

    @Input('imgIdx')
    set imageIndex(imageIndex: number | string) {
        this._imageIndex = coerceNumberProperty(imageIndex);
    }

    get imageIndex(): number {
        return this._imageIndex;
    }

    @Input('imgSrc')
    set imageSrc(imageSrc: string | undefined) {
        this._imageSrc = imageSrc;
    }

    get imageSrc(): string | undefined {
        return this._imageSrc;
    }

    private _imageAlt: string | undefined;
    private _imageDesc: string | undefined;
    private _imageIndex: number = 0;
    private _imageSrc: string | undefined;

    protected total: number | undefined = this._carousel.items?.length;

    private width$: Subscription = Subscription.EMPTY;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _ngZone: NgZone,

        @Inject(NGX_SEASON_CAROUSEL_TOKEN)
        protected _carousel: NGXSeasonCarouselComponent,
        @Inject(NGX_SEASON_CAROUSEL_METAINFO_FORMAT_TOKEN)
        protected _format: string
    ) { }

    ngOnDestroy(): void {
        this.width$.unsubscribe();
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'carousel-content');
        this.setupItemWidth(this._carousel.width);
        this.listenCarouselWidthChange();
    }

    protected setupItemWidth(width: number): void {
        this._renderer.setStyle(this._element.nativeElement, 'min-width', width === 0 ? '100%' : `${width}px`);
        this._renderer.setStyle(this._element.nativeElement, 'max-width', width === 0 ? '100%' : `${width}px`);
    }

    protected parseMetainfoTemplate(template: string, index?: number, total?: number): string {
        return template.replace(/\${index}/, index ? index.toString() : '-1')
        .replace(/\${total}/, total ? total.toString() : '-1');
    }

    private listenCarouselWidthChange(): void {
        this._ngZone.runOutsideAngular(() =>
            this.width$ = this._carousel.width$.asObservable()
                .subscribe(value => 
                    this._ngZone.run(() => 
                        this.setupItemWidth(value))));
    }

}
