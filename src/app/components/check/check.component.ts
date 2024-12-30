import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { Component, OnChanges, OnDestroy, AfterViewInit, Input, Output, EventEmitter, ElementRef, Renderer2, SimpleChanges } from "@angular/core";

import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";

export type NGXSeasonCheckLabelPosition = 'after' | 'before';

@Component({
    selector: '',
    template: ''
})
export abstract class NGXSeasonCheckComponent implements OnChanges, OnDestroy, AfterViewInit {

    @Input('checkColor')
    set color(color: NGXSeasonColorPalette | null) {
        this._color = color ? color : 'default';
    }

    get color(): NGXSeasonColorPalette {
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
    set position(position: NGXSeasonCheckLabelPosition | null) {
        this._position = position ? position : 'after';
    }

    get position(): NGXSeasonCheckLabelPosition {
        return this._position;
    }

    @Input('checkShowLabel')
    set showLabel(showLabel: boolean | string | undefined | null) {
        this._showLabel = coerceBooleanProperty(showLabel);
    }

    get showLabel(): boolean {
        return this._showLabel;
    }

    private _color: NGXSeasonColorPalette = 'default';
    private _checked: boolean = false;
    private _disabled: boolean = false;
    private _position: NGXSeasonCheckLabelPosition = 'after';
    private _showLabel: boolean = true;

    @Output('checkCheckedChange')
    checkedChange: EventEmitter<boolean> = new EventEmitter(true);

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'color') this.changeCheckColor(changes[name].currentValue as NGXSeasonColorPalette);

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

    protected abstract changeCheckColor(color: NGXSeasonColorPalette): void;

    protected abstract setupCheckDisabled(disabled: boolean): void;

    protected changeCheckLabelPostion(position: NGXSeasonCheckLabelPosition): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-check-label-position', position);
    }

}

