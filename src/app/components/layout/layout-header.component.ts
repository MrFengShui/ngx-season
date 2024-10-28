import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { HttpClient } from "@angular/common/http";
import { Component, ChangeDetectionStrategy, OnChanges, AfterViewInit, Input, Output, EventEmitter, ChangeDetectorRef, ElementRef, Renderer2, SimpleChanges } from "@angular/core";
import { SafeUrl, DomSanitizer } from "@angular/platform-browser";
import { Observable, Subscription } from "rxjs";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'ngx-sui-layout-header',
    template: `
        <button ngx-sui-Button btnIcon="bars" btnIconOnly="true" (click)="handleControlToggledEvent()" *ngIf="showCtrl"></button>
        <a [attr.href]="logoHref" class="ngx-sui-header-logo">
            <img [attr.src]="this.baseLogoIcon$ | async" [attr.alt]="" height="100%"/>
        </a>
        <div class="ngx-sui-header-content"><ng-content select="headerContent"></ng-content></div>
        <div class="ngx-sui-header-actions"><ng-content select="headerActions"></ng-content></div>
    `
})
export class NGXSeasonLayoutHeaderComponent implements OnChanges, AfterViewInit {

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

    protected baseLogoIcon$: Observable<SafeUrl> | undefined;

    constructor(
        protected _cdr: ChangeDetectorRef,
        protected _sanitizer: DomSanitizer,
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _http: HttpClient
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        let keys: string[] | null = Object.keys(changes);

        if (keys.includes('logoIcon')) {
            this.baseLogoIcon$ = this.fetchIconByBase64(changes['logoIcon'].currentValue as string);
        }

        this._cdr.markForCheck();

        keys.splice(0);
        keys = null;
    }

    ngAfterViewInit(): void {
        this.initialize();

        this.baseLogoIcon$ = this.fetchIconByBase64(this.logoIcon);
        this._cdr.markForCheck();
    }

    protected handleControlToggledEvent(): void {
        this.toggled = !this.toggled;
        this.toggledChange.emit(this.toggled);
    }

    private fetchIconByBase64(url: string): Observable<string> {
        return new Observable(subscriber => {
            let subscription: Subscription = this._http.get(url, { responseType: 'blob' }).subscribe({
                next: blob => {
                    let reader: FileReader | null = new FileReader();
                    reader.onload = event => subscriber.next(event.target?.result as string);
                    reader.onloadend = () => {
                        subscriber.complete();
                        reader = null;
                    };
                    reader.onerror = error => subscriber.error(error);
                    reader.readAsDataURL(blob);
                },
                error: error => {
                    subscriber.error(error);
                    subscription.unsubscribe();
                },
                complete: () => subscription.unsubscribe()
            });
        });
    }

    private initialize(): void {
        this._renderer.addClass(this._element.nativeElement, 'ngx-sui-header');
    }

}
