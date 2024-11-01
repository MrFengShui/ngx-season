import { animate, AnimationBuilder, AnimationPlayer, style } from "@angular/animations";
import { coerceNumberProperty } from "@angular/cdk/coercion";
import { AfterViewInit, Component, ContentChildren, ElementRef, EventEmitter, HostListener, Inject, InjectionToken, Input, NgZone, OnDestroy, Output, QueryList, Renderer2, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";

import { NGX_SEASON_CAROUSEL_TOKEN, NGXSeasonCarouselComponent } from "./carousel.component";

import { NGXSeasonSwitchSelectionIndexDispatcher, NGXSeasonSwitchSelectionIndexModel } from "src/app/utils/services/switch-select.service";

export const NGX_SEASON_CAROUSEL_CONTROL_BAR_TOKEN: InjectionToken<NGXSeasonCarouselControlComponent> = new InjectionToken('NGX_SEASON_CAROUSEL_CONTROL_BAR_TOKEN');

@Component({
    selector: 'button[ngx-sui-CarouselControlItem], a[ngx-sui-CarouselControlItem]',
    template: `
        <img [attr.src]="imageSrc" [attr.alt]="imageAlt" width="100%" height="100%"/>
        <span class="triangle triangle-left"></span>
        <span class="triangle triangle-right"></span>
    `
})
export class NGXSeasonCarouselControlItemComponent implements OnDestroy, AfterViewInit {

    @Input('imgAlt')
    set imageAlt(imageAlt: string | undefined) {
        this._imageAlt = imageAlt;
    }

    get imageAlt(): string | undefined {
        return this._imageAlt;
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
    private _imageSrc: string | undefined;
    private _index: number = 0;

    @HostListener('click')
    protected listenHostSelectionEvent(): void {
        if (this.model?.id === this._carousel.id && this.model?.currIndex !== this.index) {
            this._dispatcher.notify(this.model.currIndex, this.index, this._carousel.id);
        }
    }

    private model: NGXSeasonSwitchSelectionIndexModel | undefined;

    private dispatcher$: Subscription = Subscription.EMPTY;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _ngZone: NgZone,

        protected _dispatcher: NGXSeasonSwitchSelectionIndexDispatcher,

        @Inject(NGX_SEASON_CAROUSEL_TOKEN)
        protected _carousel: NGXSeasonCarouselComponent,
    ) { }

    ngOnDestroy(): void {
        this.dispatcher$.unsubscribe();
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'carousel-control-item');
        this.listenCarouselSelectionChange();
    }

    select(): void {
        this._renderer.addClass(this._element.nativeElement, 'selected');
    }

    unselect(): void {
        this._renderer.removeClass(this._element.nativeElement, 'selected');
    }

    private listenCarouselSelectionChange(): void {
        this._ngZone.runOutsideAngular(() => 
            this.dispatcher$ = this._dispatcher.listen().subscribe(model => this.model = model));
    }

}

@Component({
    selector: 'ngx-sui-carousel-control',
    template: `
        <div class="carousel-control-progressbar"><span class="progress" #progress></span></div>
        <div class="carousel-control-wrapper">
            <button ngx-sui-Button btnIcon="angle" btnIconDegree="-90" btnIconOnly="true" (click)="prevToggle()"></button>
            <div class="carousel-control-item-wrapper">
                <ng-content select="[ngx-sui-CarouselControlItem]"></ng-content>
            </div>
            <button ngx-sui-Button btnIcon="angle" btnIconDegree="90" btnIconOnly="true" (click)="nextToggle()"></button>
        </div>
    `,
    providers: [{ provide: NGX_SEASON_CAROUSEL_CONTROL_BAR_TOKEN, useExisting: NGXSeasonCarouselControlComponent }]
})
export class NGXSeasonCarouselControlComponent implements OnDestroy, AfterViewInit {

    @Input('delay')
    set delay(delay: number | string) {
        this._delay = coerceNumberProperty(delay);
    }

