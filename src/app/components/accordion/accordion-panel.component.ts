import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { DomPortal } from "@angular/cdk/portal";
import { Component, AfterViewInit, AfterContentInit, Input, ViewChild, ElementRef, ContentChild, Renderer2, NgZone, ViewContainerRef, Inject, ChangeDetectionStrategy, OnDestroy, OnChanges, SimpleChanges, Output, EventEmitter } from "@angular/core";
import { Subscription } from "rxjs";

import { NGXSeasonAccordionSelectionService } from "./accordion.service";

import { NGX_SEASON_ACCORDION_TOKEN, NGXSeasonAccordionComponent } from "./accordion.component";
import { NGXSeasonAccordionPanelContentComponent, NGXSeasonAccordionPanelFooterComponent, NGXSeasonAccordionPanelHeaderComponent } from "./accordion-widget.component";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'ngx-sui-accordion-panel',
    template: `
        <ng-template [cdkPortalOutlet]="panelHeaderPortal"></ng-template>
        <ng-template [cdkPortalOutlet]="panelContentPortal"></ng-template>
        <ng-template [cdkPortalOutlet]="panelFooterPortal"></ng-template>
        <ng-template><ng-content select="ngx-sui-accordion-panel-header, ngx-sui-accordion-panel-content, ngx-sui-accordion-panel-footer"></ng-content></ng-template>
    `
})
export class NGXSeasonAccordionPanelComponent implements OnChanges, OnDestroy, AfterViewInit, AfterContentInit {

    @Input({ alias: 'apDisabled' })
    set disabled(disabled: boolean | string | undefined | null) {
        this._disabled = coerceBooleanProperty(disabled);
    }

    get disabled(): boolean {
        return this._disabled;
    }

    @Input({ alias: 'apToggled' })
    set toggled(toggled: boolean | string | undefined | null) {
        this._toggled = coerceBooleanProperty(toggled);
    }

    get toggled(): boolean {
        return this._toggled;
    }

    private _disabled: boolean = false;
    private _toggled: boolean = false;

    @Output('apClickEvent')
    clickEvent: EventEmitter<MouseEvent> = new EventEmitter(true);

    @ViewChild('container', { read: ElementRef, static: true })
    protected container: ElementRef<HTMLElement> | undefined;

    @ViewChild('wrapper', { read: ElementRef, static: true })
    protected wrapper: ElementRef<HTMLElement> | undefined;

    @ContentChild(NGXSeasonAccordionPanelHeaderComponent)
    protected panelHeader: NGXSeasonAccordionPanelHeaderComponent | undefined;

    @ContentChild(NGXSeasonAccordionPanelContentComponent)
    protected panelContent: NGXSeasonAccordionPanelContentComponent | undefined;

    @ContentChild(NGXSeasonAccordionPanelFooterComponent)
    protected panelFooter: NGXSeasonAccordionPanelFooterComponent | undefined;

    readonly id: string = `ngx-sui-accordion-panel-id-${this._accordion.panelIndex++}`;

    protected panelHeaderPortal: DomPortal | undefined;
    protected panelContentPortal: DomPortal | undefined;
    protected panelFooterPortal: DomPortal | undefined;

    private toggled$: Subscription = Subscription.EMPTY;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _vcr: ViewContainerRef,
        protected _ngZone: NgZone,

        protected _service: NGXSeasonAccordionSelectionService,

        @Inject(NGX_SEASON_ACCORDION_TOKEN)
        protected _accordion: NGXSeasonAccordionComponent
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'disabled') this.setupAccordionPanelDisabled(coerceBooleanProperty(changes[name].currentValue));

            if (name === 'toggled' && !changes[name].firstChange) this.setupAccordionPanelToggled(coerceBooleanProperty(changes[name].currentValue));
        }
    }

    ngOnDestroy(): void {
        this.toggled$.unsubscribe();

        this.panelHeader?.toggled$.complete();
    }

    ngAfterContentInit(): void {
        if (this.panelHeader) {
            const element = this.panelHeader.fetchHostElement();
            this._renderer.appendChild(this._element.nativeElement, element);
            this.panelHeaderPortal = new DomPortal(element);

            element.onclick = (event: MouseEvent) => {
                if (this.panelHeader && !this.disabled && !this._accordion.disabled) {
                    this.toggled = !this.toggled;
                    this._service.notify(this.id, this._accordion.id, this.toggled);

                    this.clickEvent.emit(event);
                }
            }
        }

        if (this.panelContent) {
            const element = this.panelContent.fetchHostElement();
            this._renderer.appendChild(this._element.nativeElement, element);
            this.panelContentPortal = new DomPortal(element);
        }

        if (this.panelFooter) {
            const element = this.panelFooter.fetchHostElement();
            this._renderer.appendChild(this._element.nativeElement, element);
            this.panelFooterPortal = new DomPortal(element);
        }
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'accordion-panel');

        this.setupAccordionPanelDisabled(this.disabled);
        this.listenAccordionPanelSelectedChange();
    }

    open(): void {
        this.toggle(true);
    }

    close(): void {
        this.toggle(false);
    }

    toggle(toggled: boolean): void {
        if (this.panelHeader) {
            this.toggled = toggled && !this.disabled && !this._accordion.disabled;
            this.panelHeader.toggled$.next(this.toggled);
            this._renderer.setStyle(this._element.nativeElement, 'height', this.toggled ? 'calc-size(fit-content, size)' : 'var(--accordion-panel-header-height)');
        }
    }

    protected setupAccordionPanelDisabled(disabled: boolean): void {
        const element = this._element.nativeElement;

        if (disabled || this._accordion.disabled) this._renderer.addClass(element, 'panel-disabled');
        else this._renderer.removeClass(element, 'panel-disabled');
    }

    protected setupAccordionPanelToggled(toggled: boolean): void {
        if (!this._accordion.multiple) {
            if (toggled) this.open(); else this.close();
        }
    }

    private listenAccordionPanelSelectedChange(): void {
        this._ngZone.runOutsideAngular(() => {
            if (this.panelHeader) {
                this.toggled$ = this.panelHeader.toggled$.asObservable()
                    .subscribe(value => {
                        if (value) this._renderer.addClass(this._element.nativeElement, 'selected');
                        else this._renderer.removeClass(this._element.nativeElement, 'selected');
                    });
            }
        });
    }

}
