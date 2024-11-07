import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { AfterViewInit, Component, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, ViewContainerRef } from "@angular/core";
import { Observable, of } from "rxjs";

import { NGXSeasonIconName } from "../icon/icon.component";

type NGXSeasonAlertType = 'success' | 'warning' | 'failure' | 'info';

@Component({
    selector: 'ngx-sui-alert',
    template: `
        <ngx-sui-icon [iconShape]="iconShape$ | async" iconSize="md" iconSolid="true"></ngx-sui-icon>
        <span class="alert-text-wrapper">{{ message }}</span>
        <div class="alert-action-wrapper">
            <button ngx-sui-Button [btnColor]="alertType" btnCircled="true" btnIcon="close" btnIconOnly="true" btnSize="sm"
                (click)="handleAlertDismissEvent()" *ngIf="showClose"></button>
            <ng-content select="alertAction"></ng-content>
        </div>
    `
})
export class NGXSeasonAlertComponent implements OnChanges, AfterViewInit {

    @Input('alertType')
    set alertType(alertType: NGXSeasonAlertType) {
        this._alertType = alertType;
    }

    get alertType(): NGXSeasonAlertType {
        return this._alertType;
    }

    @Input('alertMessage')
    set message(message: string | undefined) {
        this._message = message;
    }

    get message(): string | undefined {
        return this._message;
    }

    @Input('alertShowClose')
    set showClose(showClose: boolean | string) {
        this._showClose = coerceBooleanProperty(showClose);
    }

    get showClose(): boolean {
        return this._showClose;
    }

    private _alertType: NGXSeasonAlertType = 'info';
    private _message: string | undefined;
    private _showClose: boolean = true;

    protected iconShape$: Observable<NGXSeasonIconName> | undefined;

    private readonly ALERT_TYPES: NGXSeasonAlertType[] = ['success', 'warning', 'failure', 'info'];

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        let keys: string[] | null = Object.keys(changes);
        
        if (keys.includes('alertType')) {
            this.changeAlertTypeIcon(changes['alertType'].currentValue as NGXSeasonAlertType);
        }

        keys.splice(0);
        keys = null;
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'alert');
        this.changeAlertTypeIcon(this.alertType);
    }

    protected changeAlertTypeIcon(alertType: NGXSeasonAlertType): void {
        const element: HTMLElement = this._element.nativeElement;
        let value: string;

        for (const item of this.ALERT_TYPES) {
            value = `alert-${item}`;

            if (element.classList.contains(value)) this._renderer.removeClass(element, value);
        }
        
        Promise.resolve()
            .then(() => this._renderer.addClass(element, `alert-${alertType}`))
            .then(() => this.iconShape$ = of(`${alertType}-standard` as NGXSeasonIconName));
    }

    protected handleAlertDismissEvent(): void {
        const element: HTMLElement = this._element.nativeElement;
        const parent: HTMLElement = this._renderer.parentNode(element) as HTMLElement;
        this._renderer.removeChild(parent, element);
    }

}

@Component({
    selector: 'ngx-sui-tip-alert',
    template: `
        <header class="alert-toolbar">
            <ngx-sui-icon [iconShape]="iconShape$ | async" iconSize="lg" iconSolid="true"></ngx-sui-icon>
            <span class="alert-text-wrapper">{{ subject }}</span>
        </header>
        <div class="alert-content">{{ message }}</div>
    `
})
export class NGXSeasonTipAlertComponent extends NGXSeasonAlertComponent{

    @Input('alertSubject')
    set subject(subject: string | undefined) {
        this._subject = subject;
    }

    get subject(): string | undefined {
        return this._subject;
    }

    private _subject: string | undefined;

    constructor(
        protected override _element: ElementRef,
        protected override _renderer: Renderer2,
        protected _vcr: ViewContainerRef
    ) {
        super(_element, _renderer);
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.addClass(this._element.nativeElement, 'alert-tip');
    }

}