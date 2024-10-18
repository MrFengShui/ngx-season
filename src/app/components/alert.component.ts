import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { AfterViewInit, Component, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { Observable, of } from "rxjs";

type NGXSeasonAlertType = 'success' | 'warning' | 'failure' | 'info';

@Component({
    selector: 'ngx-sui-alert',
    template: `
        <ngx-sui-icon [iconShape]="iconShape$ | async" iconSize="md" iconSolid="true"></ngx-sui-icon>
        <span class="alert-text-wrapper"><ng-content></ng-content></span>
        <button ngx-sui-FlatIconButton [btnColor]="alertType" btnIcon="close" (click)="handleAlertDismissEvent()" *ngIf="showClose"></button>
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

    @Input('alertShowClose')
    set showClose(showClose: boolean | string) {
        this._showClose = coerceBooleanProperty(showClose);
    }

    get showClose(): boolean {
        return this._showClose;
    }

    private _alertType: NGXSeasonAlertType = 'info';
    private _showClose: boolean = true;

    protected iconShape$: Observable<string> | undefined;

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
            .then(() => this.iconShape$ = of(`${alertType}-standard`));
    }

    protected handleAlertDismissEvent(): void {
        const element: HTMLElement = this._element.nativeElement;
        const parent: HTMLElement = this._renderer.parentNode(element) as HTMLElement;
        this._renderer.removeChild(parent, element);
    }

}

@Component({
    selector: 'ngx-sui-advanced-alert',
    template: `
        <header class="alert-header">
            <ngx-sui-icon [iconShape]="iconShape$ | async" iconSize="lg" iconSolid="true"></ngx-sui-icon>
            <span class="alert-text-wrapper">{{ subject }}</span>
            <button ngx-sui-FlatIconButton [btnColor]="alertType" btnIcon="close" (click)="handleAlertDismissEvent()" *ngIf="showClose"></button>
        </header>
        <div class="alert-content"><ng-content select="content"></ng-content></div>
        <footer class="alert-footer"><ng-content select="footer"></ng-content></footer>
    `
})
export class NGXSeasonAdvancedAlertComponent extends NGXSeasonAlertComponent {

    @Input('alertSubject')
    set subject(subject: string) {
        this._subject = subject;
    }

    get subject(): string {
        return this._subject;
    }

    private _subject: string = '';

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.addClass(this._element.nativeElement, 'advanced');
    }

}