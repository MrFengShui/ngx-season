import { Component, ElementRef, HostBinding, HostListener, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from "@angular/core";

@Component({
    selector: '[octopus-button]',
    template: `
        <div class="octopus-ripple-wrapper" #ripple></div>
        <ng-content></ng-content>
    `
})
export class OctopusButton implements OnChanges, OnInit {

    @Input('color') color: string = 'primary';

    @ViewChild('ripple', { read: ElementRef, static: true })
    protected ripple: ElementRef<HTMLElement>;

    @HostBinding('class')
    protected class: string = 'octopus-button octopus-ripple';

    @HostListener('click', ['$event'])
    protected listenHostClick(event: MouseEvent): void {
        setTimeout(() => this._render.addClass(this.ripple.nativeElement, 'active'));
        setTimeout(() => this.locate(event));
        setTimeout(() => this._render.removeClass(this.ripple.nativeElement, 'active'), 500);
    }

    constructor(
        protected _ref: ElementRef,
        protected _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        this.build(changes.color.previousValue, changes.color.currentValue);
    }

    ngOnInit() {
        this.build(undefined, this.color);
    }

    protected build(prevColor: string, currColor: string): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-button' : `octopus-${prevColor}-button`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-button`);
    }

    private locate(event: MouseEvent): void {
        let radius: number = this._ref.nativeElement.clientWidth;
        this._render.setStyle(this.ripple.nativeElement, 'width', `${radius * 2}px`);
        this._render.setStyle(this.ripple.nativeElement, 'height', `${radius * 2}px`);
        this._render.setStyle(this.ripple.nativeElement, 'top', `${event.pageY - this._ref.nativeElement.offsetTop - radius}px`);
        this._render.setStyle(this.ripple.nativeElement, 'left', `${event.pageX - this._ref.nativeElement.offsetLeft - radius}px`);
    }

}

@Component({
    selector: '[octopus-fill-button]',
    template: `
        <div class="octopus-ripple-wrapper" #ripple></div>
        <ng-content></ng-content>
    `
})
export class OctopusFillButton extends OctopusButton implements OnChanges, OnInit {

    @HostBinding('style.white-space') whiteSpace: string = 'nowrap';

    constructor(
        protected _ref: ElementRef<HTMLElement>,
        protected _render: Renderer2
    ) {
        super(_ref, _render);
    }

    ngOnChanges(changes: SimpleChanges) {
        this.build(changes.color.previousValue, changes.color.currentValue);
    }

    ngOnInit() {
        setTimeout(() => this._render.addClass(this._ref.nativeElement, 'octopus-fill-button'));
        this.build(undefined, this.color);
    }

    protected build(prevColor: string, currColor: string): void {
        setTimeout(() => {
            this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-fill-button' : `octopus-${prevColor}-fill-button`);
            this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-fill-button`);
        });
    }

}

@Component({
    selector: '[octopus-icon-button]',
    template: `
        <div class="octopus-ripple-wrapper" #ripple></div>
        <ng-content></ng-content>
    `
})
export class OctopusIconButton extends OctopusButton implements OnChanges, OnInit {

    constructor(
        protected _ref: ElementRef<HTMLElement>,
        protected _render: Renderer2
    ) {
        super(_ref, _render);
    }

    ngOnChanges(changes: SimpleChanges) {
        this.build(changes.color.previousValue, changes.color.currentValue);
    }

    ngOnInit() {
        setTimeout(() => this._render.addClass(this._ref.nativeElement, 'octopus-icon-button'));
        this.build(undefined, this.color);
    }

    protected build(prevColor: string, currColor: string): void {
        setTimeout(() => {
            this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-icon-button' : `octopus-${prevColor}-icon-button`);
            this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-icon-button`);
        });
    }

}

@Component({
    selector: '[octopus-mix-button]',
    template: `
        <div class="octopus-ripple-wrapper" #ripple></div>
        <ng-content></ng-content>
    `
})
export class OctopusMixButton extends OctopusButton implements OnChanges, OnInit {

    @HostBinding('style.white-space') whiteSpace: string = 'nowrap';

    constructor(
        protected _ref: ElementRef<HTMLElement>,
        protected _render: Renderer2
    ) {
        super(_ref, _render);
    }

    ngOnChanges(changes: SimpleChanges) {
        this.build(changes.color.previousValue, changes.color.currentValue);
    }

    ngOnInit() {
        setTimeout(() => this._render.addClass(this._ref.nativeElement, 'octopus-mix-button'));
        this.build(undefined, this.color);
    }

    protected build(prevColor: string, currColor: string): void {
        setTimeout(() => {
            this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-mix-button' : `octopus-${prevColor}-mix-button`);
            this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-mix-button`);
        });
    }

}

@Component({
    selector: '[octopus-outline-button]',
    template: `
        <div class="octopus-ripple-wrapper" #ripple></div>
        <ng-content></ng-content>
    `
})
export class OctopusOutlineButton extends OctopusButton implements OnChanges, OnInit {

    @Input('color') color: string = 'primary';

    @HostBinding('style.white-space') whiteSpace: string = 'nowrap';

    constructor(
        protected _ref: ElementRef<HTMLElement>,
        protected _render: Renderer2
    ) {
        super(_ref, _render);
    }

    ngOnChanges(changes: SimpleChanges) {
        this.build(changes.color.previousValue, changes.color.currentValue);
    }

    ngOnInit() {
        setTimeout(() => this._render.addClass(this._ref.nativeElement, 'octopus-outline-button'));
        this.build(undefined, this.color);
    }

    protected build(prevColor: string, currColor: string): void {
        setTimeout(() => {
            this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-outline-button' : `octopus-${prevColor}-outline-button`);
            this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-outline-button`);
        });
    }

}