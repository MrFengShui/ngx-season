import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { TemplatePortal } from "@angular/cdk/portal";
import { HttpClient } from "@angular/common/http";
import { Component, OnChanges, AfterViewInit, Input, Output, EventEmitter, ElementRef, Renderer2, SimpleChanges, Directive, TemplateRef, ContentChild, AfterContentInit, ViewContainerRef, NgZone, OnDestroy } from "@angular/core";
import { SafeUrl, DomSanitizer } from "@angular/platform-browser";
import { BehaviorSubject, Subject, Subscription } from "rxjs";

@Directive({
    selector: '[ngx-sui-LayoutHeaderContent]'
})
export class NGXSeasonLayoutHeaderContentDirective {

    constructor(protected _template: TemplateRef<any>) {}

    fetchTemplate(): TemplateRef<any> {
        return this._template;
    }

}

@Directive({
    selector: '[ngx-sui-LayoutHeaderActions]'
})
export class NGXSeasonLayoutHeaderActionsDirective {

    constructor(protected _template: TemplateRef<any>) {}

    fetchTemplate(): TemplateRef<any> {
        return this._template;
    }

}

@Component({
    selector: 'ngx-sui-layout-header',
    template: `
        <button ngx-sui-FlatIconButton btnIcon="bars" (click)="handleControlToggledEvent()" *ngIf="showCtrl"></button>
        <a [attr.href]="logoHref" class="header-logo">
            <img [attr.src]="this.logoImageChange$.asObservable() | async" [attr.alt]="" height="100%"/>
        </a>
        <div class="header-content"><ng-container [cdkPortalOutlet]="contentPortal"></ng-container></div>
        <div class="header-actions"><ng-container [cdkPortalOutlet]="actionsPortal"></ng-container></div>
        <ng-template><ng-content select="[ngx-sui-LayoutHeaderContent], [ngx-sui-LayoutHeaderActions]"></ng-content></ng-template>
    `
})
export class NGXSeasonLayoutHeaderComponent implements OnChanges, OnDestroy, AfterContentInit, AfterViewInit {

    @Input('headerLogoHref')
    set logoHref(logoHref: string) {
        this._logoHref = logoHref;
    }

    get logoHref(): SafeUrl | string {
        return this._sanitizer.bypassSecurityTrustUrl(this._logoHref);
    }

    @Input('headerLogoIcon')
    set logoIcon(logoIcon: string) {
        this._logoIcon = logoIcon;
    }

    get logoIcon(): string {
        return this._logoIcon;
    }

    @Input('headerShowCtrl')
    set showCtrl(showCtrl: boolean | string) {
        this._showCtrl = coerceBooleanProperty(showCtrl);
    }

    get showCtrl(): boolean {
        return this._showCtrl;
    }

    @Input('headerToggled')
    set toggled(toggled: boolean | string) {
        this._toggled = coerceBooleanProperty(toggled);
    }

    get toggled(): boolean {
        return this._toggled;
    }

    private _logoHref: string = 'javascript:void(0);';
    private _logoIcon: string = 'assets/logo/angular_wordmark_gradient.png';
    private _showCtrl: boolean = true;
    private _toggled: boolean = false;

    @Output('headerToggledChange')
    protected toggledChange: EventEmitter<boolean> = new EventEmitter(true);

    @ContentChild(NGXSeasonLayoutHeaderContentDirective)
    protected contentTemplate: NGXSeasonLayoutHeaderContentDirective | undefined;

    @ContentChild(NGXSeasonLayoutHeaderActionsDirective)
    protected actionsTemplate: NGXSeasonLayoutHeaderActionsDirective | undefined;

    protected logoImageChange$: Subject<string> = new BehaviorSubject('');

    protected contentPortal: TemplatePortal | undefined;
    protected actionsPortal: TemplatePortal | undefined;

    private logoImage$: Subscription = Subscription.EMPTY;

    constructor(
        protected _sanitizer: DomSanitizer,
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _http: HttpClient,
        protected _vcr: ViewContainerRef,
        protected _ngZone: NgZone
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'logoIcon') this.fetchImageAsBase64(changes[name].currentValue);
        }
    }

    ngOnDestroy(): void {
        this.logoImageChange$.complete();
    }

    ngAfterContentInit(): void {
        if (this.contentTemplate) this.contentPortal = new TemplatePortal(this.contentTemplate.fetchTemplate(), this._vcr);

        if (this.actionsTemplate) this.actionsPortal = new TemplatePortal(this.actionsTemplate.fetchTemplate(), this._vcr);
    }

    ngAfterViewInit(): void {
        this.initialize();
        this.fetchImageAsBase64(this.logoIcon);
    }

    protected handleControlToggledEvent(): void {
        this.toggled = !this.toggled;
        this.toggledChange.emit(this.toggled);
    }

    private fetchImageAsBase64(url: string): void {
        this._ngZone.runOutsideAngular(() => 
            this.logoImage$ = this._http.get(url, { responseType: 'blob' }).subscribe({
                next: blob => 
                    this._ngZone.run(() => {
                        let reader: FileReader | null = new FileReader();
                        reader.onload = event => this.logoImageChange$.next(event.target?.result as string);
                        reader.onloadend = () => reader = null;
                        reader.onerror = error => this.logoImageChange$.error(error);
                        reader.readAsDataURL(blob);
                    }),
                error: error => this.logoImageChange$.error(error),
                complete: () => this.logoImage$.unsubscribe()
            }));
    }

    private initialize(): void {
        this._renderer.addClass(this._element.nativeElement, 'layout-header');
    }

}
