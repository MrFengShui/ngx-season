import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from "@angular/core";

import { ColorPalette, Position } from "src/app/global/enum.utils";

@Component({
    selector: '[octopus-badge]',
    template: '<ng-content></ng-content>'
})
export class OctopusBadge implements OnChanges, OnInit {

    @Input('badgeColor') color: ColorPalette = 'primary';
    @Input('badgeHidden') hidden: boolean | string = false;
    @Input('badgePosition') position: Position = 'top right';
    @Input('badgeText') text: string = '';

    private element!: HTMLElement;
    private textElement!: any;

    constructor(
        private _ref: ElementRef<HTMLElement>,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.color !== undefined) {
            setTimeout(() => this.renderColor(changes.color.previousValue, changes.color.currentValue));
        }

        if (changes.hidden !== undefined) {
            setTimeout(() => this.renderHidden(coerceBooleanProperty(changes.hidden.currentValue)));
        }

        if (changes.position !== undefined) {
            setTimeout(() => this.renderPosition(changes.position.currentValue));
        }

        if (changes.text !== undefined) {
            setTimeout(() => this.renderText(changes.text.currentValue));
        }
    }

    ngOnInit() {
        setTimeout(() => {
            this.element = this._render.createElement('span');
            this._render.setAttribute(this.element, 'class', 'octopus-shadow-z1 octopus-badge');
            this._render.setStyle(this.element, 'position', 'absolute');
            this._render.setStyle(this._ref.nativeElement, 'position', 'relative');
            this.renderColor(undefined, this.color);
            this.renderHidden(coerceBooleanProperty(this.hidden));
            this.renderPosition(this.position);
            this.renderText(this.text);
        });
    }

    private renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        if (this.element !== undefined) {
            this._render.removeClass(this.element, prevColor !== undefined ? 'octopus-primary-badge' : `octopus-${prevColor}-badge`);
            this._render.addClass(this.element, `octopus-${currColor}-badge`);
        }
    }

    private renderHidden(hidden: boolean): void {
        if (this.element !== undefined) {
            this._render.setStyle(this.element, 'visibility', hidden ? 'hidden' : 'visible');
        }
    }

    private renderPosition(position: Position): void {
        if (this.element !== undefined) {
            this._render.removeChild(this._ref.nativeElement, this.element);
            this.locate(this.element, position);
            this._render.appendChild(this._ref.nativeElement, this.element);
        }
    }

    private renderText(text: string): void {
        if (this.element !== undefined) {
            if (this.textElement !== undefined) {
                this._render.removeChild(this.element, this.textElement);
            }

            if (this.text !== '') {
                this.textElement = this._render.createText(text);
                this._render.appendChild(this.element, this.textElement);
            }
        }
    }

    private locate(element: HTMLElement, position: string): void {
        switch (position) {
            case 'top left':
                this._render.setStyle(element, 'top', '0%');
                this._render.setStyle(element, 'bottom', '100%');
                this._render.setStyle(element, 'left', '0%');
                this._render.setStyle(element, 'right', '100%');
                this._render.setStyle(element, 'transform', 'translate(-50%, -50%)');
                break;
            case 'top center':
                this._render.setStyle(element, 'top', '0%');
                this._render.setStyle(element, 'bottom', '100%');
                this._render.setStyle(element, 'left', '50%');
                this._render.setStyle(element, 'right', '50%');
                this._render.setStyle(element, 'transform', 'translate(-50%, -50%)');
                break;
            case 'top right':
                this._render.setStyle(element, 'top', '0%');
                this._render.setStyle(element, 'bottom', '100%');
                this._render.setStyle(element, 'left', '100%');
                this._render.setStyle(element, 'right', '0%');
                this._render.setStyle(element, 'transform', 'translate(-50%, -50%)');
                break;
            case 'bottom left':
                this._render.setStyle(element, 'top', '100%');
                this._render.setStyle(element, 'bottom', '0%');
                this._render.setStyle(element, 'left', '0%');
                this._render.setStyle(element, 'right', '100%');
                this._render.setStyle(element, 'transform', 'translate(-50%, -50%)');
                break;
            case 'bottom center':
                this._render.setStyle(element, 'top', '100%');
                this._render.setStyle(element, 'bottom', '0%');
                this._render.setStyle(element, 'left', '50%');
                this._render.setStyle(element, 'right', '50%');
                this._render.setStyle(element, 'transform', 'translate(-50%, -50%)');
                break;
            case 'bottom right':
                this._render.setStyle(element, 'top', '100%');
                this._render.setStyle(element, 'bottom', '0%');
                this._render.setStyle(element, 'left', '100%');
                this._render.setStyle(element, 'right', '0%');
                this._render.setStyle(element, 'transform', 'translate(-50%, -50%)');
                break;
        }
    }

}