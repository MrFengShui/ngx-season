import { animate, AnimationBuilder, AnimationPlayer, style } from "@angular/animations";
import { coerceNumberProperty } from "@angular/cdk/coercion";
import { AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, InjectionToken, Input, NgZone, OnChanges, OnDestroy, QueryList, Renderer2, SimpleChanges, ViewChild } from "@angular/core";
import { BehaviorSubject, debounceTime, Subject } from "rxjs";
import { PBKDF2, HmacSHA256 } from "crypto-js";

import * as moment from "moment";
import { NGXSeasonCarouselControlComponent } from "./carousel-control.component";

export const NGX_SEASON_CAROUSEL_TOKEN: InjectionToken<NGXSeasonCarouselComponent> = new InjectionToken('NGX_SEASON_CAROUSEL_TOKEN');

export type NGXSeasonCarouselSelectionModel = { currIndex: number, prevIndex: number };
export type NGXSeasonCarouselMetainfoModel = { imageSrc?: string, imageAlt?: string, imageDesc?: string, imageIndex?: number };
export type NGXSeasonCarouselProgressState = 'start' | 'done' | undefined;

@Component({
    selector: 'ngx-sui-carousel-item',
    template: ''
})
export class NGXSeasonCarouselItemComponent {

    @Input('carslImageAlt')
    set imageAlt(imageAlt: string | undefined) {
        this._imageAlt = imageAlt;
    }

    get imageAlt(): string | undefined {
        return this._imageAlt;
    }

    @Input('carslImageDesc')
    set imageDesc(imageDesc: string | undefined) {
        this._imageDesc = imageDesc;
    }

    get imageDesc(): string | undefined {
        return this._imageDesc;
    }

    @Input('carslImageSrc')
    set imageSrc(imageSrc: string | undefined) {
        this._imageSrc = imageSrc;
    }

    get imageSrc(): string | undefined {
        return this._imageSrc;
    }

    private _imageAlt: string | undefined;
    private _imageDesc: string | undefined;
    private _imageSrc: string | undefined;

}

@Component({
    selector: 'ngx-sui-carousel',
    template: `
        <div class="carousel-content-wrapper" #wrapper>
            <div class="carousel-content-orbit" #orbit>
                <ngx-sui-carousel-content [imgAlt]="item.imageAlt" [imgSrc]="item.imageSrc" [imgDesc]="item.imageDesc" [imgIdx]="idx" *ngFor="let item of (metainfo$ | async); index as idx"></ngx-sui-carousel-content>
            </div>
        </div>
        <ngx-sui-carousel-control [delay]="delay" [duration]="duration" [selectedIndex]="index" (selectionChange)="listenCarouselSelectionChange($event, orbit, width, delay)" #control></ngx-sui-carousel-control>
        <ng-template><ng-content select="ngx-sui-carousel-item"></ng-content></ng-template>
    `,
    providers: [{ provide: NGX_SEASON_CAROUSEL_TOKEN, useExisting: NGXSeasonCarouselComponent }]
})
export class NGXSeasonCarouselComponent implements OnChanges, OnDestroy, AfterContentInit, AfterViewInit {

    @Input('carslDelay')
    set delay(delay: number | string) {
        this._delay = coerceNumberProperty(delay);
    }

    get delay(): number {
        return this._delay;
    }

    @Input('carslDuration')
    set duration(duration: number | string) {
        this._duration = coerceNumberProperty(duration);
    }

    get duration(): number {
        return this._duration;
    }

    @Input('carslIndex')
    set index(index: number | string) {
        this._index = coerceNumberProperty(index);
    }

    get index(): number {
        return this._index;
    }

    @Input('carslWidth')
    set width(width: number | string) {
        this._width = coerceNumberProperty(width);
    }

    get width(): number {
        return this._width;
    }

    private _delay: number = 100;
    private _duration: number = 5000;
    private _index: number = 0;
    private _width: number = 0;

    @ContentChildren(NGXSeasonCarouselItemComponent)
    items: QueryList<NGXSeasonCarouselItemComponent> | undefined;

    @ViewChild('wrapper', { read: ElementRef, static: true })
    protected wrapper: ElementRef<HTMLElement> | undefined;

    @ViewChild('control', { read: NGXSeasonCarouselControlComponent, static: true })
    protected control: NGXSeasonCarouselControlComponent | undefined;

    public id: string = this.generateCarouselID();

    public width$: Subject<number> = new BehaviorSubject(this.width);

    metainfo$: Subject<NGXSeasonCarouselMetainfoModel[]> = new BehaviorSubject<NGXSeasonCarouselMetainfoModel[]>([]);
    progressState$: Subject<NGXSeasonCarouselProgressState> = new BehaviorSubject<NGXSeasonCarouselProgressState>(undefined);

    private metainfo: NGXSeasonCarouselMetainfoModel[] = [];

    constructor(
        protected _builder: AnimationBuilder,
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _ngZone: NgZone
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        let keys: string[] | null = Object.keys(changes);

        if (keys.includes('width')) {
            this.changeCarouselWidth(changes['width'].currentValue as number);
        }

        keys.splice(0);
        keys = null;
    }

    ngOnDestroy(): void {
        this.metainfo.splice(0);
        this.metainfo$.complete();
        this.progressState$.complete();
    }

    ngAfterContentInit(): void {
        if (this.items) {
            if (this.metainfo.length > 0) this.metainfo.splice(0);

            this.items.forEach(item =>
                this.metainfo.push({ imageAlt: item.imageAlt, imageDesc: item.imageDesc, imageSrc: item.imageSrc }));
            this.metainfo$.next(this.metainfo);
        }
    }

    ngAfterViewInit(): void {
        const element: HTMLElement = this._element.nativeElement;
        this._renderer.addClass(element, 'carousel');
        this._renderer.setAttribute(element, 'data-carousel-id', this.id);
        this.changeCarouselWidth(this.width);
        this.listenCarouselProgressStateChange();
    }

    protected changeCarouselWidth(width: number): void {
        this._renderer.setStyle(this.wrapper?.nativeElement, 'width', width === 0 ? '100%' : `${width}px`);
        this.width$.next(width);
    }

    protected listenCarouselSelectionChange(model: NGXSeasonCarouselSelectionModel, element: HTMLElement, width: number, time: number): void {
        this.index = model.currIndex;

        let player: AnimationPlayer = this._builder.build([
            style({ transform: `translateX(-${model.prevIndex * width}px)` }),
            animate(`${time}ms`, style({ transform: `translateX(-${model.currIndex * width}px)` }))
        ]).create(element);
        player.onDone(() => {
            this._renderer.setStyle(element, 'transform', `translateX(-${model.currIndex * width}px)`);
            player.destroy();
        });
        player.play();
    }

    private listenCarouselProgressStateChange(): void {
        this._ngZone.runOutsideAngular(() =>
            this.progressState$.asObservable().pipe(debounceTime(100))
                .subscribe(value =>
                    this._ngZone.run(() => {
                        if (value === 'done') this.control?.nextToggle(this.index);
                    })));
    }

    private generateCarouselID(): string {
        const password: string = 'ngx-sui-carousel-block';
        const salt: string = `${password}_${moment().format('x')}`;
        const key: string = PBKDF2(password, salt, { keySize: 256, iterations: 1024 }).toString();
        return HmacSHA256(salt, key).toString();
    }

}
