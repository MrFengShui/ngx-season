import {
    AfterContentInit,
    AfterViewInit,
    Component, ContentChild, ContentChildren, Directive,
    ElementRef, forwardRef,
    HostBinding, HostListener, Inject,
    Input,
    OnChanges, QueryList,
    Renderer2,
    SimpleChanges, ViewChild
} from "@angular/core";
import {OCTOPUS_COLOR_PALETTES, OctopusColorPalette} from "../global/enums.utils";
import {interval, map, Observable} from "rxjs";
import {OctopusComboBox} from "../combo/combo.component";

export type OctopusFormFieldMode = 'outline' | 'standard';
export type OctopusFormHintAlignment = 'left' | 'right';
export type OctopusFormHintType = 'normal' | 'success' | 'warning' | 'failure';

const OCTOPUS_FORM_FIELD_MODES: OctopusFormFieldMode[] = ['outline', 'standard'];

@Directive({
    selector: 'input[octo-input], input[octoInput], textarea[octo-input], textarea[octoInput]'
})
export class OctopusInput {

    @HostBinding('class') class: string = 'octo-input';

    @HostListener('focusin')
    protected focusin(): void {
        this._field.focused = true;
        this._field.focused = this._field.focused || this._element.nativeElement.value.trim().length > 0;
        this._field.labels.first.focus(this._field.focused);
    }

    @HostListener('focusout')
    protected focusout(): void {
        this._field.focused = false;
        this._field.focused = this._field.focused || this._element.nativeElement.value.trim().length > 0;
        this._field.labels.first.focus(this._field.focused);
    }

    constructor(
        protected _element: ElementRef,
        @Inject(forwardRef(() => OctopusFormField))
        protected _field: OctopusFormField
    ) {
    }

}

@Directive({
    selector: '[octo-form-prefix], [octoFormPrefix]'
})
export class OctopusFormPrefix {

    @HostBinding('class') class: string = 'octo-form-prefix';

}

@Directive({
    selector: '[octo-form-suffix], [octoFormSuffix]'
})
export class OctopusFormSuffix {

    @HostBinding('class') class: string = 'octo-form-suffix';

}

@Component({
    selector: 'octo-form-label',
    template: `<ng-content></ng-content>`
})
export class OctopusFormLabel {

    @HostBinding('class') class: string = 'octo-form-label';

    constructor(
        protected _element: ElementRef,
        protected _render: Renderer2
    ) {
    }

    focus(focused: boolean): void {
        let task = setTimeout(() => {
            clearTimeout(task);

            if (focused) {
                this._render.addClass(this._element.nativeElement, 'focused');
            } else {
                this._render.removeClass(this._element.nativeElement, 'focused');
            }
        });
    }

}

@Component({
    selector: 'octo-form-hint',
    template: `<ng-content></ng-content>`
})
export class OctopusFormHint implements OnChanges, AfterViewInit {

    @Input('octoAlign') align: OctopusFormHintAlignment = 'left';
    @Input('octoType') type: OctopusFormHintType = 'normal';

    @HostBinding('class') class: string = 'octo-form-hint';

    private HINT_TYPES: OctopusFormHintType[] = ['normal', 'success', 'warning', 'failure'];

    constructor(
        protected _element: ElementRef,
        protected _render: Renderer2
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['align']) {
            this.renderAlignment(changes['align'].currentValue);
        }

        if (changes['type']) {
            this.renderType(changes['type'].currentValue);
        }
    }

    ngAfterViewInit() {
        this.renderAlignment(this.align);
        this.renderType(this.type);
    }

    private renderAlignment(align: OctopusFormHintAlignment): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            this._render.setStyle(this._element.nativeElement, 'float', align);
        });
    }

    private renderType(type: OctopusFormHintType): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            this.HINT_TYPES.forEach(item =>
                this._render.removeClass(this._element.nativeElement, `octo-form-hint-${item}`));
            this._render.addClass(this._element.nativeElement, `octo-form-hint-${type}`);
        });
    }

}

@Component({
    selector: 'octo-form-field',
    template: `
        <div class="octo-form-field-wrapper" [class.focused]="focused" [style.height]="main$ | async">
            <div class="octo-form-field-bone">
                <div class="left">
                    <span #prefix><ng-content select="[octo-form-prefix], [octoFormPrefix]"></ng-content></span>
                </div>
                <div class="middle" [class.focused]="focused" *ngIf="labels.length <= 1">
                    <ng-content select="octo-form-label"></ng-content>
                </div>
                <div class="right">
                    <span #suffix><ng-content select="[octo-form-suffix], [octoFormSuffix]"></ng-content></span>
                </div>
            </div>
            <div class="octo-form-field-main" [style.margin-left]="prefix$ | async"
                 [style.margin-right]="suffix$ | async" #main><ng-content></ng-content></div>
        </div>
        <div class="octo-form-field-addon" [ngStyle]="{'height': hints.length === 0 ? '0.125rem' : '1rem'}">
            <ng-content select="octo-form-hint"></ng-content>
        </div>
    `
})
export class OctopusFormField implements OnChanges, AfterContentInit, AfterViewInit {

    @Input('octoColor') color: OctopusColorPalette = 'base';
    @Input('octoMode') mode: OctopusFormFieldMode = 'standard';

    @ContentChildren(OctopusFormLabel) labels!: QueryList<OctopusFormLabel>;
    @ContentChildren(OctopusFormHint) hints!: QueryList<OctopusFormHint>;

    @ContentChild(OctopusComboBox)
    private combo!: OctopusComboBox;

    @ViewChild('prefix', {read: ElementRef})
    private prefix!: ElementRef;

    @ViewChild('suffix', {read: ElementRef})
    private suffix!: ElementRef;

    @ViewChild('main', {read: ElementRef})
    private main!: ElementRef;

    @HostBinding('class') class: string = 'octo-form-field';

    prefix$: Observable<string> = interval(10).pipe(map(() =>
        this.prefix.nativeElement.clientWidth === 0 ? '0.5rem' : `${this.prefix.nativeElement.clientWidth}px`));
    suffix$: Observable<string> = interval(10).pipe(map(() =>
        this.suffix.nativeElement.clientWidth === 0 ? '0.5rem' : `${this.suffix.nativeElement.clientWidth}px`));
    main$: Observable<string> = interval(10).pipe(map(() =>
        `calc(${this.main.nativeElement.clientHeight}px + 1rem)`));

    focused: boolean = false;

    constructor(
        protected _element: ElementRef,
        protected _render: Renderer2
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['color']) {
            this.renderColor(changes['color'].currentValue);
        }

        if (changes['mode']) {
            this.renderColor(changes['mode'].currentValue);
        }
    }

    ngAfterContentInit() {
        if (this.labels && this.labels.length > 1) {
            throw new Error();
        }
    }

    ngAfterViewInit() {
        this.renderColor(this.color);
        this.renderMode(this.mode);
    }

    private renderColor(color: OctopusColorPalette): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            OCTOPUS_COLOR_PALETTES.forEach(item =>
                this._render.removeClass(this._element.nativeElement, `octo-form-field-${item}`));
            this._render.addClass(this._element.nativeElement, `octo-form-field-${color}`);
        });
    }

    private renderMode(mode: OctopusFormFieldMode): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            OCTOPUS_FORM_FIELD_MODES.forEach(item =>
                this._render.removeClass(this._element.nativeElement, `octo-form-field-${item}`));
            this._render.addClass(this._element.nativeElement, `octo-form-field-${mode}`);
        });
    }

}
