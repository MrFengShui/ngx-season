import { AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, Renderer2, SimpleChanges, ViewChild, ViewChildren } from "@angular/core";
import { interval, Subject, Subscription } from "rxjs";

import { OctopusCarouselChange, OctopusCarouselShape } from "./carousel.utils";

import { OctopusCarouselImage } from "./image.directive";

@Component({
    selector: 'octopus-carousel',
    templateUrl: './carousel.component.html'
})
export class OctopusCarousel implements OnChanges, OnInit, OnDestroy, AfterViewInit, AfterContentInit {

    @Input('color') color: string = 'primary';
    @Input('width') fitWidth: number | string = 480;
    @Input('height') fitHeight: number | string = 270;
    @Input('shape') shape: OctopusCarouselShape = OctopusCarouselShape.square;

    @Output('change') change: EventEmitter<OctopusCarouselChange> = new EventEmitter();

    @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef<HTMLElement>;
    @ViewChildren('orbitItem', { read: ElementRef, emitDistinctChangesOnly: true }) orbitItems: QueryList<ElementRef<HTMLElement>>;
    @ContentChildren(OctopusCarouselImage) list: QueryList<OctopusCarouselImage>;

    @HostBinding('class') class: string = 'octopus-carousel';

    index$: Subject<number> = new Subject();
    subject$: Subject<string> = new Subject();
    description$: Subject<string> = new Subject();

    private subscription: Subscription;

    private index: number = 0;

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.color !== undefined) {
            this.buildColor(changes.color.previousValue, changes.color.currentValue);
        }

        if (changes.width !== undefined) {
            this.buildSize(changes.width.currentValue, this.fitHeight as number);
        }

        if (changes.height !== undefined) {
            this.buildSize(this.fitWidth as number, changes.height.currentValue);
        }

        if (changes.shape !== undefined) {
            this.buildShape(changes.shape.previousValue, changes.shape.currentValue);
        }
    }

    ngOnInit() {
        this.buildColor(undefined, this.color);
        this.buildSize(this.fitWidth as number, this.fitHeight as number);
        this.buildShape(undefined, this.shape);
        setTimeout(() => {
            this.index$.next(this.index);
            this.subject$.next(this.list.get(this.index).subject);
            this.description$.next(this.list.get(this.index).description);
        });
        setTimeout(() => this.change.next(this.initCarouselChange(this.index, this.list.length)));
    }

    ngAfterViewInit() {
        this.subscription = this.change.subscribe(value => {
            let index: number = value.currentValue;
            this.index$.next(index);
            this.subject$.next(this.list.get(index).subject);
            this.description$.next(this.list.get(index).description);
            this._render.setStyle(this.container.nativeElement, 'transform', `translateX(-${index * 100 / this.list.length}%)`);
        });
    }

    ngAfterContentInit() {
        this.list.forEach(item => item.setDimension(this.fitWidth as number, this.fitHeight as number));
    }

    ngOnDestroy() {
        if (this.subscription !== undefined && !this.subscription.closed) {
            this.subscription.unsubscribe();
        }
    }

    handleSweepActionEvent(flag: number, index: number = 0): void {
        if (flag === -1) {
            this.index = (this.index - 1) % this.list.length;

            if (this.index === -1) {
                this.index = this.list.length - 1;
            }
        }

        if (flag === 0) {
            this.index = index;
        }

        if (flag === 1) {
            this.index = (this.index + 1) % this.list.length;
        }

        this.change.emit(this.initCarouselChange(this.index, this.list.length));
    }

    private initCarouselChange(currIndex: number, size: number): OctopusCarouselChange {
        let prevIndex: number = 0;

        if (currIndex === 0) {
            prevIndex = size - 1;
        } else {
            prevIndex = currIndex - 1;
        }

        return new OctopusCarouselChange(prevIndex, currIndex);
    }

    private buildColor(prevColor: string, currColor: string): void {
        setTimeout(() => {
            this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-carousel' : `octopus-${prevColor}-carousel`);
            this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-carousel`);
        });
    }

    private buildSize(width: number, height: number): void {
        setTimeout(() => {
            this._render.setStyle(this._ref.nativeElement, 'width', `${width}px`);
            this._render.setStyle(this._ref.nativeElement, 'height', `${height}px`);
        });
    }

    private buildShape(prevShape: OctopusCarouselShape, currShape: OctopusCarouselShape): void {
        setTimeout(() => {
            this.orbitItems.forEach(item => {
                this._render.removeClass(item.nativeElement, `${prevShape}`);
                this._render.addClass(item.nativeElement, `${currShape}`);
            });
        });
    }

}