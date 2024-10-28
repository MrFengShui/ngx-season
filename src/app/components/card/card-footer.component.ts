import { AfterViewInit, Component, Directive, ElementRef, Renderer2, TemplateRef } from "@angular/core";

@Directive({
    selector: '[ngx-sui-CardFooter]'
})
export class NGXSeasonCardFooterDirective {

    constructor(protected _template: TemplateRef<any>) { }

}

@Component({
    selector: 'ngx-sui-card-footer',
    template: `<ng-content></ng-content>`
})
export class NGXSeasonCardFooterComponent implements AfterViewInit {

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) { }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'card-footer');
    }

}

