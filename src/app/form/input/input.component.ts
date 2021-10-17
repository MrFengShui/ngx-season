import { AfterContentInit, Component, ContentChild, ContentChildren, Directive, ElementRef, forwardRef, HostBinding, Input, QueryList, Renderer2, SimpleChanges, TemplateRef, ViewChild } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

import { AbstractOctopusComponent, AbstractOctopusInput } from "src/app/global/base.utils";
import { ColorPalette } from "src/app/global/enum.utils";

type InputType = 'text' | 'password' | 'email' | 'search';

@Component({
    selector: 'octopus-input',
    template: `
        <input [type]="type" [placeholder]="placeholder" [value]="value === undefined ? '' : value" (keyup.enter)="input.blur()" 
            (change)="updateChange(input.value)" [class.focused]="input.value.length > 0" #input>
        <button octopus-icon-button (click)="clearInput()" *ngIf="input.value.length > 0" >
            <octopus-icon size="16">clear</octopus-icon>
        </button>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => OctopusInput),
        multi: true
    }]
})
export class OctopusInput extends AbstractOctopusInput {

    @Input('placeholder') placeholder: string = '';
    @Input('type') type: InputType = 'text';

    @ViewChild('input', { read: ElementRef, static: true })
    private input!: ElementRef<HTMLInputElement>;

    @HostBinding('class') class: string = 'octopus-input';

    constructor(
        protected _ref: ElementRef,
        protected _render: Renderer2
    ) {
        super(_ref);
    }

    clearInput(): void {
        this.input.nativeElement.value = '';
        this.input.nativeElement.focus();
        this.updateChange('');
    }

    protected renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-input' : `octopus-${prevColor}-input`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-input`);
    }

}

@Component({
    selector: 'octopus-input-phone',
    template: `
        <octopus-input [color]="color" [(value)]="areaCode" (valueChange)="updateChange($event + '-' + fstCode + '-' + sndCode)" #areaInput></octopus-input>
        <span class="octopus-input-delimit">
            <octopus-icon>horizontal_rule</octopus-icon>
        </span>
        <octopus-input [color]="color" [(value)]="fstCode" (valueChange)="updateChange(areaCode + '-' + $event + '-' + sndCode)" #fstInput></octopus-input>
        <span class="octopus-input-delimit">
            <octopus-icon>horizontal_rule</octopus-icon>
        </span>
        <octopus-input [color]="color" [(value)]="sndCode" (valueChange)="updateChange(areaCode + '-' + fstCode + '-' + $event)" #sndInput></octopus-input>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => OctopusInputPhone),
        multi: true
    }]
})
export class OctopusInputPhone extends AbstractOctopusInput {

    @Input('value') value: string = '';

    @ViewChild('areaInput', { read: OctopusInput })
    private areaInput!: OctopusInput;

    @ViewChild('fstInput', { read: OctopusInput })
    private fstInput!: OctopusInput;

    @ViewChild('sndInput', { read: OctopusInput })
    private sndInput!: OctopusInput;

    @HostBinding('class') class: string = 'octopus-input-phone';

    areaCode: string = '';
    fstCode: string = '';
    sndCode: string = '';

    constructor(
        protected _ref: ElementRef,
        protected _render: Renderer2
    ) {
        super(_ref);
    }

    ngOnChanges(changes: SimpleChanges) {
        setTimeout(() => super.ngOnChanges(changes));

        if (changes.value !== undefined) {
            setTimeout(() => this.parseValue(changes.value.currentValue));
        }
    }

    ngOnInit() {
        setTimeout(() => {
            super.ngOnInit();
            this.parseValue(this.value);
        });
    }

    writeValue(obj: any): void {
        if (this.parseValue(obj)) {
            super.writeValue(obj);
        }
    }

    clearInput(): void {
        this.areaInput.clearInput();
        this.fstInput.clearInput();
        this.sndInput.clearInput();
        this.updateChange('');
    }

    protected renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-input-phone' : `octopus-${prevColor}-input-phone`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-input-phone`);
    }

    private parseValue(value: string): boolean {
        let re: RegExp = new RegExp(/\d{3}-\d{3}-\d{4,5}/g);

        if (re.test(value) || value === '') {
            let array = value.match(/\d{3,5}/g);

            if (array) {
                this.areaCode = array[0];
                this.fstCode = array[1];
                this.sndCode = array[2];
            }
        } else {
            throw new Error('The value passed is not matched by format of "xxx-yyy-zzzz" or "xxx-yyy-zzzzz".');
        }

        return re.test(value);
    }

}

@Directive({
    selector: '[octopus-input-group-prefix]'
})
export class OctopusInputGroupPrefix {

    constructor(public _ref: TemplateRef<any>) { }

}

@Directive({
    selector: '[octopus-input-group-suffix]'
})
export class OctopusInputGroupSuffix {

    constructor(public _ref: TemplateRef<any>) { }

}

@Component({
    selector: 'octopus-input-group',
    template: `
        <div class="octopus-input-group-wrapper">
            <div class="octopus-input-group-prefix" *ngIf="prefixContent !== undefined">
                <ng-container [ngTemplateOutlet]="prefixContent"></ng-container>
            </div>
            <ng-content select="octopus-input, octopus-input-phone, octopus-select, octopus-date-picker, octopus-number"></ng-content>
            <div class="octopus-input-group-suffix" *ngIf="suffixContent !== undefined">
                <ng-container [ngTemplateOutlet]="suffixContent"></ng-container>
            </div>
        </div>
        <ng-content select="[octopus-input-group-prefix]"></ng-content>
        <ng-content select="[octopus-input-group-suffix]"></ng-content>
    `
})
export class OctopusInputGroup extends AbstractOctopusComponent implements AfterContentInit {

    @Input('color') color: ColorPalette = 'primary';

    @ContentChild(OctopusInputGroupPrefix)
    private prefix!: OctopusInputGroupPrefix;

    @ContentChild(OctopusInputGroupSuffix)
    private suffix!: OctopusInputGroupSuffix;

    @ContentChildren(OctopusInput) inputs!: QueryList<OctopusInput>;

    @HostBinding('class') class: string = 'octopus-input-group';

    prefixContent!: TemplateRef<any>;
    suffixContent!: TemplateRef<any>;

    constructor(
        protected _ref: ElementRef,
        protected _render: Renderer2
    ) {
        super(_ref);
    }

    ngAfterContentInit() {
        if (this.prefix !== undefined) {
            this.prefixContent = this.prefix._ref;
        }

        if (this.suffix !== undefined) {
            this.suffixContent = this.suffix._ref;
        }
    }

    protected renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-input-group' : `octopus-${prevColor}-input-group`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-input-group`);
        this.inputs.forEach(input => input.color = currColor);
    }

}