import {animate, AnimationBuilder, AnimationPlayer, state, style, transition, trigger} from "@angular/animations";
import {coerceBooleanProperty, coerceNumberProperty} from "@angular/cdk/coercion";
import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    Directive,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    HostListener,
    Inject,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    Output,
    QueryList,
    Renderer2,
    SimpleChanges,
    ViewChild
} from "@angular/core";
import {Subscription} from "rxjs";

import {OCTOPUS_TAB_HEADER_POSITIONS, OctopusColorPalette, OctopusTabHeaderPosition} from "../global/enums.utils";

import {OctopusSelectedIndexChange} from "../global/event.model";

@Directive({
    selector: 'octo-icon[octo-tab-thumb], img[octo-tab-thumb]'
})
export class OctopusTabThumbnail {

    @HostBinding('class') class: string = 'octo-tab-thumb';

}

@Component({
    animations: [
        trigger('MARK_SHOW_HIDE', [
            state('show', style({opacity: 1.0})),
            state('hide', style({opacity: 0.0})),
            transition('show <=> hide', animate('250ms linear'))
        ])
    ],
    selector: 'button[octo-tab], a[octo-tab]',
    template: `
        <div octo-ripple></div>
        <ng-content select="octo-icon[octo-tab-thumb], img[octo-tab-thumb]"></ng-content>
        <span class="octo-tab-label">{{label}}</span>
        <ng-container *ngIf="close">
            <span class="flex-fill"></span>
            <button octo-btn octoShape="ring" class="ml-100" style="width: 0.75rem;height: 0.75rem;"
                    (click)="$event.stopPropagation()">
                <octo-icon octoSize="1rem">close</octo-icon>
            </button>
        </ng-container>
        <div [@MARK_SHOW_HIDE]="selected ? 'show' : 'hide'" class="select-mark select-mark-{{color}}"></div>
    `
})
export class OctopusTab implements AfterContentInit, AfterViewInit {

    @Input('octoColor') color: OctopusColorPalette = 'base';

    @Input('octoClose')
    get close() {
        return this._close;
    }

    set close(_close: boolean | string | null) {
        this._close = coerceBooleanProperty(_close);
    }

    private _close: boolean | string | null = false;

    @Input('octoLabel') label: string = '';

    @Input('octoSelect')
    get selected() {
        return this._selected;
    }

    set selected(_selected: boolean | string | null) {
        this._selected = coerceBooleanProperty(_selected);
    }

    private _selected: boolean | string | null = false;

    @ContentChildren(OctopusTabThumbnail)
    private thumbs!: QueryList<OctopusTabThumbnail>;

    @HostBinding('class') class: string = 'octo-tab';

    @HostListener('click')
    private handleClickAction(): void {
        if (this.index !== coerceNumberProperty(this._header.index)) {
            this._header.selection(this.index);
        }
    }

    index: number = -1;

    constructor(
        private _cdr: ChangeDetectorRef,
        private _element: ElementRef,
        private _render: Renderer2,
        @Inject(forwardRef(() => OctopusTabHeader))
        private _header: OctopusTabHeader
    ) {
    }

    ngAfterContentInit() {
        if (this.thumbs && this.thumbs.length > 1) {
            throw new Error();
        }
    }

    ngAfterViewInit() {
        let task = setTimeout(() => {
            clearTimeout(task);
            this.selected = this.index === coerceNumberProperty(this._header.index);
            this._cdr.detectChanges();
        });
    }

}

@Component({
    selector: 'octo-tab-header',
    template: `
        <button octo-btn [octoColor]="color" style="border-radius: 0;min-width: 3rem;"
                (click)="decrement(index);scrollTo(wrapper, false)">
            <octo-icon>chevron_left</octo-icon>
        </button>
        <div class="octo-tab-header-wrapper" #wrapper>
            <ng-content select="button[octo-tab], a[octo-tab]"></ng-content>
        </div>
        <button octo-btn [octoColor]="color" style="border-radius: 0;min-width: 3rem;"
                (click)="increment(index);scrollTo(wrapper, true);">
            <octo-icon>chevron_right</octo-icon>
        </button>
    `
})
export class OctopusTabHeader implements OnChanges, OnDestroy, AfterViewInit {

    @Input('octoColor') color: OctopusColorPalette = 'base';
    @Input('octoIndex') index: number | string = 0;
    @Input('octoPos') position: OctopusTabHeaderPosition = 'top';

    @Output('octoSelectChange') change: EventEmitter<OctopusSelectedIndexChange> = new EventEmitter<OctopusSelectedIndexChange>();

    @ContentChildren(OctopusTab) tabs!: QueryList<OctopusTab>;

    @ViewChild('wrapper', {read: ElementRef})
    private wrapper!: ElementRef;

    @HostBinding('class') class: string = 'octo-tab-header';

    private subscription!: Subscription;
    private prevIndex: number = -1;

    constructor(
        @Inject(forwardRef(() => OctopusTabPane))
        private _tabpane: OctopusTabPane,
        private _element: ElementRef,
        private _render: Renderer2,
        private _zone: NgZone
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['color']) {
            this.renderColor(changes['color'].currentValue);
        }

