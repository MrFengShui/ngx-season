import { coerceBooleanProperty, coerceCssPixelValue, coerceNumberProperty } from "@angular/cdk/coercion";
import { TemplatePortal } from "@angular/cdk/portal";
import { Component, OnChanges, AfterViewInit, Input, ElementRef, Renderer2, SimpleChanges, Directive, TemplateRef, ContentChild, ViewContainerRef, Output, EventEmitter, ViewChild, NgZone, OnDestroy, RendererStyleFlags2 } from "@angular/core";
import { BehaviorSubject, Subject, Subscription } from "rxjs";

import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";

@Directive({
    selector: '[ngx-sui-InputPrefix]'
})
export class NGXSeasonInputPrefixDirective {

    constructor(protected _template: TemplateRef<unknown>) {}

    fetchTemplate(): TemplateRef<unknown> {
        return this._template;
    }

}

@Directive({
    selector: '[ngx-sui-InputSuffix]'
})
export class NGXSeasonInputSuffixDirective {

    constructor(protected _template: TemplateRef<unknown>) {}

    fetchTemplate(): TemplateRef<unknown> {
        return this._template;
    }

}

@Component({
    selector: '',
    template: ''
})
export abstract class NGXSeasonBaseInputComponent implements OnChanges, OnDestroy, AfterViewInit {

    @Input({ alias: 'inputColor' })
    set color(color: NGXSeasonColorPalette | undefined | null) {
        this._color = color || 'default';
    }

    get color(): NGXSeasonColorPalette {
        return this._color;
    }

    @Input({ alias: 'inputDisabled' })
    set disabled(disabled: boolean | string | undefined | null) {
        this._disabled = coerceBooleanProperty(disabled);
    }

    get disabled(): boolean {
        return this._disabled;
    }

    @Input({ alias: 'inputDuration' })
    set duration(duration: number | string | undefined | null) {
        this._duration = coerceNumberProperty(duration);
    }

    get duration(): number {
        return this._duration;
    }

    @Input({ alias: 'inputLabel' })
    set label(label: string | undefined | null) {
        this._label = label || undefined;
    }

    get label(): string | undefined {
        return this._label;
    }

    @Input({ alias: 'inputPlaceholder' })
    set placeholder(placeholder: string | undefined | null) {
        this._placeholder = placeholder || undefined;
    }

    get placeholder(): string | undefined {
        return this._placeholder;
    }

    @Input({ alias: 'inputPromptMsg' })
    set promptMsg(promptMsg: string | undefined | null) {
        this._promptMsg = promptMsg || undefined;
    }

    get promptMsg(): string | undefined {
        return this._promptMsg;
    }

    @Input({ alias: 'inputPromptTip' })
    set promptTip(promptTip: string | undefined | null) {
        this._promptTip = promptTip || undefined;
    }

    get promptTip(): string | undefined {
        return this._promptTip;
    }

    @Input({ alias: 'inputShowClear' })
    set showClear(showClear: boolean | string | null) {
        this._showClear = coerceBooleanProperty(showClear);
    }

    get showClear(): boolean {
        return this._showClear;
    }

    @Input({ alias: 'inputShowLabel' })
    set showLabel(showLabel: boolean | string | null) {
        this._showLabel = coerceBooleanProperty(showLabel);
    }

    get showLabel(): boolean {
        return this._showLabel;
    }

    @Input({ alias: 'inputShowPrompt' })
    set showPrompt(showPrompt: boolean | string | undefined | null) {
        this._showPrompt = coerceBooleanProperty(showPrompt);
    }

    get showPrompt(): boolean {
        return this._showPrompt;
    }

    @Input({ alias: 'inputText' })
    set text(text: string | undefined | null) {
        this._text = text || undefined;
    }

    get text(): string | undefined {
        return this._text;
    }

    private _color: NGXSeasonColorPalette = 'default';
    private _disabled: boolean = false;
    private _duration: number = 250;
    private _label: string | undefined;
    private _placeholder: string | undefined;
    private _promptMsg: string | undefined;
    private _promptTip: string | undefined;
    private _showClear: boolean = false;
    private _showLabel: boolean = true;
    private _showPrompt: boolean = false;
    private _text: string | undefined;

    @Output('inputTextChange')
    textChange: EventEmitter<string> = new EventEmitter(true);

    @ContentChild(NGXSeasonInputPrefixDirective)
    protected prefixTemplate: NGXSeasonInputPrefixDirective | undefined;

    @ContentChild(NGXSeasonInputSuffixDirective)
    protected suffixTemplate: NGXSeasonInputSuffixDirective | undefined;

    @ViewChild('inputLabel', { read: ElementRef, static: false })
    protected inputLabel: ElementRef<HTMLElement> | undefined;

    @ViewChild('inputField', { read: ElementRef, static: false })
    protected inputField: ElementRef<HTMLInputElement> | undefined;

    protected onChange = (text: string | undefined) => this.textChange.emit(text);
    protected onTouched = () => {};

    protected prefixPortal: TemplatePortal | undefined;
    protected suffixPortal: TemplatePortal | undefined;

    protected floatChange$: Subject<boolean> = new BehaviorSubject(false);
    protected inputChange$: Subject<string> = new BehaviorSubject(this.text || '');

    protected float$: Subscription = Subscription.EMPTY;
    protected input$: Subscription = Subscription.EMPTY;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _vcr: ViewContainerRef,
        protected _ngZone: NgZone
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'color') this.changeInputColor(changes[name].currentValue as NGXSeasonColorPalette);

            if (name === 'duration') this.setupInputDuration(coerceNumberProperty(changes[name].currentValue));
        }
    }

    ngOnDestroy(): void {
        this.float$.unsubscribe();
        this.input$.unsubscribe();

        this.floatChange$.complete();
        this.inputChange$.complete();
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'input');

        this.changeInputColor(this.color);
        this.setupInputDuration(this.duration);
        this.listenInputLabelFloatChange();
        this.listenInputTextChange();
    }

    protected changeInputColor(color: NGXSeasonColorPalette): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-input-color', color);
    }

    protected setupInputDuration(duration: number): void {
        this._renderer.setStyle(this._element.nativeElement, '--input-duration', `${duration}ms`, RendererStyleFlags2.DashCase);
    }

    protected isInputValueEmpty(): boolean {
        return this.inputField?.nativeElement.value.length === 0;
    }

    protected abstract listenInputTextChange(): void;

    private listenInputLabelFloatChange(): void {
        this._ngZone.runOutsideAngular(() =>
            this.float$ = this.floatChange$.asObservable()
                .subscribe(value =>
                    Promise.resolve().then(() => {
                        const element = this._element.nativeElement;
                        const offset: number = coerceNumberProperty(this.inputField?.nativeElement?.offsetLeft);

                        if (value) {
                            this._renderer.addClass(element, 'input-label-float');
                            this._renderer.setStyle(this.inputLabel?.nativeElement, 'left', 'var(--input-field-padding)');
                        } else {
                            this._renderer.removeClass(element, 'input-label-float');
                            this._renderer.setStyle(this.inputLabel?.nativeElement, 'left', coerceCssPixelValue(offset));
                        }
                    })));
    }

}
