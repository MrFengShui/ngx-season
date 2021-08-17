import { Directive, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from "@angular/core";

import { OctopusAvatarShape, OctopusAvatarSize } from "./avatar.utils";

@Directive({
    selector: '[octopus-avatar]'
})
export class OctopusAvatar implements OnChanges, OnInit {

    @Input('shape') shape: OctopusAvatarShape = OctopusAvatarShape.circle;
    @Input('size') size: OctopusAvatarSize = OctopusAvatarSize.medium;

    @HostBinding('class') class: string = 'octopus-avatar';

    constructor(
        private _ref: ElementRef<HTMLElement>,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.shape !== undefined) {
            this.buildShape(changes.shape.previousValue, changes.shape.currentValue);
        }

        if (changes.size !== undefined) {
            this.buildSize(changes.size.previousValue, changes.size.currentValue);
        }
    }

    ngOnInit() {
        setTimeout(() => {
            this._render.addClass(this._ref.nativeElement, this.shape);
            this._render.addClass(this._ref.nativeElement, this.size);
        });
        this.buildShape(undefined, this.shape);
        this.buildSize(undefined, this.size);
    }

    private buildShape(prevShape: OctopusAvatarShape, currShape: OctopusAvatarShape): void {
        setTimeout(() => {
            this._render.removeClass(this._ref.nativeElement, prevShape === undefined ? this.shape : prevShape);
            this._render.addClass(this._ref.nativeElement, currShape);
        });
    }

    private buildSize(prevSize: OctopusAvatarSize, currSize: OctopusAvatarSize): void {
        setTimeout(() => {
            this._render.removeClass(this._ref.nativeElement, prevSize === undefined ? this.size : prevSize);
            this._render.addClass(this._ref.nativeElement, currSize);
        });
    }

}