import {animate, AnimationBuilder, AnimationPlayer, style} from "@angular/animations";
import {coerceBooleanProperty, coerceNumberProperty} from "@angular/cdk/coercion";
import {
    AfterContentInit, AfterViewInit, Component, ContentChild,
    ContentChildren,
    Directive,
    ElementRef,
    EventEmitter, forwardRef,
    HostBinding, Inject,
    Input, NgZone, OnChanges,
    OnDestroy,
    Output,
    QueryList,
    Renderer2, SimpleChanges,
    TemplateRef,
    ViewChild, ViewChildren
} from "@angular/core";
import {fromEvent, interval, map, Observable, Subscription} from "rxjs";

import {
    OCTOPUS_COLOR_PALETTES,
    OCTOPUS_TAB_HEADER_POSITIONS,
    OctopusColorPalette,
    OctopusTabHeaderPosition
} from "../global/enums.utils";

import {OctopusSelectedIndexChange} from "../global/event.model";

@Directive({
    selector: 'octo-icon[octo-tabbed-favicon], img[octo-tabbed-favicon]'
})
export class OctopusTabbedFavicon {

    @HostBinding('class') class: string = 'octo-tabbed-favicon';

}

@Directive({
    selector: '[octo-tabbed-unit-head]',
})
export class OctopusTabbedUnitHead {

    constructor(public _template: TemplateRef<any>) {
    }

}

@Directive({
    selector: '[octo-tabbed-unit-body]',
})
export class OctopusTabbedUnitBody {

    constructor(public _template: TemplateRef<any>) {
    }

}

@Component({
    selector: 'octo-tabbed-unit',
    template: `<ng-content></ng-content>`
})
export class OctopusTabbedUnit {

    @Output('octoClose') close: EventEmitter<void> = new EventEmitter<void>();

    @ContentChild(OctopusTabbedUnitHead) head!: OctopusTabbedUnitHead;
    @ContentChild(OctopusTabbedUnitBody) body!: OctopusTabbedUnitBody;

}

@Component({
    selector: 'button[octo-tabbed-ctrl], a[octo-tabbed-ctrl]',
    template: `
        <div octo-ripple></div>
        <ng-content select="octo-icon[octo-tabbed-favicon], img[octo-tabbed-favicon]"></ng-content>
        <div class="octo-tabbed-ctrl-wrapper" [ngStyle]="{'flex': closable ? 'auto' : ''}"><ng-content></ng-content></div>
        <button octo-solid-btn [octoColor]="_header.color" octoShape="ring" class="ml-100"
                style="width: 0.75rem;height: 0.75rem;" (click)="$event.stopPropagation();close.emit();"
                *ngIf="closable">
            <octo-icon octoSize="0.75rem">close</octo-icon>
        </button>
    `
})
export class OctopusTabbedControl {

    @Input('octoClose')
    get closable() { return this._closable; }
    set closable(_closable: any) { this._closable = coerceBooleanProperty(_closable); }
    private _closable: boolean = false;

    @Output() close: EventEmitter<void> = new EventEmitter<void>();

    @HostBinding('class') class: string = 'octo-tabbed-ctrl';

    constructor(
        public _element: ElementRef,
        protected _render: Renderer2,
        @Inject(forwardRef(() => OctopusTabbedHeader))
        public _header: OctopusTabbedHeader
    ) {
    }

}

@Component({
    selector: 'octo-tabbed-header',
    template: `
        <button octo-btn [octoColor]="color" style="border-radius: 0;min-width: 3rem;"
                (click)="scrollTo(wrapper, false)" *ngIf="overflow$ | async">
            <octo-icon>chevron_left</octo-icon>
        </button>
        <div class="octo-tabbed-header-wrapper" #wrapper>
            <ng-content select="button[octo-tabbed-ctrl], a[octo-tabbed-ctrl]"></ng-content>
            <div class="octo-tabbed-mark-track" [style.width]="wrapper$ | async">
                <div class="octo-tabbed-mark" #mark></div>
            </div>
        </div>
        <button octo-btn [octoColor]="color" style="border-radius: 0;min-width: 3rem;"
                (click)="scrollTo(wrapper, true);"  *ngIf="overflow$ | async">
            <octo-icon>chevron_right</octo-icon>
        </button>
    `
})
export class OctopusTabbedHeader implements OnChanges, OnDestroy, AfterContentInit, AfterViewInit {

    @Input('octoColor') color: OctopusColorPalette = 'base';
    @Input('octoPos') position: OctopusTabHeaderPosition = 'top';

    @Input('octoDuration')
    get duration() { return this._duration; }
    set duration(_duration: any) { this._duration = coerceNumberProperty(_duration); }
    private _duration: number = 250;

    @Input('octoIndex')
    get index() { return this._index; }
    set index(_index: any) { this._index = coerceNumberProperty(_index); }
    private _index: number = 0;

