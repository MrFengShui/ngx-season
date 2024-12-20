import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { TemplatePortal } from "@angular/cdk/portal";
import { AfterContentInit, AfterViewInit, Component, ElementRef, forwardRef, Inject, InjectionToken, Input, OnChanges, OnDestroy, Provider, Renderer2, SimpleChanges, ViewChild } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { BehaviorSubject, Subject } from "rxjs";

import { NGXSeasonInputComponent } from "./input.component";
import { NGXSeasonColorPalette } from "src/app/utils/_palette.utils";

export const NGX_SEASON_PASSWORD_STRENGTH_LABEL_TOKEN: InjectionToken<NGXSeasonPasswordStrengthLabel> = new InjectionToken('NGX_SEASON_PASSWORD_STRENGTH_LABEL_TOKEN');

export type NGXSeasonPasswordStrengthLabel = { weak: string, medium: string, strong: string, extra: string };

const NGXSeasonPasswordValueAccessor: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NGXSeasonPasswordComponent),
    multi: true
};

@Component({
    selector: 'ngx-sui-password-strength-checker',
    template: `
        <span class="check-subject" *ngIf="subject">{{ subject }}</span>
        <div class="check-meter-wrapper">
            <div class="check-meter" [class.weak]="weakMatch$.asObservable() | async">
                <span class="meter-mark"></span>
                <span class="meter-text">{{ _strongLabel.weak }}</span>
            </div>
            <div class="check-meter" [class.medium]="mediumMatch$.asObservable() | async">
                <span class="meter-mark"></span>
                <span class="meter-text">{{ _strongLabel.medium }}</span>
            </div>
            <div class="check-meter" [class.strong]="strongMatch$.asObservable() | async">
                <span class="meter-mark"></span>
                <span class="meter-text">{{ _strongLabel.strong }}</span>
            </div>
            <div class="check-meter" [class.very]="extraMatch$.asObservable() | async">
                <span class="meter-mark"></span>
                <span class="meter-text">{{ _strongLabel.extra }}</span>
            </div>
        </div>
        <ol class="check-suggest" *ngIf="suggests">
            <li class="check-suggest-item" *ngFor="let suggest of suggests">{{ suggest }}</li>
        </ol>
    `
})
export class NGXSeasonPasswordStrengthCheckComponent implements OnChanges, OnDestroy, AfterViewInit {

    @Input('color')
    set color(color: NGXSeasonColorPalette | null) {
        this._color = color ? color : 'default';
    }

    get color(): NGXSeasonColorPalette {
        return this._color;
    }

    @Input('patterns')
    set patterns(patterns: string[] | undefined | null) {
        this._patterns = patterns ? patterns : this.DEFAULT_PATTERNS;
    }

    get patterns(): string[] | undefined {
        return this._patterns;
    }

    @Input('subject')
    set subject(subject: string | undefined | null) {
        this._subject = subject ? subject : '密码强度检查';
    }

    get subject(): string | undefined {
        return this._subject;
    }

    @Input('suggests')
    set suggests(suggests: string[] | undefined | null) {
        this._suggests = suggests ? suggests : this.DEFAULT_SUGGESTS;
    }

    get suggests(): string[] | undefined {
        return this._suggests;
    }

    @Input('text')
    set text(text: string | undefined | null) {
        this._text = text ? text : undefined;
    }

    get text(): string | undefined {
        return this._text;
    }

    private _color: NGXSeasonColorPalette = 'default';
    private _patterns: string[] | undefined;
    private _subject: string | undefined;
    private _suggests: string[] | undefined;
    private _text: string | undefined;

    protected weakMatch$: Subject<boolean> = new BehaviorSubject(false);
    protected mediumMatch$: Subject<boolean> = new BehaviorSubject(false);
    protected strongMatch$: Subject<boolean> = new BehaviorSubject(false);
    protected extraMatch$: Subject<boolean> = new BehaviorSubject(false);

    private readonly DEFAULT_PATTERNS: string[] = [
        '^.{8,}$',
        '^(?=.*[0-9])(?=.*[a-z]).{8,}$',
        '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$',
        '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$'
    ];
    private readonly DEFAULT_SUGGESTS: string[] = ['字符长度至少为8字符', '字符中至少包含一个数字', '字符中至少包含一个小写字母', '字符中至少包含一个大写字母', '字符中至少包含一个特殊符号'];

    private sheet: Array<{ expr: RegExp, flag: boolean }> = [];

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,

        @Inject(NGX_SEASON_PASSWORD_STRENGTH_LABEL_TOKEN)
        protected _strongLabel: NGXSeasonPasswordStrengthLabel
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'color') this.changeCheckColor(changes[name].currentValue as NGXSeasonColorPalette);

            if (name === 'patterns') this.changeCheckPatterns(changes[name].currentValue);

            if (name === 'suggests') this.changeCheckSuggests(changes[name].currentValue);

            if (name === 'text') this.matchText(changes[name].currentValue);
        }
    }

    ngOnDestroy(): void {
        this.weakMatch$.complete();
        this.mediumMatch$.complete();
        this.strongMatch$.complete();
        this.extraMatch$.complete();
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'password-strength-check');

        this.changeCheckColor(this.color);
        this.changeCheckPatterns(this.patterns);
        this.changeCheckSuggests(this.suggests);

        this.matchText(this.text);
    }

    private changeCheckColor(color: NGXSeasonColorPalette): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-check-color', color);
    }

    private changeCheckPatterns(patterns: string[] | undefined): void {
        this.patterns = patterns ? patterns : this.DEFAULT_PATTERNS;

        if (this.sheet.length > 0) this.sheet.splice(0);

        for (const pattern of this.patterns) this.sheet.push({ expr: new RegExp(pattern), flag: false });
    }

    private changeCheckSuggests(suggests: string[] | undefined): void {
        this.suggests = suggests ? suggests : this.DEFAULT_SUGGESTS;
    }

    private matchText(text: string | undefined): void {
        let score: number;

        if (text && text.trim().length === 0) this.sheet.forEach(item => item.flag = false);

        if (text && this.sheet.length > 0) {
            for (const item of this.sheet) item.flag = item.expr.test(text);
        }

        score = this.sheet.filter(item => item.flag).length;
        score = Math.pow(2, score) - 1;

        this.weakMatch$.next((score & 0b0001) === 0b0001);
        this.mediumMatch$.next((score & 0b0010) === 0b0010);
        this.strongMatch$.next((score & 0b0100) === 0b0100);
        this.extraMatch$.next((score & 0b1000) === 0b1000);
    }

}

