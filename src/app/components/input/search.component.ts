import { TemplatePortal } from "@angular/cdk/portal";
import { AfterContentInit, Component, ElementRef, forwardRef, Input, Provider, ViewChild } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import { NGXSeasonInputComponent } from "./input.component";
import { NGXSeasonIconName } from "../icon/icon.component";
import { coerceBooleanProperty } from "@angular/cdk/coercion";

export type NGXSeasonSearchIconPosition = 'after' | 'before';

const NGXSeasonSearchValueAccessor: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NGXSeasonSearchComponent),
    multi: true
};

@Component({
    selector: 'label[ngx-sui-Search]',
    template: `
        <div class="input-field">
            <div class="field">
                <div class="prefix-wrapper" *ngIf="showIcon && position === 'before'">
                    <ngx-sui-icon [iconColor]="color" [iconShape]="icon" iconSize="lg"></ngx-sui-icon>
                </div>
                <div class="entry-wrapper">
                    <input type="text" [attr.placeholder]="placeholder" [attr.value]="text" (input)="writeValue(field.value)" #field/>
                    <button ngx-sui-FlatIconButton btnCircled="true" [btnColor]="color" btnIcon="times-circle" btnIconOnly="true" (click)="clearText()" *ngIf="showClear"></button>
                </div>
                <div class="postfix-wrapper" *ngIf="showIcon && position === 'after'">
                     <ngx-sui-icon [iconColor]="color" [iconShape]="icon" iconSize="lg"></ngx-sui-icon>
                </div>
            </div>
        </div>
    `,
    providers: [NGXSeasonSearchValueAccessor]
})
export class NGXSeasonSearchComponent extends NGXSeasonInputComponent implements AfterContentInit, ControlValueAccessor {

    @Input('searchIcon')
    set icon(icon: NGXSeasonIconName | null) {
        this._icon = icon ? icon : 'search';
    }

    get icon(): NGXSeasonIconName {
        return this._icon;
    }

    @Input('searchIconPos')
    set position(position: NGXSeasonSearchIconPosition | null) {
        this._position = position ? position : 'after';
    }

    get position(): NGXSeasonSearchIconPosition {
        return this._position;
    }

    @Input('searchShowIcon')
    set showIcon(showIcon: boolean | string | null) {
        this._showIcon = coerceBooleanProperty(showIcon);
    }

    get showIcon(): boolean {
        return this._showIcon;
    }

    private _icon: NGXSeasonIconName = 'search';
    private _position: NGXSeasonSearchIconPosition = 'after';
    private _showIcon: boolean = true;

    onChange = (text: string | undefined) => this.textChange.emit(text);
    onTouched = () => {};

    ngAfterContentInit(): void {
        if (this.prefixTemplate) this.prefixPortal = new TemplatePortal(this.prefixTemplate.fetchTemplate(), this._vcr);

        if (this.suffixTemplate) this.suffixPortal = new TemplatePortal(this.suffixTemplate.fetchTemplate(), this._vcr);
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.addClass(this._element.nativeElement, 'search');
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