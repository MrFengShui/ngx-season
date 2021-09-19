import { coerceNumberProperty } from "@angular/cdk/coercion";
import { AfterContentInit, Component, ContentChildren, ElementRef, HostBinding, Input, OnChanges, OnInit, QueryList, Renderer2, SimpleChanges } from "@angular/core";

import { ColorPalette } from "src/app/global/enum.utils";

@Component({
    selector: 'img[octopus-card-avatar]',
    template: ''
})
export class OctopusCardAvatar implements OnChanges, OnInit {

    @Input('size') size: number | string = 36;

    @HostBinding('class') class: string = 'octopus-card-avatar';

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.size !== undefined) {
            setTimeout(() => this.renderSize(coerceNumberProperty(changes.size.currentValue)));
        }
    }

    ngOnInit() {
        setTimeout(() => this.renderSize(coerceNumberProperty(this.size)));
    }

    private renderSize(size: number): void {
        this._render.setAttribute(this._ref.nativeElement, 'width', `${size}`);
        this._render.setAttribute(this._ref.nativeElement, 'height', `${size}`);
    }

}

@Component({
    selector: '[octopus-card-title]',
    template: `<ng-content></ng-content>`
})
export class OctopusCardTitle {

    @HostBinding('class') class: string = 'octopus-card-title';

}

@Component({
    selector: '[octopus-card-subtitle]',
    template: `<ng-content></ng-content>`
})
export class OctopusCardSubtitle {

    @HostBinding('class') class: string = 'octopus-card-subtitle';

}

@Component({
    selector: 'octopus-card-header',
    template: `
        <div class="octopus-card-header-wrapper">
            <ng-content select="img[octopus-card-avatar]" *ngIf="avatars.length === 1"></ng-content>
            <div class="d-flex flex-column ml-50">
                <ng-content select="[octopus-card-title]" *ngIf="titles.length === 1"></ng-content>
                <ng-content select="[octopus-card-subtitle]"></ng-content>
            </div>
        </div>
    `
})
export class OctopusCardHeader implements AfterContentInit {

    @ContentChildren(OctopusCardAvatar) avatars!: QueryList<OctopusCardAvatar>;
    @ContentChildren(OctopusCardTitle) titles!: QueryList<OctopusCardTitle>;

    @HostBinding('class') class: string = 'octopus-card-header';

    ngAfterContentInit() {
        if (this.avatars.length > 1) {
            throw new Error('Multiple OctopusCardAvatars are not allowed to add into OctopusCardHeader.');
        }

        if (this.titles.length > 1) {
            throw new Error('Multiple OctopusCardHeaders are not allowed to add into OctopusCardHeader.');
        }
    }

}

@Component({
    selector: 'octopus-card-footer',
    template: `
        <div class="octopus-card-footer-wrapper">
            <ng-content></ng-content>
        </div>
    `
})
export class OctopusCardFooter {

    @HostBinding('class') class: string = 'octopus-card-footer';

}

@Component({
    selector: 'octopus-card-content',
    template: `
        <div class="octopus-card-content-wrapper">
            <ng-content></ng-content>
        </div>
    `
})
export class OctopusCardContent {

    @HostBinding('class') class: string = 'octopus-card-content';

}

@Component({
    selector: 'octopus-card-media',
    template: `
        <div class="octopus-card-media-wrapper">
            <ng-content></ng-content>
        </div>
    `
})
export class OctopusCardMedia {

    @HostBinding('class') class: string = 'octopus-card-media';

}

@Component({
    selector: 'octopus-card',
    templateUrl: './card.component.html'
})
export class OctopusCard implements OnChanges, OnInit, AfterContentInit {

    @Input('color') color: ColorPalette = 'base';

    @ContentChildren(OctopusCardHeader) headers!: QueryList<OctopusCardHeader>;

    @ContentChildren(OctopusCardFooter) footers!: QueryList<OctopusCardFooter>;

    @HostBinding('class') class: string = 'octopus-card';

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
        if (this.headers.length > 1) {
            throw new Error('Multiple OctopusCardHeaders are not allowed to add into OctopusCard.');
        }

        if (this.footers.length > 1) {
            throw new Error('Multiple OctopusCardFooters are not allowed to add into OctopusCard.');
        }
    }

    private renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-base-card' : `octopus-${prevColor}-card`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-card`);
    }

}

@Component({
    selector: 'octopus-card-group',
    template: `
        <div class="octopus-card-group-wrapper">
            <ng-content select="octopus-card"></ng-content>
        </div>
    `
})
export class OctopusCardGroup {

    @HostBinding('class') class: string = 'octopus-card-group';

}