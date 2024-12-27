import { coerceCssPixelValue, coerceNumberProperty } from "@angular/cdk/coercion";
import { CloseScrollStrategy, ConnectionPositionPair, Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal, TemplatePortal } from "@angular/cdk/portal";
import { AfterContentInit, AfterViewInit, Component, ComponentRef, ElementRef, forwardRef, Inject, InjectionToken, Input, NgZone, Provider, Renderer2, ViewChild, ViewContainerRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { BehaviorSubject, debounceTime, Subscription } from "rxjs";

import { NGXSeasonBaseInputComponent } from "./input.component";

export const NGX_SEASON_PASSWORD_CHECKER_LEVEL_TOKEN: InjectionToken<NGXSeasonPasswordCheckerLevel> = new InjectionToken('NGX_SEASON_PASSWORD_CHECKER_LEVEL_TOKEN');

export type NGXSeasonInputFieldType = 'txt' | 'pwd';
export type NGXSeasonPasswordCheckerPattern = { weak: RegExp, medium: RegExp, strong: RegExp, stronger: RegExp };
export type NGXSeasonPasswordCheckerName = keyof NGXSeasonPasswordCheckerPattern;

type NGXSeasonPasswordCheckerLevel = { weak: string, medium: string, strong: string, stronger: string };
type NGXSeasonPasswordCheckerMatcher = { weak: boolean, medium: boolean, strong: boolean, stronger: boolean };

const NGXSeasonTextfieldValueAccessor: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NGXSeasonInputFieldComponent),
    multi: true
};

const DEFAULT_PATTERNS: NGXSeasonPasswordCheckerPattern = {
    weak: /^.{8,}$/,
    medium: /^(?=.*[0-9])(?=.*[a-z]).{8,}$/,
    strong: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    stronger: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/
};

const DEFAULT_DESCRIPTIONS: string[] = ['字符长度至少为8字符', '字符中至少包含一个数字', '字符中至少包含一个小写字母', '字符中至少包含一个大写字母', '字符中至少包含一个特殊符号'];

@Component({
    selector: 'label[ngx-sui-InputField]',
    template: `
        <div class="input-field" #container>
            <span class="input-label" #inputLabel *ngIf="showLabel">{{ label }}</span>
            <div class="input-field-wrapper">
                <div class="addon" *ngIf="prefixTemplate"><ng-container [cdkPortalOutlet]="prefixPortal"></ng-container></div>
                <input type="text" [attr.placeholder]="placeholder" [attr.value]="text" (focus)="listenInputFieldFocusChange(true)" (blur)="listenInputFieldFocusChange(false, inputField.value.length)" (input)="writeValue(inputField.value)" #inputField *ngIf="type === 'txt'">
                <input [type]="(visible$ | async) ? 'text' : 'password'" [attr.placeholder]="placeholder" [attr.value]="text" (focus)="listenInputFieldFocusChange(true)" (blur)="listenInputFieldFocusChange(false, inputField.value.length)" (input)="writeValue(inputField.value)" #inputField *ngIf="type === 'pwd'">
                <button ngx-sui-IconButton btnCircled [btnColor]="color" [btnIcon]="(visible$ | async) ? 'eye-hide' : 'eye-show'" btnIconOnly="true" btnSize="sm" btnStyle="solid" (click)="handlePasswordVisibleHiddenEvent($event)" *ngIf="type === 'pwd'"></button>
                <button ngx-sui-IconButton btnCircled [btnColor]="color" btnIcon="close" btnIconOnly="true" btnSize="sm" btnStyle="solid" (click)="handleClearTextEvent($event)" *ngIf="showClear && !isInputValueEmpty()"></button>
                <div class="addon" *ngIf="suffixTemplate"><ng-container [cdkPortalOutlet]="suffixPortal"></ng-container></div>
            </div>
        </div>
        <div class="input-prompt" *ngIf="showPrompt">
            <span class="message" ngx-sui-Tooltip [olColor]="color" [ttMsg]="promptMsg" ttPos="bottom" ttShowDelay="1000" ttHideDelay="1000">{{ promptMsg }}</span>
            <span>{{ promptTip }}</span>
        </div>
        <ng-template><ng-content select="[ngx-sui-InputPrefix], [ngx-sui-InputSuffix]"></ng-content></ng-template>
    `,
    providers: [NGXSeasonTextfieldValueAccessor]
})
export class NGXSeasonInputFieldComponent extends NGXSeasonBaseInputComponent implements AfterContentInit, ControlValueAccessor {

