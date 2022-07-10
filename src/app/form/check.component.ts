import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter, forwardRef,
    HostBinding, Input, OnChanges,
    Output, Provider,
    Renderer2, SimpleChanges
} from "@angular/core";
import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

import {OCTOPUS_COLOR_PALETTES, OctopusColorPalette} from "../global/enums.utils";
import {animate, state, style, transition, trigger} from "@angular/animations";

let uniqueID: number = 0;

export type OctopusCheckLabelPosition = 'before' | 'after';

export const OCTOPUS_CHECK_BOX_CONTROL_VALUE_ACCESSOR: Provider =  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OctopusCheckBox),
    multi: true
}
export const OCTOPUS_CHECK_TOGGLE_CONTROL_VALUE_ACCESSOR: Provider =  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OctopusCheckToggle),
    multi: true
}

@Component({
    template: ''
})
abstract class OctopusAbstractCheck implements OnChanges, AfterViewInit {

    @Input('octoColor') color: OctopusColorPalette = 'base';
    @Input('octoID') id: string = '';
    @Input('octoLabelPos') position: OctopusCheckLabelPosition = 'after';

    @Input('octoChecked')
    get checked() { return this._checked; }
    set checked(_checked: any) {
        this._checked = coerceBooleanProperty(_checked);
        this.onChanged(this._checked);
        this.onTouched(this._checked);
    }
    private _checked: boolean = false;

    @Input('disabled')
    get disabled() { return this._disabled; }
    set disabled(_disabled: any) { this._disabled = coerceBooleanProperty(_disabled); }
    private _disabled: boolean = false;

    @Output('octoCheckedChange') checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @HostBinding('class') class: string = 'octo-check';

    protected onChanged = (_: any) => {};
    protected onTouched = (_: any) => {};

    constructor(
        protected _element: ElementRef,
        protected _render: Renderer2
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['color']) {
            this.renderColor(changes['color'].currentValue);
        }

        if (changes['disabled']) {
            this.renderDisabled(changes['disabled'].currentValue);
        }

        if (changes['position']) {
            this.renderPosition(changes['position'].currentValue);
        }
    }

    ngAfterViewInit() {
        this.renderColor(this.color);
        this.renderDisabled(this.disabled);
        this.renderPosition(this.position);
    }

    toggle(checked: boolean): void {
        this.checked = checked;
        this.checkedChange.emit(this.checked);
    }

    protected renderPosition(position: OctopusCheckLabelPosition): void {
        let task = setTimeout(() => {
            clearTimeout(task);

            if (position === 'before') {
                this._render.setStyle(this._element.nativeElement, 'flex-direction', 'row-reverse');
            }

            if (position === 'after') {
                this._render.setStyle(this._element.nativeElement, 'flex-direction', 'row');
            }
        });
    }

    protected abstract renderColor(color: OctopusColorPalette): void;
    protected abstract renderDisabled(disabled: boolean): void;

}

@Component({
    selector: 'octo-check-box',
    template: `
        <label class="octo-check-box-wrapper sx-25" [class.active]="checked || unknown" [attr.for]="id">
            <span class="octo-check-input">
                <octo-icon class="octo-check-mark" *ngIf="unknown">
                    indeterminate_check_box
                </octo-icon>
                <octo-icon class="octo-check-mark" *ngIf="!unknown">
                    {{checked ? 'check_box' : 'check_box_outline_blank'}}
                </octo-icon>
                <input type="checkbox" [checked]="checked" [attr.id]="id" [disabled]="disabled"
                       (change)="toggle(input.checked)" #input>
            </span>
            <span class="octo-check-label"><ng-content></ng-content></span>
        </label>
    `,
    providers: [OCTOPUS_CHECK_BOX_CONTROL_VALUE_ACCESSOR]
})
export class OctopusCheckBox extends OctopusAbstractCheck implements ControlValueAccessor {

    @Input('octoID') override id: string = `octopus-checkbox-id-${uniqueID++}`;

    @Input('octoUnknown')
    get unknown() { return this._unknown; }
    set unknown(_unknown: any) {
        this._unknown = coerceBooleanProperty(_unknown);
        this.unknownChange.emit(this._unknown);
    }
    private _unknown: boolean = false;

    @Output('octoUnknownChange') unknownChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    override ngAfterViewInit() {
        super.ngAfterViewInit();
        this._render.addClass(this._element.nativeElement, 'octo-check-box');
    }

    registerOnChange(fn: any): void {
        this.onChanged = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    writeValue(obj: any): void {
        this.checked = obj;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.renderDisabled(isDisabled);
    }

    protected override renderColor(color: OctopusColorPalette) {
        let task = setTimeout(() => {
            clearTimeout(task);
            OCTOPUS_COLOR_PALETTES.forEach(item =>
                this._render.removeClass(this._element.nativeElement, `octo-check-box-${item}`));
            this._render.addClass(this._element.nativeElement, `octo-check-box-${color}`);
        });
    }

    protected override renderDisabled(disabled: boolean): void {
        let task = setTimeout(() => {
            clearTimeout(task);

            if (disabled) {
                this._render.addClass(this._element.nativeElement, 'disabled');
            } else {
                this._render.removeClass(this._element.nativeElement, 'disabled');
            }
        });
    }

}

@Component({
    animations: [
        trigger('MOVE_LHS_RHS', [
            state('lhs', style({transform: 'translateX(0)'})),
            state('rhs', style({transform: 'translateX(100%)'})),
            transition('lhs <=> rhs', animate('250ms linear'))
        ])
    ],
    selector: 'octo-check-toggle',
    template: `
        <label class="octo-check-toggle-wrapper sx-50" [class.active]="checked" [attr.for]="id">
            <span class="octo-check-input">
                <span class="octo-check-ctrl">
                    <span class="octo-check-ctrl-mark" [octoShadow]="1" [@MOVE_LHS_RHS]="checked ? 'rhs' : 'lhs'"></span>
                </span>
                <input type="checkbox" [checked]="checked" [attr.id]="id" [disabled]="disabled"
                       (change)="toggle(input.checked)" #input>
            </span>
            <span class="octo-check-label"><ng-content></ng-content></span>
        </label>
    `,
    providers: [OCTOPUS_CHECK_TOGGLE_CONTROL_VALUE_ACCESSOR]
})
export class OctopusCheckToggle extends OctopusAbstractCheck implements ControlValueAccessor {

    @Input('octoColor') override color: OctopusColorPalette = 'primary';
    @Input('octoID') override id: string = `octopus-checkbox-id-${uniqueID++}`;

    override ngAfterViewInit() {
        super.ngAfterViewInit();
        this._render.addClass(this._element.nativeElement, 'octo-check-toggle');
    }

    registerOnChange(fn: any): void {
        this.onChanged = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    writeValue(obj: any): void {
        this.checked = obj;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.renderDisabled(isDisabled);
    }

    protected override renderColor(color: OctopusColorPalette) {
        let task = setTimeout(() => {
            clearTimeout(task);
            OCTOPUS_COLOR_PALETTES.forEach(item =>
                this._render.removeClass(this._element.nativeElement, `octo-check-toggle-${item}`));

            if (color !== 'base') {
                this._render.addClass(this._element.nativeElement, `octo-check-toggle-${color}`);
            }
        });
    }

    protected override renderDisabled(disabled: boolean): void {
        let task = setTimeout(() => {
            clearTimeout(task);

            if (disabled) {
                this._render.addClass(this._element.nativeElement, 'disabled');
            } else {
                this._render.removeClass(this._element.nativeElement, 'disabled');
            }
        });
    }

}
