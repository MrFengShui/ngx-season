import { Component, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from "@angular/core";

import { ColorPalette } from "src/app/global/enum.utils";

@Component({
    selector: '',
    template: ''
})
abstract class AbstractOctopusButton implements OnChanges, OnInit {

    @Input('color') color: ColorPalette = 'primary';

    ngOnChanges(changes: SimpleChanges) {
        if (changes.color !== undefined) {
            setTimeout(() => this.renderColor(changes.color.previousValue, changes.color.currentValue));
        }
    }

    ngOnInit() {
        setTimeout(() => this.renderColor(undefined, this.color));
    }

    protected abstract renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void;

}

@Component({
    selector: '[octopus-button]',
    template: `
        <div style="position: absolute;inset: 0;">
            <div octopus-ripple class="h-100" style="z-index: 5;"></div>
        </div>
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
        super();
    }

    protected renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-button' : `octopus-${prevColor}-button`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-button`);
    }

}

@Component({
    selector: '[octopus-fill-button]',
    template: `
        <div style="position: absolute;inset: 0;">
            <div octopus-ripple class="h-100" style="z-index: 5;"></div>
        </div>
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
        super.ngOnInit();
        setTimeout(() => this._render.addClass(this._ref.nativeElement, 'octopus-fill-button'));
    }

    protected renderColor(prevColor: string | undefined, currColor: string): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-fill-button' : `octopus-${prevColor}-fill-button`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-fill-button`);
    }

}

@Component({
    selector: '[octopus-outline-button]',
    template: `
        <div style="position: absolute;inset: 0;">
            <div octopus-ripple class="h-100" style="z-index: 5;"></div>
        </div>
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
        super.ngOnInit();
        setTimeout(() => this._render.addClass(this._ref.nativeElement, 'octopus-outline-button'));
    }

    protected renderColor(prevColor: string | undefined, currColor: string): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-outline-button' : `octopus-${prevColor}-outline-button`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-outline-button`);
    }

}

@Component({
    selector: '[octopus-icon-button]',
    template: `
        <div style="position: absolute;inset: 0;">
            <div octopus-ripple class="h-100" style="z-index: 5;"></div>
        </div>
        <ng-content select="octopus-icon"></ng-content>
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
        setTimeout(() => this._render.addClass(this._ref.nativeElement, 'octopus-icon-button'));
    }

    protected renderColor(prevColor: string | undefined, currColor: string): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-icon-button' : `octopus-${prevColor}-icon-button`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-icon-button`);
    }

}

@Component({
    selector: '[octopus-mix-button]',
    template: `
        <div style="position: absolute;inset: 0;">
            <div octopus-ripple class="h-100" style="z-index: 5;"></div>
        </div>
        <span class="icon material-icons">{{icon}}</span>
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
        super.ngOnInit();
        setTimeout(() => this._render.addClass(this._ref.nativeElement, 'octopus-mix-button'));
    }

    protected renderColor(prevColor: string | undefined, currColor: string): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-mix-button' : `octopus-${prevColor}-mix-button`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-mix-button`);
    }

}
