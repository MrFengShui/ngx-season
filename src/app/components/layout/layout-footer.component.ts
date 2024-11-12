import { Component, ElementRef, Renderer2 } from "@angular/core";

@Component({
    selector: 'ngx-sui-layout-footer',
    template: `<ng-content></ng-content>`
})
export class NGXSeasonLayoutFooterComponent {

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) { }

    ngAfterViewInit(): void {
        this.initialize();
    }

    private initialize(): void {
        this._renderer.addClass(this._element.nativeElement, 'layout-footer');
    }

}