    @Input({ alias: 'ifDescTexts' })
    set descriptions(descriptions: string[] | undefined | null) {
        this._descriptions = descriptions || DEFAULT_DESCRIPTIONS;
    }

    get descriptions(): string[] {
        return this._descriptions;
    }

    @Input({ alias: 'ifPattern' })
    set pattern(pattern: NGXSeasonPasswordCheckerPattern | undefined | null) {
        this._pattern = pattern || DEFAULT_PATTERNS;
    }

    get pattern(): NGXSeasonPasswordCheckerPattern {
        return this._pattern;
    }

    @Input({ alias: 'ifSubject' })
    set subject(subject: string | undefined | null) {
        this._subject = subject || undefined;
    }

    get subject(): string | undefined {
        return this._subject;
    }

    @Input({ alias: 'ifType' })
    set type(type: NGXSeasonInputFieldType | undefined | null) {
        this._type = type || 'txt';
    }

    get type(): NGXSeasonInputFieldType {
        return this._type;
    }

    private _descriptions: string[] = DEFAULT_DESCRIPTIONS;
    private _pattern: NGXSeasonPasswordCheckerPattern = DEFAULT_PATTERNS;
    private _subject: string | undefined;
    private _type: NGXSeasonInputFieldType = 'txt';

    @ViewChild('container', { read: ElementRef, static: true })
    protected container: ElementRef<HTMLElement> | undefined;

