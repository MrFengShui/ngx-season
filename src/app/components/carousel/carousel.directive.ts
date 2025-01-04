import { AfterViewInit, Directive, ElementRef, Renderer2, TemplateRef } from "@angular/core";

@Directive({
    selector: 'div[ngx-sui-CarouselPanel]'
})
export class NGXSeasonCarouselPanelDirective implements AfterViewInit {

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'panel');
    }

}

@Directive({
    selector: '[ngx-sui-CarouselPanelTemplate]'
})
export class NGXSeasonCarouselPanelTemplateDirective {

    constructor(protected _template: TemplateRef<unknown>) {}

}
