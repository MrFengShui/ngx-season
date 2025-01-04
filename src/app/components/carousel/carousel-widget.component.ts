import { AnimationPlayer, AnimationBuilder, style, animate } from "@angular/animations";
import { coerceBooleanProperty, coerceCssPixelValue, coerceNumberProperty } from "@angular/cdk/coercion";
import { TemplatePortal } from "@angular/cdk/portal";
import { Component, AfterViewInit, Input, ViewChild, ElementRef, Renderer2, NgZone, Output, EventEmitter, ViewChildren, QueryList, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { BehaviorSubject, Subscription, interval, take } from "rxjs";

import { NGXSeasonCarouselSelectionModel } from "./carousel.component";

import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";

// @Component({
//     changeDetection: ChangeDetectionStrategy.OnPush,
//     selector: 'ngx-sui-carousel-viewport',
//     template: `
//         <div class="wrapper" #wrapper>
//             <div class="carousel-panel" #panel *ngFor="let portal of portals"><ng-template [cdkPortalOutlet]="portal"></ng-template></div>
//         </div>
//     `
// })
// export class NGXSeasonCarouselViewportComponent implements AfterViewInit {

//     @Input({ alias: 'duration' })
//     set duration(duration: number | string | undefined | null) {
//         this._duration = coerceNumberProperty(duration);
//     }

//     get duration(): number {
//         return this._duration;
//     }

//     @Input({ alias: 'offset' })
//     set offset(offset: number | string | undefined | null) {
//         this._offset = coerceNumberProperty(offset);
//     }

//     get offset(): number {
//         return this._offset;
//     }

//     @Input({ alias: 'portals' })
//     set portals(portals: TemplatePortal[] | undefined | null) {
//         this._portals = portals || undefined;
//     }

//     get portals(): TemplatePortal[] | undefined {
//         return this._portals;
//     }

//     private _duration: number = 0;
//     private _offset: number = 0;
//     private _portals: TemplatePortal[] | undefined;

//     @Output('readyChange')
//     readyChange: EventEmitter<boolean> = new EventEmitter(true);

//     @ViewChild('wrapper', { read: ElementRef, static: true })
//     protected wrapper: ElementRef<HTMLElement> | undefined;

//     @ViewChildren('panel', { read: ElementRef })
//     protected panels: QueryList<ElementRef<HTMLElement>> | undefined;

//     private player: AnimationPlayer | undefined;

//     constructor(
//         protected _builder: AnimationBuilder,
//         protected _element: ElementRef,
//         protected _renderer: Renderer2,
//         protected _ngZone: NgZone
//     ) { }

//     ngAfterViewInit(): void {
//         this._renderer.addClass(this._element.nativeElement, 'viewport');
//     }

//     resize(width: number, height: number): void {
//         if (this.panels) {
//             for (const panel of this.panels) {
//                 this._renderer.setStyle(panel.nativeElement, 'width', coerceCssPixelValue(width));
//                 this._renderer.setStyle(panel.nativeElement, 'height', coerceCssPixelValue(height));
//             }
//         }
//     }

//     translate(prevIndex: number, nextIndex: number): void {
//         this.terminate();
//         this.animate(prevIndex, nextIndex, this.offset);
//     }

//     private animate(prevIndex: number, nextIndex: number, offset: number): void {
//         this.player = this._builder.build([
//             style({ transform: `translateX(-${coerceCssPixelValue(Math.abs(prevIndex * offset))})` }),
//             animate(`${this.duration}ms`, style({ transform: `translateX(-${coerceCssPixelValue(Math.abs(nextIndex * offset))})` }))
//         ]).create(this.wrapper?.nativeElement);
//         this.player.onDone(() => this.readyChange.emit(true));
//         this.player.onStart(() => this.readyChange.emit(false));
//         this.player.play();
//     }

//     private terminate(): void {
//         if (this.player) {
//             this.player.finish();
//             this.player = undefined;
//         }
//     }

// }

// @Component({
//     changeDetection: ChangeDetectionStrategy.OnPush,
//     selector: 'ngx-sui-carousel-indicator',
//     template: `
//         <ngx-sui-progress-bar [pgsColor]="color" pgsSize="sm" pgsReady [pgsValue]="progress$.asObservable() | async" [pgsThreshold]="threshold" *ngIf="showProgress"></ngx-sui-progress-bar>
//         <ul class="orbit-list" *ngIf="showIndicate">
//             <li class="orbit-item" [class.selected]="nextIndex === idx" *ngx-sui-While="count; index as idx">
//                 <button ngx-sui-IconButton [btnColor]="color" btnCircled btnStyle="solid" (click)="handleSelectPanelEvent(idx)"></button>
//             </li>
//         </ul>
//     `
// })
// export class NGXSeasonCarouselIndicatorComponent implements OnChanges, AfterViewInit {

//     @Input({ alias: 'color' })
//     set color(color: NGXSeasonColorPalette | undefined | null) {
//         this._color = color || 'default';
//     }

//     get color(): NGXSeasonColorPalette | undefined {
//         return this._color;
//     }

//     @Input({ alias: 'count' })
//     set count(count: number | string | undefined | null) {
//         this._count = coerceNumberProperty(count);
//     }

//     get count(): number {
//         return this._count;
//     }

//     @Input({ alias: 'duration' })
//     set duration(duration: number | string | undefined | null) {
//         this._duration = coerceNumberProperty(duration);
//     }

//     get duration(): number {
//         return this._duration;
//     }

//     @Input({ alias: 'ready' })
//     set ready(ready: boolean | string | undefined | null) {
//         this._ready = coerceBooleanProperty(ready);
//     }

//     get ready(): boolean {
//         return this._ready;
//     }

//     @Input({ alias: 'showIndicate' })
//     set showIndicate(showIndicate: boolean | string | undefined | null) {
//         this._showIndicate = coerceBooleanProperty(showIndicate);
//     }

//     get showIndicate(): boolean {
//         return this._showIndicate;
//     }

//     @Input({ alias: 'showProgress' })
//     set showProgress(showProgress: boolean | string | undefined | null) {
//         this._showProgress = coerceBooleanProperty(showProgress);
//     }

//     get showProgress(): boolean {
//         return this._showProgress;
//     }

//     @Input({ alias: 'threshold' })
//     set threshold(threshold: number | string | undefined | null) {
//         this._threshold = coerceNumberProperty(threshold);
//     }

//     get threshold(): number {
//         return this._threshold;
//     }

//     private _color: NGXSeasonColorPalette | undefined;
//     private _count: number = 0;
//     private _duration: number = 0;
//     private _ready: boolean = false;
//     private _showIndicate: boolean = false;
//     private _showProgress: boolean = false;
//     private _threshold: number = 100;

//     @Output('selectionChange')
//     selectionChange: EventEmitter<NGXSeasonCarouselSelectionModel> = new EventEmitter(true);

//     protected prevIndex: number = -1;
//     protected nextIndex: number = 0;

//     protected progress$: BehaviorSubject<number> = new BehaviorSubject(0);

//     private timer$: Subscription = Subscription.EMPTY;

//     constructor(
//         protected _cdr: ChangeDetectorRef,
//         protected _element: ElementRef,
//         protected _renderer: Renderer2,
//         protected _ngZone: NgZone
//     ) {}

//     ngOnChanges(changes: SimpleChanges): void {
//         for (const name in changes) {
//             if (name === 'ready') this.wait(this.duration, coerceBooleanProperty(changes[name].currentValue));
//         }
//     }

//     ngAfterViewInit(): void {
//         this._renderer.addClass(this._element.nativeElement, 'indicator');
//     }

//     setupSelectedIndex(index: number): void;
//     setupSelectedIndex(prevIndex: number, nextIndex: number): void;

//     setupSelectedIndex(...args: number[]): void {
//         if (args.length === 1) this.nextIndex = args[0];

//         if (args.length === 2) {
//             this.prevIndex = args[0];
//             this.nextIndex = args[1];
//         }

//         this._cdr.markForCheck();
//     }

//     protected handleSelectPanelEvent(index: number): void {
//         if (this.nextIndex !== index) {
//             this.timer$.unsubscribe();

//             this.prevIndex = this.nextIndex;
//             this.nextIndex = index;
//             this.selectionChange.emit({ prevIndex: this.prevIndex, nextIndex: this.nextIndex });
//         }
//     }

//     private cycle(): void {
//         this.prevIndex = this.nextIndex;
//         this.nextIndex = (this.nextIndex + 1) % this.count;
//         this.selectionChange.emit({ prevIndex: this.prevIndex, nextIndex: this.nextIndex });
//     }

//     private wait(duration: number, ready: boolean): void {
//         this.timer$.unsubscribe();

//         if (ready) {
//             this._ngZone.runOutsideAngular(() =>
//                 this.timer$ = interval(1).pipe(take(duration)).subscribe({
//                     next: value => this.progress$.next(value),
//                     complete: () => {
//                         this.cycle();
//                         this.timer$.unsubscribe();
//                     }
//                 }));
//         }
//     }

// }

