import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { TemplatePortal } from "@angular/cdk/portal";
import { AfterContentInit, Component, ContentChild, Directive, ElementRef, EventEmitter, Inject, Input, Output, Renderer2, SimpleChanges, TemplateRef, ViewContainerRef } from "@angular/core";

import { NGXSeasonAlertComponent, NGXSeasonAlertStyle, NGX_SEASON_ALERT_ICON_MAP_TOKEN, NGXSeasonAlertIconMap } from "./alert.component";

@Directive({
    selector: '[ngx-sui-AlertActions]'
})
export class NGXSeasonAlertActionsDirective {

    constructor(protected _template: TemplateRef<any>) { }

    fetchTemplate(): TemplateRef<any> {
        return this._template;
    }

}

@Component({
    selector: 'ngx-sui-toast-alert',
    template: `
        <ngx-sui-icon [iconColor]="color" [iconShape]="iconShape$.asObservable() | async" iconSize="lg" iconSolid="true"></ngx-sui-icon>
        <span class="alert-text-wrapper">{{ message }}</span>
        <div class="alert-action-wrapper" *ngIf="template"><ng-container [cdkPortalOutlet]="portal"></ng-container></div>
        <button ngx-sui-IconButton [btnColor]="color" btnCircled="true" btnIcon="close" btnSize="md" btnStyle="flat" (click)="handleAlertDismissEvent()" *ngIf="showClose && !template"></button>
        <ng-template><ng-content select="[ngx-sui-AlertActions]"></ng-content></ng-template>
    `
})
export class NGXSeasonToastAlertComponent extends NGXSeasonAlertComponent implements AfterContentInit {

    @Input('alertAllowed')
    set allowed(allowed: boolean | string | null) {
        this._allowed = coerceBooleanProperty(allowed);
    }

    get allowed(): boolean {
        return this._allowed;
    }

    @Input('alertMessage')
    set message(message: string | undefined) {
        this._message = message;
    }

    get message(): string | undefined {
        return this._message;
    }

    @Input('alertShowClose')
    set showClose(showClose: boolean | string | null) {
        this._showClose = coerceBooleanProperty(showClose);
    }

    get showClose(): boolean {
        return this._showClose;
    }

    @Input('alertStyle')
    set style(style: NGXSeasonAlertStyle | null) {
        this._style = style ? style : 'outline';
    }

    get style(): NGXSeasonAlertStyle {
        return this._style;
    }

    private _allowed: boolean = false;
    private _message: string | undefined;
    private _showClose: boolean = true;
    private _style: NGXSeasonAlertStyle = 'outline';

    @Output('alertExtraAction')
    extraAction: EventEmitter<void> = new EventEmitter(true);

    @Output('alertOtherAction')
    otherAction: EventEmitter<void> = new EventEmitter(true);

    @ContentChild(NGXSeasonAlertActionsDirective)
    protected template: NGXSeasonAlertActionsDirective | undefined;

    protected portal: TemplatePortal | undefined;

    constructor(
        protected override _element: ElementRef,
        protected override _renderer: Renderer2,
        protected _vcr: ViewContainerRef,

        @Inject(NGX_SEASON_ALERT_ICON_MAP_TOKEN)
        protected override _iconMap: NGXSeasonAlertIconMap
    ) {
        super(_element, _renderer, _iconMap);
    }

    override ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        for (const name in changes) {
            if (name === 'style') this.changeAlertStyle(changes[name].currentValue as NGXSeasonAlertStyle);
        }
    }

    ngAfterContentInit(): void {
        if (this.template) this.portal = new TemplatePortal(this.template.fetchTemplate(), this._vcr);
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.addClass(this._element.nativeElement, 'toast-alert');

        this.changeAlertStyle(this.style);
    }

    dismiss(): void {
        const element: HTMLElement = this._element.nativeElement;
        const parent: HTMLElement = this._renderer.parentNode(element) as HTMLElement;
        this._renderer.removeChild(parent, element);
    }

    protected handleAlertDismissEvent(): void {
        if (this.allowed) {
            this.otherAction.emit();
        } else {
            this.dismiss();
            this.extraAction.emit();
        }
    }

    protected changeAlertStyle(style: NGXSeasonAlertStyle): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-alert-style', style);
    }

}