    @Output('octoSelectChange') change: EventEmitter<OctopusSelectedIndexChange> =
        new EventEmitter<OctopusSelectedIndexChange>();

    @ContentChildren(OctopusTabbedControl)
    private controls!: QueryList<OctopusTabbedControl>;

    @ViewChild('wrapper', {read: ElementRef})
    private wrapper!: ElementRef;

    @ViewChild('mark', {read: ElementRef})
    private mark!: ElementRef;

    @HostBinding('class') class: string = 'octo-tabbed-header';

    overflow$: Observable<boolean> = interval(10).pipe(map(() =>
        this.wrapper.nativeElement.scrollWidth > this._element.nativeElement.clientWidth));
    wrapper$: Observable<string> = interval(10).pipe(map(() =>
        `${this.wrapper.nativeElement.scrollWidth}px`));

    private subscription!: Subscription;
    private prevIndex: number = -1;

    constructor(
        protected _builder: AnimationBuilder,
        protected _element: ElementRef,
        protected _render: Renderer2,
        protected _zone: NgZone
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['color']) {
            this.renderColor(changes['color'].currentValue);
        }

        if (changes['position']) {
            this.renderColor(changes['position'].currentValue);
        }
    }

    ngOnDestroy() {
        this.change.complete();

        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    ngAfterContentInit() {
        let task = setTimeout(() => {
            clearTimeout(task);

            if (this.controls) {
                this.controls.forEach((control, index) => {
                    fromEvent(control._element.nativeElement, 'click')
                        .subscribe(() => {
                            if (index !== this.index) {
                                this.selection(index);
                            }
                        });
                });
                this.createSelectionAnimate(this.index, this.prevIndex, this.duration);
                this.renderColor(this.color);
                this.renderPosition(this.position);
            }
        }, 1000);
    }

    ngAfterViewInit() {
        this.subscription = this._zone.runOutsideAngular(() =>
            this.change.asObservable().subscribe(value =>
                this.createSelectionAnimate(value.currIndex, value.prevIndex, this.duration)));
    }

    selection(index: number): void {
        this.prevIndex = this.index;
        this.index = index;
        this.change.emit({currIndex: this.index, prevIndex: this.prevIndex});
    }

    scrollTo(element: HTMLElement, flag: boolean): void {
        element.scrollTo({
            left: flag
                ? Math.min(element.scrollLeft + 120, element.scrollWidth - element.clientWidth)
                : Math.max(element.scrollLeft - 120, 0)
        });
    }

    private createSelectionAnimate(currIndex: number, prevIndex: number, duration: number): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            let player: AnimationPlayer | null = this._builder.build([
                style({transform: `translateX(calc(${prevIndex} * 100%))`}),
                animate(`${duration}ms linear`, style({transform: `translateX(calc(${currIndex} * 100%))`}))
            ]).create(this.mark.nativeElement);
            player.onDone(() => player = null);
            player.play();
        });
    }

    private renderColor(color: OctopusColorPalette): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            OCTOPUS_COLOR_PALETTES.forEach(item =>
                this._render.removeClass(this._element.nativeElement, `octo-tabbed-header-${item}`));
            this._render.addClass(this._element.nativeElement, `octo-tabbed-header-${color}`);
        });
    }

    private renderPosition(position: OctopusTabHeaderPosition): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            this.controls.forEach(button => {
                OCTOPUS_TAB_HEADER_POSITIONS.forEach(item =>
                    this._render.removeClass(button._element.nativeElement, `octo-tabbed-ctrl-${item}`));
                this._render.addClass(button._element.nativeElement, `octo-tabbed-ctrl-${position}`)
            });
        });
    }

}

@Component({
    selector: 'octo-tabbed-box',
    template: `
        <div octo-overflow [octoColor]="color" octoScrollXY="xy" class="octo-tabbed-box-wrapper" #wrapper>
            <ng-content></ng-content>
        </div>
    `
})
export class OctopusTabbedBox {

    @Input('octoColor') color: OctopusColorPalette = 'base';

    @ViewChild('wrapper', {read: ElementRef}) wrapper!: ElementRef;

    @HostBinding('class') class: string = 'octo-tabbed-box';

}

@Component({
    selector: 'octo-tabbed-group',
    template: `
        <octo-tabbed-header [octoColor]="color" [octoIndex]="index" [octoDuration]="duration" [octoPos]="position"
                            (octoSelectChange)="selectTab($event, duration)">
            <button octo-tabbed-ctrl [octoClose]="closable" *ngFor="let tab of tabs">
                <ng-container [ngTemplateOutlet]="tab.head._template"></ng-container>
            </button>
        </octo-tabbed-header>
        <octo-split-line class="my-0"></octo-split-line>
        <div class="octo-tabbed-content" [attr.aria-label]="index" #content>
            <octo-tabbed-box [octoColor]="color" [class.active]="index === i" [style.width]="content.clientWidth + 'px'"
                 *ngFor="let tab of tabs; index as i">
                <ng-container [ngTemplateOutlet]="tab.body._template"></ng-container>
            </octo-tabbed-box>
        </div>
        <ng-template><ng-content select="octo-tab"></ng-content></ng-template>
    `
})
export class OctopusTabbedGroup implements OnChanges, AfterViewInit {

