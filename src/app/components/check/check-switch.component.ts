import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { Component, forwardRef, Input, Provider } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import { NGXSeasonCheckComponent } from "./check.component";

import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";

const NGXSeasonCheckSwitchValueAccessor: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NGXSeasonCheckSwitchComponent),
    multi: true
};

@Component({
    selector: 'label[ngx-sui-CheckSwitch]',
    template: `
        <input type="checkbox" [checked]="checked" [disabled]="disabled" (change)="writeValue(checkbox.checked)" #checkbox/>
        <span class="check-switch-track">
            <span class="check-switch-track-wrapper" [attr.data-check-switch-on-label]="onLabel" [attr.data-check-switch-off-label]="offLabel">
                <span class="check-switch-thumb"></span>
            </span>
        </span>
        <span class="check-switch-wrapper" *ngIf="showLabel"><ng-content></ng-content></span>
    `,
    providers: [NGXSeasonCheckSwitchValueAccessor]
})
export class NGXSeasonCheckSwitchComponent extends NGXSeasonCheckComponent implements ControlValueAccessor {

    @Input('csOnLabel')
    set onLabel(onLabel: string | undefined | null) {
        this._onLabel = onLabel ? onLabel : '开';
    }

    get onLabel(): string {
        return this._onLabel;
    }

    @Input('csOffLabel')
    set offLabel(offLabel: string | undefined | null) {
        this._offLabel = offLabel ? offLabel : '关';
    }

    get offLabel(): string {
        return this._offLabel;
    }

    private _onLabel: string = '开';
    private _offLabel: string = '关';

    protected onChange = (checked: boolean) => this.checkedChange.emit(checked);
    protected onTouched = (): void => {};

    writeValue(checked: boolean | string | undefined | null): void {
        this.checked = coerceBooleanProperty(checked);
        this.onChange(this.checked);
    }

    registerOnChange(fn: (checked: boolean) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.setupCheckDisabled(this.disabled);
    }

    protected override initialize(): void {
        this._renderer.addClass(this._element.nativeElement, 'check-switch');
    }

    protected override changeCheckColor(color: NGXSeasonColorPalette): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-check-switch-color', color);
    }

    protected override setupCheckDisabled(disabled: boolean): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-check-switch-usable', disabled ? 'disable' : 'enable');
    }

}
