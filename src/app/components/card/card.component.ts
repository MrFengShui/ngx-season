import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { DomPortal } from "@angular/cdk/portal";
import { AfterContentInit, AfterViewInit, Component, ContentChild, ElementRef, HostListener, Input, OnChanges, Renderer2, SimpleChanges, ViewContainerRef } from "@angular/core";

import { NGXSeasonCardFooterComponent, NGXSeasonCardHeaderComponent } from "./card-widget.component";

@Component({
    selector: 'ngx-sui-card',
    template: `
        <ng-container *ngIf="customized; then custom else native"></ng-container>
        <ng-template #custom><ng-content></ng-content></ng-template>
        <ng-template #native><ng-content select="ngx-sui-card-media, ngx-sui-card-content"></ng-content></ng-template>
        <ng-template><ng-content select="ngx-sui-card-header, ngx-sui-card-footer"></ng-content></ng-template>
    `
})
export class NGXSeasonCardComponent implements OnChanges, AfterContentInit, AfterViewInit {

    @Input({ alias: 'cardCustom' })
    set customized(customized: boolean | string | undefined | null) {
        this._customized = coerceBooleanProperty(customized);
    }

    get customized(): boolean {
        return this._customized;
    }

    @Input('cardShadow')
    set shadow(shadow: boolean | string) {
        this._shadow = coerceBooleanProperty(shadow);
    }

    get shadow(): boolean {
        return this._shadow;
    }

    private _customized: boolean = false;
    private _shadow: boolean = false;

    @HostListener('contextmenu')
    protected listenHostContextEvent(): boolean {
        return true;
    }

    @ContentChild(NGXSeasonCardHeaderComponent)
    protected header: NGXSeasonCardHeaderComponent | undefined;

    @ContentChild(NGXSeasonCardFooterComponent)
    protected footer: NGXSeasonCardFooterComponent | undefined;

    protected headerPortal: DomPortal | undefined;
    protected footerPortal: DomPortal | undefined;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _vcr: ViewContainerRef
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'customized') this.setupCardPadding(coerceBooleanProperty(changes[name].currentValue));

            if (name === 'shadow') this.setupCardShadow(coerceBooleanProperty(changes[name].currentValue));
        }
    }

    ngAfterContentInit(): void {
        const element: HTMLElement = this._element.nativeElement;

        if (this.header) this._renderer.insertBefore(element, this.header.fetchHostElement(), element.firstChild);

        if (this.footer) this._renderer.appendChild(element, this.footer.fetchHostElement());
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'card');

        this.setupCardPadding(this.customized);
        this.setupCardShadow(this.shadow);
    }

    protected setupCardPadding(customized: boolean): void {
        const element: HTMLElement = this._element.nativeElement;

        if (customized) {
            this._renderer.setStyle(element, 'justify-content', 'center');
            this._renderer.setStyle(element, 'min-height', 'var(--card-min-height)');
            this._renderer.setStyle(element, 'padding-left', 'var(--card-padding)');
            this._renderer.setStyle(element, 'padding-right', 'var(--card-padding)');
        } else {
            this._renderer.removeStyle(element, 'justify-content');
            this._renderer.removeStyle(element, 'min-height');
            this._renderer.removeStyle(element, 'padding-left');
            this._renderer.removeStyle(element, 'padding-right');
        }
    }

    protected setupCardShadow(shadow: boolean): void {
        const element: HTMLElement = this._element.nativeElement;

        if (shadow) this._renderer.addClass(element, 'card-shadow');
        else this._renderer.removeClass(element, 'card-shadow');
    }

}


