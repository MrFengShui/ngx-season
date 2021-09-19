import { coerceBooleanProperty, coerceNumberProperty } from "@angular/cdk/coercion";
import { Component, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from "@angular/core";

type OctopusAvatarShape = 'square' | 'circle';
type OctopusAvatarSize = 'extra' | 'large' | 'medium' | 'small';

@Component({
    selector: 'img[octopus-avatar]',
    template: ''
})
export class OctopusAvatar implements OnChanges, OnInit {

    @Input('avatarMargin') margin: number | string = 0;
    @Input('avatarShadow') shadow: boolean | string = false;
    @Input('avatarShape') shape: OctopusAvatarShape = 'circle';
    @Input('avatarSize') size: OctopusAvatarSize = 'medium';

    @HostBinding('class') class: string = 'octopus-avatar';

    constructor(
        private _ref: ElementRef<HTMLElement>,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.margin !== undefined) {
            setTimeout(() => this.renderMargin(coerceNumberProperty(changes.margin.currentValue)));
        }

        if (changes.shadow !== undefined) {
            setTimeout(() => this.renderMargin(coerceNumberProperty(changes.shadow.currentValue)));
        }

        if (changes.shape !== undefined) {
            setTimeout(() => this.renderShape(changes.shape.previousValue, changes.shape.currentValue));
        }

        if (changes.size !== undefined) {
            setTimeout(() => this.renderSize(changes.size.previousValue, changes.size.currentValue));
        }
    }

    ngOnInit() {
        setTimeout(() => {
            this.renderMargin(coerceNumberProperty(this.margin));
            this.renderShadow(coerceBooleanProperty(this.shadow));
            this.renderShape(undefined, this.shape);
            this.renderSize(undefined, this.size);
        });
    }

    private renderMargin(margin: number): void {
        this._render.removeClass(this._ref.nativeElement, 'padding');
        this._render.setStyle(this._ref.nativeElement, 'padding', `${margin}px`);
    }

    private renderShadow(shadow: boolean): void {
        if (shadow) {
            this._render.addClass(this._ref.nativeElement, 'shadow');
        } else {
            this._render.removeClass(this._ref.nativeElement, 'shadow');
        }
    }

    private renderShape(prevShape: OctopusAvatarShape | undefined, currShape: OctopusAvatarShape): void {
        this._render.removeClass(this._ref.nativeElement, prevShape === undefined ? 'octopus-circle-avatar' : `octopus-${prevShape}-avatar`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currShape}-avatar`);
    }

    private renderSize(prevSize: OctopusAvatarSize | undefined, currSize: OctopusAvatarSize): void {
        this._render.removeClass(this._ref.nativeElement, prevSize === undefined ? 'octopus-medium-avatar' : `octopus-${prevSize}-avatar`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currSize}-avatar`);
    }

}