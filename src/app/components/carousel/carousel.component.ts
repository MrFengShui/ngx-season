import { coerceNumberProperty } from "@angular/cdk/coercion";
import { AfterViewInit, Component, ContentChildren, ElementRef, EventEmitter, forwardRef, HostBinding, Inject, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, Renderer2, SimpleChanges, ViewChild, ViewChildren, ViewContainerRef } from "@angular/core";
import { interval, Subject, Subscription, timer } from "rxjs";

import { ColorPalette } from "src/app/global/enum.utils";

export class OctopusCarouselChange {

    previousValue: number;
    currentValue: number;

    constructor(_previousValue: number, _currentValue: number) {
        this.previousValue = _previousValue;
        this.currentValue = _currentValue;
    }

}

@Component({
    selector: 'octopus-image-carousel-unit',
    template: `
        <div class="octopus-image-carousel-unit-wrapper">
            <img [src]="source" [alt]="name" width="100%">
            <div class="d-flex flex-column" style="position: absolute;top: 0;left: 0;right: 0;">
                <span class="octopus-carousel-subject">{{subject}}</span>
                <span class="octopus-carousel-description">{{description}}</span>
            </div>
        </div>
    `
})
export class OctopusImageCarouselUnit implements AfterViewInit {

    @Input('name') name: string = '';
    @Input('source') source: string = '';
    @Input('subject') subject: string = '';
    @Input('description') description: string = '';

    @HostBinding('class') class: string = 'octopus-image-carousel-unit';

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2,
        @Inject(forwardRef(() => OctopusImageCarousel))
        private _carousel: OctopusImageCarousel
    ) { }

    ngAfterViewInit() {
        this._render.setStyle(this._ref.nativeElement, 'width', `${this._carousel.fitWidth}px`);
        this._render.setStyle(this._ref.nativeElement, 'height', `${this._carousel.fitHeight}px`);
    }

    show(): void {
        this._render.addClass(this._ref.nativeElement, 'active');
    }

    hide(): void {
        this._render.removeClass(this._ref.nativeElement, 'active');
    }

}

@Component({
    selector: 'octopus-image-carousel',
    templateUrl: './carousel.component.html'
})
export class OctopusImageCarousel implements OnChanges, OnInit, OnDestroy, AfterViewInit {

    @Input('color') color: ColorPalette = 'base';
    @Input('duration') duration: number | string = 5000;
    @Input('index') index: number | string = 0;
    @Input('manner') manner: 'fade' | 'sweep' | 'scale' = 'sweep';
    @Input('width') fitWidth: number | string = 480;
    @Input('height') fitHeight: number | string = 270;
    @Input('shape') shape: 'square' | 'circle' = 'square';

    @Output('change') change: EventEmitter<OctopusCarouselChange> = new EventEmitter();

    @ViewChild('container', { read: ElementRef, static: true }) container!: ElementRef<HTMLElement>;
    @ViewChildren('orbitItem', { read: ElementRef }) orbitItems!: QueryList<ElementRef<HTMLElement>>;
    @ContentChildren(OctopusImageCarouselUnit) units!: QueryList<OctopusImageCarouselUnit>;

    @HostBinding('class') class: string = 'octopus-image-carousel';

    private changeSub!: Subscription;
    private durationSub!: Subscription;

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.color !== undefined) {
            setTimeout(() => this.renderColor(changes.color.previousValue, changes.color.currentValue));
        }

        if (changes.duration !== undefined) {
            setTimeout(() => {
                if (this.durationSub !== undefined) {
                    this.durationSub.unsubscribe();
                }

                this.invokeTask(coerceNumberProperty(changes.duration.currentValue));
            });
        }

        if (changes.fitWidth !== undefined) {
            this.renderSize(coerceNumberProperty(changes.fitWidth.currentValue), coerceNumberProperty(this.fitHeight));
        }

        if (changes.fitHeight !== undefined) {
            this.renderSize(coerceNumberProperty(this.fitWidth), coerceNumberProperty(changes.fitHeight.currentValue));
        }
    }

    ngOnInit() {
        setTimeout(() => {
            this.renderColor(undefined, this.color);
            this.renderSize(coerceNumberProperty(this.fitWidth), coerceNumberProperty(this.fitHeight));
            this.change.next(new OctopusCarouselChange(this.calcPrevIndex(this.index), coerceNumberProperty(this.index)));
        });
    }

    ngAfterViewInit() {
        this.invokeTask(coerceNumberProperty(this.duration));
        this.changeSub = this.change.subscribe(value => {
            if (this.manner == 'fade' || this.manner === 'scale') {
                this.units.get(value.previousValue)?.hide();
                this.units.get(value.currentValue)?.show();
            }

            if (this.manner === 'sweep') {
                this._render.setStyle(this.container.nativeElement, 'transform', `translateX(-${value.currentValue * 100 / this.units.length}%)`);
            }
        });
    }

    ngOnDestroy() {
        if (this.changeSub !== undefined && !this.changeSub.closed) {
            this.changeSub.unsubscribe();
        }

        if (this.durationSub !== undefined && !this.durationSub.closed) {
            this.durationSub.unsubscribe();
        }
    }

    handleSwtichActionEvent(flag: number, currIndex: number = 0): void {
        if (this.durationSub !== undefined) {
            this.durationSub.unsubscribe();
        }

        if (flag === -1) {
            let prevIndex: number = coerceNumberProperty(this.index);
            this.index = (prevIndex - 1) % this.units.length;

            if (this.index === -1) {
                this.index = this.units.length - 1;
            }

            this.change.emit(new OctopusCarouselChange(prevIndex, this.index));
        }

        if (flag === 0) {
            let prevIndex: number = coerceNumberProperty(this.index);
            this.index = currIndex;
            this.change.emit(new OctopusCarouselChange(prevIndex, currIndex));
        }

        if (flag === 1) {
            let prevIndex: number = coerceNumberProperty(this.index);
            this.index = (coerceNumberProperty(this.index) + 1) % this.units.length;
            this.change.emit(new OctopusCarouselChange(prevIndex, this.index));
        }

        this.invokeTask(coerceNumberProperty(this.duration));
    }

    private calcPrevIndex(index: number | string): number {
        if (index === 0) {
            return this.units.length - 1;
        } else {
            return coerceNumberProperty(index) - 1;
        }
    }

    private invokeTask(duration: number): void {
        this.durationSub = timer(duration, duration).subscribe(() => {
            this.index = (coerceNumberProperty(this.index) + 1) % this.units.length;
            this.change.next(new OctopusCarouselChange(this.calcPrevIndex(this.index), this.index));
        });
    }

    private renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-image-carousel' : `octopus-${prevColor}-image-carousel`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-image-carousel`);
    }

    private renderSize(width: number, height: number): void {
        this._render.setStyle(this._ref.nativeElement, 'width', `${width}px`);
        this._render.setStyle(this._ref.nativeElement, 'height', `${height}px`);
    }

}

