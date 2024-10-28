import { Component, AfterViewInit, ElementRef, Renderer2 } from "@angular/core";

@Component({
    selector: 'ngx-sui-card-content',
    template: `<ng-content></ng-content>`
})
export class NGXSeasonCardContentComponent implements AfterViewInit {

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) { }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'card-content');
    }

}
