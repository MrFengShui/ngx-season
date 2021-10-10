import { coerceNumberProperty } from "@angular/cdk/coercion";
import { AfterViewInit, Component, ContentChildren, ElementRef, HostBinding, HostListener, Input, QueryList, Renderer2, SimpleChanges } from "@angular/core";

import { AbstractOctopusButton, AbstractOctopusComponent } from "src/app/global/base.utils";
import { Alignment, ColorPalette, Shape } from "src/app/global/enum.utils";

type Usage = 'north' | 'south' | 'east' | 'west';
type Corner = 'top_left' | 'top_right' | 'bottom_left' | 'bottom_right';

@Component({
    selector: 'button[octopus-button], a[octopus-button]',
    template: `
        <span class="octopus-button-ripple" octopus-ripple [rippleRadius]="size$ | async"></span>
        <ng-content></ng-content>
    `
})
export class OctopusButton extends AbstractOctopusButton {

    @Input('color') color: ColorPalette = 'base';

    @HostBinding('class') class: string = 'octopus-button';

    constructor(
        protected _ref: ElementRef,
        protected _render: Renderer2
    ) {
        super(_ref);
    }

    protected renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-button' : `octopus-${prevColor}-button`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-button`);
    }

}

@Component({
    selector: 'button[octopus-fill-button], a[octopus-fill-button]',
    template: `
        <span class="octopus-button-ripple" octopus-ripple [rippleRadius]="size$ | async"></span>
        <ng-content></ng-content>
    `
})
export class OctopusFillButton extends OctopusButton {

    constructor(
        protected _ref: ElementRef<HTMLElement>,
        protected _render: Renderer2
    ) {
        super(_ref, _render);
    }

    ngOnInit() {
        setTimeout(() => {
            super.ngOnInit();
            this._render.addClass(this._ref.nativeElement, 'octopus-fill-button');
        });
    }

    protected renderColor(prevColor: string | undefined, currColor: string): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-fill-button' : `octopus-${prevColor}-fill-button`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-fill-button`);
    }

}

@Component({
    selector: 'button[octopus-outline-button], a[octopus-outline-button]',
    template: `
        <span class="octopus-button-ripple" octopus-ripple [rippleRadius]="size$ | async"></span>
        <ng-content></ng-content>
    `
})
export class OctopusOutlineButton extends OctopusButton {

    constructor(
        protected _ref: ElementRef<HTMLElement>,
        protected _render: Renderer2
    ) {
        super(_ref, _render);
    }

    ngOnInit() {
        setTimeout(() => {
            super.ngOnInit();
            this._render.addClass(this._ref.nativeElement, 'octopus-outline-button');
        });
    }

    protected renderColor(prevColor: string | undefined, currColor: string): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-outline-button' : `octopus-${prevColor}-outline-button`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-outline-button`);
    }

}

@Component({
    selector: 'button[octopus-icon-button], a[octopus-icon-button]',
    template: `
        <span class="octopus-button-ripple" octopus-ripple [rippleRadius]="size$ | async"></span>
        <ng-content select="octopus-icon, img[octopus-avatar]"></ng-content>
    `
})
export class OctopusIconButton extends OctopusButton {

    constructor(
        protected _ref: ElementRef<HTMLElement>,
        protected _render: Renderer2
    ) {
        super(_ref, _render);
    }

    ngOnInit() {
        setTimeout(() => {
            super.ngOnInit();
            this._render.addClass(this._ref.nativeElement, 'octopus-icon-button');
        });
    }

    protected renderColor(prevColor: string | undefined, currColor: string): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-icon-button' : `octopus-${prevColor}-icon-button`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-icon-button`);
    }

}

@Component({
    selector: 'button[octopus-mix-button], a[octopus-mix-button]',
    template: `
        <span class="octopus-button-ripple" octopus-ripple [rippleRadius]="size$ | async"></span>
        <octopus-icon size="48">{{icon}}</octopus-icon>
        <hr>
        <span class="text">{{text}}</span>
    `
})
export class OctopusMixButton extends OctopusButton {

    @Input('icon') icon: string = '';
    @Input('text') text: string = '';

    @HostBinding('style.white-space') whiteSpace: string = 'nowrap';

    constructor(
        protected _ref: ElementRef<HTMLElement>,
        protected _render: Renderer2
    ) {
        super(_ref, _render);
    }

    ngOnInit() {
        setTimeout(() => {
            super.ngOnInit();
            this._render.addClass(this._ref.nativeElement, 'octopus-mix-button');
        });
    }

    protected renderColor(prevColor: string | undefined, currColor: string): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-mix-button' : `octopus-${prevColor}-mix-button`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-mix-button`);
    }

}

@Component({
    selector: 'button[octopus-scroll-button]',
    template: `
        <span class="octopus-button-ripple" octopus-ripple [rippleRadius]="size$ | async"></span>
        <octopus-icon>{{usage}}</octopus-icon>
    `
})
export class OctopusScrollButton extends AbstractOctopusButton implements AfterViewInit {

