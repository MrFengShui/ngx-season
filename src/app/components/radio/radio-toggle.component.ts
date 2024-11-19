import { Component, ElementRef, forwardRef, Inject, InjectionToken, Input, NgZone, Provider, Renderer2, SimpleChanges } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import { NGXSeasonRadioComponent, NGXSeasonRadioGroupComponent } from "./radio.component";

import { NGXSeasonColorPalette } from "src/app/utils/_palette.utils";

export const NGX_SEASON_RADIO_TOGGLE_GROUP_TOKEN: InjectionToken<NGXSeasonRadioToggleGroupComponent> = new InjectionToken('NGX_SEASON_RADIO_TOGGLE_GROUP_TOKEN');

const NGXSeasonRadioToggleValueAccessor: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NGXSeasonRadioToggleGroupComponent),
    multi: true
};

let count: number = 0;

@Component({
    selector: 'ngx-sui-radio-toggle-group',
    template: `<ng-content select="label[ngx-sui-RadioToggle]"></ng-content>`,
    providers: [
        NGXSeasonRadioToggleValueAccessor,
        { provide: NGX_SEASON_RADIO_TOGGLE_GROUP_TOKEN, useExisting: NGXSeasonRadioToggleGroupComponent }
    ]
})
export class NGXSeasonRadioToggleGroupComponent extends NGXSeasonRadioGroupComponent implements ControlValueAccessor {

    @Input('tgColor')
    set color(color: NGXSeasonColorPalette | null) {
        this._color = color ? color : 'default';
    }

    get color(): NGXSeasonColorPalette {
        return this._color;
    }

    private _color: NGXSeasonColorPalette = 'default';

    readonly id: string = `ngx-sui-radio-toggle-group-${count++}`;

    protected onChange = (value: any) => this.selectedValueChange.emit(value);
    protected onTouch = () => {};

    override ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        for (const name in changes) {
            if (name === 'color') this.changeToggleGroupColor(changes[name].currentValue as NGXSeasonColorPalette);
        }
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.addClass(this._element.nativeElement, 'radio-toggle-group');

        this.changeToggleGroupColor(this.color);
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

    protected changeToggleGroupColor(color: NGXSeasonColorPalette): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-radio-toggle-group-color', color);
    }

}

@Component({
    selector: 'label[ngx-sui-RadioToggle]',
    template: `
        <input type="radio" [checked]="_rtg.selectedValue === value" [name]="_rtg.name" [value]="value" [disabled]="_rtg.disabled || disabled"  (change)="_rtg.writeValue(radio.value)" #radio/>
        <div class="radio-toggle-wrapper"><ng-content></ng-content></div>
    `
})
export class NGXSeasonRadioToggleComponent extends NGXSeasonRadioComponent {

    constructor(
        protected override _element: ElementRef,
        protected override _renderer: Renderer2,
        protected override _ngZone: NgZone,

        @Inject(NGX_SEASON_RADIO_TOGGLE_GROUP_TOKEN)
        protected _rtg: NGXSeasonRadioToggleGroupComponent
    ) {
        super(_element, _renderer, _ngZone);
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this.listenGroupDisabledChange();
    }

    protected override initialize(): void {
        this._renderer.addClass(this._element.nativeElement, 'radio-toggle');
    }

    protected override setupRadioDisabled(disabled: boolean): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-radio-toggle-usable', disabled ? 'disable' : 'enable');
    }

    private listenGroupDisabledChange(): void {
        this._ngZone.runOutsideAngular(() =>
            this._rtg?.disabled$.asObservable().subscribe(value =>
                this._ngZone.run(() => this.setupRadioDisabled(value))));
    }

}
