import { Component, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from "@angular/core";

import { AbstractOctopusProgress } from "./progress.component";

@Component({
    selector: '[octopus-progress-bar]',
    template: `<div class="octopus-progress-bar" #bar>{{calcPercentage(value, total)}}</div>`
})
export class OctopusProgressBar extends AbstractOctopusProgress implements OnChanges, OnInit {

    @Input('striped') striped: boolean = false;
    @Input('animated') animated: boolean = false;

    @ViewChild('bar', { read: ElementRef, static: true })
    bar: ElementRef<HTMLElement>;

    @HostBinding('class') class: string = 'octopus-progress';

    constructor(
        protected _ref: ElementRef<HTMLElement>,
        protected _render: Renderer2
    ) {
        super(_ref, _render);
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);

        if (changes.striped !== undefined) {
            this.buildStripe(changes.striped.currentValue);
        }

        if (changes.animated !== undefined) {
            this.buildAnimation(changes.animated.currentValue);
        }
    }

    ngOnInit() {
        super.ngOnInit();
        this.buildStripe(this.striped);
        this.buildAnimation(this.animated);

    }

    private buildStripe(striped: boolean,): void {
        setTimeout(() => {
            if (striped) {
                this._render.addClass(this.bar.nativeElement, 'stripe');
            } else {
                this._render.removeClass(this.bar.nativeElement, 'stripe');
            }
        });
    }

    private buildAnimation(animated: boolean): void {
        setTimeout(() => {
            if (animated) {
                this._render.addClass(this.bar.nativeElement, 'animate');
            } else {
                this._render.removeClass(this.bar.nativeElement, 'animate');
            }
        });
    }

    protected update(value: number, total: number): void {
        setTimeout(() => this._render.setStyle(this.bar.nativeElement, 'width', `${value * 100 / total}%`));
    }

}