@Component({
    selector: 'octopus-text-carousel-content',
    template: `
        <div class="octopus-text-carousel-content-wrapper" #wrapper>
            <ng-content></ng-content>
        </div>
    `
})
export class OctopusTextCarouselContent implements AfterViewInit {

    @ViewChild('wrapper', { read: ElementRef, static: true })
    private wrapper!: ElementRef<HTMLElement>;

    @HostBinding('class') class: string = 'octopus-text-carousel-content octopus-carousel-content';

    state$: Subject<'ready' | 'done'> = new Subject();

    private subscription!: Subscription;

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2,
        @Inject(forwardRef(() => OctopusTextCarousel))
        private _carousel: OctopusTextCarousel
    ) { }

    ngAfterViewInit() {
        this._render.setStyle(this._ref.nativeElement, 'font-size', `${this._carousel.size}px`);
        this._render.setStyle(this._ref.nativeElement, 'line-height', `${this._carousel.size}px`);
        this._render.setStyle(this._ref.nativeElement, 'transform', `translateX(${this._carousel.wrapper.nativeElement.clientWidth}px)`);
    }

    start(): void {
        let total: number = 0;
        this.subscription = interval().subscribe(() => {
            if (total === 0) {
                this.state$.next('ready');
            }

            total += 1;
            let offset: number = this._carousel.wrapper.nativeElement.clientWidth - total;
            this._render.setStyle(this._ref.nativeElement, 'transform', `translateX(${offset}px)`);

            if (Math.abs(offset) === this.wrapper.nativeElement.clientWidth) {
                this.stop();
            }
        });
    }

    stop(): void {
        this.state$.next('done');

        if (this.subscription !== undefined) {
            this.subscription.unsubscribe();
        }
    }

}

@Component({
    selector: 'octopus-text-carousel',
    template: `
        <div class="octopus-text-carousel-wrapper" [style.height]="size + 'px'" #wrapper>
            <ng-content select="octopus-text-carousel-content"></ng-content>
        </div>
    `
})
export class OctopusTextCarousel implements OnChanges, OnInit, AfterViewInit {

    @Input('index') index: number | string = 0;
    @Input('size') size: number | string = 32;

    @ContentChildren(OctopusTextCarouselContent) contents!: QueryList<OctopusTextCarouselContent>;

    @ViewChild('wrapper', { read: ElementRef, static: true })
    wrapper!: ElementRef<HTMLElement>;

    @HostBinding('class') class: string = 'octopus-text-carousel';

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.index !== undefined) {
            setTimeout(() => this.renderIndex(coerceNumberProperty(changes.index.currentValue)));
        }

        if (changes.size !== undefined) {
            setTimeout(() => this.renderHeight(coerceNumberProperty(changes.size.currentValue)));
        }
    }

    ngOnInit() {
        setTimeout(() => this.renderHeight(coerceNumberProperty(this.size)));
    }

    ngAfterViewInit() {
        if (this.contents.length > 0) {
            this.renderIndex(coerceNumberProperty(this.index));
        }
    }

    private renderIndex(index: number): void {
        this.contents.get(index)?.start();
        this.contents.get(index)?.state$.asObservable().subscribe(value => {
            console.log(value);
            if (value === 'done') {
                index = (index + 1) % this.contents.length;
                this.index = index;
                let task = setTimeout(() => {
                    clearTimeout(task);
                    this.renderIndex(index);
                }, 2500);
            }
        });
    }

    private renderHeight(size: number): void {
        this._render.setStyle(this._ref.nativeElement, 'height', `${size}px`);
    }

}