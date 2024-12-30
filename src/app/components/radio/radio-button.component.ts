import { Component, forwardRef, Input, Provider, SimpleChanges } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import { NGXSeasonRadioComponent, NGXSeasonRadioGroupComponent } from "./radio.component";

import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";

export type NGXSeasonRadioButtonCheckedMarkShape = 'tick' | 'cross' | 'solid';
export type NGXSeasonRadioButtonLabelPosition = 'after' | 'before';

const NGXSeasonRadioButtonValueAccessor: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NGXSeasonRadioButtonGroupComponent),
    multi: true
};

@Component({
    selector: '[ngx-sui-RadioButtonGroup]',
    template: '',
    providers: [NGXSeasonRadioButtonValueAccessor]
})
export class NGXSeasonRadioButtonGroupComponent extends NGXSeasonRadioGroupComponent implements ControlValueAccessor {

    protected onChange = (value: any) => this.selectedValueChange.emit(value);
    protected onTouch = () => {};

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.addClass(this._element.nativeElement, 'radio-button-group');
    }

    writeValue(value: any): void {
        this.selectedValue = value;
        this.onChange(this.selectedValue);
    }

    registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouch = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

}

@Component({
    selector: 'label[ngx-sui-RadioButton]',
    template: `
        <input type="radio" [checked]="selected || group?.selectedValue === value" [name]="name || group?.name" [value]="value" [disabled]="disabled || group?.disabled" (change)="listenInputValueChange(radio)" #radio/>
        <span class="radiobtn-mark"></span>
        <span class="radiobtn-wrapper"><ng-content></ng-content></span>
    `
})
export class NGXSeasonRadioButtonComponent extends NGXSeasonRadioComponent {

    @Input('rbColor')
    set color(color: NGXSeasonColorPalette | null) {
        this._color = color ? color : 'default';
    }

    get color(): NGXSeasonColorPalette {
        return this._color;
    }

    @Input('rbGroup')
    set group(group: NGXSeasonRadioButtonGroupComponent | undefined | null) {
        this._group = group ? group : undefined;
    }

    get group(): NGXSeasonRadioButtonGroupComponent | undefined {
        return this._group;
    }

    @Input('rbMark')
    set mark(mark: NGXSeasonRadioButtonCheckedMarkShape | null) {
        this._mark = mark ? mark : 'solid';
    }

    get mark(): NGXSeasonRadioButtonCheckedMarkShape {
        return this._mark;
    }

    @Input('rbLabelPos')
    set position(position: NGXSeasonRadioButtonLabelPosition | null) {
        this._position = position ? position : 'after';
    }

    get position(): NGXSeasonRadioButtonLabelPosition {
        return this._position;
    }

    private _color: NGXSeasonColorPalette = 'default';
    private _group: NGXSeasonRadioButtonGroupComponent | undefined;
    private _mark: NGXSeasonRadioButtonCheckedMarkShape = 'solid';
    private _position: NGXSeasonRadioButtonLabelPosition = 'after';

    override ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        for (const name in changes) {
            if (name === 'color') this.changeRadioColor(changes[name].currentValue as NGXSeasonColorPalette);

            if (name === 'mark') this.changeRadioMark(changes[name].currentValue as NGXSeasonRadioButtonCheckedMarkShape);

            if (name === 'position') this.changeRadioLabelPostion(changes[name].currentValue as NGXSeasonRadioButtonLabelPosition);
        }
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this.changeRadioColor(this.color);
        this.changeRadioMark(this.mark);
        this.changeRadioLabelPostion(this.position);
        this.listenGroupDisabledChange();
    }

    protected override initialize(): void {
        this._renderer.addClass(this._element.nativeElement, 'radiobtn');
    }

    protected changeRadioColor(color: NGXSeasonColorPalette): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-radiobtn-color', color);
    }

    protected override setupRadioDisabled(disabled: boolean): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-radiobtn-usable', disabled ? 'disable' : 'enable');
    }

    protected changeRadioMark(radioMark: NGXSeasonRadioButtonCheckedMarkShape): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-radiobtn-check-mark', radioMark);
    }

    protected changeRadioLabelPostion(position: NGXSeasonRadioButtonLabelPosition): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-radiobtn-label-position', position);
    }

    protected listenInputValueChange(radio: HTMLInputElement): void {
        this.group?.writeValue(radio.value);
        this.valueChange.emit(radio.value);
    }

    private listenGroupDisabledChange(): void {
        this._ngZone.runOutsideAngular(() =>
            this.group?.disabled$.asObservable().subscribe(value =>
                this._ngZone.run(() => this.setupRadioDisabled(value))));
    }

}
