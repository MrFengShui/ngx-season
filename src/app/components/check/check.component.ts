import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { Component, OnChanges, OnDestroy, AfterViewInit, Input, Output, EventEmitter, ElementRef, Renderer2, SimpleChanges } from "@angular/core";

export type NGXSeasonCheckColor = 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'failure' | 'info';
export type NGXSeasonCheckLabelPosition = 'after' | 'before';

@Component({
    selector: '',
    template: ''
})
export abstract class NGXSeasonCheckComponent implements OnChanges, OnDestroy, AfterViewInit {

    @Input('checkColor')
    set color(color: NGXSeasonCheckColor) {
        this._color = color;
    }

    get color(): NGXSeasonCheckColor {
        return this._color;
    }

    @Input('checkChecked')
    set checked(checked: boolean | string | undefined | null) {
        this._checked = coerceBooleanProperty(checked);
    }

    get checked(): boolean {
        return this._checked;
    }

    @Input('checkDisabled')
    set disabled(disabled: boolean | string | undefined | null) {
        this._disabled = coerceBooleanProperty(disabled);
    }

    get disabled(): boolean {
        return this._disabled;
    }

    @Input('checkLabelPos')
    set position(position: NGXSeasonCheckLabelPosition) {
        this._position = position;
    }

    get position(): NGXSeasonCheckLabelPosition {
        return this._position;
    }

    private _color: NGXSeasonCheckColor = 'default';
    private _checked: boolean = false;
    private _disabled: boolean = false;
    private _position: NGXSeasonCheckLabelPosition = 'after';

    @Output('checkCheckedChange')
    checkedChange: EventEmitter<boolean> = new EventEmitter(true);

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'color') this.changeCheckColor(changes[name].currentValue as NGXSeasonCheckColor);

            if (name === 'disabled') this.setupCheckDisabled(coerceBooleanProperty(changes[name].currentValue));

            if (name === 'position') this.changeCheckLabelPostion(changes[name].currentValue as NGXSeasonCheckLabelPosition);
        }
    }

    ngOnDestroy(): void {
        this.checkedChange.complete();
    }

    ngAfterViewInit(): void {
        this.initialize();
        this.changeCheckColor(this.color);
        this.changeCheckLabelPostion(this.position);
    }

    protected abstract initialize(): void;

    protected abstract changeCheckColor(color: NGXSeasonCheckColor): void;

    protected abstract setupCheckDisabled(disabled: boolean): void;

    protected changeCheckLabelPostion(position: NGXSeasonCheckLabelPosition): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-check-label-position', position);
    }

}

