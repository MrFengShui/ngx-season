import {
    AfterViewInit, ChangeDetectorRef,
    Component,
    ContentChildren, ElementRef,
    EventEmitter,
    HostBinding,
    Input, NgZone, OnChanges, OnDestroy,
    Output,
    QueryList, Renderer2, SimpleChanges,
    TemplateRef,
    ViewChild, ViewChildren
} from "@angular/core";

import {OctopusColorPalette} from "../global/enums.utils";
import {OctopusSelectedIndexChange} from "../global/event.model";
import {coerceNumberProperty} from "@angular/cdk/coercion";
import {animate, AnimationBuilder, AnimationPlayer, style} from "@angular/animations";
import {map, Subscription, timer} from "rxjs";

@Component({
    selector: 'octo-carousel-item',
    template: `<ng-template #template><ng-content></ng-content></ng-template>`
})
export class OctopusCarouselItem {

    @Input('octoSub') subject: string = '';
    @Input('octoDesc') description: string = '';

    @ViewChild('template', {read: TemplateRef}) template!: TemplateRef<any>;

    constructor(public _element: ElementRef) {
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
            <div class="octo-carousel-box" #box *ngFor="let item of items; index as i">
                <ng-container [ngTemplateOutlet]="item.template"></ng-container>
            </div>
        </div>
        <div class="octo-carousel-foot">
            <button octo-btn [octoColor]="color" octoShape="ring" (click)="selectLeftItem()">
                <octo-icon>chevron_left</octo-icon>
            </button>
            <div class="octo-carousel-orbit-wrapper sx-50">
                <button octo-solid-btn [octoColor]="i === index ? color : 'base'" octoShape="ring"
                        (click)="selectAnyItem(i)" *ngFor="let item of items; index as i"></button>
            </div>
            <button octo-btn [octoColor]="color" octoShape="ring" (click)="selectRightItem()">
                <octo-icon>chevron_right</octo-icon>
            </button>
        </div>
        <ng-content select="[octo-carousel-item]"></ng-content>
    `
})
export class OctopusCarousel implements OnChanges, OnDestroy, AfterViewInit {

    @Input('octoColor') color: OctopusColorPalette = 'primary';
    @Input('octoDelay') delay: number | string = 5000;
    @Input('octoIndex') index: number | string = 0;
    @Input('octoWidth') width: string = '40rem';
    @Input('octoHeight') height: string = '22.5rem';

    @Output('octoSelectedChange') change: EventEmitter<OctopusSelectedIndexChange> =
        new EventEmitter<OctopusSelectedIndexChange>();

    @ContentChildren(OctopusCarouselItem) items!: QueryList<OctopusCarouselItem>;

    @ViewChild('body', {read: ElementRef})
    private body!: ElementRef;

    @ViewChildren('box', {read: ElementRef})
    private boxes!: QueryList<ElementRef>;

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
        if (changes['delay']) {
            this.loop(changes['delay'].currentValue);
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
        this.renderDimension(this.width, this.height);
        this.loop(this.delay);
    }

    selectAnyItem(index: number | string): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        this.selection(coerceNumberProperty(index));
        this.loop(this.delay);
    }

    selectRightItem(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        this.increment(coerceNumberProperty(this.index));
        this.loop(this.delay);
    }

    selectLeftItem(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        this.decrement(coerceNumberProperty(this.index));
        this.loop(this.delay);
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

    private selection(index: number | string): void {
        this.prevIndex = coerceNumberProperty(this.index);
        this.index = index;
        this.change.next({currIndex: coerceNumberProperty(this.index), prevIndex: this.prevIndex});
        this.createEnterAnimate(coerceNumberProperty(this.index), this.prevIndex,
            coerceNumberProperty(this.index) > this.prevIndex);
        this.createExitAnimate(this.prevIndex, coerceNumberProperty(this.index),
            coerceNumberProperty(this.index) > this.prevIndex);
    }

    private loop(delay: number | string): void {
        this.subscription = this._zone.runOutsideAngular(() =>
            timer(coerceNumberProperty(delay), coerceNumberProperty(delay))
                .pipe(map(() => coerceNumberProperty(this.index) % this.items.length))
                .subscribe(value => {
                    this.increment(value);
                    this._zone.run(() => this._cdr.markForCheck());
                }));
    }

    private initialize(index: number | string): void {
        if (this.boxes) {
            this.boxes.forEach((box, i) => {
                if (i === coerceNumberProperty(index)) {
                    this._render.setStyle(box.nativeElement, 'visibility', 'visible');
                } else {
                    this._render.setStyle(box.nativeElement, 'visibility', 'hidden');
                }
            });
        }
    }

    private createEnterAnimate(currIndex: number, prevIndex: number, flag: boolean): void {
        let currBox: any = this.boxes.get(currIndex)?.nativeElement;
        let prevBox: any = this.boxes.get(prevIndex)?.nativeElement;
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
        let currBox: any = this.boxes.get(currIndex)?.nativeElement;
        let prevBox: any = this.boxes.get(prevIndex)?.nativeElement;
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

    private renderDimension(width: string, height: string): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            this._render.setStyle(this._element.nativeElement, 'width', width);
            this._render.setStyle(this.body.nativeElement, 'width', width);
            this._render.setStyle(this.body.nativeElement, 'height', height);
        });
    }

}
