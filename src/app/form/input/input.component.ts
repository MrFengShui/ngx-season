import { Component, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from "@angular/core";
import { ColorPalette } from "src/app/global/enum.utils";

@Component({
    selector: '',
    template: ''
})
abstract class AbstractOctopusInput implements OnChanges, OnInit {

    @Input('color') color: ColorPalette = 'primary';

    @HostBinding('class') class: string = 'octopus-input';

    ngOnChanges(changes: SimpleChanges) {
        if (changes.color !== undefined) {
            setTimeout(() => this.renderColor(changes.color.previousValue, changes.color.currentValue), 10);
        }
    }

    ngOnInit() {
        setTimeout(() => this.renderColor(undefined, this.color), 10);
    }

    protected abstract renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void;

}

@Component({
    selector: 'input[octopus-input-range]',
    template: ''
})
export class OctopusInputRange extends AbstractOctopusInput {

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2
    ) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        setTimeout(() => this._render.addClass(this._ref.nativeElement, 'octopus-input-range'));
    }

    protected renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-input-range' : `octopus-${prevColor}-input-range`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-input-range`);
    }

}