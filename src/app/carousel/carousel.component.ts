import {
    AfterViewInit, ChangeDetectorRef,
    Component,
    ContentChildren, Directive, ElementRef,
    EventEmitter,
    HostBinding,
    Input, NgZone, OnChanges, OnDestroy,
    Output,
    QueryList, Renderer2, SimpleChanges,
    TemplateRef,
    ViewChild, ViewChildren
} from "@angular/core";
import {coerceNumberProperty} from "@angular/cdk/coercion";
import {animate, AnimationBuilder, AnimationPlayer, style} from "@angular/animations";
import {map, Subscription, timer} from "rxjs";

import {OctopusColorPalette} from "../global/enums.utils";
import {OctopusSelectedIndexChange} from "../global/event.model";

@Directive({
    selector: '[octo-carousel-item]'
})
export class OctopusCarouselItem {

    @Input('octoSub') subject: string = '';
    @Input('octoDesc') description: string = '';

    constructor(public _template: TemplateRef<any>) {
    }

}

@Component({
    selector: 'octo-carousel-box',
    template: ` <div class="octo-carousel-box-wrapper" #wrapper><ng-content></ng-content></div>`
})
export class OctopusCarouselBox {

    @ViewChild('wrapper', {read: ElementRef}) wrapper!: ElementRef;

    @HostBinding('class') class: string = 'octo-carousel-box';

    constructor(
        private _element: ElementRef,
        private _render: Renderer2
    ) {
    }

}

@Component({
    selector: 'octo-carousel',
    template: `
        <div class="octo-carousel-head sy-25">
            <span class="octo-carousel-sub">{{selectItem(items, index)?.subject}}</span>
            <span class="octo-carousel-desc">{{selectItem(items, index)?.description}}</span>
        </div>
        <div class="octo-carousel-body" #body>
            <octo-carousel-box [class.active]="i === index" #box *ngFor="let item of items; index as i">
                <ng-container [ngTemplateOutlet]="item._template"></ng-container>
            </octo-carousel-box>
        </div>
        <div class="octo-carousel-foot">
            <button octo-solid-btn [octoColor]="color" octoShape="ring" style="width: 3rem;height: 3rem;"
                    (click)="selectLeftItem()">
                <octo-icon>chevron_left</octo-icon>
            </button>
            <div class="octo-carousel-orbit-wrapper sx-50">
                <button octo-solid-btn [octoColor]="i === index ? color : 'base'" octoShape="ring"
                        style="width: 1.5rem;height: 1.5rem;" (click)="selectAnyItem(i)"
                        *ngFor="let item of items; index as i"></button>
            </div>
            <button octo-solid-btn [octoColor]="color" octoShape="ring" style="width: 3rem;height: 3rem;"
                    (click)="selectRightItem()">
                <octo-icon>chevron_right</octo-icon>
            </button>
        </div>
        <ng-content></ng-content>
    `
})
export class OctopusCarousel implements OnChanges, OnDestroy, AfterViewInit {

    @Input('octoColor') color: OctopusColorPalette = 'primary';

    @Input('octoPeriod')
    get period() { return this._period; }
    set period(_period: any) { this._period = coerceNumberProperty(_period); }
    private _period: number = 5000;

    @Input('octoIndex')
    get index() { return this._index; }
    set index(_index: any) { this._index = coerceNumberProperty(_index); }
    private _index: number = 0;

    @Output('octoSelectedChange') change: EventEmitter<OctopusSelectedIndexChange> =
        new EventEmitter<OctopusSelectedIndexChange>();

    @ContentChildren(OctopusCarouselItem) items!: QueryList<OctopusCarouselItem>;

    @ViewChild('body', {read: ElementRef})
    private body!: ElementRef;

    @ViewChildren('box', {read: OctopusCarouselBox})
    private boxes!: QueryList<OctopusCarouselBox>;

    @HostBinding('class') class: string = 'octo-carousel';

    private subscription!: Subscription;
    private prevIndex: number = -1;

    constructor(
        private _builder: AnimationBuilder,
        private _cdr: ChangeDetectorRef,
        private _element: ElementRef,
        private _render: Renderer2,
        private _zone: NgZone
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['period']) {
            this.loop(changes['period'].currentValue);
        }

