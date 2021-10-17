import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { AfterContentInit, Component, ContentChild, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChanges, TemplateRef, ViewChild } from "@angular/core";
import { Subject } from "rxjs";

import { AbstractOctopusComponent } from "src/app/global/base.utils";
import { ColorPalette, OctopusFieldAppearance, OctopusValidationState } from "src/app/global/enum.utils";

@Component({
    selector: 'label[octopus-form-label]',
    template: `
        <span class="material-icons" *ngIf="required">ac_unit</span>
        <span><ng-content></ng-content></span>
        <span class="material-icons" *ngIf="state !== 'hint'" #stateMark>{{updateStateMark(state)}}</span>
    `
})
export class OcotpusFormLabel implements OnChanges, OnInit {

    @Input('required')
    get required(): any { return this._required; }
    set required(_required: any) { this._required = coerceBooleanProperty(_required); }
    private _required: any = false;

    @Input('state') state: OctopusValidationState = 'hint';

    @ViewChild('stateMark', { read: ElementRef, static: true })
    private stateMark!: ElementRef<HTMLElement>;

    @HostBinding('class') class: string = 'octopus-form-label';

    constructor(private _render: Renderer2) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.state !== undefined) {
            setTimeout(() => this.renderStateMark(changes.state.previousValue, changes.state.currentValue));
        }
    }

    ngOnInit() {
        setTimeout(() => this.renderStateMark(undefined, this.state));
    }

    updateStateMark(state: OctopusValidationState): string {
        switch (state) {
            case 'success': return 'verified';
            case 'warning': return 'warning';
            case 'error': return 'report';
            default: return '';
        }
    }

    private renderStateMark(prevState: OctopusValidationState | undefined, currState: OctopusValidationState): void {
        if (this.stateMark !== undefined) {
            this._render.removeClass(this.stateMark.nativeElement, prevState === undefined ? 'octopus-hint-form-label' : `octopus-${prevState}-form-label`);
            this._render.addClass(this.stateMark.nativeElement, `octopus-${currState}-form-label`);
        }
    }

}

@Component({
    selector: 'octopus-form-tip',
    template: `<ng-content></ng-content>`
})
export class OcotpusFormTip implements OnChanges, OnInit {

    @Input('state') state: OctopusValidationState = 'hint';

    @HostBinding('class') class: string = 'octopus-form-tip';

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.state !== undefined) {
            setTimeout(() => this.renderState(changes.state.previousValue, changes.state.currentValue));
        }
    }

    ngOnInit() {
        setTimeout(() => this.renderState(undefined, this.state));
    }

    private renderState(prevState: OctopusValidationState | undefined, currState: OctopusValidationState): void {
        this._render.removeClass(this._ref.nativeElement, prevState === undefined ? 'octopus-hint-form-tip' : `octopus-${prevState}-form-tip`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currState}-form-tip`);
    }

}

@Component({
    selector: 'octopus-form-field',
    template: `
        <div class="octopus-form-field-wrapper">
            <div class="octopus-form-field-frame">
                <div class="frame-left"></div>
                <div class="frame-center">
                    <ng-content select="label[octopus-form-label]"></ng-content>
                </div>
                <div class="frame-right"></div>
            </div>
            <div class="octopus-form-field-input">
                <ng-content select="octopus-input, octopus-input-group, octopus-select, octopus-input-phone, octopus-date-picker, octopus-number"></ng-content>
            </div>
        </div>
        <div class="octopus-form-field-tip">
            <ng-content select="octopus-form-tip"></ng-content>
        </div>
    `
})
export class OctopusFormField extends AbstractOctopusComponent {

    @Input('active')
    get active(): any { return this._active; }
    set active(_active: any) { this._active = coerceBooleanProperty(_active); }
    private _active: any = false;

    @Input('appearance') appearance: OctopusFieldAppearance = 'standard';
    @Input('color') color: ColorPalette = 'primary';
    @Input('state') validState: string = '';

    @ContentChild(OcotpusFormTip) tip!: OcotpusFormTip;

    @HostBinding('class') class: string = 'octopus-form-field';

    state$: Subject<boolean> = new Subject();

    constructor(
        protected _ref: ElementRef,
        protected _render: Renderer2
    ) {
        super(_ref);
    }

    ngOnChanges(changes: SimpleChanges) {
        setTimeout(() => super.ngOnChanges(changes));

        if (changes.appearance !== undefined) {
            setTimeout(() => this.renderAppearance(changes.appearance.previousValue, changes.appearance.currentValue));
        }

        if (changes.active !== undefined) {
            setTimeout(() => this.renderActive(coerceBooleanProperty(changes.active.currentValue)));
        }
    }

    ngOnInit() {
        setTimeout(() => {
            super.ngOnInit();
            this.renderAppearance(undefined, this.appearance);
            this.renderActive(this.active);
        });
    }

    protected renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-form-field' : `octopus-${prevColor}-form-field`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-form-field`);
    }

    private renderAppearance(prevAppear: OctopusFieldAppearance | undefined, currAppear: OctopusFieldAppearance): void {
        this._render.removeClass(this._ref.nativeElement, prevAppear === undefined ? 'octopus-standard-form-field' : `octopus-${prevAppear}-form-field`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currAppear}-form-field`);
    }

    private renderActive(active: boolean): void {
        if (active) {
            this._render.addClass(this._ref.nativeElement, 'active');
        } else {
            this._render.removeClass(this._ref.nativeElement, 'active');
        }
    }

}
