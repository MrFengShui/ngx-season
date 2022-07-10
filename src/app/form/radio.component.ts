import {
    AfterContentInit,
    AfterViewInit, ChangeDetectorRef,
    Component, ContentChildren,
    ElementRef,
    EventEmitter, forwardRef,
    HostBinding, Inject,
    Input,
    OnChanges,
    Output, Provider, QueryList,
    Renderer2,
    SimpleChanges, ViewChild
} from "@angular/core";
import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

import {OCTOPUS_COLOR_PALETTES, OctopusColorPalette} from "../global/enums.utils";

let groupID: number = 0;
let radioID: number = 0;

export type OctopusRadioLabelPosition = 'before' | 'after';

export const OCTOPUS_RADIO_BUTTON_CONTROL_VALUE_ACCESSOR: Provider =  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OctopusRadioButton),
    multi: true
}
export const OCTOPUS_RADIO_TOGGLE_CONTROL_VALUE_ACCESSOR: Provider =  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OctopusRadioToggle),
    multi: true
}

export class OctopusRadioChange {

    source!: OctopusRadioButton | OctopusRadioToggle | undefined;
    value!: any;

}

@Component({
    template: ''
})
abstract class OctopusAbstractRadio implements OnChanges, AfterViewInit {

    @Input('octoColor') color: OctopusColorPalette = 'base';
    @Input('octoID') id: string = '';
    @Input('octoName') name: string = '';
    @Input('octoValue') value: any;

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

    @HostBinding('class') class: string = 'octo-radio';

    protected onChanged = (_: any) => {};
    protected onTouched = (_: any) => {};

    constructor(
        protected _cdr: ChangeDetectorRef,
        protected _element: ElementRef,
        protected _render: Renderer2,
        @Inject(forwardRef(() => OctopusRadioGroup))
        public _group: OctopusRadioGroup
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['color']) {
            this.renderColor(changes['color'].currentValue);
        }

        if (changes['disabled']) {
            this.renderDisabled(changes['disabled'].currentValue);
        }
    }

    ngAfterViewInit() {
        this.assignGroupID(this.name);
        this.assignRadioID(this.id);
        this.renderColor(this.color);
        this.renderDisabled(this.disabled);
        this.updateRadioSelectedState();
    }

    createRadioValue(value: any): string {
        return window.btoa(JSON.stringify(value));
    }

    updateRadioSelectedState(): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            this.checked = this.createRadioValue(this.value) === this.createRadioValue(this._group.value);
            this._cdr.markForCheck();
        });
    }

    abstract assignRadioID(id: string): void;
    abstract assignGroupID(id: string): void;

    protected abstract renderColor(color: OctopusColorPalette): void;
    protected abstract renderDisabled(disabled: boolean): void;

}

@Component({
    selector: 'octo-radio-button',
    template: `
        <label class="octo-radio-button-wrapper sx-25" [class.active]="checked" #label>
            <span class="octo-radio-input">
                <octo-icon class="octo-radio-mark" *ngIf="checked">radio_button_checked</octo-icon>
                <octo-icon class="octo-radio-mark" *ngIf="!checked">radio_button_unchecked</octo-icon>
                <input type="radio" [checked]="checked" [disabled]="disabled" [attr.value]="createRadioValue(value)"
                       (change)="_group.changeRadioState(this)" #input>
            </span>
            <span class="octo-radio-label"><ng-content></ng-content></span>
        </label>
    `,
    providers: [OCTOPUS_RADIO_BUTTON_CONTROL_VALUE_ACCESSOR]
})
export class OctopusRadioButton extends OctopusAbstractRadio {

    @Input('octoLabelPos') position: OctopusRadioLabelPosition = 'after';

    @ViewChild('label', {read: ElementRef})
    private label!: ElementRef;

    @ViewChild('input', {read: ElementRef})
    private input!: ElementRef;

    override ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);

        if (changes['position']) {
            this.renderPosition(changes['position'].currentValue);
        }
    }

    assignRadioID(id: string): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            this._render.setAttribute(this.label.nativeElement, 'for', id);
            this._render.setAttribute(this.input.nativeElement, 'id', id);
        });
    }

    assignGroupID(id: string): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            this._render.setAttribute(this.input.nativeElement, 'name', id);
        });
    }

    override ngAfterViewInit() {
        super.ngAfterViewInit();
        this._render.addClass(this._element.nativeElement, 'octo-radio-button');
        this.renderPosition(this.position);
    }

    protected renderColor(color: OctopusColorPalette): void {
        let task =setTimeout(() => {
            clearTimeout(task);
            OCTOPUS_COLOR_PALETTES.forEach(item =>
                this._render.removeClass(this._element.nativeElement, `octo-radio-button-${item}`));
            this._render.addClass(this._element.nativeElement,`octo-radio-button-${this._group.color || color}`);
        });
    }

    protected renderDisabled(disabled: boolean): void {
        let task = setTimeout(() => {
            clearTimeout(task);

            if (disabled) {
                this._render.addClass(this._element.nativeElement, 'disabled');
            } else {
                this._render.removeClass(this._element.nativeElement, 'disabled');
            }
        });
    }

    private renderPosition(position: OctopusRadioLabelPosition): void {
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

}

