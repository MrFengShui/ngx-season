import { Component, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from "@angular/core";
import { BOOLEAN_ADAPTOR } from "src/app/global/boolean.utils";
import { ColorPalette } from "src/app/global/enum.utils";
import { NUMBER_ADAPTOR } from "src/app/global/number.utils";

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
    @Input('margin') margin: number = 4;
    @Input('rounded') rounded: boolean = false;
    @Input('size') size: number = 24;
    @Input('type') type: IconType = '';

    @HostBinding('class') class: string = 'octopus-icon';

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.color !== undefined) {
            setTimeout(() => this.buildColor(changes.color.previousValue, changes.color.currentValue));
        }

        if (changes.margin !== undefined) {
            setTimeout(() => this.buildMarginSize(changes.margin.currentValue, this.size));
        }

        if (changes.size !== undefined) {
            setTimeout(() => this.buildMarginSize(this.margin, changes.size.currentValue));
        }

        if (changes.rounded !== undefined) {
            setTimeout(() => this.buildRound(changes.rounded.currentValue));
        }
    }

    ngOnInit() {
        setTimeout(() => {
            this.buildColor(undefined, this.color);
            this.buildRound(this.rounded);
            this.buildMarginSize(this.margin, this.size);
        });
    }

    private buildColor(prevColor: string, currColor: string): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-icon' : `octopus-${prevColor}-icon`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-icon`);
    }

    private buildRound(rounded: boolean | string): void {
        if (BOOLEAN_ADAPTOR(rounded)) {
            this._render.addClass(this._ref.nativeElement, 'rounded');
        } else {
            this._render.removeClass(this._ref.nativeElement, 'rounded');
        }
    }

    private buildMarginSize(margin: number | string, size: number | string): void {
        let value: string = `${NUMBER_ADAPTOR(margin) * 2 + NUMBER_ADAPTOR(size)}px`;
        this._render.setStyle(this._ref.nativeElement, 'width', value);
        this._render.setStyle(this._ref.nativeElement, 'height', value);
    }

}