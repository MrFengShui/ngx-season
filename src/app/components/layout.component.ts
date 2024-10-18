import { animate, animation, AnimationBuilder, AnimationOptions, AnimationPlayer, AnimationReferenceMetadata, style, transition, trigger, useAnimation } from "@angular/animations";
import { coerceBooleanProperty, coerceNumberProperty } from "@angular/cdk/coercion";
import { HttpClient } from "@angular/common/http";
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChanges, ViewChild } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { Observable, Subscription } from "rxjs";

@Component({
    selector: 'ngx-sui-layout',
    template: `
        <ng-content select="ngx-sui-header"></ng-content>
        <ng-content select="ngx-sui-content"></ng-content>
        <ng-content select="ngx-sui-footer"></ng-content>
    `
})
export class NGXSeasonLayoutComponent implements AfterViewInit {

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) { }

    ngAfterViewInit(): void {
        this.initialize();
    }

    private initialize(): void {
        this._renderer.addClass(this._element.nativeElement, 'ngx-sui-layout');
    }

}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'ngx-sui-header',
    template: `
        <button ngx-sui-LinkIconButton btnIcon="bars" (click)="handleControlToggledEvent()" *ngIf="showCtrl"></button>
        <a [attr.href]="logoHref" class="ngx-sui-header-logo">
            <img [attr.src]="this.baseLogoIcon$ | async" [attr.alt]="" height="100%"/>
        </a>
        <div class="ngx-sui-header-content"><ng-content select="headerContent"></ng-content></div>
        <div class="ngx-sui-header-actions"><ng-content select="headerActions"></ng-content></div>
    `
})
export class NGXSeasonHeaderComponent implements OnChanges, AfterViewInit {

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
        // console.debug(changes);
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
                    }
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

@Component({
    selector: 'ngx-sui-footer',
    template: `<ng-content></ng-content>`
})
export class NGXSeasonFooterComponent {

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) { }

    ngAfterViewInit(): void {
        this.initialize();
    }

    private initialize(): void {
        this._renderer.addClass(this._element.nativeElement, 'ngx-sui-footer');
    }

}

const sideBoxAnimate: AnimationReferenceMetadata = animation(
    [
        style({ width: '{{ start }}' }),
        animate('{{ duration }}', style({ width: '{{ final }}' }))
    ],
    { params: { start: 0, final: 0, duration: 0 } }
);

@Component({
    selector: 'ngx-sui-content',
    template: `
        <div class="ngx-sui-content-side" ngx-sui-Scrollbar [scrollBarAxis]="toggled ? 'xy-axis' : 'y-axis'" #sideBox><ng-content select="contentSide"></ng-content></div>
        <div class="ngx-sui-content-area" ngx-sui-Scrollbar scrollBarAxis="y-axis" #areaBox><ng-content select="contentArea"></ng-content></div>
    `
})
export class NGXSeasonContentComponent implements OnChanges, AfterViewInit {

    @Input('contentDuration')
    set duration(duration: number | string) {
        this._duration = coerceNumberProperty(duration);
    }

    get duration(): number {
        return this._duration;
    }

    @Input('contentRatio')
    set ratio(ratio: number | string) {
        this._ratio = coerceNumberProperty(ratio);
    }

    get ratio(): number {
        return this._ratio;
    }

    @Input('contentSideWidth')
    set sideWidth(sideWidth: number | string) {
        this._sideWidth = coerceNumberProperty(sideWidth);
    }

    get sideWidth(): number {
        return this._sideWidth;
    }

    @Input('contentToggled')
    set toggled(sideToggled: boolean | string) {
        this._toggled = coerceBooleanProperty(sideToggled);
    }

    get toggled(): boolean {
        return this._toggled;
    }

    @ViewChild('sideBox', { read: ElementRef, static: true })
    protected sideBox: ElementRef<HTMLDivElement> | undefined;

    @ViewChild('areaBox', { read: ElementRef, static: true })
    protected areaBox: ElementRef<HTMLDivElement> | undefined;

    private _duration: number = 125;
    private _ratio: number = 0.15;
    private _sideWidth: number = 0;
    private _toggled: boolean = false;

    constructor(
        protected _builder: AnimationBuilder,
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        let keys: string[] | null = Object.keys(changes);
        // console.debug(changes);
        if (keys.includes('ratio')) {
            this.changeContentRatio(changes['ratio'].currentValue as number);
        }

        if (keys.includes('sideWidth')) {
            this.changeContentSideWidth(changes['sideWidth'].currentValue as number);
        }

        if (keys.includes('toggled')) {
            this.changeContentSideToggled(changes['toggled'].currentValue as boolean, this.duration);
        }

        keys.splice(0);
        keys = null;
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'ngx-sui-content');
        this.changeContentRatio(this.ratio);
        this.changeContentSideWidth(this.sideWidth);
        this.changeContentSideToggled(this.toggled, this.duration);
    }

    private changeContentRatio(ratio: number): void {
        if (ratio > 1 || !this.sideBox || !this.areaBox) throw new Error();

        this._renderer.setStyle(this.sideBox.nativeElement, 'width', `${100 * ratio}%`);
        this._renderer.setStyle(this.areaBox.nativeElement, 'width', `${100 * (1 - ratio)}%`);
    }

    private changeContentSideWidth(sideWidth: number): void {
        if (sideWidth < 0 || !this.sideBox || !this.areaBox) throw new Error();

        if (sideWidth === 0) {
            this.changeContentRatio(this.ratio);
        } else {
            this._renderer.setStyle(this.sideBox.nativeElement, 'width', `${sideWidth}px`);
            this._renderer.setStyle(this.areaBox.nativeElement, 'flex', '1 1 auto');
            this._renderer.removeStyle(this.areaBox.nativeElement, 'width');
        }
    }

    private changeContentSideToggled(toggled: boolean, duration: number): void {
        if (this.sideWidth < 0 || !this.sideBox || !this.areaBox) throw new Error();

        const element: HTMLElement = this.sideBox.nativeElement;
        let player: AnimationPlayer | null;

        player = this._builder
            .build(useAnimation(sideBoxAnimate, { 
                params: { 
                    start: toggled ? `${24 + 2 * 16}px` : `${this._sideWidth}px`, 
                    final: toggled ? `${this._sideWidth}px` : `${24 + 2 * 16}px`, 
                    duration: `${duration}ms` 
                } 
            }))
            .create(element);
        player.onDone(() => player = null);
        player.play();
    }

}