    get delay(): number {
        return this._delay;
    }

    @Input('duration')
    set duration(duration: number | string) {
        this._duration = coerceNumberProperty(duration);
    }

    get duration(): number {
        return this._duration;
    }

    private _delay: number = 100;
    private _duration: number = 5000;

    @Output('selectedChange')
    selectedChange: EventEmitter<{ prevIndex: number, currIndex: number }> = new EventEmitter(true);

    @Output('selectedIndexChange')
    selectedIndexChange: EventEmitter<number> = new EventEmitter(true);

    @ContentChildren(NGXSeasonCarouselControlItemComponent)
    protected items: QueryList<NGXSeasonCarouselControlItemComponent> | undefined;

    @ViewChild('progress', { read: ElementRef, static: true })
    protected progress: ElementRef<HTMLElement> | undefined;

    private player: AnimationPlayer | undefined;

    private currIndex: number = -1;
    private prevIndex: number = -1;
    private total: number = -1;

    private totalCount$: Subscription = Subscription.EMPTY;
    private dispatcher$: Subscription = Subscription.EMPTY;

    constructor(
        protected _builder: AnimationBuilder,
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _ngZone: NgZone,

        protected _dispatcher: NGXSeasonSwitchSelectionIndexDispatcher,

        @Inject(NGX_SEASON_CAROUSEL_TOKEN)
        protected _carousel: NGXSeasonCarouselComponent
    ) { }

    ngOnDestroy(): void {
        this.player?.destroy();
        this.totalCount$.unsubscribe();
        this.dispatcher$.unsubscribe();
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'carousel-control');
        this.listenCarouselTotalCountChange();
        this.listenCarouselSelectionChange();
        this.execProgressAnimation(this.progress?.nativeElement, this.duration, this.delay);
    }

    prevToggle(): void {
        this.prevIndex = this.currIndex;
        this.currIndex -= 1;

        if (this.currIndex === -1) this.currIndex = this.total - 1;

        this._dispatcher.notify(this.prevIndex, this.currIndex, this._carousel.id);
    }

    nextToggle(): void {
        this.prevIndex = this.currIndex;
        this.currIndex += 1;

        if (this.currIndex === this.total) this.currIndex = 0;

        this._dispatcher.notify(this.prevIndex, this.currIndex, this._carousel.id);
    }

    private listenCarouselTotalCountChange(): void {
        this._ngZone.runOutsideAngular(() => 
            this.totalCount$ = this._carousel.totalCount$.asObservable().subscribe(value => 
                this._ngZone.run(() => this.total = value)));
    }

    private listenCarouselSelectionChange(): void {
        this._ngZone.runOutsideAngular(() => 
            this.dispatcher$ = this._dispatcher.listen().subscribe(model => 
                this._ngZone.run(() => {
                    if (!this.items) throw new Error();
                    
                    if (model.id === this._carousel.id) {
                        this.currIndex = model.currIndex;
                        this.prevIndex = model.prevIndex;
                        this.selectedChange.emit({ prevIndex: this.prevIndex, currIndex: this.currIndex });
                        this.selectedIndexChange.emit(this.currIndex);
    
                        if (model.currIndex !== -1) this.items.get(model.currIndex)?.select();
    
                        if (model.prevIndex !== -1) this.items.get(model.prevIndex)?.unselect();
    
                        this.replay();
                    }
                })));
    }

    private execProgressAnimation(element: HTMLElement | undefined, duration: number, delay: number): void {
        if (!element) throw new Error();
        
        if (!this.player) {
            this.player = this._builder.build([
                style({ width: '0' }),
                animate(`${duration}ms`, style({ width: '100%' }))
            ]).create(element, { delay });
        }
        
        this.player.onDone(() => {
            this.nextToggle();
            this.replay();
        });
        this.player.play();
    }

    private replay(): void {
        if (!this.player) throw new Error();

        this.player.pause();
        this.player.reset();
        this.player.play();
    }

}
