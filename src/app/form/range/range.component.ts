import { coerceBooleanProperty, coerceNumberProperty } from "@angular/cdk/coercion";
import { Component, HostBinding, ElementRef, Renderer2, Input, AfterViewInit, SimpleChanges, forwardRef, Output, EventEmitter } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import { AbstractOctopusComponent } from "src/app/global/base.utils";
import { ColorPalette } from "src/app/global/enum.utils";

@Component({
    selector: 'octopus-range',
    template: `
        <div class="octopus-range-wrapper">
            <input type="range" [min]="minValue" [max]="maxValue" [step]="step" [value]="value" (change)="updateChange(input.value)" #input>
            <div class="octopus-range-tick">
                <ng-container *ngFor="let item of ticks">
                    <span class="tick" *ngIf="tick"></span>
                </ng-container>
            </div>
        </div>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => OctopusRange),
        multi: true
    }]
})
export class OctopusRange extends AbstractOctopusComponent implements ControlValueAccessor, AfterViewInit {

    @Input('color') color: ColorPalette = 'primary';

    @Input('maxValue')
    get maxValue(): any { return this._maxValue; }
    set maxValue(_maxValue: any) { this._maxValue = coerceNumberProperty(_maxValue); }
    private _maxValue: any = 100;

    @Input('minValue')
    get minValue(): any { return this._minValue; }
    set minValue(_minValue: any) { this._minValue = coerceNumberProperty(_minValue); }
    private _minValue: any = 0;

    @Input('step')
    get step(): any { return this._step; }
    set step(_step: any) { this._step = coerceNumberProperty(_step); }
    private _step: any = 10;

    @Input('value')
    get value(): any { return this._value; }
    set value(_value: any) { this._value = coerceNumberProperty(_value); }
    private _value: any = 0;

    @Input('tick')
    get tick(): any { return this._tick; }
    set tick(_tick: any) { this._tick = coerceBooleanProperty(_tick); }
    private _tick: any = false;

    @Output('valueChange') valueChange: EventEmitter<number> = new EventEmitter();

    @HostBinding('class') class: string = 'octopus-range';

    ticks!: Array<any>;

    constructor(
        protected _ref: ElementRef,
        protected _render: Renderer2
    ) {
        super(_ref);
    }

    ngOnChanges(changes: SimpleChanges) {
        setTimeout(() => super.ngOnChanges(changes));

        if (changes.maxValue !== undefined) {
            this.updateTick(this.minValue, changes.maxValue.currentValue, this.step);
        }

        if (changes.minValue !== undefined) {
            this.updateTick(changes.minValue.currentValue, this.maxValue, this.step);
        }

        if (changes.minValue !== undefined) {
            this.updateTick(this.minValue, this.maxValue, changes.step.currentValue);
        }
    }

    ngAfterViewInit() {
        this.ticks = this.updateTick(this.minValue, this.maxValue, this.step);
    }

    writeValue(value: any): void {
        if (value !== null) {
            this.updateChange(value);
        }
    }

    registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void { }

    onChange!: (_: any) => void;
    onTouched!: () => void;

    updateChange(value: any): void {
        this.value = value;
        this.valueChange.emit(this.value);

        if (this.onChange !== undefined) {
            this.onChange(this.value);
        }
    }

    protected renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-range' : `octopus-${prevColor}-range`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-range`);
    }

    private updateTick(min: number, max: number, step: number): Array<any> {
        let size: number = Math.floor((max - min) / step) + 1;
        return new Array(Math.min(size, 21));
    }

}