import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { TemplatePortal } from "@angular/cdk/portal";
import { AfterContentInit, Component, ElementRef, forwardRef, InjectionToken, Input, Provider, ViewChild } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import { NGXSeasonBaseInputComponent } from "./input.component";

export const NGX_SEASON_PASSWORD_STRENGTH_LABEL_TOKEN: InjectionToken<NGXSeasonPasswordStrengthLabel> = new InjectionToken('NGX_SEASON_PASSWORD_STRENGTH_LABEL_TOKEN');

export type NGXSeasonPasswordStrengthLabel = { weak: string, medium: string, strong: string, extra: string };

const NGXSeasonPasswordValueAccessor: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NGXSeasonPasswordComponent),
    multi: true
};

@Component({
    selector: 'label[ngx-sui-Password]',
    template: `
        <!-- <div class="input-field">
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
        </div> -->
        <ng-template><ng-content select="[ngx-sui-InputPrefix], [ngx-sui-InputSuffix]"></ng-content></ng-template>
    `,
    providers: [NGXSeasonPasswordValueAccessor]
})
export class NGXSeasonPasswordComponent extends NGXSeasonBaseInputComponent implements AfterContentInit, ControlValueAccessor {
    protected override listenInputTextChange(): void {
        throw new Error("Method not implemented.");
    }

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
