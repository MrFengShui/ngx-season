import { coerceBooleanProperty, coerceNumberProperty } from "@angular/cdk/coercion";
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, forwardRef, HostBinding, Inject, Input, OnDestroy, Output, QueryList, Renderer2, SimpleChanges, ViewChild } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Observable, of, Subscription } from "rxjs";

import { AbstractOctopusButton, AbstractOctopusToggle } from "src/app/global/base.utils";
import { ColorPalette } from "src/app/global/enum.utils";

import { OctopusButtonGroup } from "../../components/button/button.component";

let groupID: number = 0;
let buttonID: number = 0;
let switchID: number = 0;

@Component({
    selector: 'octopus-toggle-button',
    template: `
        <label class="octopus-toggle-button-wrapper text-truncate" [class.checked]="input.checked" octopus-ripple 
            [for]="'octopus-toggle-button-' + (id$ | async)">
            <input type="radio" [id]="'octopus-toggle-button-' + (id$ | async)" [value]="value" [checked]="state$ | async" 
                (change)="updateChange(input.checked)" class="d-none" #input>
            <ng-content></ng-content>
        </label>
    `
})
export class OctopusToggleButton extends AbstractOctopusButton implements OnDestroy {

    @Input('color') color: ColorPalette = 'primary';
    @Input('value') value: any;

    @ViewChild('input', { read: ElementRef, static: true })
    private input!: ElementRef<HTMLInputElement>;

    @HostBinding('class') class: string = 'octopus-toggle-button';

    id$!: Observable<number>;
    state$!: Observable<boolean>;

    private subscription!: Subscription;

    constructor(
        protected _ref: ElementRef,
        protected _render: Renderer2,
        @Inject(forwardRef(() => OctopusToggleGroup))
        private _group: OctopusToggleGroup
    ) {
        super(_ref);
    }

    ngOnInit() {
        setTimeout(() => {
            super.ngOnInit();
            this.id$ = of(++buttonID);

            if (this._group.value !== undefined) {
                this.state$ = of(this.value == this._group.value);
            }
        })
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
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-toggle-button' : `octopus-${prevColor}-toggle-button`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-toggle-button`);
    }

}

@Component({
    selector: 'octopus-toggle-group',
    template: `<ng-content select="octopus-toggle-button"></ng-content>`,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => OctopusToggleGroup),
        multi: true
    }]
})
export class OctopusToggleGroup extends OctopusButtonGroup implements ControlValueAccessor, OnDestroy, AfterContentInit {

    @Input('color') color: ColorPalette = 'primary';
    @Input('value') value: any;

    @Output('valueChange') valueChange: EventEmitter<any> = new EventEmitter();

    @ContentChildren(OctopusToggleButton) toggles!: QueryList<OctopusToggleButton>;

    @HostBinding('class') class: string = 'octopus-toggle-group';

    private subscription!: Subscription;

    constructor(
        private _cdr: ChangeDetectorRef,
        protected _ref: ElementRef,
        protected _render: Renderer2
    ) {
        super(_ref, _render);
    }

    ngOnChanges(changes: SimpleChanges) {
        setTimeout(() => super.ngOnChanges(changes));

        if (changes.value !== undefined) {
            setTimeout(() => this.toggles.forEach(toggle =>
                toggle.state$ = of(toggle.value == changes.value.currentValue)));
        }
    }

    ngAfterContentInit() {
        let name: string = `octopus-toggle-group-${++groupID}`;
        this.toggles.forEach(toggle => toggle.createToggleGroup(name));
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
        this.toggles.forEach(toggle => toggle.state$ = of(toggle.value == value));
        this.value = value;
        this.valueChange.emit(value);

        if (this.onChange !== undefined) {
            this.onChange(value);
        }
    }

    protected renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this.toggles.forEach(toggle => toggle.color = currColor);
    }

}

@Component({
    selector: 'octopus-toggle-switch',
    template: `
        <label class="octopus-toggle-switch-wrapper" [for]="'octopus-toggle-switch-' + (id$ | async)">
            <input type="checkbox" [id]="'octopus-toggle-switch-' + (id$ | async)" [checked]="checked" (change)="updateChange(input.checked)" class="d-none" #input>
            <span class="octopus-toggle-switch-track">
                <span class="octopus-toggle-switch-thumb"></span>
            </span>
            <span class="octopus-toggle-switch-content" #content>
                <ng-content></ng-content>
            </span>
        </label>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => OctopusToggleSwitch),
        multi: true
    }]
})
export class OctopusToggleSwitch extends AbstractOctopusToggle implements AfterViewInit {

    @ViewChild('content', { read: ElementRef, static: true })
    private content!: ElementRef<HTMLElement>;

    @HostBinding('class') class: string = 'octopus-toggle-switch';

    constructor(
        protected _ref: ElementRef,
        protected _render: Renderer2
    ) {
        super(_ref, _render);
    }

    ngAfterViewInit() {
        this.id$ = of(++switchID);

        if (this.content.nativeElement.childElementCount === 0 && this.content.nativeElement.textContent?.length === 0) {
            this._render.setStyle(this._ref.nativeElement, 'width', 'fit-content');
        }
    }

    protected renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-toggle-switch' : `octopus-${prevColor}-toggle-switch`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-toggle-switch`)
    }

}