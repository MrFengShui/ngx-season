import { AfterViewInit, Component, ElementRef, Renderer2 } from "@angular/core";

@Component({
    selector: 'ngx-sui-layout',
    template: `
        <ng-content select="ngx-sui-layout-header"></ng-content>
        <ng-content select="ngx-sui-layout-content"></ng-content>
        <ng-content select="ngx-sui-layout-footer"></ng-content>
    `
})
export class NGXSeasonLayoutComponent implements AfterViewInit {

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) { }

    ngAfterViewInit(): void {
        this.initialize();
    }

    private initialize(): void {
        this._renderer.addClass(this._element.nativeElement, 'layout');
    }

}


