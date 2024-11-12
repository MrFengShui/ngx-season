import { AnimationBuilder, AnimationPlayer, style, animate } from "@angular/animations";
import { CdkAccordionItem, CDK_ACCORDION } from "@angular/cdk/accordion";
import { coerceNumberProperty, coerceBooleanProperty } from "@angular/cdk/coercion";
import { UniqueSelectionDispatcher } from "@angular/cdk/collections";
import { TemplatePortal } from "@angular/cdk/portal";
import { Component, AfterViewInit, AfterContentInit, Input, ViewChild, ElementRef, ContentChild, ChangeDetectorRef, Renderer2, NgZone, ViewContainerRef, Inject, OnChanges, SimpleChanges, Output, EventEmitter } from "@angular/core";
import { Subscription } from "rxjs";

import { NGXSeasonAccordionComponent } from "./accordion.component";
import { NGXSeasonAccordionPanelContentDirective, NGXSeasonAccordionPanelFooterDirective } from "./accordion-widget.component";

import { NGXSeasonUniqueSelectionIDDispatcher } from "src/app/utils/services/switch-select.service";
import { NGXSeasonIconName } from "../icon/icon.component";

@Component({
    selector: 'ngx-sui-accordion-panel',
    template: `
        <ngx-sui-accordion-panel-header [icon]="icon" [toggleIcon]="toggleIcon" [subject]="subject" [description]="description" [toggled]="toggledChange | async" (toggleEvent)="handleToggleEvent()"></ngx-sui-accordion-panel-header>
        <div class="accordion-panel-container" #container>
            <div class="accordion-panel-wrapper" #wrapper>
                <ngx-sui-accordion-panel-content><ng-container [cdkPortalOutlet]="contentPortal"></ng-container></ngx-sui-accordion-panel-content>
                <ngx-sui-accordion-panel-footer><ng-container [cdkPortalOutlet]="footerPortal"></ng-container></ngx-sui-accordion-panel-footer>
            </div>
        </div>
        <ng-template><ng-content select="[ngx-sui-AccordionPanelContent], [ngx-sui-AccordionPanelFooter]"></ng-content></ng-template>
    `
})
export class NGXSeasonAccordionPanelComponent extends CdkAccordionItem implements OnChanges, AfterViewInit, AfterContentInit {

    @Input('accdinDuration')
    set duration(duration: number | string) {
        this._duration = coerceNumberProperty(duration);
    }

    get duration(): number {
        return this._duration;
    }

    @Input('accdinDescText')
    set description(description: string | undefined) {
        this._description = description;
    }

    get description(): string | undefined {
        return this._description;
    }

    @Input('accdinIcon')
    set icon(icon: NGXSeasonIconName | undefined) {
        this._icon = icon;
    }

    get icon(): NGXSeasonIconName | undefined {
        return this._icon;
    }

    @Input('accdinSubject')
    set subject(subject: string | undefined) {
        this._subject = subject;
    }

    get subject(): string | undefined {
        return this._subject;
    }

    @Input('accdinToggled')
    set toggled(toggled: boolean | string) {
        this._toggled = coerceBooleanProperty(toggled);
    }

    get toggled(): boolean {
        return this._toggled;
    }

    @Input('accdinToggleIcon')
    set toggleIcon(toggleIcon: NGXSeasonIconName) {
        this._toggleIcon = toggleIcon;
    }

    get toggleIcon(): NGXSeasonIconName {
        return this._toggleIcon;
    }

    private _duration: number = 250;
    private _description: string | undefined;
    private _icon: NGXSeasonIconName | undefined;
    private _subject: string | undefined;
    private _toggled: boolean = false;
    private _toggleIcon: NGXSeasonIconName = 'angle-double';

    @Output('accdinToggledChange')
    toggledChange: EventEmitter<boolean> = new EventEmitter(true);

    @ViewChild('container', { read: ElementRef, static: true })
    protected container: ElementRef<HTMLElement> | undefined;

    @ViewChild('wrapper', { read: ElementRef, static: true })
    protected wrapper: ElementRef<HTMLElement> | undefined;

    @ContentChild(NGXSeasonAccordionPanelContentDirective)
    protected panelContent: NGXSeasonAccordionPanelContentDirective | undefined;

    @ContentChild(NGXSeasonAccordionPanelFooterDirective)
    protected panelFooter: NGXSeasonAccordionPanelFooterDirective | undefined;

    override readonly id: string = `ngx-sui-accordion-panel-${this._accordion.orderIndex++}`;

