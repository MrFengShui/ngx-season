import { animate, AnimationBuilder, AnimationPlayer, style } from "@angular/animations";
import { coerceBooleanProperty, coerceNumberProperty } from "@angular/cdk/coercion";
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, InjectionToken, Input, NgZone, OnChanges, OnDestroy, Output, Renderer2, SimpleChange, SimpleChanges, ViewChild } from "@angular/core";
import { Observable } from "rxjs";

import { NGX_SEASON_CAROUSEL_TOKEN, NGXSeasonCarouselComponent, NGXSeasonCarouselMetainfoModel, NGXSeasonCarouselSelectionModel } from "./carousel.component";

export const NGX_SEASON_CAROUSEL_CONTROL_BAR_TOKEN: InjectionToken<NGXSeasonCarouselControlComponent> = new InjectionToken('NGX_SEASON_CAROUSEL_CONTROL_BAR_TOKEN');

@Component({
    selector: 'button[ngx-sui-CarouselControlItem], a[ngx-sui-CarouselControlItem]',
    template: `
        <img [attr.src]="imageSrc" [attr.alt]="imageAlt" width="100%" height="100%"/>
        <span class="triangle triangle-left"></span>
        <span class="triangle triangle-right"></span>
    `
})
export class NGXSeasonCarouselControlItemComponent implements OnChanges, AfterViewInit {

    @Input('ctrlImageAlt')
    set imageAlt(imageAlt: string | undefined) {
        this._imageAlt = imageAlt;
    }

    get imageAlt(): string | undefined {
        return this._imageAlt;
    }

    @Input('ctrlImageSrc')
    set imageSrc(imageSrc: string | undefined) {
        this._imageSrc = imageSrc;
    }

    get imageSrc(): string | undefined {
        return this._imageSrc;
    }

    @Input('ctrlSelected')
    set selected(selected: boolean | string) {
        this._selected = coerceBooleanProperty(selected);
    }

    get selected(): boolean {
        return this._selected;
    }

    private _imageAlt: string | undefined;
    private _imageSrc: string | undefined;
    private _selected: boolean = false;

    @ViewChild('progress', { read: ElementRef, static: true })
    protected progress: ElementRef<HTMLElement> | undefined;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        const change: SimpleChange | undefined = changes['selected'];

        if (change) this.setupControlItemSelected(coerceBooleanProperty(change.currentValue));
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'carousel-control-item');
        this.setupControlItemSelected(this.selected);
    }

    protected setupControlItemSelected(selected: boolean): void {
        const element: HTMLElement = this._element.nativeElement;

        if (selected) {
            this._renderer.addClass(element, 'selected');
        } else {
            this._renderer.removeClass(element, 'selected');
        }
    }

}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'ngx-sui-carousel-control',
    template: `
        <div class="carousel-control-progressbar"><span class="progress" #progress></span></div>
        <div class="carousel-control-wrapper">
            <button ngx-sui-Button btnIcon="angle" btnIconDegree="-90" btnIconOnly="true" (click)="prevToggle(index)"></button>
            <div class="carousel-control-item-wrapper">
                <a ngx-sui-CarouselControlItem [ctrlImageSrc]="item.imageSrc" [ctrlImageAlt]="item.imageAlt" [ctrlSelected]="index === idx" (click)="currToggle(idx)" *ngFor="let item of metainfo$ | async; index as idx"></a>
            </div>
            <button ngx-sui-Button btnIcon="angle" btnIconDegree="90" btnIconOnly="true" (click)="nextToggle(index)"></button>
        </div>
    `,
    providers: [{ provide: NGX_SEASON_CAROUSEL_CONTROL_BAR_TOKEN, useExisting: NGXSeasonCarouselControlComponent }]
})
export class NGXSeasonCarouselControlComponent implements OnChanges, OnDestroy, AfterViewInit {

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

    @Input('selectedIndex')
    set index(index: number | string) {
        this._index = coerceNumberProperty(index);
    }

    get index(): number {
        return this._index;
    }

    private _delay: number = 100;
    private _duration: number = 5000;
    private _index: number = 0;

    @Output('selectionChange') change: EventEmitter<NGXSeasonCarouselSelectionModel> = new EventEmitter(true);

    @ViewChild('progress', { read: ElementRef, static: true })
    protected progress: ElementRef<HTMLElement> | undefined;

    protected metainfo$: Observable<NGXSeasonCarouselMetainfoModel[]> = this._carousel.metainfo$.asObservable();

    private player: AnimationPlayer | undefined;
    private size: number = 0;

    constructor(
        protected _builder: AnimationBuilder,
        protected _cdr: ChangeDetectorRef,
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _ngZone: NgZone,

        @Inject(NGX_SEASON_CAROUSEL_TOKEN)
        protected _carousel: NGXSeasonCarouselComponent
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        const change: SimpleChange | undefined = changes['index'];

        if (change && this.player) {
            this.player.reset();
            this.executeProgressAnimation();
        }
    }

    ngOnDestroy(): void {
        this.player?.destroy();
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'carousel-control');
        this.listenCarouselMetainfoChange();
        this.executeProgressAnimation();
    }

    currToggle(index: number): void {
        if (this.index !== index) {
            this.change.emit({ currIndex: index, prevIndex: this.index });
            this.index = index;
        }
    }

    prevToggle(index: number): void {
        this.index -= 1;

        if (this.index === -1) this.index = this.size - 1;

        this.change.emit({ currIndex: this.index, prevIndex: index });
    }

    nextToggle(index: number): void {
        this.index += 1;

        if (this.index === this.size) this.index = 0;

        this.change.emit({ currIndex: this.index, prevIndex: index });
    }

    private listenCarouselMetainfoChange(): void {
        this._ngZone.runOutsideAngular(() => 
            this.metainfo$.subscribe(metainfo => 
                this._ngZone.run(() => this.size = metainfo.length)));
    }

    private executeProgressAnimation(): void {
        this.player = this.createProgressAnimation(this.progress?.nativeElement, this.duration, this.delay);
        this.player.onDone(() => {
            this.player?.reset();
            this._carousel.progressState$.next('done');
        });
        this.player.onStart(() => this._carousel.progressState$.next('start'));
        this.player.play();
    }

    private createProgressAnimation(element: HTMLElement | undefined, duration: number, delay: number): AnimationPlayer {
        if (!element) throw new Error();

        return this._builder.build([
            style({ width: '0' }),
            animate(`${duration}ms`, style({ width: '100%' }))
        ]).create(element, { delay });
    }

}
