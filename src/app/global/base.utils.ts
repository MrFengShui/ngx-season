import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
import { Observable, Subject } from "rxjs";

import { ColorPalette } from "./enum.utils";

@Component({
    selector: '',
    template: ''
})
export abstract class AbstractOctopusComponent implements OnChanges, OnInit {

    @Input('color') color: ColorPalette = 'base';

    constructor(protected _ref: ElementRef) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.color !== undefined) {
            setTimeout(() => this.renderColor(changes.color.previousValue, changes.color.currentValue));
        }
    }

    ngOnInit() {
        setTimeout(() => this.renderColor(undefined, this.color));
    }

    protected abstract renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void;

}

@Component({
    selector: '',
    template: ''
})
export abstract class AbstractOctopusButton extends AbstractOctopusComponent implements OnDestroy {

    @HostListener('click')
    protected listenHostClick() {
        let rect: DOMRect = this._ref.nativeElement.getBoundingClientRect();
        this.size$.next(Math.max(rect.width, rect.height));
    }

    size$: Subject<number> = new Subject();

    constructor(protected _ref: ElementRef) {
        super(_ref);
    }

    ngOnDestroy() {
        this.size$.complete();
    }

}

@Component({
    selector: '',
    template: ''
})
export abstract class AbstractOctopusInput extends AbstractOctopusComponent implements ControlValueAccessor {

    @Input('color') color: ColorPalette = 'primary';
    @Input('value') value: any;

    @Output('valueChange') valueChange: EventEmitter<any> = new EventEmitter();

    updateChange(value: any): void {
        this.value = value;
        this.valueChange.emit(value);

        if (this.onChange !== undefined) {
            this.onChange(value);
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

}

@Component({
    selector: '',
    template: ''
})
export abstract class AbstractOctopusToggle extends AbstractOctopusComponent implements ControlValueAccessor {

    @Input('color') color: ColorPalette = 'primary';

    @Input('checked')
    get checked(): any { return this._checked; }
    set checked(_checked: any) { this._checked = coerceBooleanProperty(_checked); }
    private _checked: any = false;

    @Input('position') position: 'before' | 'after' = 'after';

    @Output('checkedChange') checkedChange: EventEmitter<boolean> = new EventEmitter();

    id$!: Observable<number>;

    constructor(
        protected _ref: ElementRef,
        protected _render: Renderer2
    ) {
        super(_ref);
    }

    ngOnChanges(changes: SimpleChanges) {
        setTimeout(() => super.ngOnChanges(changes));

        if (changes.checked !== undefined) {
            setTimeout(() => this.updateChange(coerceBooleanProperty(changes.checked.currentValue)));
        }

        if (changes.position !== undefined) {
            setTimeout(() => this.renderPosition(changes.position.previousValue, changes.position.currentValue));
        }
    }

    ngOnInit() {
        setTimeout(() => {
            super.ngOnInit();
            this.updateChange(this.checked);
            this.renderPosition(undefined, this.position);
        });
    }

    updateChange(checked: boolean): void {
        this.checked = checked;
        this.checkedChange.emit(checked);

        if (this.onChange !== undefined) {
            this.onChange(checked);
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

    protected renderPosition(prevPos: 'before' | 'after' | undefined, currPos: 'before' | 'after'): void {
        this._render.removeClass(this._ref.nativeElement, prevPos === undefined ? 'after' : `${prevPos}`);
        this._render.addClass(this._ref.nativeElement, `${currPos}`);
    }

}