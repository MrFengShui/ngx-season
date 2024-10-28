import { AfterViewInit, Component, ElementRef, Renderer2 } from "@angular/core";

/**
 * 收起状态：24px + 2 * 16px
 */
@Component({
    selector: 'ngx-sui-navlist',
    template: `<ng-content select="a[ngx-sui-NavLink], ngx-sui-navblock"></ng-content>`
})
export class NGXSeasonNavigatorListComponent implements AfterViewInit {

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'nav-list');
    }

}


