import { Component, ElementRef, Renderer2 } from "@angular/core";

@Component({
    selector: '',
    template: ''
})
export class AbstractNGXSeasonComponent {

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

}