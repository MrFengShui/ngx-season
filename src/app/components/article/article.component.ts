import { HttpClient } from "@angular/common/http";
import { Component, AfterViewInit, ElementRef, Renderer2, Input, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, NgZone, OnChanges, SimpleChanges, HostListener } from "@angular/core";
import { map, Observable, of, Subject, Subscription, switchMap } from "rxjs";

import moment from "moment";
import { coerceBooleanProperty, coerceNumberProperty } from "@angular/cdk/coercion";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

export type NGXSeasonArticleWidgetName = 'title' | 'subtitle' | 'heading' | 'subheading' | 'paragraph' | 'reference' | 'figure';
export type NGXSeasonArticleReferenceMetainfo = { date: string, from: string, link: string, text: string };

@Component({
    selector: 'article[ngx-sui-Article]',
    template: `<ng-content select="ng-container, div, h1[ngx-sui-Headline], h2[ngx-sui-Title], h3[ngx-sui-Subtitle], h4[ngx-sui-Heading], h5[ngx-sui-Subheading], p[ngx-sui-Paragraph], figure[ngx-sui-Figure], div[ngx-sui-Reference]"></ng-content>`
})
export class NGXSeasonArticleComponent implements OnChanges, AfterViewInit {

    @Input('artForbid')
    set forbidden(forbidden: boolean | string | undefined | null) {
        this._forbidden = coerceBooleanProperty(forbidden);
    }

    get forbidden(): boolean {
        return this._forbidden;
    }

    private _forbidden: boolean = true;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'forbidden') this.setupArticleForbidden(coerceBooleanProperty(changes[name].currentValue));
        }
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'article');

        this.setupArticleForbidden(this.forbidden);
    }

    protected setupArticleForbidden(forbidden: boolean): void {
        const element: HTMLElement = this._element.nativeElement;

        if (forbidden) {
            this._renderer.setStyle(element, 'user-select', 'none');
            this._element.nativeElement.oncontextmenu = (event: MouseEvent) => { return false; }
        } else {
            this._renderer.removeStyle(element, 'user-select');
            this._element.nativeElement.oncontextmenu = (event: MouseEvent) => { return true; }
        }
    }
}

@Component({
    selector: 'div[ngx-sui-FigureGroup]',
    template:  `<ng-content select="figure[ngx-sui-Figure]"></ng-content>`
})
export class NGXSeasonArticleFigureGroupComponent implements AfterViewInit {

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) { }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'figure-group');
    }

}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'figure[ngx-sui-Figure]',
    template: `
        <img [attr.src]="base64" [attr.alt]="imageAlt" [attr.width]="imageWidth" [attr.height]="imageHeight">
        <figcaption class="caption">{{ caption }}</figcaption>
    `
})
export class NGXSeasonArticleFigureComponent implements AfterViewInit {

    @Input('figCaption')
    set caption(caption: string | undefined | null) {
        this._caption = caption || undefined;
    }

    get caption(): string | undefined {
        return this._caption;
    }

    @Input('figImageAlt')
    set imageAlt(imageAlt: string | undefined | null) {
        this._imageAlt = imageAlt || undefined;
    }

    get imageAlt(): string | undefined {
        return this._imageAlt;
    }

    @Input('figImageSrc')
    set imageSrc(imageSrc: string | undefined | null) {
        this._imageSrc = imageSrc || undefined;
    }

    get imageSrc(): string | undefined {
        return this._imageSrc;
    }

    @Input('figImageWidth')
    set imageWidth(imageWidth: number | string | undefined | null) {
        this._imageWidth = coerceNumberProperty(imageWidth) || 480;
    }

    get imageWidth(): number {
        return this._imageWidth;
    }

    @Input('figImageHeight')
    set imageHeight(imageHeight: number | string | undefined | null) {
        this._imageHeight = coerceNumberProperty(imageHeight) || 270;
    }

    get imageHeight(): number {
        return this._imageHeight;
    }

    private _caption: string | undefined;
    private _imageAlt: string | undefined;
    private _imageSrc: string | undefined;
    private _imageWidth: number = 480;
    private _imageHeight: number = 270;

    protected base64: SafeResourceUrl | undefined;

    constructor(
        protected _cdr: ChangeDetectorRef,
        protected _http: HttpClient,
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _sanitizer: DomSanitizer,
        protected _ngZone: NgZone
    ) { }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'figure');
        this.fetchImageByBase64(this.imageSrc);
    }

    protected handleImageClickEvent(event: MouseEvent): void {
        event.preventDefault();
    }

    protected fetchImageByBase64(srcURL: string | undefined): void {
        if (!srcURL) throw new Error();

        let subscription: Subscription = this._ngZone.runOutsideAngular(() =>
            this._http.get(srcURL, { responseType: 'blob' })
                .pipe(switchMap(blob =>
                    new Observable<string>(subscriber => {
                        const reader: FileReader = new FileReader();
                        reader.onload = event => {
                            const value = event.target?.result;

                            if (value && typeof value === 'string') subscriber.next(value);

                            subscriber.complete();
                        };
                        reader.onerror = error => subscriber.error(error);
                        reader.readAsDataURL(blob);
                    })))
                .subscribe({
                    next: value =>
                        this._ngZone.run(() => {
                            this.base64 = this._sanitizer.bypassSecurityTrustResourceUrl(value);
                            this._cdr.markForCheck();
                        }),
                    complete: () => subscription.unsubscribe()
                }));
    }

}

@Component({
    selector: 'div[ngx-sui-Reference]',
    template: `
        <h4 ngx-sui-Heading>{{ heading }}</h4>
        <ul class="refer-list">
            <li class="refer-item" *ngFor="let refer of refers">
                <a [attr.href]="refer.link" target="_blank" class="item-link">
                    <span>{{ refer.text }}</span>
                    <ngx-sui-icon iconShape="link" iconSize="sm"></ngx-sui-icon>
                </a>
                <span>{{ refer.from }}</span>
                <span>[{{ checkAndFormat(refer.date) }}]</span>
            </li>
        </ul>
    `
})
export class NGXSeasonArticleReferenceComponent implements AfterViewInit {

    @Input('referHeading')
    set heading(heading: string | undefined | null) {
        this._heading = heading || undefined;
    }

    get heading(): string | undefined {
        return this._heading;
    }

    @Input('referItems')
    set refers(refers: NGXSeasonArticleReferenceMetainfo[] | undefined | null) {
        this._refers = refers || undefined;
    }

    get refers(): NGXSeasonArticleReferenceMetainfo[] | undefined {
        return this._refers;
    }

    private _heading: string | undefined;
    private _refers: NGXSeasonArticleReferenceMetainfo[] | undefined

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) { }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'reference');
    }

    protected checkAndFormat(date: string): string {
        return moment(date, 'YYYY-MM-DD', true).format('YYYY-MM-DD');
    }

}

