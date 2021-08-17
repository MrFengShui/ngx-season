import { Component, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from "@angular/core";
import { Subject } from "rxjs";

import { AbstractOctopusProgress } from "./progress.component";

@Component({
    selector: '[octopus-progress-pie]',
    template: `
        <div class="octopus-progress-pie" [style.width]="(radius * 2) + 'px'" [style.height]="(radius * 2) + 'px'">
            <svg xmlns="http://w3.org/2000/svg" width="100%" height="100%" class="svg">
                <circle [attr.cx]="radius" [attr.cy]="radius" [attr.r]="radius - thick * 0.5" [attr.stroke-width]="thick" fill="none" class="track"></circle>
                <circle [attr.cx]="radius" [attr.cy]="radius" [attr.r]="radius - thick * 0.5" [attr.stroke-width]="thick" fill="none" class="thumb" [style.stroke-dasharray]="circumference" [style.stroke-dashoffset]="offset"></circle>
            </svg>
            <span class="text d-flex justify-content-center align-items-center">{{calcPercentage(value, total)}}</span>
        </div>
    `
})
export class OctopusProgressPie extends AbstractOctopusProgress implements OnChanges, OnInit {

    @Input('radius') radius: number = 48;
    @Input('thick') thick: number = 12;

    @HostBinding('class') class: string = 'octopus-progress';

    path$: Subject<string> = new Subject();

    circumference: number = 0;
    offset: number = 0;
    ratio: number = 0;

    constructor(
        protected _ref: ElementRef<HTMLElement>,
        protected _render: Renderer2
    ) {
        super(_ref, _render);
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);

        if (changes.radius !== undefined) {
            this.circumference = 2 * Math.PI * (changes.radius.currentValue - this.thick * 0.5);
        }

        if (changes.thick !== undefined) {
            this.thick = 2 * Math.PI * (this.radius - changes.thick.currentValue * 0.5);
        }
    }

    ngOnInit() {
        super.ngOnInit();
        setTimeout(() => {
            this._render.setStyle(this._ref.nativeElement, 'background', 'none');
            this._render.setStyle(this._ref.nativeElement, 'width', 'auto');
            this._render.setStyle(this._ref.nativeElement, 'height', 'auto');
        });
        this.circumference = 2 * Math.PI * (this.radius - this.thick * 0.5);
    }

    protected update(value: number, total: number): void {
        let ratio: number = value / total;
        this.offset = this.circumference * (1 - ratio);
    }

}