    protected visible$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    private readonly OVERLAY_POSITIONS: ConnectionPositionPair[] = [
        { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
        { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },

        { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' },
        { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },

        { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' },
        { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },

        { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
        { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
    ];

    private overlayRef: OverlayRef | undefined;
    private checker: NGXSeasonPasswordCheckerComponent | undefined;

    private focusChange$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private focus$: Subscription = Subscription.EMPTY;

    constructor(
        protected override _element: ElementRef,
        protected override _renderer: Renderer2,
        protected override _vcr: ViewContainerRef,
        protected override _ngZone: NgZone,

        protected _overlay: Overlay,

        @Inject(NGX_SEASON_PASSWORD_CHECKER_LEVEL_TOKEN)
        protected _level: NGXSeasonPasswordCheckerLevel
    ) {
        super(_element, _renderer, _vcr, _ngZone);
    }

    override ngOnDestroy(): void {
        super.ngOnDestroy();

        this.focus$.unsubscribe();

        this.focusChange$.complete();
        this.visible$.complete();
    }

    ngAfterContentInit(): void {
        if (this.prefixTemplate) this.prefixPortal = new TemplatePortal(this.prefixTemplate.fetchTemplate(), this._vcr);

        if (this.suffixTemplate) this.suffixPortal = new TemplatePortal(this.suffixTemplate.fetchTemplate(), this._vcr);
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.addClass(this._element.nativeElement, 'input-field-container');

        this.listenFocusChange();
    }

    writeValue(text?: string): void {
        this.inputChange$.next(text || '');
    }

    registerOnChange(fn: (text: string | undefined) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    protected handleClearTextEvent(event: MouseEvent): void {
        event.preventDefault();

        this._renderer.setProperty(this.inputField?.nativeElement, 'value', null);
        this.floatChange$.next(false);
        this.inputChange$.next('');
    }

    protected handlePasswordVisibleHiddenEvent(event: MouseEvent): void {
        event.preventDefault();

        if (this.visible$.value) this.visible$.next(false);
        else this.visible$.next(true);
    }

    protected listenInputFieldFocusChange(flag: boolean, length?: number): void {
        this.focusChange$.next(flag);
        this.floatChange$.next(flag || coerceNumberProperty(length) > 0);
    }

    private listenFocusChange(): void {
        this._ngZone.runOutsideAngular(() =>
            this.focus$ = this.focusChange$.asObservable()
                .subscribe(value => { if (this.type === 'pwd') value ? this.display() : this.dismiss(); }));
    }

    protected override listenInputTextChange(): void {
        this._ngZone.runOutsideAngular(() =>
            this.input$ = this.inputChange$.asObservable().pipe(debounceTime(250))
                .subscribe(value => {
                    this.onChange(value);
                    this.checker?.match(value, this.pattern);
                }));
    }

    private display(): void {
        if (!this.container) throw new Error();

        const positionStrategy = this._overlay.position()
            .flexibleConnectedTo(this.container)
            .withPositions(this.OVERLAY_POSITIONS)
            .withFlexibleDimensions(false)
            .withPush(false);
        const scrollStrategy: CloseScrollStrategy = this._overlay.scrollStrategies.close();
        this.overlayRef = this._overlay.create({
            positionStrategy, scrollStrategy,
            width: coerceCssPixelValue(this._element.nativeElement.offsetWidth), height: 'fit-content'
        });

        const portal: ComponentPortal<NGXSeasonPasswordCheckerComponent> = new ComponentPortal(NGXSeasonPasswordCheckerComponent, this._vcr);
        const ref: ComponentRef<NGXSeasonPasswordCheckerComponent> = this.overlayRef.attach(portal);
        ref.setInput('ifcLevel', this._level);
        ref.setInput('ifcSubject', '密码强度检查');
        ref.setInput('ifcDescTexts', this.descriptions);

        this.checker = ref.instance;
        this.checker.match(this.inputField?.nativeElement.value || '', this.pattern);
    }

    private dismiss(): void {
        if (this.overlayRef) {
            this.overlayRef.detach();
            this.overlayRef.dispose();

            this.overlayRef = undefined;
        }
    }

}

@Component({
    selector: 'ngx-sui-password-checker',
    template: `
        <div class="subject">{{ subject }}</div>
        <div class="indicator">
            <div class="bar weak" [class.active]="matcher.weak" [attr.data-check-level]="level?.weak"></div>
            <div class="bar medium" [class.active]="matcher.medium" [attr.data-check-level]="level?.medium"></div>
            <div class="bar strong" [class.active]="matcher.strong" [attr.data-check-level]="level?.strong"></div>
            <div class="bar stronger" [class.active]="matcher.stronger" [attr.data-check-level]="level?.stronger"></div>
        </div>
        <ul class="desc-list">
            <li class="desc-item" *ngFor="let description of descriptions"><span>{{ description }}</span></li>
        </ul>
    `
})
export class NGXSeasonPasswordCheckerComponent implements AfterViewInit {

    @Input({ alias: 'ifcDescTexts' })
    set descriptions(descriptions: string[] | undefined | null) {
        this._descriptions = descriptions || undefined;
    }

    get descriptions(): string[] | undefined {
        return this._descriptions;
    }

    @Input({ alias: 'ifcLevel' })
    set level(level: NGXSeasonPasswordCheckerLevel | undefined | null) {
        this._level = level || undefined;
    }

    get level(): NGXSeasonPasswordCheckerLevel | undefined {
        return this._level;
    }

    @Input({ alias: 'ifcSubject' })
    set subject(subject: string | undefined | null) {
        this._subject = subject || undefined;
    }

    get subject(): string | undefined {
        return this._subject;
    }

    private _descriptions: string[] | undefined;
    private _level: NGXSeasonPasswordCheckerLevel | undefined;
    private _subject: string | undefined;

    protected matcher: NGXSeasonPasswordCheckerMatcher = { weak: false, medium: false, strong: false, stronger: false };

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'password-checker');
    }

    match(password: string, pattern: NGXSeasonPasswordCheckerPattern): NGXSeasonPasswordCheckerMatcher {
        this.matcher = { ...this.matcher, weak: false, medium: false, strong: false, stronger: false };

        this.matcher.stronger = (pattern.stronger as RegExp).test(password);
        this.matcher.strong = (pattern.strong as RegExp).test(password);
        this.matcher.medium = (pattern.medium as RegExp).test(password);
        this.matcher.weak = (pattern.weak as RegExp).test(password);
        return this.matcher;
    }

}
