import { Component, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from "@angular/core";

import { OctopusAvatarShape, OctopusAvatarSize } from "./avatar.utils";

@Component({
    selector: 'img[octopus-avatar]',
    template: ''
})
export class OctopusAvatar implements OnChanges, OnInit {

    @Input('shape') shape: OctopusAvatarShape = 'circle';
    @Input('size') size: OctopusAvatarSize = 'medium';

    @HostBinding('class') class: string = 'octopus-avatar';

    constructor(
        private _ref: ElementRef<HTMLElement>,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.shape !== undefined) {
            setTimeout(() => this.buildShape(changes.shape.previousValue, changes.shape.currentValue));
        }

        if (changes.size !== undefined) {
            setTimeout(() => this.buildSize(changes.size.previousValue, changes.size.currentValue));
        }
    }

    ngOnInit() {
        setTimeout(() => {
            this._render.addClass(this._ref.nativeElement, this.shape);
            this._render.addClass(this._ref.nativeElement, this.size);
        });
        setTimeout(() => {
            this.buildShape(undefined, this.shape);
            this.buildSize(undefined, this.size);
        });
    }

    private buildShape(prevShape: OctopusAvatarShape | undefined, currShape: OctopusAvatarShape): void {
        this._render.removeClass(this._ref.nativeElement, prevShape === undefined ? 'circle' : prevShape);
        this._render.addClass(this._ref.nativeElement, currShape);
    }

    private buildSize(prevSize: OctopusAvatarSize | undefined, currSize: OctopusAvatarSize): void {
        this._render.removeClass(this._ref.nativeElement, prevSize === undefined ? 'medium' : prevSize);
        this._render.addClass(this._ref.nativeElement, currSize);
    }

}