import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { Component, OnDestroy, Input, ViewChild, ElementRef, HostBinding, Renderer2, Inject, forwardRef, AfterContentInit, Output, ContentChildren, QueryList, ChangeDetectorRef, SimpleChanges, EventEmitter } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { Observable, Subscription, of } from "rxjs";

import { AbstractOctopusButton, AbstractOctopusComponent } from "src/app/global/base.utils";
import { ColorPalette } from "src/app/global/enum.utils";

let groupID: number = 0;
let buttonID: number = 0;

@Component({
    selector: 'octopus-radio-button',
    template: `
        <label class="octopus-radio-button-wrapper text-truncate" [for]="'octopus-radio-button-' + (id$ | async)">
            <input type="radio" [id]="'octopus-radio-button-' + (id$ | async)" [value]="value" [checked]="state$ | async" 
                (change)="updateChange(input.checked)" class="d-none" #input>
            <span class="material-icons" [class.active]="input.checked">{{input.checked ? 'radio_button_checked' : 'radio_button_unchecked'}}</span>
            <span class="octopus-radio-button-content" #content>
                <ng-content></ng-content>
            </span>
        </label>
    `
})
export class OctopusRadioButton extends AbstractOctopusButton implements OnDestroy {

    @Input('color') color: ColorPalette = 'primary';
    @Input('position') position: 'before' | 'after' = 'after';
    @Input('value') value: any;

    @ViewChild('input', { read: ElementRef, static: true })
    private input!: ElementRef<HTMLInputElement>;

    @ViewChild('content', { read: ElementRef, static: true })
    private content!: ElementRef<HTMLElement>;

    @HostBinding('class') class: string = 'octopus-radio-button';

    id$!: Observable<number>;
    state$!: Observable<boolean>;

    private subscription!: Subscription;

    constructor(
        protected _ref: ElementRef,
        protected _render: Renderer2,
        @Inject(forwardRef(() => OctopusRadioGroup))
        private _group: OctopusRadioGroup
    ) {
        super(_ref);
    }

    ngOnChanges(changes: SimpleChanges) {
        setTimeout(() => super.ngOnChanges(changes));

        if (changes.position !== undefined) {
            setTimeout(() => this.renderPosition(changes.position.previousValue, changes.position.currentValue));
        }
    }

    ngOnInit() {
        setTimeout(() => {
            super.ngOnInit();
            this.renderPosition(undefined, this.position);
        })
    }

    ngAfterViewInit() {
        this.id$ = of(++buttonID);

        if (this._group.value !== undefined) {
            this.state$ = of(this.value == this._group.value);
        }

        if (this.content.nativeElement.childElementCount === 0 && this.content.nativeElement.textContent?.length === 0) {
            this._render.setStyle(this._ref.nativeElement, 'width', 'fit-content');
        }
    }

    ngOnDestroy() {
        if (this.subscription !== undefined && !this.subscription.closed) {
            this.subscription.unsubscribe();
        }
    }

    createToggleGroup(name: string): void {
        this._render.setAttribute(this.input.nativeElement, 'name', name);
    }

    updateChange(checked: boolean): void {
        if (checked) {
            this._group.updateChange(this.value);
        }
    }

    protected renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-radio-button' : `octopus-${prevColor}-radio-button`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-radio-button`);
    }

    protected renderPosition(prevPos: 'before' | 'after' | undefined, currPos: 'before' | 'after'): void {
        this._render.removeClass(this._ref.nativeElement, prevPos === undefined ? 'after' : `${prevPos}`);
        this._render.addClass(this._ref.nativeElement, `${currPos}`);
    }

}

@Component({
    selector: 'octopus-radio-group',
    template: `<ng-content select="octopus-radio-button"></ng-content>`,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => OctopusRadioGroup),
        multi: true
    }]
})
export class OctopusRadioGroup extends AbstractOctopusComponent implements ControlValueAccessor, OnDestroy, AfterContentInit {

    @Input('color') color: ColorPalette = 'primary';
    @Input('value') value: any;

    @Output('valueChange') valueChange: EventEmitter<any> = new EventEmitter();

    @ContentChildren(OctopusRadioButton) radios!: QueryList<OctopusRadioButton>;

    @HostBinding('class') class: string = 'octopus-radio-group';

    private subscription!: Subscription;

    constructor(
        protected _ref: ElementRef,
        protected _render: Renderer2
    ) {
        super(_ref);
    }

    ngOnChanges(changes: SimpleChanges) {
        setTimeout(() => super.ngOnChanges(changes));

        if (changes.value !== undefined) {
            setTimeout(() => this.radios.forEach(radio =>
                radio.state$ = of(radio.value == changes.value.currentValue)));
        }
    }

    ngAfterContentInit() {
        let name: string = `octopus-radio-group-${++groupID}`;
        this.radios.forEach(radio => radio.createToggleGroup(name));
    }

    ngOnDestroy() {
        if (this.subscription !== undefined && !this.subscription.closed) {
            this.subscription.unsubscribe();
        }
    }

    writeValue(obj: any): void {
        if (obj !== null) {
            this.updateChange(obj);
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void { }

    onChange!: (_: any) => void;
    onTouched!: () => void;

    updateChange(value: any): void {
        this.radios.forEach(radio => radio.state$ = of(radio.value == value));
        this.value = value;
        this.valueChange.emit(value);

        if (this.onChange !== undefined) {
            this.onChange(value);
        }
    }

    protected renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this.radios.forEach(radio => radio.color = currColor);
    }

}