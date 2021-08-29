import { Component, ElementRef, HostBinding, HostListener, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';

import { ColorPalette } from 'src/app/global/enum.utils';

@Component({
    selector: 'octopus-navbar',
    template: `
        <div class="octopus-navbar-wrapper">
            <ng-content select="a[octopus-navbar-brand], [octopus-button], [octopus-icon-button], div"></ng-content>
        </div>
    `
})
export class OctopusNavbar implements OnChanges, OnInit {

    @Input('color') color: ColorPalette = 'base';

    @HostBinding('class') class: string = 'octopus-navbar';

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.color !== undefined) {
            setTimeout(() => this.renderColor(changes.color.previousValue, changes.color.currentValue));
        }
    }

    ngOnInit() {
        setTimeout(() => this.renderColor(undefined, this.color));
    }

    private renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor == undefined ? 'octopus-base-navbar' : `octopus-${prevColor}-navbar`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-navbar`);
    }

}

@Component({
    selector: 'a[octopus-navbar-brand]',
    template: `
        <div class="octopus-ripple-wrapper" #ripple></div>
        <ng-content select="img"></ng-content>
    `
})
export class OctopusNavbarBrand {

    @ViewChild('ripple', { read: ElementRef, static: true })
    protected ripple!: ElementRef<HTMLElement>;

    @HostBinding('class') class: string = 'octopus-navbar-brand octopus-ripple';

    @HostListener('click', ['$event'])
    protected listenHostClick(event: MouseEvent): void {
        setTimeout(() => this._render.addClass(this.ripple.nativeElement, 'active'));
        setTimeout(() => this.locate(event));
        setTimeout(() => this._render.removeClass(this.ripple.nativeElement, 'active'), 500);
    }

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2
    ) { }

    private locate(event: MouseEvent): void {
        let radius: number = Math.max(this._ref.nativeElement.clientWidth, this._ref.nativeElement.clientHeight);
        this._render.setStyle(this.ripple.nativeElement, 'width', `${radius * 2}px`);
        this._render.setStyle(this.ripple.nativeElement, 'height', `${radius * 2}px`);
        this._render.setStyle(this.ripple.nativeElement, 'top', `${event.pageY - this._ref.nativeElement.offsetTop - radius}px`);
        this._render.setStyle(this.ripple.nativeElement, 'left', `${event.pageX - this._ref.nativeElement.offsetLeft - radius}px`);
    }

}