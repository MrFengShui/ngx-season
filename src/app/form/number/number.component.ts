import { coerceNumberProperty } from "@angular/cdk/coercion";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, HostBinding, Input, Renderer2, ViewChild } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

import { AbstractOctopusInput } from "src/app/global/base.utils";
import { ColorPalette } from "src/app/global/enum.utils";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'octopus-number',
    template: `
        <div class="octopus-number-wrapper">
            <button octopus-icon-button [color]="color" (click)="decrement()">
                <octopus-icon>keyboard_arrow_left</octopus-icon>
            </button>
            <div class="octopus-input">
                <input type="number" [min]="minValue" [max]="maxValue" [step]="step" [value]="value" (keyup.enter)="input.blur()"
                    (change)="updateChange(input.value)" #input>
                <button octopus-icon-button (click)="clearInput()">
                    <octopus-icon size="16">clear</octopus-icon>
                </button>
            </div>
            <button octopus-icon-button [color]="color" (click)="increment()">
                <octopus-icon>keyboard_arrow_right</octopus-icon>
            </button>
        </div>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => OctopusNumber),
        multi: true
    }]
})
export class OctopusNumber extends AbstractOctopusInput {

    @Input('color') color: ColorPalette = 'primary';
    @Input('value') value: any = 0;

    @Input('maxValue')
    get maxValue(): any { return this._maxValue; }
    set maxValue(_maxValue: any) { this._maxValue = coerceNumberProperty(_maxValue); }
    private _maxValue: any = Number.POSITIVE_INFINITY;

    @Input('minValue')
    get minValue(): any { return this._minValue; }
    set minValue(_minValue: any) { this._minValue = coerceNumberProperty(_minValue); }
    private _minValue: any = Number.NEGATIVE_INFINITY;

    @Input('step')
    get step(): any { return this._step; }
    set step(_step: any) { this._step = coerceNumberProperty(_step); }
    private _step: any = 1;

    @ViewChild('input', { read: ElementRef, static: true })
    private input!: ElementRef<HTMLInputElement>;

    @HostBinding('class') class: string = 'octopus-number';

    constructor(
        protected _ref: ElementRef,
        protected _render: Renderer2
    ) {
        super(_ref);
    }

    clearInput(): void {
        this.input.nativeElement.value = '0';
        this.input.nativeElement.focus();
        this.updateChange(0);
    }

    increment(): void {
        this.input.nativeElement.stepUp();
        this.updateChange(this.input.nativeElement.value);
    }

    decrement(): void {
        this.input.nativeElement.stepDown();
        this.updateChange(this.input.nativeElement.value);
    }

    protected renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-number' : `octopus-${prevColor}-number`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-number`);
    }

}