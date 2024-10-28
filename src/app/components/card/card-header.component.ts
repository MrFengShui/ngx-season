import { AfterViewInit, Component, Directive, ElementRef, Renderer2, TemplateRef } from "@angular/core";


@Directive({
    selector: 'ng-template[ngx-sui-CardHeader]'
})
export class NGXSeasonCardHeaderDirective {

    constructor(protected _template: TemplateRef<any>) { }

}

@Component({
    selector: 'ngx-sui-card-header',
    template: `<ng-content></ng-content>`
})
export class NGXSeasonCardHeaderComponent implements AfterViewInit {

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) { }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'card-header');
    }

}

