import {animate, AnimationBuilder, AnimationPlayer, style} from "@angular/animations";
import {coerceBooleanProperty, coerceNumberProperty} from "@angular/cdk/coercion";
import {
    AfterContentInit, AfterViewInit,
    Component, ContentChild,
    ContentChildren,
    Directive,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input, OnChanges,
    OnDestroy,
    Output,
    QueryList,
    Renderer2, SimpleChanges,
    TemplateRef,
    ViewChild, ViewChildren
} from "@angular/core";
import {fromEvent} from "rxjs";

import {
    OCTOPUS_COLOR_PALETTES,
    OCTOPUS_TAB_HEADER_POSITIONS,
    OctopusColorPalette,
    OctopusTabHeaderPosition
} from "../global/enums.utils";

import {OctopusSelectedIndexChange} from "../global/event.model";

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

@Directive({
    selector: 'button[octo-tabbed-ctrl], a[octo-tabbed-ctrl]'
})
export class OctopusTabbedControl implements AfterViewInit {

    @HostBinding('class') class: string = 'octo-tabbed-ctrl';

    private element: HTMLElement = this._render.createElement('span');

    constructor(
        protected _builder: AnimationBuilder,
        public _element: ElementRef,
        protected _render: Renderer2
    ) {
    }

    ngAfterViewInit() {
        this._render.addClass(this.element, 'active');
        this._render.appendChild(this._element.nativeElement, this.element);
    }

    createActiveAnimate(delay: number, active: boolean): void {
        let player: AnimationPlayer | null = this._builder.build([
            style({opacity: active ? 0.0 : 1.0}),
            animate(`${delay}ms linear`, style({opacity: active ? 1.0 : 0.0}))
        ]).create(this.element);
        player.onDone(() => player = null);
        player.play();
    }

}

@Component({
    selector: 'octo-tabbed-header',
    template: `
        <button octo-btn [octoColor]="color" style="border-radius: 0;min-width: 3rem;"
                (click)="scrollTo(wrapper, false)">
            <octo-icon>chevron_left</octo-icon>
        </button>
        <div class="octo-tabbed-header-wrapper" #wrapper>
            <ng-content select="button[octo-tabbed-ctrl], a[octo-tabbed-ctrl]"></ng-content>
        </div>
        <button octo-btn [octoColor]="color" style="border-radius: 0;min-width: 3rem;"
                (click)="scrollTo(wrapper, true);">
            <octo-icon>chevron_right</octo-icon>
        </button>
    `
})
export class OctopusTabHeader implements OnChanges, OnDestroy, AfterContentInit {

    @Input('octoColor') color: OctopusColorPalette = 'base';
    @Input('octoPos') position: OctopusTabHeaderPosition = 'top';

    @Input('octoDelay')
    get delay() { return this._delay; }
    set delay(_delay: any) { this._delay = coerceNumberProperty(_delay); }
    private _delay: number = 250;

    @Input('octoIndex')
    get index() { return this._index; }
    set index(_index: number) { this._index = coerceNumberProperty(_index); }
    private _index: number = 0;

    @Output('octoSelectChange') change: EventEmitter<OctopusSelectedIndexChange> =
        new EventEmitter<OctopusSelectedIndexChange>();

    @ContentChildren(OctopusTabbedControl)
    private controls!: QueryList<OctopusTabbedControl>;

    @HostBinding('class') class: string = 'octo-tabbed-header';

    private prevIndex: number = -1;

    constructor(
        private _builder: AnimationBuilder,
        private _element: ElementRef,
        private _render: Renderer2
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['color']) {
            this.renderColor(changes['color'].currentValue);
        }

        if (changes['index']) {
            this.initControlActive(changes['index'].currentValue, this.delay);
        }

        if (changes['delay']) {
            this.initControlActive(this.index, changes['delay'].currentValue);
        }

