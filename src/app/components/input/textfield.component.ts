import { TemplatePortal } from "@angular/cdk/portal";
import { AfterContentInit, Component, ElementRef, forwardRef, Provider, ViewChild } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import { NGXSeasonInputComponent } from "./input.component";

const NGXSeasonTextfieldValueAccessor: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NGXSeasonTextfieldComponent),
    multi: true
};

@Component({
    selector: 'label[ngx-sui-Textfield]',
    template: `
        <div class="input-field">
            <span class="label" *ngIf="showLabel && label">{{ label }}</span>
            <div class="field">
                <div class="prefix-wrapper" *ngIf="showPrefix || prefixTemplate">
                    <ng-container [cdkPortalOutlet]="prefixPortal"></ng-container>
                </div>
                <div class="entry-wrapper">
                    <input type="text" [attr.placeholder]="placeholder" [attr.value]="text" (input)="writeValue(field.value)" #field/>
                    <button ngx-sui-FlatIconButton btnCircled="true" [btnColor]="color" btnIcon="times-circle" btnIconOnly="true" (click)="clearText()" *ngIf="showClear"></button>
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
        <ng-template><ng-content select="[ngx-sui-InputPrefix], [ngx-sui-InputSuffix]"></ng-content></ng-template>
    `,
    providers: [NGXSeasonTextfieldValueAccessor]
})
export class NGXSeasonTextfieldComponent extends NGXSeasonInputComponent implements AfterContentInit, ControlValueAccessor {

    onChange = (text: string | undefined) => this.textChange.emit(text);
    onTouched = () => {};

    ngAfterContentInit(): void {
        if (this.prefixTemplate) this.prefixPortal = new TemplatePortal(this.prefixTemplate.fetchTemplate(), this._vcr);

        if (this.suffixTemplate) this.suffixPortal = new TemplatePortal(this.suffixTemplate.fetchTemplate(), this._vcr);
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.addClass(this._element.nativeElement, 'textfield');
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