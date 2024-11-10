import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { Component, forwardRef, Input, Provider, SimpleChanges } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { NGXSeasonCheckColor, NGXSeasonCheckComponent } from "./check.component";

export type NGXSeasonCheckboxCheckedMarkShape = 'tick' | 'cross';
export type NGXSeasonCheckboxIndeterminatedMarkShape = 'dash' | 'solid';

const NGXSeasonCheckboxValueAccessor: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NGXSeasonCheckboxComponent),
    multi: true
};

@Component({
    selector: 'label[ngx-sui-CheckBox]',
    template: `
        <input type="checkbox" [checked]="checked" [indeterminate]="indeterminated" [disabled]="disabled" (change)="writeValue(checkbox.checked)" #checkbox/>
        <span class="checkbox-mark"></span>
        <span class="checkbox-wrapper"><ng-content></ng-content></span>
    `,
    providers: [NGXSeasonCheckboxValueAccessor]
})
export class NGXSeasonCheckboxComponent extends NGXSeasonCheckComponent implements ControlValueAccessor {

    @Input('cbCheckMark')
    set checkMark(checkMark: NGXSeasonCheckboxCheckedMarkShape) {
        this._checkMark = checkMark;
    }

    get checkMark(): NGXSeasonCheckboxCheckedMarkShape {
        return this._checkMark;
    }

    @Input('cbIndetMark')
    set indetMark(indetMark: NGXSeasonCheckboxIndeterminatedMarkShape) {
        this._indetMark = indetMark;
    }

    get indetMark(): NGXSeasonCheckboxIndeterminatedMarkShape {
        return this._indetMark;
    }

    @Input('cbIndeterminated')
    set indeterminated(indeterminated: boolean | string | undefined | null) {
        this._indeterminated = coerceBooleanProperty(indeterminated);
    }

    get indeterminated(): boolean {
        return this._indeterminated;
    }

    private _checkMark: NGXSeasonCheckboxCheckedMarkShape = 'tick';
    private _indetMark: NGXSeasonCheckboxIndeterminatedMarkShape = 'dash';
    private _indeterminated: boolean = false;

    protected onChange = (checked: boolean) => this.checkedChange.emit(checked);
    protected onTouched = (): void => {};

    override ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        for (const name in changes) {
            if (name === 'checkMark') this.changeCheckMark(changes[name].currentValue as NGXSeasonCheckboxCheckedMarkShape);

            if (name === 'indetMark') this.changeIndeterminateMark(changes[name].currentValue as NGXSeasonCheckboxIndeterminatedMarkShape);
        }
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this.changeCheckMark(this.checkMark);
        this.changeIndeterminateMark(this.indetMark);
    }

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
        this._renderer.addClass(this._element.nativeElement, 'checkbox');
    }

    protected override changeCheckColor(color: NGXSeasonCheckColor): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-checkbox-color', color);
    }

    protected override setupCheckDisabled(disabled: boolean): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-checkbox-usable', disabled ? 'disable' : 'enable');
    }

    protected changeCheckMark(checkMark: NGXSeasonCheckboxCheckedMarkShape): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-checkbox-check-mark', checkMark);
    }

    protected changeIndeterminateMark(indetMark: NGXSeasonCheckboxIndeterminatedMarkShape): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-checkbox-indeterminate-mark', indetMark);
    }

}