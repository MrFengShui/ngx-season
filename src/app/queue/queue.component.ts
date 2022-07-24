import {
    AfterViewInit,
    Component,
    Directive,
    ElementRef,
    HostBinding,
    Renderer2,
    ContentChildren,
    QueryList,
    AfterContentInit,
    Input,
    OnChanges,
    SimpleChanges, Inject, forwardRef, OnInit, HostListener, Output, EventEmitter
} from "@angular/core";
import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {SelectionModel} from "@angular/cdk/collections";

import {OCTOPUS_COLOR_PALETTES, OctopusColorPalette} from "../global/enums.utils";

export type OctopusSelectQueueChange = {options: OctopusQueueOption[], source: OctopusSelectQueue};
export type OctopusQueueOptionLabelPosition = 'after' | 'before'

@Component({
    selector: 'octo-queue-header',
    template: `<ng-content></ng-content>`
})
export class OctopusQueueHeader {

    @HostBinding('class') class: string = 'octo-queue-header';

}

@Component({
    selector: 'octo-queue-footer',
    template: `<ng-content></ng-content>`
})
export class OctopusQueueFooter {

    @HostBinding('class') class: string = 'octo-queue-footer';

}

@Component({
    selector: 'octo-queue-section',
    template: `
        <ng-content select="[octo-queue-favicon]"></ng-content>
        <ng-content select="[octo-queue-label]"></ng-content>
        <div class="octo-queue-section-wrapper">
            <span class="octo-queue-sub">{{subject}}</span>
            <span class="octo-queue-desc">{{description}}</span>
        </div>
        <ng-content></ng-content>
    `
})
export class OctopusQueueSection {

    @Input('octoSub') subject: string = '';
    @Input('octoDesc') description: string = '';

    @HostBinding('class') class: string = 'octo-queue-section';

}

@Directive({
    selector: '[octo-queue-label]'
})
export class OctopusQueueLabel {

    @HostBinding('class') class: string = 'octo-queue-label';

}

@Directive({
    selector: '[octo-queue-favicon]'
})
export class OctopusQueueFavicon {

    @HostBinding('class') class: string = 'octo-queue-favicon';

}

@Directive({
    selector: '[octo-queue-text]'
})
export class OctopusQueueText {

    @HostBinding('class') class: string = 'octo-queue-text';

}

@Component({
    selector: 'octo-queue-line',
    template: `
        <ng-content select="[octo-queue-favicon]"></ng-content>
        <ng-content></ng-content>
    `
})
export class OctopusQueueLine implements AfterContentInit {

    @ContentChildren(OctopusQueueFavicon)
    private images!: QueryList<OctopusQueueFavicon>;

    @HostBinding('class') class: string = 'octo-queue-line';

    ngAfterContentInit() {
        if (this.images && this.images.length > 1) {
            throw new Error();
        }
    }

}

@Component({
    selector: 'octo-queue-item',
    template: `<ng-content></ng-content>`
})
export class OctopusQueueItem {

    @HostBinding('class') class: string = 'octo-queue-item';

    constructor(
        protected _element: ElementRef,
        protected _render: Renderer2
    ) {
    }

}

@Component({
    selector: 'button[octo-action-queue-item]',
    template: `
        <div octo-ripple></div>
        <ng-content></ng-content>
    `
})
export class OctopusActionQueueItem extends OctopusQueueItem implements OnChanges, AfterViewInit {

    @Input('disabled')
    get disabled() { return this._disabled; }
    set disabled(_disabled: any) { this._disabled = coerceBooleanProperty(_disabled); }
    private _disabled: boolean = false;

    constructor(
        protected override _element: ElementRef,
        protected override _render: Renderer2,
        @Inject(forwardRef(() => OctopusActionQueue))
        private _queue: OctopusActionQueue
    ) {
        super(_element, _render);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['disabled']) {
            this.renderDisabled(changes['disabled'].currentValue);
        }
    }

    ngAfterViewInit() {
        this._render.addClass(this._element.nativeElement, 'octo-action-queue-item');
        this.renderDisabled(this.disabled);
    }

    private renderDisabled(disabled: boolean): void {
        let task = setTimeout(() => {
            clearTimeout(task);

            if (this._queue.disabled || disabled) {
                this._render.setAttribute(this._element.nativeElement, 'disabled', '');
            } else {
                this._render.removeAttribute(this._element.nativeElement, 'disabled');
            }
        });
    }

}

@Component({
    selector: 'a[octo-queue-link]',
    template: `
        <ng-container *ngIf="icons.length <= 1 && texts.length <= 1">
            <ng-content select="[octo-queue-favicon]"></ng-content>
            <ng-content select="span[octo-queue-text]"></ng-content>
        </ng-container>
    `
})
export class OctopusQueueLink extends OctopusQueueItem implements AfterContentInit, AfterViewInit {

    @ContentChildren(OctopusQueueFavicon) icons!: QueryList<OctopusQueueFavicon>;
    @ContentChildren(OctopusQueueText) texts!: QueryList<OctopusQueueText>;

    ngAfterContentInit() {
        if (this.icons && this.icons.length > 1) {
            throw new Error();
        }

        if (this.texts && this.texts.length > 1) {
            throw new Error();
        }
    }

    ngAfterViewInit() {
        this._render.addClass(this._element.nativeElement, 'octo-queue-link');
    }

}

