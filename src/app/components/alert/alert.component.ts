import { coerceBooleanProperty, coerceNumberProperty } from "@angular/cdk/coercion";
import { DomPortal } from "@angular/cdk/portal";
import { AfterContentInit, AfterViewInit, Component, ContentChild, ElementRef, EventEmitter, Inject, InjectionToken, Input, OnChanges, OnDestroy, Output, Renderer2, SimpleChanges, ViewChild, ViewContainerRef } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

import { NGXSeasonAlertColorPalette } from "src/app/utils/palette.utils";

import { NGXSeasonIconName } from "../icon/icon.component";

export const NGX_SEASON_ALERT_ICON_MAP_TOKEN: InjectionToken<NGXSeasonAlertIconMap> = new InjectionToken('NGX_SEASON_ALERT_ICON_MAP_TOKEN');

export type NGXSeasonAlertStyle = 'flat' | 'outline' | 'solid';
export type NGXSeasonAlertIconMap = { success: NGXSeasonIconName, warning: NGXSeasonIconName, failure: NGXSeasonIconName, info: NGXSeasonIconName, help: NGXSeasonIconName };

@Component({
    selector: '',
    template: ''
})
export abstract class NGXSeasonBaseAlertComponent implements OnChanges, OnDestroy, AfterViewInit {

    @Input('alertColor')
    set color(color: NGXSeasonAlertColorPalette | null) {
        this._color = color ? color : 'help';
    }

    get color(): NGXSeasonAlertColorPalette {
        return this._color;
    }

    private _color: NGXSeasonAlertColorPalette = 'help';

    protected iconShape$: Subject<NGXSeasonIconName> = new BehaviorSubject<NGXSeasonIconName>('help-standard');

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,

        @Inject(NGX_SEASON_ALERT_ICON_MAP_TOKEN)
        protected _iconMap: NGXSeasonAlertIconMap
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'color') this.changeAlertColor(changes[name].currentValue as NGXSeasonAlertColorPalette);
        }
    }

    ngOnDestroy(): void {
        this.iconShape$.complete();
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'alert');

        this.changeAlertColor(this.color);
    }

    protected changeAlertColor(color: NGXSeasonAlertColorPalette): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-alert-color', color);

        this.iconShape$.next(this._iconMap[color]);
    }

}

@Component({
    selector: 'ngx-sui-alert-addon',
    template: `<ng-content></ng-content>`
})
export class NGXSeasonAlertAddonComponent implements AfterViewInit {

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) { }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'alert-addon');
    }

}

@Component({
    selector: 'ngx-sui-toast-alert',
    template: `
        <ngx-sui-icon [iconColor]="color" [iconShape]="iconShape$.asObservable() | async" iconSolid></ngx-sui-icon>
        <div ngx-sui-AlertMessage ngx-sui-Tooltip [olColor]="color" [ttDisabled]="disabled" [ttMsg]="message">{{ message }}</div>
        <ng-template [cdkPortalOutlet]="addonPortal" *ngIf="addon"></ng-template>
        <button ngx-sui-IconButton [btnColor]="color" btnCircled="true" btnIcon="close" btnStyle="flat" (click)="handleAlertDismissEvent()" *ngIf="closible"></button>
        <ng-template><ng-content select="ngx-sui-alert-addon"></ng-content></ng-template>
    `
})
export class NGXSeasonToastAlertComponent extends NGXSeasonBaseAlertComponent implements AfterContentInit {

    @Input({ alias: 'taAllowed' })
    set allowed(allowed: boolean | string | undefined | null) {
        this._allowed = coerceBooleanProperty(allowed);
    }

    get allowed(): boolean {
        return this._allowed;
    }

    @Input({ alias: 'taTTDisabled' })
    set disabled(disabled: boolean | string | undefined | null) {
        this._disabled = coerceBooleanProperty(disabled);
    }

    get disabled(): boolean {
        return this._disabled;
    }

    @Input({ alias: 'taMsg', required: true })
    set message(message: string | undefined | null) {
        this._message = message || undefined;
    }

    get message(): string | undefined {
        return this._message;
    }

    @Input({ alias: 'taClosible' })
    set closible(closible: boolean | string | undefined | null) {
        this._closible = coerceBooleanProperty(closible);
    }

    get closible(): boolean {
        return this._closible;
    }

    @Input({ alias: 'taStyle' })
    set style(style: NGXSeasonAlertStyle | null) {
        this._style = style || 'outline';
    }