@Component({
    selector: 'octo-radio-toggle',
    template: `
        <label class="octo-radio-toggle-wrapper" [class.active]="checked" #label>
            <input type="radio" [checked]="checked" [disabled]="disabled" [attr.value]="createRadioValue(value)"
                   (change)="_group.changeRadioState(this)" #input>
            <ng-content></ng-content>
        </label>
    `,
    providers: [OCTOPUS_RADIO_TOGGLE_CONTROL_VALUE_ACCESSOR]
})
export class OctopusRadioToggle<E=any> extends OctopusAbstractRadio {

    @ViewChild('label', {read: ElementRef})
    private label!: ElementRef;

    @ViewChild('input', {read: ElementRef})
    private input!: ElementRef;

    override ngAfterViewInit() {
        super.ngAfterViewInit();
        this._render.addClass(this._element.nativeElement, 'octo-radio-toggle');
    }

    assignRadioID(id: string): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            this._render.setAttribute(this.label.nativeElement, 'for', id);
            this._render.setAttribute(this.input.nativeElement, 'id', id);
        });
    }

    assignGroupID(id: string): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            this._render.setAttribute(this.input.nativeElement, 'name', id);
        });
    }

    protected renderColor(color: OctopusColorPalette): void {
        let task =setTimeout(() => {
            clearTimeout(task);
            OCTOPUS_COLOR_PALETTES.forEach(item =>
                this._render.removeClass(this._element.nativeElement, `octo-radio-toggle-${item}`));
            this._render.addClass(this._element.nativeElement,`octo-radio-toggle-${this._group.color || color}`);
        });
    }

    protected renderDisabled(disabled: boolean): void {
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
    selector: 'octo-radio-group',
    template: `<ng-content></ng-content>`,
    providers: [{provide: NG_VALUE_ACCESSOR, useExisting: OctopusRadioGroup, multi: true}]
})
export class OctopusRadioGroup implements AfterContentInit, ControlValueAccessor {

    @Input('octoColor') color: OctopusColorPalette = 'base';
    @Input('octoID') id: string = `octopus-radio-group-id-${groupID++}`;
    @Input('octoValue') value!: any;

    @Input('disabled')
    get disabled() { return this._disabled; }
    set disabled(_disabled: any) { this._disabled = coerceBooleanProperty(_disabled); }
    private _disabled: boolean = false;

    @Output('octoValueChange') change: EventEmitter<OctopusRadioChange> = new EventEmitter<OctopusRadioChange>();

    @ContentChildren(OctopusRadioButton) buttons!: QueryList<OctopusRadioButton>;
    @ContentChildren(OctopusRadioToggle) toggles!: QueryList<OctopusRadioToggle>;

    @HostBinding('class') class: string = 'octo-radio-group';

    protected onChanged = (_: any) => {};
    protected onTouched = (_: any) => {};

    constructor(private _render: Renderer2) {
    }

    ngAfterContentInit() {
        if (this.buttons) {
            this.buttons.forEach(button => {
                button.id = `octopus-radio-button-id-${radioID++}`;
                button.assignRadioID(button.id);
                button.assignGroupID(this.id);
            });
        }

        if (this.toggles) {
            this.toggles.forEach(toggle => {
                toggle.id = `octopus-radio-button-id-${radioID++}`;
                toggle.assignRadioID(`octopus-radio-toggle-id-${radioID++}`);
                toggle.assignGroupID(this.id);
            });
        }
    }

    changeRadioState(radio: OctopusRadioButton | OctopusRadioToggle | undefined): void {
        if (this.buttons) {
            this.buttons.forEach(button => button.checked = false);
        }

        if (this.toggles) {
            this.toggles.forEach(toggle => toggle.checked = false);
        }

        if (radio) {
            radio.checked = true;
            this.writeValue(radio.value);
            this.change.emit({source: radio, value: radio.value});
        }
    }

    registerOnChange(fn: any): void {
        this.onChanged = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    writeValue(obj: any): void {
        if (obj !== null) {
            this.value = obj;
            this.onChanged(this.value);
            this.onTouched(this.value);

            if (this.buttons) {
                this.buttons.forEach(button => button.updateRadioSelectedState());
            }

            if (this.toggles) {
                this.toggles.forEach(toggle => toggle.updateRadioSelectedState());
            }
        }
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

}
