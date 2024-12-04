import { CDK_ACCORDION } from "@angular/cdk/accordion";
import { coerceBooleanProperty, coerceNumberProperty } from "@angular/cdk/coercion";
import { AfterViewInit, Component, Directive, ElementRef, EventEmitter, HostListener, Inject, Input, Output, Renderer2, TemplateRef } from "@angular/core";

import { NGXSeasonAccordionComponent } from "./accordion.component";
import { NGXSeasonIconName } from "../icon/icon.component";

@Component({
    selector: 'ngx-sui-accordion-panel-header',
    template: `
        <span #iconBox *ngIf="icon && _accordion.showIcon"><ngx-sui-icon [iconShape]="icon" iconSize="lg"></ngx-sui-icon></span>
        <div class="panel-header-wrapper" [class.no-icon]="!icon || !_accordion.showIcon" [class.no-toggle]="!_accordion.showToggle">
            <span class="panel-header-subject" *ngIf="subject">{{ subject }}</span>
            <span class="panel-header-description" *ngIf="subject && description">{{ description }}</span>
        </div>
        <span #btnBox *ngIf="_accordion.showToggle">
            <button ngx-sui-IconButton btnIconDegree="-90" [btnColor]="_accordion.color" [btnIcon]="toggleIcon" btnIconOnly="true" btnCircled="true" [btnIconDegreeStart]="toggled ? -90 : -180" [btnIconDegreeFinal]="toggled ? -180 : -90" btnIconRotateDuration="1000" btnStyle="flat" (click)="handleToggleEvent($event)"></button>
        </span>
    `
})
export class NGXSeasonAccordionPanelHeaderComponent implements AfterViewInit {

    @Input('description')
    set description(description: string | undefined) {
        this._description = description;
    }

    get description(): string | undefined {
        return this._description;
    }

    @Input('duration')
    set duration(duration: number | string) {
        this._duration = coerceNumberProperty(duration);
    }

    get duration(): number {
        return this._duration;
    }

    @Input('icon')
    set icon(icon: NGXSeasonIconName | undefined) {
        this._icon = icon;
    }

    get icon(): NGXSeasonIconName | undefined {
        return this._icon;
    }

    @Input('subject')
    set subject(subject: string | undefined) {
        this._subject = subject;
    }

    get subject(): string | undefined {
        return this._subject;
    }

    @Input('toggled')
    set toggled(toggled: boolean | string | null) {
        this._toggled = coerceBooleanProperty(toggled);
    }

    get toggled(): boolean {
        return this._toggled;
    }

    @Input('toggleIcon')
    set toggleIcon(toggleIcon: NGXSeasonIconName) {
        this._toggleIcon = toggleIcon;
    }

    get toggleIcon(): NGXSeasonIconName {
        return this._toggleIcon;
    }

    private _description: string | undefined;
    private _duration: number = 1000;
    private _icon: NGXSeasonIconName | undefined;
    private _subject: string | undefined;
    private _toggled: boolean = false;
    private _toggleIcon: NGXSeasonIconName = 'angle-double';

    @Output('toggleEvent')
    event: EventEmitter<void> = new EventEmitter(true);

    @HostListener('click')
    protected listenHostToggleEvent(): void {
        this.event.emit();
    }

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,

        @Inject(CDK_ACCORDION)
        protected _accordion: NGXSeasonAccordionComponent
    ) {}

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'accordion-panel-header');
    }

    protected handleToggleEvent(event: MouseEvent): void {
        event.stopPropagation();
        this.event.emit();
    }

}

@Component({
    selector: 'ngx-sui-accordion-panel-content',
    template: `<ng-content></ng-content>`
})
export class NGXSeasonAccordionPanelContentComponent implements AfterViewInit {

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'accordion-panel-content');
    }

}

@Directive({
    selector: '[ngx-sui-AccordionPanelContent]'
})
export class NGXSeasonAccordionPanelContentDirective {

    constructor(protected _template: TemplateRef<any>) {}

    fetchTemplate(): TemplateRef<any> {
        return this._template;
    }

}

@Component({
    selector: 'ngx-sui-accordion-panel-footer',
    template: `<ng-content></ng-content>`
})
export class NGXSeasonAccordionPanelFooterComponent implements AfterViewInit {

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'accordion-panel-footer');
    }

}

@Directive({
    selector: '[ngx-sui-AccordionPanelFooter]'
})
export class NGXSeasonAccordionPanelFooterDirective {

    constructor(protected _template: TemplateRef<any>) {}

    fetchTemplate(): TemplateRef<any> {
        return this._template;
    }

}
