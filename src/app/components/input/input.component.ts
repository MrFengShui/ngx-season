import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { TemplatePortal } from "@angular/cdk/portal";
import { Component, OnChanges, AfterViewInit, Input, ElementRef, Renderer2, SimpleChanges, Directive, TemplateRef, ContentChild, ViewContainerRef, Output, EventEmitter, ViewChild } from "@angular/core";

export type NGXSeasonInputColor = 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'failure' | 'info';

@Directive({
    selector: '[ngx-sui-InputPrefix]'
})
export class NGXSeasonInputPrefixDirective {

    constructor(protected _template: TemplateRef<any>) {}

    fetchTemplate(): TemplateRef<any> {
        return this._template;
    }

}

@Directive({
    selector: '[ngx-sui-InputSuffix]'
})
export class NGXSeasonInputSuffixDirective {

    constructor(protected _template: TemplateRef<any>) {}

    fetchTemplate(): TemplateRef<any> {
        return this._template;
    }

}

@Component({
    selector: '',
    template: ''
})
export abstract class NGXSeasonInputComponent implements OnChanges, AfterViewInit {

    @Input('inputColor')
    set color(color: NGXSeasonInputColor) {
        this._color = color;
    }

    get color(): NGXSeasonInputColor {
        return this._color;
    }

    @Input('inputDisabled')
    set disabled(disabled: boolean | string | null) {
        this._disabled = coerceBooleanProperty(disabled);
    }

    get disabled(): boolean {
        return this._disabled;
    }

    @Input('inputLabel')
    set label(label: string | undefined | null) {
        this._label = label ? label : undefined;
    }

    get label(): string | undefined {
        return this._label;
    }

    @Input('inputPlaceholder')
    set placeholder(placeholder: string | undefined | null) {
        this._placeholder = placeholder ? placeholder : undefined;
    }

    get placeholder(): string | undefined {
        return this._placeholder;
    }

    @Input('inputPromptAlert')
    set promptAlertText(promptAlertText: string | undefined | null) {
        this._promptAlertText = promptAlertText ? promptAlertText : undefined;
    }

    get promptAlertText(): string | undefined {
        return this._promptAlertText;
    }

    @Input('inputPromptTip')
    set promptTipText(promptTipText: string | undefined | null) {
        this._promptTipText = promptTipText ? promptTipText : undefined;
    }

    get promptTipText(): string | undefined {
        return this._promptTipText;
    }

    @Input('inputShowLabel')
    set showLabel(showLabel: boolean | string | null) {
        this._showLabel = coerceBooleanProperty(showLabel);
    }

    get showLabel(): boolean {
        return this._showLabel;
    }

    @Input('inputShowClearBtn')
    set showClear(showClear: boolean | string | null) {
        this._showClear = coerceBooleanProperty(showClear);
    }

    get showClear(): boolean {
        return this._showClear;
    }

    @Input('inputShowPrefix')
    set showPrefix(showPrefix: boolean | string | null) {
        this._showPrefix = coerceBooleanProperty(showPrefix);
    }

    get showPrefix(): boolean {
        return this._showPrefix;
    }

    @Input('inputShowSuffix')
    set showSuffix(showSuffix: boolean | string | null) {
        this._showSuffix = coerceBooleanProperty(showSuffix);
    }

    get showSuffix(): boolean {
        return this._showSuffix;
    }

    @Input('inputText')
    set text(text: string | undefined | null) {
        this._text = text ? text : '';
    }

    get text(): string | undefined {
        return this._text;
    }

    private _color: NGXSeasonInputColor = 'default';
    private _disabled: boolean = false;
    private _label: string | undefined;
    private _placeholder: string | undefined;
    private _promptAlertText: string | undefined;
    private _promptTipText: string | undefined;
    private _showLabel: boolean = true;
    private _showClear: boolean = false;
    private _showPrefix: boolean = false;
    private _showSuffix: boolean = false;
    private _text: string | undefined;

    @Output('inputTextChange')
    textChange: EventEmitter<string> = new EventEmitter(true);
    
    @ContentChild(NGXSeasonInputPrefixDirective)
    protected prefixTemplate: NGXSeasonInputPrefixDirective | undefined;

    @ContentChild(NGXSeasonInputSuffixDirective)
    protected suffixTemplate: NGXSeasonInputSuffixDirective | undefined;

    @ViewChild('field', { read: ElementRef, static: true })
    protected field: ElementRef<HTMLInputElement> | undefined;

    protected prefixPortal: TemplatePortal | undefined;
    protected suffixPortal: TemplatePortal | undefined;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _vcr: ViewContainerRef
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'color') this.changeInputColor(changes[name].currentValue as NGXSeasonInputColor);
        }
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'input');
        this.changeInputColor(this.color);
    }

    clearText(): void {
        if (this.field) this._renderer.setProperty(this.field.nativeElement, 'value', null);
    }

    protected changeInputColor(color: NGXSeasonInputColor): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-input-color', color);
    }

}