    @Input('buttonCorner') corner: Corner = 'bottom_right';

    @Input('buttonCornerOffset')
    get offset(): any { return this._offset; }
    set offset(_offset: any) { this._offset = coerceNumberProperty(_offset); }
    private _offset: any = 10;

    @Input('buttonShape') shape: Shape = 'square';
    @Input('buttonTarget') target: HTMLElement | undefined;
    @Input('buttonUsage') usage: Usage = 'south';

    @HostBinding('class') class: string = 'octopus-scroll-button';

    @HostListener('click')
    listenHostClick(): void {
        super.listenHostClick();

        if (this.usage === 'north') {
            this.container.scrollTo({ top: 0 });
        }

        if (this.usage === 'south') {
            this.container.scrollTo({ top: this.container.scrollHeight - this.container.clientHeight });
        }

        if (this.usage === 'west') {
            this.container.scrollTo({ left: 0 });
        }

        if (this.usage === 'east') {
            this.container.scrollTo({ left: this.container.scrollWidth - this.container.clientWidth });
        }
    }

    private container!: HTMLElement;

    constructor(
        protected _ref: ElementRef,
        protected _render: Renderer2
    ) {
        super(_ref);
    }

    ngOnChanges(changes: SimpleChanges) {
        setTimeout(() => super.ngOnChanges(changes));

        if (changes.corner !== undefined) {
            setTimeout(() => this.renderCorner(changes.corner.currentValue, this.offset));
        }

        if (changes.offset !== undefined) {
            setTimeout(() => this.renderCorner(this.corner, changes.offset.currentValue));
        }

        if (changes.shape !== undefined) {
            setTimeout(() => this.renderShape(changes.shape.previousValue, changes.shape.currentValue));
        }
    }

    ngOnInit() {
        setTimeout(() => {
            super.ngOnInit();
            this.renderCorner(this.corner, this.offset);
            this.renderShape(undefined, this.shape);
        });
    }

    ngAfterViewInit() {
        this.container = this.target === undefined ? this._render.parentNode(this._ref.nativeElement) : this.target;
    }

    private renderCorner(corner: Corner, offset: number): void {
        switch (corner) {
            case 'top_left':
                this._render.setStyle(this._ref.nativeElement, 'top', `${offset}px`);
                this._render.setStyle(this._ref.nativeElement, 'left', `${offset}px`);
                break;
            case 'top_right':
                this._render.setStyle(this._ref.nativeElement, 'top', `${offset}px`);
                this._render.setStyle(this._ref.nativeElement, 'right', `${offset}px`);
                break;
            case 'bottom_left':
                this._render.setStyle(this._ref.nativeElement, 'bottom', `${offset}px`);
                this._render.setStyle(this._ref.nativeElement, 'left', `${offset}px`);
                break;
            case 'bottom_right':
                this._render.setStyle(this._ref.nativeElement, 'bottom', `${offset}px`);
                this._render.setStyle(this._ref.nativeElement, 'right', `${offset}px`);
                break;
        }
    }

    protected renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-base-scroll-button' : `octopus-${prevColor}-scroll-button`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-scroll-button`);
    }

    private renderShape(prevShape: Shape | undefined, currShape: Shape): void {
        this._render.removeClass(this._ref.nativeElement, prevShape === undefined ? 'octopus-base-scroll-button' : `octopus-${prevShape}-scroll-button`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currShape}-scroll-button`);
    }

}

@Component({
    selector: 'octopus-button-group',
    template: `<ng-content select="[octopus-fill-button], [octopus-outline-button]"></ng-content>`
})
export class OctopusButtonGroup extends AbstractOctopusComponent {

    @Input('alignment') align: Alignment = 'horizontal';

    @ContentChildren(OctopusFillButton) fillButtons!: QueryList<OctopusFillButton>;

    @ContentChildren(OctopusOutlineButton) outlineButtons!: QueryList<OctopusOutlineButton>;

    @HostBinding('class') class: string = 'octopus-button-group';

    constructor(
        protected _ref: ElementRef,
        protected _render: Renderer2
    ) {
        super(_ref);
    }

    ngOnChanges(changes: SimpleChanges) {
        setTimeout(() => super.ngOnChanges(changes));

        if (changes.align !== undefined) {
            setTimeout(() => this.renderAlignment(changes.align.previousValue, changes.align.currentValue));
        }
    }

    ngOnInit() {
        setTimeout(() => {
            super.ngOnInit();
            this.renderAlignment(undefined, this.align);
        });
    }

    private renderAlignment(prevAlign: Alignment | undefined, currAlign: Alignment): void {
        this._render.removeClass(this._ref.nativeElement, prevAlign === undefined ? 'octopus-horizontal-group' : `octopus-${prevAlign}-group`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currAlign}-group`);
    }

    protected renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this.fillButtons.forEach(button => button.color = currColor);
        this.outlineButtons.forEach(button => button.color = currColor);
    }

}