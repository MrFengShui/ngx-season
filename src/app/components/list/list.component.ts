import { TemplatePortal } from "@angular/cdk/portal";
import { AfterContentInit, AfterViewInit, Component, ContentChild, ElementRef, InjectionToken, Input, NgZone, Renderer2, ViewContainerRef } from "@angular/core";

import { NGXSeasonListRadioItemComponent } from "./radio-list.component";
import { NGXSeasonListCheckItemComponent } from "./check-list.component";
import { NGXSeasonListFooterDirective, NGXSeasonListHeaderDirective, NGXSeasonListMetaActionsDirective, NGXSeasonListMetaMediaDirective } from "./list-widget.component";
import { NGXSeasonCheckListComponent } from "./check-list.component";
import { NGXSeasonRadioListComponent } from "./radio-list.component";

export const NGX_SEASON_CHECK_LIST_TOKEN: InjectionToken<NGXSeasonCheckListComponent> = new InjectionToken('NGX_SEASON_CHECK_LIST_TOKEN');
export const NGX_SEASON_RADIO_LIST_TOKEN: InjectionToken<NGXSeasonRadioListComponent> = new InjectionToken('NGX_SEASON_RADIO_LIST_TOKEN');

export type NGXSeasonCheckListSelectionChange = { source: NGXSeasonCheckListComponent, targets: NGXSeasonListCheckItemComponent[], values: any[] };
export type NGXSeasonRadioListSelectionChange = { source: NGXSeasonRadioListComponent, target: NGXSeasonListRadioItemComponent, value: any };

@Component({
    selector: 'ngx-sui-list',
    template: `
        <div class="list-header" *ngIf="headerTemplate"><ng-container [cdkPortalOutlet]="headerPortal"></ng-container></div>
        <ng-content select="ngx-sui-list-item, ngx-sui-list-meta-item, ngx-sui-x-divider, ng-container"></ng-content>
        <div class="list-footer" *ngIf="footerTemplate"><ng-container [cdkPortalOutlet]="footerPortal"></ng-container></div>
        <ng-template><ng-content select="[ngx-sui-ListHeader], [ngx-sui-ListFooter]"></ng-content></ng-template>
    `
})
export class NGXSeasonListComponent implements AfterContentInit, AfterViewInit {

    @ContentChild(NGXSeasonListHeaderDirective)
    protected headerTemplate: NGXSeasonListHeaderDirective | undefined;

    @ContentChild(NGXSeasonListFooterDirective)
    protected footerTemplate: NGXSeasonListFooterDirective | undefined;

    protected headerPortal: TemplatePortal | undefined;
    protected footerPortal: TemplatePortal | undefined;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _vcr: ViewContainerRef,
        protected _ngZone: NgZone
    ) {}

    ngAfterContentInit(): void {
        if (this.headerTemplate) this.headerPortal = new TemplatePortal(this.headerTemplate.fetchTemplate(), this._vcr);

        if (this.footerTemplate) this.footerPortal = new TemplatePortal(this.footerTemplate.fetchTemplate(), this._vcr);
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'list');
    }

}

@Component({
    selector: 'ngx-sui-list-item',
    template: `<ng-content></ng-content>`
})
export class NGXSeasonListItemComponent implements AfterViewInit {

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) { }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'list-item');
    }

}

@Component({
    selector: 'ngx-sui-list-meta-item',
    template: `
        <div class="text-wrapper">
            <div class="header">
                <img ngx-sui-Avatar [avatarSrc]="avatarSrc"  [avatarAlt]="avatarAlt" avatarSize="lg"/>
                <div class="header-text-wrapper">
                    <span class="title">{{ title }}</span>
                    <span class="subtitle">{{ subtitle }}</span>
                </div>
            </div>
            <div class="content">{{ content }}</div>
            <div class="footer"><ng-template [cdkPortalOutlet]="actionPortal"></ng-template></div>
        </div>
        <div class="media-wrapper"><ng-template [cdkPortalOutlet]="mediaPortal"></ng-template></div>
        <ng-template>
            <ng-content select="[ngx-sui-ListMetaActions]"></ng-content>
            <ng-content select="[ngx-sui-ListMetaMedia]"></ng-content>
        </ng-template>
    `
})
export class NGXSeasonListMetaItemComponent extends NGXSeasonListItemComponent implements AfterContentInit {

    @Input('miAvatarAlt')
    set avatarAlt(avatarAlt: string | undefined | null) {
        this._avatarAlt = avatarAlt || undefined;
    }

    get avatarAlt(): string | undefined {
        return this._avatarAlt;
    }

    @Input('miAvatarSrc')
    set avatarSrc(avatarSrc: string | undefined | null) {
        this._avatarSrc = avatarSrc || undefined;
    }

    get avatarSrc(): string | undefined {
        return this._avatarSrc;
    }

    @Input('miContent')
    set content(content: string | undefined | null) {
        this._content = content || undefined;
    }

    get content(): string | undefined {
        return this._content;
    }

    @Input('miTitle')
    set title(title: string | undefined | null) {
        this._title = title || undefined;
    }

    get title(): string | undefined {
        return this._title;
    }

    @Input('miSubtitle')
    set subtitle(subtitle: string | undefined | null) {
        this._subtitle = subtitle || undefined;
    }

    get subtitle(): string | undefined {
        return this._subtitle;
    }

    private _avatarAlt: string | undefined;
    private _avatarSrc: string | undefined;
    private _content: string | undefined;
    private _title: string | undefined;
    private _subtitle: string | undefined;

    @ContentChild(NGXSeasonListMetaActionsDirective)
    protected actionTemplate: NGXSeasonListMetaActionsDirective | undefined;

    @ContentChild(NGXSeasonListMetaMediaDirective)
    protected mediaTemplate: NGXSeasonListMetaMediaDirective | undefined;

    protected actionPortal: TemplatePortal | undefined;
    protected mediaPortal: TemplatePortal | undefined;

    constructor(
        protected override _element: ElementRef,
        protected override _renderer: Renderer2,
        protected _vcr: ViewContainerRef
    ) {
        super(_element, _renderer);
    }

    ngAfterContentInit(): void {
        if (this.actionTemplate) this.actionPortal = new TemplatePortal(this.actionTemplate.fetchTemplate(), this._vcr);

        if (this.mediaTemplate) this.mediaPortal = new TemplatePortal(this.mediaTemplate.fetchTemplate(), this._vcr);
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.addClass(this._element.nativeElement, 'list-meta-item');
    }

}


