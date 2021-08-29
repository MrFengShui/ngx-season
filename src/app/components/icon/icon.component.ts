import { coerceBooleanProperty, coerceNumberProperty } from "@angular/cdk/coercion";
import { Component, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from "@angular/core";

import { ColorPalette } from "src/app/global/enum.utils";

export type IconType = '' | 'outlined' | 'round' | 'sharp' | 'two-tone';

@Component({
    selector: 'octopus-icon',
    template: `
        <span class="material-icons{{type === '' ? '' : '-'}}{{type}}" [style.font-size]="size + 'px'">
            <ng-content></ng-content>
        </span>
    `
})
export class OctopusIcon implements OnChanges, OnInit {

    @Input('color') color: ColorPalette = 'base';
    @Input('margin') margin: number | string = 4;
    @Input('rounded') rounded: boolean | string = false;
    @Input('size') size: number | string = 24;
    @Input('type') type: IconType = '';

    @HostBinding('class') class: string = 'octopus-icon';

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.color !== undefined) {
            setTimeout(() => this.renderColor(changes.color.previousValue, changes.color.currentValue));
        }

        if (changes.margin !== undefined) {
            setTimeout(() => this.renderSize(coerceNumberProperty(changes.margin.currentValue), coerceNumberProperty(this.size)));
        }

        if (changes.size !== undefined) {
            setTimeout(() => this.renderSize(coerceNumberProperty(this.margin), coerceNumberProperty(changes.size.currentValue)));
        }

        if (changes.rounded !== undefined) {
            setTimeout(() => this.renderRound(coerceBooleanProperty(changes.rounded.currentValue)));
        }
    }

    ngOnInit() {
        setTimeout(() => {
            this.renderColor(undefined, this.color);
            this.renderRound(coerceBooleanProperty(this.rounded));
            this.renderSize(coerceNumberProperty(this.margin), coerceNumberProperty(this.size));
        });
    }

    private renderColor(prevColor: string | undefined, currColor: string): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-icon' : `octopus-${prevColor}-icon`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-icon`);
    }

    private renderRound(rounded: boolean): void {
        if (rounded) {
            this._render.addClass(this._ref.nativeElement, 'rounded');
        } else {
            this._render.removeClass(this._ref.nativeElement, 'rounded');
        }
    }

    private renderSize(margin: number, size: number): void {
        let value: string = `${margin * 2 + size}px`;
        this._render.setStyle(this._ref.nativeElement, 'width', value);
        this._render.setStyle(this._ref.nativeElement, 'height', value);
    }

}