@Component({
    selector: 'octo-queue-option',
    template: `
        <div octo-ripple></div>
        <octo-icon [class.ml-100]="_queue.position === 'before'" [class.mr-100]="_queue.position === 'after'"
                   *ngIf="_queue.multiple">
            {{checked ? 'check_box' : 'check_box_outline_blank'}}
        </octo-icon>
        <octo-icon [class.ml-100]="_queue.position === 'before'" [class.mr-100]="_queue.position === 'after'"
                   *ngIf="!_queue.multiple">
            {{checked ? 'radio_button_checked' : 'radio_button_unchecked'}}
        </octo-icon>
        <div class="octo-queue-option-wrapper"><ng-content></ng-content></div>
    `
})
export class OctopusQueueOption extends OctopusQueueItem implements AfterViewInit {

    @Input('octoValue') value: any = '';

    @Input('octoChecked')
    get checked() { return this._checked; }
    set checked(_checked: any) { this._checked = coerceBooleanProperty(_checked); }
    private _checked: boolean = false;

    @HostListener('click')
    protected click(): void {
        this.toggle();
    }

    constructor(
        protected override _element: ElementRef,
        protected override _render: Renderer2,
        @Inject(forwardRef(() => OctopusSelectQueue))
        public _queue: OctopusSelectQueue
    ) {
        super(_element, _render);
    }

    ngAfterViewInit() {
        this._render.addClass(this._element.nativeElement, 'octo-queue-option');
    }

    toggle(): void {
        if (!this._queue.selection.isMultipleSelection()) {
            this._queue.options.forEach(option => option.checked = false);
        }

        this._queue.selection.toggle(this);
        this.checked = this._queue.selection.selected.indexOf(this) !== -1;

        this._queue.change.emit({options: this._queue.selection.selected, source: this._queue});
    }

    changeLabelPosition(position: OctopusQueueOptionLabelPosition): void {
        if (position === 'after') {
            this._render.setStyle(this._element.nativeElement, 'flex-direction', 'row');
        }

        if (position === 'before') {
            this._render.setStyle(this._element.nativeElement, 'flex-direction', 'row-reverse');
        }
    }

}

@Component({
    selector: 'octo-queue',
    template: `<ng-content></ng-content>`
})
export class OctopusQueue {

    @HostBinding('class') class: string = 'octo-queue';

    constructor(
        protected _element: ElementRef,
        protected _render: Renderer2
    ) {
    }

}

@Component({
    selector: 'octo-action-queue',
    template: `<ng-content></ng-content>`
})
export class OctopusActionQueue extends OctopusQueue implements OnChanges, AfterViewInit {

    @Input('octoColor') color: OctopusColorPalette = 'base';

    @Input('disabled')
    get disabled() { return this._disabled; }
    set disabled(_disabled: any) { this._disabled = coerceBooleanProperty(_disabled); }
    private _disabled: boolean = false;

    ngOnChanges(changes: SimpleChanges) {
        if (changes['color']) {
            this.renderColor(changes['color'].currentValue);
        }
    }

    ngAfterViewInit() {
        this._render.addClass(this._element.nativeElement, 'octo-action-queue');
        this.renderColor(this.color);
    }

    private renderColor(color: OctopusColorPalette): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            OCTOPUS_COLOR_PALETTES.forEach(item =>
                this._render.removeClass(this._element.nativeElement, `octo-action-queue-${item}`));
            this._render.addClass(this._element.nativeElement, `octo-action-queue-${color}`);
        });
    }

}

@Component({
    selector: 'octo-select-queue',
    template: `<ng-content></ng-content>`
})
export class OctopusSelectQueue extends OctopusQueue implements OnChanges, OnInit, AfterViewInit {

    @Input('octoColor') color: OctopusColorPalette = 'base';
    @Input('octoLabelPos') position: OctopusQueueOptionLabelPosition = 'before';

    @Input('octoMulti')
    get multiple() { return this._multiple; }
    set multiple(_multiple: any) { this._multiple = coerceBooleanProperty(_multiple); }
    private _multiple: boolean = false;

    @Output() change: EventEmitter<OctopusSelectQueueChange> = new EventEmitter<OctopusSelectQueueChange>();

    @ContentChildren(OctopusQueueOption) options!: QueryList<OctopusQueueOption>;

    selection!: SelectionModel<OctopusQueueOption>;

    ngOnChanges(changes: SimpleChanges) {
        if (changes['color']) {
            this.renderColor(changes['color'].currentValue);
        }

        if (changes['position']) {
            this.renderPosition(changes['position'].currentValue);
        }
    }

    ngOnInit() {
        this.selection = new SelectionModel<OctopusQueueOption>(this.multiple, [], true);
    }

    ngAfterViewInit() {
        this._render.addClass(this._element.nativeElement, 'octo-select-queue');
        this.renderColor(this.color);
        this.renderPosition(this.position);
    }

    private renderColor(color: OctopusColorPalette): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            OCTOPUS_COLOR_PALETTES.forEach(item =>
                this._render.removeClass(this._element.nativeElement, `octo-select-queue-${item}`));
            this._render.addClass(this._element.nativeElement, `octo-select-queue-${color}`)
        });
    }

    private renderPosition(position: OctopusQueueOptionLabelPosition): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            this.options.forEach(option => option.changeLabelPosition(position));
        });
    }

}
