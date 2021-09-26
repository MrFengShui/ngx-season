import { AfterContentInit, Component, ContentChildren, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnChanges, OnInit, Output, QueryList, Renderer2, SimpleChanges, ViewChild } from '@angular/core';

import { ColorPalette } from 'src/app/global/enum.utils';

@Component({
    selector: 'a[octopus-navbar-brand]',
    template: `<ng-content select="img"></ng-content>`
})
export class OctopusNavbarBrand {

    @HostBinding('class') class: string = 'octopus-navbar-brand';

}

@Component({
    selector: 'octopus-navbar-search',
    template: `
        <div class="octopus-navbar-search-wrapper">
            <input type="search" [placeholder]="placeholder" [value]="value" (keyup.enter)="handleInputActionEvent(input.value)" #input>
            <button octopus-icon-button [color]="color" [class.d-none]="!input.value" (click)="handleClearActionEvent(input)">
                <octopus-icon size="16">close</octopus-icon>
            </button>
        </div>
    `
})
export class OctopusNavbarSearch {

    @Input('color') color: ColorPalette = 'base';
    @Input('value') value: string = '';
    @Input('placeholder') placeholder: string = 'Search...';

    @Output('valueChange') valueChange: EventEmitter<string> = new EventEmitter();

    @HostBinding('class') class: string = 'octopus-navbar-search';

    handleClearActionEvent(element: HTMLInputElement): void {
        element.value = '';
        element.focus();
    }

    handleInputActionEvent(text: string): void {
        this.value = text;
        this.valueChange.emit(this.value);
    }

}

@Component({
    selector: 'octopus-navbar',
    template: `
        <div class="octopus-navbar-wrapper">
            <ng-content select="a[octopus-navbar-brand], octopus-navbar-search, [octopus-button], [octopus-icon-button], octopus-breadcrumb, div"></ng-content>
        </div>
    `
})
export class OctopusNavbar implements OnChanges, OnInit, AfterContentInit {

    @Input('color') color: ColorPalette = 'base';

    @ContentChildren(OctopusNavbarSearch)
    private searches!: QueryList<OctopusNavbarSearch>;

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

    ngAfterContentInit() {
        if (this.searches.length > 1) {

        }
    }

    private renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor == undefined ? 'octopus-base-navbar' : `octopus-${prevColor}-navbar`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-navbar`);
    }

}

