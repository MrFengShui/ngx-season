import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from "@angular/core";

import { OctopusDotBadge } from "./dot-bdg.directive";

@Directive({
    selector: '[octopus-text-badge]'
})
export class OctopusTextBadge extends OctopusDotBadge implements OnChanges, OnInit {

    @Input('octopusBadgeText') text: string = '';
    @Input('octopusBadgeHidden') hidden: boolean = false;
    @Input('octopusBadgePosition') position: string = 'top right';

    protected element: HTMLElement;

    constructor(
        protected _ref: ElementRef<HTMLElement>,
        protected _render: Renderer2
    ) {
        super(_ref, _render);
    }

    ngOnChanges(changes: SimpleChanges) {
        this.buildWithText(
            changes.text === undefined ? this.text : changes.text.currentValue,
            changes.hidden === undefined ? this.hidden : changes.hidden.currentValue,
            changes.position === undefined ? this.position : changes.position.currentValue
        );
    }

    ngOnInit() {
        this.element = this.create();
        this.buildWithText(this.text, this.hidden, this.position);
    }

    private buildWithText(text: string, hidden: boolean, position: string): void {
        setTimeout(() => {
            this._render.setStyle(this._ref.nativeElement, 'position', 'relative');

            if (hidden) {
                this._render.addClass(this.element, 'hidden');
            } else {
                this._render.removeClass(this.element, 'hidden');
            }

            this.locate(this.element, position);

            if (this.element.innerText === '') {
                this._render.appendChild(this.element, this._render.createText(text));
            } else {
                this.element.innerText = text;
            }

            this._render.appendChild(this._ref.nativeElement, this.element);
        });
    }

    protected create(): HTMLElement {
        let element: HTMLSpanElement = this._render.createElement('span');
        this._render.addClass(element, 'octopus-badge');
        this._render.addClass(element, 'octopus-text-badge');
        return element;
    }

}