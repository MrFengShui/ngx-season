import { Directive, AfterViewInit, ElementRef, Renderer2 } from "@angular/core";

@Directive({
    selector: 'img[ngx-sui-CardImage]'
})
export class NGXSeasonCardImageDirective implements AfterViewInit {

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) { }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'card-image');
    }

}
