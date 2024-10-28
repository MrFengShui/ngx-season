import { AfterViewInit, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";

type ScrollbarDirection = 'x-axis' | 'y-axis' | 'xy-axis' | 'none-axis';

@Directive({
    selector: '[ngx-sui-Scrollbar]'
})
export class NGXSeasonScrollbarDirective implements OnChanges, AfterViewInit {

    @Input('scrollBarAxis')
    set axis(axis: ScrollbarDirection) {
        this._axis = axis;
    }

    get axis(): ScrollbarDirection {
        return this._axis;
    }

    private _axis: ScrollbarDirection = 'none-axis';

    private readonly DIRECTIONS: ScrollbarDirection[] = ['xy-axis', 'x-axis', 'y-axis', 'none-axis'];

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        let keys: string[] | null = Object.keys(changes);

        if (keys.includes('axis')) {
            this.setupScrollbarDirection(changes['axis'].currentValue as ScrollbarDirection);
        }

        keys.splice(0);
        keys = null;
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'scrollbar');
        this.setupScrollbarDirection(this.axis);
    }

    protected setupScrollbarDirection(axis: ScrollbarDirection): void {
        const element: HTMLElement = this._element.nativeElement;
        let value: string;

        for (const item of this.DIRECTIONS) {
            value = `scrollbar-${item}`;

            if (element.classList.contains(value)) this._renderer.removeClass(element, value);
        }

        Promise.resolve().then(() => this._renderer.addClass(element, `scrollbar-${axis}`));
    }

}