    protected contentPortal: TemplatePortal | undefined;
    protected footerPortal: TemplatePortal | undefined;
    protected multiple: boolean = false;

    private expandPlayer: AnimationPlayer | undefined;
    private collapsePlayer: AnimationPlayer | undefined;
    private expandedHeight: number = 0;

    private toggleIcon$: Subscription = Subscription.EMPTY;
    private prevIndex$: Subscription = Subscription.EMPTY;
    private dispatcher$: Subscription = Subscription.EMPTY;

    constructor(
        protected _builder: AnimationBuilder,
        protected _cdr: ChangeDetectorRef,
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _ngZone: NgZone,
        protected _vcr: ViewContainerRef,
        protected _usd: UniqueSelectionDispatcher,

        protected _dispatcher: NGXSeasonUniqueSelectionIDDispatcher,

        @Inject(CDK_ACCORDION)
        protected _accordion: NGXSeasonAccordionComponent
    ) {
        super(_accordion, _cdr, _usd);
    }

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'toggled' && !changes[name].isFirstChange() && !this._accordion.multiple) {
                this.switchPanel(coerceBooleanProperty(changes[name].currentValue));
            }
        }
    }

    override ngOnDestroy(): void {
        super.ngOnDestroy();

        this.expandPlayer?.destroy();
        this.collapsePlayer?.destroy();

        this.toggleIcon$.unsubscribe();
        this.prevIndex$.unsubscribe();
        this.dispatcher$.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.initialize();
        this.listenToggleIconChange();
    }

    ngAfterContentInit(): void {
        if (this.panelContent) this.contentPortal = new TemplatePortal(this.panelContent.fetchTemplate(), this._vcr);

        if (this.panelFooter) this.footerPortal = new TemplatePortal(this.panelFooter.fetchTemplate(), this._vcr);
    }

    protected initialize(): void {
        this._renderer.addClass(this._element.nativeElement, 'accordion-panel');
        this._renderer.setAttribute(this._element.nativeElement, 'data-accordion-panel-id', this.id);
        this._renderer.setAttribute(this._element.nativeElement, 'data-accordion-panel-pid', this._accordion.id);
        
        let task = setTimeout(() => {
            clearTimeout(task);

            const element: HTMLElement = this.wrapper?.nativeElement as HTMLElement;
            this.expandedHeight = element.offsetHeight;

            this.switchPanel(this.toggled);
        });
    }

    override open(): void {
        this.switchPanel(true);
    }

    override close(): void {
        this.switchPanel(false);
    }

    override toggle(): void {
        this.switchPanel(!this.toggled);
    }

    protected handleToggleEvent(): void {
        if (this._accordion.multiple) {
            this.toggle();
        } else {
            this._dispatcher.notify(this.id, this._accordion.id);
        }
    }

    private listenToggleIconChange(): void {
        this._ngZone.runOutsideAngular(() => 
            this.toggleIcon$ = this._accordion.toggleIcon$.asObservable()
                .subscribe(value => 
                    this._ngZone.run(() => this.toggleIcon = value ? value : this.toggleIcon)));
    }

    private switchPanel(toggled: boolean): void {
        this.toggled = toggled;
        this.toggledChange.emit(this.toggled);

        if (this.toggled) {
            this.opened.emit();
        } else {
            this.closed.emit();
        }

        this.updateAccordionPanelState(this.container?.nativeElement, this.duration, this.toggled);
    }

    private updateAccordionPanelState(element: HTMLElement| undefined, duration: number, toggled: boolean): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-accordion-panel-state', toggled ? 'expanded' : 'collapsed');
        
        if (toggled) {
            this.execExpansionAnimation(element, duration, this.expandedHeight);
        } else {
            this.execCollapsionAnimation(element, duration, this.expandedHeight);
        }
    }

    private execExpansionAnimation(element: HTMLElement | undefined, duration: number, height: number): void {
        if (!element) throw new Error();
        
        this.expandPlayer = this._builder.build([
            style({ height: '0px' }),
            animate(`${duration}ms`, style({ height: `${height}px` }))
        ]).create(element);
        this.expandPlayer.play();
    }

    private execCollapsionAnimation(element: HTMLElement | undefined, duration: number, height: number): void {
        if (!element) throw new Error();
        
        this.expandPlayer = this._builder.build([
            style({ height: `${height}px` }),
            animate(`${duration}ms`, style({ height: '0px' }))
        ]).create(element);
        this.expandPlayer.play();
    }

}