    @Input('octoColor') color: OctopusColorPalette = 'base';
    @Input('octoPos') position: OctopusTabHeaderPosition = 'top';

    @Input('octoClose')
    get closable() { return this._closable; }
    set closable(_closable: any) { this._closable = coerceBooleanProperty(_closable); }
    private _closable: boolean  = false;

    @Input('octoDuration')
    get duration() { return this._duration; }
    set duration(_duration: any) { this._duration = coerceNumberProperty(_duration); }
    private _duration: number = 250;

    @Input('octoIndex')
    get index() { return this._index; }
    set index(_index: any) { this._index = coerceNumberProperty(_index); }
    private _index: number = 0;

    @Output('octoIndexChange') indexChange: EventEmitter<number> = new EventEmitter<number>();

    @ContentChildren(OctopusTabbedUnit) tabs!: QueryList<OctopusTabbedUnit>;

    @ViewChildren(OctopusTabbedBox)
    private boxes!: QueryList<OctopusTabbedBox>;

    @HostBinding('class') class: string = 'octo-tabbed-group';

    change!: OctopusSelectedIndexChange;

    constructor(
        private _builder: AnimationBuilder,
        private _element: ElementRef,
        private _render: Renderer2
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['index']) {
            this.initialize(changes['index'].currentValue);
        }

        if (changes['position']) {
            this.renderPosition(changes['position'].currentValue);
        }
    }

    ngAfterViewInit() {
        this.initialize(this.index);
        this.renderPosition(this.position);
    }

    selectTab(change: OctopusSelectedIndexChange, duration: number): void {
        this.index = change.currIndex;
        this.indexChange.emit(this.index);
        let task = setTimeout(() => {
            clearTimeout(task);
            this.createEnterAnimate(change.currIndex, change.prevIndex, duration, change.currIndex > change.prevIndex);
            this.createExitAnimate(change.prevIndex, change.currIndex, duration, change.currIndex > change.prevIndex);
        });
    }

    private initialize(index: number): void {
        let task = setTimeout(() => {
            clearTimeout(task);

            if (this.boxes) {
                this.boxes.forEach((box, i) => {
                    if (i === index) {
                        this._render.setStyle(box.wrapper.nativeElement, 'visibility', 'visible');
                    } else {
                        this._render.setStyle(box.wrapper.nativeElement, 'visibility', 'hidden');
                    }
                });
            }
        }, 1000);
    }

    private renderPosition(position: OctopusTabHeaderPosition): void {
        let task = setTimeout(() => {
            clearTimeout(task);

            if (position === 'top') {
                this._render.setStyle(this._element.nativeElement, 'flex-direction', 'column');
            }

            if (position === 'bottom') {
                this._render.setStyle(this._element.nativeElement, 'flex-direction', 'column-reverse');
            }
        });
    }

    private createEnterAnimate(currIndex: number, prevIndex: number, duration: number, flag: boolean): void {
        let currBox: any = this.boxes.get(currIndex)?.wrapper.nativeElement;
        let prevBox: any = this.boxes.get(prevIndex)?.wrapper.nativeElement;
        let player: AnimationPlayer | null = this._builder.build([
            style({transform: flag ? 'translateX(100%)' : 'translateX(-100%)'}),
            animate(`${duration}ms linear`, style({transform: 'translateX(0%)'}))
        ]).create(currBox);
        player.onStart(() => {
            this._render.removeStyle(currBox, 'visibility');
            this._render.removeStyle(prevBox, 'visibility');
        });
        player.onDone(() => player = null);
        player.play();
    }

    private createExitAnimate(currIndex: number, prevIndex: number, duration: number, flag: boolean): void {
        let currBox: any = this.boxes.get(currIndex)?.wrapper.nativeElement;
        let prevBox: any = this.boxes.get(prevIndex)?.wrapper.nativeElement;
        let player: AnimationPlayer | null = this._builder.build([
            style({transform: 'translateX(0%)'}),
            animate(`${duration}ms linear`,
                style({transform: flag ? 'translateX(-100%)' : 'translateX(100%)'}))
        ]).create(currBox);
        player.onStart(() => {
            this._render.removeStyle(currBox, 'visibility');
            this._render.removeStyle(prevBox, 'visibility');
        });
        player.onDone(() => player = null);
        player.play();
    }

}
