import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { AfterViewInit, Component, ElementRef, Inject, InjectionToken, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";

import { NGXSeasonIconName } from "../icon/icon.component";

export type NGXSeasonBreadcrumbMark = 'arrow' | 'double-arrow' | 'triple-arrow' | 'point' | 'sign' | 'slash' | 'triangle';

const NGX_SEASON_BREADCRUMB_TOKEN: InjectionToken<NGXSeasonBreadcrumbComponent> = new InjectionToken('NGX_SEASON_BREADCRUMB_TOKEN');

@Component({
    selector: 'ngx-sui-breadcrumb',
    template: `<ng-content select="a[ngx-sui-BreadcrumbItem]"></ng-content>`,
    providers: [{ provide: NGX_SEASON_BREADCRUMB_TOKEN, useExisting: NGXSeasonBreadcrumbComponent }]
})
export class NGXSeasonBreadcrumbComponent implements OnChanges, AfterViewInit {

    @Input('bcMark')
    set mark(mark: NGXSeasonBreadcrumbMark | undefined | null) {
        this._mark = mark || 'triple-arrow';
    }

    get mark(): NGXSeasonBreadcrumbMark {
        return this._mark;
    }

    @Input('bcClickable')
    set clickable(clickable: boolean | string | undefined | null) {
        this._clickable = coerceBooleanProperty(clickable);
    }

    get clickable(): boolean {
        return this._clickable;
    }

    @Input('bcLarge')
    set large(large: boolean | string | undefined | null) {
        this._large = coerceBooleanProperty(large);
    }

    get large(): boolean {
        return this._large;
    }

    private _mark: NGXSeasonBreadcrumbMark = 'triple-arrow';
    private _clickable: boolean = false;
    private _large: boolean = false;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'mark') this.changeBreadcrumbSplitMark(changes[name].currentValue as NGXSeasonBreadcrumbMark);

            if (name === 'clickable') this.setupBreadcrumbClickable(coerceBooleanProperty(changes[name].currentValue));

            if (name === 'large') this.setupBreadcrumbLarge(coerceBooleanProperty(changes[name].currentValue));
        }
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'breadcrumb');

        this.changeBreadcrumbSplitMark(this.mark);
        this.setupBreadcrumbClickable(this.clickable);
        this.setupBreadcrumbLarge(this.large);
    }

    protected changeBreadcrumbSplitMark(mark: NGXSeasonBreadcrumbMark): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-breadcrumb-split-mark', mark);
    }

    protected setupBreadcrumbClickable(clickable: boolean): void {
        const element: HTMLElement = this._element.nativeElement;

        if (clickable) this._renderer.addClass(element, 'breadcrumb-link');
        else this._renderer.removeClass(element, 'breadcrumb-link');
    }

    protected setupBreadcrumbLarge(large: boolean): void {
        const element: HTMLElement = this._element.nativeElement;

        if (large) this._renderer.addClass(element, 'breadcrumb-extra');
        else this._renderer.removeClass(element, 'breadcrumb-extra');
    }

}

@Component({
    selector: 'a[ngx-sui-BreadcrumbItem]',
    template: `
        <ngx-sui-icon [iconShape]="icon" [iconSize]="_breadcrumb.large ? 'lg' : 'sm'" *ngIf="icon"></ngx-sui-icon>
        <span class="text" *ngIf="text">{{ text }}</span>
    `
})
export class NGXSeasonBreadcrumbItem implements AfterViewInit {

    @Input('bcIcon')
    set icon(icon: NGXSeasonIconName | undefined | null) {
        this._icon = icon ? icon : undefined;
    }

    get icon(): NGXSeasonIconName | undefined {
        return this._icon;
    }

    @Input('bcText')
    set text(text: string | undefined) {
        this._text = text;
    }

    get text(): string | undefined {
        return this._text;
    }

    private _icon: NGXSeasonIconName | undefined;
    private _text: string | undefined;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,

        @Inject(NGX_SEASON_BREADCRUMB_TOKEN)
        protected _breadcrumb: NGXSeasonBreadcrumbComponent
    ) {}

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'breadcrumb-item');
    }

}
