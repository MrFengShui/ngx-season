import { Component, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from "@angular/core";

import { BorderPosition } from "./layout.utils";

@Component({
    selector: 'octopus-layout-border',
    templateUrl: './border.component.html'
})
export class OctopusLayoutBorder {

    @Input('gutter') gutter: number = 0;

    @HostBinding('class') class: string = 'octopus-layout-border';

}

@Component({
    selector: '[octopus-border-cell]',
    template: `<ng-content></ng-content>`
})
export class OctopusBorderCell implements OnChanges, OnInit {

    @Input('position') position: BorderPosition = 'center';

    @HostBinding('class') class: string = 'octopus-border-cell';

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.position !== undefined) {
            setTimeout(() => this.renderPosition(changes.position.previousValue, changes.position.currentValue));
        }
    }

    ngOnInit() {
        setTimeout(() => this.renderPosition(undefined, this.position));
    }

    private renderPosition(prevPos: BorderPosition | undefined, currPos: BorderPosition): void {
        this._render.removeClass(this._ref.nativeElement, prevPos === undefined ? 'center' : prevPos);
        this._render.addClass(this._ref.nativeElement, currPos);
    }

}