        if (changes['index']) {
            this.initialize(changes['index'].currentValue);
        }
    }

    ngOnDestroy() {
        this.change.complete();

        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    ngAfterViewInit() {
        this.initialize(this.index);
        this.loop(this.period);
    }

    selectAnyItem(index: number | string): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        this.selection(coerceNumberProperty(index));
        this.loop(this.period);
    }

    selectRightItem(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        this.increment(coerceNumberProperty(this.index));
        this.loop(this.period);
    }

    selectLeftItem(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        this.decrement(coerceNumberProperty(this.index));
        this.loop(this.period);
    }

    selectItem(items: QueryList<OctopusCarouselItem>, index: number | string): OctopusCarouselItem | undefined {
        return items.get(coerceNumberProperty(index));
    }

    private increment(index: number | string): void {
        this.prevIndex = coerceNumberProperty(index);
        this.index = (coerceNumberProperty(index) + 1) % this.items.length;
        this.change.next({currIndex: this.index, prevIndex: this.prevIndex});
        this.createEnterAnimate(this.index, this.prevIndex, true);
        this.createExitAnimate(this.prevIndex, this.index, true);
    }

    private decrement(index: number | string): void {
        this.prevIndex = coerceNumberProperty(index);
        this.index = (coerceNumberProperty(index) - 1) % this.items.length;
        this.index = coerceNumberProperty(this.index) === -1 ? this.items.length - 1 : this.index;
        this.change.next({currIndex: this.index, prevIndex: this.prevIndex});
        this.createEnterAnimate(this.index, this.prevIndex, false);
        this.createExitAnimate(this.prevIndex, this.index, false);
    }

    private selection(index: number): void {
        this.prevIndex = coerceNumberProperty(this.index);
        this.index = index;
        this.change.next({currIndex: this.index, prevIndex: this.prevIndex});
        this.createEnterAnimate(this.index, this.prevIndex, this.index > this.prevIndex);
        this.createExitAnimate(this.prevIndex, this.index, this.index > this.prevIndex);
    }

    private loop(period: number): void {
        this.subscription = this._zone.runOutsideAngular(() => timer(period, period)
            .pipe(map(() => this.index % this.items.length))
            .subscribe(value => {
                this.increment(value);
                this._zone.run(() => this._cdr.markForCheck());
            }));
    }

    private initialize(index: number): void {
        if (this.boxes) {
            this.boxes.forEach((box, i) => {
                if (i === index) {
                    this._render.setStyle(box.wrapper.nativeElement, 'visibility', 'visible');
                } else {
                    this._render.setStyle(box.wrapper.nativeElement, 'visibility', 'hidden');
                }
            });
        }
    }

    private createEnterAnimate(currIndex: number, prevIndex: number, flag: boolean): void {
        let currBox: any = this.boxes.get(currIndex)?.wrapper.nativeElement;
        let prevBox: any = this.boxes.get(prevIndex)?.wrapper.nativeElement;
        let player: AnimationPlayer | null = this._builder.build([
            style({transform: flag ? 'translateX(100%)' : 'translateX(-100%)'}),
            animate('1000ms linear', style({transform: 'translateX(0%)'}))
        ]).create(currBox);
        player.onStart(() => {
            this._render.removeStyle(currBox, 'visibility');
            this._render.removeStyle(prevBox, 'visibility');
        });
        player.onDone(() => player = null);
        player.play();
    }

    private createExitAnimate(currIndex: number, prevIndex: number, flag: boolean): void {
        let currBox: any = this.boxes.get(currIndex)?.wrapper.nativeElement;
        let prevBox: any = this.boxes.get(prevIndex)?.wrapper.nativeElement;
        let player: AnimationPlayer | null = this._builder.build([
            style({transform: 'translateX(0%)'}),
            animate('1000ms linear', style({transform: flag ? 'translateX(-100%)' : 'translateX(100%)'}))
        ]).create(currBox);
        player.onStart(() => {
            this._render.removeStyle(currBox, 'visibility');
            this._render.removeStyle(prevBox, 'visibility');
        });
        player.onDone(() => player = null);
        player.play();
    }

}