@Component({
    selector: 'label[ngx-sui-Password]',
    template: `
        <div class="input-field">
            <span class="label" *ngIf="showLabel && label">{{ label }}</span>
            <div class="field">
                <div class="prefix-wrapper" *ngIf="showPrefix || prefixTemplate">
                    <ng-container [cdkPortalOutlet]="prefixPortal"></ng-container>
                </div>
                <div class="entry-wrapper">
                    <input [attr.type]="visible ? 'text' : 'password'" [attr.placeholder]="placeholder" [attr.value]="text" (input)="writeValue(field.value)" #field/>
                    <button ngx-sui-IconButton btnCircled="true" [btnColor]="color" btnIcon="times-circle" btnIconOnly="true" btnStyle="flat" (click)="clearText()" *ngIf="showClear"></button>
                    <button ngx-sui-IconButton btnCircled="true" [btnColor]="color" [btnIcon]="visible ? 'eye-hide' : 'eye-show'" btnIconOnly="true" btnStyle="flat" (click)="visible = !visible" *ngIf="showVisible"></button>
                </div>
                <div class="postfix-wrapper" *ngIf="showSuffix || suffixTemplate">
                    <ng-container [cdkPortalOutlet]="suffixPortal"></ng-container>
                </div>
            </div>
        </div>
        <ng-container *ngIf="promptAlertText || promptTipText">
            <div class="input-divider"></div>
            <div class="input-prompt">
                <span class="alert-text" ngx-sui-Tooltip [olColor]="color" [ttMsg]="promptAlertText" ttPos="bottom" ttShowDelay="1000" ttHideDelay="1000">{{ promptAlertText }}</span>
                <span class="tip-text">{{ promptTipText }}</span>
            </div>
        </ng-container>
        <div class="input-check" *ngIf="showCheck">
            <ngx-sui-password-strength-checker [color]="color" [patterns]="checkPatterns" [subject]="checkSubject" [suggests]="checkSuggests" [text]="text"></ngx-sui-password-strength-checker>
        </div>
        <ng-template><ng-content select="[ngx-sui-InputPrefix], [ngx-sui-InputSuffix]"></ng-content></ng-template>
    `,
    providers: [NGXSeasonPasswordValueAccessor]
})
export class NGXSeasonPasswordComponent extends NGXSeasonInputComponent implements AfterContentInit, ControlValueAccessor {

    @Input('pwdCheckPatterns')
    set checkPatterns(checkPatterns: string[] | null) {
        this._checkPatterns = checkPatterns ? checkPatterns : undefined;
    }

    get checkPatterns(): string[] | undefined {
        return this._checkPatterns;
    }

    @Input('pwdCheckSubject')
    set checkSubject(checkSubject: string | undefined | null) {
        this._checkSubject = checkSubject ? checkSubject : undefined;
    }

    get checkSubject(): string | undefined {
        return this._checkSubject;
    }

    @Input('pwdCheckSuggests')
    set checkSuggests(checkSuggests: string[] | null) {
        this._checkSuggests = checkSuggests ? checkSuggests : undefined;
    }

    get checkSuggests(): string[] | undefined {
        return this._checkSuggests;
    }

    @Input('pwdShowCheck')
    set showCheck(showCheck: boolean | string | null) {
        this._showCheck = coerceBooleanProperty(showCheck);
    }

    get showCheck(): boolean {
        return this._showCheck;
    }

    @Input('pwdShowVisibleBtn')
    set showVisible(showVisible: boolean | string | null) {
        this._showVisible = coerceBooleanProperty(showVisible);
    }

    get showVisible(): boolean {
        return this._showVisible;
    }

    private _checkPatterns: string[] | undefined;
    private _checkSubject: string | undefined;
    private _checkSuggests: string[] | undefined;
    private _showCheck: boolean = false;
    private _showVisible: boolean = true;

    @ViewChild('wrapper', { read: ElementRef, static: true })
    protected wrapper: ElementRef<HTMLElement> | undefined;

    onChange = (text: string | undefined) => this.textChange.emit(text);
    onTouched = () => {};

    protected visible: boolean = false;

    ngAfterContentInit(): void {
        if (this.prefixTemplate) this.prefixPortal = new TemplatePortal(this.prefixTemplate.fetchTemplate(), this._vcr);

        if (this.suffixTemplate) this.suffixPortal = new TemplatePortal(this.suffixTemplate.fetchTemplate(), this._vcr);
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.addClass(this._element.nativeElement, 'password');
    }

    writeValue(text: string | undefined): void {
        this.text = text;
        this.onChange(this.text);
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

}
