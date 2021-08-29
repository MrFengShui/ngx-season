import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from "@angular/core";

import { OctopusDotBadge } from "./dot.component";

@Component({
    selector: '[octopus-text-badge]',
    template: ''
})
export class OctopusTextBadge extends OctopusDotBadge implements OnChanges, OnInit {

    @Input('badgeText') text: string = '';

    constructor(
        protected _ref: ElementRef<HTMLElement>,
        protected _render: Renderer2
    ) {
        super(_ref, _render);
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);

        if (changes.text !== undefined) {
            setTimeout(() => this.renderText(changes.text.currentValue));
        }
    }

    ngOnInit() {
        super.ngOnInit();
        this.element = this.create();
        setTimeout(() => this.renderText(this.text));
    }

    private renderText(text: string): void {
        if (this.element.innerText === '') {
            this._render.appendChild(this.element, this._render.createText(text));
        } else {
            this.element.innerText = text;
        }

        this._render.appendChild(this._ref.nativeElement, this.element);
    }

    protected create(): HTMLElement {
        let element: HTMLSpanElement = this._render.createElement('span');
        this._render.addClass(element, 'octopus-badge');
        this._render.addClass(element, 'octopus-text-badge');
        return element;
    }

}