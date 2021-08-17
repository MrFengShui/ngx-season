import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from "@angular/core";

@Directive({
    selector: '[octopus-dot-badge]'
})
export class OctopusDotBadge implements OnChanges, OnInit {

    @Input('octopusBadgeHidden') hidden: boolean = false;
    @Input('octopusBadgePosition') position: string = 'top right';

    protected element: HTMLElement;

    constructor(
        protected _ref: ElementRef<HTMLElement>,
        protected _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        this.build(
            changes.hidden === undefined ? this.hidden : changes.hidden.currentValue,
            changes.position === undefined ? this.position : changes.position.currentValue
        );
    }

    ngOnInit() {
        this.element = this.create();
        this.build(this.hidden, this.position);
    }

    private build(hidden: boolean, position: string): void {
        setTimeout(() => {
            this._render.setStyle(this._ref.nativeElement, 'position', 'relative');

            if (hidden) {
                this._render.addClass(this.element, 'hidden');
            } else {
                this._render.removeClass(this.element, 'hidden');
            }

            this.locate(this.element, position);
            this._render.appendChild(this._ref.nativeElement, this.element);
        });
    }

    protected create(): HTMLElement {
        let element: HTMLSpanElement = this._render.createElement('span');
        this._render.addClass(element, 'octopus-badge');
        this._render.addClass(element, 'octopus-dot-badge');
        return element;
    }

    protected locate(element: HTMLElement, position: string): void {
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