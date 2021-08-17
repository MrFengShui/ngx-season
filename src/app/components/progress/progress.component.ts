import { Component, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from "@angular/core";

@Component({
    selector: 'octopus-progress',
    template: ''
})
export abstract class AbstractOctopusProgress implements OnChanges, OnInit {

    @Input('color') color: string = 'primary';
    @Input('value') value: number = 0;
    @Input('total') total: number = 100;
    @Input('precision') precision: number = 0;

    @HostBinding('class') class: string = 'octopus-progress';

    constructor(
        protected _ref: ElementRef<HTMLElement>,
        protected _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.color !== undefined) {
            this.buildColor(changes.color.previousValue, changes.color.currentValue);
        }


        if (changes.value !== undefined) {
            this.update(changes.value.currentValue, this.total);
        }

        if (changes.total !== undefined) {
            this.update(this.value, changes.total.currentValue);
        }
    }

    ngOnInit() {
        this.buildColor(undefined, this.color);
        this.update(this.value, this.total);
    }

    calcPercentage(value: number, total: number): string {
        let ratio: number = value / total;
        return `${(ratio * 100).toFixed(this.precision)}%`;
    }

    protected abstract update(value: number, total: number): void;

    private buildColor(prevColor: string, currColor: string): void {
        setTimeout(() => {
            this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-progress' : `octopus-${currColor}-progress`);
            this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-progress`);
        });
    }

}