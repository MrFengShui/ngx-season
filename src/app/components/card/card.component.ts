import { Component, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from "@angular/core";

@Component({
    selector: 'octopus-card',
    templateUrl: './card.component.html'
})
export class OctopusCard implements OnChanges, OnInit {

    @Input('color') color: string = 'base';

    @HostBinding('class') class: string = 'octopus-card';

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        this.build(changes.color.previousValue, changes.color.currentValue);
    }

    ngOnInit() {
        this.build(undefined, this.color);
    }

    private build(prevColor: string, currColor: string): void {
        setTimeout(() => {
            this._render.removeClass(this._ref.nativeElement, `octopus-${prevColor}-card`);
            this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-card`);
        });
    }

}