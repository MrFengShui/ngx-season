import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { Component, OnChanges, OnDestroy, AfterViewInit, Input, Output, EventEmitter, ElementRef, Renderer2, SimpleChanges, OnInit, NgZone } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Component({
    selector: '',
    template: ''
})
export abstract class NGXSeasonRadioGroupComponent implements OnChanges, OnInit, OnDestroy, AfterViewInit {

    @Input('rgDisabled')
    set disabled(disabled: boolean | string | null) {
        this._disabled = coerceBooleanProperty(disabled);
    }

    get disabled(): boolean {
        return this._disabled;
    }

    @Input('rgName')
    set name(name: string | undefined | null) {
        this._name = name ? name : undefined;
    }

    get name(): string | undefined {
        return this._name;
    }

    @Input('rgSelectedValue')
    set selectedValue(selectedValue: any) {
        this._selectedValue = selectedValue;
    }

    get selectedValue(): any {
        return this._selectedValue;
    }

    private _disabled: boolean = false;
    private _name: string | undefined;
    private _selectedValue: any;

    @Output('rgSelectedValueChange')
    selectedValueChange: EventEmitter<any> = new EventEmitter(true);

    disabled$: Subject<boolean> = new BehaviorSubject(this.disabled);

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'disabled') this.disabled$.next(coerceBooleanProperty(changes[name].currentValue));
        }
    }

    ngOnInit(): void {
        this.selectedValueChange.emit(this.selectedValue);
    }

    ngOnDestroy(): void {
        this.disabled$.complete();
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'radio-group');
    }

}

@Component({
    selector: '',
    template: ''
})
export abstract class NGXSeasonRadioComponent implements OnChanges, AfterViewInit {

    @Input('radioDisabled')
    set disabled(disabled: boolean | string | undefined | null) {
        this._disabled = coerceBooleanProperty(disabled);
    }

    get disabled(): boolean {
        return this._disabled;
    }

    @Input('radioName')
    set name(name: string | undefined | null) {
        this._name = name ? name : undefined;
    }

    get name(): string | undefined {
        return this._name;
    }

    @Input('radioSelected')
    set selected(selected: boolean | string | undefined | null) {
        this._selected = coerceBooleanProperty(selected);
    }

    get selected(): boolean {
        return this._selected;
    }

    @Input('radioValue')
    set value(value: any) {
        this._value = value;
    }

    get value(): any {
        return this._value;
    }

    private _disabled: boolean = false;
    private _name: string | undefined;
    private _selected: boolean = false;
    private _value: any;

    @Output('radioValueChange')
    valueChange: EventEmitter<any> = new EventEmitter(true);

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _ngZone: NgZone
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'disabled') this.setupRadioDisabled(coerceBooleanProperty(changes[name].currentValue));
        }
    }

    ngAfterViewInit(): void {
        this.initialize();
        this.setupRadioDisabled(this.disabled);
    }

    protected abstract initialize(): void;

    protected abstract setupRadioDisabled(disabled: boolean): void;

}