    get style(): NGXSeasonAlertStyle {
        return this._style;
    }

    private _allowed: boolean = false;
    private _disabled: boolean = true;
    private _message: string | undefined;
    private _closible: boolean = false;
    private _style: NGXSeasonAlertStyle = 'outline';

    @Output('taExtraEvent')
    extraEvent: EventEmitter<void> = new EventEmitter(true);

    @Output('taOverlayExtraEvent')
    overlayExtraEvent: EventEmitter<void> = new EventEmitter(true);

    @ContentChild(NGXSeasonAlertAddonComponent, { read: ElementRef })
    protected addon: ElementRef | undefined;

    protected addonPortal: DomPortal | undefined;

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
        if (this.addon) {
            const element = this.addon.nativeElement;
            this._renderer.appendChild(this._element.nativeElement, element);
            this.addonPortal = new DomPortal(element);
        }
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.addClass(this._element.nativeElement, 'toast-alert');

        this.changeAlertStyle(this.style);
    }

    dismiss(): void {
        if (this.closible) {
            const element: HTMLElement = this._element.nativeElement;
            this._renderer.removeChild(this._renderer.parentNode(element), element);
        }
    }

    protected handleAlertDismissEvent(): void {
        if (this.allowed) {
            this.overlayExtraEvent.emit();
        } else {
            this.dismiss();
            this.extraEvent.emit();
        }
    }

    protected changeAlertStyle(style: NGXSeasonAlertStyle): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-alert-style', style);
    }

}

@Component({
    selector: 'ngx-sui-notice-alert',
    template: `
        <div class="alert-wrapper">
            <ngx-sui-icon [iconColor]="color" [iconShape]="iconShape$.asObservable() | async" iconSize="sm" iconSolid></ngx-sui-icon>
            <div ngx-sui-AlertMessage ngx-sui-Tooltip [olColor]="color" [ttDisabled]="disabled" [ttMsg]="message">{{ message }}</div>
            <ng-template [cdkPortalOutlet]="addonPortal" *ngIf="addon"></ng-template>
        </div>
        <button ngx-sui-IconButton [btnColor]="color" btnCircled="true" btnIcon="close" btnSize="sm" btnStyle="flat" (click)="dismiss()"></button>
        <ng-template><ng-content select="ngx-sui-alert-addon"></ng-content></ng-template>
    `
})
export class NGXSeasonNoticeAlertComponent extends NGXSeasonToastAlertComponent {

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.addClass(this._element.nativeElement, 'notice-alert');

        this.closible = true;
    }

    protected override changeAlertStyle(style: NGXSeasonAlertStyle): void {
        super.changeAlertStyle('solid');
    }

}

@Component({
    selector: 'ngx-sui-detail-alert',
    template: `
        <header class="toolbar">
            <ngx-sui-icon [iconColor]="color" [iconShape]="iconShape$ | async" iconSolid="true"></ngx-sui-icon>
            <div ngx-sui-AlertSubject>{{ subject }}</div>
        </header>
        <div ngx-sui-AlertDescription #wrapper>{{ description }}</div>
    `
})
export class NGXSeasonDetailAlertComponent extends NGXSeasonBaseAlertComponent {

    @Input({ alias: 'daSubject', required: true })
    set subject(subject: string | undefined | null) {
        this._subject = subject || undefined;
    }

    get subject(): string | undefined {
        return this._subject;
    }

    @Input({ alias: 'daDescription', required: true })
    set description(description: string | undefined | null) {
        this._description = description || undefined;
    }

    get description(): string | undefined {
        return this._description;
    }

    @Input({ alias: 'daIndent' })
    set indent(indent: number | string | undefined | null) {
        this._indent = coerceNumberProperty(indent);
    }

    get indent(): number {
        return this._indent;
    }

    private _subject: string | undefined;
    private _description: string | undefined;
    private _indent: number = 0;

    @ViewChild('wrapper', { read: ElementRef, static: true })
    protected wrapper: ElementRef<HTMLElement> | undefined;

    override ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        for (const name in changes) {
            if (name === 'indent') this.setupDescriptionIndent(coerceNumberProperty(changes[name].currentValue));
        }
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.addClass(this._element.nativeElement, 'detail-alert');

        this.setupDescriptionIndent(this.indent);
    }

    protected setupDescriptionIndent(indent: number): void {
        this._renderer.setStyle(this.wrapper?.nativeElement, 'text-indent', `calc(${indent} * var(--alert-detail-description-font-size))`);
    }

}