        if (changes['position']) {
            this.renderPosition(changes['position'].currentValue);
        }
    }

    ngOnDestroy() {
        this.change.complete();

        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    ngAfterViewInit() {
        this.renderColor(this.color);
        this.initTabIndex();
        this.listenSelection();
        this.renderPosition(this.position);
    }

    decrement(index: number | string): void {
        if (coerceNumberProperty(index) > 0) {
            this.prevIndex = coerceNumberProperty(index);
            this.index = coerceNumberProperty(index) - 1;
            this.change.emit({currIndex: this.index, prevIndex: this.prevIndex});
        }
    }

    increment(index: number | string): void {
        if (coerceNumberProperty(index) < this.tabs.length - 1) {
            this.prevIndex = coerceNumberProperty(index);
            this.index = coerceNumberProperty(index) + 1;
            this.change.emit({currIndex: this.index, prevIndex: this.prevIndex});
        }
    }

    selection(index: number | string): void {
        this.prevIndex = coerceNumberProperty(this.index);
        this.index = coerceNumberProperty(index);
        this.change.emit({currIndex: this.index, prevIndex: this.prevIndex});
        this.scrollTo(this.wrapper.nativeElement, coerceNumberProperty(this.index) > coerceNumberProperty(this.prevIndex));
    }

    scrollTo(element: HTMLElement, flag: boolean): void {
        element.scrollTo({
            left: flag
                ? Math.min(element.scrollLeft + 120, element.scrollWidth - element.clientWidth)
                : Math.max(element.scrollLeft - 120, 0)
        });
    }

    private listenSelection(): void {
        this.subscription = this._zone.runOutsideAngular(() =>
            this.change.asObservable().subscribe(value => {
                if (this.tabs) {
                    this.tabs.get(value.currIndex)!.selected = true;
                    this.tabs.get(value.prevIndex)!.selected = false;
                }
            }));
    }

    private initTabIndex(): void {
        if (this.tabs) {
            this.tabs.forEach((tab, index) => tab.index = index);
        }
    }

    private renderColor(color: OctopusColorPalette): void {
        if (this.tabs) {
            this.tabs.forEach(tab => tab.color = color);
        }
    }

    private renderPosition(position: OctopusTabHeaderPosition): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            OCTOPUS_TAB_HEADER_POSITIONS.forEach(item =>
                this._render.removeClass(this._element.nativeElement, `octo-tab-header-${item}`));
            this._render.addClass(this._element.nativeElement, `octo-tab-header-${position}`);

            if (position === 'top') {
                this._render.setStyle(this._tabpane._element.nativeElement, 'flex-direction', `column`);
            }

            if (position === 'bottom') {
                this._render.setStyle(this._tabpane._element.nativeElement, 'flex-direction', `column-reverse`);
            }
        });
    }

}

@Component({
    selector: 'octo-tabbox',
    template: `
        <ng-content></ng-content>`
})
export class OctopusTabbBox {

    @HostBinding('class') class: string = 'octo-tabbox';

    constructor(public _element: ElementRef) {
    }

}

@Component({
    selector: 'octo-tab-content',
    template: `<div class="octo-tab-content-wrapper" #wrapper><ng-content select="octo-tabbox"></ng-content></div>`

})
export class OctopusTabContent implements OnDestroy, AfterViewInit {

    @ViewChild('wrapper', {read: ElementRef})
    private wrapper!: ElementRef;

    @HostBinding('class') class: string = 'octo-tab-content';

    private subscription!: Subscription;

    constructor(
        @Inject(forwardRef(() => OctopusTabPane))
        private _tabpane: OctopusTabPane,
        private _builder: AnimationBuilder,
        private _element: ElementRef,
        private _render: Renderer2,
        private _zone: NgZone
    ) {
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    ngAfterViewInit() {
        if (this._tabpane.headers) {
            this.subscription = this._zone.runOutsideAngular(() =>
                this._tabpane.headers.first.change.asObservable().subscribe(value =>
                    this.swap(value.currIndex, value.prevIndex)));
        }
    }

    swap(currIndex: number | string, prevIndex: number | string): void {
        let task = setTimeout(() => {
            clearTimeout(task);

            let player: AnimationPlayer | null = this._builder.build([
                style({transform: `translateX(-${100 * coerceNumberProperty(prevIndex)}%)`}),
                animate('250ms linear',
                    style({transform: `translateX(-${100 * coerceNumberProperty(currIndex)}%)`}))
            ]).create(this.wrapper.nativeElement);
            player.play();
            player.onDone(() => player = null);
        });
    }

}

@Component({
    selector: 'octo-tab-pane',
    template: `
        <ng-content select="octo-tab-header"></ng-content>
        <octo-split-line class="my-0"></octo-split-line>
        <ng-content select="octo-tab-content"></ng-content>
    `
})
export class OctopusTabPane implements AfterContentInit {

    @Input('octoColor') color: OctopusColorPalette = 'base';
    @Input('ocotClose') close: boolean | string | null = false;
    @Input('octoIndex') index: number | string = 0;

    @Output('octoIndexChange') indexChange: EventEmitter<number> = new EventEmitter<number>();

    @ContentChildren(OctopusTabHeader) headers!: QueryList<OctopusTabHeader>;
    @ContentChildren(OctopusTabContent) contents!: QueryList<OctopusTabContent>;

    @HostBinding('class') class: string = 'octo-tab-pane';

    constructor(
        private _builder: AnimationBuilder,
        public _element: ElementRef
    ) {
    }

    ngAfterContentInit() {
        if (this.headers && this.headers.length > 1) {
            throw new Error();
        }

        if (this.contents && this.contents.length > 1) {
            throw new Error();
        }
    }

}