        if (changes['position']) {
            this.renderColor(changes['position'].currentValue);
        }
    }

    ngOnDestroy() {
        this.change.complete();
    }

    ngAfterContentInit() {
        if (this.controls) {
            this.controls.forEach((control, index) => {
                fromEvent(control._element.nativeElement, 'click')
                    .subscribe(() => {
                        if (index !== this.index) {
                            this.selection(index);
                            this.controls.get(this.index)?.createActiveAnimate(this.delay, true);
                            this.controls.get(this.prevIndex)?.createActiveAnimate(this.delay, false);
                        }
                    });
            });
            this.initControlActive(this.index, this.delay);
            this.renderColor(this.color);
            this.renderPosition(this.position);
        }
    }

    selection(index: number | string): void {
        this.prevIndex = coerceNumberProperty(this.index);
        this.index = coerceNumberProperty(index);
        this.change.emit({currIndex: this.index, prevIndex: this.prevIndex});
    }

    scrollTo(element: HTMLElement, flag: boolean): void {
        element.scrollTo({
            left: flag
                ? Math.min(element.scrollLeft + 120, element.scrollWidth - element.clientWidth)
                : Math.max(element.scrollLeft - 120, 0)
        });
    }

    private initControlActive(index: number, delay: number): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            this.controls.forEach(control => control.createActiveAnimate(delay, false));
            this.controls.get(index)?.createActiveAnimate(delay, true);
        });
    }

    private renderColor(color: OctopusColorPalette): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            this.controls.forEach(button => {
                OCTOPUS_COLOR_PALETTES.forEach(item =>
                    this._render.removeClass(button._element.nativeElement, `octo-tabbed-ctrl-${item}`));
                this._render.addClass(button._element.nativeElement, `octo-tabbed-ctrl-${color}`);
            });
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
        <div octo-overflow octoScrollXY="y" [octoColor]="color" class="octo-tabbed-box-wrapper" #wrapper>
            <ng-content></ng-content>
        </div>
    `
})
export class OctopusTabbedBox {

    @Input('octoColor') color: OctopusColorPalette = 'base';

    @ViewChild('wrapper', {read: ElementRef}) wrapper!: ElementRef;

    @HostBinding('class') class: string = 'octo-tabbed-box';

    constructor(
        private _element: ElementRef,
        private _render: Renderer2
    ) {
    }

}

@Component({
    selector: 'octo-tabbed-group',
    template: `
        <octo-tabbed-header [octoColor]="color" [octoIndex]="index" [octoDelay]="delay" [octoPos]="position"
                            (octoSelectChange)="selectTab($event, delay)">
            <button octo-btn octo-tabbed-ctrl *ngFor="let tab of tabs">
                <ng-container [ngTemplateOutlet]="tab.head._template"></ng-container>
                <button octo-solid-btn [octoColor]="color" octoShape="ring" style="width: 1rem;height: 1rem;"
                        (click)="$event.stopPropagation();tab.close.emit();" *ngIf="closed">
                    <octo-icon octoSize="1rem">close</octo-icon>
                </button>
            </button>
        </octo-tabbed-header>
        <octo-split-line class="my-0"></octo-split-line>
        <div class="octo-tabbed-content" #content>
            <octo-tabbed-box [octoColor]="color" [class.active]="index === i" *ngFor="let tab of tabs; index as i">
                <ng-container [ngTemplateOutlet]="tab.body._template"></ng-container>
            </octo-tabbed-box>
        </div>
        <ng-template><ng-content select="octo-tab"></ng-content></ng-template>
    `
})
export class OctopusTabbedGroup implements OnChanges, AfterViewInit {

    @Input('octoColor') color: OctopusColorPalette = 'base';
    @Input('octoPos') position: OctopusTabHeaderPosition = 'top';

    @Input('octoClosed')
    get closed() { return this._closed; }
    set closed(_closed: any) { this._closed = coerceBooleanProperty(_closed); }
    private _closed: boolean  = false;

    @Input('octoDelay')
    get delay() { return this._delay; }
    set delay(_delay: any) { this._delay = coerceNumberProperty(_delay); }
    private _delay: number = 250;

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
        this._render.addClass(this._element.nativeElement, 'octo-shadow-8');
        this.initialize(this.index);
        this.renderPosition(this.position);
    }

    selectTab(change: OctopusSelectedIndexChange, delay: number): void {
        this.createEnterAnimate(change.currIndex, change.prevIndex, delay, change.currIndex > change.prevIndex);
        this.createExitAnimate(change.prevIndex, change.currIndex, delay, change.currIndex > change.prevIndex);
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

    private createEnterAnimate(currIndex: number, prevIndex: number, delay: number, flag: boolean): void {
        let currBox: any = this.boxes.get(currIndex)?.wrapper.nativeElement;
        let prevBox: any = this.boxes.get(prevIndex)?.wrapper.nativeElement;
        let player: AnimationPlayer | null = this._builder.build([
            style({transform: flag ? 'translateX(100%)' : 'translateX(-100%)'}),
            animate(`${delay}ms linear`, style({transform: 'translateX(0%)'}))
        ]).create(currBox);
        player.onStart(() => {
            this._render.removeStyle(currBox, 'visibility');
            this._render.removeStyle(prevBox, 'visibility');
        });
        player.onDone(() => player = null);
        player.play();
    }

    private createExitAnimate(currIndex: number, prevIndex: number, delay: number, flag: boolean): void {
        let currBox: any = this.boxes.get(currIndex)?.wrapper.nativeElement;
        let prevBox: any = this.boxes.get(prevIndex)?.wrapper.nativeElement;
        let player: AnimationPlayer | null = this._builder.build([
            style({transform: 'translateX(0%)'}),
            animate(`${delay}ms linear`,
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
